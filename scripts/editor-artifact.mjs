import { createHash } from "node:crypto";
import { lstat, readFile, mkdir, cp, writeFile } from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
export async function verifyArtifact(folder, revision, { allowDirty = false } = {}) {
  if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error("Expected a full 40-character source revision");
  if ((await lstat(folder)).isSymbolicLink() || (await lstat(join(folder, "manifest.json"))).isSymbolicLink()) throw new Error("Artifact symlinks are not permitted");
  const bytes = await readFile(join(folder, "manifest.json"));
  const manifest = JSON.parse(bytes);
  if (manifest.format !== "react-aria-page-builder-embed" || manifest.artifactVersion !== 1
    || manifest.schemaVersion !== 1 || manifest.sourceRevision !== revision || (manifest.sourceDirty !== false && !allowDirty)
    || !Array.isArray(manifest.assets)) throw new Error("Unsupported, dirty, or unpinned editor artifact");
  const paths = new Set();
  for (const asset of manifest.assets) {
    if (typeof asset.path !== "string" || !/^[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*$/.test(asset.path)
      || asset.path.split("/").some(part => part === "." || part === "..") || paths.has(asset.path)
      || !/^[a-f0-9]{64}$/.test(asset.sha256) || !Number.isSafeInteger(asset.size) || asset.size < 0) throw new Error("Invalid artifact asset manifest");
    paths.add(asset.path);
    const segments = asset.path.split("/");
    let target = folder;
    for (const segment of segments) {
      target = join(target, segment);
      if ((await lstat(target)).isSymbolicLink()) throw new Error("Artifact symlinks are not permitted");
    }
    const data = await readFile(target);
    if (data.length !== asset.size || sha256(data) !== asset.sha256) throw new Error(`Artifact checksum/size mismatch: ${asset.path}`);
  }
  for (const required of ["editor.js", "schema.js", "renderer.js", "editor.d.ts", "schema.d.ts", "renderer.d.ts"]) {
    if (!paths.has(required)) throw new Error(`Artifact missing ${required}`);
  }
  return { manifest, manifestSha256: sha256(bytes) };
}

async function main() {
  const [action, folderArgument, expectedRevision] = process.argv.slice(2);
  const pinFile = join(root, "editor-artifact.json");
  if (action === "import" || action === "import-local") {
    if (!folderArgument || !expectedRevision) throw new Error("Usage: node scripts\\editor-artifact.mjs import <artifact-folder> <source-revision>");
    const source = resolve(folderArgument);
    const development = action === "import-local";
    if (development && process.env.EDITOR_ALLOW_DIRTY !== "true") throw new Error("Local dirty import requires EDITOR_ALLOW_DIRTY=true; never use this for a release");
    const verified = await verifyArtifact(source, expectedRevision, { allowDirty: development });
    const destination = join(root, "vendor", "editor", expectedRevision);
    try {
      await lstat(destination);
      throw new Error("Pinned destination already exists; import a new source revision, never overwrite an artifact");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    await mkdir(destination, { recursive: true });
    for (const { path } of verified.manifest.assets) {
      const target = join(destination, ...path.split("/"));
      await mkdir(dirname(target), { recursive: true });
      await cp(join(source, ...path.split("/")), target, { errorOnExist: true, force: false });
    }
    await cp(join(source, "manifest.json"), join(destination, "manifest.json"), { errorOnExist: true, force: false });
    await verifyArtifact(destination, expectedRevision, { allowDirty: development });
    const pin = { sourceRevision: expectedRevision, schemaVersion: verified.manifest.schemaVersion, manifestSha256: verified.manifestSha256, development };
    await writeFile(pinFile, JSON.stringify(pin, null, 2) + "\n", { flag: "w" });
    console.log(`Imported verified editor ${expectedRevision}`);
  } else if (action !== "verify") throw new Error("Expected import or verify");
  let pin;
  try { pin = JSON.parse(await readFile(pinFile, "utf8")); } catch (error) {
    if (error.code === "ENOENT" && action === "verify") { console.log("No editor artifact pinned; replacement integration remains disabled"); return; }
    throw error;
  }
  const source = join(root, "vendor", "editor", pin.sourceRevision);
  if (pin.development && process.env.EDITOR_ALLOW_DIRTY !== "true") throw new Error("Development-only artifact cannot be built for release; import a clean committed artifact");
  const verified = await verifyArtifact(source, pin.sourceRevision, { allowDirty: pin.development === true });
  if (verified.manifestSha256 !== pin.manifestSha256) throw new Error("Pinned manifest checksum mismatch");
  const publicFolder = join(root, "public", "editor-assets", pin.sourceRevision);
  await mkdir(publicFolder, { recursive: true });
  for (const { path } of verified.manifest.assets) {
    const target = join(publicFolder, ...path.split("/"));
    await mkdir(dirname(target), { recursive: true });
    await cp(join(source, ...path.split("/")), target);
  }
  await cp(join(source, "manifest.json"), join(publicFolder, "manifest.json"));
  const moduleBase = `../../vendor/editor/${pin.sourceRevision}`;
  await writeFile(join(root, "src", "content", "editorArtifact.ts"), [
    "// Generated from the verified artifact pin; update with editor:import.",
    `export const EDITOR_ASSET_BASE = "/editor-assets/${pin.sourceRevision}/";`,
    `export { validatePageDocument, PAGE_SCHEMA_VERSION } from "${moduleBase}/schema.js";`,
    `export type { PageDocument, ThemeColors, EditorHandle, MountEditorOptions, PageStore } from "${moduleBase}/editor.js";`,
    `export type { RendererHandle, MountRendererOptions } from "${moduleBase}/renderer.js";`,
    `export type EditorModule = typeof import("${moduleBase}/editor.js");`,
    `export type RendererModule = typeof import("${moduleBase}/renderer.js");`,
    "",
  ].join("\n"));
  console.log(`Verified and staged editor assets at /editor-assets/${pin.sourceRevision}/`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
