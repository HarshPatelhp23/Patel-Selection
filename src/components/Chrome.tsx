import { useEffect, useState } from 'react'
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

/** Android-style bottom navigation, shown on phones only */
export function TabBar() {
  const { count } = useEnquiry()
  return (
    <nav className="tabs" aria-label="App navigation">
      <a href="#top"><Icon name="home" />Home</a>
      <a href="#best"><Icon name="bag" />Showroom</a>
      <a className="fab" href={`tel:${PHONE}`} aria-label="Call Patel Selection"><Icon name="phone" /></a>
      <a href="#range"><Icon name="list" />My list{count > 0 && <span className="tbadge">{count}</span>}</a>
      <a href="#visit"><Icon name="pin" />Visit</a>
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
