import { defineComponent } from "../../componentTypes";
import { CallToAction } from "./CallToAction";
import { callToActionDefaults } from "./CallToAction.defaults";
import { callToActionSchema } from "./CallToAction.schema";
import type { CallToActionProps } from "./CallToAction.types";

export type { CallToActionProps };
export { CallToAction };

export const callToActionDefinition = defineComponent<CallToActionProps>({
  type: "callToAction",
  name: "Call to action",
  group: "marketing",
  description: "A focused prompt with a title, description, and link.",
  fields: callToActionSchema,
  defaults: callToActionDefaults,
  Component: CallToAction,
});
