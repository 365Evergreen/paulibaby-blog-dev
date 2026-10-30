import { useCallback, useEffect, useState } from "react";
import { api, type PostMeta } from "../../api";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { DashboardOverview } from "./DashboardOverview";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const [posts, setPosts] = useState<PostMeta[] | null>(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("admin-theme") === "dark");

  const load = useCallback(() => {
    setError("");
    setPosts(null);
    api.admin.posts().then(
      (r) => setPosts(r.posts),
      (e: Error) => setError(e.message || "Failed to load posts"),
    );
  }, []);

  useEffect(load, [load]);

  const toggleTheme = () =>
    setDark((d) => {
      localStorage.setItem("admin-theme", d ? "light" : "dark");
      return !d;
    });

  return (
    <div className={`${styles.root} ${dark ? styles.dark : ""}`}>
      <Header dark={dark} onToggleTheme={toggleTheme} onMenu={() => setMenuOpen(true)} draftCount={posts?.filter((p) => p.status === "draft").length ?? 0} />
      <div className={styles.body}>
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className={styles.main}>
          <DashboardOverview posts={posts} error={error} onRetry={load} />
        </main>
      </div>
    </div>
  );
}
