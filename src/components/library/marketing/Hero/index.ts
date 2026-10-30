import { defineComponent } from "../../componentTypes";
import { Hero } from "./Hero";
import { heroDefaults } from "./Hero.defaults";
import { heroSchema } from "./Hero.schema";
import type { HeroProps } from "./Hero.types";

export type { HeroProps };
export { Hero };

export const heroDefinition = defineComponent<HeroProps>({
  type: "hero",
  name: "Hero",
  group: "marketing",
  description: "An introductory banner with an image, title, and action.",
  fields: heroSchema,
  defaults: heroDefaults,
  Component: Hero,
});
