import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

/** Lists every photo in public/images so product photos are matched by file name (see README). */
function photoManifest(): Plugin {
  const ID = 'virtual:photo-manifest', RID = '\0' + ID
  const pub = join(process.cwd(), 'public'), dir = join(pub, 'images')
  const scan = (d: string): string[] => {
    let out: string[] = []
    try {
      for (const f of readdirSync(d)) {
        const p = join(d, f)
        if (statSync(p).isDirectory()) out = out.concat(scan(p))
        else if (/\.(jpe?g|png|webp)$/i.test(f)) out.push(relative(pub, p).split(sep).join('/'))
      }
    } catch { /* folder missing */ }
    return out
  }
  return {
    name: 'photo-manifest',
    resolveId: id => (id === ID ? RID : null),
    load: id => (id === RID ? `export default ${JSON.stringify(scan(dir))}` : null),
    configureServer(server) {
      server.watcher.add(dir)
      const reload = (f: string) => {
        if (!f.includes(`${sep}images${sep}`) && !f.includes('/images/')) return
        const m = server.moduleGraph.getModuleById(RID)
        if (m) { server.moduleGraph.invalidateModule(m); server.ws.send({ type: 'full-reload' }) }
      }
      server.watcher.on('add', reload); server.watcher.on('unlink', reload)
    },
  }
}

/** Dev server only: the page template has two markers that the build step fills in (see scripts/prerender.mjs). */
function devTemplate(): Plugin {
  return {
    name: 'dev-template',
    apply: 'serve',
    transformIndexHtml: { order: 'pre', handler: html => html.replace('<!--head-->', '<title>Patel Selection (dev)</title>').replace('<!--app-->', '') },
  }
}

export default defineConfig(({ mode }) => {
  // Website address: site.config.json (or, optionally, a VITE_SITE_URL environment variable on your host)
  let configured = ''
  try { configured = JSON.parse(readFileSync(join(process.cwd(), 'site.config.json'), 'utf8')).siteUrl || '' } catch { /* file missing */ }
  const site = (mode === 'production' ? configured : (loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL || 'http://localhost:5173')).replace(/\/$/, '')
  return {
    plugins: [react(), photoManifest(), devTemplate()],
    define: { __SITE_URL__: JSON.stringify(site), __HASH_MODE__: false },
    server: {
      allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
      port: 5173,
      open: true,
    },
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: 'entry-server.js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
      },
    },
  }
})
