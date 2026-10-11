import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useEnquiry } from '../state/Enquiry'
import { useIsPhone } from '../hooks/useMedia'
import { ListPanel } from './Enquiry'

/** Phones: "My list" slides up as a drawer from any screen, so customers never scroll back to find it. Drag the handle down to close. */
export default function ListDrawer() {
  const { drawer, setDrawer } = useEnquiry()
  const phone = useIsPhone()
  const sheet = useRef<HTMLDivElement>(null)
  const close = () => setDrawer(false)

  useEffect(() => {
    if (!drawer) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawer(false) }
    addEventListener('keydown', key)
    return () => { document.body.style.overflow = prev; removeEventListener('keydown', key) }
  }, [drawer, setDrawer])

  // drag the handle down to close
  const drag = useRef<{ y: number; dy: number } | null>(null)
  const down = (e: React.PointerEvent) => { drag.current = { y: e.clientY, dy: 0 }; e.currentTarget.setPointerCapture(e.pointerId); if (sheet.current) sheet.current.style.transition = 'none' }
  const move = (e: React.PointerEvent) => {
    const d = drag.current; if (!d) return
    d.dy = Math.max(0, e.clientY - d.y)
    if (sheet.current) sheet.current.style.transform = `translateY(${d.dy}px)`
  }
  const up = () => {
    const d = drag.current; drag.current = null
    if (!sheet.current) return
    sheet.current.style.transition = ''; sheet.current.style.transform = ''
    if (d && d.dy > 90) close()
  }

  if (!phone) return null
  return createPortal(
    <div className={`ldrawer${drawer ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="My enquiry list" aria-hidden={!drawer}>
      <div className="ld-back" onClick={close} />
      <div className="ld-sheet" ref={sheet}>
        <div className="ld-grip" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}><i /></div>
        <button className="x" onClick={close} aria-label="Close my list">×</button>
        <div className="ld-body"><ListPanel /></div>
      </div>
    </div>,
    document.body,
  )
}
