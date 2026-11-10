import { useState } from "react";
import { ToolPanel, OutputActions } from "../components/ToolPanel";
import { useToolOperation } from "../useToolOperation";
import { htmlToMarkdown } from "./HtmlToMarkdown.logic";
import type { MarkdownOptions } from "./HtmlToMarkdown.logic";
import styles from "../BrowserTools.module.css";

const sample =
  "<h1>Browser utilities</h1><p>Your <strong>input</strong> stays in your browser.</p><ul><li>Private</li><li>Local</li></ul><pre><code>const local = true;</code></pre>";

export default function HtmlToMarkdown() {
  const [input, setInput] = useState(sample);
  const [options, setOptions] = useState<MarkdownOptions>({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
  });
  const reader = useToolOperation<string>();
  const operation = useToolOperation<string>();
  const source = reader.result ?? input;
  return (
    <ToolPanel
      title="HTML to Markdown"
      description="Convert raw HTML or a local HTML file without rendering or executing it."
      error={reader.error || operation.error}
      busy={reader.busy || operation.busy}
      stats={operation.stats}
    >
      <div className={styles.toolbar}>
        <label>
          Headings
          <select
            value={options.headingStyle}
            onChange={(event) => {
              setOptions({
                ...options,
                headingStyle: event.target.value === "atx" ? "atx" : "setext",
              });
              operation.clear();
            }}
          >
            <option value="atx">ATX (#)</option>
            <option value="setext">Setext (underline)</option>
          </select>
        </label>
        <label>
          Bullet marker
          <select
            value={options.bulletListMarker}
            onChange={(event) => {
              const marker = event.target.value;
              if (marker === "-" || marker === "*" || marker === "+") {
                setOptions({ ...options, bulletListMarker: marker });
                operation.clear();
              }
            }}
          >
            <option>-</option>
            <option>*</option>
            <option>+</option>
          </select>
        </label>
        <label>
          Code blocks
          <select
            value={options.codeBlockStyle}
            onChange={(event) => {
              setOptions({
                ...options,
                codeBlockStyle:
                  event.target.value === "fenced" ? "fenced" : "indented",
              });
              operation.clear();
            }}
          >
            <option value="fenced">Fenced</option>
            <option value="indented">Indented</option>
          </select>
        </label>
        <button
          onClick={() => {
            reader.clear();
            operation.clear();
            setInput(sample);
          }}
        >
          Sample
        </button>
        <button
          disabled={reader.busy || operation.busy}
          onClick={() =>
            void operation.run(
              () => htmlToMarkdown(source, options),
              new Blob([source]).size,
              (value) => new Blob([value]).size,
            )
          }
        >
          Convert to Markdown
        </button>
      </div>
      <label>
        Local HTML file
        <input
          type="file"
          accept=".html,.htm,text/html"
          onChange={(event) => {
            const file = event.target.files?.[0];
            operation.clear();
            if (!file) return;
            if (!/\.html?$/i.test(file.name)) {
              reader.fail("Select an .html or .htm file.");
              return;
            }
            void reader.run(
              () => file.text(),
              file.size,
              (value) => new Blob([value]).size,
            );
            event.target.value = "";
          }}
        />
      </label>
      <div className={styles.grid}>
        <div className={styles.pane}>
          <label>
            HTML source
            <textarea
              spellCheck={false}
              value={source}
              onChange={(event) => {
                setInput(event.target.value);
                reader.clear();
                operation.clear();
              }}
            />
          </label>
          <button
            onClick={() => {
              setInput("");
              reader.clear();
              operation.clear();
            }}
          >
            Clear input
          </button>
        </div>
        <div className={styles.pane}>
          <label>
            Markdown output
            <textarea
              spellCheck={false}
              readOnly
              value={operation.result ?? ""}
            />
          </label>
          <OutputActions
            key={operation.result}
            text={operation.result ?? ""}
            filename="document.md"
            mime="text/markdown"
            disabled={operation.result === null}
          />
        </div>
      </div>
    </ToolPanel>
  );
}
