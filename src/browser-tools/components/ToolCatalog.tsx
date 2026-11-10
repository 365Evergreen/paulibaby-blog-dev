import { Link, useOutletContext } from "react-router-dom";
import {
  Code,
  FileCode,
  FileText,
  Image,
  ArrowRightLeft,
  ShieldCheck,
  Palette,
  BookOpen,
} from "lucide-react";
import { filterTools, toolPath } from "../toolRegistry";
import styles from "../BrowserTools.module.css";

const icons = {
  "theme-designer": Palette,
  formatter: Code,
  "html-to-md": FileCode,
  "pdf-generator": FileText,
  "publication-designer": BookOpen,
  "image-converter": Image,
  "data-converter": ArrowRightLeft,
  "crypto-hasher": ShieldCheck,
};

export default function ToolCatalog() {
  const { query } = useOutletContext<{ query: string }>();
  const visible = filterTools(query);
  return (
    <section aria-labelledby="available-tools">
      <h2 id="available-tools">Available tools ({visible.length})</h2>
      {!visible.length && (
        <p role="status">
          No tools match this search. Clear the search to see all tools.
        </p>
      )}
      <div className={styles.cards}>
        {visible.map((tool) => {
          const Icon = icons[tool.id];
          return (
            <Link key={tool.id} to={toolPath(tool.id)} className={styles.card}>
              <Icon size={24} aria-hidden="true" />
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <span className={styles.tags}>{tool.tags.join(" / ")}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
