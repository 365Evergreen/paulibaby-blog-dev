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
