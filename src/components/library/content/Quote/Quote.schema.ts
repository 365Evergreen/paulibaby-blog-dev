import type { FieldDefinition } from "../../fieldTypes";

export const quoteSchema: FieldDefinition[] = [
  { key: "quote", label: "Quote", type: "textarea", rows: 3 },
  { key: "author", label: "Author", type: "text" },
  { key: "role", label: "Role or source", type: "text" },
];
