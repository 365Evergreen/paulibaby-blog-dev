import { defineComponent } from "../../componentTypes";
import { FeatureGrid } from "./FeatureGrid";
import { featureGridDefaults } from "./FeatureGrid.defaults";
import { featureGridSchema } from "./FeatureGrid.schema";
import type { FeatureGridProps } from "./FeatureGrid.types";

export type { FeatureGridProps };
export { FeatureGrid };

export const featureGridDefinition = defineComponent<FeatureGridProps>({
  type: "featureGrid",
  name: "Feature grid",
  group: "marketing",
  description: "A grid of feature cards with icon, text and optional link.",
  fields: featureGridSchema,
  defaults: featureGridDefaults,
  Component: FeatureGrid,
});
