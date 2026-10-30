import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowDown, ArrowUp, Search } from "lucide-react";
import { STATUS, fetchCategories, fetchPosts, fmtDate, setPostStatus, toTime, type AdminPost, type Category } from "./Posts/postsApi";
import styles from "./DashboardPage.module.css";

type Tab = "all" | "published" | "draft" | "archived";
type SortKey = "title" | "date";

const inTab = (p: AdminPost, tab: Tab) =>
  tab === "archived" ? p.published === STATUS.archived
  : p.published !== STATUS.archived && (tab === "all" || (tab === "published" ? p.published === STATUS.published : p.published === STATUS.draft));

const statusLabel = (n: number) => (n === STATUS.published ? "published" : n === STATUS.archived ? "archived" : "draft");

export default function PostsPage() {
  const [posts, setPosts] = useState<AdminPost[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "date", dir: -1 });
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(() => {
    Promise.all([fetchPosts(), fetchCategories().catch(() => [] as Category[])]).then(
      ([p, c]) => {
        setPosts(p);
        setCategories(c);
      },
      (e: Error) => setError(e.message),
    );
  }, []);

  useEffect(load, [load]);

  const retry = () => {
    setError("");
    setPosts(null);
    load();
  };

  const counts = useMemo(() => {
    const c: Record<Tab, number> = { all: 0, published: 0, draft: 0, archived: 0 };
    posts?.forEach((p) => (Object.keys(c) as Tab[]).forEach((t) => inTab(p, t) && c[t]++));
    return c;
  }, [posts]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const catId = category ? Number(category) : null;
    return (posts ?? [])
      .filter((p) => inTab(p, tab))
      .filter((p) => !q || p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
      .filter((p) => catId === null || p.category_ids.includes(catId))
      .sort((a, b) => sort.dir * (sort.key === "title" ? a.title.localeCompare(b.title) : toTime(a.created_at) - toTime(b.created_at)));
  }, [posts, tab, query, category, sort]);

  const catName = (id: number) => categories.find((c) => c.id === id)?.name;

  async function changeStatus(p: AdminPost, published: number) {
    setBusyId(p.id);
    try {
      await setPostStatus(p.id, published);
      setPosts((cur) => cur?.map((x) => (x.id === p.id ? { ...x, published } : x)) ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  function archive(p: AdminPost) {
    if (window.confirm(`Move "${p.title || "(untitled)"}" to the archive?`)) void changeStatus(p, STATUS.archived);
  }

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "title" ? 1 : -1 }));
  const arrow = (key: SortKey) => (sort.key === key ? sort.dir === 1 ? <ArrowUp size={14} /> : <ArrowDown size={14} /> : null);

  const tabs: [Tab, string][] = [["all", "All"], ["published", "Published"], ["draft", "Drafts"], ["archived", "Archived"]];

  return (
    <div className={styles.content}>
      <div className={styles.pageHead}>
        <h1>Posts</h1>
        <Link to="/admin/post-editor" className={`${styles.btn} ${styles.primary}`}>
          Add post
        </Link>
      </div>

      <div className={styles.tabs}>
        {tabs.map(([t, label]) => (
          <button key={t} className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`} onClick={() => setTab(t)}>
            {label} <span className={styles.muted}>({counts[t]})</span>
          </button>
        ))}
      </div>

      <div className={styles.toolbar}>
        <select className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className={styles.search}>
          <Search size={16} />
          <input className={styles.input} type="search" placeholder="Search posts" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search posts" />
        </div>
        <span className={styles.muted}>{posts ? `${rows.length} items` : ""}</span>
      </div>

      {error && (
        <div className={styles.error} role="alert">
          <AlertCircle size={18} /> {error}
          <button className={styles.btn} onClick={retry}>
            Retry
          </button>
        </div>
      )}

      <section className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th aria-sort={sort.key === "title" ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                  <button className={styles.sortBtn} onClick={() => toggleSort("title")}>
                    Title {arrow("title")}
                  </button>
                </th>
                <th>Categories</th>
                <th>Status</th>
                <th aria-sort={sort.key === "date" ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                  <button className={styles.sortBtn} onClick={() => toggleSort("date")}>
                    Date {arrow("date")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {posts === null && !error &&
                Array.from({ length: 5 }, (_, i) => (
                  <tr key={i}>
                    <td colSpan={4}>
                      <div className={styles.skeleton} />
                    </td>
                  </tr>
                ))}
              {posts && rows.length === 0 && (
                <tr>
                  <td colSpan={4}>No posts found.</td>
                </tr>
              )}
              {rows.map((p) => (
                <tr key={p.id} className={`${styles.postRow} ${busyId === p.id ? styles.busy : ""}`}>
                  <td>
                    <Link to={`/admin/post-editor/${p.id}`} className={styles.postTitle}>
                      {p.title || "(no title)"}
                    </Link>
                    <div className={styles.rowActions}>
                      {p.published === STATUS.published && (
                        <a href={`/posts/${encodeURIComponent(p.category_slug || "uncategorised")}/${encodeURIComponent(p.slug)}`} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      )}
                      <Link to={`/admin/post-editor/${p.id}`}>Edit</Link>
                      {p.published === STATUS.archived ? (
                        <button onClick={() => void changeStatus(p, STATUS.draft)}>Restore</button>
                      ) : (
                        <button className={styles.danger} onClick={() => archive(p)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                  <td>{p.category_ids.map(catName).filter(Boolean).join(", ") || "—"}</td>
                  <td>
                    <span className={`${styles.badge} ${p.published === STATUS.published ? styles.badgeOk : styles.badgeDraft}`}>{statusLabel(p.published)}</span>
                  </td>
                  <td>{fmtDate(p.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
