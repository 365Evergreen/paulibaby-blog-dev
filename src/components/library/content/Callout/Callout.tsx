import type { CalloutProps } from "./Callout.types";
import styles from "./Callout.module.css";

export function Callout({ variant = "info", title, body }: CalloutProps) {
  return (
    <aside className={`${styles.callout} ${styles[variant] ?? styles.info}`} role="note">
      {title && <strong className={styles.title}>{title}</strong>}
      <p className={styles.body}>{body}</p>
    </aside>
  );
}
