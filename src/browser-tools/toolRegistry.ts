import type { ToolDefinition } from "./types";

export const tools: readonly ToolDefinition[] = [
  {
    id: "publication-designer",
    name: "Publication Designer",
    description:
      "Create Tiptap print publications with page layouts, columns and direct PDF downloads.",
    category: "document",
    tags: ["tiptap", "publication", "newsletter", "print", "pdf", "layout"],
  },
  {
    id: "theme-designer",
    name: "Fluent Theme Designer",
    description:
      "Design a 23-slot Fluent palette and export JSON, CSS or SharePoint PowerShell.",
    category: "code",
    tags: ["fluent", "theme", "color", "palette", "sharepoint"],
  },
  {
    id: "formatter",
    name: "Code Formatter",
    description:
      "Format JavaScript, TypeScript, JSON, HTML, CSS and Markdown with Prettier.",
    category: "code",
    tags: ["prettier", "javascript", "typescript", "json"],
  },
  {
    id: "html-to-md",
    name: "HTML to Markdown",
    description:
      "Convert pasted or local HTML into Markdown with configurable styles.",
    category: "document",
    tags: ["html", "markdown", "converter"],
  },
  {
    id: "pdf-generator",
    name: "PDF Generator",
    description:
      "Generate a multi-page PDF from a title, author and plain-text document.",
    category: "document",
    tags: ["pdf", "jspdf", "document", "download"],
  },
  {
    id: "image-converter",
    name: "Image Converter & Resizer",
    description: "Resize and convert local images to PNG, JPEG or WebP.",
    category: "file",
    tags: ["image", "png", "jpeg", "webp", "canvas"],
  },
  {
    id: "data-converter",
    name: "CSV / JSON Converter",
    description:
      "Convert CSV tables and JSON object arrays with configurable delimiters.",
    category: "file",
    tags: ["csv", "json", "data", "table"],
  },
  {
    id: "crypto-hasher",
    name: "WebCrypto & Base64",
    description:
      "Hash text or files, and encode or decode UTF-8 Base64 and URI strings.",
    category: "security",
    tags: ["sha256", "hash", "base64", "crypto", "privacy"],
  },
];

export function filterTools(query: string): readonly ToolDefinition[] {
  const search = query.trim().toLowerCase();
  return tools.filter((tool) =>
    [tool.name, tool.description, ...tool.tags].some((text) =>
      text.toLowerCase().includes(search),
    ),
  );
}

export function toolPath(id: ToolDefinition["id"]): string {
  return id === "publication-designer" ? "/publisher" : `/browser-tools/${id}`;
}
