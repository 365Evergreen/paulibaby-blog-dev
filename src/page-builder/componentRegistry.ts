import type { ComponentDefinition, TemplateComponent, ComponentProps } from "../components/library/componentTypes";
import { calloutDefinition } from "../components/library/content/Callout";
import { imageDefinition } from "../components/library/content/Image";
import { quoteDefinition } from "../components/library/content/Quote";
import { richTextDefinition } from "../components/library/content/RichText";
import { latestPostsDefinition } from "../components/library/dynamic/LatestPosts";
import { columnsDefinition } from "../components/library/layout/Columns";
import { spacerDefinition } from "../components/library/layout/Spacer";
import { callToActionDefinition } from "../components/library/marketing/CallToAction";
import { featureGridDefinition } from "../components/library/marketing/FeatureGrid";
import { heroDefinition } from "../components/library/marketing/Hero";

export type { TemplateComponent };

const definitions = [
  heroDefinition,
  callToActionDefinition,
  featureGridDefinition,
  richTextDefinition,
  imageDefinition,
  quoteDefinition,
  calloutDefinition,
  columnsDefinition,
  spacerDefinition,
  latestPostsDefinition,
] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentRegistry: Record<string, ComponentDefinition<any>> = Object.fromEntries(
  definitions.map((definition) => [definition.type, definition]),
);

export type ComponentType = (typeof definitions)[number]["type"];

export const componentDefinitions = Object.values(componentRegistry);

export function getComponentDefinition(type: string): ComponentDefinition | undefined {
  return componentRegistry[type];
}

/** Defaults overlaid with saved props, so older or partial saved data still renders. */
export function resolveProps(type: string, props: ComponentProps | undefined): ComponentProps {
  const definition = componentRegistry[type];
  const defaults = structuredClone(definition?.defaults ?? {}) as ComponentProps;
  const merged: ComponentProps = { ...defaults, ...(props ?? {}) };
  for (const field of definition?.fields ?? []) {
    if (field.type === "number" && typeof merged[field.key] === "string") {
      const n = Number(merged[field.key]);
      merged[field.key] = Number.isFinite(n) ? n : defaults[field.key];
    }
    if (field.type === "boolean" && typeof merged[field.key] === "string") {
      merged[field.key] = merged[field.key] === "true";
    }
  }
  return merged;
}

export function createTemplateComponent(type: string): TemplateComponent {
  return {
    id: `${type}-${crypto.randomUUID()}`,
    type,
    props: resolveProps(type, undefined),
  };
}
