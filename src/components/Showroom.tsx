import { useEffect, useMemo, useRef, useState } from 'react'
import { CATEGORIES, PRODUCTS, waLink, type Category, type Product } from '../data/products'
import { PHONE, PHONE_DISPLAY, absUrl } from '../config'
import { buildMessage, useEnquiry } from '../state/Enquiry'
import { usePhoto, usePhotos } from '../hooks/usePhoto'
import { PALETTE, thumbOf } from '../three/models'
import Icon from './Icon'
import { PhotoStage, Stage3D } from './Stage'

const CAT_ICON: Record<Category, [string, string]> = {
  'Chairs': ['M7 3v10h10M7 13v8M17 13v8M5 13h14', 'rock'],
  'Dining Tables': ['M3 9h18M6 9v11M18 9v11M9 9v4M15 9v4', 'hop'],
  'Center Tables': ['M3 11h18M5 11v7M19 11v7M7 16h10', 'pulse'],
  'Cabinets': ['M5 3h14v18H5zM12 3v18M10 12h.01M14 12h.01', 'sway'],
  'Shoe Racks': ['M5 3v18M19 3v18M5 8h14M5 13h14M5 18h14', 'pulse'],
  'Step Stools': ['M6 8h12M8 8l-2 12M16 8l2 12M7 14h10', 'hop'],
}
const price = (p: Product) => (p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'Ask rate')

function ShelfCard({ p, i, on, onPick }: { p: Product; i: number; on: boolean; onPick: () => void }) {
  const photo = usePhoto(p.slug)
  const thumb = useMemo(() => thumbOf(p.type, p.brand, p.name), [p])
  return (
    <button className={`sc${on ? ' on' : ''}`} style={{ animationDelay: `${i * 55}ms` }} onClick={onPick} data-slug={p.slug} aria-label={`${p.brand} ${p.name}`}>
      <img src={photo ?? thumb} alt="" draggable={false} />
      <small>{p.brand}</small><b>{p.name}</b><em>{price(p)}</em>
    </button>
  )
}

function Spotlight({ p, onStep }: { p: Product; onStep: (d: number) => void }) {
  const photos = usePhotos(p.slug)
  const [fi, setFi] = useState(0)
  const [ci, setCi] = useState(-1)
  useEffect(() => { setFi(0); setCi(-1); photos.forEach(u => { new Image().src = u }) }, [p, photos])
  const real = photos.length > 0
  const L = useEnquiry()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  useEffect(() => { setQty(1); setAdded(false) }, [p])
  const thumb = useMemo(() => thumbOf(p.type, p.brand, p.name), [p])
  const item = { key: p.slug, label: `${p.brand} ${p.name}`, img: photos[0] ?? thumb, photo: photos[0] ? absUrl(photos[0]) : null, chair: p.category === 'Chairs' }
  const ask = waLink(buildMessage([{ ...item, qty }]))   // includes the real photo link when there is one
  const addToList = () => { L.add(item, qty); setAdded(true); setTimeout(() => setAdded(false), 1800) }
  return (
    <div className="spot">
      <div className="stagebox">
        <div className="beam" />
        <svg className="ring" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
          <ellipse cx="200" cy="60" rx="190" ry="50" className="r1" /><ellipse cx="200" cy="60" rx="160" ry="38" className="r2" />
        </svg>
        <Stage3D p={p} ci={ci} active={!real} />
        {real && <PhotoStage photos={photos} fi={fi} setFi={setFi} alt={`${p.brand} ${p.name}`} />}
        <div className="tag" key={p.slug}><i /><span>{price(p)}</span></div>
        <button className="nav l" onClick={() => onStep(-1)} aria-label="Previous product">‹</button>
        <button className="nav r" onClick={() => onStep(1)} aria-label="Next product">›</button>
      </div>
      <div className="info" key={p.slug}>
        <div className="chips"><span>{p.brand}</span><span>{p.category}</span></div>
        <h3>{p.name}</h3>
        <div className="big">{price(p)}</div>
        <p className="hint2">{real ? (photos.length > 1 ? 'Drag left or right to turn the real product.' : 'Move your finger or mouse over the photo to tilt it in 3D.') : 'Drag to rotate the 3D preview. Real colours and shape may vary.'}</p>
        {real && photos.length > 1 && (
          <div className="thumbs lt">{photos.map((u, i) => <button key={u} className={i === fi ? 'on' : ''} onClick={() => setFi(() => i)} aria-label={`Photo ${i + 1}`}><img src={u} alt="" /></button>)}</div>
        )}
        {!real && <div className="sw lt">{PALETTE.map((c, i) => <button key={c} style={{ background: c }} className={ci === i ? 'on' : ''} onClick={() => setCi(i)} aria-label={`Colour ${i + 1}`} />)}</div>}
        {p.category === 'Chairs' && <div className="free"><Icon name="truck" /> Free delivery on 10 or more chairs</div>}
        <div className="buy">
          <div className="qty big"><button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Less"><Icon name="minus" /></button><span>{qty}</span><button onClick={() => setQty(q => Math.min(999, q + 1))} aria-label="More"><Icon name="plus" /></button></div>
          <button className={`btn red addbtn${added ? ' done' : ''}`} onClick={addToList}><Icon name={added ? 'check' : 'plus'} /> {added ? 'Added to list' : 'Add to enquiry list'}</button>
        </div>
        <div className="cta" style={{ marginTop: 10 }}>
          <a className="btn wa" href={ask} target="_blank" rel="noopener noreferrer"><Icon name="chat" /> Ask rate{real ? ' with photo' : ''}</a>
          <a className="btn ghost line" href={`tel:${PHONE}`}><Icon name="phone" /> Call {PHONE_DISPLAY}</a>
        </div>
      </div>
    </div>
  )
}

type Sort = 'none' | 'asc' | 'desc'
const SORT_LABEL: Record<Sort, string> = { none: 'Sort: Featured', asc: 'Price: low to high', desc: 'Price: high to low' }

export default function Showroom() {
  const [cat, setCat] = useState<Category>('Chairs')
  const [brand, setBrand] = useState('All')
  const [sort, setSort] = useState<Sort>('none')
  const [sel, setSel] = useState('')
  const [tour, setTour] = useState(false)
  const rail = useRef<HTMLDivElement>(null)

  const inCat = useMemo(() => PRODUCTS.filter(p => p.category === cat), [cat])
  const brands = useMemo(() => { const m = new Map<string, number>(); inCat.forEach(p => m.set(p.brand, (m.get(p.brand) ?? 0) + 1)); return [...m] }, [inCat])
  const list = useMemo(() => {
    const l = inCat.filter(p => brand === 'All' || p.brand === brand)
    if (sort === 'none') return l
    return [...l].sort((a, b) => ((a.price ?? 1e9) - (b.price ?? 1e9)) * (sort === 'asc' ? 1 : -1))
  }, [inCat, brand, sort])
  const cur = list.find(p => p.slug === sel) ?? list[0]
  const step = (d: number) => { if (!list.length) return; const i = Math.max(0, list.findIndex(p => p.slug === cur?.slug)); setSel(list[(i + d + list.length) % list.length].slug) }

  const pickCat = (c: Category) => { setCat(c); setBrand('All'); setSel('') }
  useEffect(() => {
    if (!tour) return
    const t = setInterval(() => step(1), 4500)
    return () => clearInterval(t)
  })
  useEffect(() => {
    const r = rail.current, el = r?.querySelector<HTMLElement>('.sc.on')
    if (r && el) r.scrollTo({ left: el.offsetLeft - (r.clientWidth - el.clientWidth) / 2, behavior: 'smooth' })
  }, [cur?.slug])

  return (
    <section id="best" className="show"><div className="wrap">
      <span className="livebadge"><i /> LIVE SHOWROOM</span>
      <h2>Walk through our showroom</h2>
      <p className="sub">Pick a product, then pick a company. Tap any item on the shelf to see it on the turntable.</p>

      <div className="steplabel"><b>1</b> Choose a product</div>
      <div className="cats">{CATEGORIES.map(c => (
        <button key={c} className={`cat${c === cat ? ' on' : ''}`} onClick={() => pickCat(c)}>
          <svg viewBox="0 0 24 24" className={`ci ${CAT_ICON[c][1]}`} aria-hidden="true"><path d={CAT_ICON[c][0]} /></svg>
          {c}<small>{PRODUCTS.filter(p => p.category === c).length} models</small>
        </button>))}
      </div>

      <div className="steplabel"><b>2</b> Choose a company</div>
      <div className="toolbar">
        <div className="bchips">
          <button className={`bchip${brand === 'All' ? ' on' : ''}`} onClick={() => { setBrand('All'); setSel('') }}>All companies <span>{inCat.length}</span></button>
          {brands.map(([b, n]) => <button key={b} className={`bchip${brand === b ? ' on' : ''}`} onClick={() => { setBrand(b); setSel('') }}>{b} <span>{n}</span></button>)}
        </div>
        <div className="tools">
          <button className="tbtn" onClick={() => setSort(s => (s === 'none' ? 'asc' : s === 'asc' ? 'desc' : 'none'))}>{SORT_LABEL[sort]}</button>
          <button className={`tbtn${tour ? ' on' : ''}`} onClick={() => setTour(t => !t)}>{tour ? '■ Stop tour' : '▶ Live tour'}</button>
        </div>
      </div>

      {cur ? <Spotlight p={cur} onStep={step} /> : <p className="sub">No products found.</p>}

      <div className="shelfhead"><span>{list.length} {list.length === 1 ? 'product' : 'products'} on the shelf</span></div>
      <div className="rail" ref={rail} key={`${cat}-${brand}-${sort}`}>
        {list.map((p, i) => <ShelfCard key={p.slug} p={p} i={i} on={p.slug === cur?.slug} onPick={() => setSel(p.slug)} />)}
      </div>
      <div className="plank" />

      <p className="note">{cat === 'Chairs' ? 'All models are also available from Supreme, Varmora, Royal and Radhey Gold. Chair rates vary by colour and quantity, so please ask.' : 'Prices shown are current listed rates and may change. Please confirm when you order.'}</p>
      <div className="deliv"><Icon name="truck" /><div><strong>Free delivery on 10 or more chairs</strong><p>For smaller orders, a delivery charge applies and is confirmed when you order.</p></div></div>
    </div></section>
  )
}
