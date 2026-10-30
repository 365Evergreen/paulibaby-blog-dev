import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "editor-vendor",
              test: /node_modules[\\/](?:@tiptap|prosemirror|lowlight|highlight\.js)[\\/]/,
              maxSize: 400 * 1024,
            },
          ],
        },
      },
    },
  },
})
