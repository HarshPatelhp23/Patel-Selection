import { useEffect, useRef } from 'react'

const CARDS = '.sc,.f,.dept,.cat,.card,.p'
const MAG = '.btn,.hcall,.bchip,.tbtn'

/**
 * Page-wide effects: glowing cursor, magnetic buttons, spotlight on cards, and a marquee that skews with scroll speed.
 * Mouse effects switch off on touch screens.
 */
export default function Fx() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fine = matchMedia('(pointer:fine)').matches
    let raf = 0, x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, big = false
    let mag: HTMLElement | null = null
    const reset = () => { if (mag) { mag.style.translate = ''; mag = null } }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX; y = e.clientY
      const t = e.target as Element
      const card = t.closest<HTMLElement>(CARDS)
      if (card) { const r = card.getBoundingClientRect(); card.style.setProperty('--gx', `${e.clientX - r.left}px`); card.style.setProperty('--gy', `${e.clientY - r.top}px`) }
      const m = t.closest<HTMLElement>(MAG)
      if (m !== mag) { reset(); mag = m }
      if (m) { const r = m.getBoundingClientRect(); m.style.translate = `${(e.clientX - (r.left + r.width / 2)) * 0.18}px ${(e.clientY - (r.top + r.height / 2)) * 0.28}px` }
      big = !!t.closest('a,button,.sc,input')
    }
    addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', reset)

    // cursor follower
    const tick = () => {
      raf = requestAnimationFrame(tick)
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) scale(${big ? 1.9 : 1})`
    }
    if (fine) tick()

    // skew the brand strip with scroll speed
    let lastY = scrollY, v = 0, sraf = 0
    const strip = () => {
      sraf = requestAnimationFrame(strip)
      const d = scrollY - lastY; lastY = scrollY
      v += (Math.max(-12, Math.min(12, d)) - v) * 0.12
      document.querySelectorAll<HTMLElement>('.brands').forEach(b => { b.style.transform = `skewX(${(-v * 0.9).toFixed(2)}deg)` })
    }
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches) strip()

    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(sraf); removeEventListener('pointermove', move); document.removeEventListener('pointerleave', reset) }
  }, [])
  return <><div className="cdot" ref={dot} /><div className="cring" ref={ring} /></>
}
