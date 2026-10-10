import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

/**
 * Lists every photo found in public/images (any sub-folder) so the website can match
 * product photos by file name without guessing. Adding or removing a photo while
 * `npm run dev` is running reloads the page automatically.
 */
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

export default defineConfig({
  plugins: [react(), photoManifest()],
  server: {
    allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
