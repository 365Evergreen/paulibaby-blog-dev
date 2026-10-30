export interface ImageProps {
  src: string;
  alt?: string;
  caption?: string;
  link?: { label: string; url: string };
  fullWidth?: boolean;
}
