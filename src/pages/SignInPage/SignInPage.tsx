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
  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    fetchMe().then(setMe, () => setMe({ authenticated: false }));
    fetch("/api/auth/status")
      .then((r) => (r.ok ? (r.json() as Promise<{ needsSetup: boolean }>) : { needsSetup: false }))
      .then((d) => setNeedsSetup(d.needsSetup), () => setNeedsSetup(false));
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await apiFetch(needsSetup ? "/api/auth/setup" : "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          needsSetup
            ? { first_name: firstName, last_name: lastName, email: email.trim(), password }
            : { email: email.trim(), password },
        ),
      });
      const data = (await res.json().catch(() => ({}))) as { token?: string; error?: string };
      if (!res.ok || !data.token) {
        setError(res.status === 401 ? "Invalid email or password." : data.error || "Sign-in failed.");
        if (res.status === 403) setNeedsSetup(false);
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
        <h1>{needsSetup && !me?.authenticated ? "Create admin account" : "Sign in"}</h1>
        {me === null || needsSetup === null ? (
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
            {needsSetup && (
              <>
                <p className={styles.note}>No users exist yet. This account will be the administrator.</p>
                <label>
                  First name
                  <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <label>
                  Last name
                  <input required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
              </>
            )}
            <label>
              Email
              <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Password
              <input type="password" autoComplete={needsSetup ? "new-password" : "current-password"} required minLength={needsSetup ? 8 : undefined} value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            <button className={styles.btn} type="submit" disabled={busy}>
              {busy ? "Please wait…" : needsSetup ? "Create account" : "Sign in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
