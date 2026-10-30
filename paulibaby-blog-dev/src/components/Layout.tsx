import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";

export function Layout() {
  const { pathname } = useLocation();
  const wide = pathname.startsWith("/admin") || pathname === "/";
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" className={`site-main${wide ? " site-main--wide" : ""}`}>
        <Outlet />
      </main>
      <footer className="site-footer">© {new Date().getFullYear()} Paulibaby</footer>
    </div>
  );
}
