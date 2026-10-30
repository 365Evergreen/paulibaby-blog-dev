/**
 * src/lib/auth.ts — frontend auth helpers for React/Vite.
 *
 * Manages the session token in localStorage, provides an apiFetch wrapper
 * that attaches the Bearer header and auto-logs-out on 401, and exposes
 * hooks for React components.
 */

const TOKEN_KEY = "paulibaby_token";
const USER_KEY = "paulibaby_user";

// ---------- token storage ----------

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setSession(token: string, user: AuthUser): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

// ---------- types ----------

export interface AuthUser {
  id: number;
  email: string;
  role: "admin" | "editor";
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}

// ---------- API calls ----------

/**
 * Wraps fetch() with:
 *  - Bearer token attached to every request
 *  - Auto-logout + redirect to /sign-in on 401
 *  - JSON content-type by default
 */
export async function apiFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(input, { ...init, headers });

  if (res.status === 401) {
    clearSession();
    // Only redirect if we're not already on a public page
    if (!window.location.pathname.startsWith("/sign-in")) {
      window.location.href = "/sign-in";
    }
  }

  return res;
}

/** Login with email + password. Returns the user on success. */
export async function login(email: string, password: string): Promise<AuthUser> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  setSession(data.token, data.user);
  return data.user as AuthUser;
}

/** Logout — invalidates the session on the server and clears local state. */
export async function logout(): Promise<void> {
  try {
    await apiFetch("/api/auth/logout", { method: "POST" });
  } catch {
    // server may already be unreachable; still clear locally
  }
  clearSession();
}

/** Check the current session against the backend. */
export async function checkSession(): Promise<AuthUser | null> {
  const token = getToken();
  if (!token) return null;
  const res = await apiFetch("/api/auth/me");
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.authenticated) return null;
  // Update stored user in case role changed
  const user: AuthUser = { id: data.id, email: data.email, role: data.role };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

/**
 * First-run setup — creates the first admin. Only works if no users exist.
 * Useful for a setup page; can be removed after the first admin is created.
 */
export async function setupAdmin(email: string, password: string, role: "admin" | "editor" = "admin"): Promise<AuthUser> {
  const res = await fetch("/api/auth/setup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Setup failed");
  setSession(data.token, data.user);
  return data.user as AuthUser;
}
