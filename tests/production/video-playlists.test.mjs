import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import worker from "../../dist/paulibaby/index.js";
import { playlistDatabase, playlistRequest, samplePlaylist, wrapDatabase } from "../fixtures/video-playlists.mjs";

test("built Worker persists ordered playlist CRUD and enforces public/admin role boundaries", async () => {
  const directory = mkdtempSync(join(tmpdir(), "playlist-test-"));
  const file = join(directory, "test.sqlite");
  let { db, sqlite } = playlistDatabase(file);
  let admin = playlistRequest(worker, db);
  let publicRequest = playlistRequest(worker, db, null);
  try {
    for (const token of [null, "missing", "playlist-expired"]) {
      const unauthorized = playlistRequest(worker, db, token);
      for (const [path, method] of [
        ["/api/admin/video-playlists", "GET"], ["/api/admin/video-playlists", "POST"],
        ["/api/admin/video-playlists/example", "PUT"], ["/api/admin/video-playlists/example", "DELETE"],
      ]) assert.equal((await unauthorized(path, method, method === "GET" ? undefined : samplePlaylist())).status, 401);
    }
    const created = await admin("/api/admin/video-playlists", "POST", samplePlaylist());
    assert.equal(created.status, 201);
    const { id } = await created.json();
    assert.deepEqual(await (await publicRequest("/api/video-playlists")).json(), []);
    assert.equal((await publicRequest(`/api/video-playlists/${id}`)).status, 404);
    assert.equal((await publicRequest("/api/video-playlists", "POST", samplePlaylist())).status, 405);
    assert.equal((await admin(`/api/admin/video-playlists/${id}`, "PUT", { ...samplePlaylist(), entries: [{ title: "Unsafe", url: "javascript:bad" }] })).status, 400);
    assert.equal((await admin(`/api/admin/video-playlists/${id}`, "PUT", null)).status, 400);
    const updated = samplePlaylist(1);
    updated.entries.reverse();
    assert.equal((await admin(`/api/admin/video-playlists/${id}`, "PUT", updated)).status, 200);

    sqlite.close();
    sqlite = new DatabaseSync(file);
    db = wrapDatabase(sqlite);
    admin = playlistRequest(worker, db);
    publicRequest = playlistRequest(worker, db, null);
    const published = await (await publicRequest(`/api/video-playlists/${id}`)).json();
    assert.deepEqual(published.entries.map(entry => entry.title), ["Second performance", "First performance"]);
    assert.equal(published.entries[0].url, "https://vimeo.com/12345678/abcdef1234");
    assert.equal((await (await publicRequest("/api/video-playlists")).json())[0].video_count, 2);
    const editor = playlistRequest(worker, db, "playlist-editor");
    assert.equal((await editor(`/api/admin/video-playlists/${id}`, "DELETE")).status, 403);
    assert.equal((await editor("/api/admin/video-playlists", "POST", samplePlaylist())).status, 201);
    assert.equal((await editor(`/api/admin/video-playlists/${id}`, "PUT", { ...updated, entries: updated.entries.slice(0, 1) })).status, 200);
    assert.equal((await (await publicRequest(`/api/video-playlists/${id}`)).json()).entries.length, 1);

    sqlite.exec(`CREATE TRIGGER reject_video BEFORE INSERT ON video_playlist_entries WHEN NEW.title = 'Rollback' BEGIN SELECT RAISE(ABORT, 'fixture failure'); END;`);
    const rejected = await admin(`/api/admin/video-playlists/${id}`, "PUT", {
      ...updated, title: "Should not persist", entries: [{ ...updated.entries[0], title: "Rollback" }],
    });
    assert.equal(rejected.status, 503);
    assert.equal((await (await publicRequest(`/api/video-playlists/${id}`)).json()).title, "Music videos");
    assert.equal((await (await publicRequest(`/api/video-playlists/${id}`)).json()).entries.length, 1);
    assert.equal((await admin(`/api/admin/video-playlists/${id}`, "PUT", samplePlaylist(0))).status, 200);
    assert.equal((await publicRequest(`/api/video-playlists/${id}`)).status, 404);
    assert.equal((await admin(`/api/admin/video-playlists/${id}`, "DELETE")).status, 200);
    assert.equal(sqlite.prepare("SELECT COUNT(*) AS n FROM video_playlist_entries WHERE playlist_id = ?").get(id).n, 0);
    assert.equal((await admin(`/api/admin/video-playlists/${id}`)).status, 404);
    assert.equal((await admin(`/api/admin/video-playlists/${id}`, "PUT", updated)).status, 404);
    const malformed = await worker.fetch(new Request("https://fixture.invalid/api/admin/video-playlists", {
      method: "POST", headers: { Authorization: "Bearer playlist-admin", "Content-Type": "application/json" }, body: "{",
    }), { DB: db });
    assert.equal(malformed.status, 400);
    const oversized = await worker.fetch(new Request("https://fixture.invalid/api/admin/video-playlists", {
      method: "POST", headers: { Authorization: "Bearer playlist-admin", "Content-Type": "application/json" }, body: "x".repeat(1024 * 1024 + 1),
    }), { DB: db });
    assert.equal(oversized.status, 413);
  } finally { sqlite.close(); rmSync(directory, { recursive: true }); }
});
