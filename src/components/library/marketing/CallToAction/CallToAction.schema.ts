import type { FieldDefinition } from "../../fieldTypes";

export const callToActionSchema: FieldDefinition[] = [
  { key: "title", label: "Title", type: "text", placeholder: "Ready to get started?" },
  { key: "description", label: "Description", type: "textarea", placeholder: "Explain the next step" },
  { key: "buttonLabel", label: "Button label", type: "text", placeholder: "Get in touch" },
  { key: "buttonUrl", label: "Button URL", type: "text", placeholder: "/contact" },
];
