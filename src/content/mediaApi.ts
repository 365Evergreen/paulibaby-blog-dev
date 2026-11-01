import { apiFetch } from "../lib/auth";

export interface EditorMedia {
  id: number;
  key: string;
  url: string;
  filename: string;
  contentType: string;
  alt: string;
  title: string;
  caption: string;
  width: number | null;
  height: number | null;
}
export class MediaApiError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new MediaApiError(502, "Invalid media API response");
  return value as Record<string, unknown>;
}
function media(value: unknown): EditorMedia {
  const row = record(value);
  if (!Number.isSafeInteger(row.id) || typeof row.r2_key !== "string" || !row.r2_key
    || typeof row.filename !== "string" || typeof row.content_type !== "string"
    || typeof row.alt_text !== "string" || typeof row.title !== "string" || typeof row.caption !== "string") {
    throw new MediaApiError(502, "Invalid media metadata response");
  }
  return {
    id: Number(row.id), key: row.r2_key, url: `/api/media/${encodeURIComponent(row.r2_key)}`,
    filename: row.filename, contentType: row.content_type,
    alt: row.alt_text, title: row.title, caption: row.caption,
    width: typeof row.width === "number" ? row.width : null,
    height: typeof row.height === "number" ? row.height : null,
  };
}
async function request(path: string, init?: RequestInit): Promise<unknown> {
  const response = await apiFetch(path, init);
  let value: unknown;
  try { value = await response.json(); } catch {
    throw new MediaApiError(response.ok ? 502 : response.status, "Media service returned an invalid response; your editor content is unchanged");
  }
  if (!response.ok) {
    const body = record(value);
    throw new MediaApiError(response.status, typeof body.error === "string" ? body.error : "Media request failed");
  }
  return value;
}
export async function listEditorMedia(): Promise<EditorMedia[]> {
  const value = await request("/api/admin/media");
  if (!Array.isArray(value)) throw new MediaApiError(502, "Expected media list");
  return value.map(media);
}
export async function uploadEditorMedia(file: File, alt: string): Promise<EditorMedia> {
  const body = new FormData();
  body.set("file", file);
  body.set("alt_text", alt);
  body.set("title", file.name);
  return media(await request("/api/admin/media", { method: "POST", body }));
}
