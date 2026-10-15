import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { L } from './Link'
import { useLang, useT, pick } from '../i18n'
import { PAGE } from '../data/pages'
import { photoOf } from '../hooks/photo'
import { PHONE, PHONE_DISPLAY } from '../config'

const COLLAGE = ['nilkamal-paradise', 'cello-unique', 'national-party-round-roma-dining-table', 'national-power-series-4-foot']

export default function Hero() {
  const lang = useLang(), t = useT()
  const cv = useRef<HTMLCanvasElement>(null), host = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false), [skip, setSkip] = useState(false)

  // The 3D scene is only an extra on large screens. It starts after the page is already usable, so nothing waits for it.
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || nav.connection?.saveData) { setSkip(true); return }
    let stop = () => {}, dead = false
    const go = () => import('../three/heroScene').then(m => { if (!dead && cv.current && host.current) { stop = m.mountHero(cv.current, host.current); setReady(true) } }).catch(() => {})
    const id = (window as any).requestIdleCallback ? (window as any).requestIdleCallback(go, { timeout: 2500 }) : window.setTimeout(go, 900)
    return () => { dead = true; stop(); (window as any).cancelIdleCallback?.(id); clearTimeout(id) }
  }, [])

  return (
    <section className={`hero${ready ? ' is3d' : ''}${skip ? ' skip3d' : ''}`} ref={host}>
      <canvas ref={cv} className={`hero-cv${ready ? ' on' : ''}`} aria-hidden="true" />
      <div className="wrap hero-in">
        <div className="hero-txt">
          <span className="pill"><i /> {pick(PAGE.home.pill, lang)}</span>
          <h1>{pick(PAGE.home.h1a, lang)} <em>{pick(PAGE.home.h1b, lang)}</em></h1>
          <p className="lead">{pick(PAGE.home.lead, lang)}</p>
          <div className="hero-cta">
            <L to="/products" className="btn red big"><Icon name="bag" /> {t('products')}</L>
            <a className="btn ghost big" href={`tel:${PHONE}`}><Icon name="phone" /> {PHONE_DISPLAY}</a>
          </div>
          <ul className="hero-badges"><li><Icon name="truck" /> {t('freeDeliveryBadge')}</li><li><Icon name="tag" /> {t('askRate')}</li></ul>
        </div>
        <div className="collage" aria-hidden="true">
          {COLLAGE.map((s, i) => { const p = photoOf(s); return p ? <img key={s} src={p} alt="" width={450} height={450} loading={i < 2 ? 'eager' : 'lazy'} {...(i === 0 ? { fetchpriority: 'high' } : {})} decoding="async" /> : null })}
        </div>
      </div>
    </section>
  )
}
