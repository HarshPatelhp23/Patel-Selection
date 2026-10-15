import Hero from '../components/Hero'
import Showroom3D from '../components/Showroom3D'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'
import { L } from '../components/Link'
import { CatCard, Cta, Faq } from '../components/Bits'
import { pick, useLang, useT } from '../i18n'
import { PAGE, HOME_FAQ } from '../data/pages'
import { BRANDS, CATEGORIES, productBySlug } from '../data/products'
import { DEPTS } from '../data/departments'
import { AREAS } from '../data/pages'
import { photoOf } from '../hooks/photo'
import { IMG_BASE, PHONE, PHONE_DISPLAY, OWNER } from '../config'

const POPULAR = ['nilkamal-paradise', 'cello-unique', 'sky-titan', 'national-polo-baby-chair', 'national-party-round-roma-dining-table', 'nilkamal-shahensha', 'national-spectra', 'national-power-series-4-foot']

export default function Home() {
  const lang = useLang(), t = useT()
  const P = PAGE.home
  return (
    <>
      <Hero />

      <Showroom3D />

      <section className="sec"><div className="wrap">
        <div className="sec-h"><h2>{t('browseCats')}</h2><L to="/products" className="more">{t('seeAll')} →</L></div>
        <div className="cgrid">{CATEGORIES.map(c => <CatCard key={c} c={c} />)}</div>
      </div></section>

      <section className="sec build"><div className="wrap build-in">
        <div><h2>{t('builderLink')}</h2><p>{pick(PAGE.builder.teaser, lang)}</p></div>
        <L to="/dining-set-builder" className="btn red big"><Icon name="cube" /> {t('builderLink')}</L>
      </div></section>

      <section className="sec tint"><div className="wrap">
        <div className="sec-h"><div><h2>{t('popular')}</h2><p className="sub">{pick(P.popularSub, lang)}</p></div></div>
        <div className="pgrid">{POPULAR.map(s => { const p = productBySlug(s); return p ? <ProductCard key={s} p={p} /> : null })}</div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-h"><div><h2>{t('departments')}</h2><p className="sub">{pick(P.deptsIntro, lang)}</p></div></div>
        <div className="dgrid">
          {DEPTS.map(d => (
            <L key={d.slug} to={`/departments/${d.slug}`} className="dc"><span className="dc-i"><Icon name={d.icon} /></span><b>{pick(d.name, lang)}</b><Icon name="right" /></L>
          ))}
        </div>
      </div></section>

      <section className="sec tint"><div className="wrap">
        <h2>{t('whyUs')}</h2>
        <div className="why">
          {P.why.map((w, i) => <div key={i} className="why-c"><span className="dc-i"><Icon name={w.i} /></span><h3>{pick(w.t, lang)}</h3><p>{pick(w.d, lang)}</p></div>)}
        </div>
        <div className="steps">
          <h3>{t('howOrder')}</h3>
          <ol><li>{t('howOrder1')}</li><li>{t('howOrder2')}</li><li>{t('howOrder3')}</li></ol>
        </div>
      </div></section>

      <section className="sec"><div className="wrap about-s">
        <img src={`${IMG_BASE}shop.jpg`} alt="Patel Selection shop, Ambli-Bopal Road, Ahmedabad" width={800} height={600} loading="lazy" decoding="async" />
        <div>
          <h2>{pick(PAGE.about.h1, lang)}</h2>
          <p>{pick(PAGE.about.story, lang)}</p>
          <div className="row"><L to="/about" className="btn ghost">{t('about')} →</L><L to="/visit" className="btn ghost">{t('visit')} →</L></div>
        </div>
      </div></section>

      <section className="sec tint"><div className="wrap narrow">
        <h2>{t('trustedBrands')}</h2>
        <ul className="brands">{BRANDS.map(b => <li key={b}>{b}</li>)}</ul>
      </div></section>

      <Cta title={t('bulkOrder')} text={pick(P.bulk, lang)} />
      <Faq items={HOME_FAQ.map(f => ({ q: pick(f.q, lang), a: pick(f.a, lang) }))} />

      <section className="sec slim"><div className="wrap narrow">
        <h2 className="h-sm">{t('areas')}</h2>
        <p className="sub">{AREAS.map(a => pick(a, lang)).join(' · ')}. <L to="/areas">{t('seeAll')} →</L></p>
        <p className="sub">{OWNER} · <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></p>
      </div></section>
    </>
  )
}
