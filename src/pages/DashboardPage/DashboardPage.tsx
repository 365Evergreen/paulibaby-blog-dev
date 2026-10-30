import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchPosts, STATUS, type AdminPost } from "./Posts/postsApi";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import styles from "./DashboardPage.module.css";

export interface DashboardContext {
  posts: AdminPost[] | null;
  error: string;
  reload: () => void;
}

export default function DashboardPage() {
  const [posts, setPosts] = useState<AdminPost[] | null>(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("admin-theme") === "dark");

  const load = useCallback(() => {
    fetchPosts().then(
      setPosts,
      (e: Error) => setError(e.message || "Failed to load posts"),
    );
  }, []);

  useEffect(load, [load]);

  const reload = () => {
    setError("");
    setPosts(null);
    load();
  };

  const toggleTheme = () =>
    setDark((d) => {
      localStorage.setItem("admin-theme", d ? "light" : "dark");
      return !d;
    });

  return (
    <div className={`${styles.root} ${dark ? styles.dark : ""}`}>
      <Header dark={dark} onToggleTheme={toggleTheme} onMenu={() => setMenuOpen(true)} draftCount={posts?.filter((p) => p.published === STATUS.draft).length ?? 0} />
      <div className={styles.body}>
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className={styles.main}>
          <Outlet context={{ posts, error, reload } satisfies DashboardContext} />
        </main>
      </div>
    </div>
  );
}
