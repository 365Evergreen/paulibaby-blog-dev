import type { ComponentType as ReactComponentType } from "react";
import type { FieldDefinition } from "./fieldTypes";

export type ComponentGroup = "content" | "layout" | "marketing" | "dynamic";

export const COMPONENT_GROUP_LABELS: Record<ComponentGroup, string> = {
  content: "Content",
  layout: "Layout",
  marketing: "Marketing",
  dynamic: "Dynamic",
};

export type ComponentProps = Record<string, unknown>;

export interface ComponentDefinition<P extends object = ComponentProps> {
  type: string;
  name: string;
  group: ComponentGroup;
  description: string;
  fields: FieldDefinition[];
  defaults: P;
  Component: ReactComponentType<P>;
}

export function defineComponent<P extends object>(definition: ComponentDefinition<P>): ComponentDefinition<P> {
  return definition;
}

export interface TemplateComponent {
  id: string;
  type: string;
  props: ComponentProps;
}
