import { defineComponent } from "../../componentTypes";
import { LatestPosts } from "./LatestPosts";
import { latestPostsDefaults } from "./LatestPosts.defaults";
import { latestPostsSchema } from "./LatestPosts.schema";
import type { LatestPostsProps } from "./LatestPosts.types";

export type { LatestPostsProps };
export { LatestPosts };

export const latestPostsDefinition = defineComponent<LatestPostsProps>({
  type: "latestPosts",
  name: "Latest posts",
  group: "dynamic",
  description: "Shows the newest published posts, optionally filtered by category.",
  fields: latestPostsSchema,
  defaults: latestPostsDefaults,
  Component: LatestPosts,
});
