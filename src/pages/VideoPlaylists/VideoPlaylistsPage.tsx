import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { PlaylistSummary, VideoPlaylist } from "../../content/videoPlaylists";
import { playlistRequest } from "./playlistApi";
import PlaylistEmbed from "./PlaylistEmbed";
import styles from "./VideoPlaylists.module.css";

export default function VideoPlaylistsPage() {
  const { id } = useParams();
  return <PlaylistView key={id ?? "catalog"} id={id} />;
}

function PlaylistView({ id }: { id?: string }) {
  const [playlists, setPlaylists] = useState<PlaylistSummary[] | null>(null);
  const [playlist, setPlaylist] = useState<VideoPlaylist | null>(null);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const load = id
      ? playlistRequest<VideoPlaylist>(`/api/video-playlists/${encodeURIComponent(id)}`, { signal: controller.signal }).then(setPlaylist)
      : playlistRequest<PlaylistSummary[]>("/api/video-playlists", { signal: controller.signal }).then(setPlaylists);
    load.catch((error: unknown) => {
      if (!controller.signal.aborted) setError(error instanceof Error ? error.message : "Unable to load playlists");
    });
    return () => controller.abort();
  }, [id, retry]);
  const entry = playlist?.entries[selected];
  return (
    <div className={styles.page}>
      {id && <Link to="/video-playlists">Back to video playlists</Link>}
      <h1>{playlist?.title ?? "Video playlists"}</h1>
      {error ? <div role="alert"><p>{error}</p><button className={styles.button} onClick={() => { setError(""); setRetry(retry + 1); }}>Retry</button></div>
        : id ? playlist ? (
          <>
            <p className={styles.description}>{playlist.description}</p>
            <div className={styles.viewer}>
              <section aria-label="Selected video">
                {entry ? <PlaylistEmbed key={`${selected}:${entry.url}`} entry={entry} /> : <p>No videos available.</p>}
              </section>
              <nav aria-label="Playlist videos" className={styles.card}>
                <h2>Videos ({playlist.entries.length})</h2>
                <ol className={styles.entries}>
                  {playlist.entries.map((video, index) => (
                    <li key={index}>
                      <button className={styles.button} aria-current={index === selected ? "true" : undefined} onClick={() => setSelected(index)}>{video.title}</button>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </>
        ) : <p role="status">Loading playlist...</p>
          : playlists ? playlists.length ? (
            <div className={styles.grid}>
              {playlists.map(item => <article className={styles.card} key={item.id}>
                <h2><Link to={`/video-playlists/${encodeURIComponent(item.id)}`}>{item.title}</Link></h2>
                <p className={styles.description}>{item.description}</p>
                <p>{item.video_count} videos</p>
              </article>)}
            </div>
          ) : <p>No published video playlists yet.</p>
            : <p role="status">Loading playlists...</p>}
    </div>
  );
}
