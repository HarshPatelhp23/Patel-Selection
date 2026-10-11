import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { CATEGORIES, PRODUCTS, waLink, type Category, type Product } from '../data/products'
import { CAT_ICON, CAT_SHORT } from '../data/catIcons'
import { PHONE, absUrl } from '../config'
import { buildMessage, useEnquiry } from '../state/Enquiry'
import { takePendingCategory } from '../state/jump'
import { usePhoto, usePhotos } from '../hooks/usePhoto'
import { PALETTE, thumbOf } from '../three/models'
import Icon from './Icon'
import { flyToList } from './fly'
import { PhotoStage, Stage3D } from './Stage'

/**
 * PHONE SHOWROOM
 * One screen, no hunting: every category sits in the dock, brands are one swipe row, the product fills the stage,
 * and price, WhatsApp, Call and "Add to list" stay under the thumb. The grid button opens every model with search.
 */

const price = (p: Product) => (p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'Ask rate')
const buzz = (ms = 8) => { try { navigator.vibrate?.(ms) } catch { /* vibration not supported */ } }

type Sort = 'none' | 'asc' | 'desc'
const SORT_LABEL: Record<Sort, string> = { none: 'Featured order', asc: 'Price: low to high', desc: 'Price: high to low' }
const NEXT_SORT: Record<Sort, Sort> = { none: 'asc', asc: 'desc', desc: 'none' }

/** Swipe the product card left or right to move through the shelf. Vertical swipes still scroll the page. */
function useSwipe(onNext: () => void, onPrev: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  const cb = useRef({ onNext, onPrev })
  cb.current = { onNext, onPrev }
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let x0 = 0, y0 = 0, dx = 0, on = false, drag = false, timer = 0
    const reset = (animate: boolean) => {
      el.style.transition = animate ? 'transform .26s cubic-bezier(.2,1.4,.4,1), opacity .26s' : 'none'
      el.style.transform = ''; el.style.opacity = ''
    }
    const down = (e: PointerEvent) => {
      if ((e.target as Element).closest('button,a,input')) return
      on = true; drag = false; x0 = e.clientX; y0 = e.clientY; dx = 0; el.style.transition = 'none'
    }
    const move = (e: PointerEvent) => {
      if (!on) return
      dx = e.clientX - x0
      const dy = e.clientY - y0
      if (!drag) {
        if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { on = false; return }
        if (Math.abs(dx) > 8) { drag = true; try { el.setPointerCapture(e.pointerId) } catch { /* pointer already gone */ } }
      }
      if (drag) {
        el.style.transform = `translateX(${dx * 0.7}px) rotate(${dx * 0.025}deg)`
        el.style.opacity = String(1 - Math.min(0.5, Math.abs(dx) / 400))
      }
    }
    const up = () => {
      if (!on) return
      on = false
      if (!drag) return
      if (Math.abs(dx) > 56) {
        const next = dx < 0   // swipe left = next product
        el.style.transition = 'transform .16s ease-in, opacity .16s'
        el.style.transform = `translateX(${next ? -110 : 110}%)`; el.style.opacity = '0'
        timer = window.setTimeout(() => { if (next) cb.current.onNext(); else cb.current.onPrev(); reset(false) }, 150)
      } else reset(true)
    }
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up)
    return () => {
      clearTimeout(timer)
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up)
    }
  }, [])
  return ref
}

interface ViewProps {
  p: Product; i: number; n: number; dir: number; cat: Category; brand: string
  coach: boolean; onStep: (d: number) => void
}

/** The stage (3D or real photo) and the swipeable product card under it. */
function ProductView({ p, i, n, dir, cat, brand, coach, onStep }: ViewProps) {
  const L = useEnquiry()
  const photos = usePhotos(p.slug)
  const real = photos.length > 0
  const [fi, setFi] = useState(0)
  const [ci, setCi] = useState(-1)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [more, setMore] = useState(false)
  const stage = useRef<HTMLDivElement>(null)
  const addBtn = useRef<HTMLButtonElement>(null)
  const swipe = useSwipe(() => onStep(1), () => onStep(-1))
  const thumb = useMemo(() => thumbOf(p.type, p.brand, p.name), [p])

  useEffect(() => { setFi(0); setCi(-1); setQty(1); setAdded(false); photos.forEach(u => { new Image().src = u }) }, [p, photos])

  // The photo is sized from the real stage height, so it never hides behind the card
  useEffect(() => {
    const el = stage.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => el.style.setProperty('--sh', `${el.clientHeight}px`))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const item = { key: p.slug, label: `${p.brand} ${p.name}`, img: photos[0] ?? thumb, photo: photos[0] ? absUrl(photos[0]) : null, chair: p.category === 'Chairs' }
  const ask = waLink(buildMessage([{ ...item, qty }]))
  const add = () => {
    L.add(item, qty); setAdded(true); flyToList(addBtn.current, item.img)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <>
      <div className="mstage" ref={stage}>
        <div className="beam" />
        <svg className="ring" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
          <ellipse cx="200" cy="60" rx="190" ry="50" className="r1" /><ellipse cx="200" cy="60" rx="160" ry="38" className="r2" />
        </svg>
        <div className="mhead" key={`${cat}|${brand}`}>
          <b>{cat}</b>
        </div>
        <Stage3D p={p} ci={ci} active={!real} />
        {real && <PhotoStage photos={photos} fi={fi} setFi={setFi} alt={`${p.brand} ${p.name}`} />}
        <div className="tag" key={p.slug}><i /><span>{price(p)}</span></div>
        <button className="nav l" onClick={() => onStep(-1)} aria-label="Previous product"><Icon name="left" /></button>
        <button className="nav r" onClick={() => onStep(1)} aria-label="Next product"><Icon name="right" /></button>
        <span className="mbadge"><Icon name={real ? 'camera' : 'cube'} />{real ? (photos.length > 1 ? 'Drag to turn' : 'Real photo') : '3D preview'}</span>
      </div>

      <div className="mdeck">
        <div className={`mswipe${coach ? ' coach' : ''}`} ref={swipe}>
          <div className={`mcard ${dir > 0 ? 'fromR' : dir < 0 ? 'fromL' : 'fromN'}`} key={p.slug}>
            <div className="mrow1">
              <span className="mbrand">{p.brand}</span>
              <span className="mpos"><Icon name="left" />{i + 1} / {n}<Icon name="right" /></span>
              <button className="mmorebtn" onClick={() => setMore(m => !m)} aria-expanded={more}>{more ? 'Hide' : 'Details'}<Icon name={more ? 'down' : 'up'} /></button>
            </div>
            <div className="mrow2">
              <h3>{p.name}</h3>
              <div className={`mprice${p.price ? '' : ' ask'}`}>{price(p)}</div>
            </div>
          </div>
        </div>

        <div className={`mmore${more ? ' open' : ''}`}><div className="mmore-in">
          <p className="hint2">{real ? (photos.length > 1 ? 'Drag the photo left or right to turn the real product.' : 'Move your finger over the photo to tilt it in 3D.') : 'Drag to rotate the 3D preview. Real colours and shape may vary.'}</p>
          {real && photos.length > 1 && (
            <div className="thumbs lt">{photos.map((u, k) => <button key={u} className={k === fi ? 'on' : ''} onClick={() => setFi(() => k)} aria-label={`Photo ${k + 1}`}><img src={u} alt="" /></button>)}</div>
          )}
          {!real && <div className="sw lt">{PALETTE.map((c, k) => <button key={c} style={{ background: c }} className={ci === k ? 'on' : ''} onClick={() => setCi(k)} aria-label={`Colour ${k + 1}`} />)}</div>}
          {p.category === 'Chairs' && <div className="free"><Icon name="truck" /> Free delivery on 10 or more chairs</div>}
        </div></div>

        <div className="mact">
          <a className="btn wa" href={ask} target="_blank" rel="noopener noreferrer"><Icon name="chat" /> Ask rate{real ? ' + photo' : ''}</a>
          <a className="btn ghost line" href={`tel:${PHONE}`} aria-label="Call Patel Selection"><Icon name="phone" /> Call</a>
        </div>
        <div className="mact two">
          <div className="qty big">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Less"><Icon name="minus" /></button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => Math.min(999, q + 1))} aria-label="More"><Icon name="plus" /></button>
          </div>
          <button ref={addBtn} className={`btn red addbtn${added ? ' done' : ''}`} onClick={add}><Icon name={added ? 'check' : 'plus'} /> {added ? 'Added!' : 'Add to list'}</button>
        </div>
      </div>
    </>
  )
}

function Tile({ p, i, on, onPick }: { p: Product; i: number; on: boolean; onPick: () => void }) {
  const L = useEnquiry()
  const photo = usePhoto(p.slug)
  const thumb = useMemo(() => thumbOf(p.type, p.brand, p.name), [p])
  const add = useRef<HTMLButtonElement>(null)
  const inList = L.has(p.slug)
  const img = photo ?? thumb
  return (
    <div className={`mtile${on ? ' on' : ''}`} style={{ animationDelay: `${Math.min(i, 14) * 28}ms` }}>
      <button className="mtile-main" onClick={onPick} aria-label={`${p.brand} ${p.name}, ${price(p)}`}>
        <img src={img} alt="" loading="lazy" decoding="async" draggable={false} />
        <small>{p.brand}</small><b>{p.name}</b><em>{price(p)}</em>
      </button>
      <button ref={add} className={`mtile-add${inList ? ' on' : ''}`} aria-label={inList ? `Added ${p.brand} ${p.name}. Add one more` : `Add ${p.brand} ${p.name} to list`}
        onClick={() => { L.add({ key: p.slug, label: `${p.brand} ${p.name}`, img, photo: photo ? absUrl(photo) : null, chair: p.category === 'Chairs' }, 1); flyToList(add.current, img) }}>
        <Icon name={inList ? 'check' : 'plus'} />
      </button>
    </div>
  )
}

/** Every model in a full-screen sheet, with search across all categories. */
function GridSheet({ open, onClose, view, viewLabel, curSlug, onPick }: {
  open: boolean; onClose: () => void; view: Product[]; viewLabel: string; curSlug: string; onPick: (p: Product) => void
}) {
  const [q, setQ] = useState('')
  const [all, setAll] = useState(false)
  const closeBtn = useRef<HTMLButtonElement>(null)

  // every time the sheet opens it starts clean
  useEffect(() => { if (open) { setQ(''); setAll(false) } }, [open])
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', key)
    const t = window.setTimeout(() => closeBtn.current?.focus(), 380)
    return () => { document.body.style.overflow = prev; removeEventListener('keydown', key); clearTimeout(t) }
  }, [open, onClose])

  const searching = q.trim().length > 0
  const items = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean)
    const base = all || words.length ? PRODUCTS : view
    return words.length ? base.filter(p => words.every(w => `${p.brand} ${p.name} ${p.category}`.toLowerCase().includes(w))) : base
  }, [all, q, view])

  return createPortal(
    <div className={`mgrid${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="All models" aria-hidden={!open}>
      <div className="mgrid-top">
        <div className="mgrid-title"><b>All models</b><button ref={closeBtn} className="mt" onClick={onClose} aria-label="Close"><Icon name="close" /></button></div>
        <label className="msearch"><Icon name="search" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search brand or model, e.g. nilkamal" inputMode="search" enterKeyHint="search" aria-label="Search models" />
          {q && <button type="button" onClick={() => setQ('')} aria-label="Clear search"><Icon name="close" /></button>}
        </label>
        <div className="mscope">
          <button className={!all && !searching ? 'on' : ''} onClick={() => { setAll(false); setQ('') }}>{viewLabel} <span>{view.length}</span></button>
          <button className={all || searching ? 'on' : ''} onClick={() => setAll(true)}>Everything <span>{PRODUCTS.length}</span></button>
        </div>
      </div>
      <div className="mgrid-body">
        {items.length === 0
          ? <p className="mnone">Nothing matches “{q}”. Try a shorter word, or call us. We have many more models in the shop.</p>
          : <div className="mtiles">{items.map((p, i) => <Tile key={p.slug} p={p} i={i} on={p.slug === curSlug} onPick={() => onPick(p)} />)}</div>}
      </div>
    </div>,
    document.body,
  )
}

export default function MobileShowroom() {
  const [cat, setCat] = useState<Category>(() => takePendingCategory() ?? 'Chairs')
  const [brand, setBrand] = useState('All')
  const [sort, setSort] = useState<Sort>('none')
  const [sel, setSel] = useState('')
  const [dir, setDir] = useState(0)
  const [tour, setTour] = useState(false)
  const [grid, setGrid] = useState(false)
  const [toast, setToast] = useState('')
  const [coach, setCoach] = useState(false)
  const root = useRef<HTMLElement>(null)
  const brandRow = useRef<HTMLDivElement>(null)
  const toastTimer = useRef(0)

  const inCat = useMemo(() => PRODUCTS.filter(p => p.category === cat), [cat])
  const brands = useMemo(() => { const m = new Map<string, number>(); inCat.forEach(p => m.set(p.brand, (m.get(p.brand) ?? 0) + 1)); return [...m] }, [inCat])
  const list = useMemo(() => {
    const l = inCat.filter(p => brand === 'All' || p.brand === brand)
    if (sort === 'none') return l
    return [...l].sort((a, b) => ((a.price ?? 1e9) - (b.price ?? 1e9)) * (sort === 'asc' ? 1 : -1))
  }, [inCat, brand, sort])
  const cur = list.find(p => p.slug === sel) ?? list[0]
  const idx = cur ? list.indexOf(cur) : 0

  const flash = useCallback((msg: string) => {
    setToast(msg); clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 1500)
  }, [])

  const step = useCallback((d: number) => {
    if (!list.length) return
    const i = Math.max(0, list.findIndex(p => p.slug === cur?.slug))
    setDir(d > 0 ? 1 : -1); setSel(list[(i + d + list.length) % list.length].slug); buzz()
  }, [list, cur])

  const pickCat = (c: Category) => { if (c === cat) return; setCat(c); setBrand('All'); setSel(''); setDir(0); buzz() }
  const pickBrand = (b: string) => { setBrand(b); setSel(''); setDir(0); buzz(6) }
  const cycleSort = () => { const s = NEXT_SORT[sort]; setSort(s); setSel(''); setDir(0); flash(SORT_LABEL[s]) }
  const closeGrid = useCallback(() => setGrid(false), [])
  const pickFromGrid = (p: Product) => {
    if (p.category !== cat) { setCat(p.category); setBrand('All') } else if (brand !== 'All' && p.brand !== brand) setBrand('All')
    setSel(p.slug); setDir(0); setGrid(false); buzz()
  }

  // Category shortcuts from the hero
  useEffect(() => {
    const on = (e: Event) => {
      const c = (e as CustomEvent<Category>).detail
      takePendingCategory(); setCat(c); setBrand('All'); setSel(''); setDir(0)
    }
    window.addEventListener('showroom:cat', on)
    return () => window.removeEventListener('showroom:cat', on)
  }, [])

  // Live tour: moves on every 4.5 seconds (the ring on the play button counts it down)
  const stepRef = useRef(step); stepRef.current = step
  useEffect(() => {
    if (!tour || grid) return
    const t = window.setInterval(() => stepRef.current(1), 4500)
    return () => clearInterval(t)
  }, [tour, grid, cur?.slug])

  // Keep the chosen brand chip in view
  useEffect(() => {
    const r = brandRow.current, el = r?.querySelector<HTMLElement>('.mchip.on')
    if (r && el) r.scrollTo({ left: el.offsetLeft - (r.clientWidth - el.clientWidth) / 2, behavior: 'smooth' })
  }, [brand, cat])

  // First time the showroom is on screen, the card gives a little "swipe me" nudge
  useEffect(() => {
    const el = root.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCoach(true); io.disconnect() } }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const catIndex = CATEGORIES.indexOf(cat)
  const viewLabel = brand === 'All' ? cat : `${cat} · ${brand}`

  return (
    <section id="best" className="mshow" ref={root} aria-label="Showroom">
      <h2 className="sr">Walk through our showroom</h2>
      <div className="msapp">
        <div className="mtop">
          <span className="mlive"><i /> LIVE SHOWROOM</span>
          <div className="mtools">
            <button className={`mt${sort !== 'none' ? ' on' : ''}`} onClick={cycleSort} aria-label={`Sort. Now: ${SORT_LABEL[sort]}`}><Icon name="sort" /></button>
            <button className={`mt${tour ? ' on' : ''}`} onClick={() => setTour(t => !t)} aria-label={tour ? 'Stop live tour' : 'Start live tour'} aria-pressed={tour}>
              {tour && <svg className="pr" viewBox="0 0 36 36" key={cur?.slug} aria-hidden="true"><circle cx="18" cy="18" r="16" pathLength={100} /></svg>}
              <Icon name={tour ? 'stop' : 'play'} />
            </button>
            <button className="mt" onClick={() => setGrid(true)} aria-label="Browse all models"><Icon name="grid" /></button>
          </div>
        </div>

        <nav className="mdock" aria-label="Product type" style={{ '--i': catIndex, '--n': CATEGORIES.length } as CSSProperties}>
          <i className="lens" aria-hidden="true" />
          {CATEGORIES.map(c => (
            <button key={c} className={c === cat ? 'on' : ''} onClick={() => pickCat(c)} aria-pressed={c === cat} aria-label={c}>
              <svg viewBox="0 0 24 24" className={`ci${c === cat ? ` ${CAT_ICON[c][1]}` : ''}`} aria-hidden="true"><path d={CAT_ICON[c][0]} /></svg>
              <span>{CAT_SHORT[c]}</span>
            </button>
          ))}
        </nav>

        <div className="mbrands" ref={brandRow} role="group" aria-label="Company">
          <button className={`mchip${brand === 'All' ? ' on' : ''}`} onClick={() => pickBrand('All')}>All <span>{inCat.length}</span></button>
          {brands.map(([b, n]) => <button key={b} className={`mchip${brand === b ? ' on' : ''}`} onClick={() => pickBrand(b)}>{b} <span>{n}</span></button>)}
        </div>

        {cur
          ? <ProductView p={cur} i={idx} n={list.length} dir={dir} cat={cat} brand={brand} coach={coach} onStep={step} />
          : <p className="mnone">No products found.</p>}

        {toast && <div className="mtoast" key={toast} role="status">{toast}</div>}
      </div>

      <div className="mfoot">
        <Icon name="truck" /><span><b>Free delivery on 10 or more chairs.</b> {cat === 'Chairs' ? 'More models from Supreme, Varmora and Royal are also available. Chair rates vary by colour and quantity, so please ask.' : 'Listed rates may change. Please confirm when you order.'}</span>
      </div>

      <GridSheet open={grid} onClose={closeGrid} view={list} viewLabel={viewLabel} curSlug={cur?.slug ?? ''} onPick={pickFromGrid} />
    </section>
  )
}
