/* eslint-disable react-hooks/immutability */
/**
 * src/components/SignInForm.tsx — email/password login form.
 *
 * Usage:
 *   <SignInForm redirectTo="/dashboard" />
 *
 * On success, stores the session and redirects to `redirectTo`.
 * If the user is already authenticated, redirects immediately.
 */

import { useState, type FormEvent } from "react";
import { useAuth } from "../lib/useAuth";

interface SignInFormProps {
  redirectTo?: string;
}

export function SignInForm({ redirectTo = "/dashboard" }: SignInFormProps) {
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already logged in — bounce to the dashboard
  if (!loading && user) {
    window.location.href = redirectTo;
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      window.location.href = redirectTo;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", padding: "0 1rem" }}>
      <h1>Sign in</h1>
      {error && (
        <p role="alert" style={{ color: "#c00", marginBottom: "1rem" }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.25rem" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "0.25rem" }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
          />
        </div>
        <button
          type="submit"
          disabled={submitting || loading}
          style={{ width: "100%", padding: "0.6rem", cursor: "pointer" }}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
