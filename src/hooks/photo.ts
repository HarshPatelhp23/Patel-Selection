import manifest from 'virtual:photo-manifest'
import { BASE } from '../config'

/**
 * Real product photos live in public/images/products. A photo belongs to a product when its file name
 * (lowercase, words joined by "-") equals the product slug, e.g. nilkamal-paradise.jpeg -> Nilkamal Paradise.
 */
const norm = (file: string) => file.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const byName = new Map<string, string>()
manifest.forEach(f => { if (!byName.has(norm(f))) byName.set(norm(f), `${BASE}${f}`) })

/** Address of the product's photo, or null if none was added yet */
export const photoOf = (slug: string): string | null => byName.get(slug) ?? null
