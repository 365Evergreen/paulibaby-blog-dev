import type { ImageProps } from "./Image.types";
import styles from "./Image.module.css";

export function Image({ src, alt, caption, link, fullWidth }: ImageProps) {
  if (!src) return null;
  const img = <img className={styles.image} src={src} alt={alt ?? ""} loading="lazy" />;
  return (
    <figure className={`${styles.figure} ${fullWidth ? styles.full : ""}`}>
      {link?.url ? <a href={link.url}>{img}</a> : img}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
