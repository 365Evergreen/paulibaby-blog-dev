import { useEffect, useRef, useState } from "react";
import type { ExecutionStats } from "./types";

export function useToolOperation<T>() {
  const version = useRef(0);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState<ExecutionStats | null>(null);

  useEffect(
    () => () => {
      version.current++;
    },
    [],
  );

  function clear() {
    version.current++;
    setResult(null);
    setError("");
    setStats(null);
    setBusy(false);
  }

  function fail(message: string) {
    clear();
    setError(message);
  }

  async function run(
    task: () => T | Promise<T>,
    inputSize: number,
    outputSize: (value: T) => number,
  ) {
    const request = ++version.current;
    setResult(null);
    setError("");
    setStats(null);
    setBusy(true);
    // Paint the busy status before starting synchronous browser work.
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    if (request !== version.current) return;
    const started = performance.now();
    try {
      const value = await task();
      const size = outputSize(value);
      if (request !== version.current) return;
      setResult(value);
      setStats({
        durationMs: Math.round(performance.now() - started),
        inputSize,
        outputSize: size,
      });
    } catch (reason) {
      if (request === version.current)
        setError(
          reason instanceof Error
            ? reason.message
            : "The operation failed. Please check the input and try again.",
        );
    } finally {
      if (request === version.current) setBusy(false);
    }
  }

  return { result, error, busy, stats, clear, fail, run };
}
