import { calm } from '../hooks/use3d'
import { colorOf } from '../three/palette'
import type { Product } from '../data/products'

/** Sends a little 3D copy of the product from the button to the "My list" button. Never blocks adding to the list. */
export function flyToList(from: Element, p: Product) {
  if (calm()) return
  const target = ['.mylist', '.tabs .ticon'].map(s => document.querySelector(s)).find(el => el && (el as HTMLElement).offsetWidth > 0)
  if (!target) return
  const a = from.getBoundingClientRect(), b = target.getBoundingClientRect()
  import('../three/flyer').then(m => m.fly(a, b, { type: p.type, brand: p.brand, name: p.name, color: colorOf(p.brand, p.name) }, () => {
    target.classList.remove('bump'); void (target as HTMLElement).offsetWidth; target.classList.add('bump')
  })).catch(() => {})
}
