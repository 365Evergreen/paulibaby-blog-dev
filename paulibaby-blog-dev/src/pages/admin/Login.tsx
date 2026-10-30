import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { api } from "../../api";
import styles from "./Admin.module.css";

export function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.login(password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <h1>Admin sign in</h1>
      <label className={styles.field}>
        Password
        <input
          className={styles.input}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={`${styles.btn} ${styles.primary}`} disabled={busy}>
        Sign in
      </button>
    </form>
  );
}
