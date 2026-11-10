ALTER TABLE posts ADD COLUMN published_date TEXT;

UPDATE posts SET published_date = date(created_at) WHERE published_date IS NULL;

DROP INDEX IF EXISTS idx_posts_published_date;
CREATE INDEX idx_posts_published_date ON posts(published, published_date DESC, id DESC);
