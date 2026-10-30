import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api, type Doc, type PostInput } from "../../api";
import { TiptapEditor } from "../../editor/TiptapEditor";
import styles from "./Admin.module.css";

const EMPTY: Doc = { type: "doc", content: [{ type: "paragraph" }] };

interface Form {
  title: string;
  slug: string;
  excerpt: string;
  status: "draft" | "published";
  coverKey: string | null;
}

const BLANK: Form = { title: "", slug: "", excerpt: "", status: "draft", coverKey: null };

export function PostEditor() {
  const { id = "new" } = useParams();
  return id === "new" ? <EditorForm key="new" id="new" initial={BLANK} initialContent={EMPTY} /> : <ExistingPost key={id} id={id} />;
}

function ExistingPost({ id }: { id: string }) {
  const [loaded, setLoaded] = useState<{ form: Form; content: Doc } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api.admin.post(id).then(
      ({ post, content }) =>
        !cancelled &&
        setLoaded({
          form: { title: post.title, slug: post.slug, excerpt: post.excerpt, status: post.status, coverKey: post.cover_key },
          content,
        }),
      (e: Error) => !cancelled && setError(e.message),
    );
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!loaded) return <p className={styles.note}>Loading…</p>;
  return <EditorForm id={id} initial={loaded.form} initialContent={loaded.content} />;
}

function EditorForm({ id, initial, initialContent }: { id: string; initial: Form; initialContent: Doc }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const content = useRef<Doc>(initialContent);
  const [dirtyContent, setDirtyContent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function save(status: Form["status"] = form.status) {
    setBusy(true);
    setError("");
    setMessage("");
    const input: PostInput = {
      title: form.title,
      excerpt: form.excerpt,
      status,
      coverKey: form.coverKey,
      content: content.current,
    };
    if (form.slug) input.slug = form.slug;
    try {
      if (id === "new") {
        const res = await api.admin.create(input);
        navigate(`/admin/posts/${res.id}`, { replace: true });
      } else {
        const res = await api.admin.update(id, input);
        setForm((f) => ({ ...f, status, slug: res.slug }));
        setDirtyContent(false);
        setMessage("Saved");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function uploadCover(file: File | undefined) {
    if (!file) return;
    try {
      const url = await api.admin.upload(file);
      set("coverKey", url.replace("/api/media/", ""));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    }
  }

  return (
    <>
      <div className={styles.head}>
        <Link to="/admin">← Posts</Link>
        <div className={styles.actions}>
          {message && <span className={styles.note}>{message}</span>}
          <button className={styles.btn} disabled={busy} onClick={() => save(form.status === "published" ? "published" : "draft")}>
            Save{dirtyContent ? " *" : ""}
          </button>
          {form.status === "published" ? (
            <button className={styles.btn} disabled={busy} onClick={() => save("draft")}>
              Unpublish
            </button>
          ) : (
            <button className={`${styles.btn} ${styles.primary}`} disabled={busy} onClick={() => save("published")}>
              Publish
            </button>
          )}
        </div>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <input
        className={`${styles.input} ${styles.title}`}
        placeholder="Title"
        aria-label="Title"
        value={form.title}
        onChange={(e) => set("title", e.target.value)}
      />
      <div className={styles.grid}>
        <label className={styles.field}>
          Slug (auto-generated if blank)
          <input className={styles.input} value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        </label>
        <label className={styles.field}>
          Cover image
          <input type="file" accept="image/*" onChange={(e) => uploadCover(e.target.files?.[0])} />
          {form.coverKey && <img className={styles.cover} src={`/api/media/${form.coverKey}`} alt="" />}
        </label>
      </div>
      <label className={styles.field}>
        Excerpt
        <textarea className={styles.textarea} rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
      </label>
      <p />
      <TiptapEditor
        initialContent={initialContent}
        onChange={(doc) => {
          content.current = doc;
          setDirtyContent(true);
        }}
        onUpload={api.admin.upload}
        onError={setError}
      />
    </>
  );
}
;export default PostEditor;