/**
 * src/App.tsx — example wiring showing how all the auth pieces fit together.
 *
 * This is a reference, not a drop-in replacement — adapt it to your existing
 * App.tsx, router setup, and component structure.
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/useAuth";
import { routeRequiresAuth } from "./lib/navigation";
import { RequireAuth } from "./components/RequireAuth";
import { SignInForm } from "./components/SignInForm";
import { SignOutButton } from "./components/SignOutButton";

// --- Your existing page components (import from wherever they live) ---
// import { Home } from "./pages/Home";
// import { Dashboard } from "./pages/Dashboard";
// import { Archive } from "./pages/Archive";
// etc.

/** Global route guard: redirects to /sign-in if an unauthenticated
 *  visitor hits a route that requires auth. */
function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading…</div>;
  if (!user && routeRequiresAuth(location.pathname)) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}

/** Header with nav + sign-in/sign-out button. */
function Header() {
  const { user, loading } = useAuth();
  return (
    <header style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem" }}>
      {/* Your nav component here, using getVisibleNav(user) */}
      <nav>
        <a href="/">Home</a>
        {user && <a href="/dashboard">Dashboard</a>}
        {user && <a href="/admin/media-library">Media</a>}
      </nav>
      <div style={{ marginLeft: "auto" }}>
        {loading ? null : user ? <SignOutButton /> : <a href="/sign-in">Sign in</a>}
      </div>
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouteGuard>
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<div>Home page</div>} />
            <Route path="/archive" element={<div>Archive page</div>} />

            {/* Sign-in route */}
            <Route
              path="/sign-in"
              element={<SignInForm redirectTo="/dashboard" />}
            />

            {/* Protected routes — wrapped in RequireAuth */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <div>Dashboard page</div>
                </RequireAuth>
              }
            />
            <Route
              path="/admin/*"
              element={
                <RequireAuth>
                  <div>Admin page</div>
                </RequireAuth>
              }
            />
            <Route
              path="/admin/media-library"
              element={
                <RequireAuth>
                  <div>Media library page</div>
                </RequireAuth>
              }
            />
            <Route
              path="/admin/media-admin"
              element={
                <RequireAuth role="admin">
                  <div>Media admin page (admin only)</div>
                </RequireAuth>
              }
            />
          </Routes>
        </RouteGuard>
      </BrowserRouter>
    </AuthProvider>
  );
}
