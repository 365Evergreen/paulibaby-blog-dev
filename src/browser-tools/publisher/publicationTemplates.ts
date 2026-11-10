import type { JSONContent } from "@tiptap/core";
import {
  defaultSettings,
  samplePublication,
} from "../tools/PublicationDesigner.logic.ts";
import type { PublicationSettings } from "../tools/PublicationDesigner.logic";

export interface PublicationTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  settings: PublicationSettings;
  content: JSONContent;
}

const text = (value: string): JSONContent => ({
  type: "paragraph",
  content: [{ type: "text", text: value }],
});
const heading = (value: string, level = 1): JSONContent => ({
  type: "heading",
  attrs: { level },
  content: [{ type: "text", text: value }],
});
const document = (...content: JSONContent[]): JSONContent => ({
  type: "doc",
  content,
});
const list = (items: string[]): JSONContent => ({
  type: "bulletList",
  content: items.map((item) => ({ type: "listItem", content: [text(item)] })),
});
const table = (rows: string[][]): JSONContent => ({
  type: "table",
  attrs: { publicationStyle: "striped" },
  content: rows.map((row, index) => ({
    type: "tableRow",
    content: row.map((value) => ({
      type: index === 0 ? "tableHeader" : "tableCell",
      content: [text(value)],
    })),
  })),
});

export const publicationTemplates: readonly PublicationTemplate[] = [
  {
    id: "blank",
    name: "Blank publication",
    category: "Blank",
    description: "An empty page and a fresh start.",
    settings: { ...defaultSettings, title: "Untitled publication" },
    content: document({ type: "paragraph" }),
  },
  {
    id: "newsletter",
    name: "Community newsletter",
    category: "Newsletters",
    description:
      "A compact two-column edition with headlines and a new-section page break.",
    settings: { ...defaultSettings, title: "The Evergreen Review", columns: 2 },
    content: samplePublication,
  },
  {
    id: "report",
    name: "Annual report",
    category: "Reports",
    description:
      "A report cover, automatic contents, executive summary and findings table.",
    settings: {
      ...defaultSettings,
      title: "Annual Report",
      cover: "report",
      coverKicker: "Year in review",
      coverSubtitle: "Progress, outcomes and the road ahead.",
      includeContents: true,
    },
    content: document(
      heading("Executive summary"),
      text(
        "Summarise the most important achievements and what they mean for your readers.",
      ),
      heading("Highlights", 2),
      list([
        "Describe a meaningful result.",
        "Explain the impact.",
        "Identify the next opportunity.",
      ]),
      { type: "pageBreak" },
      heading("Findings"),
      table([
        ["Area", "Outcome", "Next step"],
        ["Community", "A stronger network", "Expand participation"],
        ["Operations", "A clearer process", "Review progress"],
      ]),
      heading("Next steps", 2),
      text("Set out the actions, owners and milestones for the coming year."),
    ),
  },
  {
    id: "essay",
    name: "Editorial essay",
    category: "Editorial",
    description:
      "A quiet serif layout, minimal cover and room for a considered argument.",
    settings: {
      ...defaultSettings,
      title: "A New Perspective",
      cover: "minimal",
      coverSubtitle: "An essay about the ideas that shape our world.",
      coverKicker: "An editorial collection",
    },
    content: document(
      heading("A question worth asking"),
      text(
        "Begin with the question at the heart of your essay. Give the reader a reason to keep reading.",
      ),
      heading("Another way to see it", 2),
      text(
        "Build your argument with clear examples, careful observations and your own distinctive voice.",
      ),
      {
        type: "blockquote",
        content: [
          text("Make space for the idea that changes the conversation."),
        ],
      },
      heading("Where we go from here", 2),
      text(
        "Bring the threads together and leave the reader with something to consider.",
      ),
    ),
  },
  {
    id: "guide",
    name: "Practical handbook",
    category: "Guides",
    description:
      "An editable cover and heading-based contents for a step-by-step guide.",
    settings: {
      ...defaultSettings,
      title: "The Practical Handbook",
      cover: "editorial",
      includeContents: true,
      coverSubtitle: "A clear guide from the first step to the next.",
      coverKicker: "Field notes",
    },
    content: document(
      heading("Getting started"),
      text("Explain who this guide is for and what they will be able to do."),
      heading("Before you begin", 2),
      list([
        "Gather the materials you need.",
        "Choose a comfortable place to work.",
        "Read the steps once before starting.",
      ]),
      { type: "pageBreak" },
      heading("The process"),
      heading("Step one", 2),
      text("Describe the first action in plain, direct language."),
      heading("Step two", 2),
      text(
        "Add a useful example or insert a local image to illustrate the next step.",
      ),
      heading("A final check", 2),
      text(
        "List the signs of a successful result and how to correct common mistakes.",
      ),
    ),
  },
  {
    id: "programme",
    name: "Event programme",
    category: "Events",
    description:
      "An A5 programme with a welcome, timetable and useful visitor information.",
    settings: {
      ...defaultSettings,
      title: "A Day Together",
      format: "a5",
      font: "helvetica",
      coverKicker: "Event programme",
    },
    content: document(
      heading("A Day Together"),
      text("Welcome your guests and introduce the theme of the day."),
      heading("The programme", 2),
      table([
        ["Time", "Session"],
        ["09:00", "Welcome and introductions"],
        ["10:00", "A conversation worth having"],
        ["12:00", "Lunch and connections"],
        ["14:00", "Ideas into action"],
      ]),
      heading("Good to know", 2),
      list([
        "Add the venue and accessibility details.",
        "Include a contact for help on the day.",
      ]),
    ),
  },
];

export function filterPublicationTemplates(query: string, category = "All") {
  const search = query.trim().toLowerCase();
  return publicationTemplates.filter(
    (template) =>
      template.id !== "blank" &&
      (category === "All" || template.category === category) &&
      [template.name, template.category, template.description].some((value) =>
        value.toLowerCase().includes(search),
      ),
  );
}
