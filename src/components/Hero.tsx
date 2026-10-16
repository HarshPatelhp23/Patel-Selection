import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import LiveIcon, { CAT_KIND } from './LiveIcon'
import { Badge } from './Sections'
import { L } from './Link'
import { useLang, useT, pick } from '../i18n'
import { PAGE } from '../data/pages'
import { CAT } from '../data/categories'
import { CATEGORIES, categoryPath } from '../data/products'
import { photoOf } from '../hooks/photo'
import { PHONE, PHONE_DISPLAY } from '../config'

const COLLAGE = ['nilkamal-paradise', 'cello-unique', 'national-party-round-roma-dining-table', 'national-power-series-4-foot']
const DOODLES = ['chair', 'plate', 'pot', 'cabinet', 'flask', 'stool', 'dining', 'plug'] as const

export default function Hero() {
  const lang = useLang(), t = useT()
  const cv = useRef<HTMLCanvasElement>(null), host = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false), [skip, setSkip] = useState(false)

  // The 3D scene is an extra: it starts after the page is already usable and fades in over the same background.
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || nav.connection?.saveData) { setSkip(true); return }
    let stop = () => {}, dead = false
    const go = () => import('../three/heroScene').then(m => { if (!dead && cv.current && host.current) { stop = m.mountHero(cv.current, host.current); setReady(true) } }).catch(() => { setSkip(true) })
    const id = (window as any).requestIdleCallback ? (window as any).requestIdleCallback(go, { timeout: 2500 }) : window.setTimeout(go, 900)
    return () => { dead = true; stop(); (window as any).cancelIdleCallback?.(id); clearTimeout(id) }
  }, [])

  const words = pick(PAGE.home.h1a, lang).split(' ')
  return (
    <section className={`hero${ready ? ' is3d' : ''}${skip ? ' skip3d' : ''}`} ref={host}>
      <div className="doodles" aria-hidden="true">
        {DOODLES.map((k, i) => <span key={k} style={{ left: `${6 + i * 12}%`, top: `${[12, 62, 26, 72, 14, 56, 36, 76][i]}%`, animationDelay: `${i * -1.1}s` }}><LiveIcon kind={k === 'plate' ? 'crockery' : k === 'pot' ? 'kitchen' : k === 'flask' ? 'thermo' : k === 'plug' ? 'appliance' : k} size={56} /></span>)}
      </div>
      <canvas ref={cv} className={`hero-cv${ready ? ' on' : ''}`} aria-hidden="true" />
      <div className="wrap hero-in">
        <div className="hero-txt">
          <span className="pill"><i className="dot" /> {pick(PAGE.home.pill, lang)}</span>
          <h1>
            {words.map((w, i) => <span className="w" style={{ animationDelay: `${i * 70}ms` }} key={i}>{w}&nbsp;</span>)}
            <em className="w" style={{ animationDelay: `${words.length * 70 + 80}ms` }}>{pick(PAGE.home.h1b, lang)}</em>
          </h1>
          <p className="lead">{pick(PAGE.home.lead, lang)}</p>
          <div className="hero-cta">
            <L to="/products" className="btn red big"><Icon name="bag" /> {t('products')}</L>
            <a className="btn ghost big" href={`tel:${PHONE}`}><Icon name="phone" /> {PHONE_DISPLAY}</a>
          </div>
          <div className="hcats" role="group" aria-label={t('jumpTo')}>
            <span className="hcats-t">{t('jumpTo')}</span>
            {CATEGORIES.map((c, i) => (
              <L key={c} to={categoryPath(c)} style={{ animationDelay: `${700 + i * 70}ms` }}><LiveIcon kind={CAT_KIND[c]} size={30} /><span>{pick(CAT[c].short, lang)}</span></L>
            ))}
          </div>
          <p className="hint">{t('heroHint')}</p>
        </div>
        <div className="collage" aria-hidden="true">
          {COLLAGE.map((s, i) => { const p = photoOf(s); return p ? <img key={s} src={p} alt="" width={450} height={450} loading={i < 2 ? 'eager' : 'lazy'} {...(i === 0 ? { fetchpriority: 'high' } : {})} decoding="async" /> : null })}
        </div>
      </div>
      <Badge />
      <div className="cue" aria-hidden="true"><i /><span>{t('scrollCue')}</span></div>
    </section>
  )
}
