/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import type { Editor } from "@tiptap/core";
import { NodeSelection, TextSelection, type Transaction } from "@tiptap/pm/state";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  ChevronDown,
  ChevronsDownUp,
  ChevronUp,
  CirclePlay,
  Code,
  Columns2,
  Copy,
  EllipsisVertical,
  Globe,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Info,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  MoveVertical,
  Music,
  Pilcrow,
  Quote,
  Strikethrough,
  Trash2,
  Type,
  Underline,
  Unlink,
  Video as VideoIcon,
  type LucideIcon,
} from "lucide-react";
import { getActiveBlock, type ActiveBlock } from "./BlockFocus";
import styles from "./BlockToolbar.module.css";

const YT_PATTERNS = [
  /youtube\.com\/watch\?v=([\w-]{11})/,
  /youtu\.be\/([\w-]{11})/,
  /youtube\.com\/embed\/([\w-]{11})/,
  /^([\w-]{11})$/,
];

export function youTubeId(input: string): string | null {
  for (const re of YT_PATTERNS) {
    const id = input.trim().match(re)?.[1];
    if (id) return id;
  }
  return null;
}

export function vimeoId(input: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/channels\/[\w-]+\/(\d+)/,
    /vimeo\.com\/groups\/[\w-]+\/videos\/(\d+)/,
    /^(\d+)$/,
  ];
  for (const re of patterns) {
    const id = input.trim().match(re)?.[1];
    if (id) return id;
  }
  return null;
}

// Only http(s), mailto, tel, and relative links are accepted.
function normalizeHref(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(v)) return v;
  if (/^[a-z][a-z0-9+.-]*:/i.test(v)) return null;
  return `https://${v}`;
}

const KIND_ICONS: Record<string, LucideIcon> = {
  paragraph: Pilcrow,
  heading: Heading2,
  bulletList: List,
  orderedList: ListOrdered,
  blockquote: Quote,
  codeBlock: Code,
  horizontalRule: Minus,
  callout: Info,
  columns: Columns2,
  accordion: ChevronsDownUp,
  image: ImageIcon,
  video: VideoIcon,
  audio: Music,
  youtube: CirclePlay,
  vimeo: VideoIcon,
  iframe: Globe,
};

const TEXT_KINDS = ["paragraph", "heading"];
const TRANSFORMABLE = ["paragraph", "heading", "bulletList", "orderedList", "blockquote"];

const ALIGNMENTS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "left", label: "Align left", icon: AlignLeft },
  { value: "center", label: "Align center", icon: AlignCenter },
  { value: "right", label: "Align right", icon: AlignRight },
  { value: "justify", label: "Justify", icon: AlignJustify },
];

const VARIANTS = [
  { value: "info", label: "Info", color: "#3b82f6" },
  { value: "warning", label: "Warning", color: "#d97706" },
  { value: "success", label: "Success", color: "#16a34a" },
];

const LANGUAGES = ["javascript", "typescript", "html", "css", "json", "bash", "python", "sql"];

type MenuName =
  | "transform"
  | "align"
  | "format"
  | "more"
  | "link"
  | "alt"
  | "url"
  | "height"
  | "language";

function selectBlock(tr: Transaction, pos: number): Transaction {
  const node = tr.doc.nodeAt(pos);
  if (node?.isLeaf) return tr.setSelection(NodeSelection.create(tr.doc, pos));
  return tr.setSelection(TextSelection.near(tr.doc.resolve(pos + 1)));
}

function moveBlock(editor: Editor, { pos, node }: ActiveBlock, dir: -1 | 1) {
  const { state, view } = editor;
  const size = node.nodeSize;
  let target: number;
  if (dir < 0) {
    const prev = state.doc.resolve(pos).nodeBefore;
    if (!prev) return;
    target = pos - prev.nodeSize;
  } else {
    const next = state.doc.nodeAt(pos + size);
    if (!next) return;
    // The next sibling shifts left by `size` once this block is removed.
    target = pos + next.nodeSize;
  }
  const tr = state.tr.delete(pos, pos + size).insert(target, node);
  view.dispatch(selectBlock(tr, target).scrollIntoView());
}

function duplicateBlock(editor: Editor, { pos, node }: ActiveBlock) {
  const at = pos + node.nodeSize;
  const tr = editor.state.tr.insert(at, node);
  editor.view.dispatch(selectBlock(tr, at).scrollIntoView());
  editor.view.focus();
}

function insertParagraph(editor: Editor, at: number) {
  const tr = editor.state.tr.insert(at, editor.schema.nodes.paragraph.create());
  editor.view.dispatch(selectBlock(tr, at).scrollIntoView());
  editor.view.focus();
}

function removeBlock(editor: Editor, { pos, node }: ActiveBlock) {
  const tr = editor.state.tr.delete(pos, pos + node.nodeSize);
  editor.view.dispatch(tr);
  editor.view.focus();
}

function setNodeAttrs(editor: Editor, pos: number, attrs: Record<string, unknown>) {
  const node = editor.state.doc.nodeAt(pos);
  if (!node) return;
  editor.view.dispatch(editor.state.tr.setNodeMarkup(pos, undefined, { ...node.attrs, ...attrs }));
}

function transformBlock(editor: Editor, to: string) {
  const chain = editor.chain().focus().clearNodes();
  switch (to) {
    case "h2":
      chain.setHeading({ level: 2 });
      break;
    case "h3":
      chain.setHeading({ level: 3 });
      break;
    case "bulletList":
      chain.toggleBulletList();
      break;
    case "orderedList":
      chain.toggleOrderedList();
      break;
    case "blockquote":
      chain.toggleBlockquote();
      break;
  }
  chain.run();
}

function Btn({
  label,
  icon: Icon,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${active ? styles.btnActive : ""}`}
      aria-label={label}
      aria-pressed={active}
      title={label}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}

interface MenuItem {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

function Menu({ items, onDone }: { items: MenuItem[]; onDone: () => void }) {
  return (
    <div className={styles.popover} role="menu">
      {items.map(({ label, icon: Icon, active, danger, disabled, onSelect }) => (
        <button
          key={label}
          type="button"
          role="menuitem"
          disabled={disabled}
          className={`${styles.menuItem} ${active ? styles.menuItemActive : ""} ${danger ? styles.menuItemDanger : ""}`}
          onClick={() => {
            onSelect();
            onDone();
          }}
        >
          {Icon && <Icon size={16} />}
          <span>{label}</span>
          {active && <Check size={14} className={styles.menuCheck} />}
        </button>
      ))}
    </div>
  );
}

function FieldPopover({
  label,
  initial,
  placeholder,
  type = "text",
  list,
  onSubmit,
  onRemove,
}: {
  label: string;
  initial: string;
  placeholder?: string;
  type?: string;
  list?: string[];
  onSubmit: (value: string) => void;
  onRemove?: () => void;
}) {
  const [value, setValue] = useState(initial);
  const listId = `${label.replace(/\W+/g, "-")}-list`;
  function submit(e: FormEvent) {
    e.preventDefault();
    onSubmit(value);
  }
  return (
    <form className={`${styles.popover} ${styles.field}`} onSubmit={submit}>
      <input
        autoFocus
        type={type}
        value={value}
        list={list ? listId : undefined}
        placeholder={placeholder}
        aria-label={label}
        onChange={(e) => setValue(e.target.value)}
      />
      {list && (
        <datalist id={listId}>
          {list.map((o) => (
            <option key={o} value={o} />
          ))}
        </datalist>
      )}
      <button type="submit" className={styles.btn} aria-label={`Apply ${label}`} title="Apply">
        <Check size={18} />
      </button>
      {onRemove && (
        <button type="button" className={styles.btn} aria-label="Remove" title="Remove" onClick={onRemove}>
          <Unlink size={18} />
        </button>
      )}
    </form>
  );
}

interface Props {
  editor: Editor | null;
  /** Element the toolbar is positioned within. */
  containerRef: RefObject<HTMLElement | null>;
  onReplaceImage: (imagePos: number) => void;
}

/** WordPress-style contextual toolbar that floats above the selected block. */
export default function BlockToolbar({ editor, containerRef, onReplaceImage }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [, rerender] = useReducer((n: number) => n + 1, 0);
  const [hidden, setHidden] = useState(true);
  const [menu, setMenu] = useState<MenuName | null>(null);

  useEffect(() => {
    if (!editor) return;
    const onFocus = () => {
      setHidden(false);
      setMenu(null);
    };
    const onBlur = ({ event }: { event: FocusEvent }) => {
      if (!ref.current?.contains(event.relatedTarget as Node | null)) setHidden(true);
    };
    editor.on("transaction", rerender);
    editor.on("focus", onFocus);
    editor.on("blur", onBlur);
    return () => {
      editor.off("transaction", rerender);
      editor.off("focus", onFocus);
      editor.off("blur", onBlur);
    };
  }, [editor]);

  const block = editor ? getActiveBlock(editor.state) : null;
  const blockPos = block?.pos;

  useEffect(() => setMenu(null), [blockPos]);

  // Keep the toolbar pinned above the block as content above it reflows.
  useEffect(() => {
    if (!editor) return;
    const ro = new ResizeObserver(rerender);
    ro.observe(editor.view.dom);
    window.addEventListener("resize", rerender);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", rerender);
    };
  }, [editor]);

  useLayoutEffect(() => {
    const el = ref.current;
    const container = containerRef.current;
    if (!el || !container || !editor || blockPos === undefined) return;
    const dom = editor.view.nodeDOM(blockPos);
    if (!(dom instanceof HTMLElement)) return;
    const c = container.getBoundingClientRect();
    const r = dom.getBoundingClientRect();
    const left = Math.max(0, Math.min(r.left - c.left, c.width - el.offsetWidth));
    el.style.left = `${left}px`;
    el.style.top = `${r.top - c.top - el.offsetHeight - 8}px`;
  });

  if (!editor || !block) return null;

  const { kind, node, pos } = block;
  const Icon = KIND_ICONS[kind] ?? Pilcrow;
  const typeLabel = kind === "heading" ? `Heading ${node.attrs.level}` : kind;
  const isText = TEXT_KINDS.includes(kind);
  const alignable = isText || kind === "image";
  const align = (node.attrs.textAlign as string | undefined) ?? "left";
  const AlignIcon = ALIGNMENTS.find((a) => a.value === align)?.icon ?? AlignLeft;
  const hasPrev = pos > 0;
  const hasNext = pos + node.nodeSize < editor.state.doc.content.size;
  const close = () => setMenu(null);
  const toggle = (name: MenuName) => setMenu((m) => (m === name ? null : name));
  const linkActive = editor.isActive("link");
  const canLink = linkActive || !editor.state.selection.empty;

  function keepEditorFocus(e: MouseEvent) {
    if (!(e.target instanceof HTMLInputElement)) e.preventDefault();
  }

  function applyLink(value: string) {
    const href = normalizeHref(value);
    if (!href) return;
    editor!.chain().focus().extendMarkRange("link").setLink({ href }).run();
    close();
  }

  function setUrl(value: string) {
    const src = value.trim();
    if (!src) return;
    if (kind === "youtube") {
      const id = youTubeId(src);
      if (!id) return window.alert("Could not find a YouTube video ID in that URL.");
      setNodeAttrs(editor!, pos, { videoId: id });
    } else {
      const href = normalizeHref(src);
      if (!href) return;
      setNodeAttrs(editor!, pos, { src: href });
    }
    close();
  }

  const moreItems: MenuItem[] = [
    { label: "Duplicate", icon: Copy, onSelect: () => duplicateBlock(editor, block) },
    { label: "Insert before", icon: ChevronUp, onSelect: () => insertParagraph(editor, pos) },
    { label: "Insert after", icon: ChevronDown, onSelect: () => insertParagraph(editor, pos + node.nodeSize) },
    { label: "Remove block", icon: Trash2, danger: true, onSelect: () => removeBlock(editor, block) },
  ];

  const transformItems: MenuItem[] = [
    { label: "Paragraph", icon: Pilcrow, active: kind === "paragraph", onSelect: () => transformBlock(editor, "paragraph") },
    { label: "Heading 2", icon: Heading2, active: kind === "heading" && node.attrs.level === 2, onSelect: () => transformBlock(editor, "h2") },
    { label: "Heading 3", icon: Heading3, active: kind === "heading" && node.attrs.level === 3, onSelect: () => transformBlock(editor, "h3") },
    { label: "List", icon: List, active: kind === "bulletList", onSelect: () => transformBlock(editor, "bulletList") },
    { label: "Numbered list", icon: ListOrdered, active: kind === "orderedList", onSelect: () => transformBlock(editor, "orderedList") },
    { label: "Quote", icon: Quote, active: kind === "blockquote", onSelect: () => transformBlock(editor, "blockquote") },
  ];

  const alignItems: MenuItem[] = ALIGNMENTS.map(({ value, label, icon }) => ({
    label,
    icon,
    active: align === value,
    onSelect: () => editor.chain().focus().setTextAlign(value).run(),
  }));

  const formatItems: MenuItem[] = [
    { label: "Underline", icon: Underline, active: editor.isActive("underline"), onSelect: () => editor.chain().focus().toggleUnderline().run() },
    { label: "Strikethrough", icon: Strikethrough, active: editor.isActive("strike"), onSelect: () => editor.chain().focus().toggleStrike().run() },
    { label: "Inline code", icon: Code, active: editor.isActive("code"), onSelect: () => editor.chain().focus().toggleCode().run() },
  ];

  return (
    <div
      ref={ref}
      className={`${styles.toolbar} ${hidden ? styles.hidden : ""}`}
      role="toolbar"
      aria-label="Block tools"
      onMouseDown={keepEditorFocus}
      onFocusCapture={() => setHidden(false)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!ref.current?.contains(next) && !editor.view.dom.contains(next)) setHidden(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          close();
          editor.view.focus();
        }
      }}
    >
      <div className={styles.group}>
        {TRANSFORMABLE.includes(kind) ? (
          <div className={styles.anchor}>
            <Btn label={`Change block type (${typeLabel})`} icon={Icon} active={menu === "transform"} onClick={() => toggle("transform")} />
            {menu === "transform" && <Menu items={transformItems} onDone={close} />}
          </div>
        ) : (
          <span className={styles.typeIcon} title={typeLabel} aria-label={typeLabel}>
            <Icon size={18} />
          </span>
        )}
        <div className={styles.moveCol}>
          <button type="button" className={styles.move} aria-label="Move up" title="Move up" disabled={!hasPrev} onClick={() => moveBlock(editor, block, -1)}>
            <ChevronUp size={16} />
          </button>
          <button type="button" className={styles.move} aria-label="Move down" title="Move down" disabled={!hasNext} onClick={() => moveBlock(editor, block, 1)}>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {alignable && (
        <div className={styles.group}>
          <div className={styles.anchor}>
            <Btn label="Align" icon={AlignIcon} active={menu === "align"} onClick={() => toggle("align")} />
            {menu === "align" && <Menu items={alignItems} onDone={close} />}
          </div>
        </div>
      )}

      {isText && (
        <div className={styles.group}>
          <Btn label="Bold" icon={Bold} active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
          <Btn label="Italic" icon={Italic} active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
          <div className={styles.anchor}>
            <Btn label="Link" icon={LinkIcon} active={linkActive || menu === "link"} disabled={!canLink} onClick={() => toggle("link")} />
            {menu === "link" && (
              <FieldPopover
                label="Link URL"
                initial={(editor.getAttributes("link").href as string | undefined) ?? ""}
                placeholder="Paste or type a link"
                onSubmit={applyLink}
                onRemove={linkActive ? () => {
                  editor.chain().focus().extendMarkRange("link").unsetLink().run();
                  close();
                } : undefined}
              />
            )}
          </div>
          <div className={styles.anchor}>
            <Btn label="More formatting" active={menu === "format"} onClick={() => toggle("format")}>
              <ChevronDown size={16} />
            </Btn>
            {menu === "format" && <Menu items={formatItems} onDone={close} />}
          </div>
        </div>
      )}

      {kind === "image" && block.image && block.imagePos !== undefined && (
        <div className={styles.group}>
          <div className={styles.anchor}>
            <Btn label="Alternative text" icon={Type} active={menu === "alt"} onClick={() => toggle("alt")} />
            {menu === "alt" && (
              <FieldPopover
                label="Alternative text"
                initial={(block.image.attrs.alt as string | null) ?? ""}
                placeholder="Describe the image"
                onSubmit={(alt) => {
                  setNodeAttrs(editor, block.imagePos!, { alt });
                  close();
                }}
              />
            )}
          </div>
          <button type="button" className={styles.textBtn} onClick={() => onReplaceImage(block.imagePos!)}>
            Replace
          </button>
        </div>
      )}

      {kind === "callout" && (
        <div className={styles.group}>
          {VARIANTS.map(({ value, label, color }) => (
            <button
              key={value}
              type="button"
              className={`${styles.btn} ${node.attrs.variant === value ? styles.btnActive : ""}`}
              aria-label={`${label} callout`}
              aria-pressed={node.attrs.variant === value}
              title={label}
              onClick={() => setNodeAttrs(editor, pos, { variant: value })}
            >
              <span className={styles.swatch} style={{ background: color }} />
            </button>
          ))}
        </div>
      )}

      {["video", "audio", "youtube", "iframe"].includes(kind) && (
        <div className={styles.group}>
          <div className={styles.anchor}>
            <Btn label={kind === "youtube" ? "YouTube URL" : "Source URL"} icon={LinkIcon} active={menu === "url"} onClick={() => toggle("url")} />
            {menu === "url" && (
              <FieldPopover
                label="Source URL"
                initial={kind === "youtube" ? (node.attrs.videoId ? `https://youtu.be/${node.attrs.videoId}` : "") : ((node.attrs.src as string | null) ?? "")}
                placeholder="https://"
                onSubmit={setUrl}
              />
            )}
          </div>
          {kind === "iframe" && (
            <div className={styles.anchor}>
              <Btn label="Height" icon={MoveVertical} active={menu === "height"} onClick={() => toggle("height")} />
              {menu === "height" && (
                <FieldPopover
                  label="Height in pixels"
                  type="number"
                  initial={String(node.attrs.height ?? "400")}
                  onSubmit={(v) => {
                    const h = Math.round(Number(v));
                    if (h < 50 || h > 2000) return;
                    setNodeAttrs(editor, pos, { height: String(h) });
                    close();
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {kind === "codeBlock" && (
        <div className={styles.group}>
          <div className={styles.anchor}>
            <Btn label="Language" icon={Code} active={menu === "language"} onClick={() => toggle("language")} />
            {menu === "language" && (
              <FieldPopover
                label="Language"
                initial={(node.attrs.language as string | null) ?? ""}
                placeholder="e.g. typescript"
                list={LANGUAGES}
                onSubmit={(v) => {
                  setNodeAttrs(editor, pos, { language: v.trim() || null });
                  close();
                }}
              />
            )}
          </div>
        </div>
      )}

      <div className={styles.group}>
        <div className={styles.anchor}>
          <Btn label="Options" icon={EllipsisVertical} active={menu === "more"} onClick={() => toggle("more")} />
          {menu === "more" && <Menu items={moreItems} onDone={close} />}
        </div>
      </div>
    </div>
  );
}
