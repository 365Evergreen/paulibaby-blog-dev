export const imageFormats = ["image/png", "image/jpeg", "image/webp"] as const;
export type ImageFormat = (typeof imageFormats)[number];

export function validateDimensions(width: number, height: number): void {
  if (
    !Number.isSafeInteger(width) ||
    !Number.isSafeInteger(height) ||
    width < 1 ||
    height < 1
  )
    throw new Error("Width and height must be positive whole pixel values.");
}

export function readImage(file: File): Promise<HTMLImageElement> {
  if (!file.type.startsWith("image/"))
    return Promise.reject(new Error("Select an image file."));
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      if (!image.naturalWidth || !image.naturalHeight)
        reject(new Error("This image has no valid dimensions."));
      else resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(
        new Error(
          "The image could not be decoded. Try a supported PNG, JPEG or WebP file.",
        ),
      );
    };
    image.src = url;
  });
}

export async function convertImage(
  image: HTMLImageElement,
  width: number,
  height: number,
  format: ImageFormat,
  quality: number,
): Promise<Blob> {
  validateDimensions(width, height);
  if (!Number.isFinite(quality) || quality < 10 || quality > 100)
    throw new Error("Quality must be between 10 and 100.");
  const canvas = document.createElement("canvas");
  try {
    canvas.width = width;
    canvas.height = height;
    if (canvas.width !== width || canvas.height !== height)
      throw new Error(
        "These dimensions exceed this browser's canvas capacity.",
      );
    const context = canvas.getContext("2d");
    if (!context)
      throw new Error(
        "Canvas 2D is unavailable or the image is too large for this browser.",
      );
    if (format === "image/jpeg") {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
    }
    context.drawImage(image, 0, 0, width, height);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result?.size)
            reject(
              new Error(
                "The browser could not encode this image. Try smaller dimensions.",
              ),
            );
          else if (result.type !== format)
            reject(
              new Error(
                `This browser does not support ${format} encoding. Choose another format.`,
              ),
            );
          else resolve(result);
        },
        format,
        format === "image/png" ? undefined : quality / 100,
      );
    });
    return blob;
  } finally {
    canvas.width = 0;
    canvas.height = 0;
  }
}
