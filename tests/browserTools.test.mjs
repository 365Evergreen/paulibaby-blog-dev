import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import {
  tools,
  filterTools,
  toolPath,
} from "../src/browser-tools/toolRegistry.ts";
import {
  formatCode,
  languages,
  samples,
} from "../src/browser-tools/tools/CodeFormatter.logic.ts";
import {
  parseCsv,
  csvToJson,
  jsonToCsv,
} from "../src/browser-tools/tools/DataConverter.logic.ts";
import {
  hashBytes,
  algorithms,
  encodeBase64,
  decodeBase64,
} from "../src/browser-tools/tools/CryptoHasher.logic.ts";
import {
  paletteSlots,
  presets,
  normalizeColor,
  validatePalette,
  exportPalette,
} from "../src/browser-tools/tools/ThemeDesigner.logic.ts";
import { htmlToMarkdown } from "../src/browser-tools/tools/HtmlToMarkdown.logic.ts";
import { generatePdf } from "../src/browser-tools/tools/PdfGenerator.logic.ts";
import { validateDimensions } from "../src/browser-tools/tools/ImageConverter.logic.ts";

test("catalog has seven unique routes and searches names, descriptions and tags", () => {
  assert.equal(tools.length, 7);
  assert.equal(new Set(tools.map((tool) => tool.id)).size, 7);
  for (const tool of tools) {
    assert.equal(toolPath(tool.id), `/browser-tools/${tool.id}`);
    assert.ok(tool.name && tool.description && tool.tags.length);
  }
  assert.equal(filterTools("").length, 7);
  assert.equal(filterTools("  PRETTIER ")[0].id, "formatter");
  assert.equal(filterTools("sharepoint")[0].id, "theme-designer");
  assert.equal(filterTools("object arrays")[0].id, "data-converter");
  assert.equal(filterTools("not a tool").length, 0);
});

test("Prettier loads every advertised parser and honors options", async () => {
  for (const language of languages) {
    const formatted = await formatCode(
      samples[language],
      language,
      2,
      true,
      true,
    );
    assert.ok(formatted.endsWith("\n"), language);
    assert.equal(
      await formatCode(formatted, language, 2, true, true),
      formatted,
    );
  }
  const formatted = await formatCode(
    'function demo(){const name="Alice";return name;}',
    "javascript",
    4,
    true,
    false,
  );
  assert.match(formatted, /\n {4}const name = 'Alice'\n/);
  assert.doesNotMatch(formatted, /;/);
  await assert.rejects(formatCode("function {", "javascript", 2, true, true));
  await assert.rejects(formatCode("{bad}", "json", 2, true, true));
});

test("CSV supports quoted separators, quotes, multiline fields, BOM and CRLF", () => {
  for (const delimiter of [",", "\t", ";"]) {
    const rows = [
      {
        'a,"header': `hello${delimiter}world`,
        note: 'say "hi"\r\nsecond line',
        active: true,
        count: 42,
        empty: "",
      },
    ];
    const csv = jsonToCsv(JSON.stringify(rows), delimiter);
    assert.deepEqual(
      JSON.parse(csvToJson(`\uFEFF${csv}\r\n\r\n`, delimiter)),
      rows,
    );
  }
  assert.deepEqual(parseCsv('a,b\r\n"  spaced  ",\r\n', ","), [
    ["a", "b"],
    ["  spaced  ", ""],
  ]);
  assert.deepEqual(JSON.parse(csvToJson("id,bool,empty\n001,true,", ",")), [
    { id: 1, bool: true, empty: "" },
  ]);
  assert.deepEqual(
    JSON.parse(csvToJson("__proto__,constructor\nsafe,true", ",")),
    [{ ["__proto__"]: "safe", constructor: true }],
  );
});

test("CSV and JSON fail explicitly instead of dropping invalid data", () => {
  for (const input of [
    'a,b\n"unfinished',
    'a,b\n"a"tail,b',
    'a,b\nun"quoted,b',
  ]) {
    assert.throws(() => csvToJson(input, ","), /Malformed CSV/);
  }
  for (const input of ["a,a\n1,2", ",b\n1,2"])
    assert.throws(() => csvToJson(input, ","), /headers/);
  for (const input of ["a,b\n1", "a,b\n1,2,3"])
    assert.throws(() => csvToJson(input, ","), /expected 2/);
  assert.throws(() => csvToJson("", ","), /header/);
  for (const input of ["null", "[]", "[null]", "[1]", "[[]]", "{}"])
    assert.throws(() => jsonToCsv(input, ","), /array/);
  assert.throws(() => jsonToCsv("[{}]", ","), /column/);
  assert.throws(() => jsonToCsv('[{"":1}]', ","), /column/);
  assert.equal(
    jsonToCsv('[{"a":{"x":1}},{"b":null}]', ","),
    'a,b\r\n"{""x"":1}",\r\n,',
  );
});

test("UTF-8 Base64 round-trips text and rejects invalid padding/bytes", () => {
  for (const text of [
    "",
    "hello world",
    "a+b /=%",
    "日本語 😀 café",
    "x".repeat(100000),
  ]) {
    const encoded = encodeBase64(text);
    assert.equal(encoded, Buffer.from(text).toString("base64"));
    assert.equal(decodeBase64(encoded), text);
  }
  for (const value of ["a", "====", "a===", "ZE==", "YQ==\n", "/w=="])
    assert.throws(() => decodeBase64(value));
  assert.throws(() => decodeURIComponent("%E0%A4%A"));
});

test("WebCrypto hashes known text, empty and binary file bytes", async () => {
  const { createHash } = await import("node:crypto");
  for (const algorithm of algorithms) {
    for (const input of [
      new Uint8Array(),
      new TextEncoder().encode("abc"),
      new Uint8Array([0, 255, 12, 42]),
    ]) {
      assert.equal(
        await hashBytes(input.buffer, algorithm),
        createHash(algorithm.toLowerCase().replace("-", ""))
          .update(input)
          .digest("hex"),
      );
    }
  }
});

test("Fluent presets generate the exact 23 valid slots and three export shapes", () => {
  // Fluent's browser ESM exports use extensionless imports; Node tests use its supported CJS entry.
  const {
    ThemeGenerator,
    themeRulesStandardCreator,
    BaseSlots,
    getColorFromString,
    isDark,
  } = createRequire(import.meta.url)("@fluentui/react");
  assert.equal(paletteSlots.length, 23);
  assert.equal(new Set(paletteSlots).size, 23);
  for (const preset of presets) {
    const rules = themeRulesStandardCreator();
    const dark = isDark(getColorFromString(preset.background));
    ThemeGenerator.insureSlots(rules, dark);
    for (const [slot, color] of [
      ["primaryColor", preset.primary],
      ["foregroundColor", preset.text],
      ["backgroundColor", preset.background],
    ]) {
      ThemeGenerator.setSlot(
        rules[BaseSlots[BaseSlots[slot]]],
        getColorFromString(color),
        dark,
        true,
        true,
      );
    }
    const palette = validatePalette(ThemeGenerator.getThemeAsJson(rules));
    assert.deepEqual(Object.keys(palette), [...paletteSlots]);
    assert.equal(palette.themePrimary, preset.primary);
    assert.deepEqual(JSON.parse(exportPalette(palette, "json", dark)), palette);
    assert.match(exportPalette(palette, "css", dark), /:root \{\n/);
    assert.match(
      exportPalette(palette, "css", dark),
      /--themePrimary: #[0-9a-f]{6};/,
    );
    assert.ok(
      exportPalette(palette, "powershell", dark).includes(
        `-IsInverted $${dark ? "true" : "false"}`,
      ),
    );
  }
  assert.equal(normalizeColor(" #AbC "), "#aabbcc");
  for (const value of ["red", "#12", "#zzzzzz", ""])
    assert.throws(() => normalizeColor(value), /hexadecimal/);
  assert.throws(() => validatePalette({}), /did not generate/);
});

test("HTML conversion respects options and omits active markup", () => {
  const html =
    '<h1>Title</h1><ul><li>One</li></ul><pre><code>const x = 1;</code></pre><script>throw new Error("never execute")</script><iframe src="https://invalid.example/"></iframe>';
  const atx = htmlToMarkdown(html, {
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
  });
  assert.match(atx, /^# Title/);
  assert.match(atx, /- {1,3}One/);
  assert.match(atx, /```/);
  assert.doesNotMatch(atx, /never execute|iframe/);
  const setext = htmlToMarkdown(html, {
    headingStyle: "setext",
    bulletListMarker: "+",
    codeBlockStyle: "indented",
  });
  assert.match(setext, /Title\n=====/);
  assert.match(setext, /\+ {1,3}One/);
  assert.doesNotMatch(setext, /```/);
});

test("PDF generates all paper/orientation variants, wraps titles and paginates", async () => {
  for (const orientation of ["p", "l"]) {
    for (const format of ["a4", "letter"]) {
      const blob = generatePdf({
        title: "Long title ".repeat(20),
        author: "Example author",
        content: "Body line\n".repeat(200),
        orientation,
        format,
      });
      assert.equal(blob.type, "application/pdf");
      const bytes = new TextDecoder().decode(await blob.arrayBuffer());
      assert.match(bytes, /^%PDF-/);
      assert.match(bytes, /\/Count [2-9]\d*/);
    }
  }
  assert.throws(
    () =>
      generatePdf({
        title: "",
        author: "",
        content: "text",
        orientation: "p",
        format: "a4",
      }),
    /title/,
  );
  assert.throws(
    () =>
      generatePdf({
        title: "Unicode 😀",
        author: "",
        content: "text",
        orientation: "p",
        format: "a4",
      }),
    /ASCII/,
  );
});

test("Image dimensions reject invalid or unsafe pixel values without imposing a size cap", () => {
  validateDimensions(1200, 800);
  validateDimensions(100000, 100000);
  for (const width of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])
    assert.throws(() => validateDimensions(width, 10), /positive whole/);
});
