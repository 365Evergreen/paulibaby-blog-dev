import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RelatedPosts.module.css";

type RelatedPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
  category_slug?: string | null;
};

interface Props {
  /** Category slug of the current post. */
  category: string;
  /** Slug of the current post, excluded from the results. */
  currentSlug: string;
  limit?: number;
}

const formatDate = (raw: string) => {
  const d = new Date(raw.replace(" ", "T"));
  return isNaN(d.getTime())
    ? raw
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export default function RelatedPosts({ category, currentSlug, limit = 3 }: Props) {
  const [state, setState] = useState<{ key: string; posts: RelatedPost[] } | null>(null);
  const key = `${category}/${currentSlug}`;

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/posts?category=${encodeURIComponent(category)}`)
      .then((r) => (r.ok ? (r.json() as Promise<RelatedPost[]>) : []))
      .then((data) => {
        if (cancelled) return;
        const posts = (Array.isArray(data) ? data : [])
          .filter((p) => p.slug !== currentSlug)
          .slice(0, limit);
        setState({ key, posts });
      })
      .catch(() => {
        if (!cancelled) setState({ key, posts: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [category, currentSlug, limit, key]);

  if (!state || state.key !== key || state.posts.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="related-posts-heading">
      <div className={styles.head}>
        <h2 id="related-posts-heading" className={styles.heading}>
          Related posts
        </h2>
        <Link to={`/archive?category=${encodeURIComponent(category)}`} className={styles.showAll}>
          Show all
        </Link>
      </div>
      <div className={styles.grid}>
        {state.posts.map((post) => (
          <article key={post.id} className={styles.card}>
            <Link to={`/posts/${post.category_slug || category}/${post.slug}`} className={styles.imageLink}>
              {post.cover_image ? (
                <img src={post.cover_image} alt="" className={styles.image} loading="lazy" />
              ) : (
                <div className={styles.placeholder} />
              )}
            </Link>
            <h3 className={styles.title}>
              <Link to={`/posts/${post.category_slug || category}/${post.slug}`}>{post.title}</Link>
            </h3>
            <time className={styles.date}>{formatDate(post.created_at)}</time>
          </article>
        ))}
      </div>
    </section>
  );
}
