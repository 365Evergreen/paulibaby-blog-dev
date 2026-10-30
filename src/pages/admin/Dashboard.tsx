import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api, formatDate, type PostMeta } from "../../api";
import styles from "./Admin.module.css";

export function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostMeta[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.admin.posts().then((r) => setPosts(r.posts), (e: Error) => setError(e.message));
  }, []);

  async function remove(p: PostMeta) {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    try {
      await api.admin.remove(p.id);
      setPosts((cur) => cur?.filter((x) => x.id !== p.id) ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function logout() {
    await api.logout();
    navigate("/admin/login");
  }

  return (
    <>
      <div className={styles.head}>
        <h1>Posts</h1>
        <div className={styles.actions}>
          <Link to="/admin/posts/new" className={`${styles.btn} ${styles.primary}`}>
            New post
          </Link>
          <button className={styles.btn} onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      {!posts ? (
        <p className={styles.note}>Loading…</p>
      ) : posts.length === 0 ? (
        <p className={styles.note}>No posts yet.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Updated</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link to={`/admin/posts/${p.id}`}>{p.title}</Link>
                </td>
                <td>
                  <span className={`${styles.badge} ${p.status === "published" ? styles.published : ""}`}>{p.status}</span>
                </td>
                <td>{formatDate(p.updated_at)}</td>
                <td>
                  <button className={`${styles.btn} ${styles.danger}`} onClick={() => remove(p)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
