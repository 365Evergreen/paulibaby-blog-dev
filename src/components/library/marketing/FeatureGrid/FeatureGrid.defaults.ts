import type { FeatureGridProps } from "./FeatureGrid.types";

export const featureGridDefaults: FeatureGridProps = {
  heading: "What we offer",
  columns: "3",
  items: [
    { icon: "✨", title: "Feature one", description: "", link: { label: "", url: "" } },
    { icon: "🚀", title: "Feature two", description: "", link: { label: "", url: "" } },
    { icon: "🔒", title: "Feature three", description: "", link: { label: "", url: "" } },
  ],
};
