import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";

export function playlistDatabase(path = ":memory:") {
  const sqlite = new DatabaseSync(path);
  sqlite.exec("PRAGMA foreign_keys = ON");
  sqlite.exec(readFileSync(new URL("./existing-site.sql", import.meta.url), "utf8"));
  sqlite.exec(readFileSync(new URL("../../migrations/0013_video_playlists.sql", import.meta.url), "utf8"));
  sqlite.exec(`
    INSERT INTO users (id,email,password_hash,role,first_name,last_name) VALUES
      (90,'playlist-admin@example.invalid','','admin','Test','Admin'),
      (91,'playlist-editor@example.invalid','','editor','Test','Editor');
    INSERT INTO sessions VALUES ('playlist-admin',90,'9999-12-31'), ('playlist-editor',91,'9999-12-31'),
      ('playlist-expired',90,'2000-01-01');
  `);
  return { sqlite, db: wrapDatabase(sqlite) };
}

export function wrapDatabase(sqlite) {
  return {
    prepare(sql) {
      const statement = (args = []) => ({
        async first() { return sqlite.prepare(sql).get(...args) ?? null; },
        async all() { return { results: sqlite.prepare(sql).all(...args) }; },
        async run() {
          const result = sqlite.prepare(sql).run(...args);
          return { results: [], meta: { changes: result.changes, last_row_id: Number(result.lastInsertRowid) } };
        },
      });
      return { ...statement(), bind: (...args) => statement(args) };
    },
    async batch(statements) {
      sqlite.exec("BEGIN");
      try {
        const results = [];
        for (const statement of statements) results.push(await statement.all());
        sqlite.exec("COMMIT");
        return results;
      } catch (error) { sqlite.exec("ROLLBACK"); throw error; }
    },
  };
}

export const samplePlaylist = (published = 0) => ({
  title: "Music videos",
  description: "Selected performances",
  published,
  entries: [
    { title: "First performance", url: "https://youtu.be/dQw4w9WgXcQ" },
    { title: "Second performance", url: "https://vimeo.com/12345678/abcdef1234" },
  ],
});

export function playlistRequest(worker, db, token = "playlist-admin") {
  return (path, method = "GET", body) => worker.fetch(new Request(`https://fixture.invalid${path}`, {
    method, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), "Content-Type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  }), { DB: db });
}
