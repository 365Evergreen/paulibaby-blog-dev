import { useState } from "react";
import { ToolPanel, BlobPreview } from "../components/ToolPanel";
import { useToolOperation } from "../useToolOperation";
import { downloadBlob } from "../browserIO";
import { generatePdf } from "./PdfGenerator.logic";
import type { PdfOptions } from "./PdfGenerator.logic";
import styles from "../BrowserTools.module.css";

const sample =
  "1. OVERVIEW\nThese utilities process documents, images and text locally in your browser.\n\n2. PRIVACY\nNo tool input is uploaded to a server.\n\n3. NEXT STEPS\nReview the generated document and download your PDF.";

export default function PdfGenerator() {
  const [options, setOptions] = useState<PdfOptions>({
    title: "Browser Tools Overview",
    author: "Document author",
    content: sample,
    orientation: "p",
    format: "a4",
  });
  const operation = useToolOperation<Blob>();
  function update(next: Partial<PdfOptions>) {
    setOptions({ ...options, ...next });
    operation.clear();
  }
  return (
    <ToolPanel
      title="PDF Generator"
      description="Generate a multi-page plain-text document and preview it on demand."
      {...operation}
    >
      <p className={styles.note}>
        The built-in font supports basic Latin (ASCII) text, not arbitrary
        Unicode or rich documents. If your browser cannot display a PDF,
        download it instead.
      </p>
      <div className={styles.toolbar}>
        <label>
          Orientation
          <select
            value={options.orientation}
            onChange={(event) =>
              update({ orientation: event.target.value === "l" ? "l" : "p" })
            }
          >
            <option value="p">Portrait</option>
            <option value="l">Landscape</option>
          </select>
        </label>
        <label>
          Paper size
          <select
            value={options.format}
            onChange={(event) =>
              update({
                format: event.target.value === "letter" ? "letter" : "a4",
              })
            }
          >
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
          </select>
        </label>
        <button onClick={() => update({ content: sample })}>Sample</button>
        <button
          disabled={operation.busy}
          onClick={() =>
            void operation.run(
              () => generatePdf(options),
              new Blob([options.content]).size,
              (value) => value.size,
            )
          }
        >
          Generate PDF
        </button>
      </div>
      <div className={styles.grid}>
        <div className={styles.pane}>
          <label>
            Document title
            <input
              value={options.title}
              onChange={(event) => update({ title: event.target.value })}
            />
          </label>
          <label>
            Author / organisation
            <input
              value={options.author}
              onChange={(event) => update({ author: event.target.value })}
            />
          </label>
          <label>
            Body text
            <textarea
              value={options.content}
              onChange={(event) => update({ content: event.target.value })}
            />
          </label>
        </div>
        <div className={styles.pane}>
          <h3>Generated PDF preview</h3>
          {operation.result ? (
            <>
              <button
                onClick={() => {
                  if (!operation.result) return;
                  try {
                    downloadBlob(
                      operation.result,
                      `${options.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "document"}.pdf`,
                    );
                  } catch {
                    operation.fail(
                      "Could not download. Check browser download permissions.",
                    );
                  }
                }}
              >
                Download PDF
              </button>
              <BlobPreview
                blob={operation.result}
                kind="pdf"
                label="Generated PDF preview"
              />
            </>
          ) : (
            <p>Click Generate PDF to create a preview.</p>
          )}
        </div>
      </div>
    </ToolPanel>
  );
}
