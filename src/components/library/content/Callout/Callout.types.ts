export type CalloutVariant = "info" | "success" | "warning" | "danger";

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  body: string;
}
