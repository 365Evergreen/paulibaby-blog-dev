import { generateHTML } from "@tiptap/html";
import { useMemo } from "react";
import type { Doc } from "../api";
import { contentExtensions } from "./extensions";
import styles from "./Prose.module.css";

export function Prose({ doc }: { doc: Doc }) {
  const html = useMemo(() => generateHTML(doc, contentExtensions), [doc]);
  return <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />;
}
