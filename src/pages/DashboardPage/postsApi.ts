import { apiFetch } from "../../lib/auth";
// published: 0 = draft, 1 = published, 3 = archived
export const STATUS = { draft: 0, published: 1, archived: 3 } as const;

export interface AdminPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  published: number;
  category_ids: number[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

async function check(res: Response): Promise<Response> {
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  return res;
}

export const fetchPosts = async (): Promise<AdminPost[]> =>
  (await check(await apiFetch("/api/admin/posts"))).json();

export const fetchCategories = async (): Promise<Category[]> =>
  (await check(await apiFetch("/api/admin/categories"))).json();

export const setPostStatus = async (id: number, published: number): Promise<void> => {
  await check(
    await apiFetch(`/api/admin/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published }),
    }),
  );
};

// D1 datetime('now') is UTC without a zone suffix
export const toTime = (s: string) => new Date(s.replace(" ", "T") + "Z").getTime();
export const fmtDate = (s: string) => new Date(toTime(s)).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
