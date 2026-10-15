// Builds every page of the site as a real HTML file (so Google, WhatsApp and slow phones get full content immediately),
// then writes sitemap.xml and robots.txt. Runs automatically at the end of `npm run build`.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
const template = readFileSync(join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-->')) throw new Error('index.html template markers are missing')

const entry = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const { render, allPages, SITE_URL, LANGS, langPath, seoFor } = entry

const fill = (url) => {
  const r = render(url)
  return template
    .replace('<html lang="en-IN">', `<html lang="${{ en: 'en-IN', hi: 'hi-IN', gu: 'gu-IN' }[r.lang]}">`)
    .replace('<!--head-->', () => r.head)
    .replace('<!--app-->', () => r.html)
}
const write = (file, text) => { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, text) }

const pages = allPages()
for (const p of pages) {
  // "/products/chairs" is saved as products/chairs.html, which every host serves at the clean address (no .html, no trailing slash)
  write(join(dist, p.url === '/' ? 'index.html' : `${p.url.slice(1)}.html`), fill(p.url))
}
write(join(dist, '404.html'), fill('/page-not-found'))

// sitemap.xml: every public page, with its Hindi and Gujarati versions linked together (hreflang)
const today = new Date().toISOString().slice(0, 10)
const bases = [...new Set(pages.filter(p => p.sitemap).map(p => p.base))]
const loc = (l, b) => `${SITE_URL}${langPath(l, b) === '/' ? '/' : langPath(l, b)}`
const urls = []
for (const b of bases) for (const l of LANGS) {
  const alts = [...LANGS.map(x => `<xhtml:link rel="alternate" hreflang="${{ en: 'en-IN', hi: 'hi-IN', gu: 'gu-IN' }[x]}" href="${loc(x, b)}"/>`), `<xhtml:link rel="alternate" hreflang="x-default" href="${loc('en', b)}"/>`].join('')
  const pri = b === '/' ? '1.0' : b.split('/').length <= 2 ? '0.8' : '0.6'
  urls.push(`<url><loc>${loc(l, b)}</loc><lastmod>${today}</lastmod><priority>${pri}</priority>${alts}</url>`)
}
write(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`)
write(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /my-list\nDisallow: /hi/my-list\nDisallow: /gu/my-list\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered ${pages.length} pages + 404, sitemap with ${urls.length} URLs (${SITE_URL})`)
