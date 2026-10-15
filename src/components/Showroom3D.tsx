import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { L } from './Link'
import { use3D, calm } from '../hooks/use3d'
import { langPath, pick, useLang, useT } from '../i18n'
import { CAT } from '../data/categories'
import { CATEGORIES, categoryPath, type Category } from '../data/products'

const SPEC: Record<Category, { name: string; brand: string; color: string }> = {
  'Chairs': { brand: 'Showroom', name: 'Paradise', color: '#e8161c' },
  'Dining Tables': { brand: 'Showroom', name: 'Party Round Dining Table', color: '#f1f5ff' },
  'Center Tables': { brand: 'Showroom', name: 'Breeze (Glass Top)', color: '#2f56d6' },
  'Cabinets': { brand: 'Showroom', name: 'Power Series, 4 Foot', color: '#dfe6fb' },
  'Shoe Racks': { brand: 'Showroom', name: 'Power Big Shoe Rack', color: '#e8161c' },
  'Step Stools': { brand: 'Showroom', name: 'Stool 21', color: '#2f56d6' },
}
const TYPE = { 'Chairs': 'chair', 'Dining Tables': 'dining', 'Center Tables': 'center', 'Cabinets': 'cabinet', 'Shoe Racks': 'shoe', 'Step Stools': 'stool' } as const

/** Drag-to-spin 3D showroom of the six product types. The normal category links stay underneath for everyone. */
export default function Showroom3D() {
  const t = useT(), lang = useLang(), nav = useNavigate()
  const [front, setFront] = useState(0)
  const [off, setOff] = useState(false)
  useEffect(() => { if (calm()) setOff(true) }, [])
  const { cv, host, api, status } = use3D(
    (c, h) => import('../three/ring').then(m => m.mountRing(c, h, CATEGORIES.map(k => ({ type: TYPE[k], ...SPEC[k] })), {
      onFocus: setFront, onOpen: i => nav(langPath(lang, categoryPath(CATEGORIES[i]))),
    })), !off, [lang])
  const cat = CATEGORIES[front]
  return (
    <section className="sec showroom"><div className="wrap">
      <div className="sec-h"><div><h2>{t('showroomTitle')}</h2><p className="sub">{t('showroomHint')}</p></div></div>
      <div className="ring" ref={host}>
        {!off && <canvas ref={cv} aria-label={t('showroomTitle')} />}
        {!off && status === 'loading' && <span className="v3d-load">{t('loading3d')}</span>}
        <div className="ring-ui">
          <button type="button" className="rbtn" onClick={() => api?.step(-1)} aria-label={t('prev')}><Icon name="left" /></button>
          <L to={categoryPath(cat)} className="btn red big"><span>{t('openRange', { cat: pick(CAT[cat].name, lang) })}</span> <Icon name="right" /></L>
          <button type="button" className="rbtn" onClick={() => api?.step(1)} aria-label={t('next')}><Icon name="right" /></button>
        </div>
      </div>
    </div></section>
  )
}
