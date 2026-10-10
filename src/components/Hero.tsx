import { useEffect, useRef } from 'react'
import Icon from './Icon'
import { PHONE, PHONE_DISPLAY } from '../config'
import { waLink } from '../data/products'
import { mountHero } from '../three/heroScene'

/** The WebGL hero scene (see three/heroScene.ts). Falls back to the CSS gradient if WebGL is unavailable. */
function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    let dispose = () => {}
    try { dispose = mountHero(ref.current!, ref.current!.parentElement!) } catch (e) { console.warn('3D hero unavailable', e) }
    return () => dispose()
  }, [])
  return <canvas id="cv" ref={ref} aria-hidden="true" />
}

export default function Hero() {
  const words = 'Everything for your home,'.split(' ')
  return (
    <>
      <div className="hero" id="hero">
        <HeroScene />
        <div className="hshade" aria-hidden="true" />
        <div className="wrap hg">
          <div>
            <span className="pill"><i className="dot" /> Ambli-Bopal Road, Ahmedabad</span>
            <h1>
              {words.map((w, i) => <span className="w" style={{ animationDelay: `${i * 90}ms` }} key={i}>{w}&nbsp;</span>)}
              <em className="w" style={{ animationDelay: '450ms' }}>under one roof.</em>
            </h1>
            <p className="lead">Plastic chairs, tables, crockery, kitchenware and appliances. Ask Arvind Patel for today's best rate.</p>
            <div className="cta">
              <a className="btn red" href={`tel:${PHONE}`}><Icon name="phone" /> Call {PHONE_DISPLAY}</a>
              <a className="btn ghost" href={waLink('Hello Patel Selection, I need a rate.')} target="_blank" rel="noopener noreferrer"><Icon name="chat" /> WhatsApp us</a>
            </div>
            <p className="hint">Move your mouse or finger near the furniture. Tap anywhere to make it fly.</p>
          </div>
        </div>
        <svg className="badge" viewBox="0 0 120 120" aria-label="Free delivery on 10 or more chairs">
          <defs><path id="bp" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" /></defs>
          <circle cx="60" cy="60" r="59" fill="#e8161c" /><circle cx="60" cy="60" r="31" fill="#fff" />
          <g className="spin"><text fontSize="11" fontWeight="800" fill="#fff"><textPath href="#bp" textLength="288" lengthAdjust="spacing">FREE DELIVERY ON 10+ CHAIRS ✦</textPath></text></g>
          <text x="60" y="67" textAnchor="middle" fontSize="22" fontWeight="800" fill="#0a2a8f" fontFamily="Arial Black,Arial,sans-serif">10+</text>
        </svg>
        <div className="cue" aria-hidden="true"><i /><span>Scroll</span></div>
      </div>
      <div className="band" />
    </>
  )
}
