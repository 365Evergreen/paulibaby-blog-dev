export interface FeatureItem {
  title?: string;
  description?: string;
  icon?: string;
  link?: { label: string; url: string };
}

export interface FeatureGridProps {
  heading?: string;
  columns?: string;
  items: FeatureItem[];
}
