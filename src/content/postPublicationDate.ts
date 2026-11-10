export const POST_DATE_ORDER = "COALESCE(p.published_date, date(p.created_at)) DESC, p.id DESC";

export function parsePublishedDate(value: unknown, now = new Date()): { value: string } | { error: string } {
  if (value === undefined || value === null || value === "") return { value: now.toISOString().slice(0, 10) };
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return { error: "published_date must be a valid YYYY-MM-DD date." };
  }
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    return { error: "published_date must be a valid YYYY-MM-DD date." };
  }
  return { value };
}

export function postPublicationDate(post: { published_date?: string | null; created_at: string }): string {
  return post.published_date || post.created_at;
}
