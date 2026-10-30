import { useEffect, useState } from "react";
import type { LatestPostsProps } from "./LatestPosts.types";
import styles from "./LatestPosts.module.css";

interface PostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  category_slug?: string | null;
}

export function LatestPosts({ heading, limit = 6, category, layout = "cards" }: LatestPostsProps) {
  const [posts, setPosts] = useState<PostSummary[] | null>(null);
  const count = Math.max(1, Number(limit) || 6);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    let cancelled = false;
    fetch(`/api/posts?${params}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: unknown) => {
        if (!cancelled) setPosts(Array.isArray(data) ? (data as PostSummary[]).slice(0, count) : []);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, [category, count]);

  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {posts === null && <p className={styles.status}>Loading…</p>}
      {posts?.length === 0 && <p className={styles.status}>No posts found.</p>}
      <div className={layout === "list" ? styles.list : styles.cards}>
        {posts?.map((post) => (
          <a key={post.id} className={styles.item} href={`/posts/${post.category_slug || "uncategorised"}/${post.slug}`}>
            {layout === "cards" && post.cover_image && <img className={styles.image} src={post.cover_image} alt="" loading="lazy" />}
            <h3 className={styles.title}>{post.title}</h3>
            {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
          </a>
        ))}
      </div>
    </section>
  );
}
