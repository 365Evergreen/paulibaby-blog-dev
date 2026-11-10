import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { parsePublishedDate, postPublicationDate, POST_DATE_ORDER } from "../src/content/postPublicationDate.ts";

test("publication dates accept past calendar dates, reject malformed dates, and default blanks to today", () => {
  for (const value of ["1969-09-26", "2000-02-29", "2024-02-29", "2099-12-31"]) {
    assert.deepEqual(parsePublishedDate(value), { value });
  }
  for (const value of ["2023-02-29", "2026-02-30", "2026-13-01", "26-1-1", "2026-01-01T00:00:00Z", 123, {}, " "]) {
    assert.ok("error" in parsePublishedDate(value));
  }
  for (const value of [undefined, null, ""]) {
    assert.deepEqual(parsePublishedDate(value, new Date("2026-11-10T18:00:00Z")), { value: "2026-11-10" });
  }
  assert.equal(postPublicationDate({ published_date: "1969-09-26", created_at: "2026-11-10" }), "1969-09-26");
  assert.equal(postPublicationDate({ published_date: null, created_at: "2026-11-10" }), "2026-11-10");
});

test("publication date migration backfills legacy rows and fixes the initial nonexistent-column index", () => {
  const db = new DatabaseSync(":memory:");
  try {
    db.exec(readFileSync(new URL("../migrations/0001_init.sql", import.meta.url), "utf8"));
    db.exec("UPDATE posts SET created_at = '1969-09-26 12:34:56' WHERE id = 1");
    db.exec(readFileSync(new URL("../migrations/0012_post_published_date.sql", import.meta.url), "utf8"));
    assert.equal(db.prepare("SELECT published_date FROM posts WHERE id = 1").get().published_date, "1969-09-26");
    assert.ok(db.prepare("SELECT name FROM sqlite_master WHERE name = 'idx_posts_published_date'").get());
  } finally { db.close(); }
});

test("publication ordering uses backdated values instead of creation time, with legacy fallback and stable ties", () => {
  const db = new DatabaseSync(":memory:");
  try {
    db.exec(`CREATE TABLE posts(id INTEGER PRIMARY KEY, published_date TEXT, created_at TEXT);
      INSERT INTO posts VALUES
      (1,'1969-09-26','2026-11-10'), (2,'2024-01-01','2020-01-01'),
      (3,NULL,'2025-01-01'), (4,'2024-01-01','2026-11-10');`);
    assert.deepEqual(db.prepare(`SELECT id FROM posts p ORDER BY ${POST_DATE_ORDER}`).all().map((row) => row.id), [3, 4, 2, 1]);
  } finally { db.close(); }
});
