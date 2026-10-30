import { defineComponent } from "../../componentTypes";
import { Callout } from "./Callout";
import { calloutDefaults } from "./Callout.defaults";
import { calloutSchema } from "./Callout.schema";
import type { CalloutProps } from "./Callout.types";

export type { CalloutProps };
export { Callout };

export const calloutDefinition = defineComponent<CalloutProps>({
  type: "callout",
  name: "Callout",
  group: "content",
  description: "A highlighted note, tip or warning.",
  fields: calloutSchema,
  defaults: calloutDefaults,
  Component: Callout,
});
