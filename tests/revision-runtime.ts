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
      const document = (text: string) => ({ format: "react-aria-page-builder", version: 1, tree: [{ id: "content", type: "rich-text", props: { data: { content: [{ id: "paragraph", type: "paragraph", children: [{ text }] }] } }, children: [] }] });
      const initialDocument = JSON.stringify(document("first"));
      const first = await saveRevision(env, identity, document("first"), 1, null);
      await rejects(publishedContent(env, identity), 404);
      checks.push("Unpublished R2 draft is invisible");
      await publishRevision(env, identity, first.revision, null);
      const metadata = await env.DB.prepare("SELECT published FROM pages WHERE id = ?").bind(identity.id).first<{ published: number }>();
      assert(metadata?.published === 1, "D1 transactional publish activates visibility");
      const saves = await Promise.allSettled([
        saveRevision(env, identity, document("second"), 1, first.revision),
        saveRevision(env, identity, document("third"), 1, first.revision),
      ]);
      assert(saves.filter(x => x.status === "fulfilled").length === 1, "Actual D1 CAS has one concurrent winner");
      const published = await publishedContent(env, identity);
      assert(JSON.stringify(published) === initialDocument, "Concurrent drafts do not change published R2 output");
      const pointers = await getPointers(env, identity);
      if (!pointers) throw new Error("Missing pointers");
      await rejects(publishRevision(env, identity, first.revision, first.revision), 409);
      checks.push("Stale publish is rejected");
      await publishRevision(env, identity, pointers.draft_revision, first.revision);
      assert(JSON.stringify(await publishedContent(env, identity)) !== initialDocument, "Publish advances only to the chosen immutable revision");
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
      for (const kind of ["pages", "posts"]) {
        const created = await site.fetch(request(`/api/admin/editor/${kind}`, "POST", { title: `Local ${kind}` }), hostEnv);
        const createdData = await created.json<{ id: number }>();
        assert(created.status === 201 && Number.isSafeInteger(createdData.id), `Host creates numeric ${kind} identities`);
        const listing = await site.fetch(request(`/api/admin/editor/${kind}`), hostEnv);
        const rows = await listing.json<{ id: number; format: string }[]>();
        assert(listing.status === 200 && rows.some(row => row.id === createdData.id && row.format === "empty"), `Host lists ${kind} without automatic legacy conversion`);
        const route = `/api/admin/${kind}/${createdData.id}`;
        const saved = await site.fetch(request(`${route}/content`, "PUT", { document: document("first"), expectedRevision: null }), hostEnv);
        const savedData = await saved.json<{ revision: string; publishedRevision: string | null }>();
        assert(saved.status === 200 && savedData.publishedRevision === null, `Actual ${kind} API validates and saves a canonical artifact draft`);
        assert((await site.fetch(request(`${route}/content`, "PUT", { document: document("stale"), expectedRevision: null }), hostEnv)).status === 409, `Actual ${kind} API rejects create-only overwrite`);
        assert((await site.fetch(request(`${route}/publish`, "POST", { expectedRevision: savedData.revision, expectedPublishedRevision: null }), hostEnv)).status === 200, `Actual ${kind} API publishes the saved revision`);
        const draft = await site.fetch(request(`${route}/content`, "PUT", { document: document("second"), expectedRevision: savedData.revision }), hostEnv);
        const draftData = await draft.json<{ revision: string; publishedRevision: string | null }>();
        assert(draft.status === 200 && draftData.publishedRevision === savedData.revision, `Actual ${kind} draft save preserves the published pointer`);
        const record = await env.DB.prepare(`SELECT slug FROM ${kind} WHERE id = ?`).bind(createdData.id).first<{ slug: string }>();
        const publicResult = await site.fetch(request(`/api/${kind}/${record?.slug}`), hostEnv);
        const publicValue = await publicResult.json<{ document: unknown }>();
        assert(publicResult.status === 200 && JSON.stringify(publicValue.document) === initialDocument, `Actual ${kind} public response never leaks the subsequent draft`);
        const invalidSchema = await site.fetch(request(`${route}/content`, "PUT", { document: { ...document("invalid"), revision: "forbidden" }, expectedRevision: draftData.revision }), hostEnv);
        assert(invalidSchema.status === 400, `Actual ${kind} schema rejects document revision fields`);
      }
      assert((await site.fetch(request(path, "PUT", { title: "overwrite", body: "bad", published: 1 }), hostEnv)).status === 409, "Legacy editor writes to R2 records are rejected");
      assert((await site.fetch(request(path, "PATCH", { published: 1 }), hostEnv)).status === 409, "Legacy publication toggle cannot bypass revision publishing");
      const disabledEnv = { ...hostEnv, CONTENT_API_ENABLED: "false", PUBLIC_JSON_ENABLED: "false" };
      assert((await site.fetch(request(path, "PUT", { title: "overwrite", body: "bad", published: 1 }), disabledEnv)).status === 409, "Disabling rollout flags cannot reopen legacy writes to enrolled records");
      assert((await site.fetch(request(path, "PATCH", { published: 1 }), disabledEnv)).status === 409, "Disabling rollout flags cannot bypass structured publication policy");
      assert((await site.fetch(request(path, "DELETE"), hostEnv)).status === 403, "Existing editor role cannot delete content");
      assert((await site.fetch(request(path, "GET", undefined, false), hostEnv)).status === 401, "Existing stored-session authorization is required");
      const slug = `renamed-${crypto.randomUUID()}`;
      const metadataResponse = await handleContentRequest(
        request(`${path}/metadata`, "PATCH", { slug, expectedRevision: pointers.draft_revision }), hostEnv,
        () => { throw new Error("Metadata updates must not invoke a document schema stub"); },
      );
      assert(metadataResponse?.status === 200, "Revision-aware metadata permits slug rename without rekeying R2");
      const rejectDocument = () => { throw new ContentError(400, "Document validation rejected"); };
      const invalidSave = await handleContentRequest(
        request(`${path}/content`, "PUT", { document: {}, expectedRevision: pointers.draft_revision }), hostEnv, rejectDocument,
      );
      assert(invalidSave?.status === 400, "Invalid new document fails explicitly before any pointer write");
      const invalidStored = await handleContentRequest(request(`${path}/content`), hostEnv, rejectDocument);
      assert(invalidStored?.status === 503, "Stored invalid schema is a storage failure, not a legacy fallback");
      const invalidPublish = await handleContentRequest(
        request(`${path}/publish`, "POST", { expectedRevision: pointers.draft_revision, expectedPublishedRevision: pointers.draft_revision }), hostEnv, rejectDocument,
      );
      assert(invalidPublish?.status === 503, "Invalid stored document cannot be published");
      const staleMetadata = await handleContentRequest(
        request(`${path}/metadata`, "PATCH", { slug: `stale-${crypto.randomUUID()}`, expectedRevision: first.revision }), hostEnv, rejectDocument,
      );
      assert(staleMetadata?.status === 409, "Stale metadata cannot change document identity");
      const publicResponse = await site.fetch(request(`/api/pages/${slug}`), hostEnv);
      const publicData = await publicResponse.json<{ document: unknown; body: string }>();
      assert(publicResponse.status === 200 && JSON.stringify(publicData.document) !== initialDocument && publicData.body === "", "Renamed public URL resolves the immutable published document without drafts");
      assert((await site.fetch(request(`/api/pages/${slug}`), disabledEnv)).status === 503, "Disabled structured rendering fails explicitly instead of falling back to legacy data");
      const current = await getPointers(env, identity);
      if (!current?.published_key) throw new Error("Missing published pointer");
      await env.CONTENT.put(current.published_key, "{corrupt");
      assert((await site.fetch(request(`/api/pages/${slug}`), hostEnv)).status === 503, "Corrupt referenced R2 content fails explicitly without legacy fallback");
      await env.CONTENT.delete(current.published_key);
      assert((await site.fetch(request(`/api/pages/${slug}`), hostEnv)).status === 503, "Missing referenced R2 content fails explicitly without legacy fallback");
      const mediaKey = `runtime-${crypto.randomUUID()}.mp3`;
      await env.media.put(mediaKey, "0123456789", { httpMetadata: { contentType: "audio/mpeg" } });
      const mediaResponse = await site.fetch(new Request(`http://local/api/media/${mediaKey}`, { headers: { Range: "bytes=2-4" } }), hostEnv);
      assert(mediaResponse.status === 206 && await mediaResponse.text() === "234", "Actual local R2 media range streams without production domain requests");
      const form = new FormData();
      form.set("file", new File(["local-media"], "local.txt", { type: "text/plain" }));
      form.set("alt_text", "Local upload description");
      form.set("title", "Local upload");
      const uploaded = await site.fetch(new Request("http://local/api/admin/media", {
        method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form,
      }), hostEnv);
      const uploadedData = await uploaded.json<{ id: number; r2_key: string; alt_text: string }>();
      assert(uploaded.status === 201 && uploadedData.alt_text === "Local upload description", "Authenticated upload preserves alt metadata in existing D1/R2 surfaces");
      const changedMedia = await site.fetch(request(`/api/admin/media/${uploadedData.id}`, "PUT", { alt_text: "Updated local description" }), hostEnv);
      assert(changedMedia.status === 200, "Existing media metadata update accepts editor role");
      const mediaList = await site.fetch(request("/api/admin/media"), hostEnv);
      const mediaRows = await mediaList.json<{ id: number; alt_text: string }[]>();
      assert(mediaList.status === 200 && mediaRows.some(row => row.id === uploadedData.id && row.alt_text === "Updated local description"), "Authenticated media listing round-trips updated alt metadata");
      const mediaRead = await site.fetch(request(`/api/media/${encodeURIComponent(uploadedData.r2_key)}`, "GET", undefined, false), hostEnv);
      assert(mediaRead.status === 200 && await mediaRead.text() === "local-media", "Uploaded media is readable on same origin without production requests");
      return Response.json({ ok: true, checks });
    } catch (error) {
      console.error(error);
      return Response.json({ ok: false, checks, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
  },
};
