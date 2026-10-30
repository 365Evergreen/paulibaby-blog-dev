import type { RichTextProps } from "./RichText.types";
import styles from "./RichText.module.css";

export function RichText({ heading, body }: RichTextProps) {
  const paragraphs = (body ?? "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <section className={styles.richText}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </section>
  );
}
