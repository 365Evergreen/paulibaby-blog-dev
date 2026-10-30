import type { FieldDefinition } from "../../fieldTypes";

export const spacerSchema: FieldDefinition[] = [
  { key: "height", label: "Height (px)", type: "number", min: 0, max: 400, step: 8 },
  { key: "showDivider", label: "Show divider line", type: "boolean" },
];
