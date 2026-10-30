import type { FieldDefinition } from "../../fieldTypes";

export const imageSchema: FieldDefinition[] = [
  { key: "src", label: "Image URL", type: "text", placeholder: "https://..." },
  { key: "alt", label: "Alt text", type: "text", help: "Describe the image for screen readers." },
  { key: "caption", label: "Caption", type: "text" },
  { key: "link", label: "Link (optional)", type: "link" },
  { key: "fullWidth", label: "Full width", type: "boolean" },
];
