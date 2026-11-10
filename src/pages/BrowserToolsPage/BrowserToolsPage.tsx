import { Suspense, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { filterTools, toolPath } from "../../browser-tools/toolRegistry";
import styles from "../../browser-tools/BrowserTools.module.css";
import pageStyles from "./BrowserToolsPage.module.css";

export default function BrowserToolsPage() {
  const [query, setQuery] = useState("");
  const visible = filterTools(query);
  return (
    <section className={styles.root} aria-labelledby="browser-tools-title">
      <header className={pageStyles.header}>
        <h1 id="browser-tools-title">Browser tools</h1>
        <p>
          Developer utilities for text, documents and images. Tool input and
          output stay in your browser, with no tool-data uploads.
        </p>
      </header>
      <p className={styles.notice}>
        Large inputs can consume substantial memory or freeze the tab.
        Processing has no application size cap, but browser limits still apply.
        Files are read in full. Inputs and results are discarded when you leave
        a tool.
      </p>
      <label className={pageStyles.search}>
        Search tools
        <input
          type="search"
          value={query}
          placeholder="Search by name, description or tag"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <nav className={styles.navigation} aria-label="Browser tools">
        <NavLink to="/browser-tools" end>
          All tools
        </NavLink>
        {visible.map((tool) => (
          <NavLink key={tool.id} to={toolPath(tool.id)}>
            {tool.name}
          </NavLink>
        ))}
      </nav>
      <Suspense fallback={<p role="status">Loading tool...</p>}>
        <Outlet context={{ query }} />
      </Suspense>
    </section>
  );
}
