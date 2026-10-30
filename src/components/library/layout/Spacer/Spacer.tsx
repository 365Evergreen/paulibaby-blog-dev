import type { SpacerProps } from "./Spacer.types";
import styles from "./Spacer.module.css";

export function Spacer({ height = 48, showDivider }: SpacerProps) {
  return (
    <div className={styles.spacer} style={{ height: Math.max(0, Number(height) || 0) }} aria-hidden>
      {showDivider && <hr className={styles.divider} />}
    </div>
  );
}
