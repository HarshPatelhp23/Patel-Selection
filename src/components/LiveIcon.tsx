import type { ReactNode } from 'react'
import type { Category } from '../data/products'

export type LiveKind =
  | 'chair' | 'dining' | 'center' | 'cabinet' | 'shoe' | 'stool'
  | 'plastic' | 'crockery' | 'thermo' | 'kitchen' | 'nonstick' | 'moulded' | 'appliance'
  | 'truck' | 'tag' | 'chat'

export const CAT_KIND: Record<Category, LiveKind> = {
  'Chairs': 'chair', 'Dining Tables': 'dining', 'Center Tables': 'center', 'Cabinets': 'cabinet', 'Shoe Racks': 'shoe', 'Step Stools': 'stool',
}
export const DEPT_KIND: Record<string, LiveKind> = {
  'plastic-wares': 'plastic', 'crockery': 'crockery', 'thermo-wares': 'thermo', 'kitchen-wares': 'kitchen',
  'non-stick-cook-wares': 'nonstick', 'moulded-furniture': 'moulded', 'home-appliances': 'appliance',
}

/**
 * Small line drawings of what the shop sells, each with its own looping movement:
 * the rocking chair rocks, the cabinet doors open, the pot lid bobs with steam, the pan tosses an egg...
 * They are plain SVG + CSS (no JavaScript), so they cost nothing and keep running everywhere.
 */
const ART: Record<LiveKind, ReactNode> = {
  chair: (
    <g className="a-rock">
      <path d="M15 5v23" /><path d="M15 28h20" /><path d="M15 17h14" /><path d="M17 28v12M33 28v12" /><path d="M9 43c9 4 21 4 30 0" />
    </g>
  ),
  dining: (
    <>
      <path d="M5 24h38" /><path d="M10 24v17M38 24v17" /><path d="M10 33h28" opacity=".5" />
      <g className="a-hop"><path d="M18 24c0-7 12-7 12 0" /><path d="M24 15v-2" /></g>
      <path className="a-steam" d="M20 11c-2-2 2-3 0-6M28 11c-2-2 2-3 0-6" />
    </>
  ),
  center: (
    <>
      <path d="M5 22h38" /><path d="M9 22v17M39 22v17" /><path d="M11 32h26" />
      <path className="a-shine" d="M12 18l5-4" /><path d="M15 22h2" />
      <g className="a-sway"><path d="M24 22v-6" /><path d="M24 17c-4-1-5-5-4-7 3 0 5 3 4 7zM24 15c4-1 5-5 4-7-3 0-5 3-4 7z" /></g>
    </>
  ),
  cabinet: (
    <>
      <rect x="9" y="5" width="30" height="38" rx="2" /><path d="M13 16h22M13 27h22" opacity=".45" /><circle cx="20" cy="22" r="1.3" /><circle cx="28" cy="22" r="1.3" />
      <g className="a-doorL"><rect x="9" y="5" width="15" height="38" rx="1.5" fill="var(--li-fill,transparent)" /><path d="M21 24v-4" /></g>
      <g className="a-doorR"><rect x="24" y="5" width="15" height="38" rx="1.5" fill="var(--li-fill,transparent)" /><path d="M27 24v-4" /></g>
    </>
  ),
  shoe: (
    <>
      <path d="M9 4v40M39 4v40" /><path d="M9 15h30M9 27h30M9 39h30" />
      <g className="a-slide"><path d="M13 13v-4h6l3 3h3v1z" /></g>
      <g className="a-slide b"><path d="M25 25v-4h6l3 3h3v1z" /></g>
      <g className="a-slide c"><path d="M13 37v-4h6l3 3h3v1z" /></g>
    </>
  ),
  stool: (
    <>
      <path d="M12 22h24M15 33h18" /><path d="M13 22l-4 20M35 22l4 20M16 33l-3 9M32 33l3 9" /><path d="M18 40h12" opacity=".5" />
      <g className="a-hop"><ellipse cx="24" cy="15" rx="4.5" ry="6" /><path d="M20 25h8" /></g>
    </>
  ),
  plastic: (
    <>
      <g className="a-tilt"><path d="M12 18h24l-3 25H15z" /><path d="M13 25h22" opacity=".5" /><path d="M14 18c0-11 20-11 20 0" /></g>
      <path className="a-drop" d="M24 2c-3 4-3 7 0 7s3-3 0-7z" />
    </>
  ),
  crockery: (
    <>
      <g className="a-wobble"><ellipse cx="22" cy="35" rx="17" ry="6" /><ellipse cx="22" cy="35" rx="10" ry="3" opacity=".6" /></g>
      <path d="M30 10h12v8a6 6 0 0 1-12 0z" /><path d="M42 12h2a3 3 0 0 1 0 6h-2" />
      <path className="a-steam" d="M33 7c-2-2 2-3 0-6M38 7c-2-2 2-3 0-6" />
    </>
  ),
  thermo: (
    <>
      <path d="M17 12h14v28a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3z" /><path d="M16 7h16v5H16z" /><path d="M17 24h14M17 32h14" opacity=".5" />
      <path className="a-steam" d="M20 5c-3-2 3-3 0-5M28 5c-3-2 3-3 0-5" />
    </>
  ),
  kitchen: (
    <>
      <path d="M9 26h30v11a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4z" /><path d="M4 30h5M39 30h5" />
      <g className="a-lid"><path d="M11 26c0-8 26-8 26 0z" /><path d="M24 18v-3" /></g>
      <circle className="a-bub" cx="19" cy="12" r="1.8" /><circle className="a-bub b" cx="27" cy="12" r="1.4" />
    </>
  ),
  nonstick: (
    <>
      <ellipse cx="22" cy="32" rx="15" ry="6" /><path d="M37 31h9" /><path d="M7 32v3c0 4 7 7 15 7s15-3 15-7v-3" />
      <g className="a-toss"><circle cx="22" cy="20" r="4.5" /><circle cx="22" cy="20" r="1.6" /></g>
      <path className="a-spark" d="M10 24l-2-3M34 24l2-3" />
    </>
  ),
  moulded: (
    <g className="a-bounce">
      <path d="M8 22v16h32V22" /><path d="M8 22c0-7 7-7 7 0v6M40 22c0-7-7-7-7 0v6" /><path d="M15 28h18" /><path d="M11 38v4M37 38v4" />
    </g>
  ),
  appliance: (
    <>
      <path d="M18 5v9M30 5v9" /><path d="M13 14h22v8a11 11 0 0 1-22 0z" /><path d="M24 33v10" />
      <path className="a-bolt" d="M26 17l-5 8h6l-4 7" />
    </>
  ),
  truck: (
    <>
      <g className="a-drive"><path d="M3 14h24v20H3zM27 21h9l6 7v6H27z" /><circle cx="12" cy="37" r="4" className="wh" /><circle cx="35" cy="37" r="4" className="wh" /><path d="M30 24h5" /></g>
      <path className="a-road" d="M0 44h48" />
    </>
  ),
  tag: (
    <g className="a-swing"><path d="M24 3v8" /><path d="M10 15h28l-3 26a3 3 0 0 1-3 2H16a3 3 0 0 1-3-2z" /><circle cx="24" cy="11" r="2" /><path d="M18 27h12M20 34h8" /></g>
  ),
  chat: (
    <>
      <path d="M6 8h36v24H20l-9 8v-8H6z" />
      <circle className="a-dot" cx="16" cy="20" r="2" /><circle className="a-dot b" cx="24" cy="20" r="2" /><circle className="a-dot c" cx="32" cy="20" r="2" />
    </>
  ),
}

export default function LiveIcon({ kind, size = 44, className = '' }: { kind: LiveKind; size?: number; className?: string }) {
  return (
    <svg className={`li li-${kind} ${className}`} viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" focusable="false">{ART[kind]}</svg>
  )
}
