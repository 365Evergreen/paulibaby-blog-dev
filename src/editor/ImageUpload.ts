import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";

export interface ImageUploadOptions {
  upload: (file: File) => Promise<string>;
  onError?: (message: string) => void;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageUpload: {
      uploadImages: (files: File[]) => ReturnType;
    };
  }
}

const isImage = (f: File) => f.type.startsWith("image/");

export const ImageUpload = Extension.create<ImageUploadOptions>({
  name: "imageUpload",

  addOptions() {
    return { upload: async () => "" };
  },

  addCommands() {
    return {
      uploadImages:
        (files) =>
        ({ editor }) => {
          const { upload, onError } = this.options;
          for (const file of files.filter(isImage)) {
            upload(file)
              .then((src) => editor.chain().focus().setImage({ src, alt: file.name }).run())
              .catch((e: unknown) => onError?.(e instanceof Error ? e.message : "Upload failed"));
          }
          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    const editor = this.editor;
    const handle = (_view: EditorView, files: File[]) => {
      const images = files.filter(isImage);
      if (!images.length) return false;
      editor.commands.uploadImages(images);
      return true;
    };
    return [
      new Plugin({
        props: {
          handlePaste: (view, event) => handle(view, [...(event.clipboardData?.files ?? [])]),
          handleDrop: (view, event) => handle(view, [...(event.dataTransfer?.files ?? [])]),
        },
      }),
    ];
  },
});
