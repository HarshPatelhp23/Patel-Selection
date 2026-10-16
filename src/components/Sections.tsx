import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import LiveIcon from './LiveIcon'
import { L } from './Link'
import { pick, useLang, useT } from '../i18n'
import { PAGE } from '../data/pages'
import { BRANDS, PRODUCTS, RANGES } from '../data/products'
import { IMG_BASE, OWNER } from '../config'

/** Two rows of brand and range names that glide in opposite directions. */
export function Marquee() {
  const a = [...BRANDS, ...BRANDS], b = [...RANGES, ...RANGES]
  return (
    <div className="mq" aria-hidden="true">
      <div className="track">{a.map((x, i) => <span key={i}>{x} <b>✦</b></span>)}</div>
      <div className="track rev">{b.map((x, i) => <span key={i}>{x} <b>✦</b></span>)}</div>
    </div>
  )
}

function Count({ n, label, plus }: { n: number; label: string; plus?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const [v, setV] = useState(n)   // starts at the real number so the page is correct before any script runs
  useEffect(() => {
    const el = ref.current!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t0 = 0, raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect(); t0 = performance.now(); setV(0)
      const f = (t: number) => { const k = Math.min(1, (t - t0) / 1400); setV(Math.round(n * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(f) }
      raf = requestAnimationFrame(f)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [n])
  return <div><strong ref={ref}>{v}{plus ? '+' : ''}</strong><small>{label}</small></div>
}

export function Stats() {
  const t = useT()
  return (
    <div className="stats"><div className="wrap">
      <Count n={25} plus label={t('years')} /><Count n={PRODUCTS.length} label={t('modelsOnline')} />
      <Count n={BRANDS.length} label={t('brandsStat')} /><Count n={2} label={t('replyStat')} />
    </div></div>
  )
}

/** A truck drives along a road with the free-delivery promise. */
export function DeliveryStrip() {
  const t = useT()
  return (
    <div className="dstrip"><div className="wrap">
      <div className="road"><LiveIcon kind="truck" size={64} /></div>
      <p><Icon name="truck" /> {t('deliveryStrip')}</p>
    </div></div>
  )
}

/** Spinning ring badge: "FREE DELIVERY ON 10+ CHAIRS". */
export function Badge() {
  const t = useT()
  return (
    <svg className="badge" viewBox="0 0 120 120" role="img" aria-label={t('freeDeliveryBadge')}>
      <defs><path id="bp" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" /></defs>
      <circle cx="60" cy="60" r="59" fill="#e8161c" /><circle cx="60" cy="60" r="31" fill="#fff" />
      <g className="spin"><text fontSize="10.5" fontWeight="800" fill="#fff"><textPath href="#bp" textLength="288" lengthAdjust="spacing">{t('badgeText')}</textPath></text></g>
      <text x="60" y="67" textAnchor="middle" fontSize="22" fontWeight="800" fill="#0a2a8f" fontFamily="Arial Black,Arial,sans-serif">10+</text>
    </svg>
  )
}

export function Founder() {
  const lang = useLang(), t = useT(), P = PAGE.about
  return (
    <div className="founder">
      <div className="fphoto">
        <img src={`${IMG_BASE}founder.jpg`} alt={`${OWNER}, owner of Patel Selection, Ahmedabad`} width={785} height={1000} loading="lazy" decoding="async" />
        <div className="fyears"><strong>25+</strong><small>{t('years').split(' ')[0]}</small></div>
      </div>
      <div className="ftext">
        <span className="livebadge"><i /> {t('founderLabel')}</span>
        <h3>{pick(P.headline, lang)}</h3>
        <p className="fstory">{pick(P.story, lang)}</p>
        <div className="fname"><b>{OWNER}</b></div>
        <ul className="fpts">{P.points.map(([a, b], i) => <li key={i}><i><Icon name="check" /></i><div><b>{pick(a, lang)}</b><span>{pick(b, lang)}</span></div></li>)}</ul>
        <L to="/about" className="btn red">{t('about')} →</L>
      </div>
    </div>
  )
}
