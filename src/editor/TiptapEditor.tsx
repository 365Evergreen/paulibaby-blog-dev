import { Editor } from "@tiptap/core";
import { useEffect, useRef, useState } from "react";
import type { Doc } from "../api";
import { ImageUpload } from "./ImageUpload";
import { contentExtensions } from "./extensions";
import proseStyles from "./Prose.module.css";
import styles from "./TiptapEditor.module.css";

function Btn({
  label,
  active,
  run,
}: {
  label: string;
  active?: boolean;
  run: () => void;
}) {
  return (
    <button
      type="button"
      className={styles.btn}
      aria-pressed={active}
      onClick={run}
    >
      {label}
    </button>
  );
}

interface Props {
  initialContent: Doc;
  onChange: (doc: Doc) => void;
  onUpload: (file: File) => Promise<string>;
  onError: (message: string) => void;
}

export function TiptapEditor({
  initialContent,
  onChange,
  onUpload,
  onError,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const handlers = useRef({ onChange, onUpload, onError });
  const [editor, setEditor] = useState<Editor | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    handlers.current = { onChange, onUpload, onError };
  });

  useEffect(() => {
    const instance = new Editor({
      element: host.current!,
      content: initialContent,
      extensions: [
        ...contentExtensions,
        ImageUpload.configure({
          upload: (f) => handlers.current.onUpload(f),
          onError: (m) => handlers.current.onError(m),
        }),
      ],
      onUpdate: ({ editor }) =>
        handlers.current.onChange(editor.getJSON() as Doc),
      onTransaction: () => setTick((n) => n + 1),
    });
    setEditor(instance);
    return () => {
      instance.destroy();
      setEditor(null);
    };
    // The editor owns its document after mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chain = () => editor!.chain().focus();

  return (
    <div className={styles.wrapper}>
      {editor && (
        <div className={styles.toolbar} role="toolbar" aria-label="Formatting">
          <Btn
            label="B"
            active={editor.isActive("bold")}
            run={() => chain().toggleBold().run()}
          />
          <Btn
            label="I"
            active={editor.isActive("italic")}
            run={() => chain().toggleItalic().run()}
          />
          <Btn
            label="S"
            active={editor.isActive("strike")}
            run={() => chain().toggleStrike().run()}
          />
          <Btn
            label="Code"
            active={editor.isActive("code")}
            run={() => chain().toggleCode().run()}
          />
          <span className={styles.sep} />
          <Btn
            label="H2"
            active={editor.isActive("heading", { level: 2 })}
            run={() => chain().toggleHeading({ level: 2 }).run()}
          />
          <Btn
            label="H3"
            active={editor.isActive("heading", { level: 3 })}
            run={() => chain().toggleHeading({ level: 3 }).run()}
          />
          <Btn
            label="• List"
            active={editor.isActive("bulletList")}
            run={() => chain().toggleBulletList().run()}
          />
          <Btn
            label="1. List"
            active={editor.isActive("orderedList")}
            run={() => chain().toggleOrderedList().run()}
          />
          <Btn
            label="Quote"
            active={editor.isActive("blockquote")}
            run={() => chain().toggleBlockquote().run()}
          />
          <Btn
            label="Code block"
            active={editor.isActive("codeBlock")}
            run={() => chain().toggleCodeBlock().run()}
          />
          <span className={styles.sep} />
          <Btn
            label="Link"
            active={editor.isActive("link")}
            run={() => {
              const prev = editor.getAttributes("link").href as
                | string
                | undefined;
              const href = window.prompt("URL", prev ?? "https://");
              if (href === null) return;
              if (href === "")
                chain().extendMarkRange("link").unsetLink().run();
              else chain().extendMarkRange("link").setLink({ href }).run();
            }}
          />
          <Btn label="Image" run={() => fileInput.current?.click()} />
          <Btn
            label="Callout"
            active={editor.isActive("callout")}
            run={() => chain().toggleCallout("info").run()}
          />
          {editor.isActive("callout") && (
            <>
              <Btn
                label="Info"
                active={editor.isActive("callout", { variant: "info" })}
                run={() =>
                  chain().updateAttributes("callout", { variant: "info" }).run()
                }
              />
              <Btn
                label="Warn"
                active={editor.isActive("callout", { variant: "warning" })}
                run={() =>
                  chain()
                    .updateAttributes("callout", { variant: "warning" })
                    .run()
                }
              />
              <Btn
                label="Success"
                active={editor.isActive("callout", { variant: "success" })}
                run={() =>
                  chain()
                    .updateAttributes("callout", { variant: "success" })
                    .run()
                }
              />
            </>
          )}
          <span className={styles.sep} />
          <Btn label="Undo" run={() => chain().undo().run()} />
          <Btn label="Redo" run={() => chain().redo().run()} />
        </div>
      )}
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        multiple
        className={styles.hidden}
        onChange={(e) => {
          const files = [...(e.target.files ?? [])];
          e.target.value = "";
          if (files.length) editor?.commands.uploadImages(files);
        }}
      />
      <div className={`${styles.content} ${proseStyles.prose}`} ref={host} />
    </div>
  );
}
export default TiptapEditor;
