import { DatabaseSync } from "node:sqlite";

export function searchDatabase() {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(`
    CREATE TABLE pages (id INTEGER PRIMARY KEY, slug TEXT, published INTEGER);
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY, slug TEXT, title TEXT, excerpt TEXT,
      published INTEGER, created_at TEXT DEFAULT '2026-01-01'
    );
    CREATE TABLE categories (id INTEGER PRIMARY KEY, slug TEXT, name TEXT);
    CREATE TABLE post_categories (post_id INTEGER, category_id INTEGER);
    CREATE TABLE document_content (kind TEXT, record_id INTEGER, published_key TEXT);
    INSERT INTO pages VALUES (1, 'the-beatles', 1), (2, 'private', 0), (3, '   ', 1);
    INSERT INTO categories VALUES
      (1, 'the-beatles', 'The Beatles'), (2, 'rolling-stones', 'Rolling Stones'),
      (3, 'fab-four', 'The Beatles archives');
    INSERT INTO posts (id, slug, title, excerpt, published) VALUES
      (1, 'the-beatles-abbey-road', 'Abbey Road', 'Album review', 1),
      (2, 'album-review', 'Abbey revisited', 'Beatles album', 1),
      (3, 'unrelated-abbey', 'Abbey elsewhere', 'Unrelated', 1),
      (4, 'the-beatles-draft', 'Abbey draft', '', 0),
      (5, 'the-beatles-hidden', 'Abbey hidden', '', 1),
      (6, 'secondary-category', 'Abbey secondary category', '', 1),
      (7, 'name-only', 'Abbey category name', '', 1);
    INSERT INTO post_categories VALUES (2, 1), (3, 2), (6, 2), (6, 1), (7, 3);
    INSERT INTO document_content VALUES ('post', 5, NULL);
  `);
  // Execute the production SQL against real SQLite rather than interpreting or
  // duplicating its scope predicates in a mock.
  const db = {
    prepare(sql) {
      return {
        bind(...params) {
          return {
            async first() { return sqlite.prepare(sql).get(...params) ?? null; },
            async all() { return { results: sqlite.prepare(sql).all(...params) }; },
          };
        },
      };
    },
  };
  return { db, sqlite };
}
