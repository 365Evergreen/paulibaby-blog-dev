import { Node, mergeAttributes } from "@tiptap/core";

export type CalloutVariant = "info" | "warning" | "success";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      toggleCallout: (variant?: CalloutVariant) => ReturnType;
    };
  }
}

const VARIANTS: CalloutVariant[] = ["info", "warning", "success"];

export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      variant: {
        default: "info",
        parseHTML: (el) => {
          const v = el.getAttribute("data-variant") as CalloutVariant;
          return VARIANTS.includes(v) ? v : "info";
        },
        renderHTML: (attrs) => ({ "data-variant": attrs.variant }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-callout]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes({ "data-callout": "" }, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleCallout:
        (variant = "info") =>
        ({ commands }) =>
          this.editor.isActive(this.name) ? commands.lift(this.name) : commands.wrapIn(this.name, { variant }),
    };
  },
});
