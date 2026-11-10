import { createContext, useContext } from "react";
import type { JSONContent } from "@tiptap/core";
import type { PublicationSettings } from "../tools/PublicationDesigner.logic";
import type { PublicationTemplate } from "./publicationTemplates";

export interface PublicationDraft {
  templateId: string;
  settings: PublicationSettings;
  content: JSONContent;
  modified: boolean;
}

export interface PublisherState {
  draft: PublicationDraft | null;
  startTemplate: (template: PublicationTemplate) => void;
  updateContent: (content: JSONContent) => void;
  updateSettings: (settings: Partial<PublicationSettings>) => void;
}

export const PublisherContext = createContext<PublisherState | null>(null);

export function usePublisher() {
  const state = useContext(PublisherContext);
  if (!state) throw new Error("The publisher workspace is unavailable.");
  return state;
}
