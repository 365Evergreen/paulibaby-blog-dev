# Paulibaby blog

React + Vite on a Cloudflare Worker (Hono API), pnpm, vanilla CSS modules.

- **Public**: `/` (post list), `/posts/:slug`
- **Admin**: `/admin` (password login, signed HttpOnly cookie), tiptap core editor with custom `Callout` and `ImageUpload` extensions
- **R2**: `CONTENT` (post bodies as tiptap JSON), `UPLOADS` (images, served at `/api/media/*`)
- **D1**: `DB` (post metadata / indexing, upload records)

## Setup

```sh
pnpm install
cp .dev.vars.example .dev.vars   # set ADMIN_PASSWORD and SESSION_SECRET
pnpm db:migrate:local
pnpm dev
```

## Deploy

```sh
pnpm wrangler d1 create paulibaby-blog      # put database_id in wrangler.jsonc
pnpm wrangler r2 bucket create paulibaby-blog-content
pnpm wrangler r2 bucket create paulibaby-blog-uploads
pnpm wrangler secret put ADMIN_PASSWORD
pnpm wrangler secret put SESSION_SECRET
pnpm db:migrate
pnpm deploy
```
