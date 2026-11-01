import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link, useBlocker, useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../lib/auth";
import { createCloudflareStore, CloudflareStoreError, type DocumentIdentity, type DocumentSummary, type RevisionMetadata } from "../content/cloudflareStore";
import { validatePageDocument, type PageDocument, type EditorHandle } from "../content/editorArtifact";
import { editorTheme, loadEditorModule } from "../content/artifactLoader";
import { listEditorMedia, uploadEditorMedia, type EditorMedia } from "../content/mediaApi";
import styles from "./IntegratedEditorPage.module.css";

function validate(value: unknown): PageDocument {
  const result = validatePageDocument(value);
  if (!result.ok) throw new CloudflareStoreError(400, result.errors.join("; "));
  return result.document;
}
const href = (identity: DocumentIdentity) => `/admin/editor/${identity.kind === "page" ? "pages" : "posts"}/${identity.id}`;
const errorMessage = (error: unknown) => error instanceof Error ? error.message : "Unexpected editor integration failure";

function MediaPicker({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [items, setItems] = useState<EditorMedia[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    dialog.current?.showModal();
    listEditorMedia().then(value => { if (active) setItems(value); }, cause => { if (active) setError(errorMessage(cause)); });
    return () => { active = false; };
  }, []);
  return <dialog ref={dialog} className={styles.mediaPicker} aria-labelledby="media-picker-title" onCancel={onClose}>
    <h2 id="media-picker-title">Existing media</h2>
    <p>Copy a media URL into the selected image, audio, video or gallery control. Your unsaved document stays open.</p>
    <button onClick={onClose}>Close media</button>
    {error && <p role="alert">{error}</p>}
    {items === null ? !error && <p role="status">Loading media...</p> : <ul>
      {items.map(item => <li key={item.id}>
        <strong>{item.title || item.filename}</strong>
        <p>Alt text: {item.alt || "Not provided; add descriptive alt text or mark the image decorative."}</p>
        <label htmlFor={`media-url-${item.id}`}>URL for {item.filename}</label>
        <input id={`media-url-${item.id}`} readOnly value={item.url} onFocus={event => event.currentTarget.select()} />
      </li>)}
    </ul>}
  </dialog>;
}

function EditorIndex() {
  const navigate = useNavigate();
  const store = useMemo(() => createCloudflareStore(validate), []);
  const [items, setItems] = useState<DocumentSummary[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let active = true;
    store.list().then(value => { if (active) setItems(value); }, cause => { if (active) setError(errorMessage(cause)); });
    return () => { active = false; };
  }, [store]);
  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const kind = data.get("kind");
    const title = data.get("title");
    if ((kind !== "page" && kind !== "post") || typeof title !== "string") return;
    setBusy(true); setError("");
    try { navigate(href(await store.create(kind, title))); }
    catch (cause) { setError(errorMessage(cause)); }
    finally { setBusy(false); }
  }
  return <main className={styles.index}>
    <h1>Content editor</h1>
    <p>New pages and posts use staged JSON publishing. Existing content stays unchanged.</p>
    {error && <p role="alert">{error}</p>}
    <form onSubmit={create} className={styles.controls}>
      <label>Content kind <select name="kind"><option value="page">Page</option><option value="post">Post</option></select></label>
      <label>Title <input name="title" required maxLength={200} /></label>
      <button type="submit" disabled={busy}>{busy ? "Creating..." : "Create draft"}</button>
    </form>
    <h2>Pages and posts</h2>
    {items === null ? <p role="status">Loading content...</p> : <ul>
      {items.map(item => <li key={`${item.kind}:${item.id}`}>
        <Link to={item.format === "legacy" ? `/admin/${item.kind}-editor/${item.id}` : href(item)}>{item.title || `${item.kind} ${item.id}`}</Link>
        {" "}({item.kind}, {item.format === "legacy" ? "legacy editor" : item.published === 1 ? "published" : "draft"})
      </li>)}
    </ul>}
  </main>;
}

function EditorDocument({ identity }: { identity: DocumentIdentity }) {
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dirtyRef = useRef(false);
  const [dirty, setDirty] = useState(false);
  const [metadata, setMetadata] = useState<RevisionMetadata>({ revision: null, publishedRevision: null });
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [showMedia, setShowMedia] = useState(false);
  const blocker = useBlocker(() => dirtyRef.current);
  const blocked = blocker.state === "blocked";
  const store = useMemo(() => createCloudflareStore(validate, (_identity, value) => setMetadata(value)), []);
  const identityKey = `${identity.kind}:${identity.id}`;
  useEffect(() => {
    let active = true;
    let handle: EditorHandle | undefined;
    loadEditorModule().then(module => {
      if (!active || !container.current) return;
      handle = module.mountEditor({
        container: container.current, identity, storage: store,
        routeBasePath: "/admin/editor/", assetBasePath: `${location.origin}/`,
        theme: editorTheme,
        navigate: target => { if (dirtyRef.current) setPendingHref(target); else navigate(target); },
        onDirtyChange: value => { dirtyRef.current = value; setDirty(value); },
        uploadMedia: async file => (await uploadEditorMedia(file, file.name)).url,
      });
    }).catch(cause => { if (active) setError(errorMessage(cause)); });
    return () => { active = false; handle?.unmount(); };
    // The keyed document component owns its identity for its entire mounted lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identityKey, store, navigate]);
  useEffect(() => {
    const unload = (event: BeforeUnloadEvent) => { if (dirtyRef.current) event.preventDefault(); };
    const click = (event: MouseEvent) => {
      if (!dirtyRef.current || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const target = new URL(anchor.href);
      if (target.origin !== location.origin || target.href === location.href) return;
      event.preventDefault(); event.stopPropagation();
      setPendingHref(`${target.pathname}${target.search}${target.hash}`);
    };
    window.addEventListener("beforeunload", unload);
    document.addEventListener("click", click, true);
    return () => { window.removeEventListener("beforeunload", unload); document.removeEventListener("click", click, true); };
  }, []);
  useEffect(() => { if (pendingHref || blocked) dialog.current?.showModal(); else dialog.current?.close(); }, [pendingHref, blocked]);
  function keepEditing() {
    setPendingHref(null);
    if (blocker.state === "blocked") blocker.reset();
  }
  function leave() {
    dirtyRef.current = false;
    setDirty(false);
    const target = pendingHref;
    setPendingHref(null);
    if (blocker.state === "blocked") blocker.proceed();
    else if (target) navigate(target);
  }
  async function publish() {
    setBusy(true); setError(""); setStatus("");
    try { setMetadata(await store.publish(identity, metadata)); setStatus("Saved revision published. Subsequent edits remain drafts."); }
    catch (cause) { setError(errorMessage(cause)); }
    finally { setBusy(false); }
  }
  async function updateMetadata(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!metadata.revision) { setError("Save a structured draft before updating its slug."); return; }
    const data = new FormData(event.currentTarget);
    const slug = data.get("slug");
    if (typeof slug !== "string") return;
    setBusy(true); setError("");
    try { await store.updateMetadata(identity, { slug }, metadata.revision); setStatus("Slug updated; content revision identity is unchanged."); }
    catch (cause) { setError(errorMessage(cause)); }
    finally { setBusy(false); }
  }
  return <div>
    <header className={styles.controls}>
      <Link to="/admin/editor">All content</Link>
      <span role="status">{dirty ? "Unsaved changes" : metadata.revision ? metadata.revision === metadata.publishedRevision ? "Published revision" : "Saved draft" : "Not saved yet"}</span>
      <button disabled={busy || dirty || !metadata.revision} onClick={() => void publish()}>Publish saved revision</button>
      <form onSubmit={updateMetadata}><label>Slug <input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={200} /></label><button disabled={busy || !metadata.revision}>Update slug</button></form>
      <Link to="/admin/media-library">Media library</Link>
      <button onClick={() => setShowMedia(true)}>Browse existing media</button>
    </header>
    {error && <p role="alert" className={styles.message}>{error}</p>}
    {status && <p role="status" className={styles.message}>{status}</p>}
    <div ref={container} className={styles.canvas} />
    {showMedia && <MediaPicker onClose={() => setShowMedia(false)} />}
    <dialog ref={dialog} aria-labelledby="discard-title" onCancel={keepEditing}>
      <h2 id="discard-title">Keep unsaved work?</h2>
      <p>Save or export your work in the editor before leaving. Leaving discards unsaved changes.</p>
      <button onClick={keepEditing}>Keep editing</button>
      <button onClick={leave}>Discard changes and leave</button>
    </dialog>
  </div>;
}

export default function IntegratedEditorPage() {
  const { kind, id } = useParams<{ kind: string; id: string }>();
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    apiFetch("/api/admin/editor/status").then(async response => {
      if (!response.ok) throw new Error(`Editor authorization/configuration failed (${response.status})`);
      const value: unknown = await response.json();
      if (!value || typeof value !== "object" || !("enabled" in value) || typeof value.enabled !== "boolean") throw new Error("Invalid editor configuration response");
      if (active) setEnabled(value.enabled);
    }).catch(cause => { if (active) setError(errorMessage(cause)); });
    return () => { active = false; };
  }, []);
  if (error) return <p role="alert">{error}</p>;
  if (enabled === null) return <p role="status">Checking editor availability...</p>;
  if (!enabled) return <main className={styles.index}><h1>Editor rollout is disabled</h1><p>The existing editors remain available until replacement acceptance checks pass.</p><Link to="/admin/dashboard">Dashboard</Link></main>;
  if (kind === undefined && id === undefined) return <EditorIndex />;
  if ((kind !== "pages" && kind !== "posts") || !id || !/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) return <p role="alert">Invalid typed document route.</p>;
  return <EditorDocument key={`${kind}:${id}`} identity={{ kind: kind === "pages" ? "page" : "post", id: Number(id) }} />;
}
