import { defineComponent } from "../../componentTypes";
import { Spacer } from "./Spacer";
import { spacerDefaults } from "./Spacer.defaults";
import { spacerSchema } from "./Spacer.schema";
import type { SpacerProps } from "./Spacer.types";

export type { SpacerProps };
export { Spacer };

export const spacerDefinition = defineComponent<SpacerProps>({
  type: "spacer",
  name: "Spacer",
  group: "layout",
  description: "Vertical space with an optional divider line.",
  fields: spacerSchema,
  defaults: spacerDefaults,
  Component: Spacer,
});
