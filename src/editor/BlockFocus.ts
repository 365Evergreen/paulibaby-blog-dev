import { Extension } from "@tiptap/core";
import type { Node as PMNode } from "@tiptap/pm/model";
import { NodeSelection, Plugin, type EditorState } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export interface ActiveBlock {
  pos: number;
  node: PMNode;
  /** Node type name; an image-only paragraph reports "image". */
  kind: string;
  /** Position and node of the inline image when kind is "image". */
  imagePos?: number;
  image?: PMNode;
}

/** The top-level block that contains the current selection. */
export function getActiveBlock(state: EditorState): ActiveBlock | null {
  const { selection } = state;
  let pos: number;
  let node: PMNode;
  if (selection instanceof NodeSelection && selection.$from.depth === 0) {
    pos = selection.from;
    node = selection.node;
  } else if (selection.$from.depth >= 1) {
    pos = selection.$from.before(1);
    node = selection.$from.node(1);
  } else {
    return null;
  }

  const only = node.childCount === 1 ? node.firstChild : null;
  if (node.type.name === "paragraph" && only?.type.name === "image") {
    return { pos, node, kind: "image", imagePos: pos + 1, image: only };
  }
  return { pos, node, kind: node.type.name };
}

/** Marks the selected top-level block so the canvas can outline it. */
export const BlockFocus = Extension.create({
  name: "blockFocus",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations(state) {
            const block = getActiveBlock(state);
            if (!block) return null;
            return DecorationSet.create(state.doc, [
              Decoration.node(block.pos, block.pos + block.node.nodeSize, {
                class: "has-block-focus",
              }),
            ]);
          },
        },
      }),
    ];
  },
});
