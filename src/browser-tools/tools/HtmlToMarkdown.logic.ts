import TurndownService from "turndown";

export interface MarkdownOptions {
  headingStyle: "atx" | "setext";
  bulletListMarker: "-" | "*" | "+";
  codeBlockStyle: "fenced" | "indented";
}

export function htmlToMarkdown(
  input: string,
  options: MarkdownOptions,
): string {
  const service = new TurndownService(options);
  service.remove([
    "script",
    "style",
    "iframe",
    "object",
    "embed",
    "link",
    "meta",
    "base",
  ]);
  if (typeof document === "undefined") return service.turndown(input);
  // Template contents remain inert: no scripts or referenced resources are loaded.
  const template = document.createElement("template");
  template.innerHTML = input;
  return service.turndown(template.content);
}
