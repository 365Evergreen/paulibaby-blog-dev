import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowDown, ArrowUp, Search } from "lucide-react";
import { STATUS, fetchPages, fmtDate, setPageStatus, toTime, type AdminPage } from "./pagesAPI";
import styles from "./DashboardPage.module.css";

type Tab = "all" | "published" | "draft" | "archived";
type SortKey = "title" | "date";

const inTab = (p: AdminPage, tab: Tab) =>
  tab === "archived" ? p.published === STATUS.archived
  : p.published !== STATUS.archived && (tab === "all" || (tab === "published" ? p.published === STATUS.published : p.published === STATUS.draft));

const statusLabel = (n: number) => (n === STATUS.published ? "published" : n === STATUS.archived ? "archived" : "draft");

export default function PagesPage() {
  const [pages, setPages] = useState<AdminPage[] | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "date", dir: -1 });
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(() => {
    fetchPages().then(setPages, (e: Error) => setError(e.message));
  }, []);

  useEffect(load, [load]);

  const retry = () => {
    setError("");
    setPages(null);
    load();
  };

  const counts = useMemo(() => {
    const c: Record<Tab, number> = { all: 0, published: 0, draft: 0, archived: 0 };
    pages?.forEach((p) => (Object.keys(c) as Tab[]).forEach((t) => inTab(p, t) && c[t]++));
    return c;
  }, [pages]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (pages ?? [])
      .filter((p) => inTab(p, tab))
      .filter((p) => !q || p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q))
      .sort((a, b) => sort.dir * (sort.key === "title" ? a.title.localeCompare(b.title) : toTime(a.created_at) - toTime(b.created_at)));
  }, [pages, tab, query, sort]);

  async function changeStatus(p: AdminPage, published: number) {
    setBusyId(p.id);
    try {
      await setPageStatus(p.id, published);
      setPages((cur) => cur?.map((x) => (x.id === p.id ? { ...x, published } : x)) ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  function archive(p: AdminPage) {
    if (window.confirm(`Move "${p.title || "(untitled)"}" to the archive?`)) void changeStatus(p, STATUS.archived);
  }

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "title" ? 1 : -1 }));
  const arrow = (key: SortKey) => (sort.key === key ? sort.dir === 1 ? <ArrowUp size={14} /> : <ArrowDown size={14} /> : null);

  const tabs: [Tab, string][] = [["all", "All"], ["published", "Published"], ["draft", "Drafts"], ["archived", "Archived"]];

  return (
    <div className={styles.content}>
      <div className={styles.pageHead}>
        <h1>Pages</h1>
        <Link to="/admin/page-editor" className={`${styles.btn} ${styles.primary}`}>
          Add page
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
        <div className={styles.search}>
          <Search size={16} />
          <input className={styles.input} type="search" placeholder="Search pages" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search pages" />
        </div>
        <span className={styles.muted}>{pages ? `${rows.length} items` : ""}</span>
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
                <th>Status</th>
                <th aria-sort={sort.key === "date" ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                  <button className={styles.sortBtn} onClick={() => toggleSort("date")}>
                    Date {arrow("date")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {pages === null && !error &&
                Array.from({ length: 5 }, (_, i) => (
                  <tr key={i}>
                    <td colSpan={3}>
                      <div className={styles.skeleton} />
                    </td>
                  </tr>
                ))}
              {pages && rows.length === 0 && (
                <tr>
                  <td colSpan={3}>No pages found.</td>
                </tr>
              )}
              {rows.map((p) => (
                <tr key={p.id} className={`${styles.postRow} ${busyId === p.id ? styles.busy : ""}`}>
                  <td>
                    <Link to={`/admin/page-editor/${p.id}`} className={styles.postTitle}>
                      {p.title || "(no title)"}
                    </Link>
                    <div className={styles.rowActions}>
                      {p.published === STATUS.published && (
                        <a href={`/${encodeURIComponent(p.slug)}`} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      )}
                      <Link to={`/admin/page-editor/${p.id}`}>Edit</Link>
                      {p.published === STATUS.archived ? (
                        <button onClick={() => void changeStatus(p, STATUS.draft)}>Restore</button>
                      ) : (
                        <button className={styles.danger} onClick={() => archive(p)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
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
