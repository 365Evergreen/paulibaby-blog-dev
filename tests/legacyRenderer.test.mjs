import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderLegacyDocument } from "../src/content/legacyRenderer.ts";
const fixture = JSON.parse(readFileSync(new URL("./fixtures/legacy-all-nodes.json", import.meta.url)));
const doc = node => ({ type: "doc", content: [node] });

test("all active node/mark fixtures render without mutation or loss of text", () => {
  const before = JSON.stringify(fixture);
  const html = renderLegacyDocument(fixture);
  for (const fragment of [
    '<h1 style="text-align: center">', "<h2>", "<h3>", "<strong>Bold</strong>",
    "<em>Italic</em>", "<s>Strike</s>", "<u>Underline</u>", "<code>Code</code>", "<br>",
    '<ol start="4" type="a">', "First bullet", "Second bullet", "<blockquote>",
    'data-language="typescript"', "&lt;safe&gt;", "<hr>", 'data-variant="info"',
    'data-variant="warning"', 'data-variant="success"', 'data-count="2"', 'data-count="3"',
    'width: 50%', "<details", "<summary", "Accordion content", 'alt="Fixture image"',
    'title="Image title"', 'width="320"', 'height="240"', "width: 320px",
    '<a href="/image"', "<audio", "<video", 'data-youtube="dQw4w9WgXcQ"',
    "player.vimeo.com/video/12345678", 'title="Embedded content"', 'height="480"',
  ]) assert.ok(html.includes(fragment), fragment);
  assert.equal(JSON.stringify(fixture), before);
});

test("unknown nodes/attributes/marks and unsafe URLs fail with visible diagnostics", () => {
  for (const node of [
    { type: "unknown" }, { type: "paragraph", attrs: { dropped: "never" } },
    { type: "text", text: "x", marks: [{ type: "unknown" }] },
    { type: "image", attrs: { src: "javascript:alert(1)" } },
    { type: "iframe", attrs: { src: "http://example.com" } },
    { type: "image", attrs: { src: "/ok.png", containerStyle: "background: url(https://evil.invalid)" } },
    { type: "youtube", attrs: { videoId: '"><script>' } },
    { type: "image", attrs: { src: "/ok.png" }, content: [{ type: "text", text: "never lose this" }] },
  ]) assert.throws(() => renderLegacyDocument(doc(node)));
});

test("content and attribute injection are escaped; embeds are sandboxed", () => {
  const html = renderLegacyDocument(doc({ type: "paragraph", content: [{ type: "text", text: "<script>alert('x')</script>" }] }));
  assert.equal(html, "<p>&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;</p>");
  const embed = renderLegacyDocument(doc({ type: "iframe", attrs: { src: "https://example.com" } }));
  assert.match(embed, /sandbox="allow-scripts"/);
  assert.doesNotMatch(embed, /allow-same-origin/);
});
