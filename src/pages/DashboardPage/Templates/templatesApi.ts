import { apiFetch } from "../../../lib/auth";
import type { TemplateComponent } from "./componentRegistry";

export type TemplateType = "post" | "page";
export type TemplateLayout = "article" | "feature" | "basic";

export interface TemplateSchema {
  version: 1;
  layout: TemplateLayout;
  sections: unknown[];
  components?: TemplateComponent[];
}

export interface Template {
  id: number;
  name: string;
  template_type: TemplateType;
  schema: TemplateSchema;
  created_at: string;
  updated_at: string;
}

export interface TemplateInput {
  name: string;
  template_type: TemplateType;
  schema: TemplateSchema;
}

async function check(response: Response): Promise<Response> {
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Request failed (${response.status})`);
  }
  return response;
}

export const fetchTemplates = async (): Promise<Template[]> =>
  (await check(await apiFetch("/api/admin/templates"))).json();

export const createTemplate = async (input: TemplateInput): Promise<Template> =>
  (await check(await apiFetch("/api/admin/templates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  }))).json();

export const updateTemplate = async (id: number, input: TemplateInput): Promise<Template> =>
  (await check(await apiFetch(`/api/admin/templates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  }))).json();

export function normalizeTemplate(template: Template): Template {
  return {
    ...template,
    schema: {
      ...template.schema,
      sections: template.schema.sections ?? [],
      components: template.schema.components ?? [],
    },
  };
}
