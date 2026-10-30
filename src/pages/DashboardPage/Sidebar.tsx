import { NavLink } from "react-router-dom";
import { FileText, Image, LayoutDashboard, Settings, Users, X } from "lucide-react";
import styles from "./DashboardPage.module.css";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/post-editor", label: "Posts", icon: FileText },
  { to: "/admin/media-library", label: "Media", icon: Image },
  { to: "/admin", label: "Users", icon: Users },
  { to: "/admin", label: "Settings", icon: Settings },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`} aria-label="Admin navigation">
        <button className={`${styles.iconBtn} ${styles.sidebarClose}`} onClick={onClose} aria-label="Close menu">
          <X size={18} />
        </button>
        <nav>
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => `${styles.navLink} ${isActive && label === "Dashboard" ? styles.navActive : ""}`}
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
