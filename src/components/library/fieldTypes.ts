export interface BaseField {
  key: string;
  label: string;
  help?: string;
  placeholder?: string;
}

export interface TextField extends BaseField {
  type: "text";
}

export interface TextareaField extends BaseField {
  type: "textarea";
  rows?: number;
}

export interface NumberField extends BaseField {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
}

export interface BooleanField extends BaseField {
  type: "boolean";
}

export interface SelectField extends BaseField {
  type: "select";
  options: { value: string; label: string }[];
}

export interface LinkField extends BaseField {
  type: "link";
}

export type ScalarField = TextField | TextareaField | NumberField | BooleanField | SelectField | LinkField;

export interface ListField extends BaseField {
  type: "list";
  itemLabel?: string;
  fields: ScalarField[];
  maxItems?: number;
}

export type FieldDefinition = ScalarField | ListField;

export interface LinkValue {
  label: string;
  url: string;
}

export type ListItem = Record<string, unknown>;

export function defaultForField(field: FieldDefinition): unknown {
  switch (field.type) {
    case "number":
      return field.min ?? 0;
    case "boolean":
      return false;
    case "select":
      return field.options[0]?.value ?? "";
    case "link":
      return { label: "", url: "" } satisfies LinkValue;
    case "list":
      return [];
    default:
      return "";
  }
}
