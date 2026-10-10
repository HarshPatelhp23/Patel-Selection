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

/**
 * SEO: writes robots.txt and sitemap.xml with your real domain, and puts the FAQ into the page's
 * Google "FAQ" data (JSON-LD) so it always matches the FAQ shown on the site.
 */
function seo(site: string): Plugin {
  const faq = JSON.parse(readFileSync(join(process.cwd(), 'src/data/faq.json'), 'utf8')) as Array<{ q: string; a: string }>
  const faqLd = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  })
  return {
    name: 'seo',
    transformIndexHtml: html => html.replace('%FAQ_JSONLD%', faqLd),
    buildStart() { if (site.includes('YOUR-DOMAIN')) this.warn('VITE_SITE_URL in .env.production is still the placeholder. Set your real domain before deploying.') },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n` })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source:
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url>\n    <loc>${site}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n    <image:image><image:loc>${site}/images/shop.jpg</image:loc><image:title>Patel Selection shop front, Ambli-Bopal Road, Ahmedabad</image:title></image:image>\n  </url>\n</urlset>\n` })
    },
  }
}

export default defineConfig(({ mode }) => {
  const site = (loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '')
  return {
    plugins: [react(), photoManifest(), seo(site)],
    server: {
      allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
      port: 5173,
      open: true,
    },
    build: { outDir: 'dist', sourcemap: false },
  }
})
