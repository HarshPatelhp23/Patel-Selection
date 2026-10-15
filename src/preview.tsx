import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Preview only: all photos are packed into this one file, so point every ./images/... address at its packed copy.
const packed = import.meta.glob('../public/images/**/*.{jpg,jpeg,png,webp,svg}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const map: Record<string, string> = {}
for (const k in packed) map['./' + k.split('public/')[1]] = packed[k]
const orig = Element.prototype.setAttribute
Element.prototype.setAttribute = function (n: string, v: string) { return orig.call(this, n, n === 'src' && map[v] ? map[v] : v) }
createRoot(document.getElementById('root')!).render(<HashRouter><App /></HashRouter>)
