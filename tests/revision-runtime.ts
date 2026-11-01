import {
  ContentError, getPointers, publishedContent, publishRevision, saveRevision,
} from "../src/content/revisionStore";
import site, { type Env } from "../src/worker";
import { handleContentRequest } from "../src/content/contentApi";

// Dedicated local test entry; not imported or routed by the deployment application.
export default {
  async fetch(_request: Request, env: Env) {
    const checks: string[] = [];
    const assert = (ok: boolean, message: string) => {
      if (!ok) throw new Error(message);
      checks.push(message);
    };
    const rejects = async (work: Promise<unknown>, status: number) => {
      try { await work; } catch (error) {
        if (error instanceof ContentError && error.status === status) return;
        throw error;
      }
      throw new Error(`Expected status ${status}`);
    };
    try {
      const row = await env.DB.prepare("INSERT INTO pages (slug, title) VALUES (?, ?)")
        .bind(`runtime-${crypto.randomUUID()}`, "Local runtime test").run();
      const identity = { kind: "page" as const, id: row.meta.last_row_id };
      const first = await saveRevision(env, identity, { text: "first" }, 1, null);
      await rejects(publishedContent(env, identity), 404);
      checks.push("Unpublished R2 draft is invisible");
      await publishRevision(env, identity, first.revision, null);
      const metadata = await env.DB.prepare("SELECT published FROM pages WHERE id = ?").bind(identity.id).first<{ published: number }>();
      assert(metadata?.published === 1, "D1 transactional publish activates visibility");
      const saves = await Promise.allSettled([
        saveRevision(env, identity, { text: "second" }, 1, first.revision),
        saveRevision(env, identity, { text: "third" }, 1, first.revision),
      ]);
      assert(saves.filter(x => x.status === "fulfilled").length === 1, "Actual D1 CAS has one concurrent winner");
      const published = await publishedContent(env, identity);
      assert(JSON.stringify(published) === '{"text":"first"}', "Concurrent drafts do not change published R2 output");
      const pointers = await getPointers(env, identity);
      if (!pointers) throw new Error("Missing pointers");
      await rejects(publishRevision(env, identity, first.revision, first.revision), 409);
      checks.push("Stale publish is rejected");
      await publishRevision(env, identity, pointers.draft_revision, first.revision);
      assert(JSON.stringify(await publishedContent(env, identity)) !== '{"text":"first"}', "Publish advances only to the chosen immutable revision");
      const hostEnv: Env = { ...env, CONTENT_API_ENABLED: "true", PUBLIC_JSON_ENABLED: "true" };
      const token = crypto.randomUUID();
      const user = await env.DB.prepare("INSERT INTO users(email,password_hash,role,first_name,last_name) VALUES (?, 'unused-local-fixture', 'editor', 'Local', 'Editor')")
        .bind(`${crypto.randomUUID()}@example.invalid`).run();
      await env.DB.prepare("INSERT INTO sessions(token,user_id,expires_at) VALUES (?, ?, datetime('now', '+1 day'))")
        .bind(token, user.meta.last_row_id).run();
      const request = (path: string, method = "GET", body?: unknown, auth = true) => new Request(`http://local${path}`, {
        method, headers: { "Content-Type": "application/json", ...(auth ? { Authorization: `Bearer ${token}` } : {}) },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      });
      const path = `/api/admin/pages/${identity.id}`;
      assert((await site.fetch(request(path, "PUT", { title: "overwrite", body: "bad", published: 1 }), hostEnv)).status === 409, "Legacy editor writes to R2 records are rejected");
      assert((await site.fetch(request(path, "PATCH", { published: 1 }), hostEnv)).status === 409, "Legacy publication toggle cannot bypass revision publishing");
      assert((await site.fetch(request(path, "DELETE"), hostEnv)).status === 403, "Existing editor role cannot delete content");
      assert((await site.fetch(request(path, "GET", undefined, false), hostEnv)).status === 401, "Existing stored-session authorization is required");
      const slug = `renamed-${crypto.randomUUID()}`;
      const metadataResponse = await handleContentRequest(
        request(`${path}/metadata`, "PATCH", { slug, expectedRevision: pointers.draft_revision }), hostEnv,
        () => { throw new Error("Metadata updates must not invoke a document schema stub"); },
      );
      assert(metadataResponse?.status === 200, "Revision-aware metadata permits slug rename without rekeying R2");
      const publicResponse = await site.fetch(request(`/api/pages/${slug}`), hostEnv);
      const publicData = await publicResponse.json<{ document: unknown; body: string }>();
      assert(publicResponse.status === 200 && JSON.stringify(publicData.document) !== '{"text":"first"}' && publicData.body === "", "Renamed public URL resolves the immutable published document without drafts");
      const current = await getPointers(env, identity);
      if (!current?.published_key) throw new Error("Missing published pointer");
      await env.CONTENT.delete(current.published_key);
      assert((await site.fetch(request(`/api/pages/${slug}`), hostEnv)).status === 503, "Missing referenced R2 content fails explicitly without legacy fallback");
      const mediaKey = `runtime-${crypto.randomUUID()}.mp3`;
      await env.media.put(mediaKey, "0123456789", { httpMetadata: { contentType: "audio/mpeg" } });
      const mediaResponse = await site.fetch(new Request(`http://local/api/media/${mediaKey}`, { headers: { Range: "bytes=2-4" } }), hostEnv);
      assert(mediaResponse.status === 206 && await mediaResponse.text() === "234", "Actual local R2 media range streams without production domain requests");
      return Response.json({ ok: true, checks });
    } catch (error) {
      console.error(error);
      return Response.json({ ok: false, checks, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
  },
};
