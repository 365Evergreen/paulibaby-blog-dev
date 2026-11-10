export type ToolId =
  | "theme-designer"
  | "formatter"
  | "html-to-md"
  | "pdf-generator"
  | "publication-designer"
  | "image-converter"
  | "data-converter"
  | "crypto-hasher";

export interface ToolDefinition {
  id: ToolId;
  name: string;
  description: string;
  category: "code" | "document" | "file" | "security";
  tags: readonly string[];
}

export interface ExecutionStats {
  durationMs: number;
  inputSize: number;
  outputSize: number;
}
