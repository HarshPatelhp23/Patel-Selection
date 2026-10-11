import type { Category } from '../data/products'

let pending: Category | null = null

/**
 * Opens the showroom on a given category and scrolls to it (used by the category shortcuts in the hero).
 * The showroom loads after the first screen, so the choice is remembered until the showroom is ready to read it.
 */
export function jumpToCategory(c: Category) {
  pending = c
  window.dispatchEvent(new CustomEvent<Category>('showroom:cat', { detail: c }))
  document.getElementById('best')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function takePendingCategory(): Category | null {
  const c = pending
  pending = null
  return c
}
