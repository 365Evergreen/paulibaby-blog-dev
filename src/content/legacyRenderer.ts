export class LegacyContentError extends Error {}
type JsonObject = Record<string, unknown>;
const object = (value: unknown): value is JsonObject => !!value && typeof value === "object" && !Array.isArray(value);
const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const attr = (name: string, value: unknown) => value === null || value === undefined ? "" : ` ${name}="${escape(String(value))}"`;

function url(value: unknown, link = false): string {
  if (typeof value !== "string" || !value || [...value].some(char => char.charCodeAt(0) <= 32) || value.includes("\\")) throw new LegacyContentError("Invalid legacy URL");
  if (value.startsWith("/") && !value.startsWith("//") || link && value.startsWith("#")) return value;
  try {
    const parsed = new URL(value);
    if (["https:", "http:", ...(link ? ["mailto:", "tel:"] : [])].includes(parsed.protocol) && !parsed.username && !parsed.password) return value;
    if (!link && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=]+$/.test(value)) return value;
  } catch { /* The explicit diagnostic below applies to every invalid URL. */ }
  throw new LegacyContentError("Unsafe or unsupported legacy URL");
}
function dimension(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") throw new LegacyContentError("Invalid legacy dimension");
  const text = String(value);
  if (!/^(?:\d+(?:\.\d+)?(?:px|%|rem|em)?|auto)$/.test(text)) throw new LegacyContentError("Invalid legacy dimension");
  return text;
}
function imageStyle(value: unknown): string {
  if (value === null || value === undefined || value === "") return "";
  if (typeof value !== "string") throw new LegacyContentError("Invalid legacy image style");
  const entries = value.split(";").map(x => x.trim()).filter(Boolean);
  for (const entry of entries) {
    const [rawProperty, ...rest] = entry.split(":");
    const property = rawProperty.trim().toLowerCase();
    const v = rest.join(":").trim();
    if (/^(?:width|height|min-width|max-width|min-height|max-height)$/.test(property)) dimension(v);
    else if (["margin", "padding"].includes(property) || /^(?:margin|padding)-(?:left|right|top|bottom)$/.test(property)) {
      for (const part of v.split(/\s+/)) dimension(part);
    } else if (property === "display" && /^(?:block|inline|inline-block|flex|none|contents)$/.test(v)) continue;
    else if (property === "float" && /^(?:none|left|right)$/.test(v)) continue;
    else if (property === "cursor" && v === "pointer") continue;
    else throw new LegacyContentError(`Unsupported legacy image style: ${property}`);
  }
  return entries.join("; ");
}
const attributes: Record<string, string[]> = {
  doc: [], text: [], paragraph: ["textAlign"], heading: ["level", "textAlign"],
  bulletList: [], orderedList: ["start", "type"], listItem: [], blockquote: [],
  hardBreak: [], horizontalRule: [], codeBlock: ["language"],
  callout: ["variant"], columns: ["count"], column: ["width"],
  accordion: [], accordionHeader: [], accordionContent: [],
  image: ["src", "alt", "title", "width", "height", "containerStyle", "wrapperStyle"],
  audio: ["src", "controls"], video: ["src", "controls"],
  youtube: ["videoId"], vimeo: ["src", "width", "height"], iframe: ["src", "width", "height"],
};
function assertAttrs(attrs: JsonObject, allowed: string[], type: string) {
  for (const key of Object.keys(attrs)) if (!allowed.includes(key)) throw new LegacyContentError(`Unsupported legacy ${type} attribute: ${key}`);
}
function iframe(src: string, title: string, width: unknown = "100%", height: unknown = "400", provider = false) {
  const parsed = new URL(src, "https://legacy.invalid");
  if (parsed.protocol !== "https:") throw new LegacyContentError("Legacy embeds require HTTPS");
  return `<iframe${attr("src", src)}${attr("title", title)}${attr("width", dimension(width))}${attr("height", dimension(height))} loading="lazy" referrerpolicy="no-referrer" sandbox="${provider ? "allow-scripts allow-same-origin allow-presentation" : "allow-scripts"}"${provider ? ' allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen' : ""}></iframe>`;
}

/** Read-only compatibility: diagnostics never rewrite or silently drop stored JSON. */
export function renderLegacyDocument(document: unknown): string {
  if (!object(document) || document.type !== "doc") throw new LegacyContentError("Expected a legacy doc root");
  let count = 0;
  function render(value: unknown, depth: number): string {
    if (++count > 10000 || depth > 64) throw new LegacyContentError("Legacy document exceeds rendering limits");
    if (!object(value) || typeof value.type !== "string" || !attributes[value.type]) throw new LegacyContentError(`Unsupported legacy node: ${object(value) ? String(value.type) : "invalid"}`);
    const type = value.type;
    const candidateAttrs = value.attrs ?? {};
    if (!object(candidateAttrs)) throw new LegacyContentError(`Invalid legacy ${type} attributes`);
    const attrs: JsonObject = candidateAttrs;
    assertAttrs(attrs, attributes[type], type);
    for (const key of Object.keys(value)) if (!["type", "attrs", "content", "text", "marks"].includes(key)) throw new LegacyContentError(`Unsupported legacy node field: ${key}`);
    if (value.content !== undefined && !Array.isArray(value.content)) throw new LegacyContentError("Invalid legacy content");
    const children = (value.content ?? []) as unknown[];
    if (["text", "hardBreak", "horizontalRule", "image", "audio", "video", "youtube", "vimeo", "iframe"].includes(type) && children.length) throw new LegacyContentError(`Unexpected children on legacy ${type}`);
    let content = children.map(child => render(child, depth + 1)).join("");
    if (type === "text") {
      if (typeof value.text !== "string") throw new LegacyContentError("Invalid legacy text");
      content = escape(value.text);
    }
    const markCandidates = value.marks ?? [];
    if (!Array.isArray(markCandidates)) throw new LegacyContentError("Invalid legacy marks");
    const markValues: unknown[] = markCandidates;
    function marks(html: string) {
    for (const mark of markValues) {
      if (!object(mark)) throw new LegacyContentError("Invalid legacy mark");
      const tags: Record<string, string> = { bold: "strong", italic: "em", strike: "s", code: "code", underline: "u" };
      const markAttrs = mark.attrs ?? {};
      if (!object(markAttrs)) throw new LegacyContentError("Invalid legacy mark attributes");
      if (mark.type === "link") {
        assertAttrs(markAttrs, ["href", "target", "rel", "class"], "link");
        html = `<a${attr("href", url(markAttrs.href, true))}${attr("class", markAttrs.class)}${attr("target", markAttrs.target)} rel="noopener noreferrer">${html}</a>`;
      } else if (typeof mark.type === "string" && tags[mark.type]) {
        assertAttrs(markAttrs, [], mark.type);
        html = `<${tags[mark.type]}>${html}</${tags[mark.type]}>`;
      } else throw new LegacyContentError(`Unsupported legacy mark: ${String(mark.type)}`);
    }
    return html;
    }
    const wrap = (tag: string, extra = "") => `<${tag}${extra}>${content}</${tag}>`;
    let align = "";
    if (attrs.textAlign !== undefined && attrs.textAlign !== null) {
      if (!["left", "right", "center", "justify"].includes(String(attrs.textAlign))) throw new LegacyContentError("Invalid legacy alignment");
      align = attr("style", `text-align: ${attrs.textAlign}`);
    }
    function nodeHtml() {
    switch (type) {
      case "doc": case "text": return content;
      case "paragraph": return wrap("p", align);
      case "heading":
        if (![1, 2, 3].includes(Number(attrs.level ?? 1))) throw new LegacyContentError("Unsupported legacy heading level");
        return wrap(`h${attrs.level ?? 1}`, align);
      case "bulletList": return wrap("ul");
      case "orderedList":
        if (attrs.start !== undefined && !Number.isInteger(attrs.start)) throw new LegacyContentError("Invalid legacy list start");
        if (attrs.type != null && !["1", "a", "A", "i", "I"].includes(String(attrs.type))) throw new LegacyContentError("Invalid legacy list type");
        return wrap("ol", attr("start", attrs.start ?? 1) + attr("type", attrs.type));
      case "listItem": return wrap("li");
      case "blockquote": return wrap("blockquote");
      case "hardBreak": return "<br>";
      case "horizontalRule": return "<hr>";
      case "codeBlock": return `<pre${attr("data-language", attrs.language ?? "plaintext")}><code${attr("class", attrs.language ? `language-${attrs.language}` : null)}>${content}</code></pre>`;
      case "callout":
        if (!["info", "warning", "success"].includes(String(attrs.variant ?? "info"))) throw new LegacyContentError("Invalid legacy callout variant");
        return wrap("div", ' data-callout=""' + attr("data-variant", attrs.variant ?? "info"));
      case "columns":
        if (![2, 3].includes(Number(attrs.count ?? 2)) || children.some(c => !object(c) || c.type !== "column")) throw new LegacyContentError("Invalid legacy columns");
        return wrap("div", ' data-type="columns"' + attr("data-count", attrs.count ?? 2));
      case "column": return wrap("div", ' data-type="column"' + attr("style", `width: ${dimension(attrs.width ?? "100%")}`));
      case "accordion":
        if (children.length !== 2 || !object(children[0]) || children[0].type !== "accordionHeader" || !object(children[1]) || children[1].type !== "accordionContent") throw new LegacyContentError("Invalid legacy accordion structure");
        return wrap("details", ' data-type="accordion" open');
      case "accordionHeader": return wrap("summary", ' data-type="accordion-header"');
      case "accordionContent": return wrap("div", ' data-type="accordion-content"');
      case "image": {
        const img = `<img${attr("src", url(attrs.src))}${attr("alt", attrs.alt ?? "")}${attr("title", attrs.title)}${attr("width", attrs.width == null ? null : dimension(attrs.width))}${attr("height", attrs.height == null ? null : dimension(attrs.height))}>`;
        if (!attrs.containerStyle && !attrs.wrapperStyle) return img;
        return `<span${attr("style", imageStyle(attrs.wrapperStyle))}><span${attr("style", imageStyle(attrs.containerStyle))}>${img}</span></span>`;
      }
      case "audio": case "video": return `<${type}${attr("src", url(attrs.src))} controls></${type}>`;
      case "youtube":
        if (typeof attrs.videoId !== "string" || !/^[\w-]{11}$/.test(attrs.videoId)) throw new LegacyContentError("Invalid legacy YouTube ID");
        return `<div${attr("data-youtube", attrs.videoId)}>${iframe(`https://www.youtube.com/embed/${attrs.videoId}`, "YouTube video", "100%", "400", true)}</div>`;
      case "vimeo": {
        const src = new URL(url(attrs.src));
        if (!["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(src.hostname)) throw new LegacyContentError("Invalid legacy Vimeo host");
        const id = src.pathname.match(/(?:^|\/)(\d+)\/?$/)?.[1];
        if (!id) throw new LegacyContentError("Invalid legacy Vimeo ID");
        return `<div data-vimeo-video="">${iframe(`https://player.vimeo.com/video/${id}?autoplay=0&controls=1&keyboard=1&transcript=1`, "Vimeo video", attrs.width ?? 640, attrs.height ?? 360, true)}</div>`;
      }
      case "iframe": return iframe(url(attrs.src), "Embedded content", attrs.width ?? "100%", attrs.height ?? "400");
      default: throw new LegacyContentError(`Unsupported legacy node: ${type}`);
    }
    }
    return marks(nodeHtml());
  }
  return render(document, 0);
}
