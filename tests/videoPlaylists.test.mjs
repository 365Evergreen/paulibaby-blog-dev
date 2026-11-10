import { test } from "node:test";
import assert from "node:assert/strict";
import { videoSource, validatePlaylist } from "../src/content/videoPlaylists.ts";
import { samplePlaylist } from "./fixtures/video-playlists.mjs";

test("video URLs use exact HTTPS provider hosts and canonical privacy embeds", () => {
  for (const url of [
    "https://youtu.be/dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=ignored",
    "https://m.youtube.com/shorts/dQw4w9WgXcQ",
    "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
  ]) {
    assert.equal(videoSource(url).embed, "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
    assert.equal(videoSource(url).url, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }
  const vimeo = videoSource("https://player.vimeo.com/video/12345?h=abcdef1234&autoplay=1");
  assert.equal(vimeo.embed, "https://player.vimeo.com/video/12345?dnt=1&h=abcdef1234");
  assert.equal(videoSource(vimeo.url).embed, vimeo.embed);
  for (const url of [
    "javascript:alert(1)", "//vimeo.com/12345", "http://vimeo.com/12345",
    "https://youtube.com.evil.invalid/watch?v=dQw4w9WgXcQ",
    "https://evil.invalid/youtube.com/watch?v=dQw4w9WgXcQ",
    "https://user:password@vimeo.com/12345", "https://vimeo.com:8443/12345",
    "https://vimeo.com\\@evil.invalid/12345", "https://vimeo.com/channels/test",
    "https://www.youtube.com/playlist?list=123", "https://youtu.be/dQw4w9WgXcQextra",
    "https://vimeo.com/12345?h=bad%22hash", "https://media.paulibaby.com/movie.mp4",
    "https://vimeo.com/12345\n",
  ]) assert.equal(videoSource(url), null, url);
});

test("playlist validation enforces publishing, shape and bounded ordered entries", () => {
  const input = samplePlaylist(1);
  assert.deepEqual(validatePlaylist(input).entries.map(entry => entry.title), ["First performance", "Second performance"]);
  assert.equal(validatePlaylist({ ...input, title: "  Music  " }).title, "Music");
  assert.equal(validatePlaylist({ ...input, published: 0, entries: [] }).entries.length, 0);
  const boundary = validatePlaylist({
    ...input, title: "x".repeat(120), description: "x".repeat(2000),
    entries: Array(100).fill({ ...input.entries[0], title: "x".repeat(200) }),
  });
  assert.equal(boundary.entries.length, 100);
  for (const invalid of [
    null, [], { ...input, title: "" }, { ...input, title: "x".repeat(121) },
    { ...input, description: "x".repeat(2001) },
    { ...input, description: null }, { ...input, published: true }, { ...input, entries: [] },
    { ...input, entries: Array(101).fill(input.entries[0]) },
    { ...input, entries: [null] }, { ...input, entries: [{ title: "", url: input.entries[0].url }] },
    { ...input, entries: [{ title: "x".repeat(201), url: input.entries[0].url }] },
    { ...input, entries: [{ title: "Video", url: "https://evil.invalid/video" }] },
  ]) assert.throws(() => validatePlaylist(invalid));
});
