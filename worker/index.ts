import { Hono } from "hono";
import { clearSessionCookie, createSessionCookie, isAuthenticated, passwordMatches } from "./lib/auth.ts";

type AppEnv = { Bindings: Env & { ADMIN_PASSWORD: string; SESSION_SECRET: string } };

interface PostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: "draft" | "published";
  cover_key: string | null;
  content_key: string;
  created_at: number;
  updated_at: number;
  published_at: number | null;
}

const MAX_UPLOAD = 10 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
};
const EMPTY_DOC = { type: "doc", content: [{ type: "paragraph" }] };

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

const toMeta = (row: PostRow) => {
  const meta: Partial<PostRow> = { ...row };
  delete meta.content_key;
  return meta;
};

const app = new Hono<AppEnv>();

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal error" }, 500);
});

// Public
app.get("/api/posts", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT id, slug, title, excerpt, status, cover_key, created_at, updated_at, published_at FROM posts WHERE status = 'published' ORDER BY published_at DESC LIMIT 100",
  ).all();
  return c.json({ posts: results });
});

app.get("/api/posts/:slug", async (c) => {
  const row = await c.env.DB.prepare("SELECT * FROM posts WHERE slug = ? AND status = 'published'")
    .bind(c.req.param("slug"))
    .first<PostRow>();
  if (!row) return c.json({ error: "Not found" }, 404);
  const obj = await c.env.CONTENT.get(row.content_key);
  return c.json({ post: toMeta(row), content: obj ? await obj.json() : EMPTY_DOC });
});

app.get("/api/media/:key{.+}", async (c) => {
  const obj = await c.env.UPLOADS.get(c.req.param("key"));
  if (!obj) return c.notFound();
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("etag", obj.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  headers.set("x-content-type-options", "nosniff");
  return new Response(obj.body, { headers });
});

// Auth
app.post("/api/auth/login", async (c) => {
  const body = await c.req.json<{ password?: string }>().catch(() => ({}) as { password?: string });
  if (!body.password || !(await passwordMatches(body.password, c.env.ADMIN_PASSWORD))) {
    return c.json({ error: "Invalid credentials" }, 401);
  }
  const secure = new URL(c.req.url).protocol === "https:";
  c.header("Set-Cookie", await createSessionCookie(c.env.SESSION_SECRET, secure));
  return c.json({ ok: true });
});

app.post("/api/auth/logout", (c) => {
  c.header("Set-Cookie", clearSessionCookie());
  return c.json({ ok: true });
});

app.get("/api/auth/me", async (c) =>
  c.json({ authenticated: await isAuthenticated(c.req.header("cookie"), c.env.SESSION_SECRET) }),
);

// Admin
const admin = new Hono<AppEnv>();

admin.use("*", async (c, next) => {
  if (!(await isAuthenticated(c.req.header("cookie"), c.env.SESSION_SECRET))) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
});

admin.get("/posts", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT id, slug, title, excerpt, status, cover_key, created_at, updated_at, published_at FROM posts ORDER BY updated_at DESC",
  ).all();
  return c.json({ posts: results });
});

admin.get("/posts/:id", async (c) => {
  const row = await c.env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(c.req.param("id")).first<PostRow>();
  if (!row) return c.json({ error: "Not found" }, 404);
  const obj = await c.env.CONTENT.get(row.content_key);
  return c.json({ post: toMeta(row), content: obj ? await obj.json() : EMPTY_DOC });
});

interface PostInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  status?: "draft" | "published";
  coverKey?: string | null;
  content?: unknown;
}

async function uniqueSlug(db: D1Database, base: string, excludeId?: string) {
  const root = base || "post";
  let slug = root;
  for (let i = 2; ; i++) {
    const hit = await db
      .prepare("SELECT id FROM posts WHERE slug = ? AND id != ?")
      .bind(slug, excludeId ?? "")
      .first();
    if (!hit) return slug;
    slug = `${root}-${i}`;
  }
}

admin.post("/posts", async (c) => {
  const input = await c.req.json<PostInput>().catch(() => ({}) as PostInput);
  const title = input.title?.trim() || "Untitled";
  const id = crypto.randomUUID();
  const now = Date.now();
  const slug = await uniqueSlug(c.env.DB, slugify(input.slug || title));
  const contentKey = `posts/${id}.json`;
  await c.env.CONTENT.put(contentKey, JSON.stringify(input.content ?? EMPTY_DOC), {
    httpMetadata: { contentType: "application/json" },
  });
  const status = input.status === "published" ? "published" : "draft";
  await c.env.DB.prepare(
    "INSERT INTO posts (id, slug, title, excerpt, status, cover_key, content_key, created_at, updated_at, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  )
    .bind(id, slug, title, input.excerpt ?? "", status, input.coverKey ?? null, contentKey, now, now, status === "published" ? now : null)
    .run();
  return c.json({ id, slug }, 201);
});

admin.put("/posts/:id", async (c) => {
  const id = c.req.param("id");
  const row = await c.env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first<PostRow>();
  if (!row) return c.json({ error: "Not found" }, 404);
  const input = await c.req.json<PostInput>().catch(() => ({}) as PostInput);
  const now = Date.now();
  const title = input.title?.trim() || row.title;
  const slug = input.slug !== undefined ? await uniqueSlug(c.env.DB, slugify(input.slug || title), id) : row.slug;
  const status = input.status ?? row.status;
  const publishedAt = status === "published" ? (row.published_at ?? now) : null;
  if (input.content !== undefined) {
    await c.env.CONTENT.put(row.content_key, JSON.stringify(input.content), {
      httpMetadata: { contentType: "application/json" },
    });
  }
  await c.env.DB.prepare(
    "UPDATE posts SET slug = ?, title = ?, excerpt = ?, status = ?, cover_key = ?, updated_at = ?, published_at = ? WHERE id = ?",
  )
    .bind(slug, title, input.excerpt ?? row.excerpt, status, input.coverKey === undefined ? row.cover_key : input.coverKey, now, publishedAt, id)
    .run();
  return c.json({ id, slug });
});

admin.delete("/posts/:id", async (c) => {
  const id = c.req.param("id");
  const row = await c.env.DB.prepare("SELECT content_key FROM posts WHERE id = ?").bind(id).first<{ content_key: string }>();
  if (!row) return c.json({ error: "Not found" }, 404);
  await c.env.CONTENT.delete(row.content_key);
  await c.env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
  return c.json({ ok: true });
});

admin.post("/uploads", async (c) => {
  const form = await c.req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return c.json({ error: "Missing file" }, 400);
  const ext = IMAGE_TYPES[file.type];
  if (!ext) return c.json({ error: "Unsupported file type" }, 415);
  if (file.size > MAX_UPLOAD) return c.json({ error: "File too large" }, 413);
  const key = `${new Date().getUTCFullYear()}/${crypto.randomUUID()}.${ext}`;
  await c.env.UPLOADS.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
  await c.env.DB.prepare("INSERT INTO uploads (key, filename, content_type, size, created_at) VALUES (?, ?, ?, ?, ?)")
    .bind(key, file.name.slice(0, 200), file.type, file.size, Date.now())
    .run();
  return c.json({ key, url: `/api/media/${key}` }, 201);
});

app.route("/api/admin", admin);

app.all("/api/*", (c) => c.json({ error: "Not found" }, 404));

export default app satisfies ExportedHandler<Env>;
