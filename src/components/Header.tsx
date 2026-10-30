import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router";
import navigation from "../data/navigation.json";
import styles from "./Header.module.css";
import { MegaMenu, NavAnchor, type NavigationData } from "./MegaMenu";

const nav = navigation as NavigationData;

// Hover opens panels only on desktop with a real pointer; elsewhere it's tap/click.
const hoverMenu = () => matchMedia("(hover: hover) and (min-width: 64em)").matches;

export function Header() {
  const rootId = useId();
  const root = useRef<HTMLElement>(null);
  const openedByHover = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => {
    setOpenIndex(null);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen && openIndex === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen, openIndex]);

  const menuId = `${rootId}-menu`;

  return (
    <header className={styles.header} ref={root}>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand} onClick={close}>
          Paulibaby
        </Link>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => {
            setMenuOpen((o) => !o);
            setOpenIndex(null);
          }}
        >
          <span className={styles.srOnly}>{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className={styles.burger} aria-hidden="true" />
        </button>
        <nav id={menuId} className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Primary">
          <ul className={styles.list}>
            {nav.items.map((item, i) => {
              const panelId = `${rootId}-panel-${i}`;
              const expanded = openIndex === i;
              return (
                <li
                  key={item.label}
                  className={styles.item}
                  onMouseEnter={() => {
                    if (!item.columns || !hoverMenu()) return;
                    openedByHover.current = true;
                    setOpenIndex(i);
                  }}
                  onMouseLeave={() => {
                    if (!item.columns || !hoverMenu()) return;
                    openedByHover.current = false;
                    setOpenIndex(null);
                  }}
                >
                  {item.columns ? (
                    <>
                      <button
                        type="button"
                        className={styles.trigger}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => {
                          // A click right after a hover-open should not immediately close it.
                          if (openedByHover.current) openedByHover.current = false;
                          else setOpenIndex(expanded ? null : i);
                        }}
                      >
                        {item.label}
                        <span className={styles.chevron} aria-hidden="true" />
                      </button>
                      <div hidden={!expanded}>
                        <MegaMenu id={panelId} item={item} onNavigate={close} />
                      </div>
                    </>
                  ) : (
                    <NavAnchor href={item.href ?? "/"} className={styles.trigger} onNavigate={close}>
                      {item.label}
                    </NavAnchor>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
