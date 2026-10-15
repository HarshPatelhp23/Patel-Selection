import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import AddButton from '../components/AddButton'
import ProductViewer from '../components/ProductViewer'
import Showroom3D from '../components/Showroom3D'
import Icon from '../components/Icon'
import { L } from '../components/Link'
import { CatCard, Crumbs, Cta, Faq, PageHead, Searches, bullets } from '../components/Bits'
import NotFound from './NotFound'
import { langPath, pick, tUI, useLang, useT } from '../i18n'
import { useParams } from 'react-router-dom'
import { PAGE } from '../data/pages'
import { CAT } from '../data/categories'
import { CATEGORIES, PRODUCTS, catFromSlug, categoryPath, productBySlug, productPath, productsIn, waLink, BRANDS } from '../data/products'
import { fmtPrice, productCopy, whyBuy } from '../data/productCopy'
import { photoOf } from '../hooks/photo'
import { PHONE, PHONE_DISPLAY, absUrl } from '../config'

/** /products: every product type, a quick search box, and the brands we carry */
export function Products() {
  const lang = useLang(), t = useT()
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const hits = useMemo(() => needle ? PRODUCTS.filter(p => `${p.brand} ${p.name} ${p.category} ${CAT[p.category].name[0]}`.toLowerCase().includes(needle)) : [], [needle])
  return (
    <>
      <PageHead h1={pick(PAGE.products.h1, lang)} lead={pick(PAGE.products.lead, lang)} crumbs={[{ to: '/', label: t('home') }, { label: t('products') }]}>
        <div className="search"><Icon name="search" /><input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={t('searchPlaceholder')} aria-label={t('searchPlaceholder')} /></div>
      </PageHead>
      {needle ? (
        <section className="sec"><div className="wrap">
          <p className="sub">{t('showing', { n: hits.length })}</p>
          {hits.length ? <div className="pgrid">{hits.map(p => <ProductCard key={p.slug} p={p} />)}</div>
            : <div className="empty"><p>{t('noResults')}</p><L to="/send-a-photo" className="btn red">{t('sendPhoto')}</L></div>}
        </div></section>
      ) : (
        <>
          <Showroom3D />
          <section className="sec"><div className="wrap"><div className="cgrid big">{CATEGORIES.map(c => <CatCard key={c} c={c} />)}</div></div></section>
          <section className="sec slim"><div className="wrap narrow"><h2 className="h-sm">{pick(PAGE.products.brandsTitle, lang)}</h2><ul className="brands">{BRANDS.map(b => <li key={b}>{b}</li>)}</ul></div></section>
        </>
      )}
      <Cta />
    </>
  )
}

/** /products/chairs etc: all models of a type, with brand filter and sort */
export function CategoryPage() {
  const { cat } = useParams()
  const c = catFromSlug(cat ?? '')
  if (!c) return <NotFound />
  return <CategoryView c={c} />
}

function CategoryView({ c }: { c: (typeof CATEGORIES)[number] }) {
  const lang = useLang(), t = useT()
  const K = CAT[c]
  const all = productsIn(c)
  const brands = [...new Set(all.map(p => p.brand))]
  const [brand, setBrand] = useState('all')
  const [sort, setSort] = useState<'featured' | 'low' | 'high'>('featured')
  const list = all.filter(p => brand === 'all' || p.brand === brand).sort((a, b) => sort === 'featured' ? 0 : ((a.price ?? 1e9) - (b.price ?? 1e9)) * (sort === 'low' ? 1 : -1))
  const others = CATEGORIES.filter(x => x !== c)
  return (
    <>
      <PageHead h1={pick(K.h1, lang)} lead={pick(K.intro, lang)} crumbs={[{ to: '/', label: t('home') }, { to: '/products', label: t('products') }, { label: pick(K.name, lang) }]} />
      <section className="sec"><div className="wrap">
        <div className="toolbar">
          <div className="chips" role="group" aria-label={t('brand')}>
            <button type="button" className={`chip${brand === 'all' ? ' on' : ''}`} aria-pressed={brand === 'all'} onClick={() => setBrand('all')}>{t('allBrands')} ({all.length})</button>
            {brands.map(b => <button type="button" key={b} className={`chip${brand === b ? ' on' : ''}`} aria-pressed={brand === b} onClick={() => setBrand(b)}>{b} ({all.filter(p => p.brand === b).length})</button>)}
          </div>
          <label className="sort"><Icon name="sort" /><span className="sr">{t('sortBy')}</span>
            <select value={sort} onChange={e => setSort(e.target.value as typeof sort)}>
              <option value="featured">{t('sortFeatured')}</option><option value="low">{t('sortLow')}</option><option value="high">{t('sortHigh')}</option>
            </select></label>
        </div>
        <div className="pgrid">{list.map((p, i) => <ProductCard key={p.slug} p={p} eager={i < 4} />)}</div>
      </div></section>

      <section className="sec tint"><div className="wrap two">
        <div><h2>{t('keyFeatures')}</h2><ul className="tick">{bullets(K.features, lang).map(x => <li key={x}>{x}</li>)}</ul></div>
        <div><h2>{t('buyingGuide')}</h2><ul className="tick">{bullets(K.guide, lang).map(x => <li key={x}>{x}</li>)}</ul></div>
        <div><h2>{t('whereUse')}</h2><ul className="tick">{bullets(K.uses, lang).map(x => <li key={x}>{x}</li>)}</ul></div>
        <div><h2>{t('careTips')}</h2><ul className="tick">{bullets(K.care, lang).map(x => <li key={x}>{x}</li>)}</ul></div>
      </div></section>

      <Faq items={K.faqs.map(f => ({ q: pick(f.q, lang), a: pick(f.a, lang) }))} />
      <Searches list={bullets(K.searches, lang)} />
      <section className="sec slim"><div className="wrap">
        <h2 className="h-sm">{t('browseCats')}</h2>
        <div className="chips">{others.map(o => <L key={o} to={categoryPath(o)} className="chip">{pick(CAT[o].name, lang)}</L>)}</div>
      </div></section>
      <Cta />
    </>
  )
}

/** /products/chairs/nilkamal-paradise */
export function ProductPage() {
  const { cat, slug } = useParams()
  const p = productBySlug(slug ?? '')
  if (!p || catFromSlug(cat ?? '') !== p.category) return <NotFound />
  return <ProductView p={p} />
}

function ProductView({ p }: { p: NonNullable<ReturnType<typeof productBySlug>> }) {
  const lang = useLang(), t = useT()
  const K = CAT[p.category]
  const c = productCopy(p, lang)
  const photo = photoOf(p.slug)
  const related = productsIn(p.category).filter(x => x.slug !== p.slug).sort((a, b) => Number(b.brand === p.brand) - Number(a.brand === p.brand)).slice(0, 4)
  const label: Record<string, string> = { brand: t('brand'), type: t('type'), material: t('material'), dimensions: t('dimensions'), price: t('price'), colours: t('colours'), availability: t('availability') }
  const fill = (k: string, v: string) => k === 'price' ? (v || t('rateOnRequest')) : k === 'colours' ? t('coloursVal') : k === 'availability' ? t('availabilityVal') : v
  return (
    <>
      <section className="phead slimhead"><div className="wrap">
        <Crumbs items={[{ to: '/', label: t('home') }, { to: '/products', label: t('products') }, { to: categoryPath(p.category), label: pick(K.name, lang) }, { label: `${p.brand} ${p.name}` }]} />
      </div></section>

      <section className="sec pt0"><div className="wrap pdp">
        <ProductViewer p={p} photo={photo} alt={c.alt} />
        <div className="pdp-buy">
          <small className="brandtag">{p.brand}</small>
          <h1>{c.h1}</h1>
          <div className={`pdp-price${p.price ? '' : ' ask'}`}>{p.price ? <><span>{t('listedPrice')}</span><b>{fmtPrice(p.price)}</b></> : <b>{t('rateOnRequest')}</b>}</div>
          <p className="note">{t('priceNote')}</p>
          <AddButton p={p} big />
          <div className="pdp-links">
            <a className="btn wa" href={waLink(tUI(lang, 'waRateOne', { name: `${p.brand} ${p.name}` }) + '\n' + absUrl(langPath(lang, productPath(p))))} target="_blank" rel="noopener"><Icon name="chat" /> {t('askRate')}</a>
            <a className="btn ghost line" href={`tel:${PHONE}`}><Icon name="phone" /> {PHONE_DISPLAY}</a>
          </div>
          {p.category === 'Chairs' && <p className="deliv"><Icon name="truck" /> {t('freeDeliveryChairs')}. {t('freeDeliveryDetail')}</p>}
        </div>
      </div></section>

      <section className="sec"><div className="wrap two">
        <div className="prose"><h2>{t('aboutProduct')}</h2>{c.about.map((x, i) => <p key={i}>{x}</p>)}</div>
        <div>
          <h2>{t('specs')}</h2>
          <table className="specs"><tbody>{c.specs.map(([k, v]) => <tr key={k}><th scope="row">{label[k]}</th><td>{fill(k, v)}</td></tr>)}</tbody></table>
          {p.dims && <p className="note">{c.dimNote}</p>}
        </div>
      </div></section>

      <section className="sec tint"><div className="wrap two">
        <div><h2>{t('keyFeatures')}</h2><ul className="tick">{bullets(K.features, lang).map(x => <li key={x}>{x}</li>)}</ul></div>
        <div><h2>{t('whereUse')}</h2><ul className="tick">{bullets(K.uses, lang).map(x => <li key={x}>{x}</li>)}</ul></div>
        <div><h2>{t('careTips')}</h2><ul className="tick">{bullets(K.care, lang).map(x => <li key={x}>{x}</li>)}</ul></div>
        <div><h2>{t('whyBuy')}</h2><ul className="tick">{whyBuy(lang).map(x => <li key={x}>{x}</li>)}</ul></div>
      </div></section>

      <Faq items={c.faqs} />

      <section className="sec"><div className="wrap">
        <div className="sec-h"><h2>{t('related', { cat: pick(K.short, lang) })}</h2><L to={categoryPath(p.category)} className="more">{t('allProductsIn', { cat: pick(K.short, lang) })} →</L></div>
        <div className="pgrid">{related.map(r => <ProductCard key={r.slug} p={r} />)}</div>
      </div></section>

      <Searches list={c.searches} />
      <Cta message={tUI(lang, 'waRateOne', { name: `${p.brand} ${p.name}` })} />
    </>
  )
}

