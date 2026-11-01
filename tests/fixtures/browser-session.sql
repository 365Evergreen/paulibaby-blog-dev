-- Isolated LOCAL database only. Never run on a deployed site's database.
INSERT OR IGNORE INTO users(email,password_hash,role,first_name,last_name)
VALUES ('browser-editor@example.invalid','not-a-login-password','editor','Local','Editor');
INSERT OR REPLACE INTO sessions(token,user_id,expires_at)
SELECT 'local-integration-browser-session',id,datetime('now','+1 day')
FROM users WHERE email='browser-editor@example.invalid';
