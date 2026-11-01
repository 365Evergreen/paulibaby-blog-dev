import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { verifyArtifact } from "../scripts/editor-artifact.mjs";

test("artifact verifier refuses dirty pins, tampering, traversal and missing exports", async () => {
  const folder = await mkdtemp(join(tmpdir(), "editor-verifier-"));
  const revision = "a".repeat(40);
  // Verification-only synthetic assets; never imported or staged as an editor.
  const assets = [];
  for (const path of ["editor.js", "schema.js", "renderer.js", "editor.d.ts", "schema.d.ts", "renderer.d.ts"]) {
    const bytes = Buffer.from(`verification fixture ${path}`);
    await writeFile(join(folder, path), bytes);
    assets.push({ path, size: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") });
  }
  const manifest = { format: "react-aria-page-builder-embed", artifactVersion: 1, schemaVersion: 1, sourceRevision: revision, sourceDirty: false, assets };
  const save = value => writeFile(join(folder, "manifest.json"), JSON.stringify(value));
  try {
    await save(manifest);
    assert.equal((await verifyArtifact(folder, revision)).manifest.sourceRevision, revision);
    await save({ ...manifest, sourceDirty: true });
    await assert.rejects(verifyArtifact(folder, revision), /dirty/);
    await save({ ...manifest, assets: [...assets, { path: "../escape", size: 0, sha256: "0".repeat(64) }] });
    await assert.rejects(verifyArtifact(folder, revision), /Invalid artifact/);
    await save({ ...manifest, assets: assets.filter(x => x.path !== "schema.js") });
    await assert.rejects(verifyArtifact(folder, revision), /missing schema.js/);
    await save(manifest);
    await writeFile(join(folder, "renderer.js"), "tampered");
    await assert.rejects(verifyArtifact(folder, revision), /checksum/);
  } finally { await rm(folder, { recursive: true }); }
});
