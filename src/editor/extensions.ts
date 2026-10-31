import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { Callout } from "./Callout";
import { Video } from "./tiptap/VideoExtension";
import { Vimeo } from "@fourwaves/tiptap-extension-vimeo";
import { Iframe } from "./tiptap/iFrameExtension/iFrameExtension";
//import { CodeBlock } from "./tiptap/CodeBlockExtension/CodeBlock";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Audio } from "./tiptap/AudioExtension";
import { YoutubeEmbed } from "./tiptap/YouTubeExtension/YouTubeExtension";
import { Column } from "./tiptap/ColumnsExtension/Column";
import { Columns } from "./tiptap/ColumnsExtension/Columns";
import { FileHandler } from "@tiptap/extension-file-handler";
//import { GlobalBlockModifiers } from "./tiptap/GlobalBlockModifiersExtension";
import { Accordion } from "./tiptap/AccordionExtension/Accordion";
import { AccordionContent } from "./tiptap/AccordionExtension/AccordionContent";
import { AccordionHeader } from "./tiptap/AccordionExtension/AccordionHeader";
/** Extensions needed to render stored content (shared by editor and public view). */
export const contentExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    link: false,
    dropcursor: false,
    codeBlock: false,
  }),

  Iframe.configure({
    HTMLAttributes: { class: "custom-iframe-class" },
  }),
  Image,
  Callout,
  Video,
  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true,
    HTMLAttributes: {
      rel: "noopener noreferrer",
      target: "_blank",
    },
  }),

  Placeholder.configure({
    placeholder: "Start writing your post…",
  }),
  Audio,
  Video,
  YoutubeEmbed,
  Vimeo.configure({
    HTMLAttributes: { class: "custom-vimeo-class" },
    autoplay: false,
    controls: true,
    inline: false,
    keyboard: true,
    transcript: true,
    width: 640,
    height: 360,
  }),
  Column,
  Columns,
  FileHandler,
  Iframe,
  //GlobalBlockModifiers,
  Accordion,
  AccordionContent,
  AccordionHeader,
  Callout,
];
