import type { FieldDefinition } from "../../fieldTypes";

export const latestPostsSchema: FieldDefinition[] = [
  { key: "heading", label: "Heading", type: "text", placeholder: "Latest posts" },
  { key: "limit", label: "Number of posts", type: "number", min: 1, max: 24, step: 1 },
  { key: "category", label: "Category slug (optional)", type: "text", help: "Leave empty to show all categories." },
  {
    key: "layout",
    label: "Layout",
    type: "select",
    options: [
      { value: "cards", label: "Cards" },
      { value: "list", label: "List" },
    ],
  },
];
