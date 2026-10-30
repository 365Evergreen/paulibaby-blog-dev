export type ComponentType = "hero" | "richText" | "callToAction";

export interface TemplateComponent {
  id: string;
  type: ComponentType;
  props: Record<string, string>;
}

export interface ComponentField {
  key: string;
  label: string;
  multiline?: boolean;
  placeholder?: string;
}

export interface ComponentDefinition {
  type: ComponentType;
  name: string;
  description: string;
  fields: ComponentField[];
  defaults: Record<string, string>;
}

export const componentRegistry: Record<ComponentType, ComponentDefinition> = {
  hero: {
    type: "hero",
    name: "Hero",
    description: "An introductory banner with an image, title, and action.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", placeholder: "Optional label" },
      { key: "title", label: "Title", placeholder: "Your primary message" },
      { key: "description", label: "Description", multiline: true, placeholder: "A short supporting message" },
      { key: "backgroundImage", label: "Background image URL", placeholder: "https://..." },
      { key: "ctaLabel", label: "CTA label", placeholder: "Learn more" },
      { key: "ctaUrl", label: "CTA URL", placeholder: "/contact" },
    ],
    defaults: { eyebrow: "", title: "Your page title", description: "", backgroundImage: "", ctaLabel: "", ctaUrl: "" },
  },
  richText: {
    type: "richText",
    name: "Rich text",
    description: "A flexible content section for a heading and supporting copy.",
    fields: [
      { key: "heading", label: "Heading", placeholder: "Section heading" },
      { key: "body", label: "Body", multiline: true, placeholder: "Write your content…" },
    ],
    defaults: { heading: "", body: "" },
  },
  callToAction: {
    type: "callToAction",
    name: "Call to action",
    description: "A focused prompt with a title, description, and link.",
    fields: [
      { key: "title", label: "Title", placeholder: "Ready to get started?" },
      { key: "description", label: "Description", multiline: true, placeholder: "Explain the next step" },
      { key: "buttonLabel", label: "Button label", placeholder: "Get in touch" },
      { key: "buttonUrl", label: "Button URL", placeholder: "/contact" },
    ],
    defaults: { title: "Ready to get started?", description: "", buttonLabel: "Get in touch", buttonUrl: "" },
  },
};

export const componentDefinitions = Object.values(componentRegistry);

export function createTemplateComponent(type: ComponentType): TemplateComponent {
  return {
    id: `${type}-${crypto.randomUUID()}`,
    type,
    props: { ...componentRegistry[type].defaults },
  };
}
