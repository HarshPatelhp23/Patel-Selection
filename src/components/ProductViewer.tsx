import { useEffect, useState } from 'react'
import Icon from './Icon'
import { use3D, calm } from '../hooks/use3d'
import { useT } from '../i18n'
import { PALETTE, colorOf } from '../three/palette'
import type { Product } from '../data/products'

/** Product photo that can switch to a spinning 3D model with colours and AR. The photo is always there first. */
export default function ProductViewer({ p, photo, alt }: { p: Product; photo: string | null; alt: string }) {
  const t = useT()
  const [on, setOn] = useState(false)
  const [color, setColor] = useState(() => colorOf(p.brand, p.name))
  const [spin, setSpin] = useState(true)
  const [ar, setAr] = useState(false)
  const [arErr, setArErr] = useState(false)
  const { cv, host, api, status } = use3D(
    (c, h) => import('../three/viewer').then(m => m.mountViewer(c, h, { type: p.type, brand: p.brand, name: p.name, color })),
    on, [p.slug])

  // after the page is ready, switch to 3D on its own (the visitor can always go back to the photo)
  useEffect(() => {
    if (calm()) return
    const id = window.setTimeout(() => setOn(true), 1400)
    return () => clearTimeout(id)
  }, [p.slug])
  useEffect(() => { api?.setColor(color) }, [api, color])
  useEffect(() => { api?.setSpin(spin) }, [api, spin])
  useEffect(() => { let live = true; api?.arSupported.then(v => live && setAr(v)); return () => { live = false } }, [api])

  const show3d = on && status !== 'failed'
  return (
    <div className="pdp-media">
      <div className={`pdp-img${show3d ? ' is3d' : ''}`} ref={host}>
        {photo && <img className={show3d && status === 'ready' ? 'hide' : ''} src={photo} alt={alt} width={450} height={450} {...{ fetchpriority: 'high' }} decoding="async" />}
        {on && <canvas ref={cv} className="v3d" aria-label={alt} />}
        {on && status === 'loading' && <span className="v3d-load">{t('loading3d')}</span>}
        <div className="v3d-seg" role="group">
          <button type="button" className={!show3d ? 'on' : ''} aria-pressed={!show3d} onClick={() => setOn(false)}><Icon name="camera" /> {t('viewPhoto')}</button>
          <button type="button" className={show3d ? 'on' : ''} aria-pressed={show3d} onClick={() => setOn(true)}><Icon name="cube" /> 3D</button>
        </div>
        {show3d && status === 'ready' && <span className="v3d-hint">{t('dragHint')}</span>}
      </div>
      {status === 'failed' && <p className="note">{t('no3d')}</p>}
      {show3d && status === 'ready' && (
        <div className="v3d-tools">
          <span>{t('tryColour')}</span>
          <div className="sw">{PALETTE.map(c => <button key={c} type="button" style={{ background: c }} className={c === color ? 'on' : ''} aria-label={c} aria-pressed={c === color} onClick={() => setColor(c)} />)}</div>
          <button type="button" className={`chip${spin ? ' on' : ''}`} aria-pressed={spin} onClick={() => setSpin(s => !s)}>{t('autoSpin')}</button>
          {ar && <button type="button" className="btn red" onClick={() => api!.startAR().catch(() => setArErr(true))}><Icon name="pin" /> {t('arBtn')}</button>}
          {arErr && <small className="note">{t('arHelp')}</small>}
        </div>
      )}
      {show3d && status === 'ready' && <p className="note">{t('threeNote')}</p>}
    </div>
  )
}
