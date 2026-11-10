import { POST_DATE_ORDER } from "./postPublicationDate.ts";

interface SearchSource { slug: string }
interface CategoryScope { slug: string }

export interface ScopedPostResult {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category_slug: string | null;
}

const normalize = (value: string) => value.toLowerCase().replace(/[-_\s]+/g, " ").trim();
const normalizedColumn = (column: string) => `REPLACE(REPLACE(LOWER(${column}), '-', ' '), '_', ' ')`;

function matchesScope() {
  return `(INSTR(${normalizedColumn("p.slug")}, ?) > 0 OR EXISTS (
    SELECT 1 FROM post_categories pc JOIN categories c ON c.id = pc.category_id
    WHERE pc.post_id = p.id AND (
      INSTR(${normalizedColumn("c.slug")}, ?) > 0 OR INSTR(${normalizedColumn("c.name")}, ?) > 0
    )
  ))`;
}

export async function searchPublicPosts(
  params: URLSearchParams,
  db: D1Database,
  documentSchema: boolean,
): Promise<Response> {
  const kind = params.get("kind");
  const id = Number(params.get("id"));
  const query = normalize(params.get("q") ?? "");
  if ((kind !== "page" && kind !== "post") || !Number.isSafeInteger(id) || id < 1 || query.length > 200) {
    return Response.json({ error: "A valid page/post identity and a query of at most 200 characters are required." }, { status: 400 });
  }
  const source = await db.prepare(
    `SELECT s.slug FROM ${kind === "page" ? "pages" : "posts"} s WHERE s.id = ? AND s.published = 1${documentSchema
      ? " AND NOT EXISTS (SELECT 1 FROM document_content dc WHERE dc.kind = ? AND dc.record_id = s.id AND dc.published_key IS NULL)"
      : ""}`,
  ).bind(id, ...(documentSchema ? [kind] : [])).first<SearchSource>();
  if (!source) return Response.json({ error: "Search scope not found." }, { status: 404 });

  const categories = kind === "post"
    ? (await db.prepare(
      "SELECT c.slug FROM post_categories pc JOIN categories c ON c.id = pc.category_id WHERE pc.post_id = ?",
    ).bind(id).all<CategoryScope>()).results
    : [];
  const scopes = [...new Set([source.slug, ...categories.map((category) => category.slug)].map(normalize).filter(Boolean))];
  if (scopes.length === 0) return Response.json({ error: "This document has no search scope." }, { status: 422 });
  if (!query) return Response.json([]);

  const result = await db.prepare(
    `SELECT p.id, p.slug, p.title, p.excerpt,
      (SELECT c.slug FROM post_categories pc JOIN categories c ON c.id = pc.category_id
       WHERE pc.post_id = p.id ORDER BY c.id LIMIT 1) AS category_slug
     FROM posts p WHERE p.published = 1
     ${documentSchema ? "AND NOT EXISTS (SELECT 1 FROM document_content dc WHERE dc.kind = 'post' AND dc.record_id = p.id AND dc.published_key IS NULL)" : ""}
     AND (${scopes.map(matchesScope).join(" OR ")})
     AND (INSTR(${normalizedColumn("p.title")}, ?) > 0 OR INSTR(${normalizedColumn("COALESCE(p.excerpt, '')")}, ?) > 0 OR ${matchesScope()})
     ORDER BY ${POST_DATE_ORDER} LIMIT 50`,
  ).bind(...scopes.flatMap((scope) => [scope, scope, scope]), query, query, query, query, query).all<ScopedPostResult>();
  return Response.json(result.results);
}
