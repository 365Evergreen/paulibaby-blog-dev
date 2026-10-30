import type { FeatureGridProps } from "./FeatureGrid.types";
import styles from "./FeatureGrid.module.css";

export function FeatureGrid({ heading, columns = "3", items }: FeatureGridProps) {
  const count = Math.min(4, Math.max(1, Number(columns) || 3));
  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
        {(items ?? []).map((item, i) => (
          <article key={i} className={styles.card}>
            {item.icon && <span className={styles.icon} aria-hidden>{item.icon}</span>}
            {item.title && <h3 className={styles.title}>{item.title}</h3>}
            {item.description && <p className={styles.description}>{item.description}</p>}
            {item.link?.url && <a className={styles.link} href={item.link.url}>{item.link.label || "Learn more"}</a>}
          </article>
        ))}
      </div>
    </section>
  );
}
