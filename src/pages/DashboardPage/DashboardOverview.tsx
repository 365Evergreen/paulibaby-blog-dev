import { Link } from "react-router-dom";
import { CheckCircle2, FileText, FilePen, AlertCircle } from "lucide-react";
import { formatDate, type PostMeta } from "../../api";
import { StatCard } from "./StatCard";
import styles from "./DashboardPage.module.css";

interface Props {
  posts: PostMeta[] | null;
  error: string;
  onRetry: () => void;
}

export function DashboardOverview({ posts, error, onRetry }: Props) {
  const published = posts?.filter((p) => p.status === "published").length ?? null;
  const drafts = posts?.filter((p) => p.status === "draft").length ?? null;
  const recent = posts ? [...posts].sort((a, b) => b.updated_at - a.updated_at).slice(0, 8) : null;

  return (
    <div className={styles.content}>
      <section className={`${styles.card} ${styles.welcome}`}>
        <h1>Welcome back 👋</h1>
        <p>Here's what's happening on your blog today.</p>
        <Link to="/admin/post-editor" className={`${styles.btn} ${styles.primary}`}>
          Write a new post
        </Link>
      </section>

      {error && (
        <div className={styles.error} role="alert">
          <AlertCircle size={18} /> {error}
          <button className={styles.btn} onClick={onRetry}>
            Retry
          </button>
        </div>
      )}

      <section className={styles.stats}>
        <StatCard label="Total posts" value={posts ? posts.length : null} icon={<FileText size={20} />} />
        <StatCard label="Published" value={published} icon={<CheckCircle2 size={20} />} />
        <StatCard label="Drafts" value={drafts} icon={<FilePen size={20} />} />
      </section>

      <section className={styles.card}>
        <h2>Recent activity</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {recent === null && !error &&
                Array.from({ length: 4 }, (_, i) => (
                  <tr key={i}>
                    <td colSpan={3}>
                      <div className={styles.skeleton} />
                    </td>
                  </tr>
                ))}
              {recent?.length === 0 && (
                <tr>
                  <td colSpan={3}>No posts yet.</td>
                </tr>
              )}
              {recent?.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link to={`/admin/post-editor/${p.id}`}>{p.title || "(untitled)"}</Link>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${p.status === "published" ? styles.badgeOk : styles.badgeDraft}`}>{p.status}</span>
                  </td>
                  <td>{formatDate(p.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
