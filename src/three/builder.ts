import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { buildModel, envFor, look, type Model } from './models'

export interface SetState { shape: 'round' | 'rect'; chairs: number; color: string; tableColor: string }
export interface BuilderApi { set(s: SetState): void; celebrate(): void; dispose(): void }

const MAXC = 8
const outBack = (x: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2) }

/** Seat positions around a round table (even circle) or a rectangular one (ends first, then both long sides). */
function seats(shape: 'round' | 'rect', n: number): Array<[number, number]> {
  if (shape === 'round') return Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [Math.sin(a) * 2.35, Math.cos(a) * 2.35] as [number, number] })
  const E: Array<[number, number]> = [[-2.35, 0], [2.35, 0]]
  const S1: Array<[number, number]> = [[0, 1.55]], S2: Array<[number, number]> = [[-0.75, 1.55], [0.75, 1.55]], S3: Array<[number, number]> = [[-1.1, 1.55], [0, 1.55], [1.1, 1.55]]
  const flip = (a: Array<[number, number]>) => a.map(([x, z]) => [x, -z] as [number, number])
  switch (n) {
    case 2: return [[0, 1.55], [0, -1.55]]
    case 3: return [E[0], ...S1, ...flip(S1)]
    case 4: return [...E, ...S1, ...flip(S1)]
    case 5: return [...E, ...S2, ...flip(S1)]
    case 6: return [...E, ...S2, ...flip(S2)]
    case 7: return [...E, ...S3, ...flip(S2)]
    default: return [...E, ...S3, ...flip(S3)]
  }
}

/**
 * The "build your dining set" room: a table and 2 to 8 chairs. Changing anything makes the chairs
 * glide, pop in or lift out with a spring, and colours blend smoothly. Drag to look around.
 */
export function mountBuilder(cv: HTMLCanvasElement, host: HTMLElement, initial: SetState): BuilderApi {
  const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' })
  R.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); look(R)
  R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap
  const scene = new THREE.Scene(); scene.environment = envFor(R); scene.environmentIntensity = 0.75
  const cam = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
  scene.add(new THREE.HemisphereLight(0xe2ebff, 0x1a2a66, 0.65))
  const key = new THREE.DirectionalLight(0xffffff, 1.9); key.position.set(5, 10, 6); key.castShadow = true
  key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0004; key.shadow.radius = 5
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 })
  scene.add(key)
  const red = new THREE.PointLight(0xe8161c, 40, 22); red.position.set(-6, 3, -4); scene.add(red)

  // rug
  const c = document.createElement('canvas'); c.width = c.height = 512
  const x = c.getContext('2d')!
  x.fillStyle = '#eaf0ff'; x.fillRect(0, 0, 512, 512)
  ;[[250, '#0a2a8f'], [226, '#eaf0ff'], [210, '#e8161c'], [196, '#eaf0ff'], [150, '#dfe6fb']].forEach(([r, col]) => { x.beginPath(); x.arc(256, 256, r as number, 0, 6.283); x.fillStyle = col as string; x.fill() })
  const rug = new THREE.Mesh(new THREE.CircleGeometry(5.2, 96), new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(c), roughness: 0.9, transparent: true }))
  ;(rug.material as THREE.MeshStandardMaterial).map!.colorSpace = THREE.SRGBColorSpace
  rug.rotation.x = -Math.PI / 2; rug.position.y = 0.01; rug.receiveShadow = true; scene.add(rug)
  const floor = new THREE.Mesh(new THREE.CircleGeometry(14, 64), new THREE.MeshStandardMaterial({ color: 0xcfd9f5, roughness: 0.5, metalness: 0.05 }))
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor)

  const prep = (o: THREE.Object3D) => o.traverse(m => { const k = m as THREE.Mesh; if (k.isMesh) { k.castShadow = true; k.receiveShadow = true } })
  // tables: both are built once and swapped with a spring
  const tables = { round: buildModel('dining', 'Set', 'Round table', initial.tableColor), rect: buildModel('dining', 'Set', 'Rect table', initial.tableColor) }
  const tState = { round: 0, rect: 0 }
  ;(Object.values(tables) as Model[]).forEach(t => { prep(t); t.scale.setScalar(0.001); scene.add(t) })
  // chairs: a pool of 8, shown and hidden
  const chairs = Array.from({ length: MAXC }, () => {
    const m = buildModel('chair', 'Set', 'Chair', initial.color); prep(m); m.scale.setScalar(0.001); scene.add(m)
    return { m, pos: new THREE.Vector3(0, 6, 0), rotY: 0, s: 0, tgtS: 0, tgt: new THREE.Vector3(0, 6, 0), tgtRot: 0, started: false }
  })

  let st: SetState = { ...initial }
  const colC = new THREE.Color(st.color), colT = new THREE.Color(st.tableColor)
  const layout = () => {
    const sp = seats(st.shape, st.chairs)
    chairs.forEach((ch, i) => {
      if (i < sp.length) {
        const [px, pz] = sp[i]
        ch.tgt.set(px, 0, pz); ch.tgtRot = Math.atan2(-px, -pz); ch.tgtS = 1
        if (!ch.started) { ch.started = true; ch.pos.set(px, 5 + i * 0.4, pz); ch.rotY = ch.tgtRot + 2.5 }
      } else { ch.tgt.set(ch.pos.x * 1.1, 4.5, ch.pos.z * 1.1); ch.tgtS = 0; ch.started = false }
    })
  }
  layout()

  const controls = new OrbitControls(cam, cv)
  controls.target.set(0, 1.1, 0); controls.enablePan = false; controls.enableDamping = true
  controls.minDistance = 6; controls.maxDistance = 17; controls.minPolarAngle = 0.4; controls.maxPolarAngle = Math.PI / 2 - 0.06
  controls.autoRotate = true; controls.autoRotateSpeed = 0.9
  cv.style.touchAction = 'pan-y'
  let resume = 0
  controls.addEventListener('start', () => { controls.autoRotate = false; clearTimeout(resume) })
  controls.addEventListener('end', () => { resume = window.setTimeout(() => { controls.autoRotate = true }, 4000) })

  const fit = () => {
    const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return
    R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix()
    cam.position.set(0, 7.5, 12).setLength(THREE.MathUtils.clamp(13.5 / Math.min(1, cam.aspect * 1.1), 13.5, 19))
  }
  const ro = new ResizeObserver(fit); ro.observe(host); fit()

  // confetti (instanced boxes) when the set is added to the list
  const CN = 90, conf = new THREE.InstancedMesh(new THREE.BoxGeometry(0.14, 0.04, 0.22), new THREE.MeshBasicMaterial({ toneMapped: false }), CN)
  conf.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(CN * 3), 3); conf.frustumCulled = false; conf.visible = false; scene.add(conf)
  const cd = Array.from({ length: CN }, () => ({ p: new THREE.Vector3(), v: new THREE.Vector3(), r: new THREE.Euler(), w: new THREE.Vector3(), life: 0 }))
  const dummy = new THREE.Object3D(), pal = ['#e8161c', '#ffffff', '#3a63e6', '#ffd24a'].map(h => new THREE.Color(h))
  let confOn = 0
  const celebrate = () => {
    cd.forEach((d, i) => {
      d.p.set((Math.random() - 0.5) * 2, 3 + Math.random(), (Math.random() - 0.5) * 2)
      d.v.set((Math.random() - 0.5) * 9, 6 + Math.random() * 6, (Math.random() - 0.5) * 9); d.w.set(Math.random() * 12, Math.random() * 12, Math.random() * 12); d.life = 2.4
      conf.setColorAt(i, pal[i % pal.length])
    })
    conf.instanceColor!.needsUpdate = true; conf.visible = true; confOn = 2.4
  }

  let T = 0
  const clock = new THREE.Clock()
  const frame = () => {
    const dt = Math.min(0.05, clock.getDelta()); T += dt
    // tables: scale spring to 1 for the chosen shape, 0 for the other
    ;(['round', 'rect'] as const).forEach(k => {
      const goal = st.shape === k ? 1 : 0
      tState[k] += (goal - tState[k]) * Math.min(1, dt * 7)
      tables[k].scale.setScalar(Math.max(0.001, tState[k]))
      tables[k].visible = tState[k] > 0.01
      tables[k].userData.body.forEach((m: THREE.MeshStandardMaterial) => m.color.lerp(colT, Math.min(1, dt * 6)))
    })
    chairs.forEach((ch, i) => {
      const k = Math.min(1, dt * (ch.tgtS ? 6 : 4))
      ch.pos.lerp(ch.tgt, k)
      ch.rotY += (ch.tgtRot - ch.rotY) * k
      ch.s += (ch.tgtS - ch.s) * Math.min(1, dt * 7)
      const pop = ch.tgtS ? 1 + Math.sin(Math.min(1, ch.s) * Math.PI) * 0.12 : 1
      ch.m.visible = ch.s > 0.01
      ch.m.scale.setScalar(Math.max(0.001, ch.s * pop)); ch.m.position.copy(ch.pos)
      ch.m.rotation.y = ch.rotY
      ch.m.userData.body.forEach((m: THREE.MeshStandardMaterial) => m.color.lerp(colC, Math.min(1, dt * 6)))
    })
    if (confOn > 0) {
      confOn -= dt
      cd.forEach((d, i) => {
        d.v.y -= 16 * dt; d.p.addScaledVector(d.v, dt); d.v.x *= 0.99; d.v.z *= 0.99
        d.r.x += d.w.x * dt; d.r.y += d.w.y * dt; d.r.z += d.w.z * dt
        dummy.position.copy(d.p); dummy.rotation.copy(d.r); dummy.scale.setScalar(d.p.y < 0 ? 0 : 1); dummy.updateMatrix(); conf.setMatrixAt(i, dummy.matrix)
      })
      conf.instanceMatrix.needsUpdate = true
      if (confOn <= 0) conf.visible = false
    }
    controls.update(); R.render(scene, cam)
  }
  R.setAnimationLoop(frame)
  const io = new IntersectionObserver(e => { R.setAnimationLoop(e[0].isIntersecting ? frame : null); if (e[0].isIntersecting) clock.getDelta() }); io.observe(host)

  return {
    set(s) { st = { ...s }; colC.set(s.color); colT.set(s.tableColor); layout() },
    celebrate,
    dispose() {
      R.setAnimationLoop(null); io.disconnect(); ro.disconnect(); controls.dispose(); clearTimeout(resume)
      scene.traverse(o => { const m = o as THREE.Mesh; m.geometry?.dispose(); const mat = m.material as THREE.Material | THREE.Material[] | undefined; if (mat) (Array.isArray(mat) ? mat : [mat]).forEach(y => y.dispose()) })
      R.dispose(); R.forceContextLoss()
    },
  }
}
