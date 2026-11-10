import { test } from "node:test";
import assert from "node:assert/strict";
import { searchPublicPosts } from "../src/content/publicPostSearch.ts";
import { searchDatabase } from "./fixtures/public-search.mjs";

const params = (overrides = {}) => new URLSearchParams({ kind: "page", id: "1", q: "abbey", ...overrides });

test("page scope intersects query with slug or any category, never unrelated or unpublished posts", async () => {
  const { db, sqlite } = searchDatabase();
  try {
    const response = await searchPublicPosts(params(), db, true);
    assert.equal(response.status, 200);
    const results = await response.json();
    assert.deepEqual(results.map((post) => post.id), [7, 6, 2, 1]);
    assert.deepEqual(Object.keys(results[0]).sort(), ["category_slug", "excerpt", "id", "slug", "title"]);
    assert.deepEqual(await (await searchPublicPosts(params({ q: "THE-BEATLES" }), db, true)).json(), results);
    assert.deepEqual(await (await searchPublicPosts(params({ q: "elsewhere" }), db, true)).json(), []);
  } finally { sqlite.close(); }
});

test("post scopes come from stored slug and all assigned categories, not visitor-supplied scope", async () => {
  const { db, sqlite } = searchDatabase();
  try {
    const response = await searchPublicPosts(params({ kind: "post", id: "2", scope: "rolling-stones" }), db, true);
    assert.deepEqual((await response.json()).map((post) => post.id), [7, 6, 2, 1]);
    sqlite.exec("DELETE FROM post_categories WHERE post_id = 1");
    const slugOnly = await searchPublicPosts(params({ kind: "post", id: "1" }), db, true);
    assert.deepEqual((await slugOnly.json()).map((post) => post.id), [1]);
  } finally { sqlite.close(); }
});

test("blank queries do not enumerate posts; invalid or unavailable scopes fail explicitly", async () => {
  const { db, sqlite } = searchDatabase();
  try {
    assert.deepEqual(await (await searchPublicPosts(params({ q: "  " }), db, true)).json(), []);
    for (const overrides of [{ kind: "bad" }, { id: "0" }, { id: "NaN" }, { q: "x".repeat(201) }]) {
      assert.equal((await searchPublicPosts(params(overrides), db, true)).status, 400);
    }
    for (const overrides of [{ id: "99" }, { id: "2" }, { kind: "post", id: "4" }, { kind: "post", id: "5" }]) {
      assert.equal((await searchPublicPosts(params(overrides), db, true)).status, 404);
    }
    assert.equal((await searchPublicPosts(params({ id: "3" }), db, true)).status, 422);
    sqlite.exec("INSERT INTO document_content VALUES ('page', 1, NULL)");
    assert.equal((await searchPublicPosts(params(), db, true)).status, 404);
  } finally { sqlite.close(); }
});

test("queries are literal bound values, legacy schemas work, and results are bounded", async () => {
  const { db, sqlite } = searchDatabase();
  try {
    sqlite.exec("DROP TABLE document_content");
    for (const q of ["%", "_", "' OR 1=1 --", "not present"]) {
      assert.deepEqual(await (await searchPublicPosts(params({ q }), db, false)).json(), []);
    }
    const insert = sqlite.prepare("INSERT INTO posts (slug, title, excerpt, published) VALUES (?, 'Abbey', '', 1)");
    for (let i = 0; i < 60; i++) insert.run(`the-beatles-${i}`);
    const results = await (await searchPublicPosts(params(), db, false)).json();
    assert.equal(results.length, 50);
    assert.ok(results.every((post) => post.slug.startsWith("the-beatles")));
  } finally { sqlite.close(); }
});

test("scoped results sort by publication date even when creation order differs", async () => {
  const { db, sqlite } = searchDatabase();
  try {
    sqlite.exec("UPDATE posts SET published_date = '1969-09-26'; UPDATE posts SET published_date = '2024-01-01' WHERE id = 1");
    const results = await (await searchPublicPosts(params(), db, true)).json();
    assert.deepEqual(results.map((post) => post.id), [1, 7, 6, 2]);
  } finally { sqlite.close(); }
});
