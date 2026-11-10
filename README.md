# Paulibaby blog

React + Vite on a Cloudflare Worker, pnpm, vanilla CSS modules.

- **Public**: `/` (post list), `/posts/:slug`, `/:slug` (pages)
- **Admin**: existing email/password sign-in and D1-backed session token via
  `src/lib/auth.ts`'s `apiFetch`; admin/editor role gates remain in place.
- **Editors**: Tiptap remains available during staged replacement. Read-only legacy
  JSON rendering does not rewrite existing content.
- **R2**: existing `CONTENT` (immutable structured revisions during staged rollout)
  and `media` (uploads served at `media.paulibaby.com`).
- **D1**: existing `DB` (metadata, sessions, media records) plus additive
  `document_content` draft/published pointers.

See [Editor integration and rollback](docs/editor-integration.md) for the
separate-repository artifact contract, local-only upgrade tests, parity gate,
schema preflight, and rollout status. New editor integration is not yet enabled.

## Browser tools

The public **Browser Tools** menu opens `/browser-tools`, a searchable catalog
adapted from the supplied ClientScript utilities. The tools inherit the blog shell
and system light/dark theme; each engine loads only when its tool is opened.

| Route below `/browser-tools` | Utility |
|---|---|
| `/theme-designer` | Fluent ThemeGenerator with 23 palette slots, presets, preview, JSON/CSS/SharePoint PowerShell exports |
| `/formatter` | Prettier for JavaScript, TypeScript, JSON, HTML, CSS and Markdown |
| `/html-to-md` | Pasted or local HTML to Markdown, with heading/list/code-block controls |
| `/pdf-generator` | Plain-text, multi-page PDF generation with A4/Letter, orientation and preview/download |
| `/image-converter` | Canvas-based PNG/JPEG/WebP conversion, quality and aspect-locked resizing |
| `/data-converter` | Quoted CSV/JSON conversion with comma, tab and semicolon delimiters |
| `/crypto-hasher` | Text/file SHA checksums, UTF-8 Base64 and URI-component encode/decode |

Tool input and output stay in component memory and are never uploaded or saved.
Leaving a tool discards its input/results. Existing site navigation/authentication
requests and local application chunks are separate from tool processing. No new
environment variables, API keys, storage bindings or server endpoints are needed.
Fluent exports are downloaded only; they do not apply themes to the blog or execute
SharePoint commands. The existing admin Themes page retains its separate behavior.

Use HTTPS or localhost for Clipboard/WebCrypto. PDF preview depends on the browser;
download the PDF if embedding is unsupported. The built-in PDF font is limited to
basic Latin (ASCII). Images depend on available browser codecs/Canvas capacity;
JPEG gets a white background, and animations/SVGs become raster images.
CSV infers numbers/booleans (potentially losing leading zeros/precision), nested
JSON is stringified in CSV, and null/missing cells become empty. Inspect formula-like
CSV cells before opening them in a spreadsheet. SHA-1 is a legacy checksum.

Processing is uncapped, not unlimited: files are read entirely into memory and
large text, documents or images can exhaust memory or freeze the tab. The UI
reports recoverable failures without silently truncating data or uploading it.
The host `browser-tools` slug is reserved for this route; check existing content
before publishing a page with the same slug.

Focused checks (the regular build still verifies the imported editor artifact):

```powershell
node --test tests\browserTools.test.mjs
pnpm typecheck:browser-tools
pnpm exec eslint src\browser-tools src\pages\BrowserToolsPage src\routes\AppRouter.tsx
pnpm build
```

The pnpm build policy explicitly denies the new transitive `core-js` postinstall;
the browser tools do not require that install-time script.

## Setup

```powershell
pnpm install
pnpm dev
```

Use the configured existing bindings; do not create replacement buckets/databases
or repeat deployed first-admin setup. Historical pristine migration replay has
known schema gaps; follow the integration runbook's explicit preflight and
existing-site local fixture rather than treating migration replay as a clean
installation path.

## Deploy

Deployment and remote migrations require an explicit approval and verified
target. The existing scripts are:

```powershell
pnpm build
pnpm deploy
```

Cloudflare Vite emits the host SPA to `dist\client` and the generated Worker
configuration to `dist\paulibaby`. Deploy the host build, not the editor repository's
standalone GitHub Pages app. No production deployment is performed by the
integration implementation.
