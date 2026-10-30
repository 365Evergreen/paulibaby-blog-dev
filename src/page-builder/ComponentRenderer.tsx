import type { ComponentProps } from "../components/library/componentTypes";
import { componentRegistry, resolveProps } from "./componentRegistry";

export interface ComponentRendererProps {
  type: string;
  props?: ComponentProps;
}

export function ComponentRenderer({ type, props }: ComponentRendererProps) {
  const definition = componentRegistry[type];
  if (!definition) return null;
  const { Component } = definition;
  return <Component {...resolveProps(type, props)} />;
}
