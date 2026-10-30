import type { FieldDefinition } from "../../fieldTypes";

export const calloutSchema: FieldDefinition[] = [
  {
    key: "variant",
    label: "Style",
    type: "select",
    options: [
      { value: "info", label: "Info" },
      { value: "success", label: "Success" },
      { value: "warning", label: "Warning" },
      { value: "danger", label: "Danger" },
    ],
  },
  { key: "title", label: "Title", type: "text" },
  { key: "body", label: "Body", type: "textarea", rows: 3 },
];
