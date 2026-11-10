import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Copy, Download } from "lucide-react";
import { copyText, downloadBlob, textBlob } from "../browserIO";
import type { ExecutionStats } from "../types";
import styles from "../BrowserTools.module.css";

export function ToolPanel({
  title,
  description,
  error,
  busy,
  stats,
  children,
}: {
  title: string;
  description: string;
  error?: string;
  busy?: boolean;
  stats?: ExecutionStats | null;
  children: ReactNode;
}) {
  return (
    <section className={styles.tool} aria-label={title} aria-busy={busy}>
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      {busy && <p role="status">Processing locally...</p>}
      {stats && (
        <p className={styles.stats} role="status">
          {stats.durationMs} ms | Input: {stats.inputSize.toLocaleString()}{" "}
          bytes | Output: {stats.outputSize.toLocaleString()} bytes
        </p>
      )}
      {children}
    </section>
  );
}

export function OutputActions({
  text,
  filename,
  mime = "text/plain",
  disabled = false,
}: {
  text: string;
  filename: string;
  mime?: string;
  disabled?: boolean;
}) {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const request = useRef(0);
  useEffect(
    () => () => {
      request.current++;
    },
    [text],
  );
  return (
    <div className={styles.actions} key={text}>
      <button
        disabled={disabled}
        onClick={async () => {
          const current = ++request.current;
          setStatus("");
          setError("");
          try {
            await copyText(text);
            if (current === request.current) setStatus("Copied");
          } catch {
            if (current === request.current)
              setError(
                "Could not copy. Check clipboard permissions or select and copy the output manually.",
              );
          }
        }}
      >
        <Copy size={16} aria-hidden="true" /> Copy
      </button>
      <button
        disabled={disabled}
        onClick={() => {
          setStatus("");
          setError("");
          try {
            downloadBlob(textBlob(text, mime), filename);
          } catch {
            setError("Could not download. Check browser download permissions.");
          }
        }}
      >
        <Download size={16} aria-hidden="true" /> Download
      </button>
      {status && <span role="status">{status}</span>}
      {error && (
        <span role="alert" className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

export function BlobPreview({
  blob,
  kind,
  label,
}: {
  blob: Blob;
  kind: "image" | "pdf";
  label: string;
}) {
  const attach = useCallback(
    (node: HTMLImageElement | HTMLIFrameElement | null) => {
      if (!node) return;
      const url = URL.createObjectURL(blob);
      node.src = url;
      return () => URL.revokeObjectURL(url);
    },
    [blob],
  );
  return kind === "image" ? (
    <img ref={attach} alt={label} className={styles.previewImage} />
  ) : (
    <iframe ref={attach} title={label} className={styles.previewPdf} />
  );
}
