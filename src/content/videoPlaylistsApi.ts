import { validatePlaylist, type PlaylistSummary } from "./videoPlaylists";
import { ContentError, readBoundedJson } from "./revisionStore";

const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

/** Called after the Worker's existing session/role gate for admin routes. */
export async function handleVideoPlaylists(request: Request, db: D1Database): Promise<Response | null> {
  const path = new URL(request.url).pathname;
  const match = path.match(/^\/api\/(admin\/)?video-playlists(?:\/([A-Za-z0-9-]+))?$/);
  if (!match) return null;
  const admin = !!match[1];
  const id = match[2];
  const method = request.method;
  if (!admin && method !== "GET") return reply({ error: "Method not allowed" }, 405);
  if (!["GET", "POST", "PUT", "DELETE"].includes(method) || (!id && ["PUT", "DELETE"].includes(method)) || (id && method === "POST")) {
    return reply({ error: "Method not allowed" }, 405);
  }
  try {
    if (method === "GET" && !id) {
      const result = await db.prepare(`
        SELECT p.id, p.title, p.description, p.published,
          (SELECT COUNT(*) FROM video_playlist_entries e WHERE e.playlist_id = p.id) AS video_count
        FROM video_playlists p ${admin ? "" : "WHERE p.published = 1"}
        ORDER BY p.created_at DESC, p.id
      `).all<PlaylistSummary>();
      return reply(result.results);
    }
    if (method === "GET") {
      const [playlists, entries] = await db.batch([
        db.prepare(`SELECT id, title, description, published FROM video_playlists WHERE id = ?${admin ? "" : " AND published = 1"}`).bind(id),
        db.prepare(`SELECT e.title, e.url FROM video_playlist_entries e JOIN video_playlists p ON p.id = e.playlist_id
          WHERE p.id = ?${admin ? "" : " AND p.published = 1"} ORDER BY e.position`).bind(id),
      ]);
      const playlist = playlists.results[0];
      if (!playlist) return reply({ error: "Playlist not found" }, 404);
      return reply({ ...playlist, video_count: entries.results.length, entries: entries.results });
    }
    if (id && !await db.prepare("SELECT id FROM video_playlists WHERE id = ?").bind(id).first()) {
      return reply({ error: "Playlist not found" }, 404);
    }
    if (method === "DELETE") {
      await db.batch([
        db.prepare("DELETE FROM video_playlist_entries WHERE playlist_id = ?").bind(id),
        db.prepare("DELETE FROM video_playlists WHERE id = ?").bind(id),
      ]);
      return reply({ success: true });
    }
    let input;
    try { input = validatePlaylist(await readBoundedJson(request)); }
    catch (error) {
      return reply({ error: error instanceof Error ? error.message : "Invalid playlist" }, error instanceof ContentError ? error.status : 400);
    }
    const playlistId = id ?? crypto.randomUUID();
    const statements = [
      id
        ? db.prepare("UPDATE video_playlists SET title = ?, description = ?, published = ?, updated_at = datetime('now') WHERE id = ?")
          .bind(input.title, input.description, input.published, playlistId)
        : db.prepare("INSERT INTO video_playlists (id, title, description, published) VALUES (?, ?, ?, ?)")
          .bind(playlistId, input.title, input.description, input.published),
      db.prepare("DELETE FROM video_playlist_entries WHERE playlist_id = ?").bind(playlistId),
      ...input.entries.map((entry, position) => db.prepare(
        "INSERT INTO video_playlist_entries (playlist_id, position, title, url) VALUES (?, ?, ?, ?)",
      ).bind(playlistId, position, entry.title, entry.url)),
    ];
    await db.batch(statements);
    return reply({ id: playlistId }, id ? 200 : 201);
  } catch (error) {
    console.error(JSON.stringify({ event: "video_playlist_failure", message: error instanceof Error ? error.message : String(error) }));
    return reply({ error: "Playlist storage unavailable. Please try again." }, 503);
  }
}
