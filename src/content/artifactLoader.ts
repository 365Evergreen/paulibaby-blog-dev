import { EDITOR_ASSET_BASE, type EditorModule, type RendererModule, type ThemeColors } from "./editorArtifact";

async function stylesheet(name: string) {
  const href = `${EDITOR_ASSET_BASE}${name}`;
  const existing = document.querySelector<HTMLLinkElement>(`link[data-editor-stylesheet="${name}"]`);
  if (existing?.href === new URL(href, location.origin).href && existing.sheet) return;
  await new Promise<void>((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.editorStylesheet = name;
    link.onload = () => resolve();
    link.onerror = () => { link.remove(); reject(new Error(`Pinned editor stylesheet failed to load: ${name}`)); };
    document.head.appendChild(link);
  });
}
export async function loadEditorModule(): Promise<EditorModule> {
  await Promise.all([stylesheet("PageDocumentRenderer.css"), stylesheet("editor.css")]);
  const url = `${EDITOR_ASSET_BASE}editor.js`;
  const module: EditorModule = await import(/* @vite-ignore */ url);
  if (typeof module.mountEditor !== "function") throw new Error("Pinned artifact is missing mountEditor");
  return module;
}
export async function loadRendererModule(): Promise<RendererModule> {
  await Promise.all([stylesheet("PageDocumentRenderer.css"), stylesheet("renderer.css")]);
  const url = `${EDITOR_ASSET_BASE}renderer.js`;
  const module: RendererModule = await import(/* @vite-ignore */ url);
  if (typeof module.mountRenderer !== "function") throw new Error("Pinned artifact is missing mountRenderer");
  return module;
}
export const editorTheme: ThemeColors = {
  themePrimary: "#0078d4", themeLighterAlt: "#eff6fc", themeLighter: "#deecf9", themeLight: "#c7e0f4",
  themeTertiary: "#71afe5", themeSecondary: "#2b88d8", themeDarkAlt: "#106ebe", themeDark: "#005a9e", themeDarker: "#004578",
  neutralLighterAlt: "#faf9f8", neutralLighter: "#f3f2f1", neutralLight: "#edebe9", neutralQuaternaryAlt: "#e1dfdd",
  neutralQuaternary: "#d0d0d0", neutralTertiaryAlt: "#c8c6c4", neutralTertiary: "#a19f9d", neutralSecondaryAlt: "#8a8886",
  neutralSecondary: "#605e5c", neutralPrimaryAlt: "#3b3a39", neutralPrimary: "#323130", neutralDark: "#201f1e", black: "#000000", white: "#ffffff",
};
