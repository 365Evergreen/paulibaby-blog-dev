import type { FieldDefinition } from "../../fieldTypes";

export const featureGridSchema: FieldDefinition[] = [
  { key: "heading", label: "Heading", type: "text" },
  {
    key: "columns",
    label: "Columns per row",
    type: "select",
    options: [
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
    ],
  },
  {
    key: "items",
    label: "Features",
    type: "list",
    itemLabel: "Feature",
    fields: [
      { key: "icon", label: "Icon (emoji)", type: "text", placeholder: "✨" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 2 },
      { key: "link", label: "Link (optional)", type: "link" },
    ],
  },
];
