import { useEffect, useRef } from 'react'
import ListPanel from './ListPanel'
import { useT } from '../i18n'
import { useList } from '../state/list'
import { useLocation } from 'react-router-dom'

/** Slides in from the right on computers and up from the bottom on phones. Opens from the header, the tab bar or the "Added" message. */
export default function ListDrawer() {
  const t = useT()
  const { open, setOpen, count } = useList()
  const close = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false) }, [pathname, setOpen])
  useEffect(() => { if (open) close.current?.focus() }, [open])
  if (!open) return null
  return (
    <div className="ldr" role="dialog" aria-modal="true" aria-label={t('myList')}>
      <div className="ldr-back" onClick={() => setOpen(false)} />
      <div className="ldr-sheet">
        <div className="ldr-head"><h2>{t('myList')} <span className="lp-n">{count}</span></h2>
          <button ref={close} type="button" className="x" onClick={() => setOpen(false)} aria-label={t('close')}>×</button></div>
        <div className="ldr-body"><ListPanel onNavigate={() => setOpen(false)} /></div>
      </div>
    </div>
  )
}
