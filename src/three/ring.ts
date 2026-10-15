import * as THREE from 'three'
import type { ProductType } from '../data/products'
import { buildModel, envFor, look } from './models'

export interface RingItem { type: ProductType; brand: string; name: string; color: string }
export interface RingApi { goTo(i: number): void; step(d: number): void; dispose(): void }

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const TAU = Math.PI * 2

/**
 * A turntable "showroom": the product types stand on a glowing ring. Drag to spin it with momentum,
 * the one in front grows and spins under a spotlight, tap it to open that range.
 */
export function mountRing(cv: HTMLCanvasElement, host: HTMLElement, items: RingItem[], cb: { onFocus(i: number): void; onOpen(i: number): void }): RingApi {
  const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' })
  R.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); look(R)
  R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene(); scene.environment = envFor(R); scene.environmentIntensity = 0.8
  const cam = new THREE.PerspectiveCamera(34, 1, 0.1, 120)
  scene.add(new THREE.HemisphereLight(0xcbd8ff, 0x101a55, 0.55))
  const spot = new THREE.SpotLight(0xffffff, 520, 40, 0.42, 0.6, 1.4); spot.position.set(0, 12, 8); spot.target.position.set(0, 1, 4.6)
  spot.castShadow = true; spot.shadow.mapSize.set(1024, 1024); spot.shadow.bias = -0.0004
  scene.add(spot, spot.target)
  const redL = new THREE.PointLight(0xe8161c, 90, 30); redL.position.set(-7, 3, -2); scene.add(redL)
  const blueL = new THREE.PointLight(0x3a63e6, 80, 30); blueL.position.set(7, 3, -2); scene.add(blueL)

  const N = items.length, RAD = 4.7, STEP = TAU / N

  // floor: dark glossy disc + glowing rings
  const floor = new THREE.Mesh(new THREE.CircleGeometry(9, 96), new THREE.MeshPhysicalMaterial({ color: 0x0a1650, roughness: 0.18, metalness: 0.55, clearcoat: 1 }))
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor)
  const rings: THREE.Mesh[] = []
  ;([[RAD, '#e8161c', 2.8, 0.05], [RAD + 1.5, '#3a63e6', 2.4, 0.03], [RAD - 1.5, '#ffffff', 1.6, 0.02]] as const).forEach(([r, c, k, tube]) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 10, 160), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), toneMapped: false }))
    m.rotation.x = Math.PI / 2; m.position.y = 0.02; scene.add(m); rings.push(m)
  })

  // products
  const objs: THREE.Group[] = [], base: number[] = []
  items.forEach(it => {
    const o = buildModel(it.type, it.brand, it.name, it.color)
    o.traverse(x => { const m = x as THREE.Mesh; if (m.isMesh) { m.castShadow = true; m.receiveShadow = true } })
    const bb = new THREE.Box3().setFromObject(o), s = bb.getSize(new THREE.Vector3())
    base.push(2.6 / Math.max(s.x * 1.15, s.y, s.z * 1.15))
    const holder = new THREE.Group(); holder.add(o); scene.add(holder); objs.push(holder)
  })

  // floating light dust
  const PN = 260, pp = new Float32Array(PN * 3), ps = new Float32Array(PN)
  for (let i = 0; i < PN; i++) { const a = Math.random() * TAU, r = 1 + Math.random() * 8; pp.set([Math.cos(a) * r, Math.random() * 7, Math.sin(a) * r], i * 3); ps[i] = Math.random() }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pp, 3))
  const pc = document.createElement('canvas'); pc.width = pc.height = 32
  const px = pc.getContext('2d')!, gr = px.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, '#fff'); gr.addColorStop(1, 'rgba(255,255,255,0)'); px.fillStyle = gr; px.fillRect(0, 0, 32, 32)
  const pt = new THREE.CanvasTexture(pc)
  const dust = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.14, map: pt, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0x9fb8ff }))
  scene.add(dust)

  // state
  let rot = 0, rotT = 0, vel = 0, T = 0, front = 0, dragging = false, lastX = 0, downX = 0, downT = 0, moved = 0, idleT = 0, hover = -1
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2()
  const frontOf = () => ((Math.round(-rotT / STEP) % N) + N) % N
  const goTo = (i: number) => {
    const want = -i * STEP, diff = ((((want - rotT) % TAU) + TAU + Math.PI) % TAU) - Math.PI
    rotT = rotT + diff; idleT = 0
  }
  const stepBy = (d: number) => { rotT = Math.round(rotT / STEP) * STEP - d * STEP; idleT = 0 }

  const pick = (e: PointerEvent) => {
    const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    ray.setFromCamera(ndc, cam)
    const hit = ray.intersectObjects(objs, true)[0]
    if (!hit) return -1
    let o: THREE.Object3D | null = hit.object
    while (o && !objs.includes(o as THREE.Group)) o = o.parent
    return o ? objs.indexOf(o as THREE.Group) : -1
  }
  cv.style.touchAction = 'pan-y'; cv.style.cursor = 'grab'; cv.tabIndex = 0
  const down = (e: PointerEvent) => { dragging = true; lastX = downX = e.clientX; downT = performance.now(); moved = 0; vel = 0; idleT = 0; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing' }
  const move = (e: PointerEvent) => {
    if (dragging) {
      const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx)
      const d = dx * 0.0085; rotT += d; rot += d; vel = d
    } else { const h = pick(e); if (h !== hover) { hover = h; cv.style.cursor = h >= 0 ? 'pointer' : 'grab' } }
  }
  const up = (e: PointerEvent) => {
    if (!dragging) return
    dragging = false; cv.style.cursor = hover >= 0 ? 'pointer' : 'grab'
    if (moved < 7 && performance.now() - downT < 450) {
      const h = pick(e)
      if (h >= 0) { if (h === frontOf()) cb.onOpen(h); else goTo(h) }
      return
    }
    rotT += vel * 14; rotT = Math.round(rotT / STEP) * STEP   // momentum, then snap to the nearest product
  }
  const key = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { stepBy(1); e.preventDefault() } else if (e.key === 'ArrowLeft') { stepBy(-1); e.preventDefault() }
    else if (e.key === 'Enter') cb.onOpen(frontOf())
  }
  cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move); cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up); cv.addEventListener('keydown', key)

  const fit = () => {
    const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return
    R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix()
    const a = w / h, d = clamp(15.5 / Math.min(1, a / 1.3), 15.5, 26)
    cam.position.set(0, 4.6 + (d - 15.5) * 0.22, d); cam.lookAt(0, 1.2, 3)
  }
  const ro = new ResizeObserver(fit); ro.observe(host); fit()

  const clock = new THREE.Clock()
  const frame = () => {
    const dt = Math.min(0.05, clock.getDelta()); T += dt
    if (!dragging) { idleT += dt; if (idleT > 5.5) { stepBy(1) } }   // gentle auto-tour when nobody touches it
    rot += (rotT - rot) * Math.min(1, dt * 5.5)
    const f = frontOf(); if (f !== front) { front = f; cb.onFocus(f) }
    for (let i = 0; i < N; i++) {
      const a = i * STEP + rot, c = Math.cos(a), focus = Math.max(0, c) ** 3
      const o = objs[i]
      o.position.set(Math.sin(a) * RAD, 0.05 + focus * 0.35 + Math.sin(T * 1.4 + i) * 0.04 * focus, Math.cos(a) * RAD)
      o.scale.setScalar(base[i] * (0.62 + 0.55 * focus) * (hover === i ? 1.06 : 1))
      o.rotation.y = a + T * 0.9 * focus + Math.sin(T * 0.5 + i) * 0.1
    }
    rings.forEach((r, i) => { r.rotation.z += dt * (0.1 + i * 0.05) * (i % 2 ? -1 : 1) })
    spot.target.position.set(Math.sin(rot * 0) * 0, 1, RAD)
    const p = pg.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < PN; i++) { let y = p.getY(i) + dt * (0.2 + ps[i] * 0.5); if (y > 7) y = 0; p.setY(i, y) }
    p.needsUpdate = true
    R.render(scene, cam)
  }
  R.setAnimationLoop(frame)
  const io = new IntersectionObserver(e => { R.setAnimationLoop(e[0].isIntersecting ? frame : null); if (e[0].isIntersecting) clock.getDelta() }); io.observe(host)
  cb.onFocus(0)

  return {
    goTo, step: stepBy,
    dispose() {
      R.setAnimationLoop(null); io.disconnect(); ro.disconnect()
      cv.removeEventListener('pointerdown', down); cv.removeEventListener('pointermove', move); cv.removeEventListener('pointerup', up); cv.removeEventListener('pointercancel', up); cv.removeEventListener('keydown', key)
      scene.traverse(o => { const m = o as THREE.Mesh; m.geometry?.dispose(); const mat = m.material as THREE.Material | THREE.Material[] | undefined; if (mat) (Array.isArray(mat) ? mat : [mat]).forEach(x => x.dispose()) })
      pt.dispose(); R.dispose(); R.forceContextLoss()
    },
  }
}
