import { NavLink } from "react-router-dom";
import { Palette, FileText, Image, LayoutDashboard, LayoutTemplate, Settings, Users, X , Layers2 } from "lucide-react";
import styles from "./DashboardPage.module.css";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/dashboard/posts", label: "Posts", icon: FileText },
  { to: "/admin/dashboard/pages", label: "Pages", icon: Layers2 },
  { to: "/admin/dashboard/templates", label: "Templates", icon: LayoutTemplate },
  { to: "/admin/media-library", label: "Media", icon: Image },
  { to: "/admin/dashboard/users", label: "Users", icon: Users },
  { to: "/admin/dashboard/themes", label: "Themes", icon: Palette },
  { to: "/admin/dashboard/settings", label: "Settings", icon: Settings, end: true },
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
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navActive : ""}`}
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
