import { apiFetch } from "../../lib/auth";

export type UserRole = "admin" | "editor";

export interface AdminUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: UserRole;
}

async function check(res: Response): Promise<Response> {
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  return res;
}

export const fetchUsers = async (): Promise<AdminUser[]> => (await check(await apiFetch("/api/admin/users"))).json();

export const createUser = async (u: NewUser): Promise<AdminUser> =>
  (
    await check(
      await apiFetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(u),
      }),
    )
  ).json();

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";

export function generatePassword(length = 16): string {
  const limit = 256 - (256 % CHARS.length);
  let out = "";
  while (out.length < length) {
    for (const b of crypto.getRandomValues(new Uint8Array(length))) {
      if (b < limit && out.length < length) out += CHARS[b % CHARS.length];
    }
  }
  return out;
}
