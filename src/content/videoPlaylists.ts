export interface PlaylistEntry {
  title: string;
  url: string;
}

export interface PlaylistInput {
  title: string;
  description: string;
  published: 0 | 1;
  entries: PlaylistEntry[];
}

export interface PlaylistSummary {
  id: string;
  title: string;
  description: string;
  published: 0 | 1;
  video_count: number;
}

export interface VideoPlaylist extends PlaylistSummary {
  entries: PlaylistEntry[];
}

export function videoSource(value: unknown): { url: string; embed: string; provider: string } | null {
  if (typeof value !== "string" || value.length > 2048 || /[\s\\]/.test(value)) return null;
  let parsed: URL;
  try { parsed = new URL(value); } catch { return null; }
  if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.port) return null;
  const host = parsed.hostname;
  let id: string | null = null;
  if (["youtube.com", "www.youtube.com", "m.youtube.com", "www.youtube-nocookie.com"].includes(host)) {
    id = parsed.pathname === "/watch" ? parsed.searchParams.get("v")
      : parsed.pathname.match(/^\/(?:embed|shorts)\/([A-Za-z0-9_-]{11})\/?$/)?.[1] ?? null;
  } else if (host === "youtu.be") {
    id = parsed.pathname.match(/^\/([A-Za-z0-9_-]{11})\/?$/)?.[1] ?? null;
  }
  if (id && /^[A-Za-z0-9_-]{11}$/.test(id)) {
    return { url: `https://www.youtube.com/watch?v=${id}`, embed: `https://www.youtube-nocookie.com/embed/${id}`, provider: "YouTube" };
  }
  if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
    const match = parsed.pathname.match(host === "player.vimeo.com"
      ? /^\/video\/([1-9]\d{0,11})\/?$/
      : /^\/([1-9]\d{0,11})(?:\/([A-Za-z0-9]{6,64}))?\/?$/);
    if (!match) return null;
    const hash = match[2] ?? parsed.searchParams.get("h");
    if (hash !== null && hash !== undefined && !/^[A-Za-z0-9]{6,64}$/.test(hash)) return null;
    const suffix = hash ? `&h=${hash}` : "";
    return {
      url: `https://vimeo.com/${match[1]}${hash ? `/${hash}` : ""}`,
      embed: `https://player.vimeo.com/video/${match[1]}?dnt=1${suffix}`,
      provider: "Vimeo",
    };
  }
  return null;
}

export function validatePlaylist(value: unknown): PlaylistInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Playlist must be an object");
  const body = value as Record<string, unknown>;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title || title.length > 120) throw new Error("Playlist title must be 1-120 characters");
  if (typeof body.description !== "string" || body.description.length > 2000) throw new Error("Description must be 2000 characters or fewer");
  if (body.published !== 0 && body.published !== 1) throw new Error("Published must be 0 or 1");
  if (!Array.isArray(body.entries) || body.entries.length > 100) throw new Error("A playlist can contain at most 100 videos");
  if (body.published === 1 && body.entries.length === 0) throw new Error("Add a video before publishing");
  const entries = body.entries.map((entry: unknown, index): PlaylistEntry => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) throw new Error(`Video ${index + 1} is invalid`);
    const item = entry as Record<string, unknown>;
    const title = typeof item.title === "string" ? item.title.trim() : "";
    if (!title || title.length > 200) throw new Error(`Video ${index + 1} title must be 1-200 characters`);
    const source = videoSource(item.url);
    if (!source) throw new Error(`Video ${index + 1} needs a valid HTTPS YouTube or Vimeo video URL`);
    return { title, url: source.url };
  });
  return { title, description: body.description.trim(), published: body.published, entries };
}
