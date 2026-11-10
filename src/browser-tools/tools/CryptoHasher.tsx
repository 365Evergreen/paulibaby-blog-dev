import { useState } from "react";
import { ToolPanel, OutputActions } from "../components/ToolPanel";
import { useToolOperation } from "../useToolOperation";
import {
  algorithms,
  hashBytes,
  encodeBase64,
  decodeBase64,
} from "./CryptoHasher.logic";
import type { HashAlgorithm } from "./CryptoHasher.logic";
import styles from "../BrowserTools.module.css";

const modes = [
  "Hash",
  "Base64 encode",
  "Base64 decode",
  "URI encode",
  "URI decode",
] as const;
type Mode = (typeof modes)[number];

export default function CryptoHasher() {
  const [input, setInput] = useState("Browser tools");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [mode, setMode] = useState<Mode>("Hash");
  const [file, setFile] = useState<File | null>(null);
  const operation = useToolOperation<string>();
  return (
    <ToolPanel
      title="WebCrypto & Base64"
      description="Hash text or files, or encode/decode UTF-8 text and URI components."
      {...operation}
    >
      <div className={styles.toolbar}>
        <label>
          Operation
          <select
            value={mode}
            onChange={(event) => {
              const next = modes.find((item) => item === event.target.value);
              if (next) {
                setMode(next);
                operation.clear();
              }
            }}
          >
            {modes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Hash algorithm
          <select
            value={algorithm}
            disabled={mode !== "Hash"}
            onChange={(event) => {
              const next = algorithms.find(
                (item) => item === event.target.value,
              );
              if (next) {
                setAlgorithm(next);
                operation.clear();
              }
            }}
          >
            {algorithms.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button
          disabled={operation.busy}
          onClick={() =>
            void operation.run(
              async () => {
                if (mode === "Hash")
                  return hashBytes(
                    new TextEncoder().encode(input).buffer,
                    algorithm,
                  );
                if (mode === "Base64 encode") return encodeBase64(input);
                if (mode === "Base64 decode") return decodeBase64(input);
                if (mode === "URI encode") return encodeURIComponent(input);
                return decodeURIComponent(input);
              },
              new Blob([input]).size,
              (value) => new Blob([value]).size,
            )
          }
        >
          Run text operation
        </button>
      </div>
      <p className={styles.note}>
        SHA-1 is a legacy checksum, not a secure choice for signatures. Hashing
        is not encryption. A file is read entirely into memory. Base64 decode
        expects padded Base64 and valid UTF-8; URI actions operate on a URI
        component.
      </p>
      <div className={styles.toolbar}>
        <label>
          Local file for checksum
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
              operation.clear();
            }}
          />
        </label>
        <button
          disabled={!file || operation.busy}
          onClick={() => {
            if (file)
              void operation.run(
                async () => hashBytes(await file.arrayBuffer(), algorithm),
                file.size,
                (value) => value.length,
              );
          }}
        >
          Hash selected file ({algorithm})
        </button>
      </div>
      <div className={styles.grid}>
        <div className={styles.pane}>
          <label>
            Input string
            <textarea
              value={input}
              spellCheck={false}
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
            Result
            <textarea
              readOnly
              spellCheck={false}
              value={operation.result ?? ""}
            />
          </label>
          <OutputActions
            key={operation.result}
            text={operation.result ?? ""}
            filename="crypto-result.txt"
            disabled={operation.result === null}
          />
        </div>
      </div>
    </ToolPanel>
  );
}
