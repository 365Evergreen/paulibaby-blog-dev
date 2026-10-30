import { useEffect, useRef, useState, type ReactNode } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor, JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { createLowlight, common } from "lowlight";
import {
  ChevronsDownUp,
  CirclePlay,
  Code,
  Columns2,
  Columns3,
  Globe,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Info,
  List,
  ListOrdered,
  Minus,
  Music,
  Pilcrow,
  Quote,
  Video as VideoIcon,
  type LucideIcon,
} from "lucide-react";
import { Callout } from "./Callout";
import { Video } from "./tiptap/VideoExtension";
import { Audio } from "./tiptap/AudioExtension";import ImageResize from "tiptap-extension-resize-image";
import { YoutubeEmbed as YouTube } from "./tiptap/YouTubeExtension/YouTubeExtension";
import { Iframe } from "./tiptap/iFrameExtension/iFrameExtension";
import { Accordion } from "./tiptap/AccordionExtension/Accordion";
import { AccordionHeader } from "./tiptap/AccordionExtension/AccordionHeader";
import { AccordionContent } from "./tiptap/AccordionExtension/AccordionContent";
import { Columns } from "./tiptap/ColumnsExtension/Columns";
import { Column } from "./tiptap/ColumnsExtension/Column";
import { CodeBlock } from "./tiptap/CodeBlockExtension/CodeBlock";
import proseStyles from "./Prose.module.css";
import styles from "./BlockEditor.module.css";

const lowlight = createLowlight(common);
const para = (): JSONContent => ({ type: "paragraph" });
const cols = (n: number): JSONContent => ({
  type: "columns",
  attrs: { count: n },
  content: Array.from({ length: n }, () => ({
    type: "column",
    content: [para()],
  })),
});

const YT = [
  /youtube\.com\/watch\?v=([\w-]{11})/,
  /youtu\.be\/([\w-]{11})/,
  /youtube\.com\/embed\/([\w-]{11})/,
  /^([\w-]{11})$/,
];

interface BlockDef {
  label: string;
  icon: LucideIcon;
  // Returns the node to append, or null to cancel (e.g. a dismissed prompt).
  build: (ctx: { pickImage: () => void }) => JSONContent | null;
}

const ask = (msg: string, initial = "https://") => {
  const v = window.prompt(msg, initial)?.trim();
  return v && v !== initial ? v : null;
};

const BLOCKS: BlockDef[] = [
  { label: "Paragraph", icon: Pilcrow, build: para },
  {
    label: "Heading 2",
    icon: Heading2,
    build: () => ({ type: "heading", attrs: { level: 2 } }),
  },
  {
    label: "Heading 3",
    icon: Heading3,
    build: () => ({ type: "heading", attrs: { level: 3 } }),
  },
  {
    label: "List",
    icon: List,
    build: () => ({
      type: "bulletList",
      content: [{ type: "listItem", content: [para()] }],
    }),
  },
  {
    label: "Numbered",
    icon: ListOrdered,
    build: () => ({
      type: "orderedList",
      content: [{ type: "listItem", content: [para()] }],
    }),
  },
  {
    label: "Quote",
    icon: Quote,
    build: () => ({ type: "blockquote", content: [para()] }),
  },
  { label: "Code", icon: Code, build: () => ({ type: "codeBlock" }) },
  { label: "Divider", icon: Minus, build: () => ({ type: "horizontalRule" }) },
  {
    label: "Callout",
    icon: Info,
    build: () => ({
      type: "callout",
      attrs: { variant: "info" },
      content: [para()],
    }),
  },
  { label: "2 Columns", icon: Columns2, build: () => cols(2) },
  { label: "3 Columns", icon: Columns3, build: () => cols(3) },
  {
    label: "Accordion",
    icon: ChevronsDownUp,
    build: () => ({
      type: "accordion",
      content: [
        { type: "accordionHeader" },
        { type: "accordionContent", content: [para()] },
      ],
    }),
  },
  {
    label: "Image",
    icon: ImageIcon,
    build: ({ pickImage }) => (pickImage(), null),
  },
  {
    label: "Video",
    icon: VideoIcon,
    build: () => {
      const src = ask("Video URL");
      return src ? { type: "video", attrs: { src } } : null;
    },
  },
  {
    label: "Audio",
    icon: Music,
    build: () => {
      const src = ask("Audio URL");
      return src ? { type: "audio", attrs: { src } } : null;
    },
  },
  {
    label: "YouTube",
    icon: CirclePlay,
    build: () => {
      const input = ask("YouTube URL", "");
      const id = input && YT.map((r) => input.match(r)?.[1]).find(Boolean);
      if (input && !id)
        window.alert("Could not find a YouTube video ID in that URL.");
      return id ? { type: "youtube", attrs: { videoId: id } } : null;
    },
  },
  {
    label: "Embed",
    icon: Globe,
    build: () => {
      const src = ask("Embed URL");
      return src ? { type: "iframe", attrs: { src } } : null;
    },
  },
];

interface Props {
  value: string;
  onChange: (html: string) => void;
  onUpload?: (file: File) => Promise<string | null>;
  onError?: (message: string) => void;
  /** Rendered across the top; receives the editor and drawer controls. */
  topbar?: (ctx: {
    editor: Editor | null;
    blocksOpen: boolean;
    toggleBlocks: () => void;
  }) => ReactNode;
  /** Docked to the right of the canvas (e.g. the settings panel). */
  aside?: ReactNode;
  children?: ReactNode;
}

export default function BlockEditor({
  value,
  onChange,
  onUpload,
  onError,
  topbar,
  aside,
  children,
}: Props) {
  const [open, setOpen] = useState(
    () => window.matchMedia("(min-width: 900px)").matches,
  );
  const fileInput = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        link: false,
        dropcursor: false,
        codeBlock: false,
      }),
      CodeBlock.configure({ lowlight }),
      Image,
      ImageResize.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "resizable-image",
        },
      }),
      Callout,
      Video,
      Audio,
      YouTube,
      Iframe,
      Accordion,
      AccordionHeader,
      AccordionContent,
      Columns,
      Column,
      Placeholder.configure({
        placeholder: "Start writing, or add a block from the left",
      }),
    ],
    onUpdate: ({ editor }) => onChangeRef.current(editor.getHTML()),
  });

  // Always appends after the last top-level node, followed by an empty paragraph so typing can continue.
  function append(ed: Editor, node: JSONContent) {
    const { doc } = ed.state;
    const last = doc.lastChild;
    const pos =
      last && last.type.name === "paragraph" && last.childCount === 0
        ? doc.content.size - last.nodeSize
        : doc.content.size;
    ed.chain()
      .insertContentAt(pos, [node, para()])
      .focus("end")
      .scrollIntoView()
      .run();
  }

  async function onFile(files: FileList | null) {
    const file = files?.[0];
    if (!file || !editor || !onUpload) return;
    const src = await onUpload(file);
    if (src) append(editor, { type: "image", attrs: { src, alt: file.name } });
    else onError?.("Image upload failed");
  }

  return (
    <div className={styles.outer}>
      {topbar?.({
        editor,
        blocksOpen: open,
        toggleBlocks: () => setOpen((o) => !o),
      })}
      <div className={styles.shell}>
        <aside
          className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
          aria-label="Block inserter"
          aria-hidden={!open}
        >
          <div className={styles.drawerHead}>Blocks</div>
          <div className={styles.grid}>
            {BLOCKS.map(({ label, icon: Icon, build }) => (
              <button
                key={label}
                type="button"
                className={styles.blockBtn}
                disabled={!editor}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  if (!editor) return;
                  const node = build({
                    pickImage: () => fileInput.current?.click(),
                  });
                  if (node) append(editor, node);
                }}
              >
                <Icon size={22} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </aside>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            void onFile(e.target.files);
            e.target.value = "";
          }}
        />
        <div className={styles.canvas}>
          <div className={styles.page}>
            {children}
            <EditorContent editor={editor} className={proseStyles.prose} />
          </div>
        </div>
        {aside}
      </div>
    </div>
  );
}
