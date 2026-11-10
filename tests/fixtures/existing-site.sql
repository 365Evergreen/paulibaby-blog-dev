-- Local-only upgrade fixture, NOT a replay or repair of historical migrations.
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '', body TEXT NOT NULL DEFAULT '', cover_image TEXT,
  published INTEGER NOT NULL DEFAULT 0, published_date TEXT, created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')), template_id INTEGER,
  template_content TEXT NOT NULL DEFAULT '{}'
);
CREATE TABLE pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '', body TEXT NOT NULL DEFAULT '', cover_image TEXT,
  published INTEGER NOT NULL DEFAULT 0, created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')), template_id INTEGER,
  template_content TEXT NOT NULL DEFAULT '{}'
);
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, role TEXT NOT NULL,
  first_name TEXT NOT NULL, last_name TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL, expires_at TEXT NOT NULL);
CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT, slug TEXT, parent_id INTEGER);
CREATE TABLE post_categories (post_id INTEGER, category_id INTEGER, PRIMARY KEY(post_id,category_id));
CREATE TABLE templates (id INTEGER PRIMARY KEY, name TEXT, template_type TEXT, schema TEXT, created_at TEXT, updated_at TEXT);
INSERT INTO posts (slug,title,body,published) VALUES ('legacy-post','Legacy post','<p>Preserved legacy post</p>',1);
INSERT INTO pages (slug,title,body,published) VALUES ('legacy-page','Legacy page','<p>Preserved legacy page</p>',1);
