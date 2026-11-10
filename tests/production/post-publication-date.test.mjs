import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import worker from "../../dist/paulibaby/index.js";

test("built Worker persists backdated post dates and returns publication-date order", async () => {
  // In-process API/database regression only. No browser, authenticated page,
  // deployed service or real user session is opened.
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(readFileSync(new URL("../fixtures/existing-site.sql", import.meta.url), "utf8"));
  sqlite.exec(`
    INSERT INTO users (id,email,password_hash,role,first_name,last_name) VALUES (1,'fixture@example.invalid','','admin','Local','Fixture');
    INSERT INTO sessions VALUES ('local-date-test',1,'9999-12-31');
  `);
  const DB = {
    prepare(sql) {
      const statement = (args = []) => ({
        async first() { return sqlite.prepare(sql).get(...args) ?? null; },
        async all() { return { results: sqlite.prepare(sql).all(...args) }; },
        async run() {
          const result = sqlite.prepare(sql).run(...args);
          return { meta: { changes: result.changes, last_row_id: Number(result.lastInsertRowid) } };
        },
      });
      return { ...statement(), bind: (...args) => statement(args) };
    },
  };
  const request = (path, method = "GET", body) => worker.fetch(
    new Request(`https://fixture.invalid${path}`, {
      method,
      headers: { Authorization: "Bearer local-date-test", "Content-Type": "application/json" },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    }),
    { DB },
  );
  const payload = (slug, date) => ({ slug, title: slug, body: "", published: 1, published_date: date });
  try {
    const create = await request("/api/admin/posts", "POST", payload("older", "1969-09-26"));
    assert.equal(create.status, 201);
    const { id } = await create.json();
    assert.equal(sqlite.prepare("SELECT published_date FROM posts WHERE id = ?").get(id).published_date, "1969-09-26");
    const newer = await request("/api/admin/posts", "POST", payload("newer", "2024-01-01"));
    assert.equal(newer.status, 201);
    for (const path of ["/api/posts", "/api/admin/posts"]) {
      const list = await (await request(path)).json();
      assert.ok(list.findIndex((post) => post.slug === "newer") < list.findIndex((post) => post.slug === "older"));
      assert.equal(list.find((post) => post.slug === "older").published_date, "1969-09-26");
    }
    assert.equal((await request(`/api/admin/posts/${id}`, "PUT", payload("older", "1965-08-06"))).status, 200);
    assert.equal((await (await request(`/api/admin/posts/${id}`)).json()).published_date, "1965-08-06");
    const omitted = payload("older", undefined);
    assert.equal((await request(`/api/admin/posts/${id}`, "PUT", omitted)).status, 200);
    assert.equal(sqlite.prepare("SELECT published_date FROM posts WHERE id = ?").get(id).published_date, "1965-08-06");
    for (const published of [0, 1]) assert.equal((await request(`/api/admin/posts/${id}`, "PATCH", { published })).status, 200);
    assert.equal(sqlite.prepare("SELECT published_date FROM posts WHERE id = ?").get(id).published_date, "1965-08-06");
    assert.equal((await request("/api/admin/posts", "POST", payload("invalid", "2026-02-30"))).status, 400);
    assert.equal((await request(`/api/admin/posts/${id}`, "PUT", payload("older", "2026-02-30"))).status, 400);
    assert.equal(sqlite.prepare("SELECT published_date FROM posts WHERE id = ?").get(id).published_date, "1965-08-06");
    const blank = await request("/api/admin/posts", "POST", payload("blank-date", ""));
    assert.equal(blank.status, 201);
    const blankId = (await blank.json()).id;
    assert.equal(sqlite.prepare("SELECT published_date FROM posts WHERE id = ?").get(blankId).published_date, new Date().toISOString().slice(0, 10));
  } finally { sqlite.close(); }
});
