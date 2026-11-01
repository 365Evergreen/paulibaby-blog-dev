function mediaHeaders(object: R2Object): Headers {
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("ETag", object.httpEtag);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Cache-Control", "public, max-age=3600");
  headers.set("Accept-Ranges", "bytes");
  const type = headers.get("Content-Type") ?? "application/octet-stream";
  if (!/^(?:image\/(?:png|jpeg|gif|webp|avif)|audio\/[\w.+-]+|video\/[\w.+-]+)(?:;|$)/i.test(type)) {
    headers.set("Content-Disposition", "attachment");
  }
  return headers;
}

export async function serveMedia(request: Request, bucket: R2Bucket): Promise<Response | null> {
  const match = new URL(request.url).pathname.match(/^\/api\/media\/(.+)$/);
  if (!match) return null;
  if (request.method !== "GET" && request.method !== "HEAD") return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "GET, HEAD" } });
  let key: string;
  try { key = decodeURIComponent(match[1]); } catch { return Response.json({ error: "Invalid media key" }, { status: 400 }); }
  if (!key || key.includes("\0")) return Response.json({ error: "Invalid media key" }, { status: 400 });
  try {
    if (request.method === "HEAD") {
      const metadata = await bucket.head(key);
      if (!metadata) return Response.json({ error: "Media not found" }, { status: 404 });
      const headers = mediaHeaders(metadata);
      headers.set("Content-Length", String(metadata.size));
      return new Response(null, { headers });
    }
    let range: { offset: number; length: number } | undefined;
    const requested = request.headers.get("Range");
    if (requested && request.method === "GET") {
      const metadata = await bucket.head(key);
      if (!metadata) return Response.json({ error: "Media not found" }, { status: 404 });
      const condition = request.headers.get("If-Range");
      if (!condition || condition === metadata.httpEtag) {
        const parts = requested.match(/^bytes=(\d*)-(\d*)$/);
        if (!parts || (!parts[1] && !parts[2])) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${metadata.size}` } });
        const suffix = !parts[1];
        const start = suffix ? Math.max(0, metadata.size - Number(parts[2])) : Number(parts[1]);
        const end = suffix || !parts[2] ? metadata.size - 1 : Math.min(Number(parts[2]), metadata.size - 1);
        if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= metadata.size) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${metadata.size}` } });
        range = { offset: start, length: end - start + 1 };
      }
    }
    const object = await bucket.get(key, range ? { range } : undefined);
    if (!object) return Response.json({ error: "Media not found" }, { status: 404 });
    const headers = mediaHeaders(object);
    if (range && object.range && "offset" in object.range && "length" in object.range
      && object.range.offset !== undefined && object.range.length !== undefined) {
      headers.set("Content-Range", `bytes ${object.range.offset}-${object.range.offset + object.range.length - 1}/${object.size}`);
      headers.set("Content-Length", String(object.range.length));
      return new Response(object.body, { status: 206, headers });
    }
    headers.set("Content-Length", String(object.size));
    return new Response(object.body, { headers });
  } catch (error) {
    console.error(JSON.stringify({ event: "media_read_failure", message: error instanceof Error ? error.message : String(error) }));
    return Response.json({ error: "Media storage unavailable" }, { status: 503 });
  }
}
