import { splitSpeechText } from "./TextToSpeech.logic.ts";
import type { SpeechAudio, SpeechResponse } from "./TextToSpeech.logic";

type SpeechWorker = Pick<
  Worker,
  "postMessage" | "terminate" | "addEventListener" | "removeEventListener"
>;

export class LocalSpeechSession {
  private worker: SpeechWorker | undefined;
  private pending: ((error: Error) => void) | undefined;
  private createWorker: () => SpeechWorker;

  constructor(
    createWorker: () => SpeechWorker = () =>
      new Worker(new URL("./TextToSpeech.worker.ts", import.meta.url), {
        type: "module",
      }),
  ) {
    this.createWorker = createWorker;
  }

  generate(
    text: string,
    onProgress: (message: string) => void,
  ): Promise<SpeechAudio> {
    if (this.pending)
      return Promise.reject(new Error("Speech generation is already running."));
    splitSpeechText(text);
    if (typeof WebAssembly === "undefined")
      throw new Error(
        "Local speech requires a browser with WebAssembly support.",
      );
    this.worker ??= this.createWorker();
    const worker = this.worker;
    return new Promise((resolve, reject) => {
      const cleanup = () => {
        worker.removeEventListener("message", message);
        worker.removeEventListener("error", failure);
        worker.removeEventListener("messageerror", failure);
        this.pending = undefined;
      };
      const fail = (error: Error) => {
        cleanup();
        worker.terminate();
        this.worker = undefined;
        reject(error);
      };
      const message = (event: MessageEvent<SpeechResponse>) => {
        const data = event.data;
        if (data.type === "progress") onProgress(data.message);
        if (data.type === "error") fail(new Error(data.message));
        if (data.type === "complete") {
          if (
            !(data.audio.blob instanceof Blob) ||
            data.audio.blob.type !== "audio/wav" ||
            data.audio.blob.size <= 44 ||
            !(data.audio.duration > 0)
          ) {
            fail(new Error("The speech worker returned invalid audio."));
            return;
          }
          cleanup();
          resolve(data.audio);
        }
      };
      const failure = () =>
        fail(
          new Error(
            "The local speech worker stopped. Check model download access, WebAssembly support and available memory, then try again.",
          ),
        );
      this.pending = fail;
      worker.addEventListener("message", message);
      worker.addEventListener("error", failure);
      worker.addEventListener("messageerror", failure);
      try {
        worker.postMessage({ text });
      } catch {
        fail(
          new Error(
            "Could not start the local speech worker. Reload the page and try again.",
          ),
        );
      }
    });
  }

  stop() {
    this.pending?.(new Error("Local speech generation cancelled."));
    this.worker?.terminate();
    this.worker = undefined;
  }
}
