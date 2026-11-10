import { jsPDF } from "jspdf";

export interface PdfOptions {
  title: string;
  author: string;
  content: string;
  orientation: "p" | "l";
  format: "a4" | "letter";
}

export function generatePdf(options: PdfOptions): Blob {
  if (!options.title.trim() || !options.content.trim())
    throw new Error("Enter a document title and body text.");
  if (
    /[^\t\n\r\u0020-\u007e]/.test(
      options.title + options.author + options.content,
    )
  )
    throw new Error(
      "This PDF font supports basic Latin (ASCII) text only. Replace unsupported characters before generating.",
    );
  const doc = new jsPDF({
    orientation: options.orientation,
    unit: "mm",
    format: options.format,
  });
  doc.setProperties({ title: options.title, author: options.author });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const margin = 20;
  let y = margin;
  function write(text: string, fontSize: number, bold: boolean) {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(fontSize);
    const lines: string[] = doc.splitTextToSize(
      text.replaceAll("\t", "    "),
      width - margin * 2,
    );
    const step = fontSize * 0.45 + 1;
    for (const line of lines) {
      if (y + step > height - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += step;
    }
    y += 4;
  }
  write(options.title, 22, true);
  write(
    `Generated: ${new Date().toLocaleDateString("en-US")} | Author: ${options.author}`,
    10,
    false,
  );
  write(options.content, 11, false);
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);
    doc.setFontSize(9);
    doc.text(`Page ${page} of ${pages}`, width / 2, height - 10, {
      align: "center",
    });
  }
  return doc.output("blob");
}
