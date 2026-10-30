import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { api } from "../../api";

export function AdminGuard() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    api.me().then((r) => setAuthed(r.authenticated), () => setAuthed(false));
  }, []);

  if (authed === null) return null;
  return authed ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
