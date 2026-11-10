/// <reference lib="webworker" />
import {
  encodeSpeechWav,
  readSpeakerEmbedding,
  splitSpeechText,
} from "./TextToSpeech.logic";
import type { SpeechResponse } from "./TextToSpeech.logic";

declare const self: DedicatedWorkerGlobalScope;
const scope = self;
function send(message: SpeechResponse) {
  scope.postMessage(message);
}

async function loadEngine() {
  // Loading the pinned browser distribution avoids bundling ORT's >25 MiB WASM
  // fallback into Workers static assets. Only fixed public assets are fetched.
  const runtimeUrl =
    "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.min.js";
  const {
    AutoTokenizer,
    SpeechT5ForTextToSpeech,
    SpeechT5HifiGan,
    Tensor,
    env,
  } = (await import(
    /* @vite-ignore */ runtimeUrl
  )) as typeof import("@huggingface/transformers");
  env.allowLocalModels = false;
  const wasm = env.backends.onnx.wasm;
  if (!wasm)
    throw new Error("The speech runtime does not support WebAssembly.");
  // Inference already runs in this worker; one thread needs no COOP/COEP headers.
  wasm.numThreads = 1;
  wasm.proxy = false;
  const progress = (event: {
    status: string;
    file?: string;
    progress?: number;
  }) => {
    if (event.status === "progress")
      send({
        type: "progress",
        message: `Downloading model: ${event.file ?? "model file"} (${Math.round(event.progress ?? 0)}%)`,
      });
  };
  const [tokenizer, model, vocoder, speaker] = await Promise.all([
    AutoTokenizer.from_pretrained("Xenova/speecht5_tts", {
      revision: "1723781b8ce2d02f0400c8337be04ae8ee3d6d56",
    }),
    SpeechT5ForTextToSpeech.from_pretrained("Xenova/speecht5_tts", {
      revision: "1723781b8ce2d02f0400c8337be04ae8ee3d6d56",
      dtype: "q8",
      device: "wasm",
      progress_callback: progress,
    }),
    SpeechT5HifiGan.from_pretrained("Xenova/speecht5_hifigan", {
      revision: "cf980c3610d7b7f20919960031066ef7905737bd",
      dtype: "fp32",
      device: "wasm",
      progress_callback: progress,
    }),
    fetch("/browser-tools/tts/speaker.npy", { credentials: "omit" }).then(
      async (response) => {
        if (!response.ok)
          throw new Error("Could not load the local voice data.");
        return new Tensor(
          "float32",
          readSpeakerEmbedding(await response.arrayBuffer()),
          [1, 512],
        );
      },
    ),
  ]);
  if (!(model instanceof SpeechT5ForTextToSpeech))
    throw new Error("The downloaded model is not a SpeechT5 speech generator.");
  return { tokenizer, model, vocoder, speaker };
}

let engine: ReturnType<typeof loadEngine> | undefined;
let running = false;
scope.onmessage = async (event: MessageEvent<{ text: string }>) => {
  if (running) {
    send({ type: "error", message: "Speech generation is already running." });
    return;
  }
  running = true;
  try {
    const chunks = splitSpeechText(event.data.text);
    send({
      type: "progress",
      message:
        "Loading local speech model and voice. First use can take several minutes...",
    });
    engine ??= loadEngine();
    const { tokenizer, model, vocoder, speaker } = await engine;
    const tokens = chunks.map(
      (chunk) => tokenizer(chunk, { truncation: false }).input_ids,
    );
    if (
      tokens.some(
        (ids) =>
          ids.dims[1] > 600 ||
          Array.from(ids.data).some(
            (id) => Number(id) === tokenizer.unk_token_id,
          ),
      )
    )
      throw new Error(
        "The model cannot read part of this text. Spell out symbols and try a shorter English passage.",
      );
    const audio: Float32Array[] = [];
    for (let index = 0; index < tokens.length; index++) {
      send({
        type: "progress",
        message: `Generating audio locally: passage ${index + 1} of ${tokens.length}...`,
      });
      const { waveform } = await model.generate_speech(tokens[index], speaker, {
        vocoder,
      });
      if (!waveform || !(waveform.data instanceof Float32Array))
        throw new Error("The local speech model did not return valid audio.");
      audio.push(waveform.data);
    }
    send({ type: "progress", message: "Preparing WAV download..." });
    send({ type: "complete", audio: encodeSpeechWav(audio) });
  } catch (reason) {
    send({
      type: "error",
      message: `Local speech generation failed. ${reason instanceof Error ? reason.message : "Check browser support, available memory and network access to the model downloads."}`,
    });
    // A failed download/session must be retryable, not a cached rejected promise.
    engine = undefined;
  } finally {
    running = false;
  }
};
