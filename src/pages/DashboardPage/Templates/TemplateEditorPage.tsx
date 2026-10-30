import { ArrowDown, ArrowLeft, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FieldEditor from "../../../components/FieldEditor/FieldEditor";
import { COMPONENT_GROUP_LABELS, type ComponentGroup } from "../../../components/library/componentTypes";
import { componentDefinitions, componentRegistry, createTemplateComponent, resolveProps, type TemplateComponent } from "./componentRegistry";
import { createTemplate, fetchTemplates, normalizeTemplate, type TemplateInput, type TemplateLayout, type TemplateType, updateTemplate } from "./templatesApi";
import styles from "../DashboardPage.module.css";

const blankTemplate = (): TemplateInput => ({
  name: "",
  template_type: "post",
  schema: { version: 1, layout: "article", sections: [], components: [] },
});

export default function TemplateEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [draft, setDraft] = useState<TemplateInput>(blankTemplate);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew || !id) return;
    fetchTemplates().then(
      (templates) => {
        const template = templates.map(normalizeTemplate).find((item) => item.id === Number(id));
        if (!template) {
          setError("Template not found.");
        } else {
          setDraft({ name: template.name, template_type: template.template_type, schema: template.schema });
          setSelectedId(template.schema.components?.[0]?.id ?? null);
        }
        setLoading(false);
      },
      (reason: Error) => {
        setError(reason.message);
        setLoading(false);
      },
    );
  }, [id, isNew]);

  const components = draft.schema.components ?? [];
  const selected = components.find((component) => component.id === selectedId) ?? null;

  const updateComponents = (updater: (items: TemplateComponent[]) => TemplateComponent[]) => {
    setDraft((current) => ({ ...current, schema: { ...current.schema, components: updater(current.schema.components ?? []) } }));
  };

  const addComponent = (type: string) => {
    const component = createTemplateComponent(type);
    updateComponents((items) => [...items, component]);
    setSelectedId(component.id);
  };

  const moveComponent = (idToMove: string, direction: -1 | 1) => {
    updateComponents((items) => {
      const index = items.findIndex((component) => component.id === idToMove);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= items.length) return items;
      const next = [...items];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const removeComponent = (idToRemove: string) => {
    updateComponents((items) => items.filter((component) => component.id !== idToRemove));
    if (selectedId === idToRemove) setSelectedId(null);
  };

  const updateProp = (componentId: string, key: string, value: unknown) => {
    updateComponents((items) => items.map((component) =>
      component.id === componentId ? { ...component, props: { ...component.props, [key]: value } } : component,
    ));
  };

  const save = async () => {
    if (!draft.name.trim()) {
      setError("Template name is required.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const input = { ...draft, name: draft.name.trim() };
      const saved = isNew ? await createTemplate(input) : await updateTemplate(Number(id), input);
      navigate(`/admin/dashboard/templates/${saved.id}`, { replace: true });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to save the template.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.content}><p className={styles.muted}>Loading template…</p></div>;

  return (
    <div className={styles.content}>
      <div className={styles.pageHead}>
        <div>
          <Link className={styles.backLink} to="/admin/dashboard/templates"><ArrowLeft size={16} /> Templates</Link>
          <h1>{isNew ? "New template" : "Edit template"}</h1>
          <p className={styles.pageDescription}>Add ordered components and define their default configuration.</p>
        </div>
        <button className={`${styles.btn} ${styles.primary}`} onClick={() => void save()} disabled={saving}><Save size={16} /> {saving ? "Saving…" : "Save template"}</button>
      </div>

      {error && <div className={styles.error} role="alert">{error}</div>}

      <section className={styles.card}>
        <div className={styles.templateEditor}>
          <label className={styles.field}>Template name<input className={styles.input} value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Campaign landing page" /></label>
          <label className={styles.field}>Use for<select className={styles.input} value={draft.template_type} onChange={(event) => setDraft((current) => ({ ...current, template_type: event.target.value as TemplateType }))}><option value="post">Posts</option><option value="page">Pages</option></select></label>
          <label className={styles.field}>Layout<select className={styles.input} value={draft.schema.layout} onChange={(event) => setDraft((current) => ({ ...current, schema: { ...current.schema, layout: event.target.value as TemplateLayout } }))}><option value="article">Article</option><option value="feature">Feature</option><option value="basic">Basic</option></select></label>
        </div>
      </section>

      <div className={styles.componentEditorGrid}>
        <section className={styles.card}>
          <h2>Components</h2>
          <p className={styles.muted}>Select a component to configure its default content.</p>
          <div className={styles.componentList}>
            {components.map((component, index) => {
              const definition = componentRegistry[component.type];
              if (!definition) return null;
              return (
                <div key={component.id} className={`${styles.componentItem} ${selectedId === component.id ? styles.componentItemSelected : ""}`}>
                  <button className={styles.componentSelect} onClick={() => setSelectedId(component.id)}><strong>{definition.name}</strong><span>{definition.description}</span></button>
                  <div className={styles.componentActions}>
                    <button className={styles.iconBtn} onClick={() => moveComponent(component.id, -1)} disabled={index === 0} aria-label={`Move ${definition.name} up`}><ArrowUp size={15} /></button>
                    <button className={styles.iconBtn} onClick={() => moveComponent(component.id, 1)} disabled={index === components.length - 1} aria-label={`Move ${definition.name} down`}><ArrowDown size={15} /></button>
                    <button className={styles.iconBtn} onClick={() => removeComponent(component.id)} aria-label={`Remove ${definition.name}`}><Trash2 size={15} /></button>
                  </div>
                </div>
              );
            })}
            {components.length === 0 && <p className={styles.muted}>No components yet. Add one from the library.</p>}
          </div>
          <div className={styles.componentLibrary}>
            <h3>Add component</h3>
            {(Object.keys(COMPONENT_GROUP_LABELS) as ComponentGroup[]).map((group) => (
              <div key={group}>
                <h4>{COMPONENT_GROUP_LABELS[group]}</h4>
                {componentDefinitions.filter((definition) => definition.group === group).map((definition) => <button key={definition.type} className={styles.btn} onClick={() => addComponent(definition.type)}><Plus size={15} /> {definition.name}</button>)}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <h2>Component settings</h2>
          {selected && componentRegistry[selected.type] ? (
            <div className={styles.componentFields}>
              <p className={styles.muted}>{componentRegistry[selected.type].description}</p>
              <FieldEditor
                fields={componentRegistry[selected.type].fields}
                values={resolveProps(selected.type, selected.props)}
                onChange={(key, value) => updateProp(selected.id, key, value)}
              />
            </div>
          ) : <p className={styles.muted}>Select a component to configure it.</p>}
        </section>
      </div>
    </div>
  );
}
