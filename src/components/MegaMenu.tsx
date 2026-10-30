import { Link } from "react-router";
import styles from "./MegaMenu.module.css";

export interface NavLinkItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  heading: string;
  links: NavLinkItem[];
}

export interface NavFeatured {
  title: string;
  text: string;
  href: string;
  cta: string;
}

export interface NavItem {
  label: string;
  href?: string;
  columns?: NavColumn[];
  featured?: NavFeatured;
}

export interface NavigationData {
  items: NavItem[];
}

const isExternal = (href: string) => /^(https?:)?\/\//.test(href);

export function NavAnchor({
  href,
  className,
  onNavigate,
  children,
}: {
  href: string;
  className?: string;
  onNavigate?: () => void;
  children: React.ReactNode;
}) {
  return isExternal(href) ? (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
      {children}
    </a>
  ) : (
    <Link to={href} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}

interface Props {
  id: string;
  item: NavItem;
  onNavigate: () => void;
}

/** Panel content for a nav item that has columns. Visibility is controlled by the parent. */
export function MegaMenu({ id, item, onNavigate }: Props) {
  return (
    <div id={id} className={styles.panel}>
      <div className={styles.inner}>
        {item.columns?.map((col) => (
          <section key={col.heading} className={styles.column} aria-label={col.heading}>
            <h2 className={styles.heading}>{col.heading}</h2>
            <ul className={styles.links}>
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <NavAnchor href={l.href} className={styles.link} onNavigate={onNavigate}>
                    <span className={styles.linkLabel}>{l.label}</span>
                    {l.description && <span className={styles.linkDesc}>{l.description}</span>}
                  </NavAnchor>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {item.featured && (
          <aside className={styles.featured}>
            <h2 className={styles.heading}>{item.featured.title}</h2>
            <p className={styles.featuredText}>{item.featured.text}</p>
            <NavAnchor href={item.featured.href} className={styles.cta} onNavigate={onNavigate}>
              {item.featured.cta} →
            </NavAnchor>
          </aside>
        )}
      </div>
    </div>
  );
}
