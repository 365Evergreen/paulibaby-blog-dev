import { defineComponent } from "../../componentTypes";
import { Image } from "./Image";
import { imageDefaults } from "./Image.defaults";
import { imageSchema } from "./Image.schema";
import type { ImageProps } from "./Image.types";

export type { ImageProps };
export { Image };

export const imageDefinition = defineComponent<ImageProps>({
  type: "image",
  name: "Image",
  group: "content",
  description: "A single image with optional caption and link.",
  fields: imageSchema,
  defaults: imageDefaults,
  Component: Image,
});
