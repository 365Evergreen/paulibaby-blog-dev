-- Separate pointers avoid exposing draft storage metadata through legacy SELECT * APIs.
-- No existing content is copied, rewritten, or enrolled in the new editor.
CREATE TABLE document_content (
  kind TEXT NOT NULL CHECK (kind IN ('page', 'post')),
  record_id INTEGER NOT NULL,
  draft_key TEXT NOT NULL,
  draft_revision TEXT NOT NULL,
  draft_etag TEXT NOT NULL,
  schema_version INTEGER NOT NULL,
  published_key TEXT,
  published_revision TEXT,
  published_etag TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (kind, record_id)
);
