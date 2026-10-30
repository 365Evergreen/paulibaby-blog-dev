/**
 * accessAuth.ts — email/password authentication with D1-backed sessions.
 *
 * - Password hashing: PBKDF2 (SHA-256, 100k iterations) via Web Crypto.
 * - Session tokens: 32-byte random hex via Web Crypto (never Math.random).
 * - Sessions stored in D1 `sessions` table with a 7-day expiry.
 * - getIdentity() validates the Bearer session token against D1.
 *
 * Roles: "admin" (full access) and "editor" (no DELETE).
 */

export interface AuthEnv {
  DB: D1Database;
}

export interface Identity {
  id: number;
  email: string;
  name: string;
  role: "admin" | "editor";
}

const PBKDF2_ITERATIONS = 100_000;
const SESSION_DURATION_DAYS = 7;

// ---------- Password hashing (PBKDF2) ----------

function bufToB64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function b64ToBuf(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${bufToB64(salt.buffer)}$${bufToB64(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const iterations = parseInt(parts[1], 10);
  const salt = b64ToBuf(parts[2]);
  const expected = parts[3];

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  return bufToB64(hash) === expected;
}

// ---------- Session tokens ----------

export function generateSessionToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSession(db: D1Database, userId: number): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 86_400_000).toISOString();
  await db.prepare(
    "INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)",
  ).bind(token, userId, expiresAt).run();
  return token;
}

export async function deleteSession(db: D1Database, token: string): Promise<void> {
  await db.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
}

// ---------- Identity (called by the worker's /api/admin/* gate) ----------

export async function getIdentity(request: Request, env: AuthEnv): Promise<Identity | null> {
  const auth = request.headers.get("Authorization") || "";
  if (!auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  if (!token) return null;

  const row = await env.DB.prepare(
    `SELECT s.user_id AS id, u.email, u.role
       FROM sessions s JOIN users u ON s.user_id = u.id
      WHERE s.token = ? AND s.expires_at > datetime('now')`,
  ).bind(token).first<{ id: number; email: string; role: string }>();

  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.email.split("@")[0],
    role: row.role as "admin" | "editor",
  };
}
