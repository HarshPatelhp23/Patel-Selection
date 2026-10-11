import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export interface ListItem {
  key: string
  label: string
  qty: number
  img?: string | null    // picture shown in the list
  photo?: string | null  // real photo address, sent to WhatsApp so the shop can recognise the item
  chair?: boolean
}
type NewItem = Omit<ListItem, 'qty'>

interface Ctx {
  items: ListItem[]
  count: number
  bump: number
  add: (i: NewItem, qty?: number) => void
  toggle: (i: NewItem) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  has: (key: string) => boolean
  drawer: boolean              // phone: the "My list" drawer is open
  setDrawer: (open: boolean) => void
}
const C = createContext<Ctx>(null as unknown as Ctx)
export const useEnquiry = () => useContext(C)

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ListItem[]>([])
  const [bump, setBump] = useState(0)
  const [drawer, setDrawer] = useState(false)
  const add = useCallback((i: NewItem, qty = 1) => {
    setItems(l => l.some(x => x.key === i.key) ? l.map(x => x.key === i.key ? { ...x, qty: x.qty + qty } : x) : [...l, { ...i, qty }])
    setBump(b => b + 1)
  }, [])
  const toggle = useCallback((i: NewItem) => {
    setItems(l => l.some(x => x.key === i.key) ? l.filter(x => x.key !== i.key) : [...l, { ...i, qty: 1 }])
    setBump(b => b + 1)
  }, [])
  const setQty = useCallback((key: string, qty: number) => setItems(l => qty < 1 ? l.filter(x => x.key !== key) : l.map(x => x.key === key ? { ...x, qty: Math.min(qty, 999) } : x)), [])
  const remove = useCallback((key: string) => setItems(l => l.filter(x => x.key !== key)), [])
  const clear = useCallback(() => setItems([]), [])
  const value = useMemo(() => ({ items, count: items.length, bump, add, toggle, setQty, remove, clear, has: (k: string) => items.some(x => x.key === k), drawer, setDrawer }), [items, bump, add, toggle, setQty, remove, clear, drawer])
  return <C.Provider value={value}>{children}</C.Provider>
}

/** WhatsApp message with every item, quantity and (for showroom products) the photo link. */
export function buildMessage(items: ListItem[], name = '') {
  const lines = items.map((x, i) => `${i + 1}. ${x.label} x ${x.qty}${x.photo ? `\n   Photo: ${x.photo}` : ''}`)
  return `Hello Patel Selection, ${name.trim() ? `I am ${name.trim()}. ` : ''}Please share the best rates for:\n${lines.join('\n')}`
}
