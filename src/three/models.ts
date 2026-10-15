import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import type { ProductType } from '../data/products'

import { hs, colorOf } from './palette'
export { PALETTE, colorOf } from './palette'

export interface Model extends THREE.Group { userData: { body: THREE.MeshStandardMaterial[] } }

/** Builds a simple plastic-furniture model for each product type. */
export function buildModel(type: ProductType, brand: string, name: string, col: string): Model {
  const g = new THREE.Group()
  const h = hs(brand + name)
  const body: THREE.MeshStandardMaterial[] = []
  const M = (c: string, o: THREE.MeshStandardMaterialParameters = {}, track = true) => {
    const m = new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.38, metalness: 0.04, clearcoat: 0.7, clearcoatRoughness: 0.22, ...o })
    if (track && c === col) body.push(m)
    return m
  }
  const bx = (w: number, hh: number, d: number, x: number, y: number, z: number, m?: THREE.Material) => {
    const o = new THREE.Mesh(new THREE.BoxGeometry(w, hh, d), m ?? M(col)); o.position.set(x, y, z); g.add(o); return o
  }
  const cy = (rt: number, rb: number, hh: number, x: number, y: number, z: number, m?: THREE.Material) => {
    const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, hh, 24), m ?? M(col)); o.position.set(x, y, z); g.add(o); return o
  }
  const legs = (r: number, hh: number, x: number, z: number, y0: number) =>
    ([[-1, -1], [1, -1], [-1, 1], [1, 1]] as const).forEach(([a, c]) => cy(r * 0.8, r, hh, a * x, y0 + hh / 2, c * z))

  if (type === 'chair') {
    const baby = /baby/i.test(name), relax = /relax|spine|cushion/i.test(name)
    bx(1, 0.12, 1, 0, 0.9, 0); legs(0.06, 0.9, 0.42, 0.42, 0)
    const k = bx(1, relax ? 1.3 : 1, 0.1, 0, relax ? 1.6 : 1.5, -0.45); k.rotation.x = relax ? -0.35 : -0.12
    if (h % 2 === 0 || relax) [-1, 1].forEach(a => { bx(0.1, 0.08, 0.9, a * 0.5, 1.25, 0); bx(0.08, 0.35, 0.08, a * 0.5, 1.07, 0.4) })
    if (baby) g.scale.setScalar(0.65)
  } else if (type === 'dining') {
    const rd = /round/i.test(name)
    if (rd) cy(1.3, 1.3, 0.1, 0, 1.5, 0); else bx(2.6, 0.1, 1.5, 0, 1.5, 0)
    legs(0.09, 1.45, rd ? 0.8 : 1.15, rd ? 0.8 : 0.6, 0)
  } else if (type === 'center') {
    const glass = /glass/i.test(name)
    bx(2, 0.1, 1.1, 0, 0.8, 0, glass ? new THREE.MeshStandardMaterial({ color: 0xdfe6fb, transparent: true, opacity: 0.4, roughness: 0.05 }) : undefined)
    legs(0.07, 0.75, 0.85, 0.4, 0); bx(1.8, 0.05, 0.9, 0, 0.3, 0)
  } else if (type === 'cabinet') {
    const t = /4 foot/i.test(name) ? 3.2 : 2.2, dk = M('#061a5c', {}, false)
    bx(1.5, t, 0.7, 0, t / 2, 0)
    ;[-1, 1].forEach(a => { bx(0.7, t - 0.2, 0.04, a * 0.37, t / 2, 0.37, M(col === '#ffffff' ? '#dfe6fb' : col)); cy(0.03, 0.03, 0.3, a * 0.1, t / 2, 0.43, dk) })
  } else if (type === 'shoe') {
    const big = /big/i.test(name), t = big ? 2.4 : 1.3, N = big ? 5 : 3
    bx(0.06, t, 0.6, -0.7, t / 2, 0); bx(0.06, t, 0.6, 0.7, t / 2, 0); bx(1.4, t, 0.04, 0, t / 2, -0.3); bx(1.4, 0.06, 0.6, 0, t, 0)
    for (let i = 0; i < N; i++) bx(1.36, 0.05, 0.58, 0, 0.1 + (i * (t - 0.1)) / (N - 1.01), 0).rotation.x = 0.08
  } else {
    bx(1, 0.12, 0.8, 0, 0.55, 0.1); bx(0.7, 0.12, 0.55, 0, 1, -0.2); legs(0.05, 0.55, 0.42, 0.35, 0)
    ;[-1, 1].forEach(a => cy(0.04, 0.05, 0.5, a * 0.3, 0.75, -0.3))
  }
  g.userData.body = body
  const bb = new THREE.Box3().setFromObject(g), c = bb.getCenter(new THREE.Vector3())
  g.position.set(-c.x, -bb.min.y, -c.z)
  const w = new THREE.Group() as Model
  w.userData.body = body
  w.add(g)
  return w
}

/** Lights plus a soft floor shadow. */
export function makeScene() {
  const sc = new THREE.Scene()
  sc.add(new THREE.HemisphereLight(0xffffff, 0x334477, 0.7))
  const d = new THREE.DirectionalLight(0xffffff, 1.4); d.position.set(3, 6, 4); sc.add(d)
  const c = document.createElement('canvas'); c.width = c.height = 128
  const x = c.getContext('2d')!, gr = x.createRadialGradient(64, 64, 4, 64, 64, 64)
  gr.addColorStop(0, 'rgba(0,0,0,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, 128, 128)
  const sh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }))
  sh.rotation.x = -Math.PI / 2; sh.position.y = 0.01; sc.add(sh); sc.userData.sh = sh
  return sc
}

/** Places the camera so the model fits. Returns the camera distance and look-at height. */
export function fitCamera(sc: THREE.Scene, obj: THREE.Object3D, cam: THREE.PerspectiveCamera, k: number) {
  const bb = new THREE.Box3().setFromObject(obj), sz = bb.getSize(new THREE.Vector3()), m = Math.max(sz.x, sz.y, sz.z)
  sc.userData.sh.scale.setScalar(m * 1.6)
  const dist = m * k
  cam.position.set(dist * 0.7, sz.y * 0.8 + dist * 0.25, dist * 0.9)
  cam.lookAt(0, sz.y * 0.42, 0)
  return { dist, ty: sz.y * 0.42 }
}

// ---- small static pictures of the models, used on the product cards ----
let TR: THREE.WebGLRenderer | null = null
let tcam: THREE.PerspectiveCamera
const cache = new Map<string, string>()

export function thumbOf(type: ProductType, brand: string, name: string): string {
  const key = type + brand + name
  const hit = cache.get(key)
  if (hit) return hit
  try {
    if (!TR) {
      TR = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true })
      TR.setSize(420, 350); TR.setPixelRatio(1); look(TR)
      tcam = new THREE.PerspectiveCamera(35, 420 / 350, 0.1, 100)
    }
    const sc = makeScene(), o = buildModel(type, brand, name, colorOf(brand, name))
    o.rotation.y = -0.6; sc.add(o); sc.environment = envFor(TR); sc.environmentIntensity = 0.6; fitCamera(sc, o, tcam, 2.6)
    TR.render(sc, tcam)
    const url = TR.domElement.toDataURL('image/png')
    cache.set(key, url)
    return url
  } catch { return '' }
}


// ---- realistic look: studio reflections + colour-true tone mapping ----
const envs = new WeakMap<THREE.WebGLRenderer, THREE.Texture>()
/** Soft studio reflections (one per renderer) that make the plastic look glossy and real. */
export function envFor(R: THREE.WebGLRenderer): THREE.Texture {
  let t = envs.get(R)
  if (!t) {
    const pm = new THREE.PMREMGenerator(R)
    t = pm.fromScene(new RoomEnvironment(), 0.04).texture
    pm.dispose(); envs.set(R, t)
  }
  return t
}
/** Colour-true tone mapping so the logo red and blue stay accurate. */
export function look(R: THREE.WebGLRenderer) { R.toneMapping = THREE.NeutralToneMapping; R.toneMappingExposure = 1 }
