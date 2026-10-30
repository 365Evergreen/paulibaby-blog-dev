import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, Search } from "lucide-react";
import { fetchUsers, type AdminUser } from "./usersApi";
import { fmtDate } from "./postsApi";
import { NewUserModal } from "./NewUserModal";
import styles from "./DashboardPage.module.css";

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);

  const load = useCallback(() => {
    fetchUsers().then(setUsers, (e: Error) => setError(e.message));
  }, []);

  useEffect(load, [load]);

  const retry = () => {
    setError("");
    setUsers(null);
    load();
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (users ?? []).filter((u) => !q || `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(q));
  }, [users, query]);

  return (
    <div className={styles.content}>
      <div className={styles.pageHead}>
        <h1>Users</h1>
        <button className={`${styles.btn} ${styles.primary}`} onClick={() => setModal(true)}>
          Add user
        </button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Search size={16} />
          <input className={styles.input} type="search" placeholder="Search users" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search users" />
        </div>
        <span className={styles.muted}>{users ? `${rows.length} items` : ""}</span>
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
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {users === null && !error &&
                Array.from({ length: 3 }, (_, i) => (
                  <tr key={i}>
                    <td colSpan={4}>
                      <div className={styles.skeleton} />
                    </td>
                  </tr>
                ))}
              {users && rows.length === 0 && (
                <tr>
                  <td colSpan={4}>No users found.</td>
                </tr>
              )}
              {rows.map((u) => (
                <tr key={u.id}>
                  <td>{`${u.first_name} ${u.last_name}`.trim() || "—"}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`${styles.badge} ${u.role === "admin" ? styles.badgeOk : styles.badgeDraft}`}>{u.role}</span>
                  </td>
                  <td>{fmtDate(u.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {modal && <NewUserModal onClose={() => setModal(false)} onCreated={(u) => setUsers((cur) => [...(cur ?? []), u])} />}
    </div>
  );
}
