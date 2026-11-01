import { useMemo } from "react";
import { LegacyContentError, renderLegacyDocument } from "./legacyRenderer";
import { renderMarkdown } from "../lib/renderMarkdown";
import styles from "../editor/Prose.module.css";

export function LegacyBody({ body, className = "" }: { body: string; className?: string }) {
  const result = useMemo(() => {
    if (!/^\s*\{/.test(body) || !/"type"\s*:\s*"doc"/.test(body)) return { html: renderMarkdown(body) };
    try {
      return { html: renderLegacyDocument(JSON.parse(body)) };
    } catch (error) {
      if (!(error instanceof LegacyContentError) && !(error instanceof SyntaxError)) throw error;
      return { error: error.message };
    }
  }, [body]);
  if ("error" in result) return <p role="alert">Legacy content cannot be displayed: {result.error}</p>;
  return <div className={`${styles.prose} ${className}`} dangerouslySetInnerHTML={{ __html: result.html }} />;
}
