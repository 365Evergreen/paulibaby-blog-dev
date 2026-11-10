import type { JSONContent } from "@tiptap/core";
import { jsPDF } from "jspdf";

export interface PublicationSettings {
  title: string;
  author: string;
  format: "a4" | "a5" | "letter";
  orientation: "portrait" | "landscape";
  margin: number;
  columns: 1 | 2;
  font: "times" | "helvetica";
  fontSize: number;
  lineHeight: number;
  runningHeader: boolean;
  pageNumbers: boolean;
  cover: "none" | "editorial" | "minimal" | "report";
  coverSubtitle: string;
  coverKicker: string;
  includeContents: boolean;
  contentsDepth: 1 | 2 | 3;
}

export const defaultSettings: PublicationSettings = {
  title: "The Evergreen Review",
  author: "",
  format: "a4",
  orientation: "portrait",
  margin: 20,
  columns: 1,
  font: "times",
  fontSize: 11,
  lineHeight: 1.4,
  runningHeader: true,
  pageNumbers: true,
  cover: "none",
  coverSubtitle: "Stories, perspectives and ideas worth sharing.",
  coverKicker: "Edition 01",
  includeContents: false,
  contentsDepth: 2,
};

export const samplePublication: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", text: "Room for good ideas" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [{ type: "italic" }],
          text: "A small publication, designed with intention.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Every publication begins with something worth sharing. Use this space for a newsletter, a reading guide, an essay or a short journal. Your words remain selectable in the downloaded PDF.",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Make the page your own" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Choose your paper, adjust the margins and try a two-column layout. Text flows down the first column, into the next, then onto a new page. The downloadable PDF uses the same content and page settings.",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "Start with a clear hierarchy.",
                },
                { type: "text", text: " Use headings to guide the reader." },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Give your words room to breathe with generous margins and line spacing.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Insert a page break to begin a new section on a fresh page.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Good design makes space for the story." },
          ],
        },
      ],
    },
    { type: "pageBreak" },
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", text: "The next chapter" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This section starts with an intentional page break. Replace these words with your own, then download your finished publication. Everything is processed locally in your browser.",
        },
      ],
    },
  ],
};

interface Run {
  text: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

interface Block {
  runs: Run[];
  size: number;
  indent: number;
  align: "left" | "center" | "right";
  heading?: boolean;
  break?: boolean;
  rule?: boolean;
  level?: number;
  image?: { src: string; width: number };
  table?: { rows: TableCell[][]; style: "grid" | "striped" | "minimal" };
}

interface TableCell {
  runs: Run[];
  header: boolean;
  align: Block["align"];
  fill?: string;
}

export interface PublicationHeading {
  title: string;
  level: number;
  page: number;
}

export function cellTextColor(fill: string): string {
  if (!/^#[0-9a-f]{6}$/i.test(fill))
    throw new Error("Invalid cell background color.");
  const channels = [1, 3, 5].map((start) => {
    const value = Number.parseInt(fill.slice(start, start + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722 >
    0.179
    ? "#000000"
    : "#ffffff";
}

function headingTitle(block: Block) {
  return (
    block.runs
      .map((run) => run.text)
      .join("")
      .replaceAll("\n", " ")
      .trim() || "(Untitled heading)"
  );
}

function alignment(node: JSONContent): Block["align"] {
  const align = node.attrs?.textAlign ?? "left";
  if (!["left", "center", "right"].includes(align))
    throw new Error("Only left, center and right alignment are supported.");
  return align;
}

function assertText(text: string) {
  if (/[^\t\n\r\u0020-\u007e]/.test(text))
    throw new Error(
      "The publication fonts support basic Latin (ASCII) text only. Replace accented characters, smart quotes, emoji and other unsupported characters before exporting.",
    );
}

function inline(
  nodes: JSONContent[] = [],
  bold = false,
  italic = false,
): Run[] {
  return nodes.map((node) => {
    if (node.type === "hardBreak")
      return { text: "\n", bold, italic, underline: false };
    if (node.type !== "text")
      throw new Error(
        `Unsupported publication content: ${node.type ?? "unknown node"}.`,
      );
    const marks = node.marks ?? [];
    if (
      marks.some((mark) => !["bold", "italic", "underline"].includes(mark.type))
    )
      throw new Error(
        "Only bold, italic and underline text marks are supported in publications.",
      );
    const text = (node.text ?? "").replaceAll("\t", "    ");
    assertText(text);
    return {
      text,
      bold: bold || marks.some((mark) => mark.type === "bold"),
      italic: italic || marks.some((mark) => mark.type === "italic"),
      underline: marks.some((mark) => mark.type === "underline"),
    };
  });
}

function blocksFromDocument(document: JSONContent, size: number): Block[] {
  if (document.type !== "doc")
    throw new Error("The publication must contain a Tiptap document.");
  const blocks: Block[] = [];
  function visit(node: JSONContent, indent = 0, quote = false, prefix = "") {
    switch (node.type) {
      case "paragraph":
      case "heading": {
        const heading = node.type === "heading";
        const level = Number(node.attrs?.level ?? 1);
        if (heading && ![1, 2, 3].includes(level))
          throw new Error("Only heading levels 1 to 3 are supported.");
        const align = alignment(node);
        blocks.push({
          runs: [
            ...(prefix
              ? [{ text: prefix, bold: false, italic: quote, underline: false }]
              : []),
            ...inline(node.content, heading, quote),
          ],
          size: heading ? size * [2, 1.5, 1.2][level - 1] : size,
          indent,
          align,
          heading,
          level: heading ? level : undefined,
        });
        break;
      }
      case "bulletList":
      case "orderedList": {
        const start = node.attrs?.start ?? 1;
        if (!Number.isSafeInteger(start) || start < 1)
          throw new Error(
            "Ordered lists need a positive whole starting number.",
          );
        node.content?.forEach((item, index) => {
          if (item.type !== "listItem")
            throw new Error("Invalid publication list item.");
          item.content?.forEach((child, childIndex) =>
            visit(
              child,
              indent + 12,
              quote,
              childIndex === 0
                ? node.type === "orderedList"
                  ? `${start + index}. `
                  : "- "
                : "",
            ),
          );
        });
        break;
      }
      case "blockquote":
        node.content?.forEach((child) => visit(child, indent + 12, true));
        break;
      case "horizontalRule":
        blocks.push({ runs: [], size, indent, align: "left", rule: true });
        break;
      case "pageBreak":
        blocks.push({ runs: [], size, indent: 0, align: "left", break: true });
        break;
      case "image": {
        const src = node.attrs?.src;
        const width = node.attrs?.publicationWidth ?? 100;
        if (
          typeof src !== "string" ||
          !/^data:image\/(?:png|jpeg);base64,[A-Za-z0-9+/=\r\n]+$/.test(src)
        )
          throw new Error(
            "Images must be local PNG or JPEG files. Insert an image from your device; remote image URLs cannot be exported.",
          );
        if (![25, 50, 75, 100].includes(width))
          throw new Error(
            "Choose an image width of 25, 50, 75 or 100 percent.",
          );
        blocks.push({
          runs: [],
          size,
          indent,
          align: "center",
          image: { src, width },
        });
        break;
      }
      case "table": {
        const style = node.attrs?.publicationStyle ?? "grid";
        if (!["grid", "striped", "minimal"].includes(style))
          throw new Error("Choose a supported table style.");
        const rows = (node.content ?? []).map((row): TableCell[] => {
          if (row.type !== "tableRow") throw new Error("Invalid table row.");
          return (row.content ?? []).map((cell): TableCell => {
            if (!["tableHeader", "tableCell"].includes(cell.type ?? ""))
              throw new Error("Invalid table cell.");
            if (
              (cell.attrs?.colspan ?? 1) !== 1 ||
              (cell.attrs?.rowspan ?? 1) !== 1
            )
              throw new Error(
                "Merged table cells are not supported. Split the merged cells before exporting.",
              );
            const fill = cell.attrs?.backgroundColor;
            if (
              fill &&
              (typeof fill !== "string" || !/^#[0-9a-f]{6}$/i.test(fill))
            )
              throw new Error(
                "Table cell backgrounds must be six-digit hexadecimal colors.",
              );
            const runs: Run[] = [];
            (cell.content ?? []).forEach((paragraph, index) => {
              if (paragraph.type !== "paragraph")
                throw new Error(
                  "Table cells support paragraphs with inline formatting, not nested blocks.",
                );
              if (index)
                runs.push({
                  text: "\n",
                  bold: false,
                  italic: false,
                  underline: false,
                });
              runs.push(
                ...inline(
                  paragraph.content,
                  cell.type === "tableHeader",
                  quote,
                ),
              );
            });
            return {
              runs,
              header: cell.type === "tableHeader",
              fill,
              align: cell.content?.[0] ? alignment(cell.content[0]) : "left",
            };
          });
        });
        if (
          !rows.length ||
          !rows[0].length ||
          rows.some((row) => row.length !== rows[0].length)
        )
          throw new Error(
            "Tables must have a consistent, non-empty row and column structure.",
          );
        blocks.push({
          runs: [],
          size,
          indent,
          align: "left",
          table: { rows, style },
        });
        break;
      }
      default:
        throw new Error(
          `Unsupported publication content: ${node.type ?? "unknown node"}.`,
        );
    }
  }
  document.content?.forEach((node) => visit(node));
  return blocks;
}

function validateSettings(settings: PublicationSettings) {
  if (!settings.title.trim()) throw new Error("Enter a publication title.");
  assertText(
    settings.title +
      settings.author +
      (settings.cover !== "none"
        ? settings.coverSubtitle + settings.coverKicker
        : ""),
  );
  if (
    !["a4", "a5", "letter"].includes(settings.format) ||
    !["portrait", "landscape"].includes(settings.orientation) ||
    !["times", "helvetica"].includes(settings.font) ||
    ![1, 2].includes(settings.columns) ||
    !["none", "editorial", "minimal", "report"].includes(settings.cover) ||
    ![1, 2, 3].includes(settings.contentsDepth)
  )
    throw new Error(
      "Choose a supported paper, orientation, font and column count.",
    );
  for (const [label, value, min, max] of [
    ["Margin", settings.margin, 10, 30],
    ["Font size", settings.fontSize, 9, 16],
    ["Line spacing", settings.lineHeight, 1.1, 1.8],
  ] as const) {
    if (!Number.isFinite(value) || value < min || value > max)
      throw new Error(`${label} must be between ${min} and ${max}.`);
  }
}

function renderPublication(
  blocks: Block[],
  settings: PublicationSettings,
  contents?: PublicationHeading[],
) {
  const pdf = new jsPDF({
    unit: "pt",
    format: settings.format,
    orientation: settings.orientation,
  });
  pdf.setProperties({
    title: settings.title,
    author: settings.author,
    creator: "Evergreen Publication Designer",
  });
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  const margin = (settings.margin * 72) / 25.4;
  const gap = 18;
  const columnWidth =
    (width - margin * 2 - gap * (settings.columns - 1)) / settings.columns;
  const top = margin + (settings.runningHeader ? 20 : 0);
  const bottom = height - margin - (settings.pageNumbers ? 18 : 0);
  let column = 0;
  let y = top;
  const headings: PublicationHeading[] = [];

  function nextPage() {
    pdf.addPage();
    column = 0;
    y = top;
  }
  function nextColumn() {
    if (column + 1 < settings.columns) {
      column++;
      y = top;
    } else nextPage();
  }
  function setFont(run: Run, size: number) {
    pdf.setFont(
      settings.font,
      run.bold
        ? run.italic
          ? "bolditalic"
          : "bold"
        : run.italic
          ? "italic"
          : "normal",
    );
    pdf.setFontSize(size);
  }
  function measure(run: Run, size: number) {
    setFont(run, size);
    return pdf.getTextWidth(run.text);
  }
  function wrap(block: Block, available = columnWidth - block.indent): Run[][] {
    if (available < block.size * 3)
      throw new Error(
        "The text area is too narrow. Reduce nesting or table columns, margins or font size.",
      );
    const lines: Run[][] = [[]];
    let used = 0;
    const lineBreak = () => {
      lines.push([]);
      used = 0;
    };
    const append = (run: Run) => {
      const line = lines.at(-1)!;
      const last = line.at(-1);
      if (
        last &&
        last.bold === run.bold &&
        last.italic === run.italic &&
        last.underline === run.underline
      )
        last.text += run.text;
      else line.push({ ...run });
    };
    // Break only at word boundaries, except words longer than an entire column.
    for (const run of block.runs) {
      for (const token of run.text.split(/(\n| +)/).filter(Boolean)) {
        if (token === "\n") {
          lineBreak();
          continue;
        }
        const part = { ...run, text: token };
        const tokenWidth = measure(part, block.size);
        if (/^ +$/.test(token)) {
          if (used && used + tokenWidth <= available) {
            append(part);
            used += tokenWidth;
          }
          continue;
        }
        if (used + tokenWidth > available && used > 0) lineBreak();
        if (tokenWidth <= available) {
          append(part);
          used += tokenWidth;
        } else {
          for (const char of token) {
            const fragment = { ...run, text: char };
            const charWidth = measure(fragment, block.size);
            if (used + charWidth > available) lineBreak();
            append(fragment);
            used += charWidth;
          }
        }
      }
    }
    return lines;
  }

  function drawLine(
    line: Run[],
    size: number,
    x: number,
    baseline: number,
    available: number,
    align: Block["align"] = "left",
    color = "#1e2328",
  ) {
    const lineWidth = line.reduce((sum, run) => sum + measure(run, size), 0);
    if (align === "center") x += (available - lineWidth) / 2;
    if (align === "right") x += available - lineWidth;
    for (const run of line) {
      setFont(run, size);
      pdf.setTextColor(color);
      pdf.text(run.text, x, baseline);
      const runWidth = pdf.getTextWidth(run.text);
      if (run.underline) {
        pdf.setDrawColor(color);
        pdf.setLineWidth(0.5);
        pdf.line(x, baseline + 1.5, x + runWidth, baseline + 1.5);
      }
      x += runWidth;
    }
  }

  if (settings.cover !== "none") {
    const centered = settings.cover === "minimal";
    const usable = width - margin * 2;
    if (settings.cover === "report") {
      pdf.setFillColor(232, 239, 242);
      pdf.rect(margin, margin, usable, 42, "F");
    }
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(60, 75, 85);
    const kicker: string[] = pdf.splitTextToSize(settings.coverKicker, usable);
    if (kicker.length > 2)
      throw new Error("The cover edition label is too long. Shorten it.");
    pdf.text(
      kicker,
      centered ? width / 2 : margin + (settings.cover === "report" ? 12 : 0),
      margin + 24,
      { align: centered ? "center" : "left" },
    );
    y =
      settings.cover === "report"
        ? margin + 100
        : Math.max(margin + 75, height * 0.3);
    const coverText = (text: string, size: number, bold: boolean) => {
      const block: Block = {
        runs: [{ text, bold, italic: false, underline: false }],
        size,
        indent: 0,
        align: centered ? "center" : "left",
      };
      const lines = wrap(block, usable);
      const step = size * 1.25;
      if (y + lines.length * step > height - margin - 50)
        throw new Error(
          "The cover text is too long for this paper size. Shorten the title or subtitle, or use larger paper.",
        );
      for (const line of lines) {
        drawLine(line, size, margin, y + size, usable, block.align);
        y += step;
      }
      y += 14;
    };
    coverText(settings.title, 32, true);
    if (settings.coverSubtitle) coverText(settings.coverSubtitle, 14, false);
    if (settings.author) coverText(settings.author, 11, false);
    if (settings.cover === "editorial") {
      pdf.setDrawColor(100);
      pdf.line(margin, margin + 42, width - margin, margin + 42);
    }
    nextPage();
  }

  if (settings.includeContents) {
    const entries = blocks.filter(
      (block) => block.heading && block.level! <= settings.contentsDepth,
    );
    const drawContentsTitle = () => {
      pdf.setFont(settings.font, "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(30, 35, 40);
      pdf.text("Contents", margin, y + 22);
      y += 40;
    };
    drawContentsTitle();
    if (!entries.length) {
      pdf.setFont(settings.font, "normal");
      pdf.setFontSize(settings.fontSize);
      pdf.text(
        "Add headings to your document to populate this page.",
        margin,
        y + settings.fontSize,
      );
    }
    entries.forEach((block, index) => {
      const title = headingTitle(block);
      const indent = (block.level! - 1) * 12;
      const entry: Block = {
        runs: [
          {
            text: title,
            bold: block.level === 1,
            italic: false,
            underline: false,
          },
        ],
        size: settings.fontSize,
        indent,
        align: "left",
      };
      const available = width - margin * 2 - indent - 40;
      const lines = wrap(entry, available);
      const step = settings.fontSize * settings.lineHeight;
      const page = contents?.filter(
        (heading) => heading.level <= settings.contentsDepth,
      )[index]?.page;
      for (let line = 0; line < lines.length; line++) {
        if (y + step > bottom) {
          nextPage();
          drawContentsTitle();
        }
        drawLine(
          lines[line],
          settings.fontSize,
          margin + indent,
          y + settings.fontSize,
          available,
        );
        if (line === 0) {
          pdf.setFont(settings.font, "normal");
          pdf.setFontSize(settings.fontSize);
          pdf.text(
            page ? String(page) : "0",
            width - margin,
            y + settings.fontSize,
            { align: "right" },
          );
        }
        y += step;
      }
      y += 6;
    });
    nextPage();
  }

  for (const block of blocks) {
    if (block.break) {
      nextPage();
      continue;
    }
    const step = block.size * settings.lineHeight;
    if (block.image) {
      try {
        const image = pdf.getImageProperties(block.image.src);
        if (!image.width || !image.height)
          throw new Error("Image has no dimensions.");
        let imageWidth =
          ((columnWidth - block.indent) * block.image.width) / 100;
        let imageHeight = (imageWidth * image.height) / image.width;
        if (imageHeight > bottom - top) {
          imageWidth *= (bottom - top) / imageHeight;
          imageHeight = bottom - top;
        }
        if (y + imageHeight > bottom) nextColumn();
        const x =
          margin +
          column * (columnWidth + gap) +
          block.indent +
          (columnWidth - block.indent - imageWidth) / 2;
        pdf.addImage(
          block.image.src,
          image.fileType,
          x,
          y,
          imageWidth,
          imageHeight,
        );
        y += imageHeight + settings.fontSize * 0.6;
      } catch (error) {
        throw new Error(
          `Could not export an image. Reinsert a valid PNG or JPEG file. ${error instanceof Error ? error.message : ""}`,
          { cause: error },
        );
      }
      continue;
    }
    if (block.table) {
      const table = block.table;
      const cellWidth = (columnWidth - block.indent) / table.rows[0].length;
      const padding = 5;
      const rowLines = table.rows.map((row) =>
        row.map((cell) =>
          wrap({ ...block, runs: cell.runs }, cellWidth - padding * 2),
        ),
      );
      const rowHeights = rowLines.map(
        (cells) =>
          Math.max(...cells.map((lines) => lines.length)) * step + padding * 2,
      );
      const header = table.rows[0].every((cell) => cell.header);
      const drawRow = (index: number) => {
        const row = table.rows[index];
        row.forEach((cell, cellIndex) => {
          const x =
            margin +
            column * (columnWidth + gap) +
            block.indent +
            cellIndex * cellWidth;
          const fill =
            cell.fill ??
            (cell.header
              ? "#e8eff2"
              : table.style === "striped" && index % 2 === 0
                ? "#f2f5f6"
                : "#ffffff");
          pdf.setFillColor(fill);
          pdf.setDrawColor(165, 175, 180);
          pdf.setLineWidth(0.4);
          pdf.rect(
            x,
            y,
            cellWidth,
            rowHeights[index],
            table.style === "grid" ? "FD" : "F",
          );
          if (table.style !== "grid")
            pdf.line(
              x,
              y + rowHeights[index],
              x + cellWidth,
              y + rowHeights[index],
            );
          rowLines[index][cellIndex].forEach((line, lineIndex) =>
            drawLine(
              line,
              block.size,
              x + padding,
              y + padding + block.size + lineIndex * step,
              cellWidth - padding * 2,
              cell.align,
              cellTextColor(fill),
            ),
          );
        });
        y += rowHeights[index];
      };
      for (let row = 0; row < table.rows.length; row++) {
        const repeatedHeader = header && row > 0 ? rowHeights[0] : 0;
        if (rowHeights[row] + repeatedHeader > bottom - top)
          throw new Error(
            "A table row is taller than a printable column. Shorten the cell text, reduce the font size or choose larger paper.",
          );
        if (
          y + rowHeights[row] > bottom ||
          (row === 0 &&
            header &&
            rowHeights[1] &&
            y + rowHeights[0] + rowHeights[1] > bottom)
        ) {
          nextColumn();
          if (header && row > 0) drawRow(0);
        }
        drawRow(row);
      }
      y += settings.fontSize * 0.6;
      continue;
    }
    if (block.rule) {
      if (y + step > bottom) nextColumn();
      const x = margin + column * (columnWidth + gap) + block.indent;
      pdf.setDrawColor(100);
      pdf.setLineWidth(0.5);
      pdf.line(
        x,
        y + step / 2,
        margin + column * (columnWidth + gap) + columnWidth,
        y + step / 2,
      );
      y += step;
      continue;
    }
    const lines = wrap(block);
    // Keep headings with at least one following body line when space permits.
    const required = block.heading
      ? lines.length * step + settings.fontSize * settings.lineHeight
      : step;
    if (y > top && y + Math.min(required, bottom - top) > bottom) nextColumn();
    let headingRecorded = false;
    for (const line of lines) {
      if (y + step > bottom) nextColumn();
      if (block.heading && !headingRecorded) {
        headings.push({
          title: headingTitle(block),
          level: block.level!,
          page: pdf.getNumberOfPages(),
        });
        headingRecorded = true;
      }
      drawLine(
        line,
        block.size,
        margin + column * (columnWidth + gap) + block.indent,
        y + block.size,
        columnWidth - block.indent,
        block.align,
      );
      y += step;
    }
    y += settings.fontSize * 0.6;
  }
  const pages = pdf.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    pdf.setPage(page);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(90);
    if (settings.runningHeader && !(settings.cover !== "none" && page === 1)) {
      const titleLines: string[] = pdf.splitTextToSize(
        settings.title,
        width - margin * 2,
      );
      if (titleLines.length > 1)
        throw new Error(
          "The running header is too long. Shorten the title or turn off the running header.",
        );
      pdf.text(settings.title, margin, margin + 7);
    }
    if (settings.pageNumbers && !(settings.cover !== "none" && page === 1))
      pdf.text(`${page} / ${pages}`, width / 2, height - margin, {
        align: "center",
      });
  }
  return { pdf, pages, headings };
}

export function generatePublication(
  document: JSONContent,
  settings: PublicationSettings,
) {
  validateSettings(settings);
  const blocks = blocksFromDocument(document, settings.fontSize);
  const first = renderPublication(blocks, settings);
  // The number gutter has fixed width, so inserting final page numbers cannot reflow the contents.
  const result = settings.includeContents
    ? renderPublication(blocks, settings, first.headings)
    : first;
  if (
    result.headings.some(
      (heading, index) => heading.page !== first.headings[index]?.page,
    )
  )
    throw new Error(
      "Contents pagination changed unexpectedly. Adjust the layout and try again.",
    );
  return {
    blob: result.pdf.output("blob"),
    pages: result.pages,
    headings: result.headings,
  };
}
