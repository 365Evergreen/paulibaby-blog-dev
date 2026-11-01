import {
  ContentError, getPointers, publishRevision, readBoundedJson, readRevision,
  requireRecord, revisionToken, saveRevision, contentTable, type ContentBindings, type ContentIdentity,
} from "./revisionStore";

export type ValidateContent = (value: unknown, identity: ContentIdentity) => { document: unknown; schemaVersion: number };
function validateStored(value: unknown, identity: ContentIdentity, validate: ValidateContent) {
  try {
    return validate(value, identity);
  } catch (error) {
    if (!(error instanceof ContentError)) throw error;
    throw new ContentError(503, `Stored revision failed validation: ${error.message}`);
  }
}
function response(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}
function input(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new ContentError(400, "Expected a JSON object");
  return value as Record<string, unknown>;
}

/** Called only after the host's existing session/role gate. */
export async function handleContentRequest(
  request: Request, env: ContentBindings, validate: ValidateContent,
): Promise<Response | null> {
  const match = new URL(request.url).pathname.match(/^\/api\/admin\/(pages|posts)\/([1-9]\d*)\/(content|publish|metadata)$/);
  if (!match) return null;
  const identity: ContentIdentity = { kind: match[1] === "pages" ? "page" : "post", id: Number(match[2]) };
  if (!Number.isSafeInteger(identity.id)) return response({ error: "Invalid document ID" }, 400);
  try {
    if (match[3] === "content" && request.method === "GET") {
      const record = await requireRecord(env, identity);
      const pointers = await getPointers(env, identity);
      if (!pointers) return response({
        document: null, revision: null, publishedRevision: null,
        format: record.body.trim() || record.template_content.trim() !== "{}" ? "legacy" : "empty",
      });
      const stored = await readRevision(env, pointers.draft_key, pointers.draft_etag);
      const { document } = validateStored(stored, identity, validate);
      return response({ document, revision: pointers.draft_revision, publishedRevision: pointers.published_revision, format: "structured" });
    }
    if (match[3] === "content" && request.method === "PUT") {
      const body = input(await readBoundedJson(request));
      const expected = revisionToken(body.expectedRevision, "expectedRevision");
      const validated = validate(body.document, identity);
      const result = await saveRevision(env, identity, validated.document, validated.schemaVersion, expected);
      return response({ document: validated.document, ...result, format: "structured" });
    }
    if (match[3] === "publish" && request.method === "POST") {
      const body = input(await readBoundedJson(request));
      const expected = revisionToken(body.expectedRevision, "expectedRevision");
      if (expected === null) throw new ContentError(400, "Save a draft before publishing");
      const published = revisionToken(body.expectedPublishedRevision, "expectedPublishedRevision");
      const pointers = await getPointers(env, identity);
      if (pointers) validateStored(await readRevision(env, pointers.draft_key, pointers.draft_etag), identity, validate);
      return response(await publishRevision(env, identity, expected, published));
    }
    if (match[3] === "metadata" && request.method === "PATCH") {
      const body = input(await readBoundedJson(request));
      const expected = revisionToken(body.expectedRevision, "expectedRevision");
      if (expected === null) throw new ContentError(400, "Save a structured draft before updating metadata");
      await requireRecord(env, identity);
      const fields = ["slug", "excerpt", "cover_image"] as const;
      const allowed = new Set<string>(fields);
      for (const key of Object.keys(body)) if (key !== "expectedRevision" && !allowed.has(key)) throw new ContentError(400, `Unsupported metadata field: ${key}`);
      const columns: string[] = [];
      const values: (string | null)[] = [];
      for (const key of fields) {
        if (!(key in body)) continue;
        const value = body[key];
        if (key === "cover_image" && value === null) {
          columns.push(`${key} = ?`); values.push(null); continue;
        }
        if (typeof value !== "string" || value.length > (key === "excerpt" ? 4000 : 2048)) throw new ContentError(400, `Invalid ${key}`);
        if (key === "slug" && (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || value.length > 200)) throw new ContentError(400, "Invalid slug");
        if (key === "cover_image") {
          let parsed: URL;
          try { parsed = new URL(value); } catch { throw new ContentError(400, "Invalid cover image URL"); }
          if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) throw new ContentError(400, "Invalid cover image URL");
        }
        columns.push(`${key} = ?`); values.push(value);
      }
      if (!columns.length) throw new ContentError(400, "No metadata changes supplied");
      const table = contentTable(identity.kind);
      if (body.slug !== undefined) {
        const clash = await env.DB.prepare(`SELECT id FROM ${table} WHERE slug = ? AND id != ?`).bind(body.slug, identity.id).first();
        if (clash) throw new ContentError(409, "Slug is already in use");
      }
      const result = await env.DB.prepare(
        `UPDATE ${table} SET ${columns.join(", ")}, updated_at = datetime('now') WHERE id = ?
         AND EXISTS (SELECT 1 FROM document_content WHERE kind = ? AND record_id = ? AND draft_revision = ?)`,
      ).bind(...values, identity.id, identity.kind, identity.id, expected).run();
      if (!result.meta.changes) throw new ContentError(409, "Draft changed; reload before updating metadata");
      return response({ success: true });
    }
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: match[3] === "content" ? "GET, PUT" : match[3] === "metadata" ? "PATCH" : "POST" } });
  } catch (error) {
    if (error instanceof ContentError) return response({ error: error.message }, error.status);
    console.error(JSON.stringify({ event: "content_api_failure", kind: identity.kind, id: identity.id, message: error instanceof Error ? error.message : String(error) }));
    return response({ error: "Content storage unavailable; your unsaved work has not been overwritten" }, 503);
  }
}
