import { useState } from 'react'
import Icon from './Icon'
import { L } from './Link'
import { Stepper } from './AddButton'
import { useLang, useT, pick } from '../i18n'
import { useList } from '../state/list'
import { buildMessage } from '../state/message'
import { CAT } from '../data/categories'
import { CATEGORIES, categoryPath, waLink } from '../data/products'
import { DEPTS } from '../data/departments'
import { PHONE, PHONE_DISPLAY } from '../config'

/**
 * The customer's list, in three clear steps: check items, add a name, send on WhatsApp.
 * Used in the slide-in drawer (any page) and on the full "My list" page.
 */
export default function ListPanel({ onNavigate }: { onNavigate?: () => void }) {
  const t = useT(), lang = useLang()
  const list = useList()
  const [name, setName] = useState('')
  const [area, setArea] = useState('')
  const chairs = list.items.filter(x => x.chair).reduce((n, x) => n + x.qty, 0)
  const send = () => window.open(waLink(buildMessage(lang, list.items, name, area)), '_blank', 'noopener')

  return (
    <div className="lp">
      {list.count === 0 ? (
        <div className="lp-empty">
          <Icon name="list" />
          <h3>{t('listEmptyTitle')}</h3>
          <p>{t('listEmptyText')}</p>
        </div>
      ) : (
        <>
          <div className="lp-step"><b>1</b> {t('listStep1')} <span className="lp-n">{list.count}</span><button type="button" className="lnk" onClick={list.clear}>{t('clearAll')}</button></div>
          <ul className="lp-items">
            {list.items.map(x => (
              <li key={x.key}>
                {x.img ? <img src={x.img} alt="" width={56} height={56} /> : <span className="ph"><Icon name="bag" /></span>}
                <div className="lp-t">{x.url ? <L to={new URL(x.url).pathname.replace(/^\/(hi|gu)(?=\/)/, '')} onClick={onNavigate}>{x.label}</L> : <b>{x.label}</b>}</div>
                <Stepper qty={x.qty} onChange={q => list.setQty(x.key, q)} label={x.label} />
              </li>
            ))}
          </ul>
          {chairs > 0 && (
            <div className="dprog">
              <div><i style={{ width: `${Math.min(100, chairs * 10)}%` }} /></div>
              <small>{chairs >= 10 ? t('freeDelivOk') : t('freeDelivMore', { n: 10 - chairs })}</small>
            </div>
          )}
          <div className="lp-step"><b>2</b> {t('listStep2')}</div>
          <div className="lp-fields">
            <input value={name} onChange={e => setName(e.target.value)} placeholder={t('yourName')} autoComplete="name" aria-label={t('yourName')} />
            <input value={area} onChange={e => setArea(e.target.value)} placeholder={t('yourArea')} aria-label={t('yourArea')} />
          </div>
          <div className="lp-step"><b>3</b> {t('listStep3')}</div>
          <button type="button" className="btn wa big full" onClick={send}><Icon name="chat" /> {t('sendList')}</button>
          <a className="btn ghost line full" href={`tel:${PHONE}`}><Icon name="phone" /> {t('call')} {PHONE_DISPLAY}</a>
          <p className="note">{t('listNote')} {t('saveNote')}</p>
        </>
      )}

      <div className="lp-more">
        <h4>{t('addMoreProducts')}</h4>
        <div className="chips">{CATEGORIES.map(c => <L key={c} to={categoryPath(c)} className="chip" onClick={onNavigate}>{pick(CAT[c].short, lang)}</L>)}</div>
        <h4>{t('otherDepartments')}</h4>
        <div className="chips">
          {DEPTS.filter(d => d.slug !== 'moulded-furniture').map(d => {
            const on = list.qtyOf(d.key) > 0
            return (
              <button type="button" key={d.key} className={`chip${on ? ' on' : ''}`} aria-pressed={on}
                onClick={() => on ? list.remove(d.key) : list.add({ key: d.key, label: d.name[0] })}>
                {on ? <Icon name="check" /> : <Icon name="plus" />} {pick(d.name, lang)}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
