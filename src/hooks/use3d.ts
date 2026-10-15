import { useEffect, useRef, useState } from 'react'

export type Status = 'idle' | 'loading' | 'ready' | 'failed'

/**
 * Starts a 3D scene only when its box is about to scroll into view (so nothing 3D slows the first paint),
 * and cleans it up completely when it leaves the page. If the phone cannot do WebGL the status becomes "failed".
 */
export function use3D<T extends { dispose(): void }>(factory: (cv: HTMLCanvasElement, host: HTMLElement) => Promise<T> | T, enabled: boolean, deps: unknown[] = []) {
  const cv = useRef<HTMLCanvasElement>(null)
  const host = useRef<HTMLDivElement>(null)
  const [api, setApi] = useState<T | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  useEffect(() => {
    if (!enabled) return
    const el = host.current
    if (!el) return
    let dead = false, inst: T | null = null
    const go = async () => {
      if (!cv.current) return
      setStatus('loading')
      try {
        const t = await factory(cv.current, el)
        if (dead) { t.dispose(); return }
        inst = t; setApi(t); setStatus('ready')
      } catch (e) { console.warn('3D unavailable', e); if (!dead) setStatus('failed') }
    }
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); go() } }, { rootMargin: '300px' })
    io.observe(el)
    return () => { dead = true; io.disconnect(); inst?.dispose(); setApi(null); setStatus('idle') }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps])
  return { cv, host, api, status }
}

/** True when the visitor asked for less motion or a light connection: 3D extras stay off. */
export const calm = () => {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
  return matchMedia('(prefers-reduced-motion: reduce)').matches || !!nav.connection?.saveData
}
