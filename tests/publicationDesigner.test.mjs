import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  defaultSettings,
  generatePublication,
  samplePublication,
  cellTextColor,
} from "../src/browser-tools/tools/PublicationDesigner.logic.ts";
import {
  publicationTemplates,
  filterPublicationTemplates,
} from "../src/browser-tools/publisher/publicationTemplates.ts";

test("publisher templates are distinct, editable copies and produce real PDFs", async () => {
  assert.equal(new Set(publicationTemplates.map(({ id }) => id)).size, 6);
  for (const template of publicationTemplates) {
    const copy = structuredClone(template);
    copy.settings.title = "An edited publication";
    copy.content.content.push({
      type: "paragraph",
      content: [{ type: "text", text: "My additional content." }],
    });
    assert.notEqual(template.settings.title, copy.settings.title);
    assert.equal(
      copy.content.content.length,
      template.content.content.length + 1,
    );
    const result = generatePublication(copy.content, copy.settings);
    assert.ok(result.pages >= 1);
    assert.match(await pdfText(result), /\(My additional content\.\) Tj/);
  }
});

test("publisher template search and categories filter together without including blank", () => {
  assert.equal(filterPublicationTemplates("").length, 5);
  assert.deepEqual(
    filterPublicationTemplates("  REPORT  ", "Reports").map(({ id }) => id),
    ["report"],
  );
  assert.equal(filterPublicationTemplates("report", "Guides").length, 0);
  assert.equal(filterPublicationTemplates("no such template").length, 0);
});

const paragraph = (text) => ({
  type: "paragraph",
  content: [{ type: "text", text }],
});
const document = (...content) => ({ type: "doc", content });
const pdfText = async (result) =>
  new TextDecoder().decode(await result.blob.arrayBuffer());
const streamsFrom = (pdf) =>
  [...pdf.matchAll(/stream\n([\s\S]*?)endstream/g)].map((match) => match[1]);

test("sample produces a real two-page PDF with selectable styled text and metadata", async () => {
  const result = generatePublication(samplePublication, {
    ...defaultSettings,
    author: "Test author",
  });
  assert.equal(result.pages, 2);
  assert.equal(result.blob.type, "application/pdf");
  const pdf = await pdfText(result);
  assert.match(pdf, /^%PDF-/);
  assert.match(pdf, /\/Title \(The Evergreen Review\)/);
  assert.match(pdf, /\/Author \(Test author\)/);
  assert.match(pdf, /\(Room for good ideas\) Tj/);
  assert.match(pdf, /\(The next chapter\) Tj/);
  assert.match(pdf, /\/BaseFont \/Times-Bold/);
  assert.match(pdf, /\/BaseFont \/Times-Italic/);
  assert.match(pdf, /\/Count 2\b/);
  assert.doesNotMatch(pdf, /\/Subtype \/Image/);
});

test("paper dimensions, orientation, font family, running header and page numbers are honored", async () => {
  const dimensions = {
    a4: [595.28, 841.89],
    a5: [419.53, 595.28],
    letter: [612, 792],
  };
  for (const format of ["a4", "a5", "letter"]) {
    for (const orientation of ["portrait", "landscape"]) {
      for (const columns of [1, 2]) {
        const result = generatePublication(
          document(paragraph("Selectable body text.")),
          {
            ...defaultSettings,
            format,
            orientation,
            columns,
            font: "helvetica",
            title: "Test running title",
          },
        );
        const pdf = await pdfText(result);
        const mediaBox = pdf.match(/\/MediaBox \[0 0 ([\d.]+) ([\d.]+)\]/);
        assert.ok(mediaBox);
        const [width, height] =
          orientation === "portrait"
            ? dimensions[format]
            : [...dimensions[format]].reverse();
        assert.ok(Math.abs(Number(mediaBox[1]) - width) < 0.02);
        assert.ok(Math.abs(Number(mediaBox[2]) - height) < 0.02);
        assert.equal(result.pages, 1);
        assert.match(pdf, /\(Test running title\) Tj/);
        assert.match(pdf, /\(1 \/ 1\) Tj/);
        assert.match(pdf, /\/BaseFont \/Helvetica/);
      }
    }
  }
  const plain = await pdfText(
    generatePublication(document(paragraph("Body")), {
      ...defaultSettings,
      title: "Hidden running title",
      runningHeader: false,
      pageNumbers: false,
    }),
  );
  assert.doesNotMatch(plain, /\(Hidden running title\) Tj|\(1 \/ 1\) Tj/);
});

test("overflow paginates without truncating, and columns use both sides of each page", async () => {
  const source = document(
    ...Array.from({ length: 180 }, (_, i) => paragraph(`Unique line ${i}`)),
  );
  const one = generatePublication(source, defaultSettings);
  const two = generatePublication(source, { ...defaultSettings, columns: 2 });
  assert.ok(two.pages > 1);
  assert.ok(one.pages > two.pages);
  const pdf = await pdfText(two);
  for (let i = 0; i < 180; i++)
    assert.match(pdf, new RegExp(`\\(Unique line ${i}\\) Tj`));
  const positions = [
    ...pdf.matchAll(/([\d.]+) ([\d.]+) Td\n\(Unique line /g),
  ].map((match) => Number(match[1]));
  assert.ok(positions.some((x) => x < 100));
  assert.ok(positions.some((x) => x > 300));
  const larger = generatePublication(source, {
    ...defaultSettings,
    fontSize: 16,
    margin: 30,
    lineHeight: 1.8,
  });
  assert.ok(larger.pages > one.pages);
});

test("page breaks start physical pages even with two columns, and consecutive breaks retain blank pages", async () => {
  const source = document(
    paragraph("First"),
    { type: "pageBreak" },
    { type: "pageBreak" },
    paragraph("Third"),
  );
  const result = generatePublication(source, {
    ...defaultSettings,
    columns: 2,
  });
  assert.equal(result.pages, 3);
  const pdf = await pdfText(result);
  const streams = [...pdf.matchAll(/stream\n([\s\S]*?)endstream/g)].map(
    (match) => match[1],
  );
  assert.match(streams[0], /\(First\) Tj/);
  assert.doesNotMatch(streams[1], /\(First\) Tj|\(Third\) Tj/);
  assert.match(streams[2], /\(Third\) Tj/);
});

test("rich text, nested lists, hard breaks, quotes, dividers and alignment export", async () => {
  const source = document(
    {
      type: "heading",
      attrs: { level: 2, textAlign: "center" },
      content: [{ type: "text", text: "Centered" }],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "right" },
      content: [
        {
          type: "text",
          text: "BoldItalic",
          marks: [{ type: "bold" }, { type: "italic" }],
        },
        { type: "hardBreak" },
        { type: "text", text: "Underline", marks: [{ type: "underline" }] },
      ],
    },
    {
      type: "orderedList",
      attrs: { start: 5 },
      content: [
        {
          type: "listItem",
          content: [
            paragraph("Fifth item"),
            {
              type: "bulletList",
              content: [
                { type: "listItem", content: [paragraph("Nested item")] },
              ],
            },
          ],
        },
      ],
    },
    { type: "blockquote", content: [paragraph("A quotation")] },
    { type: "horizontalRule" },
    paragraph("x".repeat(500)),
  );
  const result = generatePublication(source, defaultSettings);
  const pdf = await pdfText(result);
  assert.match(pdf, /\/BaseFont \/Times-BoldItalic/);
  assert.match(pdf, /\(5. Fifth item\) Tj/);
  assert.match(pdf, /\(- Nested item\) Tj/);
  assert.match(pdf, /\(Underline\) Tj/);
  assert.match(pdf, /\([\s\S]*?quotation[\s\S]*?\) Tj/);
  assert.equal(
    [...pdf.matchAll(/\((x+)\) Tj/g)].reduce(
      (sum, match) => sum + match[1].length,
      0,
    ),
    500,
  );
  assert.match(pdf, / m\n[\d.]+ [\d.]+ l\nS/);
});

test("invalid layout, Unicode and unsupported content fail explicitly", () => {
  const source = document(paragraph("Text"));
  for (const next of [
    { title: "" },
    { title: "Caf\u00e9" },
    { author: "\u4e2d" },
    { margin: 0 },
    { margin: NaN },
    { margin: 31 },
    { fontSize: 8 },
    { fontSize: Infinity },
    { lineHeight: 2 },
    { format: "a3" },
    { orientation: "diagonal" },
    { columns: 3 },
    { font: "unknown" },
  ])
    assert.throws(() =>
      generatePublication(source, { ...defaultSettings, ...next }),
    );
  for (const text of [
    "Emoji \ud83d\ude00",
    "Smart \u201cquotes\u201d",
    "Em\u2014dash",
    "Caf\u00e9",
  ]) {
    assert.throws(
      () => generatePublication(document(paragraph(text)), defaultSettings),
      /ASCII/,
    );
  }
  for (const node of [
    { type: "image", attrs: { src: "https://example.invalid/image.jpg" } },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "link",
          marks: [{ type: "link", attrs: { href: "https://example.invalid" } }],
        },
      ],
    },
    { type: "heading", attrs: { level: 4 } },
    { type: "paragraph", attrs: { textAlign: "justify" } },
    { type: "orderedList", attrs: { start: -1 } },
  ])
    assert.throws(() => generatePublication(document(node), defaultSettings));
  assert.throws(
    () => generatePublication({ type: "invalid" }, defaultSettings),
    /Tiptap document/,
  );
  assert.throws(
    () =>
      generatePublication(source, {
        ...defaultSettings,
        title: "Very long title ".repeat(100),
      }),
    /header is too long/,
  );
});

test("cover templates preserve all body content, editable fields and physical page numbering", async () => {
  for (const cover of ["editorial", "minimal", "report"]) {
    const result = generatePublication(samplePublication, {
      ...defaultSettings,
      cover,
      coverSubtitle: "Editable subtitle",
      coverKicker: "Issue 12",
      author: "Editor",
    });
    assert.equal(result.pages, 3);
    const pages = streamsFrom(await pdfText(result));
    assert.match(pages[0], /\(The Evergreen Review\) Tj/);
    assert.match(pages[0], /\(Editable subtitle\) Tj/);
    assert.match(pages[0], /\(Issue 12\) Tj/);
    assert.match(pages[0], /\(Editor\) Tj/);
    assert.match(pages[1], /\(Room for good ideas\) Tj/);
    assert.match(pages[2], /\(The next chapter\) Tj/);
    assert.match(pages[1], /\(2 \/ 3\) Tj/);
    assert.doesNotMatch(pages[0], /\(1 \/ 3\) Tj/);
  }
});

test("generated contents targets actual heading pages across covers, multiple contents pages and layouts", async () => {
  const source = document(
    ...Array.from({ length: 32 }, (_, index) => [
      {
        type: "heading",
        attrs: { level: (index % 3) + 1 },
        content: [
          { type: "text", text: `Chapter ${String(index).padStart(2, "0")}` },
        ],
      },
      paragraph("Body content for this section."),
      { type: "pageBreak" },
    ]).flat(),
  );
  for (const columns of [1, 2]) {
    const result = generatePublication(source, {
      ...defaultSettings,
      format: "a5",
      orientation: "landscape",
      fontSize: 16,
      cover: "minimal",
      includeContents: true,
      contentsDepth: 3,
      columns,
    });
    const streams = streamsFrom(await pdfText(result));
    assert.equal(result.headings.length, 32);
    assert.ok(
      result.headings[0].page > 3,
      "contents should span multiple pages",
    );
    const contents = streams.slice(1, result.headings[0].page - 1).join("\n");
    for (const heading of result.headings) {
      assert.match(
        streams[heading.page - 1],
        new RegExp(`\\(${heading.title}\\) Tj`),
      );
      const entry = contents.match(
        new RegExp(`\\(${heading.title}\\) Tj[\\s\\S]*?\\((\\d+)\\) Tj`),
      );
      assert.ok(entry, heading.title);
      assert.equal(Number(entry[1]), heading.page, heading.title);
    }
  }
  const filtered = generatePublication(source, {
    ...defaultSettings,
    includeContents: true,
    contentsDepth: 1,
  });
  const filteredToc = streamsFrom(await pdfText(filtered))[0];
  assert.match(filteredToc, /\(Chapter 00\) Tj/);
  assert.doesNotMatch(filteredToc, /\(Chapter 01\) Tj/);
});

test("formatted tables paginate by intact rows and repeat header rows without losing body cells", async () => {
  assert.equal(cellTextColor("#000000"), "#ffffff");
  assert.equal(cellTextColor("#ffffff"), "#000000");
  const cell = (text, header = false, extra = {}) => ({
    type: header ? "tableHeader" : "tableCell",
    attrs: extra,
    content: [paragraph(text)],
  });
  for (const publicationStyle of ["grid", "striped", "minimal"]) {
    const table = {
      type: "table",
      attrs: { publicationStyle },
      content: [
        {
          type: "tableRow",
          content: [cell("Label", true), cell("Value", true)],
        },
        ...Array.from({ length: 80 }, (_, i) => ({
          type: "tableRow",
          content: [
            cell(`Record${i}`, false, {
              backgroundColor: i === 0 ? "#dce9f0" : null,
            }),
            cell(`Value${i}`),
          ],
        })),
      ],
    };
    const result = generatePublication(document(table), defaultSettings);
    assert.ok(result.pages >= 3);
    const pdf = await pdfText(result);
    const pages = streamsFrom(pdf);
    for (let i = 0; i < 80; i++) {
      assert.equal(
        (pdf.match(new RegExp(`\\(Record${i}\\) Tj`, "g")) ?? []).length,
        1,
      );
      assert.ok(
        pages.some(
          (page) =>
            page.includes(`(Record${i}) Tj`) && page.includes(`(Value${i}) Tj`),
        ),
      );
    }
    for (const page of pages) assert.match(page, /\(Label\) Tj/);
  }
  const merged = {
    type: "table",
    content: [
      { type: "tableRow", content: [cell("Merged", false, { colspan: 2 })] },
    ],
  };
  assert.throws(
    () => generatePublication(document(merged), defaultSettings),
    /Merged table cells/,
  );
  const tall = {
    type: "table",
    content: [{ type: "tableRow", content: [cell("Huge cell ".repeat(2000))] }],
  };
  assert.throws(
    () => generatePublication(document(tall), defaultSettings),
    /taller than a printable column/,
  );
});

test("local PNG images are embedded proportionally and corrupt or remote images fail explicitly", async () => {
  const src = `data:image/png;base64,${readFileSync(new URL("../public/logo.png", import.meta.url)).toString("base64")}`;
  const result = generatePublication(
    document(
      paragraph("Before image"),
      { type: "image", attrs: { src, publicationWidth: 50 } },
      paragraph("After image"),
    ),
    defaultSettings,
  );
  const pdf = await pdfText(result);
  assert.match(pdf, /\/Subtype \/Image/);
  assert.match(pdf, /\(Before image\) Tj/);
  assert.match(pdf, /\(After image\) Tj/);
  assert.throws(
    () =>
      generatePublication(
        document({
          type: "image",
          attrs: { src: "data:image/png;base64,AAAA" },
        }),
        defaultSettings,
      ),
    /Could not export an image/,
  );
  assert.throws(
    () =>
      generatePublication(
        document({
          type: "image",
          attrs: { src: "https://example.invalid/photo.png" },
        }),
        defaultSettings,
      ),
    /local PNG or JPEG/,
  );
});
