import * as THREE from 'three'
import type { ProductType } from '../data/products'
import { buildModel, envFor, look } from './models'

/**
 * When something is added to the list, a small 3D copy of it jumps out of the button, spins along a curved path
 * leaving a trail of sparks, and lands on the "My list" button. One shared transparent canvas, removed again when idle.
 */
interface Flight { obj: THREE.Object3D; p0: THREE.Vector2; p1: THREE.Vector2; p2: THREE.Vector2; t: number; dur: number; size: number; done?: () => void }
const POOL = 220

let R: THREE.WebGLRenderer | null = null
let cv: HTMLCanvasElement, scene: THREE.Scene, cam: THREE.OrthographicCamera
let W = 1, H = 1
const flights: Flight[] = []
let pts: THREE.Points, pPos: Float32Array, pCol: Float32Array, pVel: Float32Array, pLife: Float32Array, pHead = 0
let raf = 0, last = 0, idle = 0
let tex: THREE.Texture

function spark() {
  const c = document.createElement('canvas'); c.width = c.height = 32
  const x = c.getContext('2d')!, g = x.createRadialGradient(16, 16, 0, 16, 16, 16)
  g.addColorStop(0, '#fff'); g.addColorStop(0.4, 'rgba(255,255,255,.6)'); g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, 32, 32); return new THREE.CanvasTexture(c)
}

function ensure() {
  clearTimeout(idle)
  if (R) return
  cv = document.createElement('canvas')
  Object.assign(cv.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '150' })
  cv.setAttribute('aria-hidden', 'true')
  document.body.appendChild(cv)
  R = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true })
  R.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); look(R)
  scene = new THREE.Scene(); scene.environment = envFor(R); scene.environmentIntensity = 0.9
  scene.add(new THREE.HemisphereLight(0xffffff, 0x4466aa, 0.9))
  const d = new THREE.DirectionalLight(0xffffff, 1.6); d.position.set(200, 300, 400); scene.add(d)
  cam = new THREE.OrthographicCamera(0, 1, 0, -1, -2000, 2000)
  tex = spark()
  pPos = new Float32Array(POOL * 3); pCol = new Float32Array(POOL * 3); pVel = new Float32Array(POOL * 3); pLife = new Float32Array(POOL)
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pPos, 3)); g.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
  pts = new THREE.Points(g, new THREE.PointsMaterial({ size: 16, map: tex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: false }))
  pts.frustumCulled = false; scene.add(pts)
  size(); addEventListener('resize', size)
}
function size() {
  if (!R) return
  W = innerWidth; H = innerHeight
  R.setSize(W, H, false)
  cam.left = 0; cam.right = W; cam.top = 0; cam.bottom = -H; cam.updateProjectionMatrix()
}
function emit(x: number, y: number, n: number, speed: number, hot = true) {
  for (let i = 0; i < n; i++) {
    const k = pHead++ % POOL, a = Math.random() * 6.283, s = speed * (0.3 + Math.random())
    pPos.set([x, -y, 10], k * 3); pVel.set([Math.cos(a) * s, Math.sin(a) * s, 0], k * 3); pLife[k] = 1
    const c = hot ? (Math.random() < 0.5 ? [1, 0.25, 0.25] : [1, 0.85, 0.85]) : [0.5, 0.7, 1]
    pCol.set(c, k * 3)
  }
}
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function tick(now: number) {
  raf = requestAnimationFrame(tick)
  const dt = Math.min(0.04, (now - last) / 1000); last = now
  for (let i = flights.length - 1; i >= 0; i--) {
    const f = flights[i]; f.t += dt / f.dur
    const t = Math.min(1, f.t), e = ease(t), u = 1 - e
    const x = u * u * f.p0.x + 2 * u * e * f.p1.x + e * e * f.p2.x, y = u * u * f.p0.y + 2 * u * e * f.p1.y + e * e * f.p2.y
    f.obj.position.set(x, -y, 0)
    const pop = t < 0.18 ? 0.6 + (t / 0.18) * 0.6 : 1.2 - 0.95 * ((t - 0.18) / 0.82)
    f.obj.scale.setScalar(Math.max(0.01, f.size * pop))
    f.obj.rotation.y += dt * 11; f.obj.rotation.x = 0.5 * Math.sin(t * 9); f.obj.rotation.z = 0.35 * Math.sin(t * 6)
    emit(x, y, 2, 40)
    if (t >= 1) { emit(f.p2.x, f.p2.y, 34, 220); scene.remove(f.obj); f.obj.traverse(o => { const m = o as THREE.Mesh; m.geometry?.dispose(); const mat = m.material as THREE.Material | undefined; mat?.dispose() }); f.done?.(); flights.splice(i, 1) }
  }
  let alive = false
  for (let i = 0; i < POOL; i++) {
    if (pLife[i] <= 0) { pCol[i * 3] = pCol[i * 3 + 1] = pCol[i * 3 + 2] = 0; continue }
    alive = true; pLife[i] -= dt * 1.7
    pPos[i * 3] += pVel[i * 3] * dt; pPos[i * 3 + 1] += pVel[i * 3 + 1] * dt; pVel[i * 3] *= 0.94; pVel[i * 3 + 1] *= 0.94
    const f = Math.pow(0.12, dt); pCol[i * 3] *= f; pCol[i * 3 + 1] *= f; pCol[i * 3 + 2] *= f
  }
  ;(pts.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
  ;(pts.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true
  R!.render(scene, cam)
  if (!flights.length && !alive) { cancelAnimationFrame(raf); raf = 0; idle = window.setTimeout(dispose, 6000) }
}

function dispose() {
  if (!R || raf) return
  removeEventListener('resize', size)
  pts.geometry.dispose(); (pts.material as THREE.Material).dispose(); tex.dispose()
  R.dispose(); R.forceContextLoss(); cv.remove(); R = null
}

export function fly(from: DOMRect, to: DOMRect, spec: { type: ProductType; brand: string; name: string; color: string }, done?: () => void) {
  try {
    ensure()
    const obj = buildModel(spec.type, spec.brand, spec.name, spec.color)
    const bb = new THREE.Box3().setFromObject(obj), s = bb.getSize(new THREE.Vector3())
    const unit = 1 / Math.max(s.x, s.y, s.z)
    const p0 = new THREE.Vector2(from.left + from.width / 2, from.top + from.height / 2)
    const p2 = new THREE.Vector2(to.left + to.width / 2, to.top + to.height / 2)
    const p1 = new THREE.Vector2((p0.x + p2.x) / 2 + (p0.x < p2.x ? -40 : 40), Math.min(p0.y, p2.y) - 150)
    const size = 92 * unit
    obj.scale.setScalar(0.01); obj.position.set(p0.x, -p0.y, 0)
    scene.add(obj)
    flights.push({ obj, p0, p1, p2, t: 0, dur: 0.95, size, done })
    emit(p0.x, p0.y, 18, 160)
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick) }
  } catch { done?.() }
}
