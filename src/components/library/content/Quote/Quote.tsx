import type { QuoteProps } from "./Quote.types";
import styles from "./Quote.module.css";

export function Quote({ quote, author, role }: QuoteProps) {
  return (
    <figure className={styles.figure}>
      <blockquote className={styles.quote}>{quote}</blockquote>
      {(author || role) && (
        <figcaption className={styles.caption}>
          {author && <strong>{author}</strong>}
          {author && role && ", "}
          {role}
        </figcaption>
      )}
    </figure>
  );
}
