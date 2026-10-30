# Template components

The core idea would be:

Page Template
    ↓
JSON component configuration
    ↓
Component Renderer
    ↓
Component Registry
    ↓
Reusable React Components

Suggested scaffold
src/
├── components/
│   ├── content/
│   │   ├── RichText/
│   │   ├── Image/
│   │   ├── ImageGallery/
│   │   ├── Video/
│   │   └── Quote/
│   │
│   ├── layout/
│   │   ├── Container/
│   │   ├── Section/
│   │   ├── Columns/
│   │   ├── Stack/
│   │   └── Spacer/
│   │
│   ├── marketing/
│   │   ├── Hero/
│   │   ├── CallToAction/
│   │   ├── FeatureGrid/
│   │   ├── FeatureCard/
│   │   ├── LogoCloud/
│   │   ├── Testimonial/
│   │   └── Testimonials/
│   │
│   ├── navigation/
│   │   ├── Breadcrumbs/
│   │   ├── LinkList/
│   │   └── InPageNavigation/
│   │
│   └── data/
│       ├── DataTable/
│       ├── CardList/
│       └── KeyValueList/
│
├── page-builder/
│   ├── ComponentRenderer.tsx
│   ├── componentRegistry.ts
│   ├── componentTypes.ts
│   ├── PageRenderer.tsx
│   └── PageTemplate.ts
│
└── templates/
    ├── StandardPage.json
    ├── LandingPage.json
    ├── ArticlePage.json
    └── ServicesPage.json


Each component would have a predictable contract, for example:

Hero/
├── Hero.tsx
├── Hero.types.ts
├── Hero.module.scss
├── Hero.schema.ts
├── Hero.defaults.ts
└── index.ts


The important addition is Hero.schema.ts. It describes what the page/template editor can configure instead of hard-coding properties into the editor.

For example:

export interface IHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  primaryAction?: {
    label: string;
    url: string;
  };
  secondaryAction?: {
    label: string;
    url: string;
  };
  variant?: "default" | "split" | "imageBackground";
}


Then the registry becomes the central catalogue:

import { Hero } from "../components/marketing/Hero";
import { RichText } from "../components/content/RichText";
import { ImageGallery } from "../components/content/ImageGallery";
import { FeatureGrid } from "../components/marketing/FeatureGrid";
import { CallToAction } from "../components/marketing/CallToAction";

export const componentRegistry = {
  hero: Hero,
  richText: RichText,
  imageGallery: ImageGallery,
  featureGrid: FeatureGrid,
  callToAction: CallToAction,
} as const;

export type ComponentType = keyof typeof componentRegistry;


A page definition can consequently be very small:

{
  "id": "services",
  "title": "Our Services",
  "template": "standard",
  "components": [
    {
      "id": "hero-1",
      "type": "hero",
      "props": {
        "eyebrow": "What we do",
        "title": "Microsoft 365 consulting",
        "description": "Practical solutions built around your organisation."
      }
    },
    {
      "id": "features-1",
      "type": "featureGrid",
      "props": {
        "columns": 3,
        "items": []
      }
    },
    {
      "id": "cta-1",
      "type": "callToAction",
      "props": {
        "title": "Ready to get started?"
      }
    }
  ]
}


ComponentRenderer then has essentially one responsibility:

export const ComponentRenderer: React.FC<IComponentDefinition> = ({
  type,
  props,
}) => {
  const Component = componentRegistry[type];

  if (!Component) {
    return null;
  }

  return <Component {...props} />;
};

I’d also make templates compositional

Rather than:

LandingPage.tsx
ServicesPage.tsx
ArticlePage.tsx


containing fixed React layouts, I'd make a template principally define allowed regions and components:

Landing
├── Hero
├── Main
├── Secondary
└── Footer CTA


For example:

interface ITemplateRegion {
  id: string;
  label: string;
  allowedComponents?: ComponentType[];
  minItems?: number;
  maxItems?: number;
}


That becomes particularly powerful with the CMS direction you've already established. Your previous architecture keeps individual page/post content as JSON and separates persisted content from the renderer.

It would let the admin UI eventually provide:

Page Builder
──────────────────────────────

Landing Page

[ Hero                         ]
[ Edit ] [ Move ] [ Remove ]

[ Feature Grid                 ]
[ Edit ] [ Move ] [ Remove ]

[ Rich Text                    ]
[ Edit ] [ Move ] [ Remove ]

        + Add component


without changing the public React application whenever someone rearranges a page.

Initial component library

I'd scaffold the first version around roughly these building blocks:

Layout

Section
Container
Columns
Stack
Divider
Spacer


Content

RichText
Heading
Image
ImageWithText
ImageGallery
Video
Quote
Callout
FileDownload


Marketing

Hero
FeatureCard
FeatureGrid
CallToAction
Stats
LogoCloud
Testimonial
Testimonials
ServicesGrid


Navigation

Breadcrumbs
InPageNavigation
LinkList
RelatedLinks


Dynamic

ContentList
LatestPosts
RelatedContent
CardGrid
SearchResults


That last group should be deliberately different. The JSON stores the query/configuration, rather than its returned content:

{
  "type": "latestPosts",
  "props": {
    "limit": 6,
    "category": "SharePoint",
    "layout": "cards"
  }
}


The renderer retrieves the current posts at runtime.

This separation also fits nicely with your existing Tiptap approach. Tiptap remains responsible for rich editorial content, while the page builder controls page composition. Your earlier CMS design already separated Tiptap authoring, persisted JSON and public rendering, so I’d preserve that boundary rather than trying to make every page component a Tiptap node.

Most importantly: I’d treat this component library as its own package from day one, for example packages/ui, so the renderer, admin page designer and future sites can all consume the exact same components.