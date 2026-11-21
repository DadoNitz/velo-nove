// The configurator's bike in 3D, built from primitives (no model file). Loaded with import() only when
// the colour section gets near the screen; Stage/Configurator keep the SVG as the fallback.
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { colors, type ColorId } from './data'
import { createSpring } from './spring'

// Same coordinates as the SVG drawing (900 x 520), so at yaw 0 the 3D bike sits where the SVG one was.
const P = (x: number, y: number, z = 0) => new THREE.Vector3((x - 450) / 100, (300 - y) / 100, z / 100)
const UP = new THREE.Vector3(0, 1, 0)
const STEP = Math.PI / 4 // rest angles: side, three-quarter, front...
const REST = 0.5 // the view we turn to after the hand-off from the flat drawing

function build(c: (typeof colors)[number]) {
  const g = new THREE.Group()
  const paint = new THREE.MeshPhysicalMaterial({ color: c.bike, roughness: 0.45, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.25 })
  const accent = new THREE.MeshPhysicalMaterial({ color: c.bike2, roughness: 0.5, metalness: 0.2, clearcoat: 0.6, clearcoatRoughness: 0.3 })
  const rubber = new THREE.MeshStandardMaterial({ color: '#15191b', roughness: 0.92 })
  const steel = new THREE.MeshStandardMaterial({ color: '#c3c9cc', metalness: 1, roughness: 0.32 })
  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, at?: THREE.Vector3) => {
    const m = new THREE.Mesh(geo, mat)
    if (at) m.position.copy(at)
    g.add(m)
    return m
  }
  // a round tube between two points; capsule ends read as welded joints
  const tube = (a: THREE.Vector3, b: THREE.Vector3, r: number, mat: THREE.Material) => {
    const d = b.clone().sub(a)
    const m = add(new THREE.CapsuleGeometry(r, d.length(), 6, 20), mat, a.clone().add(b).multiplyScalar(0.5))
    m.quaternion.setFromUnitVectors(UP, d.normalize())
    return m
  }
  const disc = (r: number, w: number, mat: THREE.Material, at: THREE.Vector3) => add(new THREE.CylinderGeometry(r, r, w, 40), mat, at).rotateX(Math.PI / 2)

  for (const x of [200, 700]) {
    const hub = P(x, 340)
    add(new THREE.TorusGeometry(1.43, 0.08, 16, 96), rubber, hub)
    add(new THREE.TorusGeometry(1.29, 0.035, 10, 96), steel, hub)
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2, side = i % 2 ? 7 : -7
      tube(P(x, 340, side), P(x + Math.cos(a) * 127, 340 + Math.sin(a) * 127), 0.008, steel)
    }
    // mudguard: the SVG arc, from 16.5° to 163°
    add(new THREE.TorusGeometry(1.58, 0.045, 8, 64, 2.56), accent, hub).rotateZ(0.29).scale.set(1, 1, 1.8)
  }
  disc(0.31, 0.16, accent, P(200, 340)) // hub motor
  disc(0.12, 0.22, steel, P(200, 340))
  disc(0.12, 0.2, accent, P(700, 340))

  // frame
  const bb = P(412, 368)
  for (const s of [-1, 1]) {
    tube(P(204, 342, 7 * s), P(412, 368, 3 * s), 0.055, paint) // chainstays
    tube(P(204, 342, 7 * s), P(352, 202, 3 * s), 0.045, paint) // seatstays
    tube(P(652, 232, 5 * s), P(700, 340, 7 * s), 0.05, paint) // fork
  }
  tube(bb, P(348, 186), 0.085, paint)
  tube(P(348, 190), P(634, 180), 0.085, paint)
  tube(P(632, 158), P(652, 230), 0.11, paint)
  tube(P(648, 224), bb, 0.16, paint)
  tube(P(630, 236), P(430, 358), 0.167, accent) // battery cover, flush with the down tube

  // belt drive on the right side
  disc(0.42, 0.03, accent, P(412, 368, 13))
  disc(0.2, 0.03, accent, P(200, 340, 13))
  tube(P(200, 320, 15), P(412, 326, 15), 0.016, rubber)
  tube(P(200, 360, 15), P(412, 410, 15), 0.016, rubber)
  tube(P(412, 368, 18), P(438, 428, 18), 0.035, steel)
  tube(P(412, 368, -18), P(386, 308, -18), 0.035, steel)
  add(new THREE.BoxGeometry(0.34, 0.06, 0.2), rubber, P(440, 432, 26))
  add(new THREE.BoxGeometry(0.34, 0.06, 0.2), rubber, P(384, 304, -26))

  // cockpit
  tube(P(350, 184), P(338, 126), 0.045, steel)
  add(new THREE.SphereGeometry(1, 24, 12), rubber, P(342, 122)).scale.set(0.5, 0.07, 0.15)
  tube(P(638, 160), P(646, 118), 0.045, steel)
  tube(P(650, 116, -34), P(650, 116, 34), 0.03, steel)
  for (const s of [-1, 1]) tube(P(650, 116, 26 * s), P(650, 116, 38 * s), 0.045, rubber)
  add(new THREE.SphereGeometry(0.07, 16, 12), new THREE.MeshBasicMaterial({ color: '#fff8e8' }), P(666, 190, 0))

  // contact shadow: a soft ellipse that turns with the bike
  const cv = document.createElement('canvas')
  cv.width = cv.height = 128
  const ctx = cv.getContext('2d')!
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(0,0,0,0.35)')
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)
  const shadow = add(new THREE.PlaneGeometry(10, 2.4), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false }), new THREE.Vector3(0, -1.92, 0))
  shadow.rotation.x = -Math.PI / 2

  return { g, paint, accent, rubber }
}

export default function Bike3D({ colorId, on, label, onReady }: { colorId: ColorId; on: boolean; label: string; onReady: () => void }) {
  const box = useRef<HTMLDivElement>(null)
  const api = useRef<{ color: (c: ColorId) => void; show: (on: boolean) => void } | null>(null)

  useEffect(() => {
    const el = box.current!
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    el.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    const sun = new THREE.DirectionalLight('#ffffff', 1.4)
    sun.position.set(-3, 6, 5)
    scene.add(sun)
    const cam = new THREE.PerspectiveCamera(20, 1, 0.1, 100)
    const first = colors.find((c) => c.id === colorId)!
    const { g, paint, accent, rubber } = build(first)
    g.rotation.x = 0.06
    scene.add(g)

    let frame = 0
    const render = () => { frame ||= requestAnimationFrame(() => { frame = 0; renderer.render(scene, cam) }) }
    const fit = () => {
      const w = el.clientWidth, h = el.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      cam.aspect = w / h
      const t = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2))
      cam.position.set(0, 0.4, Math.max(2.4 / t, 4.9 / (t * cam.aspect)))
      cam.lookAt(0, -0.1, 0)
      cam.updateProjectionMatrix()
      render()
    }
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    fit()

    // rotation: rotation (Apple's table) = damping 0.8, response 0.4
    const yaw = createSpring(0, (v) => { g.rotation.y = v; render() }, 0.5, 0.8)
    // colour: progress 0→1 between the live colour and the new one, so a second pick mid-way blends from where it is
    // tyres lighten on the dark fields, like the SVG's --tyre
    const tyre = (c: (typeof colors)[number]) => (c.fieldInk === '#050f16' ? '#15191b' : '#4a575e')
    rubber.color.set(tyre(first))
    const from = { a: new THREE.Color(), b: new THREE.Color(), c: new THREE.Color() }, to = { a: new THREE.Color(first.bike), b: new THREE.Color(first.bike2), c: new THREE.Color(tyre(first)) }
    const mix = createSpring(1, (p) => { paint.color.lerpColors(from.a, to.a, p); accent.color.lerpColors(from.b, to.b, p); rubber.color.lerpColors(from.c, to.c, p); render() }, 0.45)
    api.current = {
      color(id) {
        const c = colors.find((x) => x.id === id)!
        from.a.copy(paint.color); from.b.copy(accent.color); from.c.copy(rubber.color)
        to.a.set(c.bike); to.b.set(c.bike2); to.c.set(tyre(c))
        mix.set(0); mix.to(1)
      },
      // turn to the three-quarter view when shown, back to the side view (= the SVG) when hidden
      show(v) {
        const base = Math.round(yaw.get() / (2 * Math.PI)) * 2 * Math.PI
        yaw.to(v ? base + REST : base)
      },
    }

    // drag: 1:1 while held, then project the release velocity and settle on the nearest rest angle
    let drag: { x: number; y0: number; hist: { t: number; y: number }[] } | null = null
    const PER_PX = Math.PI / el.clientWidth
    const down = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId)
      const y = yaw.get()
      yaw.set(y) // grab it mid-flight: stop at the live value
      drag = { x: e.clientX, y0: y, hist: [{ t: e.timeStamp, y }] }
      el.dataset.grab = ''
    }
    const move = (e: PointerEvent) => {
      if (!drag) return
      const y = drag.y0 + (e.clientX - drag.x) * PER_PX
      yaw.set(y)
      drag.hist.push({ t: e.timeStamp, y })
      if (drag.hist.length > 6) drag.hist.shift()
    }
    const up = () => {
      if (!drag) return
      const h = drag.hist, a = h[0], b = h[h.length - 1]
      const dt = (b.t - a.t) / 1000
      const v = dt > 0 && performance.now() - b.t < 80 ? (b.y - a.y) / dt : 0
      const projected = yaw.get() + ((v / 1000) * 0.998) / (1 - 0.998)
      yaw.to(Math.round((projected - REST) / STEP) * STEP + REST, v)
      drag = null
      delete el.dataset.grab
    }
    const key = (e: KeyboardEvent) => {
      const d = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0
      if (!d) return
      e.preventDefault()
      yaw.to(Math.round((yaw.get() - REST) / STEP) * STEP + REST + d * STEP)
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('keydown', key)
    renderer.render(scene, cam)
    onReady()

    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) { o.geometry.dispose(); const m = o.material as THREE.MeshBasicMaterial; m.map?.dispose(); m.dispose() }
      })
      scene.environment?.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
      api.current = null
    }
    // built once; colour and visibility changes go through api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { api.current?.color(colorId) }, [colorId])
  useEffect(() => { api.current?.show(on) }, [on])

  return <div ref={box} className="b3d" role="img" aria-label={label} tabIndex={on ? 0 : -1} />
}
