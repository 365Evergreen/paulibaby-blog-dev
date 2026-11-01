-- All required metadata columns must exist before the additive upgrade.
SELECT id, slug, title, excerpt, body, cover_image, published, template_id, template_content, created_at, updated_at FROM posts LIMIT 0;
SELECT id, slug, title, excerpt, body, cover_image, published, template_id, template_content, created_at, updated_at FROM pages LIMIT 0;
SELECT id, email, password_hash, role, first_name, last_name FROM users LIMIT 0;
SELECT token, user_id, expires_at FROM sessions LIMIT 0;
SELECT id, name, slug FROM categories LIMIT 0;
SELECT post_id, category_id FROM post_categories LIMIT 0;
SELECT id, template_type, schema FROM templates LIMIT 0;
