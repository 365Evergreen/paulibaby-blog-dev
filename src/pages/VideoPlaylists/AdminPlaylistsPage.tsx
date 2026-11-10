import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { me } from "../../lib/auth";
import { validatePlaylist, type PlaylistInput, type PlaylistSummary, type VideoPlaylist } from "../../content/videoPlaylists";
import { playlistRequest } from "./playlistApi";
import styles from "./VideoPlaylists.module.css";

const base = "/api/admin/video-playlists";
const blank = (): PlaylistInput => ({ title: "", description: "", published: 0, entries: [] });

export default function AdminPlaylistsPage() {
  const [items, setItems] = useState<PlaylistSummary[] | null>(null);
  const [draft, setDraft] = useState<PlaylistInput | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dirty, setDirty] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    playlistRequest<PlaylistSummary[]>(base, { signal: controller.signal }).then(setItems).catch((error: Error) => {
      if (!controller.signal.aborted) setError(error.message);
    });
    me().then(identity => setIsAdmin(identity.role === "admin")).catch((error: Error) => setError(error.message));
    return () => controller.abort();
  }, [retry]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update(value: PlaylistInput) { setDraft(value); setDirty(true); setNotice(""); }
  function canDiscard() { return !dirty || window.confirm("Discard unsaved playlist changes?"); }

  async function edit(item: PlaylistSummary) {
    if (!canDiscard()) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const playlist = await playlistRequest<VideoPlaylist>(`${base}/${item.id}`);
      setId(item.id); setDraft(playlist); setDirty(false);
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to load playlist"); }
    finally { setBusy(false); }
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!draft) return;
    setError(""); setNotice(""); setBusy(true);
    try {
      const input = validatePlaylist(draft);
      const result = await playlistRequest<{ id: string }>(id ? `${base}/${id}` : base, {
        method: id ? "PUT" : "POST", body: JSON.stringify(input),
      });
      setId(result.id); setDraft(input); setDirty(false);
      setItems(await playlistRequest<PlaylistSummary[]>(base));
      setNotice("Playlist saved.");
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to save playlist"); }
    finally { setBusy(false); }
  }

  async function remove(item: PlaylistSummary) {
    if (!canDiscard() || !window.confirm(`Permanently delete "${item.title}" and its videos?`)) return;
    setBusy(true); setError(""); setNotice("");
    try {
      await playlistRequest(`${base}/${item.id}`, { method: "DELETE" });
      setItems(current => current?.filter(row => row.id !== item.id) ?? null);
      if (id === item.id) { setDraft(null); setId(null); setDirty(false); }
      setNotice("Playlist deleted.");
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to delete playlist"); }
    finally { setBusy(false); }
  }

  function move(index: number, direction: number) {
    if (!draft) return;
    const entries = [...draft.entries];
    [entries[index], entries[index + direction]] = [entries[index + direction], entries[index]];
    update({ ...draft, entries });
  }

  return (
    <div className={styles.page}>
      <div className={styles.actions}>
        <h1>Video playlists</h1>
        <button className={styles.button} disabled={busy} onClick={() => {
          if (canDiscard()) { setId(null); setDraft(blank()); setDirty(false); setError(""); setNotice(""); }
        }}>Add playlist</button>
        <Link to="/video-playlists">Public playlists</Link>
      </div>
      {error && <div role="alert"><p>{error}</p>{!items && <button className={styles.button} onClick={() => { setError(""); setRetry(retry + 1); }}>Retry</button>}</div>}
      {notice && <p role="status">{notice}</p>}
      <div className={styles.admin}>
        <section className={styles.card} aria-label="Saved playlists">
          {!items ? <p role="status">Loading playlists...</p> : !items.length ? <p>No playlists yet.</p> : (
            <ul className={styles.saved}>
              {items.map(item => <li key={item.id}>
                <strong>{item.title}</strong>
                <p>{item.published === 1 ? "Published" : "Draft"} - {item.video_count} videos</p>
                <div className={styles.actions}>
                  <button className={styles.button} disabled={busy} onClick={() => void edit(item)}>Edit {item.title}</button>
                  {item.published === 1 && <Link to={`/video-playlists/${item.id}`}>View</Link>}
                  {isAdmin && <button className={styles.button} disabled={busy} onClick={() => void remove(item)}>Delete {item.title}</button>}
                </div>
              </li>)}
            </ul>
          )}
        </section>
        {draft && <form className={styles.card} onSubmit={save}>
          <h2>{id ? "Edit playlist" : "New playlist"}</h2>
          <fieldset disabled={busy} className={styles.fields}>
            <label>Playlist title<input required maxLength={120} value={draft.title} onChange={event => update({ ...draft, title: event.target.value })} /></label>
            <label>Description<textarea maxLength={2000} value={draft.description} onChange={event => update({ ...draft, description: event.target.value })} /></label>
            <label>Status<select value={draft.published} onChange={event => update({ ...draft, published: event.target.value === "1" ? 1 : 0 })}>
              <option value={0}>Draft</option><option value={1}>Published</option>
            </select></label>
            <p>Use HTTPS YouTube or Vimeo video links (including unlisted Vimeo links). Up to 100 videos; published playlists need at least one video.</p>
            {draft.entries.map((entry, index) => <fieldset className={styles.videoFields} key={index}>
              <legend>Video {index + 1}</legend>
              <label>Video {index + 1} title<input required maxLength={200} value={entry.title} onChange={event => update({
                ...draft, entries: draft.entries.map((item, i) => i === index ? { ...item, title: event.target.value } : item),
              })} /></label>
              <label>Video {index + 1} URL<input required type="url" maxLength={2048} value={entry.url} onChange={event => update({
                ...draft, entries: draft.entries.map((item, i) => i === index ? { ...item, url: event.target.value } : item),
              })} /></label>
              <div className={styles.actions}>
                <button type="button" className={styles.button} disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Move video ${index + 1} up`}>Move up</button>
                <button type="button" className={styles.button} disabled={index === draft.entries.length - 1} onClick={() => move(index, 1)} aria-label={`Move video ${index + 1} down`}>Move down</button>
                <button type="button" className={styles.button} onClick={() => update({ ...draft, entries: draft.entries.filter((_, i) => i !== index) })} aria-label={`Remove video ${index + 1}`}>Remove</button>
              </div>
            </fieldset>)}
            <div className={styles.actions}>
              <button type="button" className={styles.button} disabled={draft.entries.length >= 100} onClick={() => update({ ...draft, entries: [...draft.entries, { title: "", url: "" }] })}>Add video</button>
              <button type="submit" className={styles.button}>Save playlist</button>
              <button type="button" className={styles.button} onClick={() => {
                if (canDiscard()) { setDraft(null); setId(null); setDirty(false); }
              }}>Cancel</button>
            </div>
          </fieldset>
          {busy && <p role="status">Saving...</p>}
        </form>}
      </div>
    </div>
  );
}
