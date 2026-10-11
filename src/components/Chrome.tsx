import { useEffect, useState, type CSSProperties } from 'react'
import Icon from './Icon'
import Logo from './Logo'
import { PHONE, PHONE_DISPLAY } from '../config'
import { waLink } from '../data/products'
import { useEnquiry } from '../state/Enquiry'

export function Header() {
  return (
    <header><div className="wrap">
      <a className="lg" href="#top" aria-label="Patel Selection home"><Logo variant="mini" /></a>
      <nav><a href="#best">Showroom</a><a href="#range">Enquiry list</a><a href="#why">About</a><a href="#custom">Send a photo</a><a href="#visit">Visit us</a></nav>
      <a className="hcall" href={`tel:${PHONE}`}><Icon name="phone" /> Call now</a>
    </div></header>
  )
}

export function Footer() {
  return (
    <>
      <div className="band" />
      <footer><div className="wrap">
        <div className="pl"><Logo /></div>
        <p>Plastic wares, crockery, thermo wares, kitchen wares, non-stick cook wares, moulded furniture and home appliances.<br />Ambli-Bopal Road, Ahmedabad-380058</p>
        <a href={`tel:${PHONE}`}>Arvind Patel<br />{PHONE_DISPLAY}</a>
      </div></footer>
    </>
  )
}

/** Which part of the page the visitor is looking at, for the glowing marker in the phone dock */
type Where = 'home' | 'best' | 'list' | 'visit' | null
const SECTION_OF: Array<[string, Where]> = [['hero', 'home'], ['best', 'best'], ['range', 'list'], ['visit', 'visit']]
const SLOT: Record<Exclude<Where, null>, number> = { home: 0, best: 1, list: 3, visit: 4 }

/** Floating glass dock for phones: a red marker slides to the section you are in, the call button floats above it. */
export function TabBar() {
  const { count, bump, drawer, setDrawer } = useEnquiry()
  const [where, setWhere] = useState<Where>('home')
  useEffect(() => {
    let raf = 0
    const look = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = innerHeight * 0.45
        let found: Where = null
        for (const [id, w] of SECTION_OF) {
          const r = document.getElementById(id)?.getBoundingClientRect()
          if (r && r.top <= y && r.bottom > y) found = w
        }
        setWhere(found)
      })
    }
    addEventListener('scroll', look, { passive: true }); addEventListener('resize', look); look()
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', look); removeEventListener('resize', look) }
  }, [])
  const on: Where = drawer ? 'list' : where
  const slot = on ? SLOT[on] : -1
  return (
    <nav className="tabs" aria-label="App navigation" style={{ '--i': Math.max(0, slot) } as CSSProperties} data-none={slot < 0 ? '' : undefined}>
      <i className="tblob" aria-hidden="true" />
      <a href="#top" className={on === 'home' ? 'on' : ''}><Icon name="home" /><span>Home</span></a>
      <a href="#best" className={on === 'best' ? 'on' : ''}><Icon name="bag" /><span>Showroom</span></a>
      <div className="fabslot"><a className="fab" href={`tel:${PHONE}`} aria-label="Call Patel Selection"><Icon name="phone" /></a><span>Call</span></div>
      <a href="#range" className={on === 'list' ? 'on' : ''} onClick={e => { e.preventDefault(); setDrawer(true) }} aria-haspopup="dialog">
        <span className="ticon" data-listtab><Icon name="list" />{count > 0 && <b className="tbadge" key={bump}>{count}</b>}</span><span>My list</span>
      </a>
      <a href="#visit" className={on === 'visit' ? 'on' : ''}><Icon name="pin" /><span>Visit</span></a>
    </nav>
  )
}

/** Slides up after 14 seconds with Call and WhatsApp */
export function Nudge() {
  const [open, setOpen] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOpen(true), 14000); return () => clearTimeout(t) }, [])
  return (
    <div className={`sheet${open ? ' open' : ''}`} role="dialog" aria-label="Get best rate">
      <button className="x" onClick={() => setOpen(false)} aria-label="Close">×</button>
      <h3>Get today's best rate</h3>
      <p>Tell Arvind Patel what you need. Quick reply, no obligation.</p>
      <div className="cta">
        <a className="btn red" href={`tel:${PHONE}`}><Icon name="phone" /> Call now</a>
        <a className="btn wa" href={waLink('Hello Patel Selection, please share best rates.')} target="_blank" rel="noopener noreferrer"><Icon name="chat" /> WhatsApp</a>
      </div>
    </div>
  )
}

/** Red progress line under the header while scrolling */
export function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const f = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const h = document.documentElement.scrollHeight - innerHeight; setP(h > 0 ? scrollY / h : 0) }) }
    addEventListener('scroll', f, { passive: true }); f()
    return () => { removeEventListener('scroll', f); cancelAnimationFrame(raf) }
  }, [])
  return <div className="prog" style={{ transform: `scaleX(${p})` }} />
}

/** Floating "My list" button that pops whenever something is added */
export function ListPill() {
  const { count, bump } = useEnquiry()
  if (!count) return null
  return <a className="lpill" key={bump} href="#range"><Icon name="list" /> My list <b>{count}</b></a>
}
