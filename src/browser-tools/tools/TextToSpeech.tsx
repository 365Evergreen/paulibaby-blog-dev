import { useCallback, useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { ToolPanel } from "../components/ToolPanel";
import { downloadBlob } from "../browserIO";
import { useToolOperation } from "../useToolOperation";
import { LocalSpeechSession } from "./TextToSpeech.client";
import type { SpeechAudio } from "./TextToSpeech.logic";
import styles from "../BrowserTools.module.css";

function AudioPreview({ blob }: { blob: Blob }) {
  const attach = useCallback(
    (node: HTMLAudioElement | null) => {
      if (!node) return;
      const url = URL.createObjectURL(blob);
      node.src = url;
      return () => {
        node.pause();
        node.removeAttribute("src");
        node.load();
        URL.revokeObjectURL(url);
      };
    },
    [blob],
  );
  return (
    <audio
      ref={attach}
      controls
      preload="metadata"
      aria-label="Generated speech preview"
      className={styles.audioPreview}
    />
  );
}

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState("");
  const [downloadError, setDownloadError] = useState("");
  const session = useRef<LocalSpeechSession | null>(null);
  const revision = useRef(0);
  const operation = useToolOperation<SpeechAudio>();
  useEffect(
    () => () => {
      revision.current++;
      session.current?.stop();
    },
    [],
  );

  function invalidate() {
    revision.current++;
    if (operation.busy) session.current?.stop();
    operation.clear();
    setProgress("");
    setDownloadError("");
  }

  function generate() {
    const current = ++revision.current;
    setProgress("Starting local speech engine...");
    setDownloadError("");
    void operation.run(
      async () => {
        session.current ??= new LocalSpeechSession();
        return session.current.generate(text, (message) => {
          if (current === revision.current) setProgress(message);
        });
      },
      new Blob([text]).size,
      (audio) => audio.blob.size,
    );
  }

  return (
    <ToolPanel
      title="Text to Speech"
      description="Paste English text, generate speech on your device, then preview or download a WAV file."
      {...operation}
    >
      <p className={styles.error} role="note">
        Experimental - not ready for dependable readings. The current local
        model can omit words. Compare the preview against your text before
        downloading; do not rely on it for a complete reading.
      </p>
      <p className={styles.notice} id="tts-privacy">
        Your text and audio stay in this browser. Generate audio downloads
        roughly 215 MB of SpeechT5 model/voice files from Hugging Face, plus the
        speech engine and WASM runtime from jsDelivr, on first use. These
        services receive download requests, not your text. Model files may be
        cached by your browser; no model is downloaded just by opening this
        page.
      </p>
      <p className={styles.note} id="tts-requirements">
        Requires a modern desktop browser with WebAssembly and enough free
        memory (allow at least 1 GB). Uses the CPU, not a cloud service or
        microphone. First load and generation can take minutes; mobile devices
        may run out of memory. This voice is English only, numbers are read
        digit by digit, and unsupported symbols must be spelled out. Longer text
        is split into short passages; review pronunciation before using the
        recording.
      </p>
      <div className={styles.grid}>
        <div className={styles.pane}>
          <label>
            Text to read
            <textarea
              value={text}
              onChange={(event) => {
                invalidate();
                setText(event.target.value);
              }}
              aria-describedby="tts-privacy tts-requirements"
              placeholder="Paste your English text here..."
            />
          </label>
          <p className={styles.note}>
            Voice: SpeechT5, US English (SLT). Output: mono 16 kHz WAV.
          </p>
          <div className={styles.actions}>
            <button
              disabled={operation.busy || !text.trim()}
              onClick={generate}
            >
              {operation.busy ? "Generating audio..." : "Generate audio"}
            </button>
            {operation.busy && (
              <button onClick={invalidate}>Cancel generation</button>
            )}
            <button
              disabled={!text && !operation.result && !operation.error}
              onClick={() => {
                invalidate();
                session.current?.stop();
                setText("");
              }}
            >
              Clear
            </button>
          </div>
          {operation.busy && <p role="status">{progress}</p>}
        </div>
        <div className={styles.pane}>
          <h3>Generated audio</h3>
          {operation.result ? (
            <>
              <p role="status">
                Audio ready: {operation.result.duration.toFixed(1)} seconds.
              </p>
              <AudioPreview blob={operation.result.blob} />
              <button
                onClick={() => {
                  if (!operation.result) return;
                  try {
                    downloadBlob(
                      operation.result.blob,
                      "browser-tools-speech.wav",
                    );
                    setDownloadError("");
                  } catch {
                    setDownloadError(
                      "Could not download the audio. Check browser download permissions.",
                    );
                  }
                }}
              >
                <Download size={16} aria-hidden="true" /> Download WAV
              </button>
              {downloadError && (
                <p className={styles.error} role="alert">
                  {downloadError}
                </p>
              )}
            </>
          ) : (
            <p>
              Generated speech will appear here. Editing text removes the
              previous audio and cancels any current generation.
            </p>
          )}
        </div>
      </div>
      <p className={styles.note}>
        Powered by{" "}
        <a href="https://huggingface.co/docs/transformers.js">
          Transformers.js
        </a>
        {" and "}
        <a href="https://huggingface.co/microsoft/speecht5_tts">
          Microsoft SpeechT5
        </a>
        .{" "}
        <a href="/browser-tools/tts/NOTICE.txt">
          Model, voice and runtime licenses
        </a>
        .
      </p>
    </ToolPanel>
  );
}
