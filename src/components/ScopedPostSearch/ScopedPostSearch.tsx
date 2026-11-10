import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { ScopedPostResult } from "../../content/publicPostSearch";
import styles from "./ScopedPostSearch.module.css";

interface Props {
  kind: "page" | "post";
  id: number;
  title: string;
}

export default function ScopedPostSearch({ kind, id, title }: Props) {
  const headingId = useId();
  const [query, setQuery] = useState("");
  const [state, setState] = useState<{
    loading: boolean;
    results: ScopedPostResult[] | null;
    error: string | null;
  }>({ loading: false, results: null, error: null });

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (!value) {
      setState({ loading: false, results: null, error: null });
      return;
    }
    setState({ loading: true, results: null, error: null });
    try {
      const params = new URLSearchParams({ kind, id: String(id), q: value });
      const response = await fetch(`/api/search/posts?${params}`);
      if (!response.ok) throw new Error("Unable to search posts. Please try again.");
      const results: ScopedPostResult[] = await response.json();
      setState({ loading: false, results, error: null });
    } catch (error) {
      setState({ loading: false, results: null, error: error instanceof Error ? error.message : "Unable to search posts." });
    }
  }

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <h2 id={headingId}>Search for more {title}</h2>
      <form className={styles.form} role="search" aria-labelledby={headingId} onSubmit={search}>
        <label className={styles.field}>
          Search posts
          <input type="search" maxLength={200} disabled={state.loading} value={query} onChange={(event) => {
            setQuery(event.target.value);
            setState({ loading: false, results: null, error: null });
          }} />
        </label>
        <button type="submit" disabled={state.loading}>Search</button>
      </form>
        <div aria-live="polite" aria-busy={state.loading}>
        {state.loading && <p>Searching...</p>}
        {state.error && <p role="alert">{state.error}</p>}
        {state.results?.length === 0 && <p>No matching posts within this {kind}.</p>}
        {state.results && state.results.length > 0 && (
          <ul className={styles.results}>
            {state.results.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${encodeURIComponent(post.category_slug || "uncategorised")}/${encodeURIComponent(post.slug)}`}>{post.title}</Link>
                {post.excerpt && <p>{post.excerpt}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
