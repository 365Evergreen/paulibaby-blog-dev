import { defineComponent } from "../../componentTypes";
import { RichText } from "./RichText";
import { richTextDefaults } from "./RichText.defaults";
import { richTextSchema } from "./RichText.schema";
import type { RichTextProps } from "./RichText.types";

export type { RichTextProps };
export { RichText };

export const richTextDefinition = defineComponent<RichTextProps>({
  type: "richText",
  name: "Rich text",
  group: "content",
  description: "A flexible content section for a heading and supporting copy.",
  fields: richTextSchema,
  defaults: richTextDefaults,
  Component: RichText,
});
