export type ContentKind = "page" | "post";
export interface ContentIdentity { kind: ContentKind; id: number }
export interface RevisionPointers {
  draft_key: string;
  draft_revision: string;
  draft_etag: string;
  schema_version: number;
  published_key: string | null;
  published_revision: string | null;
  published_etag: string | null;
}
export interface ContentBindings { DB: D1Database; CONTENT: R2Bucket }
export class ContentError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
export const MAX_CONTENT_BYTES = 1024 * 1024;

export function contentTable(kind: ContentKind): "pages" | "posts" {
  return kind === "page" ? "pages" : "posts";
}

export async function readBoundedJson(request: Request): Promise<unknown> {
  if (request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    throw new ContentError(415, "Content-Type must be application/json");
  }
  if (Number(request.headers.get("Content-Length")) > MAX_CONTENT_BYTES) {
    throw new ContentError(413, "Content exceeds the 1 MiB limit");
  }
  if (!request.body) throw new ContentError(400, "JSON body required");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_CONTENT_BYTES) {
        await reader.cancel();
        throw new ContentError(413, "Content exceeds the 1 MiB limit");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: false }).decode(bytes));
  } catch {
    throw new ContentError(400, "Invalid UTF-8 JSON");
  }
}

export function revisionToken(value: unknown, label: string): string | null {
  if (value === null) return null;
  if (typeof value === "string" && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(value)) return value;
  throw new ContentError(400, `${label} must be a revision token or null`);
}

export async function getPointers(env: ContentBindings, identity: ContentIdentity): Promise<RevisionPointers | null> {
  return env.DB.prepare("SELECT * FROM document_content WHERE kind = ? AND record_id = ?")
    .bind(identity.kind, identity.id).first<RevisionPointers>();
}

export async function requireRecord(env: ContentBindings, identity: ContentIdentity) {
  const row = await env.DB.prepare(`SELECT id, body, template_content FROM ${contentTable(identity.kind)} WHERE id = ?`)
    .bind(identity.id).first<{ id: number; body: string; template_content: string }>();
  if (!row) throw new ContentError(404, "Document not found");
  return row;
}

export async function readRevision(env: ContentBindings, key: string, etag: string): Promise<unknown> {
  const object = await env.CONTENT.get(key);
  if (!object) throw new ContentError(503, "Referenced content is missing; restore the revision");
  if (object.etag !== etag) throw new ContentError(503, "Referenced content integrity mismatch");
  if (object.size > MAX_CONTENT_BYTES) throw new ContentError(503, "Stored content exceeds the supported limit");
  try {
    return await object.json();
  } catch {
    throw new ContentError(503, "Referenced content contains invalid JSON");
  }
}

export async function saveRevision(
  env: ContentBindings, identity: ContentIdentity, document: unknown,
  schemaVersion: number, expectedRevision: string | null,
) {
  const record = await requireRecord(env, identity);
  const previous = await getPointers(env, identity);
  if (!previous && (record.body.trim() || record.template_content.trim() !== "{}")) {
    throw new ContentError(409, "Legacy content is read-only in the new editor; no automatic conversion is permitted");
  }
  if ((previous?.draft_revision ?? null) !== expectedRevision) {
    throw new ContentError(409, "Draft changed; reload or export your unsaved work");
  }
  const payload = JSON.stringify(document);
  if (new TextEncoder().encode(payload).length > MAX_CONTENT_BYTES) throw new ContentError(413, "Content exceeds the 1 MiB limit");
  const revision = crypto.randomUUID();
  const key = `${identity.kind}/${identity.id}/revisions/${revision}.json`;
  const stored = await env.CONTENT.put(key, payload, {
    onlyIf: { etagDoesNotMatch: "*" },
    httpMetadata: { contentType: "application/json" },
    customMetadata: { schemaVersion: String(schemaVersion), revision },
  });
  if (!stored) throw new ContentError(503, "Could not create immutable revision");
  // R2 writes precede the single atomic D1 CAS. A losing/orphaned key is never served.
  const result = previous
    ? await env.DB.prepare(
      `UPDATE document_content SET draft_key = ?, draft_revision = ?, draft_etag = ?, schema_version = ?, updated_at = datetime('now')
       WHERE kind = ? AND record_id = ? AND draft_revision = ?
       AND EXISTS (SELECT 1 FROM ${contentTable(identity.kind)} WHERE id = ?)`,
    ).bind(key, revision, stored.etag, schemaVersion, identity.kind, identity.id, expectedRevision, identity.id).run()
    : await env.DB.prepare(
      `INSERT INTO document_content (kind, record_id, draft_key, draft_revision, draft_etag, schema_version)
       SELECT ?, ?, ?, ?, ?, ? WHERE EXISTS (SELECT 1 FROM ${contentTable(identity.kind)} WHERE id = ? AND trim(body) = '' AND trim(template_content) = '{}')
       ON CONFLICT(kind, record_id) DO NOTHING`,
    ).bind(identity.kind, identity.id, key, revision, stored.etag, schemaVersion, identity.id).run();
  if (!result.meta.changes) throw new ContentError(409, "Draft changed or record was removed; reload or export your work");
  return { revision, publishedRevision: previous?.published_revision ?? null };
}

export async function publishRevision(
  env: ContentBindings, identity: ContentIdentity,
  expectedRevision: string, expectedPublishedRevision: string | null,
) {
  await requireRecord(env, identity);
  const pointers = await getPointers(env, identity);
  if (!pointers) throw new ContentError(409, "Save a structured draft before publishing");
  if (pointers.draft_revision !== expectedRevision || pointers.published_revision !== expectedPublishedRevision) {
    throw new ContentError(409, "Draft or published revision changed; reload before publishing");
  }
  await readRevision(env, pointers.draft_key, pointers.draft_etag);
  // Both statements execute transactionally; visibility changes only if the CAS wins.
  const results = await env.DB.batch([
    env.DB.prepare(
      `UPDATE document_content SET published_key = draft_key, published_revision = draft_revision, published_etag = draft_etag
       WHERE kind = ? AND record_id = ? AND draft_revision = ? AND published_revision IS ?
       AND EXISTS (SELECT 1 FROM ${contentTable(identity.kind)} WHERE id = ?)`,
    ).bind(identity.kind, identity.id, expectedRevision, expectedPublishedRevision, identity.id),
    env.DB.prepare(
      `UPDATE ${contentTable(identity.kind)} SET published = 1, updated_at = datetime('now')
       WHERE id = ? AND changes() = 1`,
    ).bind(identity.id),
  ]);
  if (!results[0].meta.changes) throw new ContentError(409, "Draft or published revision changed; reload before publishing");
  return { revision: expectedRevision, publishedRevision: expectedRevision };
}

export async function publishedContent(env: ContentBindings, identity: ContentIdentity) {
  const pointers = await getPointers(env, identity);
  if (!pointers) return null;
  if (!pointers.published_key || !pointers.published_etag) {
    throw new ContentError(404, "Document has no published structured revision");
  }
  return readRevision(env, pointers.published_key, pointers.published_etag);
}
