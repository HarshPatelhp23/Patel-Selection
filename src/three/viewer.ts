import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { ProductType } from '../data/products'
import { buildModel, envFor, look } from './models'

export interface ViewerSpec { type: ProductType; brand: string; name: string; color: string }
export interface Viewer {
  setColor(c: string): void
  setSpin(on: boolean): void
  /** true when this phone can place the product in the room (WebXR augmented reality) */
  arSupported: Promise<boolean>
  startAR(): Promise<void>
  dispose(): void
}

/** Rough real-world height in metres, so the AR model appears at a believable size. */
function realHeight(s: ViewerSpec) {
  if (s.type === 'cabinet') return /4 foot/i.test(s.name) ? 1.22 : 0.64
  if (s.type === 'shoe') return /big/i.test(s.name) ? 1.2 : 0.65
  if (s.type === 'chair') return /baby/i.test(s.name) ? 0.55 : 0.9
  return { dining: 0.75, center: 0.45, stool: 0.45 }[s.type as 'dining'] ?? 0.8
}
const outBack = (x: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2) }

function sparkleTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 64
  const x = c.getContext('2d')!, g = x.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.3, 'rgba(255,255,255,.5)'); g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

/**
 * Interactive 3D view of one product: drag to turn it, pinch/scroll to zoom, change its colour,
 * glossy plastic with studio reflections, real-time soft shadows, floating sparkles,
 * and "see it in your room" augmented reality on phones that support it.
 */
export function mountViewer(cv: HTMLCanvasElement, host: HTMLElement, spec: ViewerSpec): Viewer {
  const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' })
  R.setPixelRatio(Math.min(devicePixelRatio || 1, 2))
  R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap
  look(R)

  const scene = new THREE.Scene()
  scene.environment = envFor(R); scene.environmentIntensity = 0.85
  const cam = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
  cam.position.set(0, 2.6, 9)

  scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x1a2a66, 0.6))
  const key = new THREE.DirectionalLight(0xffffff, 1.7); key.position.set(4, 8, 5); key.castShadow = true
  key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.0005; key.shadow.radius = 5
  Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 22 })
  scene.add(key)
  const red = new THREE.PointLight(0xe8161c, 55, 22); red.position.set(-4.5, 2.4, -3); scene.add(red)
  const blue = new THREE.PointLight(0x3a63e6, 45, 22); blue.position.set(4.5, 1.2, -4); scene.add(blue)

  // glossy turntable with a glowing rim
  const stage = new THREE.Group(); scene.add(stage)
  const plat = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 2.8, 0.16, 72),
    new THREE.MeshPhysicalMaterial({ color: 0xe9efff, roughness: 0.22, metalness: 0.12, clearcoat: 1, clearcoatRoughness: 0.12 }))
  plat.position.y = -0.08; plat.receiveShadow = true; stage.add(plat)
  const rim = new THREE.Mesh(new THREE.TorusGeometry(2.78, 0.035, 12, 120), new THREE.MeshBasicMaterial({ color: new THREE.Color('#e8161c').multiplyScalar(2.4), toneMapped: false }))
  rim.rotation.x = Math.PI / 2; rim.position.y = 0.0; stage.add(rim)
  const rim2 = new THREE.Mesh(new THREE.TorusGeometry(3.15, 0.02, 10, 120), new THREE.MeshBasicMaterial({ color: new THREE.Color('#3a63e6').multiplyScalar(2.2), toneMapped: false }))
  rim2.rotation.x = Math.PI / 2; rim2.position.y = -0.05; stage.add(rim2)

  // product
  const model = buildModel(spec.type, spec.brand, spec.name, spec.color)
  model.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh) { m.castShadow = true; m.receiveShadow = true } })
  const bb0 = new THREE.Box3().setFromObject(model), sz0 = bb0.getSize(new THREE.Vector3())
  const fit = 3.1 / Math.max(sz0.x, sz0.y * 1.1, sz0.z)
  const arScale = realHeight(spec) / sz0.y
  model.scale.setScalar(0.001); stage.add(model)

  // sparkles
  const N = 140, sp = new Float32Array(N * 3), sd = new Float32Array(N)
  for (let i = 0; i < N; i++) { const a = Math.random() * 6.283, r = 1.2 + Math.random() * 2.4; sp.set([Math.cos(a) * r, Math.random() * 4, Math.sin(a) * r], i * 3); sd[i] = Math.random() }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3))
  const tex = sparkleTexture()
  const sparks = new THREE.Points(sg, new THREE.PointsMaterial({ size: 0.16, map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffd0d2 }))
  scene.add(sparks)

  const controls = new OrbitControls(cam, cv)
  controls.target.set(0, 1.35, 0); controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.07
  controls.minDistance = 4.5; controls.maxDistance = 12; controls.minPolarAngle = 0.35; controls.maxPolarAngle = Math.PI / 2 - 0.04
  controls.autoRotate = true; controls.autoRotateSpeed = 1.6
  cv.style.touchAction = 'pan-y'   // vertical finger swipes still scroll the page
  let resume = 0
  controls.addEventListener('start', () => { controls.autoRotate = false; clearTimeout(resume) })
  controls.addEventListener('end', () => { resume = window.setTimeout(() => { if (spinOn) controls.autoRotate = true }, 3500) })
  let spinOn = true

  // colour change (smooth)
  const target = new THREE.Color(spec.color)
  const setColor = (c: string) => target.set(c)

  // size
  const fitSize = () => {
    const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return
    R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix()
    cam.position.setLength(THREE.MathUtils.clamp(9 / Math.min(1, cam.aspect * 1.15), 9, 13))
  }
  const ro = new ResizeObserver(fitSize); ro.observe(host); fitSize()

  // AR (WebXR hit-test): tap the floor to put the product in your room
  const xr = (navigator as Navigator & { xr?: any }).xr
  const arSupported: Promise<boolean> = xr?.isSessionSupported ? xr.isSessionSupported('immersive-ar').catch(() => false) : Promise.resolve(false)
  let hitSource: any = null, reticle: THREE.Mesh | null = null, inAR = false
  async function startAR() {
    if (!xr) return
    const session = await xr.requestSession('immersive-ar', { requiredFeatures: ['hit-test'], optionalFeatures: ['dom-overlay'], domOverlay: { root: document.body } })
    R.xr.enabled = true; R.xr.setReferenceSpaceType('local')
    await R.xr.setSession(session)
    inAR = true; controls.enabled = false
    stage.children.forEach(c => { if (c !== model) c.visible = false }); sparks.visible = false
    model.visible = false; model.scale.setScalar(arScale)
    reticle = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.16, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xe8161c, toneMapped: false }))
    reticle.matrixAutoUpdate = false; reticle.visible = false; scene.add(reticle)
    const viewerSpace = await session.requestReferenceSpace('viewer')
    hitSource = await session.requestHitTestSource({ space: viewerSpace })
    stage.position.set(0, 0, 0)
    session.addEventListener('select', () => {
      if (!reticle?.visible) return
      stage.position.setFromMatrixPosition(reticle.matrix); model.visible = true
    })
    session.addEventListener('end', () => {
      hitSource?.cancel?.(); hitSource = null; inAR = false
      if (reticle) { scene.remove(reticle); reticle = null }
      R.xr.enabled = false
      stage.position.set(0, 0, 0); stage.children.forEach(c => { c.visible = true }); sparks.visible = true
      model.visible = true; controls.enabled = true
      fitSize()
    })
  }

  // frame loop
  let T = 0, visible = true
  const frame = (time?: number, xrFrame?: any) => {
    const dt = Math.min(0.05, clock.getDelta()); T += dt
    if (inAR) {
      if (xrFrame && hitSource && reticle) {
        const hits = xrFrame.getHitTestResults(hitSource), ref = R.xr.getReferenceSpace()
        if (hits.length) { reticle.visible = true; reticle.matrix.fromArray(hits[0].getPose(ref).transform.matrix) } else reticle.visible = false
      }
      R.render(scene, cam); return
    }
    const k = Math.min(1, T / 1.0), s = fit * Math.max(0.001, outBack(k))
    model.scale.setScalar(s)
    if (k < 1) model.rotation.y = (1 - k) * 5
    model.userData.body.forEach((m: THREE.MeshStandardMaterial) => m.color.lerp(target, Math.min(1, dt * 7)))
    rim.rotation.z += dt * 0.3; rim2.rotation.z -= dt * 0.2
    const p = sg.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < N; i++) { let y = p.getY(i) + dt * (0.2 + sd[i] * 0.5); if (y > 4.2) y = 0; p.setY(i, y); p.setX(i, p.getX(i) + Math.sin(T + sd[i] * 20) * dt * 0.1) }
    p.needsUpdate = true
    controls.update(); R.render(scene, cam)
  }
  const clock = new THREE.Clock()
  R.setAnimationLoop(frame)
  // sleep when scrolled away
  const io = new IntersectionObserver(e => {
    visible = e[0].isIntersecting
    if (!inAR) { R.setAnimationLoop(visible ? frame : null); if (visible) clock.getDelta() }
  }); io.observe(host)

  return {
    setColor, arSupported, startAR,
    setSpin(on) { spinOn = on; controls.autoRotate = on },
    dispose() {
      R.setAnimationLoop(null); io.disconnect(); ro.disconnect(); controls.dispose(); clearTimeout(resume)
      scene.traverse(o => {
        const m = o as THREE.Mesh
        if (m.geometry) m.geometry.dispose()
        const mat = m.material as THREE.Material | THREE.Material[] | undefined
        if (mat) (Array.isArray(mat) ? mat : [mat]).forEach(x => x.dispose())
      })
      tex.dispose(); R.dispose(); R.forceContextLoss()
    },
  }
}
