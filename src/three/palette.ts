/** Colours available in the 3D views: only the logo colours. Kept apart from three.js so pages do not download 3D code for it. */
export const PALETTE = ['#e8161c', '#0a2a8f', '#061a5c', '#ffffff', '#dfe6fb']
export const hs = (t: string) => [...t].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)
export const colorOf = (brand: string, name: string) => PALETTE[hs(brand + name) % PALETTE.length]
