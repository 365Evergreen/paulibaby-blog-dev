const digits = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

export interface SpeechAudio {
  blob: Blob;
  duration: number;
}

export type SpeechResponse =
  | { type: "progress"; message: string }
  | { type: "complete"; audio: SpeechAudio }
  | { type: "error"; message: string };

export function splitSpeechText(input: string): string[] {
  const text = input
    .normalize("NFKC")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\d/g, (digit) => ` ${digits[Number(digit)]} `)
    .replace(/\s+/g, " ")
    .trim();
  if (!text)
    throw new Error("Paste some English text before generating audio.");
  const supported = new Set(" ,.\"';!?():-/[]{}\u00e6\u00e9\u00ea\u0153\u0304");
  if (
    [...text].some(
      (character) => !/[a-zA-Z]/.test(character) && !supported.has(character),
    )
  ) {
    throw new Error(
      "This English voice cannot read some characters in your text. Spell out symbols and replace unsupported characters (such as emoji or non-Latin text).",
    );
  }
  if (!/[a-zA-Z]/.test(text))
    throw new Error("Include some English words, not only punctuation.");

  // Keep each model input well below SpeechT5's token limit, without dropping text.
  const chunks: string[] = [];
  let rest = text;
  while (rest.length > 160) {
    const window = rest.slice(0, 160);
    const sentenceEnd = Math.max(
      window.lastIndexOf(". "),
      window.lastIndexOf("! "),
      window.lastIndexOf("? "),
    );
    const wordEnd = window.lastIndexOf(" ");
    const end =
      sentenceEnd >= 40 ? sentenceEnd + 1 : wordEnd > 0 ? wordEnd : 160;
    chunks.push(rest.slice(0, end).trim());
    rest = rest.slice(end).trim();
  }
  if (rest) chunks.push(rest);
  return chunks;
}

export function readSpeakerEmbedding(buffer: ArrayBuffer): Float32Array {
  const bytes = new Uint8Array(buffer);
  const invalid = () =>
    new Error(
      "The local voice data is invalid. Reload the page and try again.",
    );
  if (
    bytes.length < 10 ||
    bytes[0] !== 0x93 ||
    new TextDecoder().decode(bytes.subarray(1, 6)) !== "NUMPY" ||
    bytes[6] !== 1 ||
    bytes[7] !== 0
  )
    throw invalid();
  const headerSize = new DataView(buffer).getUint16(8, true);
  const offset = 10 + headerSize;
  const header = new TextDecoder().decode(bytes.subarray(10, offset));
  if (
    !header.includes("'<f4'") ||
    !header.includes("(512,)") ||
    !header.includes("'fortran_order': False") ||
    offset + 512 * 4 !== bytes.length
  )
    throw invalid();
  const data = new DataView(buffer, offset);
  const vector = Float32Array.from({ length: 512 }, (_, index) =>
    data.getFloat32(index * 4, true),
  );
  if (!vector.every(Number.isFinite) || !vector.some((value) => value !== 0))
    throw invalid();
  return vector;
}

export function encodeSpeechWav(
  chunks: readonly Float32Array[],
  sampleRate = 16000,
): SpeechAudio {
  const count = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  if (!count || !Number.isSafeInteger(count) || count > (0xffffffff - 36) / 2)
    throw new Error(
      "The generated audio is empty or too large for a WAV file.",
    );
  if (
    !Number.isSafeInteger(sampleRate) ||
    sampleRate < 8000 ||
    sampleRate > 192000
  )
    throw new Error("The speech engine returned an invalid sample rate.");
  const buffer = new ArrayBuffer(44 + count * 2);
  const view = new DataView(buffer);
  const write = (offset: number, value: string) =>
    [...value].forEach((character, index) =>
      view.setUint8(offset + index, character.charCodeAt(0)),
    );
  write(0, "RIFF");
  view.setUint32(4, 36 + count * 2, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, count * 2, true);
  let offset = 44;
  let audible = false;
  for (const chunk of chunks) {
    for (const sample of chunk) {
      if (!Number.isFinite(sample))
        throw new Error(
          "The speech engine returned invalid audio. Try a shorter passage.",
        );
      const clipped = Math.min(1, Math.max(-1, sample));
      const pcm = Math.round(clipped * (clipped < 0 ? 32768 : 32767));
      audible ||= pcm !== 0;
      view.setInt16(offset, pcm, true);
      offset += 2;
    }
  }
  if (!audible)
    throw new Error(
      "The speech engine returned silence. Try a different passage.",
    );
  return {
    blob: new Blob([buffer], { type: "audio/wav" }),
    duration: count / sampleRate,
  };
}
