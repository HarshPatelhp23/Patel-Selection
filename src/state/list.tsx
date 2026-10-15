import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

export interface ListItem {
  key: string
  label: string
  qty: number
  img?: string | null   // picture shown in the list
  url?: string | null   // address of the product page, sent to WhatsApp so the shop sees the exact item
  chair?: boolean
}
export type NewItem = Omit<ListItem, 'qty'>

interface Ctx {
  items: ListItem[]
  count: number
  qtyOf: (key: string) => number
  add: (i: NewItem, qty?: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  open: boolean
  setOpen: (o: boolean) => void
  toast: { id: number; label: string } | null
}
const C = createContext<Ctx>(null as unknown as Ctx)
export const useList = () => useContext(C)
const STORE = 'ps-list-v1'

export function ListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ListItem[]>([])
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<Ctx['toast']>(null)
  const loaded = useRef(false)
  const timer = useRef(0)

  // The list is read from the phone after the page has loaded (so the first paint matches the server page) and saved on every change.
  useEffect(() => {
    try { const s = localStorage.getItem(STORE); if (s) setItems(JSON.parse(s)) } catch { /* storage blocked */ }
    loaded.current = true
  }, [])
  useEffect(() => {
    if (!loaded.current) return
    try { localStorage.setItem(STORE, JSON.stringify(items)) } catch { /* storage blocked */ }
  }, [items])
  useEffect(() => {
    const sync = (e: StorageEvent) => { if (e.key === STORE && e.newValue) try { setItems(JSON.parse(e.newValue)) } catch { /* ignore */ } }
    addEventListener('storage', sync); return () => removeEventListener('storage', sync)
  }, [])
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    addEventListener('keydown', key)
    return () => { document.body.style.overflow = prev; removeEventListener('keydown', key) }
  }, [open])

  const add = useCallback((i: NewItem, qty = 1) => {
    setItems(l => l.some(x => x.key === i.key) ? l.map(x => x.key === i.key ? { ...x, qty: Math.min(999, x.qty + qty) } : x) : [...l, { ...i, qty }])
    setToast({ id: Date.now(), label: i.label })
    clearTimeout(timer.current); timer.current = window.setTimeout(() => setToast(null), 3800)
  }, [])
  const setQty = useCallback((key: string, qty: number) => setItems(l => qty < 1 ? l.filter(x => x.key !== key) : l.map(x => x.key === key ? { ...x, qty: Math.min(qty, 999) } : x)), [])
  const remove = useCallback((key: string) => setItems(l => l.filter(x => x.key !== key)), [])
  const clear = useCallback(() => setItems([]), [])
  const value = useMemo<Ctx>(() => ({
    items, count: items.length, qtyOf: k => items.find(x => x.key === k)?.qty ?? 0,
    add, setQty, remove, clear, open, setOpen, toast,
  }), [items, add, setQty, remove, clear, open, toast])
  return <C.Provider value={value}>{children}</C.Provider>
}
