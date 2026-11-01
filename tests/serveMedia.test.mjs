import { test } from "node:test";
import assert from "node:assert/strict";
import { serveMedia } from "../src/content/serveMedia.ts";
function bucket(type = "audio/mpeg") {
  const metadata = { size: 10, httpEtag: '"fixture-etag"', writeHttpMetadata(headers) { headers.set("Content-Type", type); } };
  return {
    async head(key) { return key === "fixture.mp3" ? metadata : null; },
    async get(key, options) {
      if (key !== "fixture.mp3") return null;
      const range = options?.range;
      const body = range ? "0123456789".slice(range.offset, range.offset + range.length) : "0123456789";
      return { ...metadata, range, body };
    },
  };
}
const request = (headers = {}, method = "GET") => new Request("https://local/api/media/fixture.mp3", { method, headers });
test("same-origin media streams with MIME metadata, HEAD and safe download behavior", async () => {
  const full = await serveMedia(request(), bucket());
  assert.equal(full.status, 200);
  assert.equal(await full.text(), "0123456789");
  assert.equal(full.headers.get("Content-Type"), "audio/mpeg");
  assert.equal(full.headers.get("X-Content-Type-Options"), "nosniff");
  const head = await serveMedia(request({}, "HEAD"), bucket());
  assert.equal(await head.text(), "");
  assert.equal(head.headers.get("Content-Length"), "10");
  const svg = await serveMedia(request(), bucket("image/svg+xml"));
  assert.equal(svg.headers.get("Content-Disposition"), "attachment");
});
test("audio/video range requests support bounded, open-ended and suffix reads", async () => {
  for (const [header, text, contentRange] of [
    ["bytes=2-4", "234", "bytes 2-4/10"], ["bytes=8-", "89", "bytes 8-9/10"], ["bytes=-3", "789", "bytes 7-9/10"],
  ]) {
    const response = await serveMedia(request({ Range: header }), bucket());
    assert.equal(response.status, 206);
    assert.equal(await response.text(), text);
    assert.equal(response.headers.get("Content-Range"), contentRange);
    assert.equal(response.headers.get("Content-Length"), String(text.length));
  }
  const stale = await serveMedia(request({ Range: "bytes=2-4", "If-Range": '"stale"' }), bucket());
  assert.equal(stale.status, 200);
});
test("invalid/missing media fails explicitly", async () => {
  for (const Range of ["bytes=99-", "bytes=-0", "bytes=4-2", "bytes=0-1,3-4"]) {
    const response = await serveMedia(request({ Range }), bucket());
    assert.equal(response.status, 416);
  }
  assert.equal((await serveMedia(new Request("https://local/api/media/missing"), bucket())).status, 404);
  assert.equal((await serveMedia(request({}, "POST"), bucket())).status, 405);
});
