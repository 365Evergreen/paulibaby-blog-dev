import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMe, type Me } from "../../auth/me";
import { apiFetch, setToken, signOut } from "../../lib/auth";
import styles from "./SignInPage.module.css";

export default function SignInPage() {
  const [params] = useSearchParams();
  const raw = params.get("redirect") ?? "";
  const redirect = raw.startsWith("/") && !raw.startsWith("//") && !raw.includes("\\") ? raw : "/admin/dashboard";
  const [me, setMe] = useState<Me | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchMe().then(setMe, () => setMe({ authenticated: false }));
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = (await res.json().catch(() => ({}))) as { token?: string; error?: string };
      if (!res.ok || !data.token) {
        setError(res.status === 401 ? "Invalid email or password." : data.error || "Sign-in failed.");
        return;
      }
      setToken(data.token);
      window.location.assign(redirect);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await apiFetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    signOut();
    setMe({ authenticated: false });
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1>Sign in</h1>
        {me === null ? (
          <p>Checking your session…</p>
        ) : me.authenticated ? (
          <>
            <p>
              Signed in as <strong>{me.email}</strong> ({me.role}).
            </p>
            <a className={styles.btn} href={redirect}>
              Continue
            </a>
            <button type="button" className={styles.link} onClick={logout}>
              Sign out
            </button>
          </>
        ) : (
          <form className={styles.form} onSubmit={submit}>
            <label>
              Email
              <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Password
              <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            <button className={styles.btn} type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
