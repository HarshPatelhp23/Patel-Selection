import { useEffect, useMemo, useState } from 'react'
import Icon from '../components/Icon'
import { L } from '../components/Link'
import { itemOf, Stepper } from '../components/AddButton'
import { Cta, PageHead, Searches, bullets } from '../components/Bits'
import { use3D, calm } from '../hooks/use3d'
import { pick, useLang, useT } from '../i18n'
import { PAGE } from '../data/pages'
import { PRODUCTS, productPath, waLink } from '../data/products'
import { fmtPrice } from '../data/productCopy'
import { PALETTE } from '../three/palette'
import { photoOf } from '../hooks/photo'
import { useList } from '../state/list'
import { buildMessage } from '../state/message'

const TABLES = PRODUCTS.filter(p => p.category === 'Dining Tables')
const CHAIRS = PRODUCTS.filter(p => p.category === 'Chairs')
const SW = (v: string, set: (c: string) => void, label: string) => (
  <div className="sw" role="group" aria-label={label}>{PALETTE.map(c => <button key={c} type="button" style={{ background: c }} className={c === v ? 'on' : ''} aria-label={c} aria-pressed={c === v} onClick={() => set(c)} />)}</div>
)

/** Build a dining set: the table and chairs appear in 3D, and the whole set goes to the list in one tap. */
export default function Builder() {
  const t = useT(), lang = useLang(), list = useList(), P = PAGE.builder
  const [shape, setShape] = useState<'round' | 'rect'>('round')
  const [tableSlug, setTableSlug] = useState('national-party-round-roma-dining-table')
  const [chairSlug, setChairSlug] = useState('nilkamal-paradise')
  const [n, setN] = useState(4)
  const [color, setColor] = useState('#e8161c')
  const [tcolor, setTcolor] = useState('#dfe6fb')
  const [done, setDone] = useState(false)
  const tables = useMemo(() => TABLES.filter(p => (shape === 'round') === (p.kind === 'round')), [shape])
  const table = TABLES.find(p => p.slug === tableSlug) ?? tables[0]
  const chair = CHAIRS.find(p => p.slug === chairSlug)!
  useEffect(() => { if (!tables.some(p => p.slug === tableSlug)) setTableSlug(tables[0].slug) }, [tables, tableSlug])

  const [off, setOff] = useState(false)
  useEffect(() => { if (calm()) setOff(true) }, [])
  const { cv, host, api, status } = use3D((c, h) => import('../three/builder').then(m => m.mountBuilder(c, h, { shape, chairs: n, color, tableColor: tcolor })), !off)
  useEffect(() => { api?.set({ shape, chairs: n, color, tableColor: tcolor }) }, [api, shape, n, color, tcolor])

  const total = table.price != null && chair.price != null ? table.price + chair.price * n : null
  const addSet = () => {
    list.add(itemOf(table, lang), 1)
    list.add(itemOf(chair, lang), n)
    api?.celebrate(); setDone(true); setTimeout(() => setDone(false), 2500)
  }
  const sendNow = () => window.open(waLink(buildMessage(lang, [{ ...itemOf(table, lang), qty: 1 }, { ...itemOf(chair, lang), qty: n }])), '_blank', 'noopener')
  const poster = photoOf(table.slug)

  return (
    <>
      <PageHead h1={pick(P.h1, lang)} lead={pick(P.lead, lang)} crumbs={[{ to: '/', label: t('home') }, { to: '/products', label: t('products') }, { label: t('builderLink') }]} />
      <section className="sec pt0"><div className="wrap builder">
        <div className="b-stage" ref={host}>
          {off || status === 'failed' ? (poster && <img src={poster} alt={`${table.brand} ${table.name}`} width={450} height={450} />) : <canvas ref={cv} aria-label={pick(P.h1, lang)} />}
          {!off && status !== 'ready' && status !== 'failed' && <span className="v3d-load">{t('loading3d')}</span>}
          {status === 'ready' && <span className="v3d-hint">{t('dragHint')}</span>}
        </div>

        <div className="b-panel box">
          <h2>{t('bShape')}</h2>
          <div className="seg" role="group" aria-label={t('bShape')}>
            <button type="button" className={shape === 'round' ? 'on' : ''} aria-pressed={shape === 'round'} onClick={() => setShape('round')}>{t('bRound')}</button>
            <button type="button" className={shape === 'rect' ? 'on' : ''} aria-pressed={shape === 'rect'} onClick={() => setShape('rect')}>{t('bRect')}</button>
          </div>
          <label className="fld"><span>{t('bTable')}</span>
            <select value={table.slug} onChange={e => setTableSlug(e.target.value)}>{tables.map(p => <option key={p.slug} value={p.slug}>{p.brand} {p.name}{p.price ? ` · ${fmtPrice(p.price)}` : ''}</option>)}</select></label>
          <label className="fld"><span>{t('bChair')}</span>
            <select value={chair.slug} onChange={e => setChairSlug(e.target.value)}>{CHAIRS.map(p => <option key={p.slug} value={p.slug}>{p.brand} {p.name}{p.price ? ` · ${fmtPrice(p.price)}` : ''}</option>)}</select></label>
          <div className="fld"><span>{t('bCount')}</span><Stepper qty={n} onChange={q => setN(Math.min(8, Math.max(2, q)))} label={t('bCount')} /></div>
          <div className="fld"><span>{t('bChairCol')}</span>{SW(color, setColor, t('bChairCol'))}</div>
          <div className="fld"><span>{t('bTableCol')}</span>{SW(tcolor, setTcolor, t('bTableCol'))}</div>
          <p className="note">{t('bColourNote')}</p>

          <div className="b-sum">
            <h3>{t('bSummary')}</h3>
            <ul>
              <li><L to={productPath(table)}>{table.brand} {table.name}</L><b>{t('bTableLine')}{table.price ? ` · ${fmtPrice(table.price)}` : ''}</b></li>
              <li><L to={productPath(chair)}>{chair.brand} {chair.name}</L><b>{t('bChairsLine', { n })}{chair.price ? ` · ${fmtPrice(chair.price * n)}` : ''}</b></li>
            </ul>
            <p className="b-total">{total != null ? <>{t('bTotal')}: <b>{fmtPrice(total)}</b></> : <>{t('bTotal')}: <b>{table.price ? fmtPrice(table.price) : t('rateOnRequest')}</b> + {t('bChairsAsk')}</>}</p>
          </div>
          <button type="button" className="btn red big full" onClick={addSet}>{done ? <><Icon name="check" /> {t('bAdded')}</> : <><Icon name="plus" /> {t('bAdd')}</>}</button>
          <button type="button" className="btn wa big full" onClick={sendNow}><Icon name="chat" /> {t('sendList')}</button>
        </div>
      </div></section>
      <Searches list={bullets(P.searches, lang)} />
      <Cta />
    </>
  )
}
