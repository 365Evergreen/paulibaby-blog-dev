import { defineComponent } from "../../componentTypes";
import { Columns } from "./Columns";
import { columnsDefaults } from "./Columns.defaults";
import { columnsSchema } from "./Columns.schema";
import type { ColumnsProps } from "./Columns.types";

export type { ColumnsProps };
export { Columns };

export const columnsDefinition = defineComponent<ColumnsProps>({
  type: "columns",
  name: "Columns",
  group: "layout",
  description: "Side-by-side columns of text.",
  fields: columnsSchema,
  defaults: columnsDefaults,
  Component: Columns,
});
