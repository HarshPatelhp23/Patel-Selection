import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { readFileSync, readdirSync } from 'node:fs'
const files = readdirSync('public/images/products').filter(f => /\.(jpe?g|png|webp)$/i.test(f)).map(f => `images/products/${f}`)
export default defineConfig({
  root: 'preview', base: './', publicDir: false,
  plugins: [react(), viteSingleFile(), {
    name: 'photo-manifest', resolveId: id => id === 'virtual:photo-manifest' ? '\0pm' : null,
    load: id => id === '\0pm' ? `export default ${JSON.stringify(files)}` : null,
  }],
  define: { __SITE_URL__: JSON.stringify('https://patel-selection.pages.dev'), __HASH_MODE__: true },
  resolve: { alias: [{ find: '/src', replacement: '/home/claude/site/patel-selection/src' }] },
  build: { outDir: '../dist-preview', emptyOutDir: true, assetsInlineLimit: 100000000 },
})
