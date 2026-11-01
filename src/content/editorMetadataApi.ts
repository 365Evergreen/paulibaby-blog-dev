import { ContentError, contentTable, readBoundedJson, type ContentBindings, type ContentKind } from "./revisionStore";

/** Host creates numeric identities; the standalone editor's string-id index is not used. */
export async function handleEditorMetadataRequest(request: Request, env: ContentBindings): Promise<Response | null> {
  const match = new URL(request.url).pathname.match(/^\/api\/admin\/editor\/(pages|posts)$/);
  if (!match) return null;
  const kind: ContentKind = match[1] === "pages" ? "page" : "post";
  const table = contentTable(kind);
  try {
    if (request.method === "GET") {
      const result = await env.DB.prepare(
        `SELECT r.id, r.title, r.slug, r.published, r.updated_at,
        CASE WHEN dc.draft_key IS NOT NULL THEN 'structured'
             WHEN trim(r.body) != '' OR trim(r.template_content) != '{}' THEN 'legacy' ELSE 'empty' END AS format
        FROM ${table} r LEFT JOIN document_content dc ON dc.kind = ? AND dc.record_id = r.id
        ORDER BY r.updated_at DESC`,
      ).bind(kind).all();
      return Response.json(result.results, { headers: { "Cache-Control": "no-store" } });
    }
    if (request.method === "POST") {
      const body = await readBoundedJson(request);
      if (!body || typeof body !== "object" || Array.isArray(body) || !("title" in body) || typeof body.title !== "string"
        || !body.title.trim() || body.title.trim().length > 200) throw new ContentError(400, "Title must contain 1 to 200 characters");
      for (const key of Object.keys(body)) if (key !== "title") throw new ContentError(400, `Unsupported creation field: ${key}`);
      const slug = `${kind}-${crypto.randomUUID()}`;
      const result = await env.DB.prepare(`INSERT INTO ${table} (title, slug, body, template_content, published) VALUES (?, ?, '', '{}', 0)`)
        .bind(body.title.trim(), slug).run();
      return Response.json({ id: result.meta.last_row_id, kind, slug }, { status: 201, headers: { "Cache-Control": "no-store" } });
    }
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "GET, POST" } });
  } catch (error) {
    if (error instanceof ContentError) return Response.json({ error: error.message }, { status: error.status });
    console.error(JSON.stringify({ event: "editor_metadata_failure", kind, message: error instanceof Error ? error.message : String(error) }));
    return Response.json({ error: "Document metadata unavailable" }, { status: 503 });
  }
}
