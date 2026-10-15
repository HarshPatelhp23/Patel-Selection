import { useMemo } from 'react'
import Icon from './Icon'
import { L } from './Link'
import { useLang, useT, langPath } from '../i18n'
import { useList } from '../state/list'
import { photoOf } from '../hooks/photo'
import { absUrl } from '../config'
import { productPath, type Product } from '../data/products'
import { flyToList } from './fly'

export const itemOf = (p: Product, lang: 'en' | 'hi' | 'gu') => ({
  key: p.slug, label: `${p.brand} ${p.name}`, img: photoOf(p.slug),
  url: absUrl(langPath(lang, productPath(p))), chair: p.category === 'Chairs',
})

/**
 * One clear control: "Add to my list" turns into a  - 1 +  stepper in the same place,
 * so the customer always sees what happened and can change the quantity right there.
 */
export function Stepper({ qty, onChange, label }: { qty: number; onChange: (q: number) => void; label?: string }) {
  const t = useT()
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(qty - 1)} aria-label={qty <= 1 ? t('removeItem') : t('less')}><Icon name={qty <= 1 ? 'trash' : 'minus'} /></button>
      <output aria-live="polite">{qty}</output>
      <button type="button" onClick={() => onChange(qty + 1)} aria-label={t('more')}><Icon name="plus" /></button>
    </div>
  )
}

export default function AddButton({ p, big = false }: { p: Product; big?: boolean }) {
  const t = useT(), lang = useLang()
  const list = useList()
  const item = useMemo(() => itemOf(p, lang), [p, lang])
  const qty = list.qtyOf(p.slug)
  if (!qty) {
    return <button type="button" className={`btn red addbtn${big ? ' big' : ''}`} onClick={e => { list.add(item); flyToList(e.currentTarget, p) }}><Icon name="plus" /> {big ? t('addToList') : t('add')}</button>
  }
  return (
    <div className={`inlist${big ? ' big' : ''}`}>
      <Stepper qty={qty} onChange={q => list.setQty(p.slug, q)} label={item.label} />
      <span className="inl-t"><Icon name="check" /> {t('inList')}</span>
      {big && <button type="button" className="btn wa" onClick={() => list.setOpen(true)}><Icon name="list" /> {t('viewList')}</button>}
    </div>
  )
}
