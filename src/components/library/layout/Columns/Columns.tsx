import type { ColumnsProps } from "./Columns.types";
import styles from "./Columns.module.css";

export function Columns({ columns = "2", items }: ColumnsProps) {
  const count = Math.min(4, Math.max(1, Number(columns) || 2));
  return (
    <section className={styles.columns} style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
      {(items ?? []).map((item, i) => (
        <div key={i} className={styles.column}>
          {item.heading && <h3 className={styles.heading}>{item.heading}</h3>}
          {item.body && <p className={styles.body}>{item.body}</p>}
        </div>
      ))}
    </section>
  );
}
