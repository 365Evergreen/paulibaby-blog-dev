// Cloudflare Access (Zero Trust) JWT validation and role lookup.
export type Role = "admin" | "editor";

export interface AuthEnv {
  TEAM_DOMAIN?: string; // e.g. "myteam.cloudflareaccess.com"
  POLICY_AUD?: string; // Access application Audience (AUD) tag
  ADMIN_EMAILS?: string; // comma-separated
  EDITOR_EMAILS?: string; // comma-separated
}

export interface Identity {
  email: string;
  role: Role;
}

interface Jwk extends JsonWebKey {
  kid?: string;
}

let jwksCache: { url: string; keys: Jwk[]; at: number } | null = null;

const b64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
const decodeJson = (s: string) => JSON.parse(new TextDecoder().decode(b64url(s)));
const list = (v?: string) => (v ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

async function getKeys(teamDomain: string, force = false): Promise<Jwk[]> {
  const url = `https://${teamDomain}/cdn-cgi/access/certs`;
  if (!force && jwksCache?.url === url && Date.now() - jwksCache.at < 10 * 60_000) return jwksCache.keys;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Could not fetch Access signing keys");
  const keys = ((await res.json()) as { keys: Jwk[] }).keys;
  jwksCache = { url, keys, at: Date.now() };
  return keys;
}

function readToken(request: Request): string | null {
  const header = request.headers.get("Cf-Access-Jwt-Assertion");
  if (header) return header;
  const m = (request.headers.get("Cookie") ?? "").match(/(?:^|;\s*)CF_Authorization=([^;]+)/);
  return m ? m[1] : null;
}

/** Returns the signed-in user, or null if there is no valid Access session or the user has no role. */
export async function getIdentity(request: Request, env: AuthEnv): Promise<Identity | null> {
  const { TEAM_DOMAIN, POLICY_AUD } = env;
  if (!TEAM_DOMAIN || !POLICY_AUD) {
    // Access isn't configured: only allow local development.
    const host = new URL(request.url).hostname;
    return host === "localhost" || host === "127.0.0.1" ? { email: "dev@localhost", role: "admin" } : null;
  }

  const token = readToken(request);
  const parts = token?.split(".");
  if (!parts || parts.length !== 3) return null;

  try {
    const header = decodeJson(parts[0]) as { alg: string; kid: string };
    const payload = decodeJson(parts[1]) as { aud?: string[] | string; iss?: string; exp?: number; email?: string };
    if (header.alg !== "RS256") return null;

    let jwk = (await getKeys(TEAM_DOMAIN)).find((k) => k.kid === header.kid);
    if (!jwk) jwk = (await getKeys(TEAM_DOMAIN, true)).find((k) => k.kid === header.kid);
    if (!jwk) return null;

    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64url(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
    if (!valid) return null;

    const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!aud.includes(POLICY_AUD)) return null;
    if (payload.iss !== `https://${TEAM_DOMAIN}`) return null;
    if (!payload.exp || payload.exp * 1000 < Date.now()) return null;

    const email = payload.email?.toLowerCase();
    if (!email) return null;
    const role: Role | null = list(env.ADMIN_EMAILS).includes(email) ? "admin" : list(env.EDITOR_EMAILS).includes(email) ? "editor" : null;
    return role ? { email, role } : null;
  } catch {
    return null;
  }
}
