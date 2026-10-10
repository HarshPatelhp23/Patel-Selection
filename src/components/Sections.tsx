import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import Logo from './Logo'
import { PHONE, PHONE_DISPLAY, IMG_BASE } from '../config'
import { BRANDS, RANGES, waLink } from '../data/products'
import { FOUNDER } from '../data/founder'
import FAQ from '../data/faq.json'

export function Marquee() {
  const a = [...BRANDS, ...BRANDS], b = [...RANGES, ...RANGES]
  return (
    <div className="brands" aria-label="Brands and ranges">
      <div className="track">{a.map((x, i) => <span key={i}>{x} <b>✦</b></span>)}</div>
      <div className="track rev">{b.map((x, i) => <span key={i}>{x} <b>✦</b></span>)}</div>
    </div>
  )
}

export function Why() {
  const f: Array<[Parameters<typeof Icon>[0]['name'], string, string]> = [
    ['tag', 'Best market rates', 'We share the latest rate on WhatsApp within 1 to 2 hours, so you never overpay.'],
    ['check', 'Trusted brands', 'Nilkamal, National, Cello, Muraj, Sky and more. All major plastic chair companies available in Ahmedabad.'],
    ['truck', 'Free delivery on 10+ chairs', 'Smaller orders pay a delivery charge, confirmed when you order.'],
    ['camera', 'Your own choice', 'Send us a photo of any product you like and we will arrange it for you.'],
  ]
  return (
    <section id="why"><div className="wrap why">
      <div className="logocard"><Logo /><p className="sub" style={{ margin: 0 }}>Trusted home ware store for over 25 years.</p></div>
      <div className="feats">{f.map(([ic, t, d]) => <div className="f" key={t}><Icon name={ic} /><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>
  )
}

export function Custom() {
  return (
    <section id="custom" className="tint"><div className="wrap custom">
      <div className="card">
        <h2 style={{ fontSize: 'clamp(30px,4.5vw,52px)' }}>Have a product in mind?</h2>
        <p className="sub" style={{ marginBottom: 0 }}>If you already know what you want, we can arrange it for you.</p>
        <ol className="steps">
          <li><i>1</i><span>Take a clear photo of the product.</span></li>
          <li><i>2</i><span>Send it to us on WhatsApp.</span></li>
          <li><i>3</i><span>We confirm availability and the best rate.</span></li>
        </ol>
        <a className="btn wa" href={waLink('Hello Patel Selection, I am sending a photo of the product I need.')} target="_blank" rel="noopener noreferrer"><Icon name="camera" /> Send a photo on WhatsApp</a>
      </div>
      <div className="card dk">
        <h2 style={{ fontSize: 'clamp(28px,4vw,46px)' }}>Ordering in bulk?</h2>
        <p className="sub">Orders of 10 or more chairs get free delivery. Call Arvind Patel to plan your order.</p>
        <a className="btn red" href={`tel:${PHONE}`}><Icon name="phone" /> Call {PHONE_DISPLAY}</a>
      </div>
    </div></section>
  )
}

function Count({ n, label }: { n: number; label: string }) {
  const ref = useRef<HTMLElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const f = (t: number) => { const k = Math.min(1, (t - t0) / 1400); setV(Math.round(n * k)); if (k < 1) requestAnimationFrame(f) }
      requestAnimationFrame(f)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [n])
  return <div><strong ref={ref}>{v}{n === 25 && v === 25 ? '+' : ''}</strong><small>{label}</small></div>
}

export function Stats() {
  return (
    <div className="stats"><div className="wrap">
      <Count n={25} label="+ years in Ahmedabad" /><Count n={500} label="+ product ranges" />
      <Count n={25} label="+ leading brands" /><Count n={2} label="+ hours or less to reply" />
    </div></div>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="tint"><div className="wrap">
      <h2>Questions customers ask us</h2>
      <p className="sub">Plastic chairs, tables and home ware in Ahmedabad: quick answers about rates, brands and delivery.</p>
      <div className="faq">
        {FAQ.map((f, i) => (
          <details key={f.q} open={open === i} onToggle={e => { if ((e.currentTarget as HTMLDetailsElement).open) setOpen(i); else if (open === i) setOpen(-1) }}>
            <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </div></section>
  )
}

export function Founder() {
  const F = FOUNDER
  return (
    <div className="founder">
      <div className="fphoto">
        <img src={`${import.meta.env.BASE_URL}${F.photo}`} alt={`${F.name}, Owner of Patel Selection`} width={785} height={1000} loading="lazy" decoding="async" />
        <div className="fyears"><strong>{F.years}</strong><small>years</small></div>
      </div>
      <div className="ftext">
        <span className="livebadge">Arvind Patel</span>
        <h3>{F.headline}</h3>
        <p className="fstory">{F.story}</p>
        <div className="fname"><b>{F.name}</b><small>{F.role}</small></div>
        <ul className="fpts">{F.points.map(([t, d]) => <li key={t}><i><Icon name="check" /></i><div><b>{t}</b><span>{d}</span></div></li>)}</ul>
      </div>
    </div>
  )
}

export function Visit() {
  return (
    <section id="visit"><div className="wrap">
      <h2>Visit the shop</h2>
      <p className="sub">Easy to find on Ambli-Bopal Road, Ahmedabad, between the Tata Motors and Mercedes showrooms and close to Bopal, South Bopal and Ambli.</p>
      <div className="visit">
        <div className="card">
          <div className="addr">Patel Selection<br />Opp. Tata Motors Show Room, Nr. Mercedes Show Room, Ambli-Bopal Road, Ahmedabad-380058</div>
          <p className="sub" style={{ margin: '14px 0 20px' }}>Owner: Arvind Patel</p>
          <a className="btn red" href={`tel:${PHONE}`}><Icon name="phone" /> Call {PHONE_DISPLAY}</a>
        </div>
        <div className="shopbox">
          <img src={`${IMG_BASE}shop.jpg`} alt="Patel Selection plastic chairs and home ware shop front on Ambli-Bopal Road, Ahmedabad" width={1200} height={900} loading="lazy" decoding="async" />
          <div><a className="btn ghost" href="https://www.google.com/maps/search/?api=1&query=Patel+Selection+Ambli+Bopal+Road+Ahmedabad+380058" target="_blank" rel="noopener noreferrer"><Icon name="pin" /> Get directions</a></div>
        </div>
      </div>
      <Founder />
    </div></section>
  )
}

