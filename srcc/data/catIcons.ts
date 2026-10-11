import type { Category } from './products'

/** Line drawing of each product category, plus the name of the little looping animation it uses (see index.css). */
export const CAT_ICON: Record<Category, [string, string]> = {
  'Chairs': ['M7 3v10h10M7 13v8M17 13v8M5 13h14', 'rock'],
  'Dining Tables': ['M3 9h18M6 9v11M18 9v11M9 9v4M15 9v4', 'hop'],
  'Center Tables': ['M3 11h18M5 11v7M19 11v7M7 16h10', 'pulse'],
  'Cabinets': ['M5 3h14v18H5zM12 3v18M10 12h.01M14 12h.01', 'sway'],
  'Shoe Racks': ['M5 3v18M19 3v18M5 8h14M5 13h14M5 18h14', 'pulse'],
  'Step Stools': ['M6 8h12M8 8l-2 12M16 8l2 12M7 14h10', 'hop'],
}

/** Short names for the tiny labels on phones */
export const CAT_SHORT: Record<Category, string> = {
  'Chairs': 'Chairs', 'Dining Tables': 'Dining', 'Center Tables': 'Center', 'Cabinets': 'Cabinets', 'Shoe Racks': 'Shoes', 'Step Stools': 'Stools',
}
