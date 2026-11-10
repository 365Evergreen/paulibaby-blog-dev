import { useState } from "react";
import { ToolPanel, OutputActions } from "../components/ToolPanel";
import { useToolOperation } from "../useToolOperation";
import { formatCode, languages, samples } from "./CodeFormatter.logic";
import type { Language } from "./CodeFormatter.logic";
import styles from "../BrowserTools.module.css";

export default function CodeFormatter() {
  const [language, setLanguage] = useState<Language>("javascript");
  const [input, setInput] = useState(samples.javascript);
  const [tabWidth, setTabWidth] = useState(2);
  const [singleQuote, setSingleQuote] = useState(true);
  const [semi, setSemi] = useState(true);
  const operation = useToolOperation<string>();
  return (
    <ToolPanel
      title="Code Formatter"
      description="Format six languages with Prettier, entirely in this browser."
      {...operation}
    >
      <div className={styles.toolbar}>
        <label>
          Language
          <select
            value={language}
            onChange={(event) => {
              const next = languages.find(
                (item) => item === event.target.value,
              );
              if (next) {
                setLanguage(next);
                setInput(samples[next]);
                operation.clear();
              }
            }}
          >
            {languages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Tab width
          <select
            value={tabWidth}
            onChange={(event) => {
              setTabWidth(Number(event.target.value));
              operation.clear();
            }}
          >
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
          </select>
        </label>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={singleQuote}
            onChange={(event) => {
              setSingleQuote(event.target.checked);
              operation.clear();
            }}
          />
          Single quotes
        </label>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={semi}
            onChange={(event) => {
              setSemi(event.target.checked);
              operation.clear();
            }}
          />
          Semicolons
        </label>
        <button
          onClick={() => {
            setInput(samples[language]);
            operation.clear();
          }}
        >
          Sample
        </button>
        <button
          disabled={operation.busy}
          onClick={() =>
            void operation.run(
              () => formatCode(input, language, tabWidth, singleQuote, semi),
              new Blob([input]).size,
              (value) => new Blob([value]).size,
            )
          }
        >
          Format code
        </button>
      </div>
      <div className={styles.grid}>
        <div className={styles.pane}>
          <label>
            Input code
            <textarea
              spellCheck={false}
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                operation.clear();
              }}
            />
          </label>
          <button
            onClick={() => {
              setInput("");
              operation.clear();
            }}
          >
            Clear input
          </button>
        </div>
        <div className={styles.pane}>
          <label>
            Formatted output
            <textarea
              spellCheck={false}
              readOnly
              value={operation.result ?? ""}
            />
          </label>
          <OutputActions
            key={operation.result}
            text={operation.result ?? ""}
            filename={`formatted.${{ javascript: "js", typescript: "ts", json: "json", html: "html", css: "css", markdown: "md" }[language]}`}
            disabled={operation.result === null}
          />
        </div>
      </div>
    </ToolPanel>
  );
}
