import { apiFetch } from "../lib/auth.ts";

export interface DocumentIdentity { kind: "page" | "post"; id: string | number }
export type StoreIdentity = string | DocumentIdentity;
export interface RevisionMetadata { revision: string | null; publishedRevision: string | null }
export interface DocumentSnapshot<Document> extends RevisionMetadata { document: Document }
export interface DocumentSummary {
  id: number;
  kind: "page" | "post";
  title: string;
  slug: string;
  published: number;
  savedAt?: string;
  format: "structured" | "legacy" | "empty";
}
export class CloudflareStoreError extends Error {
  status: number;
  code: string;
  errors: string[];
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.code = status === 409 ? "revision-conflict" : status === 401 ? "unauthorized" : "storage-error";
    this.errors = [message];
  }
}
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new CloudflareStoreError(502, "Invalid content API response");
  return value as Record<string, unknown>;
}
function token(value: unknown): string | null {
  if (value === null || typeof value === "string" && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(value)) return value;
  throw new CloudflareStoreError(502, "Invalid revision metadata");
}
function revisions(value: Record<string, unknown>): RevisionMetadata {
  return { revision: token(value.revision), publishedRevision: token(value.publishedRevision) };
}
export function remoteIdentity(value: StoreIdentity): { kind: "page" | "post"; id: number } {
  if (typeof value === "string") throw new CloudflareStoreError(400, "Remote documents require a typed page/post identity");
  const id = typeof value.id === "string" && /^[1-9]\d*$/.test(value.id) ? Number(value.id) : value.id;
  if (!Number.isSafeInteger(id) || Number(id) < 1 || !["page", "post"].includes(value.kind)) throw new CloudflareStoreError(400, "Invalid remote document identity");
  return { kind: value.kind, id: Number(id) };
}
const path = (identity: StoreIdentity) => {
  const value = remoteIdentity(identity);
  return `/api/admin/${value.kind === "page" ? "pages" : "posts"}/${value.id}`;
};
async function request(url: string, method = "GET", body?: unknown): Promise<unknown> {
  const response = await apiFetch(url, {
    method, ...(body === undefined ? {} : { body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }),
  });
  let value: unknown;
  try { value = await response.json(); } catch {
    throw new CloudflareStoreError(response.ok ? 502 : response.status, "Content service returned invalid JSON; unsaved work is unchanged");
  }
  if (!response.ok) {
    const error = object(value);
    throw new CloudflareStoreError(response.status, typeof error.error === "string" ? error.error : "Content request failed");
  }
  return value;
}

/** Schema types/validation are injected from the pinned artifact, never duplicated. */
export function createCloudflareStore<Document>(
  validate: (value: unknown) => Document,
  onSnapshot?: (identity: DocumentIdentity, metadata: RevisionMetadata) => void,
) {
  return {
    async load(identity: StoreIdentity): Promise<DocumentSnapshot<Document> | null> {
      const value = object(await request(`${path(identity)}/content`));
      if (value.format === "legacy") throw new CloudflareStoreError(409, "Legacy content stays unchanged. Use the existing editor; automatic conversion is disabled.");
      const metadata = revisions(value);
      onSnapshot?.(remoteIdentity(identity), metadata);
      if (value.format === "empty" && value.document === null && metadata.revision === null) return null;
      if (value.format !== "structured") throw new CloudflareStoreError(502, "Unsupported content response format");
      return { ...metadata, document: validate(value.document) };
    },
    async save(identity: StoreIdentity, document: Document, options?: { expectedRevision?: string | null }): Promise<RevisionMetadata> {
      if (!options || options.expectedRevision === undefined) throw new CloudflareStoreError(400, "Remote save requires an explicit expected revision; null is create-only");
      const value = object(await request(`${path(identity)}/content`, "PUT", { document: validate(document), expectedRevision: options.expectedRevision }));
      validate(value.document);
      const metadata = revisions(value);
      onSnapshot?.(remoteIdentity(identity), metadata);
      return metadata;
    },
    async list(): Promise<DocumentSummary[]> {
      const groups = await Promise.all((["page", "post"] as const).map(async kind => {
        const value = await request(`/api/admin/editor/${kind === "page" ? "pages" : "posts"}`);
        if (!Array.isArray(value)) throw new CloudflareStoreError(502, "Expected typed document list");
        return value.map((item): DocumentSummary => {
          const row = object(item);
          const identity = remoteIdentity({ kind, id: Number(row.id) });
          if (typeof row.title !== "string" || typeof row.slug !== "string"
            || (row.format !== "structured" && row.format !== "legacy" && row.format !== "empty")) throw new CloudflareStoreError(502, "Invalid document metadata");
          return { ...identity, title: row.title, slug: row.slug, published: Number(row.published), savedAt: typeof row.updated_at === "string" ? row.updated_at : undefined, format: row.format };
        });
      }));
      return groups.flat();
    },
    async remove(identity: StoreIdentity): Promise<void> { await request(path(identity), "DELETE"); },
    async create(kind: "page" | "post", title: string): Promise<DocumentIdentity> {
      const value = object(await request(`/api/admin/editor/${kind === "page" ? "pages" : "posts"}`, "POST", { title }));
      return remoteIdentity({ kind, id: Number(value.id) });
    },
    async publish(identity: StoreIdentity, expected: RevisionMetadata): Promise<RevisionMetadata> {
      if (!expected.revision) throw new CloudflareStoreError(400, "Save a draft before publishing");
      const metadata = revisions(object(await request(`${path(identity)}/publish`, "POST", { expectedRevision: expected.revision, expectedPublishedRevision: expected.publishedRevision })));
      onSnapshot?.(remoteIdentity(identity), metadata);
      return metadata;
    },
    async updateMetadata(identity: StoreIdentity, changes: { slug?: string; excerpt?: string; cover_image?: string | null }, expectedRevision: string): Promise<void> {
      await request(`${path(identity)}/metadata`, "PATCH", { ...changes, expectedRevision });
    },
  };
}
