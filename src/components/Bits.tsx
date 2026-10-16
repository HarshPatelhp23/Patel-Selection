import type { ReactNode } from 'react'
import Icon from './Icon'
import { L } from './Link'
import { pick, useLang, useT, type T3 } from '../i18n'
import { waLink, productsIn, categoryPath, type Category } from '../data/products'
import { CAT } from '../data/categories'
import LiveIcon, { CAT_KIND } from './LiveIcon'
import { photoOf } from '../hooks/photo'
import { PHONE, PHONE_DISPLAY } from '../config'
import { tUI } from '../i18n'

export function Crumbs({ items }: { items: Array<{ to?: string; label: string }> }) {
  const t = useT()
  return (
    <nav className="crumbs" aria-label={t('breadcrumb')}>
      <ol>{items.map((c, i) => <li key={i}>{c.to ? <L to={c.to}>{c.label}</L> : <span aria-current="page">{c.label}</span>}</li>)}</ol>
    </nav>
  )
}

export function PageHead({ h1, lead, crumbs, children }: { h1: string; lead?: string; crumbs: Array<{ to?: string; label: string }>; children?: ReactNode }) {
  return (
    <section className="phead"><div className="wrap">
      <Crumbs items={crumbs} />
      <h1>{h1}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div></section>
  )
}

export function Faq({ items, title }: { items: Array<{ q: string; a: string }>; title?: string }) {
  const t = useT()
  return (
    <section className="sec"><div className="wrap narrow">
      <h2>{title ?? t('faqTitle')}</h2>
      <div className="faq">{items.map((f, i) => <details key={i}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
    </div></section>
  )
}

/** The phrases people type into Google, shown as a plain "People also search for" list. */
export function Searches({ list }: { list: string[] }) {
  const t = useT()
  return (
    <section className="sec slim"><div className="wrap narrow">
      <h2 className="h-sm">{t('alsoSearched')}</h2>
      <ul className="searches">{list.map(s => <li key={s}>{s}</li>)}</ul>
    </div></section>
  )
}

export function Cta({ title, text, message }: { title?: string; text?: string; message?: string }) {
  const t = useT(), lang = useLang()
  return (
    <section className="cta"><div className="wrap">
      <div>
        <h2>{title ?? t('haveProduct')}</h2>
        <p>{text ?? t('listEmptyText')}</p>
      </div>
      <div className="cta-b">
        <a className="btn wa big" href={waLink(message ?? tUI(lang, 'waGeneral'))} target="_blank" rel="noopener"><Icon name="chat" /> WhatsApp</a>
        <a className="btn ghost big" href={`tel:${PHONE}`}><Icon name="phone" /> {PHONE_DISPLAY}</a>
      </div>
    </div></section>
  )
}

export function CatCard({ c }: { c: Category }) {
  const lang = useLang(), t = useT()
  const list = productsIn(c)
  const photo = photoOf(list[0].slug)
    return (
    <L to={categoryPath(c)} className="cc">
      <span className="cc-img"><span className="cc-ic"><LiveIcon kind={CAT_KIND[c]} size={34} /></span>{photo && <img src={photo} alt="" width={450} height={450} loading="lazy" decoding="async" />}</span>
      <span className="cc-t"><b>{pick(CAT[c].name, lang)}</b><small>{t('modelsCount', { n: list.length })}</small></span>
    </L>
  )
}

export const bullets = (a: readonly [string[], string[], string[]], l: 'en' | 'hi' | 'gu') => a[['en', 'hi', 'gu'].indexOf(l)]
export type { T3 }
