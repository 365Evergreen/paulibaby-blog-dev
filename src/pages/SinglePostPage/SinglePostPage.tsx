import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { renderMarkdown } from "../../lib/renderMarkdown";
import styles from './SinglePostPage.module.css';

type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  created_at: string;
};

export default function SinglePostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.contentContainer}>
        <div className="loading">Loading…</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.contentContainer}>
        <div className="loading">Post not found.</div>
        <div className="back-link">
          <Link to="/">← Back to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contentContainer}>
      <article className={styles.singlePostFullContent}>
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className={styles.singlePostCoverFull}
          />
        )}
        <h1>{post.title}</h1>
        <time className={styles.postDate}>
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div
          className={styles.singlePostFullBody}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
        />
      </article>

      <div className="back-link">
        <Link to="/">← Back to blog</Link>
      </div>
    </div>
  );
}
