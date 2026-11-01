import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import {
  saveRevision, publishRevision, publishedContent, getPointers, readBoundedJson,
} from "../src/content/revisionStore.ts";

function bindings() {
  const db = new DatabaseSync(":memory:");
  db.exec("CREATE TABLE pages(id INTEGER PRIMARY KEY, body TEXT, template_content TEXT DEFAULT '{}', published INTEGER DEFAULT 0, updated_at TEXT); CREATE TABLE posts(id INTEGER PRIMARY KEY, body TEXT, template_content TEXT DEFAULT '{}', published INTEGER DEFAULT 0, updated_at TEXT)");
  db.exec(readFileSync(new URL("../migrations/0011_document_revisions.sql", import.meta.url), "utf8"));
  db.exec("INSERT INTO pages(id, body) VALUES (1, ''), (2, 'legacy'); INSERT INTO posts(id, body) VALUES (1, '')");
  const objects = new Map();
  const DB = {
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async first() { return db.prepare(sql).get(...args) ?? null; },
            async run() { return { meta: { changes: Number(db.prepare(sql).run(...args).changes) } }; },
          };
        },
      };
    },
    async batch(statements) {
      db.exec("BEGIN");
      try {
        const results = [];
        for (const statement of statements) results.push(await statement.run());
        db.exec("COMMIT");
        return results;
      } catch (error) { db.exec("ROLLBACK"); throw error; }
    },
  };
  const CONTENT = {
    async put(key, payload) {
      assert.equal(objects.has(key), false, "revision keys must be immutable");
      const etag = crypto.randomUUID();
      objects.set(key, { etag, size: Buffer.byteLength(payload), json: async () => JSON.parse(payload) });
      return { etag };
    },
    async get(key) { return objects.get(key) ?? null; },
  };
  return { DB, CONTENT, db, objects };
}
const page = { kind: "page", id: 1 };

test("page/post identities are isolated, drafts never leak and publish pins an immutable revision", async () => {
  const env = bindings();
  try {
    const first = await saveRevision(env, page, { title: "draft one" }, 1, null);
    await assert.rejects(publishedContent(env, page), { status: 404 });
    await publishRevision(env, page, first.revision, null);
    const second = await saveRevision(env, page, { title: "draft two" }, 1, first.revision);
    assert.deepEqual(await publishedContent(env, page), { title: "draft one" });
    assert.equal(second.publishedRevision, first.revision);
    await saveRevision(env, { kind: "post", id: 1 }, { title: "post" }, 1, null);
    assert.equal((await getPointers(env, page)).draft_revision, second.revision);
    assert.equal(env.db.prepare("SELECT published FROM pages WHERE id=1").get().published, 1);
    await assert.rejects(publishRevision(env, page, first.revision, first.revision), { status: 409 });
    await publishRevision(env, page, second.revision, first.revision);
    assert.deepEqual(await publishedContent(env, page), { title: "draft two" });
  } finally { env.db.close(); }
});

test("legacy records are untouched and missing records fail explicitly", async () => {
  const env = bindings();
  try {
    assert.equal(await publishedContent(env, { kind: "page", id: 2 }), null);
    await assert.rejects(saveRevision(env, { kind: "page", id: 2 }, {}, 1, null), { status: 409 });
    await assert.rejects(saveRevision(env, { kind: "page", id: 99 }, {}, 1, null), { status: 404 });
    assert.equal(env.db.prepare("SELECT body FROM pages WHERE id=2").get().body, "legacy");
    assert.equal(env.objects.size, 0);
  } finally { env.db.close(); }
});

test("racing creates and saves have a single winner and unreferenced objects remain invisible", async () => {
  const env = bindings();
  try {
    const creates = await Promise.allSettled([saveRevision(env, page, { text: "a" }, 1, null), saveRevision(env, page, { text: "b" }, 1, null)]);
    assert.equal(creates.filter(x => x.status === "fulfilled").length, 1);
    assert.equal(creates.find(x => x.status === "rejected").reason.status, 409);
    const token = creates.find(x => x.status === "fulfilled").value.revision;
    const saves = await Promise.allSettled([saveRevision(env, page, { text: "c" }, 1, token), saveRevision(env, page, { text: "d" }, 1, token)]);
    assert.equal(saves.filter(x => x.status === "fulfilled").length, 1);
    assert.equal(saves.find(x => x.status === "rejected").reason.status, 409);
    assert.equal(env.objects.size, 4);
    await assert.rejects(publishedContent(env, page), { status: 404 });
  } finally { env.db.close(); }
});

test("missing/corrupt referenced R2 objects never fall back to legacy data or publish", async () => {
  const env = bindings();
  try {
    const saved = await saveRevision(env, page, {}, 1, null);
    const pointers = await getPointers(env, page);
    env.objects.delete(pointers.draft_key);
    await assert.rejects(publishRevision(env, page, saved.revision, null), { status: 503 });
    assert.equal(env.db.prepare("SELECT published FROM pages WHERE id=1").get().published, 0);
    env.objects.set(pointers.draft_key, { etag: "corrupt", size: 2, json: async () => ({}) });
    await assert.rejects(publishRevision(env, page, saved.revision, null), { status: 503 });
  } finally { env.db.close(); }
});

test("bounded JSON rejects malformed data and streaming bodies over 1 MiB", async () => {
  const request = (body) => new Request("https://local/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body });
  assert.deepEqual(await readBoundedJson(request('{"ok":true}')), { ok: true });
  await assert.rejects(readBoundedJson(request("{")), { status: 400 });
  await assert.rejects(readBoundedJson(request(" ".repeat(1024 * 1024 + 1))), { status: 413 });
  await assert.rejects(readBoundedJson(new Request("https://local", { method: "PUT", body: "{}" })), { status: 415 });
  await assert.rejects(readBoundedJson(new Request("https://local", { method: "PUT", headers: { "Content-Type": "text/json" }, body: "{}" })), { status: 415 });
});

test("storage failure between immutable write and D1 CAS never creates a visible pointer", async () => {
  const env = bindings();
  const prepare = env.DB.prepare;
  env.DB.prepare = function(sql) {
    const statement = prepare(sql);
    if (!sql.includes("INSERT INTO document_content")) return statement;
    return { bind() { return { async run() { throw new Error("simulated D1 failure"); } }; } };
  };
  try {
    await assert.rejects(saveRevision(env, page, { text: "uncommitted" }, 1, null), /simulated D1 failure/);
    assert.equal(env.objects.size, 1);
    assert.equal(await getPointers(env, page), null);
    assert.equal(await publishedContent(env, page), null);
  } finally { env.db.close(); }
});
