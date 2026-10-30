import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api, formatDate, type PostMeta } from "../api";
import styles from "./Public.module.css";

export function Home() {
  const [posts, setPosts] = useState<PostMeta[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.posts().then((r) => setPosts(r.posts), (e: Error) => setError(e.message));
  }, []);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!posts) return <p className={styles.status}>Loading…</p>;

  return (
    <>
      <h1>Latest posts</h1>
      {posts.length === 0 && <p className={styles.status}>No posts yet.</p>}
      <ul className={styles.list}>
        {posts.map((p) => (
          <li key={p.id} className={styles.item}>
            <h2>
              <Link to={`/posts/${p.slug}`}>{p.title}</Link>
            </h2>
            <p className={styles.meta}>{formatDate(p.published_at)}</p>
            {p.excerpt && <p className={styles.excerpt}>{p.excerpt}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
