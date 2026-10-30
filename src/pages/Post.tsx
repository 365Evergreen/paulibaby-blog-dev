import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api, ApiError, formatDate, type Doc, type PostMeta } from "../api";
import { Prose } from "../editor/Prose";

export function Post() {
  const { slug = "" } = useParams();
  const [data, setData] = useState<{ post: PostMeta; content: Doc } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api.post(slug).then(
      (r) => !cancelled && (setData(r), setError("")),
      (e: Error) => !cancelled && setError(e instanceof ApiError && e.status === 404 ? "Post not found." : e.message),
    );
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) return <p className="status-message status-message--error">{error}</p>;
  if (!data) return <p className="status-message">Loading…</p>;

  const { post, content } = data;
  return (
    <article className="article">
      <h1 className="page-title">{post.title}</h1>
      <p className="post-meta">{formatDate(post.published_at)}</p>
      {post.cover_key && <img className="article__cover" src={`/api/media/${post.cover_key}`} alt="" />}
      <Prose doc={content} />
    </article>
  );
}
