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
| `/publication-designer` | Centered Tiptap document canvas, formatting ribbon, tables/images, editable covers, generated contents and direct PDF downloads |
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

### Publication designer

Open **Browser Tools > Publishing > Publisher** at `/publisher`, or choose
Publication Designer from the Browser Tools catalog. The Browser Tools navigation
groups all tools under Development, File conversion and Publishing.
Choose a blank publication or an editable newsletter, report, essay, handbook or
event programme. Search and category filters narrow the gallery. The old
`/browser-tools/publication-designer` address redirects to Publisher.
Selection opens `/publisher/editor`, a full-screen workspace without site chrome
or other-tool navigation pills. A slim icon toolbar remains visible while the
document scrolls independently on a pale-gray canvas. **Back to Publisher** retains the current in-tab
draft, and **Continue editing** resumes it; replacing a modified draft requires
confirmation. The toolbar exposes common formatting directly and groups **Insert**,
**Page layout**, **Document**, **Table formatting** and **Image formatting** in
accessible settings panels. Escape closes a panel and restores its trigger;
arrow keys, Home and End navigate toolbar buttons (selects keep native keys).
View zoom (50–150%) changes the canvas only; font family and body size change
the whole publication and PDF. On smaller screens the toolbar scrolls horizontally,
without widening the page. Use headings, bold/italic/underline, alignment, bullet/numbered
lists, quotes and dividers; choose paper size, orientation, 10–30 mm margins,
one/two columns, serif/sans-serif, 9–16 pt body text, line spacing, running title
and page numbers.
Text flows down each column before advancing to the next page. Explicit page
breaks always start a new physical page (including blank pages when consecutive).
The publication title is PDF metadata and an optional running header; use a
heading in the editor for a display title.

The centered paper canvas is a **continuous editing view**, not an exact PDF
pagination preview. It uses the chosen paper dimensions, typeface, spacing and
columns, and reflows on small screens. There is deliberately no side-by-side PDF
preview. The PDF engine measures the document after a short typing pause and
reports the physical page count. Download is disabled while edits/image loads
are pending or invalid; it downloads the generated blob without a print dialog,
raster screenshots, backend calls or tool-data uploads. Text stays selectable;
images are embedded at their original resolution and scaled proportionally to
fit the column. Print the PDF at actual size.

**Tables** offer grid/striped/minimal styles, header toggling, row/column
insertion/deletion, cell backgrounds and the normal inline/alignment controls.
Columns have equal width; cells contain paragraphs, not nested lists, headings,
tables or images. Rows stay intact and the first header row repeats at column/page
boundaries. A row taller than the printable area, merged cells or columns too
narrow for the selected type size produce a visible error instead of clipping.

**Images** are inserted using local PNG/JPEG files only, with editable descriptions
and 25/50/75/100-percent column width. File read/decode/export errors are explicit;
failed insertions preserve the document. Web-image pastes and file drops are
rejected with guidance to use Insert image, avoiding hidden remote image requests.
PDF images retain pixels but are not tagged with accessible alt text.

**Covers** have editorial, minimal and report templates. The publication title,
author, edition label and subtitle remain editable. Switching/removing a cover
never replaces the body. The generated **table of contents** derives from heading
levels 1–3 (configurable depth). A two-pass layout uses a fixed page-number gutter,
so its physical page numbers include cover/contents pages and match actual heading
destinations even when the contents spans multiple pages. Cover pages omit the
running title/footer but still count toward physical numbering.

This is a first version, not a desktop-publishing replacement.
Fonts support basic Latin (ASCII) only; unsupported characters produce a visible
error and block export rather than being replaced. Pasted content is restricted
to the supported schema; unsupported formatting, links and embeds are not
preserved. Lists use hyphen markers; quotes are indented and italicized. Headings
are kept with a following line where practical, but full widow/orphan control,
automatic hyphenation, custom fonts, bleed and crop marks are not offered.
All content and settings are in tab memory only, with no persistent project save
or site-content integration. Modified drafts warn before refreshing or leaving
Publisher; download first. The generated PDF is an output, not a re-importable
editable project file.

Focused publication checks:

```powershell
node --test tests\publicationDesigner.test.mjs tests\browserTools.test.mjs
pnpm typecheck:browser-tools
pnpm exec eslint src\browser-tools src\routes\AppRouter.tsx
```

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
