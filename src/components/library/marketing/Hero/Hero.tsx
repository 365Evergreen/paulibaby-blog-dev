import type { HeroProps } from "./Hero.types";
import styles from "./Hero.module.css";

export function Hero({ eyebrow, title, description, backgroundImage, ctaLabel, ctaUrl }: HeroProps) {
  return (
    <section
      className={`${styles.hero} ${backgroundImage ? styles.withImage : ""}`}
      style={backgroundImage ? { backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url("${backgroundImage}")` } : undefined}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {ctaLabel && ctaUrl && <a className={styles.cta} href={ctaUrl}>{ctaLabel}</a>}
    </section>
  );
}
