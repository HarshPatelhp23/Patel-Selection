import { useState } from 'react'
import Icon, { type IconName } from './Icon'
import { RANGES, waLink } from '../data/products'
import { buildMessage, useEnquiry } from '../state/Enquiry'

const DEPT_ICON: IconName[] = ['bucket', 'plate', 'flask', 'pot', 'pan', 'sofa', 'plug']

/** One list for everything: showroom products (with photo) and the other store departments. Sent in one WhatsApp message. */
export default function Enquiry() {
  const L = useEnquiry()
  const [name, setName] = useState('')
  const chairs = L.items.filter(x => x.chair).reduce((n, x) => n + x.qty, 0)
  const send = () => window.open(waLink(buildMessage(L.items, name)), '_blank', 'noopener')
  return (
    <section id="range" className="tint"><div className="wrap">
      <h2>Your enquiry list</h2>
      <p className="sub">Add products from the showroom above or tap a department below. Send the whole list to us in one WhatsApp message and we reply with the best rates.</p>
      <div className="enq">
        <div className="depts">
          <h3>Other departments</h3>
          <div className="dgrid">{RANGES.map((r, i) => {
            const on = L.has(r)
            return (
              <button key={r} className={`dept${on ? ' on' : ''}`} onClick={() => L.toggle({ key: r, label: r })}>
                <Icon name={DEPT_ICON[i]} /><span>{r}</span><em>{on ? 'Added ✓' : '+ Add'}</em>
              </button>
            )
          })}</div>
        </div>
        <div className="elist" id="enquire">
          <div className="elhead"><h3>My list</h3><span className="ecount">{L.count}</span>{L.count > 0 && <button className="lnk" onClick={L.clear}>Clear all</button>}</div>
          {L.count === 0 ? (
            <div className="empty"><Icon name="list" /><p>Your list is empty.<br />Open a product in the showroom and press <b>Add to list</b>, or tap a department.</p></div>
          ) : (
            <ul className="items">{L.items.map(x => (
              <li key={x.key}>
                {x.img ? <img src={x.img} alt="" /> : <span className="ph"><Icon name="bag" /></span>}
                <div><b>{x.label}</b><small>{x.photo ? 'Photo will be sent' : 'Department'}</small></div>
                <div className="qty"><button onClick={() => L.setQty(x.key, x.qty - 1)} aria-label="Less"><Icon name="minus" /></button><span>{x.qty}</span><button onClick={() => L.setQty(x.key, x.qty + 1)} aria-label="More"><Icon name="plus" /></button></div>
              </li>))}
            </ul>
          )}
          {chairs > 0 && (
            <div className="dprog"><div><i style={{ width: `${Math.min(100, chairs * 10)}%` }} /></div>
              <small>{chairs >= 10 ? 'Free delivery unlocked for your chairs' : `Add ${10 - chairs} more chair${10 - chairs === 1 ? '' : 's'} for free delivery`}</small></div>
          )}
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" autoComplete="name" aria-label="Your name" />
          <button className="btn wa" style={{ width: '100%' }} disabled={L.count === 0} onClick={send}><Icon name="chat" /> Send list on WhatsApp</button>
          <p className="note" style={{ marginTop: 10 }}>Photos of showroom products are sent as links so we can recognise the exact item.</p>
        </div>
      </div>
    </div></section>
  )
}
