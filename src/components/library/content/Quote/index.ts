import { defineComponent } from "../../componentTypes";
import { Quote } from "./Quote";
import { quoteDefaults } from "./Quote.defaults";
import { quoteSchema } from "./Quote.schema";
import type { QuoteProps } from "./Quote.types";

export type { QuoteProps };
export { Quote };

export const quoteDefinition = defineComponent<QuoteProps>({
  type: "quote",
  name: "Quote",
  group: "content",
  description: "A pull quote with attribution.",
  fields: quoteSchema,
  defaults: quoteDefaults,
  Component: Quote,
});
