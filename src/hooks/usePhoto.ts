import { useMemo } from 'react'
import manifest from 'virtual:photo-manifest'
import { PRODUCTS } from '../data/products'

/**
 * Real product photos.
 * Put photos anywhere inside public/images (best: public/images/products).
 * A photo belongs to a product when its file name, written in lowercase with "-", matches the product:
 *   nilkamal-paradise.jpg  ->  Nilkamal Paradise      (main photo)
 *   nilkamal-paradise-2.jpg, nilkamal-paradise_3.jpg ->  extra angles
 * Capital letters, spaces, "_" and the type (.jpg .jpeg .png .webp) do not matter.
 */
const norm = (file: string) => file.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const url = (f: string) => `${import.meta.env.BASE_URL}${f}`

const byName = new Map<string, string>()
manifest.forEach(f => { if (!byName.has(norm(f))) byName.set(norm(f), url(f)) })

const photosOf = (slug: string) => {
  const main = byName.get(slug)
  if (!main) return [] as string[]
  const list = [main]
  for (let i = 2; i <= 40; i++) { const u = byName.get(`${slug}-${i}`); if (!u) break; list.push(u) }
  return list
}

if (import.meta.env.DEV) {
  const known = PRODUCTS.map(p => p.slug)
  const matched = (n: string) => known.some(s => n === s || new RegExp(`^${s}-\\d+$`).test(n))
  const stray = manifest.filter(f => f.includes('/products/') && !matched(norm(f)))
  if (stray.length) console.warn('[photos] These files in images/products do not match any product name:', stray, '\nExample of a correct name:', known[1] + '.jpg')
}

export const usePhotos = (slug: string) => useMemo(() => photosOf(slug), [slug])
export const usePhoto = (slug: string) => usePhotos(slug)[0] ?? null
