import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { L } from '../components/Link'
import ListPanel from '../components/ListPanel'
import NotFound from './NotFound'
import { Crumbs, Cta, PageHead, Searches, bullets } from '../components/Bits'
import { pick, tUI, useLang, useT } from '../i18n'
import { PAGE, AREAS } from '../data/pages'
import { CAT } from '../data/categories'
import { CATEGORIES, categoryPath, waLink } from '../data/products'
import { DEPTS, deptBySlug } from '../data/departments'
import { useList } from '../state/list'
import { ADDRESS, HOURS, IMG_BASE, MAPS_EMBED, MAPS_LINK, OWNER, PHONE, PHONE_DISPLAY } from '../config'

export function Departments() {
  const lang = useLang(), t = useT(), P = PAGE.departments
  return (
    <>
      <PageHead h1={pick(P.h1, lang)} lead={pick(P.lead, lang)} crumbs={[{ to: '/', label: t('home') }, { label: t('departments') }]} />
      <section className="sec"><div className="wrap"><div className="dgrid big">
        {DEPTS.map(d => (
          <L key={d.slug} to={`/departments/${d.slug}`} className="dc"><span className="dc-i"><Icon name={d.icon} /></span><span><b>{pick(d.name, lang)}</b><small>{bullets(d.items, lang).slice(0, 3).join(', ')}</small></span><Icon name="right" /></L>
        ))}
      </div></div></section>
      <Cta />
    </>
  )
}

export function Department() {
  const { slug } = useParams()
  const d = deptBySlug(slug ?? '')
  const lang = useLang(), t = useT(), list = useList()
  if (!d) return <NotFound />
  const name = pick(d.name, lang)
  const on = list.qtyOf(d.key) > 0
  return (
    <>
      <PageHead h1={`${name}, ${pick(['Bopal, Ahmedabad', 'बोपल, अहमदाबाद', 'બોપલ, અમદાવાદ'], lang)}`} lead={pick(d.intro, lang)}
        crumbs={[{ to: '/', label: t('home') }, { to: '/departments', label: t('departments') }, { label: name }]} />
      <section className="sec"><div className="wrap two">
        <div><h2>{pick(PAGE.departments.typicalItems, lang)}</h2><ul className="tick">{bullets(d.items, lang).map(x => <li key={x}>{x}</li>)}</ul><p className="note">{pick(PAGE.departments.stockNote, lang)}</p></div>
        <div className="box">
          <h2>{pick(PAGE.departments.askAbout, lang).replace('{name}', name)}</h2>
          <div className="stack">
            {d.slug === 'moulded-furniture'
              ? <div className="chips">{CATEGORIES.map(c => <L key={c} to={categoryPath(c)} className="chip">{pick(CAT[c].name, lang)}</L>)}</div>
              : <button type="button" className={`btn ${on ? 'ghost line' : 'red'} big`} aria-pressed={on} onClick={() => on ? list.remove(d.key) : list.add({ key: d.key, label: d.name[0] })}><Icon name={on ? 'check' : 'plus'} /> {on ? t('inList') : t('addToList')}</button>}
            <a className="btn wa big" href={waLink(`${tUI(lang, 'waHello')}. ${pick(PAGE.departments.askAbout, lang).replace('{name}', d.name[0])}`)} target="_blank" rel="noopener"><Icon name="chat" /> WhatsApp</a>
            <a className="btn ghost line big" href={`tel:${PHONE}`}><Icon name="phone" /> {PHONE_DISPLAY}</a>
          </div>
        </div>
      </div></section>
      <Searches list={bullets(d.searches, lang)} />
      <section className="sec slim"><div className="wrap"><h2 className="h-sm">{t('departments')}</h2>
        <div className="chips">{DEPTS.filter(x => x.slug !== d.slug).map(x => <L key={x.slug} to={`/departments/${x.slug}`} className="chip">{pick(x.name, lang)}</L>)}</div></div></section>
      <Cta />
    </>
  )
}

export function MyList() {
  const t = useT()
  return (
    <>
      <section className="phead"><div className="wrap"><Crumbs items={[{ to: '/', label: t('home') }, { label: t('myList') }]} /><h1>{t('myList')}</h1></div></section>
      <section className="sec pt0"><div className="wrap narrow card"><ListPanel /></div></section>
    </>
  )
}

export function About() {
  const lang = useLang(), t = useT(), P = PAGE.about
  return (
    <>
      <PageHead h1={pick(P.h1, lang)} lead={pick(P.lead, lang)} crumbs={[{ to: '/', label: t('home') }, { label: t('about') }]} />
      <section className="sec"><div className="wrap about-s">
        <img src={`${IMG_BASE}founder.jpg`} alt={`${OWNER}, owner of Patel Selection, Ahmedabad`} width={600} height={750} loading="lazy" decoding="async" />
        <div>
          <h2>{pick(P.headline, lang)}</h2>
          <p>{pick(P.story, lang)}</p>
          <p><b>{OWNER}</b> · <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></p>
        </div>
      </div></section>
      <section className="sec tint"><div className="wrap">
        <div className="why">{P.points.map(([a, b], i) => <div key={i} className="why-c"><h3>{pick(a, lang)}</h3><p>{pick(b, lang)}</p></div>)}</div>
      </div></section>
      <section className="sec"><div className="wrap narrow"><h2>{pick(P.what, lang)}</h2><p>{pick(P.whatText, lang)}</p>
        <div className="row"><L to="/products" className="btn red">{t('products')}</L><L to="/departments" className="btn ghost">{t('departments')}</L></div></div></section>
      <Cta />
    </>
  )
}

export function SendPhoto() {
  const lang = useLang(), t = useT(), P = PAGE.photo
  const input = useRef<HTMLInputElement>(null)
  const msg = tUI(lang, 'waPhoto')
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean }
    try {
      if (nav.canShare?.({ files: [f] })) { await nav.share({ files: [f], text: msg }); return }
    } catch (err) { if ((err as Error).name === 'AbortError') return }
    window.open(waLink(msg), '_blank', 'noopener')
  }
  return (
    <>
      <PageHead h1={pick(P.h1, lang)} lead={pick(P.lead, lang)} crumbs={[{ to: '/', label: t('home') }, { label: t('sendPhoto') }]} />
      <section className="sec"><div className="wrap two">
        <div>
          <ol className="bigsteps"><li>{t('photoStep1')}</li><li>{t('photoStep2')}</li><li>{t('photoStep3')}</li></ol>
          <input ref={input} type="file" accept="image/*" hidden onChange={onFile} />
          <div className="stack">
            <button type="button" className="btn red big" onClick={() => input.current?.click()}><Icon name="camera" /> {t('choosePhoto')}</button>
            <a className="btn wa big" href={waLink(msg)} target="_blank" rel="noopener"><Icon name="chat" /> {t('openWhatsApp')}</a>
          </div>
          <p className="note">{t('photoHelp')}</p>
        </div>
        <div className="box"><h2>{pick(P.tips, lang)}</h2><ul className="tick">{P.tipList.map((x, i) => <li key={i}>{pick(x, lang)}</li>)}</ul></div>
      </div></section>
    </>
  )
}

export function Visit() {
  const lang = useLang(), t = useT(), P = PAGE.visit
  return (
    <>
      <PageHead h1={pick(P.h1, lang)} lead={pick(P.lead, lang)} crumbs={[{ to: '/', label: t('home') }, { label: t('visit') }]} />
      <section className="sec"><div className="wrap two">
        <div className="box">
          <h2>Patel Selection</h2>
          <dl className="info">
            <dt>{t('address')}</dt><dd><address>{ADDRESS.street}, {ADDRESS.locality}-{ADDRESS.postal}, {ADDRESS.region}, India<br /><small>{t('landmark')}</small></address></dd>
            <dt>{t('owner')}</dt><dd>{OWNER}</dd>
            <dt>{t('call')}</dt><dd><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></dd>
            <dt>{t('timings')}</dt><dd>{HOURS ? HOURS.text : t('timingsAsk')}</dd>
          </dl>
          <div className="stack">
            <a className="btn red big" href={MAPS_LINK} target="_blank" rel="noopener"><Icon name="pin" /> {t('getDirections')}</a>
            <a className="btn ghost line big" href={`tel:${PHONE}`}><Icon name="phone" /> {t('callNow')}</a>
            <a className="btn wa big" href={waLink(tUI(lang, 'waGeneral'))} target="_blank" rel="noopener"><Icon name="chat" /> WhatsApp</a>
          </div>
        </div>
        <div className="map"><iframe src={MAPS_EMBED} title={t('mapTitle')} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </div></section>
    </>
  )
}

export function Areas() {
  const lang = useLang(), t = useT(), P = PAGE.areas
  return (
    <>
      <PageHead h1={pick(P.h1, lang)} lead={pick(P.lead, lang)} crumbs={[{ to: '/', label: t('home') }, { label: t('areas') }]} />
      <section className="sec"><div className="wrap narrow">
        <ul className="areas">{AREAS.map(a => <li key={a[0]}>{pick(a, lang)}</li>)}</ul>
        <p className="note">{pick(P.note, lang)}</p>
        <div className="row"><L to="/products" className="btn red">{t('products')}</L><L to="/visit" className="btn ghost">{t('visit')}</L></div>
      </div></section>
      <Cta />
    </>
  )
}
