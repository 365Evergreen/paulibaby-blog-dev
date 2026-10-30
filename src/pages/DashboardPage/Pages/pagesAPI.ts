import { apiFetch } from "../../../lib/auth";
import { STATUS, fmtDate, toTime } from  "../Posts/postsApi";

export { STATUS, fmtDate, toTime };

export interface AdminPage {
  id: number;
  slug: string;
  title: string;
  published: number;
  created_at: string;
  updated_at: string;
  template_id: number | null;
  template_content: string;
}

async function check(res: Response): Promise<Response> {
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  return res;
}

export const fetchPages = async (): Promise<AdminPage[]> =>
  (await check(await apiFetch("/api/admin/pages"))).json();

export const setPageStatus = async (id: number, published: number): Promise<void> => {
  await check(
    await apiFetch(`/api/admin/pages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published }),
    }),
  );
};
