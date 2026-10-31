import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LatestPosts from "../../components/LatestPosts/LatestPosts";
import styles from "./Archive.module.css";
import SearchBox, { BlogPost } from "../../components/SearchBox/SearchBox";

// Blog post type for this page
export interface BlogPostItem extends BlogPost {
  cover_image: string;
  url: string;
  slug: string;
  excerpt: string;
  date: string; // ISO date string
}

const ArchivePage: React.FC = () => {
  const [blogPosts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const category = useSearchParams()[0].get("category") ?? undefined;

  const handleSelect = (post: BlogPost) => {
    alert(`Selected: ${post.title}`);
  };

  useEffect(() => {
    fetch(category ? `/api/posts?category=${encodeURIComponent(category)}` : "/api/posts")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch posts");
        return r.json();
      })
      .then((data: BlogPostItem[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div className={styles.loading}>Loading posts…</div>;
  }

  return (
    <div className={styles.contentContainer}>
    <div className={styles.contentPageTitle}>  <h1>Blog archive{category ? `: ${category}` : ""}</h1></div>

      {/* Search box for filtering posts */}
      <SearchBox posts={blogPosts} onSelect={handleSelect} />

      {/* Latest posts section */}
      <LatestPosts category={category} />
    </div>
  );
};

export default ArchivePage;