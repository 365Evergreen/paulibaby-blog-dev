import { Plus, Trash2 } from "lucide-react";
import { defaultForField, type FieldDefinition, type LinkValue, type ListField, type ListItem, type ScalarField } from "../library/fieldTypes";
import styles from "./FieldEditor.module.css";

interface FieldEditorProps {
  fields: FieldDefinition[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

const asString = (value: unknown) => (typeof value === "string" || typeof value === "number" ? String(value) : "");
const asLink = (value: unknown): LinkValue => {
  const link = (value ?? {}) as Partial<LinkValue>;
  return { label: link.label ?? "", url: link.url ?? "" };
};

function ScalarEditor({ field, value, onChange }: { field: ScalarField; value: unknown; onChange: (value: unknown) => void }) {
  switch (field.type) {
    case "textarea":
      return <textarea className={styles.control} rows={field.rows ?? 4} value={asString(value)} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
    case "number":
      return (
        <input
          className={styles.control}
          type="number"
          min={field.min}
          max={field.max}
          step={field.step}
          value={asString(value)}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        />
      );
    case "boolean":
      return (
        <span className={styles.checkbox}>
          <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          Enabled
        </span>
      );
    case "select":
      return (
        <select className={styles.control} value={asString(value)} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      );
    case "link": {
      const link = asLink(value);
      return (
        <span className={styles.linkRow}>
          <input className={styles.control} value={link.label} placeholder="Label" onChange={(e) => onChange({ ...link, label: e.target.value })} />
          <input className={styles.control} value={link.url} placeholder="https://… or /path" onChange={(e) => onChange({ ...link, url: e.target.value })} />
        </span>
      );
    }
    default:
      return <input className={styles.control} value={asString(value)} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
  }
}

function ListEditor({ field, value, onChange }: { field: ListField; value: unknown; onChange: (value: ListItem[]) => void }) {
  const items = Array.isArray(value) ? (value as ListItem[]) : [];
  const blank = (): ListItem => Object.fromEntries(field.fields.map((f) => [f.key, defaultForField(f)]));
  const update = (index: number, key: string, next: unknown) =>
    onChange(items.map((item, i) => (i === index ? { ...item, [key]: next } : item)));

  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <div key={index} className={styles.listItem}>
          <div className={styles.listItemHeader}>
            <strong>{field.itemLabel ?? "Item"} {index + 1}</strong>
            <button type="button" className={styles.iconButton} aria-label={`Remove ${field.itemLabel ?? "item"} ${index + 1}`} onClick={() => onChange(items.filter((_, i) => i !== index))}>
              <Trash2 size={14} />
            </button>
          </div>
          {field.fields.map((sub) => (
            <div key={sub.key} className={styles.field}>
              <span className={styles.label}>{sub.label}</span>
              <ScalarEditor field={sub} value={item[sub.key]} onChange={(next) => update(index, sub.key, next)} />
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        className={styles.addButton}
        disabled={field.maxItems !== undefined && items.length >= field.maxItems}
        onClick={() => onChange([...items, blank()])}
      >
        <Plus size={14} /> Add {(field.itemLabel ?? "item").toLowerCase()}
      </button>
    </div>
  );
}

export default function FieldEditor({ fields, values, onChange }: FieldEditorProps) {
  return (
    <div className={styles.editor}>
      {fields.map((field) => (
        <div key={field.key} className={styles.field}>
          <span className={styles.label}>{field.label}</span>
          {field.type === "list"
            ? <ListEditor field={field} value={values[field.key]} onChange={(next) => onChange(field.key, next)} />
            : <ScalarEditor field={field} value={values[field.key]} onChange={(next) => onChange(field.key, next)} />}
          {field.help && <small className={styles.help}>{field.help}</small>}
        </div>
      ))}
    </div>
  );
}
