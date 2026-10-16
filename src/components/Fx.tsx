import { useEffect, useRef } from 'react'

const CARDS = '.ls-card,.pc,.cc,.dc,.why-c,.box'
const TILT = '.cc,.pc,.dc,.why-c'
const MAG = '.btn,.hcall,.mylist,.bchip,.tbtn,.chip'

/**
 * Page-wide live effects: a glowing cursor, buttons that lean toward the pointer, cards that light up and tilt in 3D
 * under it, a scroll progress bar, and a brand strip that skews with scroll speed. Mouse effects are off on touch screens
 * and everything is off for visitors who asked for less motion.
 */
export default function Fx() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null), bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const fine = matchMedia('(pointer:fine)').matches
    let raf = 0, x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, big = false
    let mag: HTMLElement | null = null, tilted: HTMLElement | null = null
    const reset = () => {
      if (mag) { mag.style.translate = ''; mag = null }
      if (tilted) { tilted.style.removeProperty('--tx'); tilted.style.removeProperty('--ty'); tilted = null }
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX; y = e.clientY
      const t = e.target as Element
      const card = t.closest<HTMLElement>(CARDS)
      if (card) { const r = card.getBoundingClientRect(); card.style.setProperty('--gx', `${e.clientX - r.left}px`); card.style.setProperty('--gy', `${e.clientY - r.top}px`) }
      const tl = t.closest<HTMLElement>(TILT)
      if (tl !== tilted) { if (tilted) { tilted.style.removeProperty('--tx'); tilted.style.removeProperty('--ty') } tilted = tl }
      if (tl) { const r = tl.getBoundingClientRect(); tl.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * 9}deg`); tl.style.setProperty('--ty', `${-((e.clientY - r.top) / r.height - 0.5) * 9}deg`) }
      const m = t.closest<HTMLElement>(MAG)
      if (m !== mag) { if (mag) mag.style.translate = ''; mag = m }
      if (m) { const r = m.getBoundingClientRect(); m.style.translate = `${(e.clientX - (r.left + r.width / 2)) * 0.16}px ${(e.clientY - (r.top + r.height / 2)) * 0.26}px` }
      big = !!t.closest('a,button,.ls-card,input,select')
    }
    addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', reset)

    const tick = () => {
      raf = requestAnimationFrame(tick)
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) scale(${big ? 1.9 : 1})`
    }
    if (fine) tick()

    // scroll progress + brand strip skew
    let lastY = scrollY, v = 0, sraf = 0
    const strip = () => {
      sraf = requestAnimationFrame(strip)
      const d = scrollY - lastY; lastY = scrollY
      v += (Math.max(-12, Math.min(12, d)) - v) * 0.12
      document.querySelectorAll<HTMLElement>('.mq').forEach(b => { b.style.transform = `skewX(${(-v * 0.9).toFixed(2)}deg)` })
      const h = document.documentElement.scrollHeight - innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`
    }
    strip()
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(sraf); removeEventListener('pointermove', move); document.removeEventListener('pointerleave', reset) }
  }, [])
  return <><div className="prog" ref={bar} aria-hidden="true" /><div className="cdot" ref={dot} aria-hidden="true" /><div className="cring" ref={ring} aria-hidden="true" /></>
}
