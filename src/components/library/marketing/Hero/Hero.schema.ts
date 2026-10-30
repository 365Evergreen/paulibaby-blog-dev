import type { FieldDefinition } from "../../fieldTypes";

export const heroSchema: FieldDefinition[] = [
  { key: "eyebrow", label: "Eyebrow", type: "text", placeholder: "Optional label" },
  { key: "title", label: "Title", type: "text", placeholder: "Your primary message" },
  { key: "description", label: "Description", type: "textarea", placeholder: "A short supporting message" },
  { key: "backgroundImage", label: "Background image URL", type: "text", placeholder: "https://..." },
  { key: "ctaLabel", label: "CTA label", type: "text", placeholder: "Learn more" },
  { key: "ctaUrl", label: "CTA URL", type: "text", placeholder: "/contact" },
];
