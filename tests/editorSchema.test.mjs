import { test } from "node:test";
import assert from "node:assert/strict";
import { PAGE_SCHEMA_VERSION, validatePageDocument } from "../src/content/editorArtifact.ts";

const document = {
  format: "react-aria-page-builder", version: 1,
  tree: [{
    id: "body", type: "rich-text", props: { data: { content: [{
      id: "paragraph", type: "paragraph", children: [{ text: "Published content" }],
    }] } }, children: [],
  }],
};

test("actual pinned schema runs without DOM globals and validates canonical content", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(PAGE_SCHEMA_VERSION, 1);
  const result = validatePageDocument(document);
  assert.equal(result.ok, true);
  assert.deepEqual(result.document, document);
});

test("actual pinned schema rejects revision metadata, unsupported nodes and unsafe URLs", () => {
  assert.equal(validatePageDocument({ ...document, revision: "must-be-outside-document" }).ok, false);
  assert.equal(validatePageDocument({ ...document, version: 999 }).ok, false);
  assert.equal(validatePageDocument({ ...document, tree: [{ ...document.tree[0], type: "unsupported" }] }).ok, false);
  const unsafe = structuredClone(document);
  unsafe.tree[0].props.data.content[0].children[0].marks = [{ type: "link", href: "javascript:alert(1)" }];
  assert.equal(validatePageDocument(unsafe).ok, false);
});
