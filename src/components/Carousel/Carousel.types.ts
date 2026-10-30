export interface Slide {
  date: string | number | Date;
  id: number;
  title: string;
  excerpt: string;
  cover_image: string;
  url: string;
  interval?: number;
  slug: string;
  category_slug?: string | null;
}
;
export interface Carousel {
date: string | number | Date;
  id: number;
  title: string;
  excerpt: string;
  cover_image: string;
  url: string;
  interval?: number;
  slug: string;
  category_slug?: string | null;
}
;