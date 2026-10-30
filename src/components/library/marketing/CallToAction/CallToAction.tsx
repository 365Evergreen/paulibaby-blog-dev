import type { CallToActionProps } from "./CallToAction.types";
import styles from "./CallToAction.module.css";

export function CallToAction({ title, description, buttonLabel, buttonUrl }: CallToActionProps) {
  return (
    <section className={styles.cta}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {buttonLabel && buttonUrl && <a className={styles.button} href={buttonUrl}>{buttonLabel}</a>}
    </section>
  );
}
