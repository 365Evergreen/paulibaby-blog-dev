import type { ReactNode } from "react";
import styles from "./DashboardPage.module.css";

interface Props {
  label: string;
  value: number | null;
  icon: ReactNode;
}

export function StatCard({ label, value, icon }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.statIcon}>{icon}</div>
      <div>
        <div className={styles.statLabel}>{label}</div>
        {value === null ? <div className={`${styles.skeleton} ${styles.skelValue}`} /> : <div className={styles.statValue}>{value}</div>}
      </div>
    </div>
  );
}
