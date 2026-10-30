import { AlertCircle, FilePlus2, LayoutTemplate, Pencil, Save, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  createTemplate,
  fetchTemplates,
  type Template,
  type TemplateInput,
  type TemplateLayout,
  type TemplateType,
  updateTemplate,
} from "./templatesApi";
import styles from "./DashboardPage.module.css";

const layouts: { value: TemplateLayout; label: string; description: string }[] = [
  { value: "article", label: "Article", description: "A focused reading layout for posts." },
  { value: "feature", label: "Feature", description: "A post layout with a prominent hero area." },
  { value: "basic", label: "Basic", description: "A simple, flexible page layout." },
];

const blankTemplate = (): TemplateInput => ({
  name: "",
  template_type: "post",
  schema: { version: 1, layout: "article", sections: [] },
});

function TemplatePreview({ layout }: { layout: TemplateLayout }) {
  return (
    <div className={`${styles.templatePreview} ${styles[`preview${layout[0].toUpperCase()}${layout.slice(1)}`]}`}>
      <span className={styles.previewBar} />
      {layout === "feature" && <span className={styles.previewHero} />}
      <span className={styles.previewTitle} />
      <span className={styles.previewLine} />
      <span className={styles.previewLine} />
      <span className={`${styles.previewLine} ${styles.previewLineShort}`} />
    </div>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Template | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [draft, setDraft] = useState<TemplateInput>(blankTemplate);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    fetchTemplates().then(setTemplates, (reason: Error) => setError(reason.message));
  }, []);

  useEffect(load, [load]);

  const startNew = () => {
    setError("");
    setEditing(null);
    setDraft(blankTemplate());
    setEditorOpen(true);
  };

  const startEdit = (template: Template) => {
    setError("");
    setEditing(template);
    setDraft({
      name: template.name,
      template_type: template.template_type,
      schema: template.schema,
    });
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditing(null);
    setDraft(blankTemplate());
    setEditorOpen(false);
  };

  const save = async () => {
    if (!draft.name.trim()) {
      setError("Template name is required.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const saved = editing
        ? await updateTemplate(editing.id, { ...draft, name: draft.name.trim() })
        : await createTemplate({ ...draft, name: draft.name.trim() });
      setTemplates((current) => {
        if (!current) return [saved];
        return editing ? current.map((template) => template.id === saved.id ? saved : template) : [saved, ...current];
      });
      closeEditor();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to save the template.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.pageHead}>
        <div>
          <h1>Templates</h1>
          <p className={styles.pageDescription}>Choose a starting layout for posts and pages. More components can be added later.</p>
        </div>
        <button className={`${styles.btn} ${styles.primary}`} onClick={startNew}>
          <FilePlus2 size={16} /> Add template
        </button>
      </div>

      {error && (
        <div className={styles.error} role="alert">
          <AlertCircle size={18} /> {error}
          <button className={styles.btn} onClick={() => setError("")}>Dismiss</button>
        </div>
      )}

      {editorOpen ? (
        <section className={styles.card}>
          <div className={styles.editorHead}>
            <div>
              <h2>{editing ? "Edit template" : "New template"}</h2>
              <p className={styles.muted}>Select a layout and save its schema. Sections are reserved for future components.</p>
            </div>
            <button className={styles.iconBtn} onClick={closeEditor} aria-label="Close template editor"><X size={18} /></button>
          </div>
          <div className={styles.templateEditor}>
            <label className={styles.field}>
              Template name
              <input className={styles.input} value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Long-form post" />
            </label>
            <label className={styles.field}>
              Use for
              <select className={styles.input} value={draft.template_type} onChange={(event) => setDraft((current) => ({ ...current, template_type: event.target.value as TemplateType }))}>
                <option value="post">Posts</option>
                <option value="page">Pages</option>
              </select>
            </label>
          </div>
          <div className={styles.layoutChoices} role="radiogroup" aria-label="Template layout">
            {layouts.map((layout) => (
              <button
                type="button"
                key={layout.value}
                role="radio"
                aria-checked={draft.schema.layout === layout.value}
                className={`${styles.layoutChoice} ${draft.schema.layout === layout.value ? styles.layoutChoiceSelected : ""}`}
                onClick={() => setDraft((current) => ({ ...current, schema: { ...current.schema, layout: layout.value } }))}
              >
                <TemplatePreview layout={layout.value} />
                <strong>{layout.label}</strong>
                <span>{layout.description}</span>
              </button>
            ))}
          </div>
          <div className={styles.editorActions}>
            <button className={styles.btn} onClick={closeEditor}>Cancel</button>
            <button className={`${styles.btn} ${styles.primary}`} disabled={saving} onClick={() => void save()}><Save size={16} /> {saving ? "Saving..." : "Save template"}</button>
          </div>
        </section>
      ) : null}

      <section>
        <div className={styles.galleryHead}>
          <h2>Saved templates</h2>
          <span className={styles.muted}>{templates ? `${templates.length} templates` : ""}</span>
        </div>
        <div className={styles.templateGrid}>
          {templates === null &&
            Array.from({ length: 3 }, (_, index) => (
              <div className={`${styles.templateCard} ${styles.templateSkeleton}`} key={index}><div className={styles.skeleton} /></div>
            ))}
          {templates?.map((template) => (
            <article key={template.id} className={styles.templateCard}>
              <TemplatePreview layout={template.schema.layout} />
              <div className={styles.templateCardBody}>
                <span className={styles.templateType}>{template.template_type}</span>
                <h3>{template.name}</h3>
                <p>{layouts.find((layout) => layout.value === template.schema.layout)?.description}</p>
                <button className={styles.btn} onClick={() => startEdit(template)}><Pencil size={15} /> Edit</button>
              </div>
            </article>
          ))}
          {templates?.length === 0 && (
            <div className={styles.emptyTemplates}>
              <LayoutTemplate size={24} />
              <p>No templates yet. Create one from a simple layout.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
