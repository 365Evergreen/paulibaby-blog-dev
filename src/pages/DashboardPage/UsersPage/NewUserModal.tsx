import { useEffect, useState, type FormEvent } from "react";
import { Check, Copy, RefreshCw, X } from "lucide-react";
import { createUser, generatePassword, type AdminUser, type UserRole } from "./usersApi";
import styles from "../DashboardPage.module.css";

interface Props {
  onClose: () => void;
  onCreated: (user: AdminUser) => void;
}

export function NewUserModal({ onClose, onCreated }: Props) {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", role: "editor" as UserRole });
  const [password, setPassword] = useState(() => generatePassword());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<AdminUser | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const user = await createUser({ ...form, password });
      setCreated(user);
      onCreated(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create user");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const passwordRow = (
    <div className={styles.pwRow}>
      <input className={`${styles.input} ${styles.mono}`} value={password} readOnly aria-label="Generated password" />
      <button type="button" className={styles.iconBtn} onClick={copy} aria-label="Copy password" title="Copy">
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      {!created && (
        <button type="button" className={styles.iconBtn} onClick={() => setPassword(generatePassword())} aria-label="Generate a new password" title="Regenerate">
          <RefreshCw size={16} />
        </button>
      )}
    </div>
  );

  return (
    <div className={styles.modalBackdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="new-user-title">
        <div className={styles.modalHead}>
          <h2 id="new-user-title">{created ? "User created" : "Add new user"}</h2>
          <button className={styles.iconBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {created ? (
          <div className={styles.modalBody}>
            <p>
              <strong>
                {created.first_name} {created.last_name}
              </strong>{" "}
              ({created.email}) can now sign in as {created.role}.
            </p>
            <label className={styles.field}>
              Password
              {passwordRow}
            </label>
            <p className={styles.muted}>Copy this password now. It is stored hashed and cannot be shown again.</p>
            <button className={`${styles.btn} ${styles.primary}`} onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form className={styles.modalBody} onSubmit={submit}>
            <div className={styles.twoCol}>
              <label className={styles.field}>
                First name
                <input className={styles.input} value={form.first_name} onChange={(e) => set("first_name", e.target.value)} required autoFocus />
              </label>
              <label className={styles.field}>
                Last name
                <input className={styles.input} value={form.last_name} onChange={(e) => set("last_name", e.target.value)} required />
              </label>
            </div>
            <label className={styles.field}>
              Email
              <input className={styles.input} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
            </label>
            <label className={styles.field}>
              Role
              <select className={styles.input} value={form.role} onChange={(e) => set("role", e.target.value)}>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label className={styles.field}>
              Generated password
              {passwordRow}
            </label>
            {error && (
              <p className={styles.formError} role="alert">
                {error}
              </p>
            )}
            <div className={styles.modalActions}>
              <button type="button" className={styles.btn} onClick={onClose}>
                Cancel
              </button>
              <button className={`${styles.btn} ${styles.primary}`} disabled={busy}>
                {busy ? "Creating…" : "Add user"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
