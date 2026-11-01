import { useMemo } from "react";
import type { Doc } from "../api";
import { LegacyContentError, renderLegacyDocument } from "../content/legacyRenderer";
import styles from "./Prose.module.css";

export function Prose({ doc }: { doc: Doc }) {
  const result = useMemo(() => {
    try {
      return { html: renderLegacyDocument(doc) };
    } catch (error) {
      if (!(error instanceof LegacyContentError)) throw error;
      return { error: error.message };
    }
  }, [doc]);
  if ("error" in result) return <p role="alert">Legacy content cannot be displayed: {result.error}</p>;
  return <div className={styles.prose} dangerouslySetInnerHTML={{ __html: result.html }} />;
}
