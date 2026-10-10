import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import type { ProductType } from '../data/products'
import { buildModel, envFor, look } from './models'

/* ---------- 1. living shader background: flowing blue liquid with red light that follows the pointer ---------- */
const BG_V = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`
const BG_F = `
varying vec2 vUv;
uniform float uTime; uniform vec2 uMouse; uniform vec2 uRes; uniform float uScroll;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for(int i = 0; i < 5; i++){ v += a*noise(p); p *= 2.02; a *= .5; } return v; }
void main(){
  vec2 p = (vUv - .5) * vec2(uRes.x/uRes.y, 1.) * 2.;
  float t = uTime * .07;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.*q + vec2(1.7, 9.2) + t*1.5), fbm(p + 3.*q + vec2(8.3, 2.8) - t*1.2));
  float f = fbm(p + 3.*r);
  // linear-light versions of the logo colours #061a5c, #0a2a8f, #1b46c9, #e8161c
  vec3 navy = vec3(.0018, .010, .107), blue = vec3(.003, .023, .275), bright = vec3(.011, .06, .58), red = vec3(.807, .008, .012);
  vec3 col = mix(navy, blue, clamp(f*2., 0., 1.));
  col = mix(col, bright, clamp(length(q)*.7, 0., 1.) * .45);
  col = mix(col, red, smoothstep(.75, 1.25, length(r)) * (.28 + uScroll*.4));
  vec2 m = (uMouse - .5) * vec2(uRes.x/uRes.y, 1.) * 2.;
  float d = length(p - m);
  col += red * .35 * exp(-d*d*3.2);
  col += vec3(.02, .08, .6) * .3 * exp(-d*d*.7);
  col *= mix(.5, 1., smoothstep(1.7, .25, length(p*.72)));
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`

/* ---------- 2. glowing dust that streams upwards and bursts when you tap ---------- */
const PT_V = `
attribute float aSeed; attribute vec3 aColor;
uniform float uTime; uniform float uScale; uniform float uBurst;
varying vec3 vC; varying float vA;
void main(){
  vec3 p = position;
  p.y = mod(p.y + uTime * (.25 + aSeed*.6) + 11., 22.) - 11.;
  p.x += sin(uTime*.5 + aSeed*30.) * .5;
  p += normalize(position + vec3(.001)) * uBurst * (1. + aSeed*3.);
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_PointSize = uScale * (.05 + aSeed*.13) / -mv.z;
  gl_Position = projectionMatrix * mv;
  vC = aColor; vA = .3 + .7*aSeed;
}`
const PT_F = `
varying vec3 vC; varying float vA;
void main(){ float d = length(gl_PointCoord - .5); float a = smoothstep(.5, .0, d);
  gl_FragColor = vec4(vC, a * vA);
  #include <colorspace_fragment>
}`

type Spec = [ProductType, string]
const SPEC: Spec[] = [
  ['chair', 'Delhi Model'], ['chair', 'Paradise'], ['chair', 'Bentley (Relax Chair)'], ['stool', 'Eiffel'],
  ['dining', 'Party Round Dining Table'], ['chair', 'Texas'], ['center', 'Breeze (Glass Top)'], ['chair', 'Polo Baby Chair'],
  ['cabinet', 'Power Series, 2 Foot'], ['stool', 'Stool 21'], ['shoe', 'Power Small Shoe Rack'], ['chair', 'Cushion'],
  ['center', 'Spectra'], ['dining', 'Jaipur Dining Table'],
]
const COLORS = ['#e8161c', '#c3d0f5', '#2f56d6', '#e8161c', '#9db4f0', '#1b46c9', '#c3d0f5']
const TYPE_SCALE: Partial<Record<ProductType, number>> = { cabinet: 0.55, shoe: 0.65, dining: 0.8, center: 0.85 }

interface Item {
  obj: THREE.Object3D; base: THREE.Vector3; off: THREE.Vector3; vel: THREE.Vector3
  bs: number; phase: number; spin: number; boost: number; delay: number
}
const ZERO = new THREE.Vector3()
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const outBack = (x: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2) }

/**
 * Immersive hero: shader background + 14 glossy products floating in real 3D that dodge the pointer,
 * scatter on tap, orbit rings, particle dust, bloom glow, and a camera that dives as you scroll.
 * Returns a cleanup function.
 */
export function mountHero(cv: HTMLCanvasElement, host: HTMLElement): () => void {
  const desktop = innerWidth > 900 && !matchMedia('(pointer:coarse)').matches
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches

  const R = new THREE.WebGLRenderer({ canvas: cv, antialias: !desktop, powerPreference: 'high-performance' })
  R.setPixelRatio(Math.min(devicePixelRatio || 1, desktop ? 1.5 : 2))
  R.autoClear = false
  look(R)

  // background scene (full-screen shader)
  const bgScene = new THREE.Scene(), bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const bgMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0.72, 0.5) }, uRes: { value: new THREE.Vector2(1, 1) }, uScroll: { value: 0 } },
    vertexShader: BG_V, fragmentShader: BG_F, depthTest: false, depthWrite: false,
  })
  const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat); bgMesh.frustumCulled = false; bgScene.add(bgMesh)

  // main scene
  const scene = new THREE.Scene()
  const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 100); cam.position.set(0, 0.6, 15)
  scene.environment = envFor(R); scene.environmentIntensity = 0.6
  scene.add(new THREE.HemisphereLight(0xaec6ff, 0x1a2a66, 0.55))
  const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(4, 7, 6); scene.add(key)
  const rim = new THREE.PointLight(0xe8161c, 90, 34); rim.position.set(-6, 2, -3); scene.add(rim)
  const follow = new THREE.PointLight(0xffffff, 40, 22); follow.position.set(0, 0, 4); scene.add(follow)

  const stage = new THREE.Group(); scene.add(stage)

  // products
  const items: Item[] = []
  const n = desktop ? SPEC.length : 9
  for (let i = 0; i < n; i++) {
    const [type, name] = SPEC[i]
    const obj = buildModel(type, 'Patel', name, COLORS[i % COLORS.length])
    const a = i * 2.399963, rad = 2.2 + (i % 5) * 0.82
    const base = new THREE.Vector3(Math.cos(a) * rad * 1.15, Math.sin(a) * rad * 0.8 - 0.3, -4 + (((i * 37) % 9) / 9) * 6)
    const bs = (0.75 + (((i * 13) % 7) / 7) * 0.55) * (TYPE_SCALE[type] ?? 1)
    obj.scale.setScalar(0.001); obj.position.copy(base); obj.rotation.y = i * 1.3
    stage.add(obj)
    items.push({ obj, base, off: new THREE.Vector3(), vel: new THREE.Vector3(), bs, phase: i * 1.7, spin: (i % 2 ? 1 : -1) * (0.25 + (i % 4) * 0.12), boost: 0, delay: 0.25 + i * 0.09 })
  }

  // glowing orbit rings (bright, so the bloom makes them shine)
  const rings: THREE.Mesh[] = []
  ;[[4.4, '#e8161c', 2.6], [5.9, '#ffffff', 1.6], [7.4, '#3a63e6', 2.6]].forEach(([r, c, k], i) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r as number, 0.035, 12, 180),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(c as string).multiplyScalar(k as number), toneMapped: false }))
    m.position.set(0, -0.3, -1); m.rotation.x = Math.PI / 2.35 + i * 0.12; m.rotation.y = i * 0.5
    stage.add(m); rings.push(m)
  })

  // dust particles
  const PN = desktop ? 1400 : 520
  const pos = new Float32Array(PN * 3), seed = new Float32Array(PN), col = new Float32Array(PN * 3)
  const pal = [new THREE.Color('#ffffff'), new THREE.Color('#ff3a40'), new THREE.Color('#8fb0ff')]
  for (let i = 0; i < PN; i++) {
    pos.set([(Math.random() - 0.5) * 34, (Math.random() - 0.5) * 22, -9 + Math.random() * 16], i * 3)
    seed[i] = Math.random(); const c = pal[(Math.random() * 3) | 0]; col.set([c.r, c.g, c.b], i * 3)
  }
  const pg = new THREE.BufferGeometry()
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); pg.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1)); pg.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
  const pm = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uScale: { value: 600 }, uBurst: { value: 0 } },
    vertexShader: PT_V, fragmentShader: PT_F, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  })
  const points = new THREE.Points(pg, pm); points.frustumCulled = false; scene.add(points)

  // post-processing (desktop): bloom glow
  let composer: EffectComposer | null = null, bloom: UnrealBloomPass | null = null
  if (desktop) {
    composer = new EffectComposer(R)
    const p1 = new RenderPass(bgScene, bgCam)
    const p2 = new RenderPass(scene, cam); p2.clear = false; p2.clearDepth = true
    bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.5, 0.7, 1.0)
    composer.addPass(p1); composer.addPass(p2); composer.addPass(bloom); composer.addPass(new OutputPass())
  }

  /* ---------- input ---------- */
  let mx = 0, my = 0, tx = 0, ty = 0, active = false, lastPtr = 0, burstAmt = 0
  const ndc = new THREE.Vector2(), ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  const P = new THREE.Vector3(), tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3()
  let hasP = false

  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height
    tx = nx * 2 - 1; ty = ny * 2 - 1; ndc.set(tx, -ty); active = true; lastPtr = performance.now()
    bgMat.uniforms.uMouse.value.set(nx, 1 - ny)
  }
  const onLeave = () => { active = false; tx = 0; ty = 0 }
  const burst = () => {
    burstAmt = 1
    for (const it of items) {
      it.obj.getWorldPosition(tmp)
      tmp2.copy(tmp).sub(hasP && active ? P : ZERO).setZ(0.5)
      if (tmp2.lengthSq() < 0.01) tmp2.set(Math.random() - 0.5, Math.random() - 0.5, 0.5)
      it.vel.addScaledVector(tmp2.normalize(), 7 + Math.random() * 5)
      it.boost += (Math.random() - 0.5) * 14
    }
  }
  const onDown = (e: PointerEvent) => { if ((e.target as Element).closest('a,button')) return; onMove(e); burst() }
  const onGyro = (e: DeviceOrientationEvent) => {
    if (e.gamma == null || e.beta == null || performance.now() - lastPtr < 2500) return
    tx = clamp(e.gamma / 28, -1, 1); ty = clamp((e.beta - 40) / 28, -1, 1)
  }
  host.addEventListener('pointermove', onMove); host.addEventListener('pointerleave', onLeave); host.addEventListener('pointerdown', onDown)
  addEventListener('deviceorientation', onGyro)

  /* ---------- layout ---------- */
  let W = 1, H = 1
  let lx = 1, ly = 1
  const layout = () => {
    const a = W / H, wide = a > 1.15
    stage.scale.setScalar(wide ? clamp(a * 0.95, 0.8, 1) : clamp(a * 1.9, 0.55, 0.85))
    lx = wide ? 1 : clamp(a * 1.5, 0.45, 1); ly = wide ? 1 : 0.85
    stage.position.set(wide ? 3.4 * Math.min(1, a / 1.8) : 0, wide ? 0 : -1.5, 0)
  }
  const fit = () => {
    W = host.clientWidth; H = host.clientHeight; if (!W || !H) return
    R.setSize(W, H, false)
    if (composer) { composer.setPixelRatio(R.getPixelRatio()); composer.setSize(W, H) }
    cam.aspect = W / H; cam.updateProjectionMatrix()
    bgMat.uniforms.uRes.value.set(W, H)
    pm.uniforms.uScale.value = (H * R.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)))
    layout()
    if (reduce) { for (let i = 0; i < 110; i++) step(0.03); draw(0.016) }
  }
  const ro = new ResizeObserver(fit); ro.observe(host)

  /* ---------- frame ---------- */
  let T = 0, scroll = 0, scrollT = 0
  const step = (dt: number) => {
    T += dt
    mx += (tx - mx) * Math.min(1, dt * 4); my += (ty - my) * Math.min(1, dt * 4)
    scrollT = clamp(scrollY / Math.max(1, host.clientHeight), 0, 1); scroll += (scrollT - scroll) * Math.min(1, dt * 5)
    burstAmt *= Math.pow(0.02, dt)

    ray.setFromCamera(ndc, cam); hasP = !!ray.ray.intersectPlane(plane, P)
    if (hasP) follow.position.set(P.x, P.y, 3.5)
    const spread = 1 + scroll * 1.0

    for (const it of items) {
      // spring back to its place + dodge the pointer
      it.obj.getWorldPosition(tmp)
      if (active && hasP) {
        tmp2.copy(tmp).sub(P); tmp2.z = 0
        const d = tmp2.length(), R0 = 3.6
        if (d < R0 && d > 0.001) { it.vel.addScaledVector(tmp2.normalize(), (R0 - d) * dt * 34); it.boost += (R0 - d) * dt * 4 * Math.sign(tmp2.x || 1) }
      }
      it.vel.addScaledVector(it.off, -9 * dt).multiplyScalar(Math.max(0, 1 - 2.4 * dt))
      it.off.addScaledVector(it.vel, dt)
      it.boost *= Math.max(0, 1 - 2 * dt)

      const k = clamp((T - it.delay) / 0.9, 0, 1)
      it.obj.scale.setScalar(Math.max(0.001, it.bs * outBack(k)))
      it.obj.position.set(
        it.base.x * spread * lx + it.off.x,
        it.base.y * spread * ly + it.off.y + Math.sin(T * 0.8 + it.phase) * 0.32,
        it.base.z * spread + it.off.z + scroll * 1.5,
      )
      it.obj.rotation.y += (it.spin + it.boost) * dt
      it.obj.rotation.x = Math.sin(T * 0.6 + it.phase) * 0.14 + it.off.y * 0.1
      it.obj.rotation.z = Math.cos(T * 0.5 + it.phase) * 0.08 - it.off.x * 0.1
    }

    rings.forEach((r, i) => { r.rotation.z += dt * (0.18 + i * 0.07) * (i % 2 ? -1 : 1) })
    stage.rotation.y += ((mx * 0.35 + scroll * 1.3) - stage.rotation.y) * Math.min(1, dt * 3)
    stage.rotation.x += ((my * 0.16) - stage.rotation.x) * Math.min(1, dt * 3)
    cam.position.x += (mx * 0.9 - cam.position.x) * Math.min(1, dt * 3)
    cam.position.y += ((0.6 - my * 0.5 - scroll * 1.2) - cam.position.y) * Math.min(1, dt * 3)
    cam.position.z = 15 + scroll * 9
    cam.lookAt(0, 0, 0)

    bgMat.uniforms.uTime.value = T; bgMat.uniforms.uScroll.value = scroll
    pm.uniforms.uTime.value = T; pm.uniforms.uBurst.value = burstAmt * 3
    if (bloom) bloom.strength = 0.5 + burstAmt * 0.9 + scroll * 0.3
  }
  const draw = (dt: number) => {
    if (composer) composer.render(dt)
    else { R.clear(); R.render(bgScene, bgCam); R.clearDepth(); R.render(scene, cam) }
  }

  let raf = 0, on = true, last = performance.now()
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop)
    const dt = Math.min(0.033, (now - last) / 1000); last = now
    if (!on || document.hidden) return
    step(dt); draw(dt)
  }
  const io = new IntersectionObserver(e => { on = e[0].isIntersecting }); io.observe(host)
  fit()
  if (!reduce) raf = requestAnimationFrame(loop)

  return () => {
    cancelAnimationFrame(raf); io.disconnect(); ro.disconnect()
    host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave); host.removeEventListener('pointerdown', onDown)
    removeEventListener('deviceorientation', onGyro)
    scene.traverse(o => {
      const m = o as THREE.Mesh
      if (m.geometry) m.geometry.dispose()
      const mat = m.material as THREE.Material | THREE.Material[] | undefined
      if (mat) (Array.isArray(mat) ? mat : [mat]).forEach(x => x.dispose())
    })
    bgMesh.geometry.dispose(); bgMat.dispose(); composer?.dispose()
    R.dispose(); R.forceContextLoss()
  }
}
