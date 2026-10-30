/**
 * accessAuth.ts — bearer-token auth for the admin API.
 *
 * Replaces the previous Cloudflare Access JWT validation. The account has no
 * Access seats, so Access never issued a session and every /api/admin/* call
 * returned 401. This version validates a shared admin token instead.
 *
 * The token is the equivalent of the Access "AUD tag" you originally wanted:
 * it's the secret your admin client must present.
 *
 * Set it with:  npx wrangler secret put ADMIN_TOKEN --env production
 * (suggested value: 233efcf4772d3349af9b3c7932ef77c598c1e78156886d42ed711734099b88d8)
 *
 * Usage in the worker:
 *   const identity = await getIdentity(request, env);
 *   if (!identity) return json({ error: "Unauthorized" }, 401);
 *   if (identity.role === "editor" && method === "DELETE") ... // 403
 */

export interface AuthEnv {
  ADMIN_TOKEN: string;
}

export interface Identity {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
}

/**
 * Returns the caller's identity if the request carries a valid admin token,
 * otherwise null (which the worker turns into a 401).
 *
 * A single token grants the "admin" role (full access, including DELETE).
 * If you later need an "editor" role (no DELETE), set a second secret such as
 * EDITOR_TOKEN and branch on it here.
 */
export async function getIdentity(request: Request, env: AuthEnv): Promise<Identity | null> {
  const auth = request.headers.get("Authorization") || "";
  if (!env.ADMIN_TOKEN || auth !== `Bearer ${env.ADMIN_TOKEN}`) return null;
  return { id: "admin", email: "admin@paulibaby.com", name: "Admin", role: "admin" };
}
