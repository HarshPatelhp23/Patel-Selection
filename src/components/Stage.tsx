import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { Product } from '../data/products'
import { PALETTE, buildModel, colorOf, envFor, fitCamera, look, makeScene } from '../three/models'

interface Live { sc: THREE.Scene; obj: THREE.Object3D; ty: number; d0: number; s: number; env?: boolean }

/** Live 3D turntable of the sample model. Drag to rotate. One WebGL canvas is reused for every product. */
export function Stage3D({ p, ci, active }: { p: Product; ci: number; active: boolean }) {
  const cv = useRef<HTMLCanvasElement>(null)
  const live = useRef<Live | null>(null)
  const view = useRef({ rx: 0.45, ry: -0.6, auto: true })
  const act = useRef(active); act.current = active

  useEffect(() => {
    const c = cv.current!
    let R: THREE.WebGLRenderer
    try { R = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true }) } catch { return }
    R.setPixelRatio(Math.min(devicePixelRatio, 2)); look(R)
    const cam = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    let raf = 0, vis = true, last: { x: number; y: number } | null = null, resume = 0
    const io = new IntersectionObserver(e => { vis = e[0].isIntersecting }); io.observe(c)
    const down = (e: PointerEvent) => { c.setPointerCapture(e.pointerId); last = { x: e.clientX, y: e.clientY }; view.current.auto = false; clearTimeout(resume) }
    const move = (e: PointerEvent) => { if (!last) return; const v = view.current; v.ry += (e.clientX - last.x) * 0.01; v.rx = Math.max(-0.2, Math.min(1.2, v.rx + (e.clientY - last.y) * 0.006)); last = { x: e.clientX, y: e.clientY } }
    const up = () => { last = null; resume = window.setTimeout(() => { view.current.auto = true }, 2500) }
    c.addEventListener('pointerdown', down); c.addEventListener('pointermove', move); c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up)
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const s = live.current
      if (!s || !act.current || !vis) return
      const w = c.clientWidth, h = c.clientHeight, r = R.getPixelRatio()
      if (c.width !== Math.round(w * r) || c.height !== Math.round(h * r)) { R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix() }
      if (!s.env) { s.sc.environment = envFor(R); s.sc.environmentIntensity = 0.6; s.env = true }
      const v = view.current
      if (v.auto) v.ry += 0.01
      s.s += (1 - s.s) * 0.1
      s.obj.scale.setScalar(Math.max(s.s, 0.01)); s.obj.rotation.y = v.ry
      cam.position.set(0, s.ty + Math.sin(v.rx) * s.d0, Math.cos(v.rx) * s.d0); cam.lookAt(0, s.ty, 0)
      R.render(s.sc, cam)
    }
    loop()
    return () => { cancelAnimationFrame(raf); clearTimeout(resume); io.disconnect(); R.dispose(); R.forceContextLoss() }
  }, [])

  useEffect(() => {
    const sc = makeScene(), obj = buildModel(p.type, p.brand, p.name, colorOf(p.brand, p.name)); sc.add(obj)
    const tmp = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    const { dist, ty } = fitCamera(sc, obj, tmp, 2.3)
    obj.scale.setScalar(0.01)
    live.current = { sc, obj, ty, d0: dist, s: 0 }
  }, [p])

  useEffect(() => {
    if (ci >= 0) (live.current?.obj.userData.body as THREE.MeshStandardMaterial[] | undefined)?.forEach(m => m.color.set(PALETTE[ci]))
  }, [ci, p])

  return <canvas ref={cv} className="c3d" style={{ visibility: active ? 'visible' : 'hidden' }} aria-label={`3D model of ${p.brand} ${p.name}`} />
}

/** The customer's real photo(s), floating and tilting in 3D. Several angle photos can be dragged through like a turntable. */
export function PhotoStage({ photos, fi, setFi, alt }: { photos: string[]; fi: number; setFi: (f: (i: number) => number) => void; alt: string }) {
  const tilt = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; acc: number } | null>(null)
  const place = (e: React.PointerEvent) => {
    const el = tilt.current; if (!el) return
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateY(${x * 34}deg) rotateX(${-y * 24}deg)`
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`); el.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
  }
  const move = (e: React.PointerEvent) => {
    place(e)
    const d = drag.current; if (!d || photos.length < 2) return
    d.acc += e.clientX - d.x; d.x = e.clientX
    const step = Math.max(14, Math.min(40, 300 / photos.length))
    while (Math.abs(d.acc) >= step) { const dir = d.acc > 0 ? -1 : 1; setFi(i => (i + dir + photos.length) % photos.length); d.acc -= Math.sign(d.acc) * step }
  }
  return (
    <div className="pstage" onPointerDown={e => { drag.current = { x: e.clientX, acc: 0 }; place(e) }} onPointerMove={move}
      onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}
      onPointerLeave={() => { drag.current = null; if (tilt.current) tilt.current.style.transform = '' }}>
      <div className="pfloat"><div className="ptilt" ref={tilt}>
        <img src={photos[fi] ?? photos[0]} alt={alt} draggable={false} />
        <span className="glare" />
      </div></div>
    </div>
  )
}
