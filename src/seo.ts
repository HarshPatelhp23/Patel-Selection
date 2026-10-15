import { LANGS, LANG_META, langPath, pick, splitLang, type Lang } from './i18n'
import { ADDRESS, HOURS, OWNER, PHONE, SAME_AS, SITE_URL, absUrl } from './config'
import { CAT } from './data/categories'
import { CATEGORIES, CAT_SLUG, PRODUCTS, catFromSlug, categoryPath, productBySlug, productPath, productsIn } from './data/products'
import { DEPTS, deptBySlug } from './data/departments'
import { HOME_FAQ, PAGE } from './data/pages'
import { fmtPrice, productCopy } from './data/productCopy'
import { photoOf } from './hooks/photo'
import { tUI } from './i18n'

export interface Seo {
  title: string
  description: string
  canonical: string
  lang: Lang
  basePath: string
  alternates: Array<{ hreflang: string; href: string }>
  image: string
  ogType: 'website' | 'product' | 'article'
  noindex: boolean
  notFound: boolean
  jsonld: object[]
}

const OG_DEFAULT = '/images/og-image.jpg'
const STORE_ID = `${SITE_URL}/#store`

/** All pages of the site, without the language prefix. Every one of these is built as a real HTML file. */
export function basePaths(): string[] {
  return [
    '/', '/products', ...CATEGORIES.map(categoryPath), ...PRODUCTS.map(productPath),
    '/departments', ...DEPTS.map(d => `/departments/${d.slug}`),
    '/about', '/send-a-photo', '/visit', '/areas', '/dining-set-builder', '/my-list',
  ]
}
export const SITEMAP_EXCLUDE = new Set(['/my-list'])

function storeSchema(lang: Lang) {
  const o: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Store', 'HomeGoodsStore'],
    '@id': STORE_ID,
    name: 'Patel Selection',
    alternateName: ['Patel Selection Ahmedabad', 'पटेल सेलेक्शन', 'પટેલ સિલેક્શન'],
    description: pick(PAGE.home.desc, lang),
    url: absUrl(langPath(lang, '/')),
    image: [absUrl(OG_DEFAULT), absUrl('/images/shop.jpg')],
    logo: absUrl('/icon-512.png'),
    telephone: PHONE,
    founder: { '@type': 'Person', name: OWNER },
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    address: { '@type': 'PostalAddress', streetAddress: ADDRESS.street, addressLocality: ADDRESS.locality, addressRegion: ADDRESS.region, postalCode: ADDRESS.postal, addressCountry: ADDRESS.country },
    areaServed: ['Bopal', 'South Bopal', 'Ambli', 'Shela', 'Shilaj', 'Science City', 'Thaltej', 'SG Highway', 'Ahmedabad'].map(n => ({ '@type': 'Place', name: n })),
    knowsLanguage: ['en', 'hi', 'gu'],
    makesOffer: undefined,
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Patel Selection products',
      itemListElement: CATEGORIES.map(c => ({ '@type': 'OfferCatalog', name: CAT[c].name[0], url: absUrl(langPath(lang, categoryPath(c))) })),
    },
  }
  if (SAME_AS.length) o.sameAs = SAME_AS
  if (HOURS) o.openingHoursSpecification = { '@type': 'OpeningHoursSpecification', dayOfWeek: HOURS.days, opens: HOURS.opens, closes: HOURS.closes }
  return o
}

const crumbsSchema = (items: Array<[string, string]>) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absUrl(path) })),
})
const faqSchema = (items: Array<{ q: string; a: string }>) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

/** Everything Google and social apps need to know about one page. `pathname` includes the language prefix. */
export function seoFor(pathname: string): Seo {
  const { lang, path } = splitLang(pathname.replace(/\/$/, '') || '/')
  const L = (p: string) => langPath(lang, p)
  const home = tUI(lang, 'home')
  let title = '', description = '', image = OG_DEFAULT, ogType: Seo['ogType'] = 'website', noindex = false, notFound = false
  const jsonld: object[] = []
  let known = true
  const seg = path.split('/').filter(Boolean)

  const homeCrumb: [string, string] = [home, L('/')]

  if (path === '/') {
    title = pick(PAGE.home.title, lang); description = pick(PAGE.home.desc, lang)
    jsonld.push(storeSchema(lang), { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: absUrl('/'), name: 'Patel Selection', inLanguage: LANGS.map(l => LANG_META[l].html), publisher: { '@id': STORE_ID } })
    jsonld.push(faqSchema(HOME_FAQ.map(f => ({ q: pick(f.q, lang), a: pick(f.a, lang) }))))
  } else if (path === '/products') {
    title = pick(PAGE.products.title, lang); description = pick(PAGE.products.desc, lang)
    jsonld.push(crumbsSchema([homeCrumb, [tUI(lang, 'products'), L(path)]]))
    jsonld.push({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: pick(PAGE.products.h1, lang), url: absUrl(L(path)), mainEntity: { '@type': 'ItemList', itemListElement: CATEGORIES.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: CAT[c].name[0], url: absUrl(L(categoryPath(c))) })) } })
  } else if (seg[0] === 'products' && seg.length === 2) {
    const c = catFromSlug(seg[1])
    if (!c) known = false
    else {
      const K = CAT[c]
      title = pick(K.title, lang); description = pick(K.desc, lang)
      const first = photoOf(productsIn(c)[0].slug); if (first) image = first
      jsonld.push(crumbsSchema([homeCrumb, [tUI(lang, 'products'), L('/products')], [pick(K.name, lang), L(path)]]))
      jsonld.push({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: pick(K.h1, lang), url: absUrl(L(path)), isPartOf: { '@id': `${SITE_URL}/#website` }, mainEntity: { '@type': 'ItemList', itemListElement: productsIn(c).map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: `${p.brand} ${p.name}`, url: absUrl(L(productPath(p))) })) } })
      jsonld.push(faqSchema(K.faqs.map(f => ({ q: pick(f.q, lang), a: pick(f.a, lang) }))))
    }
  } else if (seg[0] === 'products' && seg.length === 3) {
    const p = productBySlug(seg[2])
    if (!p || CAT_SLUG[p.category] !== seg[1]) known = false
    else {
      const c = productCopy(p, lang)
      title = c.title; description = c.desc; ogType = 'product'
      const photo = photoOf(p.slug); if (photo) image = photo
      const prod: Record<string, unknown> = {
        '@context': 'https://schema.org', '@type': 'Product', name: `${p.brand} ${p.name}`, description: c.about.join(' '),
        sku: p.slug, category: CAT[p.category].name[0], brand: { '@type': 'Brand', name: p.brand },
        image: photo ? [absUrl(photo)] : undefined, url: absUrl(L(path)), material: 'Plastic',
      }
      if (p.price) prod.offers = { '@type': 'Offer', price: p.price, priceCurrency: 'INR', url: absUrl(L(path)), itemCondition: 'https://schema.org/NewCondition', seller: { '@id': STORE_ID } }
      jsonld.push(prod)
      jsonld.push(crumbsSchema([homeCrumb, [tUI(lang, 'products'), L('/products')], [pick(CAT[p.category].name, lang), L(categoryPath(p.category))], [`${p.brand} ${p.name}`, L(path)]]))
      jsonld.push(faqSchema(c.faqs))
    }
  } else if (path === '/departments') {
    title = pick(PAGE.departments.title, lang); description = pick(PAGE.departments.desc, lang)
    jsonld.push(crumbsSchema([homeCrumb, [tUI(lang, 'departments'), L(path)]]))
  } else if (seg[0] === 'departments' && seg.length === 2) {
    const d = deptBySlug(seg[1])
    if (!d) known = false
    else {
      title = pick(d.title, lang); description = pick(d.desc, lang)
      jsonld.push(crumbsSchema([homeCrumb, [tUI(lang, 'departments'), L('/departments')], [pick(d.name, lang), L(path)]]))
    }
  } else if (path === '/about') {
    title = pick(PAGE.about.title, lang); description = pick(PAGE.about.desc, lang); image = '/images/founder.jpg'
    jsonld.push(storeSchema(lang), crumbsSchema([homeCrumb, [tUI(lang, 'about'), L(path)]]))
  } else if (path === '/send-a-photo') {
    title = pick(PAGE.photo.title, lang); description = pick(PAGE.photo.desc, lang)
    jsonld.push(crumbsSchema([homeCrumb, [tUI(lang, 'sendPhoto'), L(path)]]))
  } else if (path === '/visit') {
    title = pick(PAGE.visit.title, lang); description = pick(PAGE.visit.desc, lang); image = '/images/shop.jpg'
    jsonld.push(storeSchema(lang), crumbsSchema([homeCrumb, [tUI(lang, 'visit'), L(path)]]))
  } else if (path === '/areas') {
    title = pick(PAGE.areas.title, lang); description = pick(PAGE.areas.desc, lang)
    jsonld.push(storeSchema(lang), crumbsSchema([homeCrumb, [tUI(lang, 'areas'), L(path)]]))
  } else if (path === '/dining-set-builder') {
    title = pick(PAGE.builder.title, lang); description = pick(PAGE.builder.desc, lang)
    jsonld.push(crumbsSchema([homeCrumb, [tUI(lang, 'builderLink'), L(path)]]))
  } else if (path === '/my-list') {
    title = pick(PAGE.myList.title, lang); description = pick(PAGE.myList.desc, lang); noindex = true
  } else known = false

  if (!known) {
    notFound = true; noindex = true
    title = `${tUI(lang, 'notFoundTitle')} | Patel Selection`; description = tUI(lang, 'notFoundText')
  }
  const canonicalPath = known ? L(path) : L('/')
  return {
    title, description, lang, basePath: path, noindex, notFound, ogType,
    canonical: absUrl(canonicalPath),
    alternates: known && !noindex ? [...LANGS.map(l => ({ hreflang: LANG_META[l].hreflang, href: absUrl(langPath(l, path)) })), { hreflang: 'x-default', href: absUrl(path) }] : [],
    image: absUrl(image),
    jsonld,
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const FONT_BASE = 'family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Figtree:wght@400..800'
const FONT_EXTRA: Record<Lang, string> = { en: '', hi: '&family=Noto+Sans+Devanagari:wght@400..800', gu: '&family=Noto+Sans+Gujarati:wght@400..800' }

/** The <head> content for a page (used when the page files are built). */
export function headHtml(s: Seo): string {
  const fonts = `https://fonts.googleapis.com/css2?${FONT_BASE}${FONT_EXTRA[s.lang]}&display=swap`
  const h = [
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}" />`,
    `<meta name="robots" content="${s.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    `<link rel="canonical" href="${esc(s.canonical)}" />`,
    ...s.alternates.map(a => `<link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`),
    `<meta name="theme-color" content="#0a2a8f" />`,
    `<meta name="geo.region" content="IN-GJ" /><meta name="geo.placename" content="Bopal, Ahmedabad" />`,
    `<meta property="og:site_name" content="Patel Selection" />`,
    `<meta property="og:type" content="${s.ogType === 'product' ? 'product' : 'website'}" />`,
    `<meta property="og:title" content="${esc(s.title)}" />`,
    `<meta property="og:description" content="${esc(s.description)}" />`,
    `<meta property="og:url" content="${esc(s.canonical)}" />`,
    `<meta property="og:image" content="${esc(s.image)}" />`,
    `<meta property="og:locale" content="${LANG_META[s.lang].og}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(s.title)}" />`,
    `<meta name="twitter:description" content="${esc(s.description)}" />`,
    `<meta name="twitter:image" content="${esc(s.image)}" />`,
    `<link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<link rel="manifest" href="/manifest.webmanifest" />`,
    `<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
    `<link rel="stylesheet" href="${fonts}" media="print" onload="this.media='all'" /><noscript><link rel="stylesheet" href="${fonts}" /></noscript>`,
    `<script type="application/ld+json" id="ld">${JSON.stringify(s.jsonld.length === 1 ? s.jsonld[0] : s.jsonld).replace(/</g, '\\u003c')}</script>`,
  ]
  return h.join('\n    ')
}

/** Same details, applied in the browser when a visitor moves between pages without a reload. */
export function applySeo(s: Seo) {
  const d = document
  d.title = s.title
  d.documentElement.lang = LANG_META[s.lang].html
  const set = (sel: string, attr: string, val: string) => d.head.querySelector(sel)?.setAttribute(attr, val)
  set('meta[name="description"]', 'content', s.description)
  set('meta[name="robots"]', 'content', s.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
  set('link[rel="canonical"]', 'href', s.canonical)
  set('meta[property="og:title"]', 'content', s.title); set('meta[name="twitter:title"]', 'content', s.title)
  set('meta[property="og:description"]', 'content', s.description); set('meta[name="twitter:description"]', 'content', s.description)
  set('meta[property="og:url"]', 'content', s.canonical)
  set('meta[property="og:image"]', 'content', s.image); set('meta[name="twitter:image"]', 'content', s.image)
  d.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(n => n.remove())
  s.alternates.forEach(a => { const l = d.createElement('link'); l.rel = 'alternate'; l.hreflang = a.hreflang; l.href = a.href; d.head.appendChild(l) })
  const ld = d.getElementById('ld'); if (ld) ld.textContent = JSON.stringify(s.jsonld.length === 1 ? s.jsonld[0] : s.jsonld)
}

export const fmt = fmtPrice
