import { useState } from "react";
import { ToolPanel, OutputActions } from "../components/ToolPanel";
import { useToolOperation } from "../useToolOperation";
import { csvToJson, jsonToCsv } from "./DataConverter.logic";
import type { Delimiter } from "./DataConverter.logic";
import styles from "../BrowserTools.module.css";

const csvSample = 'id,name,active\r\n1,Alice,true\r\n2,"Bob, Jr.",false';
const jsonSample =
  '[{"id":1,"name":"Alice","active":true},{"id":2,"name":"Bob, Jr.","active":false}]';

export default function DataConverter() {
  const [toJson, setToJson] = useState(true);
  const [input, setInput] = useState(csvSample);
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const operation = useToolOperation<string>();
  return (
    <ToolPanel
      title="CSV / JSON Converter"
      description="Convert quoted CSV records and JSON object arrays locally."
      {...operation}
    >
      <p className={styles.note}>
        CSV values infer numbers and booleans. Leading zeros or numeric
        precision may be lost. Nested JSON values become JSON strings in CSV;
        null and missing fields become empty cells. Spreadsheet apps may execute
        formula-like CSV cells: inspect exports before opening them.
      </p>
      <div className={styles.toolbar}>
        <button
          onClick={() => {
            setToJson(!toJson);
            setInput(
              operation.result ??
                (toJson ? jsonSample : jsonToCsv(jsonSample, delimiter)),
            );
            operation.clear();
          }}
        >
          Switch to {toJson ? "JSON to CSV" : "CSV to JSON"}
        </button>
        <label>
          Delimiter
          <select
            value={delimiter}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "," || value === "\t" || value === ";") {
                setDelimiter(value);
                operation.clear();
              }
            }}
          >
            <option value=",">Comma</option>
            <option value={"\t"}>Tab</option>
            <option value=";">Semicolon</option>
          </select>
        </label>
        <button
          onClick={() => {
            setInput(toJson ? jsonToCsv(jsonSample, delimiter) : jsonSample);
            operation.clear();
          }}
        >
          Sample
        </button>
        <button
          disabled={operation.busy}
          onClick={() =>
            void operation.run(
              () =>
                toJson
                  ? csvToJson(input, delimiter)
                  : jsonToCsv(input, delimiter),
              new Blob([input]).size,
              (value) => new Blob([value]).size,
            )
          }
        >
          Convert {toJson ? "CSV to JSON" : "JSON to CSV"}
        </button>
      </div>
      <div className={styles.grid}>
        <div className={styles.pane}>
          <label>
            Input {toJson ? "CSV" : "JSON"}
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
            Converted {toJson ? "JSON" : "CSV"}
            <textarea
              spellCheck={false}
              readOnly
              value={operation.result ?? ""}
            />
          </label>
          <OutputActions
            key={operation.result}
            text={operation.result ?? ""}
            filename={`converted-data.${toJson ? "json" : "csv"}`}
            mime={toJson ? "application/json" : "text/csv"}
            disabled={operation.result === null}
          />
        </div>
      </div>
    </ToolPanel>
  );
}
