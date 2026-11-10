export const paletteSlots = [
  "themePrimary",
  "themeLighterAlt",
  "themeLighter",
  "themeLight",
  "themeTertiary",
  "themeSecondary",
  "themeDarkAlt",
  "themeDark",
  "themeDarker",
  "neutralLighterAlt",
  "neutralLighter",
  "neutralLight",
  "neutralQuaternaryAlt",
  "neutralQuaternary",
  "neutralTertiaryAlt",
  "neutralTertiary",
  "neutralSecondary",
  "neutralSecondaryAlt",
  "neutralPrimaryAlt",
  "neutralPrimary",
  "neutralDark",
  "black",
  "white",
] as const;
export type Palette = Record<(typeof paletteSlots)[number], string>;
export type ExportFormat = "json" | "css" | "powershell";
export const presets = [
  {
    name: "Fluent Light",
    primary: "#0078d4",
    text: "#323130",
    background: "#ffffff",
  },
  {
    name: "Teams Purple",
    primary: "#6264a7",
    text: "#242424",
    background: "#f5f5f5",
  },
  {
    name: "SharePoint Teal",
    primary: "#008272",
    text: "#333333",
    background: "#ffffff",
  },
  {
    name: "Fluent Dark",
    primary: "#2899f5",
    text: "#ffffff",
    background: "#1b1a19",
  },
  {
    name: "PowerApps Crimson",
    primary: "#b4009e",
    text: "#252423",
    background: "#faf9f8",
  },
  {
    name: "Emerald Green",
    primary: "#107c41",
    text: "#323130",
    background: "#ffffff",
  },
];

export function normalizeColor(value: string): string {
  const text = value.trim();
  if (/^#[\da-f]{3}$/i.test(text))
    return `#${[...text.slice(1)].map((character) => character + character).join("")}`.toLowerCase();
  if (/^#[\da-f]{6}$/i.test(text)) return text.toLowerCase();
  throw new Error(
    "Enter a 3 or 6 digit hexadecimal color, for example #0078d4.",
  );
}

export function validatePalette(value: Record<string, unknown>): Palette {
  const output = {} as Palette;
  for (const slot of paletteSlots) {
    if (typeof value[slot] !== "string")
      throw new Error(`Fluent did not generate ${slot}.`);
    output[slot] = normalizeColor(value[slot]);
  }
  return output;
}

export function exportPalette(
  palette: Palette,
  format: ExportFormat,
  inverted: boolean,
): string {
  const entries = paletteSlots.map(
    (slot) => [slot, normalizeColor(palette[slot])] as const,
  );
  if (format === "json")
    return JSON.stringify(Object.fromEntries(entries), null, 2);
  if (format === "css")
    return `:root {\n${entries.map(([key, value]) => `  --${key}: ${value};`).join("\n")}\n}`;
  return `$palette = @{\n${entries.map(([key, value]) => `  "${key}" = "${value}"`).join(";\n")}\n\n# Review before running in SharePoint Online PowerShell:\n# Add-SPOTheme -Name "Custom Brand Theme" -Palette $palette -IsInverted $${inverted ? "true" : "false"}`;
}
