/**
 * src/components/RequireAuth.tsx — route guard for protected pages.
 *
 * Usage:
 *   <RequireAuth>
 *     <Dashboard />
 *   </RequireAuth>
 *
 * Shows a loading spinner while the session is being validated.
 * Redirects to /sign-in if the user is not authenticated.
 * Optionally restricts to admin role:
 *   <RequireAuth role="admin">
 *     <UserManagement />
 *   </RequireAuth>
 */

import { type ReactNode } from "react";
import { useAuth } from "../lib/useAuth";

interface RequireAuthProps {
  children: ReactNode;
  role?: "admin" | "editor";
}

export function RequireAuth({ children, role }: RequireAuthProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <p>Loading…</p>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/sign-in";
    return null;
  }

  if (role && user.role !== role) {
    return (
      <div style={{ maxWidth: 600, margin: "4rem auto", textAlign: "center" }}>
        <h1>Forbidden</h1>
        <p>You need {role} access to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
