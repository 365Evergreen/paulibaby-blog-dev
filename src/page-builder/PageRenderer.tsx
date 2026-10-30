import type { ComponentProps, TemplateComponent } from "../components/library/componentTypes";
import { ComponentRenderer } from "./ComponentRenderer";

export interface PageRendererProps {
  components: TemplateComponent[];
  /** Per-component overrides saved on a page or post, keyed by component id. */
  content?: Record<string, ComponentProps>;
}

export function PageRenderer({ components, content = {} }: PageRendererProps) {
  return (
    <>
      {components.map((component) => (
        <ComponentRenderer
          key={component.id}
          type={component.type}
          props={{ ...component.props, ...(content[component.id] ?? {}) }}
        />
      ))}
    </>
  );
}
