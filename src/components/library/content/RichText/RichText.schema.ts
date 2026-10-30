import type { FieldDefinition } from "../../fieldTypes";

export const richTextSchema: FieldDefinition[] = [
  { key: "heading", label: "Heading", type: "text", placeholder: "Section heading" },
  { key: "body", label: "Body", type: "textarea", rows: 6, placeholder: "Write your content…", help: "Separate paragraphs with a blank line." },
];
