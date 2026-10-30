import { NavLink, Link, Outlet, useLocation } from "react-router";

export function Layout() {
  const { pathname } = useLocation();
  const wide = pathname.startsWith("/admin") || pathname === "/";
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-header__bar">
          <Link to="/" className="site-brand">
            Paulibaby
          </Link>
          <nav className="site-nav" aria-label="Primary">
            <NavLink to="/" end>
              Posts
            </NavLink>
            <NavLink to="/admin">Admin</NavLink>
          </nav>
        </div>
      </header>
      <main id="main" className={`site-main${wide ? " site-main--wide" : ""}`}>
        <Outlet />
      </main>
      <footer className="site-footer">© {new Date().getFullYear()} Paulibaby</footer>
    </div>
  );
}
