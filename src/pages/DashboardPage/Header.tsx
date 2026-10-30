import { Link } from "react-router-dom";
import { Bell, Menu, Moon, Plus, Sun } from "lucide-react";
import styles from "./DashboardPage.module.css";

interface Props {
  dark: boolean;
  onToggleTheme: () => void;
  onMenu: () => void;
  draftCount: number;
}

export function Header({ dark, onToggleTheme, onMenu, draftCount }: Props) {
  return (
    <header className={styles.header}>
      <button className={`${styles.iconBtn} ${styles.menuBtn}`} onClick={onMenu} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <Link to="/" className={styles.logo}>
        Pauli Baby
      </Link>
      <Link to="/admin/post-editor" className={`${styles.btn} ${styles.primary}`}>
        <Plus size={16} /> <span className={styles.hideSm}>New post</span>
      </Link>
      <div className={styles.spacer} />
      <button className={styles.iconBtn} onClick={onToggleTheme} aria-label="Toggle dark mode">
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button className={styles.iconBtn} aria-label={`Notifications (${draftCount} drafts)`} title={`${draftCount} drafts`}>
        <Bell size={18} />
        {draftCount > 0 && <span className={styles.dot} />}
      </button>
      <div className={styles.pill}>
        <span className={styles.avatar}>A</span>
        <span className={styles.hideSm}>Admin</span>
      </div>
    </header>
  );
}
