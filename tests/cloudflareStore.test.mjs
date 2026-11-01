import { test } from "node:test";
import assert from "node:assert/strict";
import { createCloudflareStore, remoteIdentity } from "../src/content/cloudflareStore.ts";
const revision = "12345678-1234-4123-8123-123456789abc";
const validate = value => {
  if (value === null || typeof value !== "object") throw new Error("Invalid test document");
  return value;
};
test("remote identities preserve page/post kinds and reject standalone string IDs", () => {
  assert.deepEqual(remoteIdentity({ kind: "post", id: "42" }), { kind: "post", id: 42 });
  for (const input of ["default", { kind: "page", id: "about" }, { kind: "page", id: 0 }, { kind: "wrong", id: 1 }]) assert.throws(() => remoteIdentity(input));
});
test("adapter uses authenticated snapshots and explicit CAS, propagating failure without clearing documents", async () => {
  const original = globalThis.fetch;
  const originalStorage = globalThis.localStorage;
  globalThis.localStorage = { getItem() { return "local-adapter-fixture"; } };
  const calls = [];
  const snapshots = [];
  let status = 200;
  let response = { document: { value: "original" }, revision, publishedRevision: null, format: "structured" };
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    assert.ok(init.headers.has("Authorization"), "Existing apiFetch token header is attached");
    return Response.json(response, { status });
  };
  const document = { value: "unsaved work" };
  const store = createCloudflareStore(validate, (identity, metadata) => snapshots.push({ identity, metadata }));
  try {
    const loaded = await store.load({ kind: "page", id: 1 });
    assert.deepEqual(loaded, { document: { value: "original" }, revision, publishedRevision: null });
    await assert.rejects(store.save({ kind: "page", id: 1 }, document), { status: 400 });
    assert.equal(calls.length, 1, "No unconditional remote write is issued");
    await store.save({ kind: "page", id: 1 }, document, { expectedRevision: revision });
    assert.equal(JSON.parse(calls.at(-1).init.body).expectedRevision, revision);
    response = { error: "Conflict: preserve unsaved work" };
    status = 409;
    const snapshotCount = snapshots.length;
    await assert.rejects(store.save({ kind: "page", id: 1 }, document, { expectedRevision: revision }), { code: "revision-conflict" });
    assert.equal(snapshots.length, snapshotCount);
    assert.deepEqual(document, { value: "unsaved work" });
    status = 401;
    await assert.rejects(store.load({ kind: "post", id: 1 }), { code: "unauthorized" });
    status = 200;
    response = { document: null, revision: null, publishedRevision: null, format: "legacy" };
    await assert.rejects(store.load({ kind: "page", id: 1 }), { status: 409 });
    response = { document: null, revision: null, publishedRevision: null, format: "empty" };
    assert.equal(await store.load({ kind: "page", id: 1 }), null);
  } finally {
    globalThis.fetch = original;
    globalThis.localStorage = originalStorage;
  }
});
