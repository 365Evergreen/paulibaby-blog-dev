import { Link, NavLink, Outlet, useLocation } from "react-router";
import styles from "./Layout.module.css";

export function Layout() {
  const admin = useLocation().pathname.startsWith("/admin");
  return (
    <>
      <header className={styles.header}>
        <div className={styles.bar}>
          <Link to="/" className={styles.brand}>
            Paulibaby
          </Link>
          <nav className={styles.nav}>
            <NavLink to="/">Posts</NavLink>
            <NavLink to="/admin">Admin</NavLink>
          </nav>
        </div>
      </header>
      <main className={`${styles.main} ${admin ? styles.wide : ""}`}>
        <Outlet />
      </main>
      <footer className={styles.footer}>© {new Date().getFullYear()} Paulibaby</footer>
    </>
  );
}
