import { useState } from "react";
import { ToolPanel, BlobPreview } from "../components/ToolPanel";
import { useToolOperation } from "../useToolOperation";
import { downloadBlob } from "../browserIO";
import { readImage, convertImage, imageFormats } from "./ImageConverter.logic";
import type { ImageFormat } from "./ImageConverter.logic";
import styles from "../BrowserTools.module.css";

export default function ImageConverter() {
  const [format, setFormat] = useState<ImageFormat>("image/webp");
  const [quality, setQuality] = useState(90);
  const [width, setWidth] = useState<string | null>(null);
  const [height, setHeight] = useState<string | null>(null);
  const [locked, setLocked] = useState(true);
  const source = useToolOperation<{ file: File; image: HTMLImageElement }>();
  const operation = useToolOperation<Blob>();
  const targetWidth = Number(width ?? source.result?.image.naturalWidth);
  const targetHeight = Number(height ?? source.result?.image.naturalHeight);
  function selectFile(file: File) {
    setWidth(null);
    setHeight(null);
    operation.clear();
    void source.run(
      async () => ({ file, image: await readImage(file) }),
      file.size,
      (value) => value.file.size,
    );
  }
  function resize(axis: "width" | "height", value: string) {
    if (axis === "width") setWidth(value);
    else setHeight(value);
    const image = source.result?.image;
    const pixels = Number(value);
    if (locked && image && Number.isFinite(pixels) && pixels > 0) {
      if (axis === "width")
        setHeight(
          String(
            Math.max(
              1,
              Math.round((pixels * image.naturalHeight) / image.naturalWidth),
            ),
          ),
        );
      else
        setWidth(
          String(
            Math.max(
              1,
              Math.round((pixels * image.naturalWidth) / image.naturalHeight),
            ),
          ),
        );
    }
    operation.clear();
  }
  return (
    <ToolPanel
      title="Image Converter & Resizer"
      description="Convert local images to PNG, JPEG or WebP using Canvas."
      error={source.error || operation.error}
      busy={source.busy || operation.busy}
      stats={operation.stats}
    >
      <p className={styles.note}>
        JPEG uses a white background for transparency. Animated images become a
        single raster frame; SVG is rasterized. Browser codec and canvas memory
        limits apply. No files are uploaded.
      </p>
      <div
        className={styles.dropzone}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const file = event.dataTransfer.files[0];
          if (file) selectFile(file);
        }}
      >
        <label>
          Choose an image, or drop it here
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) selectFile(file);
              event.target.value = "";
            }}
          />
        </label>
      </div>
      <div className={styles.toolbar}>
        <label>
          Output format
          <select
            value={format}
            onChange={(event) => {
              const next = imageFormats.find(
                (item) => item === event.target.value,
              );
              if (next) {
                setFormat(next);
                operation.clear();
              }
            }}
          >
            {imageFormats.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        {format !== "image/png" && (
          <label>
            Quality ({quality}%)
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(event) => {
                setQuality(Number(event.target.value));
                operation.clear();
              }}
            />
          </label>
        )}
        <label>
          Width (pixels)
          <input
            type="number"
            min="1"
            step="1"
            disabled={!source.result}
            value={
              width === ""
                ? ""
                : Number.isFinite(targetWidth)
                  ? targetWidth
                  : ""
            }
            onChange={(event) => resize("width", event.target.value)}
          />
        </label>
        <label>
          Height (pixels)
          <input
            type="number"
            min="1"
            step="1"
            disabled={!source.result}
            value={
              height === ""
                ? ""
                : Number.isFinite(targetHeight)
                  ? targetHeight
                  : ""
            }
            onChange={(event) => resize("height", event.target.value)}
          />
        </label>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={locked}
            onChange={(event) => {
              setLocked(event.target.checked);
              if (event.target.checked && source.result && targetWidth > 0)
                setHeight(
                  String(
                    Math.max(
                      1,
                      Math.round(
                        (targetWidth * source.result.image.naturalHeight) /
                          source.result.image.naturalWidth,
                      ),
                    ),
                  ),
                );
              operation.clear();
            }}
          />
          Lock aspect ratio
        </label>
        <button
          disabled={!source.result || source.busy || operation.busy}
          onClick={() => {
            if (source.result) {
              const { file, image } = source.result;
              void operation.run(
                () =>
                  convertImage(
                    image,
                    targetWidth,
                    targetHeight,
                    format,
                    quality,
                  ),
                file.size,
                (value) => value.size,
              );
            }
          }}
        >
          Convert image
        </button>
        <button
          onClick={() => {
            source.clear();
            operation.clear();
            setWidth(null);
            setHeight(null);
          }}
        >
          Clear image
        </button>
      </div>
      <div className={styles.grid}>
        <div className={styles.pane}>
          <h3>Source image</h3>
          {source.result ? (
            <>
              <p>
                {source.result.file.name} | {source.result.image.naturalWidth} x{" "}
                {source.result.image.naturalHeight} |{" "}
                {source.result.file.size.toLocaleString()} bytes
              </p>
              <BlobPreview
                blob={source.result.file}
                kind="image"
                label="Original image"
              />
            </>
          ) : (
            <p>Select a local image to begin.</p>
          )}
        </div>
        <div className={styles.pane}>
          <h3>Converted image</h3>
          {operation.result ? (
            <>
              <p>
                {targetWidth} x {targetHeight} |{" "}
                {operation.result.size.toLocaleString()} bytes
              </p>
              <BlobPreview
                blob={operation.result}
                kind="image"
                label="Converted image"
              />
              <button
                onClick={() => {
                  if (!operation.result) return;
                  const extension =
                    format === "image/jpeg" ? "jpg" : format.split("/")[1];
                  const name =
                    source.result?.file.name.replace(/\.[^.]+$/, "") || "image";
                  try {
                    downloadBlob(
                      operation.result,
                      `${name}-converted.${extension}`,
                    );
                  } catch {
                    operation.fail(
                      "Could not download. Check browser download permissions.",
                    );
                  }
                }}
              >
                Download image
              </button>
            </>
          ) : (
            <p>Convert the image to see the result.</p>
          )}
        </div>
      </div>
    </ToolPanel>
  );
}
