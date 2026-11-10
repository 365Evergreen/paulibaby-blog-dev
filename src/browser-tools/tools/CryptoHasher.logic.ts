export const algorithms = ["SHA-256", "SHA-384", "SHA-512", "SHA-1"] as const;
export type HashAlgorithm = (typeof algorithms)[number];

export async function hashBytes(
  bytes: ArrayBuffer,
  algorithm: HashAlgorithm,
): Promise<string> {
  if (!globalThis.crypto?.subtle)
    throw new Error(
      "WebCrypto is unavailable. Open this page using HTTPS or localhost.",
    );
  const digest = await crypto.subtle.digest(algorithm, bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 32768)
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 32768));
  return btoa(binary);
}

export function decodeBase64(text: string): string {
  if (
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
      text,
    )
  )
    throw new Error("Enter valid padded Base64 with no whitespace.");
  const binary = atob(text);
  if (btoa(binary) !== text)
    throw new Error("Base64 contains invalid padding bits.");
  return new TextDecoder("utf-8", { fatal: true }).decode(
    Uint8Array.from(binary, (character) => character.charCodeAt(0)),
  );
}
