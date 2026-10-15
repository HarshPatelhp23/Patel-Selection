import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { basePaths, headHtml, seoFor, SITEMAP_EXCLUDE } from './seo'
import { LANGS, langPath } from './i18n'
import { SITE_URL } from './config'

/** Called by scripts/prerender.mjs once for every page */
export function render(url: string) {
  const seo = seoFor(url)
  const html = renderToString(<StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></StaticRouter>)
  return { html, head: headHtml(seo), lang: seo.lang, seo }
}

export function allPages() {
  const out: Array<{ url: string; sitemap: boolean; base: string }> = []
  for (const l of LANGS) for (const b of basePaths()) out.push({ url: langPath(l, b), base: b, sitemap: !SITEMAP_EXCLUDE.has(b) })
  return out
}
export { SITE_URL, LANGS, langPath, seoFor, basePaths }
