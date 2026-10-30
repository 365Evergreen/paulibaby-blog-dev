import type { FieldDefinition } from "../../fieldTypes";

export const columnsSchema: FieldDefinition[] = [
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
    label: "Columns",
    type: "list",
    itemLabel: "Column",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "body", label: "Body", type: "textarea", rows: 3 },
    ],
  },
];
