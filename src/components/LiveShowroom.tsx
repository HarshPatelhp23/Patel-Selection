import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import LiveIcon, { CAT_KIND } from './LiveIcon'
import AddButton from './AddButton'
import { L } from './Link'
import { use3D, calm } from '../hooks/use3d'
import { pick, useLang, useT } from '../i18n'
import { CAT } from '../data/categories'
import { CATEGORIES, PRODUCTS, productPath, waLink, type Category, type Product } from '../data/products'
import { fmtPrice, productCopy } from '../data/productCopy'
import { photoOf } from '../hooks/photo'
import { PALETTE, colorOf } from '../three/palette'
import { PHONE, PHONE_DISPLAY } from '../config'
import { tUI } from '../i18n'

const price = (p: Product, ask: string) => (p.price ? fmtPrice(p.price) : ask)

/** The real photo floating and tilting in 3D as the pointer moves, with a moving glare. */
function PhotoStage({ src, alt }: { src: string; alt: string }) {
  const tilt = useRef<HTMLDivElement>(null)
  const place = (e: React.PointerEvent) => {
    const el = tilt.current; if (!el) return
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateY(${x * 34}deg) rotateX(${-y * 24}deg)`
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`); el.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
  }
  return (
    <div className="ls-photo" onPointerDown={place} onPointerMove={place} onPointerLeave={() => { if (tilt.current) tilt.current.style.transform = '' }}>
      <div className="ls-float"><div className="ls-tilt" ref={tilt}>
        <img src={src} alt={alt} width={450} height={450} draggable={false} />
        <span className="ls-glare" />
      </div></div>
    </div>
  )
}

/**
 * The "live showroom": a lit stage with a swinging price tag and glowing ring, the product floating on it
 * (real photo tilting in 3D, or a spinning 3D model), and a shelf below where the products drop in.
 */
export default function LiveShowroom({ category }: { category?: Category }) {
  const t = useT(), lang = useLang()
  const [cat, setCat] = useState<Category>(category ?? 'Chairs')
  const [brand, setBrand] = useState('all')
  const [sel, setSel] = useState('')
  const [tour, setTour] = useState(false)
  const [mode, setMode] = useState<'photo' | '3d'>('photo')
  const [color, setColor] = useState<string | null>(null)
  const rail = useRef<HTMLDivElement>(null)
  const inCat = useMemo(() => PRODUCTS.filter(p => p.category === cat), [cat])
  const brands = useMemo(() => [...new Set(inCat.map(p => p.brand))], [inCat])
  const list = useMemo(() => inCat.filter(p => brand === 'all' || p.brand === brand), [inCat, brand])
  const cur = list.find(p => p.slug === sel) ?? list[0]
  const step = (d: number) => { if (!list.length) return; const i = Math.max(0, list.findIndex(p => p.slug === cur?.slug)); setSel(list[(i + d + list.length) % list.length].slug) }

  const [off, setOff] = useState(false)
  useEffect(() => { if (calm()) setOff(true) }, [])
  useEffect(() => { setColor(null) }, [cur?.slug])
  useEffect(() => {
    if (!tour) return
    const id = setInterval(() => step(1), 4500)
    return () => clearInterval(id)
  })
  useEffect(() => {
    const r = rail.current, el = r?.querySelector<HTMLElement>('.ls-card.on')
    if (r && el) r.scrollTo({ left: el.offsetLeft - (r.clientWidth - el.clientWidth) / 2, behavior: 'smooth' })
  }, [cur?.slug])

  const { cv, host, api, status } = use3D(
    (c, h) => import('../three/viewer').then(m => m.mountViewer(c, h, { type: cur!.type, brand: cur!.brand, name: cur!.name, color: colorOf(cur!.brand, cur!.name) }, { bare: true })),
    mode === '3d' && !off && !!cur, [cur?.slug])
  useEffect(() => { if (color) api?.setColor(color) }, [api, color])

  if (!cur) return null
  const photo = photoOf(cur.slug)
  const c = productCopy(cur, lang)
  const ask = t('askRateShort')
  const show3d = mode === '3d' && !off && status !== 'failed'
  return (
    <section className="ls"><div className="wrap">
      <span className="livebadge"><i /> {t('liveBadge')}</span>
      <h2>{t('walkTitle')}</h2>
      <p className="sub">{t('walkSub')}</p>

      {!category && (
        <>
          <div className="steplabel"><b>1</b> {t('step1')}</div>
          <div className="ls-cats">{CATEGORIES.map(k => (
            <button key={k} type="button" className={`ls-cat${k === cat ? ' on' : ''}`} aria-pressed={k === cat} onClick={() => { setCat(k); setBrand('all'); setSel('') }}>
              <LiveIcon kind={CAT_KIND[k]} size={46} />{pick(CAT[k].short, lang)}<small>{t('modelsCount', { n: PRODUCTS.filter(p => p.category === k).length })}</small>
            </button>))}
          </div>
        </>
      )}
      <div className="steplabel"><b>{category ? 1 : 2}</b> {t('step2')}</div>
      <div className="ls-bar">
        <div className="ls-chips">
          <button type="button" className={`bchip${brand === 'all' ? ' on' : ''}`} onClick={() => { setBrand('all'); setSel('') }}>{t('allBrands')} <span>{inCat.length}</span></button>
          {brands.map(b => <button type="button" key={b} className={`bchip${brand === b ? ' on' : ''}`} onClick={() => { setBrand(b); setSel('') }}>{b} <span>{inCat.filter(p => p.brand === b).length}</span></button>)}
        </div>
        <button type="button" className={`tbtn${tour ? ' on' : ''}`} onClick={() => setTour(v => !v)}>{tour ? `■ ${t('stopTour')}` : `▶ ${t('liveTour')}`}</button>
      </div>

      <div className="ls-spot">
        <div className="ls-stage" ref={host}>
          <div className="ls-beam" />
          <svg className="ls-ring" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="200" cy="60" rx="190" ry="50" className="r1" /><ellipse cx="200" cy="60" rx="160" ry="38" className="r2" />
          </svg>
          {show3d ? <canvas ref={cv} className="ls-cv" aria-label={c.alt} /> : photo && <PhotoStage key={`ph-${cur.slug}`} src={photo} alt={c.alt} />}
          {show3d && status === 'loading' && <span className="v3d-load">{t('loading3d')}</span>}
          <div className="ls-tag" key={`tag-${cur.slug}`}><i /><span>{price(cur, ask)}</span></div>
          <button type="button" className="ls-nav l" onClick={() => step(-1)} aria-label={t('prev')}>‹</button>
          <button type="button" className="ls-nav r" onClick={() => step(1)} aria-label={t('next')}>›</button>
          <div className="v3d-seg ls-seg" role="group">
            <button type="button" className={mode === 'photo' ? 'on' : ''} aria-pressed={mode === 'photo'} onClick={() => setMode('photo')}><Icon name="camera" /> {t('viewPhoto')}</button>
            {!off && <button type="button" className={mode === '3d' ? 'on' : ''} aria-pressed={mode === '3d'} onClick={() => setMode('3d')}><Icon name="cube" /> 3D</button>}
          </div>
        </div>

        <div className="ls-info" key={cur.slug}>
          <div className="ls-meta"><span>{cur.brand}</span><span>{pick(CAT[cur.category].short, lang)}</span></div>
          <h3>{cur.name}</h3>
          <div className="ls-big">{price(cur, t('rateOnRequest'))}</div>
          <p className="note">{show3d ? t('dragHint') : t('tiltHint')}</p>
          {show3d && <div className="sw ls-sw">{PALETTE.map(k => <button key={k} type="button" style={{ background: k }} className={k === color ? 'on' : ''} aria-label={k} onClick={() => setColor(k)} />)}</div>}
          {cur.category === 'Chairs' && <div className="ls-free"><LiveIcon kind="truck" size={28} /> {t('freeDeliveryBadge')}</div>}
          <AddButton p={cur} big />
          <div className="ls-links">
            <L to={productPath(cur)} className="btn ghost line">{t('fullDetails')} →</L>
            <a className="btn wa" href={waLink(tUI(lang, 'waRateOne', { name: `${cur.brand} ${cur.name}` }))} target="_blank" rel="noopener"><Icon name="chat" /> {t('askRateShort')}</a>
            <a className="btn ghost line" href={`tel:${PHONE}`}><Icon name="phone" /> {PHONE_DISPLAY}</a>
          </div>
        </div>
      </div>

      <div className="ls-shelfhead"><span>{t('onShelf', { n: list.length })}</span></div>
      <div className="ls-rail" ref={rail} key={`${cat}-${brand}`}>
        {list.map((p, i) => {
          const ph = photoOf(p.slug)
          return (
            <button type="button" key={p.slug} className={`ls-card${p.slug === cur.slug ? ' on' : ''}`} style={{ animationDelay: `${i * 55}ms` }} onClick={() => setSel(p.slug)} aria-label={`${p.brand} ${p.name}`}>
              {ph ? <img src={ph} alt="" width={450} height={450} loading="lazy" decoding="async" draggable={false} /> : <span className="noimg" />}
              <small>{p.brand}</small><b>{p.name}</b><em>{price(p, ask)}</em>
            </button>
          )
        })}
      </div>
      <div className="ls-plank" />
    </div></section>
  )
}
