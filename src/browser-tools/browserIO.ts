export async function copyText(text: string): Promise<void> {
  if (!navigator.clipboard?.writeText)
    throw new Error(
      "Clipboard is unavailable. Use HTTPS or localhost, or select and copy the output manually.",
    );
  await navigator.clipboard.writeText(text);
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  try {
    link.click();
  } finally {
    link.remove();
    // Let the browser consume the download before releasing its source.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

export function textBlob(text: string, type = "text/plain"): Blob {
  return new Blob([text], { type: `${type};charset=utf-8` });
}
