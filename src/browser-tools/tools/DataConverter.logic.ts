export type Delimiter = "," | "\t" | ";";

export function parseCsv(input: string, delimiter: Delimiter): string[][] {
  const source = input.replace(/^\uFEFF/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  let closed = false;
  for (let index = 0; index < source.length; index++) {
    const character = source[index];
    if (quoted) {
      if (character === '"') {
        if (source[index + 1] === '"') {
          field += '"';
          index++;
        } else {
          quoted = false;
          closed = true;
        }
      } else field += character;
    } else if (character === delimiter) {
      row.push(field);
      field = "";
      closed = false;
    } else if (character === "\r" || character === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      closed = false;
      if (character === "\r" && source[index + 1] === "\n") index++;
    } else if (character === '"' && !field && !closed) {
      quoted = true;
    } else {
      if (closed || character === '"')
        throw new Error(
          "Malformed CSV: unexpected text or quote outside a quoted field.",
        );
      field += character;
    }
  }
  if (quoted) throw new Error("Malformed CSV: a quoted field was not closed.");
  if (field || row.length || closed) {
    row.push(field);
    rows.push(row);
  }
  while (
    rows.length &&
    rows[rows.length - 1].length === 1 &&
    rows[rows.length - 1][0] === ""
  )
    rows.pop();
  return rows;
}

function infer(value: string): string | number | boolean {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed && Number.isFinite(Number(trimmed))) return Number(trimmed);
  return value;
}

export function csvToJson(input: string, delimiter: Delimiter): string {
  const [headers, ...rows] = parseCsv(input, delimiter);
  if (!headers || !rows.length)
    throw new Error("CSV must contain a header and at least one data row.");
  if (
    headers.some((header) => !header.trim()) ||
    new Set(headers).size !== headers.length
  )
    throw new Error("CSV headers must be non-empty and unique.");
  return JSON.stringify(
    rows.map((values, index) => {
      if (values.length !== headers.length)
        throw new Error(
          `CSV record ${index + 2} has ${values.length} fields; expected ${headers.length}.`,
        );
      return Object.fromEntries(
        headers.map((header, column) => [header, infer(values[column])]),
      );
    }),
    null,
    2,
  );
}

export function jsonToCsv(input: string, delimiter: Delimiter): string {
  const value: unknown = JSON.parse(input);
  if (
    !Array.isArray(value) ||
    !value.length ||
    !value.every(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null && !Array.isArray(item),
    )
  ) {
    throw new Error("JSON must be a non-empty array of non-null objects.");
  }
  const headers = [...new Set(value.flatMap((item) => Object.keys(item)))];
  if (!headers.length || headers.some((header) => !header.trim()))
    throw new Error("JSON objects need non-empty column names.");
  const quote = (text: string) =>
    text.includes(delimiter) || /["\r\n]/.test(text)
      ? `"${text.replaceAll('"', '""')}"`
      : text;
  const rows = value.map((item) =>
    headers
      .map((header) => {
        const cell = item[header] ?? "";
        return quote(
          typeof cell === "object" ? JSON.stringify(cell) : String(cell),
        );
      })
      .join(delimiter),
  );
  return [headers.map(quote).join(delimiter), ...rows].join("\r\n");
}
