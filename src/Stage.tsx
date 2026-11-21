import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Bike } from './Bike'
import { chapters, colors, type ColorId } from './data'
import { createSpring, reduced } from './spring'

export const stageVars = (c: (typeof colors)[number]) => {
  const dark = c.fieldInk !== '#050f16'
  return {
    '--field': c.field, '--field-ink': c.fieldInk,
    '--tyre': dark ? '#55646c' : '#12181c', '--rim': dark ? '#aab5ba' : '#c9ced0', '--steel': dark ? '#c4ccd0' : '#7d878c',
  } as CSSProperties
}

// Phone only: the pinned stage does not fit, so each chapter carries its own small view of the bike.
export function Mini({ colorId, focus, tag, three = false }: { colorId: ColorId; focus?: string; tag?: string; three?: boolean }) {
  const c = colors.find((x) => x.id === colorId)!
  const style = { ...stageVars(c), '--bike': c.bike, '--bike2': c.bike2, '--hl': c.hl } as CSSProperties
  return (
    <div className="mini" style={style} data-focus={focus ?? ''}>
      <With3D load={three} on={three} colorId={colorId} label={`Bicicleta Vélo Nove na cor ${c.name}`}>
        <Bike label={`Bicicleta Vélo Nove na cor ${c.name}`} />
      </With3D>
      {tag && <b>{tag}</b>}
    </div>
  )
}

const Bike3D = lazy(() => import('./Bike3D'))
let ok3d: boolean | undefined
// 3D only with WebGL2 and without reduced motion; otherwise the SVG stays (it is always rendered underneath).
export const can3D = () => (ok3d ??= !reduced() && !!document.createElement('canvas').getContext('webgl2'))

// Flat drawing with the 3D bike over it; they cross-fade at the side view, where both look the same.
function With3D({ load, on, colorId, label, children }: { load: boolean; on: boolean; colorId: ColorId; label: string; children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const live = load && ready && on
  return (
    <div className="w3d" data-3d={live}>
      <div className="w3d-flat" aria-hidden={live || undefined}>{children}</div>
      {load && <Suspense fallback={null}><Bike3D colorId={colorId} on={on} label={label + '. Modelo 3D: arraste ou use as setas para girar.'} onReady={() => setReady(true)} /></Suspense>}
    </div>
  )
}

type Springs = { x: ReturnType<typeof createSpring>; o: ReturnType<typeof createSpring>; seq: number }

// Pinned half of the page: the bike, the 9 km odometer, and the callout of the chapter being read.
export function Stage({ colorId, active, load3d, on3d }: { colorId: ColorId; active: number; load3d: boolean; on3d: boolean }) {
  const target = colors.find((c) => c.id === colorId)!
  const [shown, setShown] = useState(target)
  const wrap = useRef<HTMLDivElement>(null)
  const sp = useRef<Springs | null>(null)

  useEffect(() => {
    const el = wrap.current!
    let x = 0, o = 100
    const paint = () => { el.style.transform = `translate3d(${x}px,0,0)`; el.style.opacity = String(o / 100) }
    sp.current = { x: createSpring(0, (v) => { x = v; paint() }, 0.38), o: createSpring(100, (v) => { o = v; paint() }, 0.3), seq: 0 }
  }, [])

  useEffect(() => {
    const s = sp.current!
    if (target.id === shown.id) return
    const my = ++s.seq
    // the 3D bike recolours its material instead of sliding out and back
    if (reduced() || (load3d && on3d)) { setShown(target); return }
    // out: slide away and fade from wherever the bike is right now (interruptible), then swap and slide back in
    s.x.to(-80); s.o.to(0)
    const t = setTimeout(() => {
      if (my !== s.seq) return
      setShown(target)
      s.x.set(80); s.x.to(0); s.o.to(100)
    }, 190)
    return () => clearTimeout(t)
  }, [target, shown.id, load3d, on3d])

  const style = stageVars(target)
  const bikeStyle = { '--bike': shown.bike, '--bike2': shown.bike2, '--hl': shown.hl } as CSSProperties
  const focus = active >= 0 ? chapters[active].focus : ''
  return (
    <aside className="stage" style={style} data-focus={focus}>
      <p className="stage-name">Nove · {target.name}</p>
      <div className="bike-box">
        <With3D load={load3d} on={on3d} colorId={colorId} label={`Bicicleta Vélo Nove na cor ${target.name}`}>
        <div className="bike-wrap" ref={wrap} style={bikeStyle}>
          <Bike label={`Bicicleta Vélo Nove na cor ${shown.name}, vista de lado`} />
          {chapters.map((c, i) => (
            <span key={c.id} className={`callout ${c.callout.side}`} data-on={active === i} style={{ left: c.callout.x + '%', top: c.callout.y + '%' }} aria-hidden="true">
              <i />
              <b>{c.callout.label}</b>
            </span>
          ))}
        </div>
        </With3D>
      </div>
      <div className="stage-foot" aria-hidden="true">
        <p className="odo"><span id="odo">0,0</span> km <em>de 9</em></p>
        <div className="route"><i id="route" /></div>
      </div>
    </aside>
  )
}
