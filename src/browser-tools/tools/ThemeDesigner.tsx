import { useEffect, useMemo, useRef, useState } from "react";
import {
  themeRulesStandardCreator,
  ThemeGenerator,
  BaseSlots,
  getColorFromString,
  isDark,
} from "@fluentui/react";
import { ToolPanel, OutputActions } from "../components/ToolPanel";
import { copyText } from "../browserIO";
import {
  normalizeColor,
  validatePalette,
  exportPalette,
  presets,
  paletteSlots,
} from "./ThemeDesigner.logic";
import type { ExportFormat } from "./ThemeDesigner.logic";
import styles from "../BrowserTools.module.css";

export default function ThemeDesigner() {
  const [colors, setColors] = useState(presets[0]);
  const [format, setFormat] = useState<ExportFormat>("json");
  const [copyStatus, setCopyStatus] = useState("");
  const [copyError, setCopyError] = useState("");
  const copyRequest = useRef(0);
  useEffect(
    () => () => {
      copyRequest.current++;
    },
    [],
  );
  const generated = useMemo(() => {
    try {
      const primary = getColorFromString(normalizeColor(colors.primary));
      const text = getColorFromString(normalizeColor(colors.text));
      const background = getColorFromString(normalizeColor(colors.background));
      if (!primary || !text || !background)
        throw new Error("The selected colors could not be parsed.");
      const inverted = isDark(background);
      const rules = themeRulesStandardCreator();
      ThemeGenerator.insureSlots(rules, inverted);
      ThemeGenerator.setSlot(
        rules[BaseSlots[BaseSlots.primaryColor]],
        primary,
        inverted,
        true,
        true,
      );
      ThemeGenerator.setSlot(
        rules[BaseSlots[BaseSlots.foregroundColor]],
        text,
        inverted,
        true,
        true,
      );
      ThemeGenerator.setSlot(
        rules[BaseSlots[BaseSlots.backgroundColor]],
        background,
        inverted,
        true,
        true,
      );
      return {
        palette: validatePalette(ThemeGenerator.getThemeAsJson(rules)),
        inverted,
        error: "",
      };
    } catch (reason) {
      return {
        palette: null,
        inverted: false,
        error:
          reason instanceof Error
            ? reason.message
            : "Could not generate the palette.",
      };
    }
  }, [colors]);
  const output = generated.palette
    ? exportPalette(generated.palette, format, generated.inverted)
    : "";
  function updateColor(key: "primary" | "text" | "background", value: string) {
    copyRequest.current++;
    setColors({ ...colors, [key]: value });
    setCopyStatus("");
    setCopyError("");
  }
  return (
    <ToolPanel
      title="Fluent Theme Designer"
      description="Generate the supplied 23-slot Microsoft Fluent palette. Preview changes do not change the blog theme."
      error={generated.error || copyError}
    >
      <div className={styles.actions}>
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => {
              copyRequest.current++;
              setColors(preset);
              setCopyStatus("");
              setCopyError("");
            }}
          >
            {preset.name}
          </button>
        ))}
      </div>
      <div className={styles.toolbar}>
        {(["primary", "text", "background"] as const).map((key) => {
          let picker = "#000000";
          try {
            picker = normalizeColor(colors[key]);
          } catch {
            /* The adjacent field displays the validation error. */
          }
          return (
            <div key={key} className={styles.pane}>
              <label>
                {key} color picker
                <input
                  type="color"
                  value={picker}
                  onChange={(event) => updateColor(key, event.target.value)}
                />
              </label>
              <label>
                {key} hex color
                <input
                  value={colors[key]}
                  aria-invalid={Boolean(generated.error)}
                  onChange={(event) => updateColor(key, event.target.value)}
                />
              </label>
            </div>
          );
        })}
      </div>
      {generated.palette && (
        <div
          className={styles.colorPreview}
          style={{
            background: generated.palette.white,
            color: generated.palette.neutralPrimary,
          }}
        >
          <h3>Theme live simulation</h3>
          <p>
            Preview of your generated foreground, background and brand colors.
          </p>
          <div className={styles.actions}>
            <button
              style={{
                background: generated.palette.themePrimary,
                color: generated.palette.white,
              }}
            >
              Primary button preview
            </button>
            <button
              style={{
                background: generated.palette.white,
                color: generated.palette.neutralPrimary,
                borderColor: generated.palette.neutralSecondary,
              }}
            >
              Default button preview
            </button>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                defaultChecked
                style={{ accentColor: generated.palette.themePrimary }}
              />
              Active option
            </label>
          </div>
          <a
            href="#theme-export"
            style={{ color: generated.palette.themePrimary }}
          >
            Theme export
          </a>
        </div>
      )}
      {generated.palette && (
        <div className={styles.swatches}>
          {paletteSlots.map((slot) => (
            <button
              className={styles.swatch}
              key={slot}
              aria-label={`Copy ${slot} ${generated.palette[slot]}`}
              onClick={async () => {
                const request = ++copyRequest.current;
                try {
                  await copyText(generated.palette[slot]);
                  if (request === copyRequest.current) {
                    setCopyStatus(`Copied ${slot}`);
                    setCopyError("");
                  }
                } catch {
                  if (request === copyRequest.current) {
                    setCopyStatus("");
                    setCopyError(
                      "Could not copy the color. Check clipboard permissions.",
                    );
                  }
                }
              }}
            >
              <span style={{ background: generated.palette[slot] }} />
              <span>{slot}</span>
              <span>{generated.palette[slot]}</span>
            </button>
          ))}
        </div>
      )}
      {copyStatus && <p role="status">{copyStatus}</p>}
      <section className={styles.pane} id="theme-export">
        <label>
          Export format
          <select
            value={format}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "json" || value === "css" || value === "powershell")
                setFormat(value);
            }}
          >
            <option value="json">JSON</option>
            <option value="css">CSS variables</option>
            <option value="powershell">
              SharePoint PowerShell (download only)
            </option>
          </select>
        </label>
        <label>
          Exported theme
          <textarea spellCheck={false} readOnly value={output} />
        </label>
        <OutputActions
          key={output}
          text={output}
          filename={`fluent-theme.${format === "powershell" ? "ps1" : format}`}
          mime={
            format === "json"
              ? "application/json"
              : format === "css"
                ? "text/css"
                : "text/plain"
          }
          disabled={!generated.palette}
        />
      </section>
    </ToolPanel>
  );
}
