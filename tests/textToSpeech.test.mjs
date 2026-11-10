import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  splitSpeechText,
  readSpeakerEmbedding,
  encodeSpeechWav,
} from "../src/browser-tools/tools/TextToSpeech.logic.ts";
import { LocalSpeechSession } from "../src/browser-tools/tools/TextToSpeech.client.ts";

test("speech chunks preserve long passages and words without truncating model input", () => {
  const text = "This is an English passage. ".repeat(100) + "z".repeat(501);
  const chunks = splitSpeechText(text);
  assert.ok(chunks.length > 10);
  assert.ok(chunks.every((chunk) => chunk.length > 0 && chunk.length <= 160));
  assert.equal(chunks.join("").replaceAll(" ", ""), text.replaceAll(" ", ""));
  assert.deepEqual(splitSpeechText("“Hello,”\n it’s 12."), [
    '"Hello," it\'s one two .',
  ]);
  assert.throws(() => splitSpeechText(" \n "), /Paste some/);
  assert.throws(() => splitSpeechText("Hello 😀"), /cannot read/);
  assert.throws(() => splitSpeechText("日本語"), /cannot read/);
  assert.throws(() => splitSpeechText("!?!"), /English words/);
});

test("bundled MIT voice is a valid finite 512-element little-endian embedding", async () => {
  const bytes = await readFile(
    new URL("../public/browser-tools/tts/speaker.npy", import.meta.url),
  );
  const buffer = bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  );
  const embedding = readSpeakerEmbedding(buffer);
  assert.equal(embedding.length, 512);
  assert.ok(embedding.every(Number.isFinite));
  assert.ok(embedding.some((value) => value !== 0));
  assert.throws(
    () => readSpeakerEmbedding(new ArrayBuffer(4)),
    /voice data is invalid/,
  );
  assert.throws(
    () => readSpeakerEmbedding(buffer.slice(0, -4)),
    /voice data is invalid/,
  );
  const corrupted = buffer.slice(0);
  new Uint8Array(corrupted)[0] = 0;
  assert.throws(() => readSpeakerEmbedding(corrupted), /voice data is invalid/);
});

test("speech WAV is actual PCM16 with correct RIFF sizes, sample rate, duration and clipping", async () => {
  const result = encodeSpeechWav([
    new Float32Array([-2, -1, 0]),
    new Float32Array([0.5, 1, 2]),
  ]);
  assert.equal(result.blob.type, "audio/wav");
  assert.equal(result.blob.size, 44 + 12);
  assert.equal(result.duration, 6 / 16000);
  const buffer = await result.blob.arrayBuffer();
  const view = new DataView(buffer);
  const stringAt = (offset, length) =>
    new TextDecoder().decode(new Uint8Array(buffer, offset, length));
  assert.equal(stringAt(0, 4), "RIFF");
  assert.equal(stringAt(8, 4), "WAVE");
  assert.equal(stringAt(12, 4), "fmt ");
  assert.equal(stringAt(36, 4), "data");
  assert.equal(view.getUint32(4, true), result.blob.size - 8);
  assert.equal(view.getUint32(40, true), 12);
  assert.equal(view.getUint16(20, true), 1);
  assert.equal(view.getUint16(22, true), 1);
  assert.equal(view.getUint32(24, true), 16000);
  assert.equal(view.getUint32(28, true), 32000);
  assert.equal(view.getUint16(34, true), 16);
  assert.deepEqual(
    Array.from({ length: 6 }, (_, index) =>
      view.getInt16(44 + index * 2, true),
    ),
    [-32768, -32768, 0, 16384, 32767, 32767],
  );
  assert.throws(() => encodeSpeechWav([]), /empty/);
  assert.throws(
    () => encodeSpeechWav([new Float32Array([NaN])]),
    /invalid audio/,
  );
  assert.throws(() => encodeSpeechWav([new Float32Array([0, 0])]), /silence/);
  assert.throws(
    () => encodeSpeechWav([new Float32Array([1])], 0),
    /sample rate/,
  );
});

class FakeWorker {
  listeners = new Map();
  terminated = false;
  sent = [];
  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }
  removeEventListener(type, listener) {
    this.listeners.get(type)?.delete(listener);
  }
  postMessage(data) {
    this.sent.push(data);
  }
  terminate() {
    this.terminated = true;
  }
  emit(data) {
    for (const listener of this.listeners.get("message") ?? [])
      listener({ data });
  }
  error() {
    for (const listener of this.listeners.get("error") ?? []) listener({});
  }
}

test("speech engine starts only on generation, reuses successful worker and reports progress", async () => {
  const workers = [];
  const session = new LocalSpeechSession(() => {
    const worker = new FakeWorker();
    workers.push(worker);
    return worker;
  });
  assert.equal(workers.length, 0);
  assert.throws(() => session.generate("", () => {}), /Paste some/);
  assert.equal(workers.length, 0);
  const progress = [];
  const promise = session.generate("Hello world.", (message) =>
    progress.push(message),
  );
  assert.deepEqual(workers[0].sent, [{ text: "Hello world." }]);
  await assert.rejects(
    session.generate("Another.", () => {}),
    /already running/,
  );
  workers[0].emit({ type: "progress", message: "Loading model" });
  const audio = encodeSpeechWav([new Float32Array([0, 0.1, 0])]);
  workers[0].emit({ type: "complete", audio });
  assert.equal(await promise, audio);
  assert.deepEqual(progress, ["Loading model"]);
  const next = session.generate("More words.", () => {});
  assert.equal(workers.length, 1);
  workers[0].emit({ type: "complete", audio });
  await next;
  session.stop();
  assert.ok(workers[0].terminated);
});

test("cancelled/failed speech workers cannot deliver stale audio, and retry creates a fresh worker", async () => {
  const workers = [];
  const session = new LocalSpeechSession(() => {
    const worker = new FakeWorker();
    workers.push(worker);
    return worker;
  });
  const progress = [];
  const pending = session.generate("First text.", (message) =>
    progress.push(message),
  );
  session.stop();
  await assert.rejects(pending, /cancelled/);
  workers[0].emit({ type: "progress", message: "Too late" });
  workers[0].emit({
    type: "complete",
    audio: encodeSpeechWav([new Float32Array([1])]),
  });
  assert.deepEqual(progress, []);
  const retry = session.generate("New text.", () => {});
  assert.equal(workers.length, 2);
  workers[1].error();
  await assert.rejects(retry, /worker stopped/);
  const failure = session.generate("Try again.", () => {});
  workers[2].emit({ type: "error", message: "Model download failed" });
  await assert.rejects(failure, /Model download failed/);
  const malformed = session.generate("Try again.", () => {});
  workers[3].emit({
    type: "complete",
    audio: { blob: new Blob([]), duration: 0 },
  });
  await assert.rejects(malformed, /invalid audio/);
  session.stop();
});
