import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { Callout } from "./Callout";
import {Video} from './tiptap/VideoExtension'
/** Extensions needed to render stored content (shared by editor and public view). */
export const contentExtensions = [
  StarterKit.configure({ link: { openOnClick: false, autolink: true } }),
  Image,
  Callout,
  Video,
];
