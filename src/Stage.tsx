import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Bike } from './Bike'
import { chapters, colors, type ColorId } from './data'
import { createSpring, reduced } from './spring'

type Springs = { x: ReturnType<typeof createSpring>; o: ReturnType<typeof createSpring>; seq: number }

// Pinned half of the page: the bike, the 9 km odometer, and the callout of the chapter being read.
export function Stage({ colorId, active }: { colorId: ColorId; active: number }) {
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
    if (reduced()) { setShown(target); return }
    // out: slide away and fade from wherever the bike is right now (interruptible), then swap and slide back in
    s.x.to(-80); s.o.to(0)
    const t = setTimeout(() => {
      if (my !== s.seq) return
      setShown(target)
      s.x.set(80); s.x.to(0); s.o.to(100)
    }, 190)
    return () => clearTimeout(t)
  }, [target, shown.id])

  const dark = target.fieldInk !== '#050f16'
  const style = {
    '--field': target.field, '--field-ink': target.fieldInk,
    '--tyre': dark ? '#55646c' : '#12181c', '--rim': dark ? '#aab5ba' : '#c9ced0', '--steel': dark ? '#c4ccd0' : '#7d878c',
  } as CSSProperties
  const bikeStyle = { '--bike': shown.bike, '--bike2': shown.bike2, '--hl': shown.hl } as CSSProperties
  const focus = active >= 0 ? chapters[active].focus : ''
  return (
    <aside className="stage" style={style} data-focus={focus}>
      <p className="stage-name">Nove · {target.name}</p>
      <div className="bike-box">
        <div className="bike-wrap" ref={wrap} style={bikeStyle}>
          <Bike label={`Bicicleta Vélo Nove na cor ${shown.name}, vista de lado`} />
          {chapters.map((c, i) => (
            <span key={c.id} className={`callout ${c.callout.side}`} data-on={active === i} style={{ left: c.callout.x + '%', top: c.callout.y + '%' }} aria-hidden="true">
              <i />
              <b>{c.callout.label}</b>
            </span>
          ))}
        </div>
      </div>
      <div className="stage-foot" aria-hidden="true">
        <p className="odo"><span id="odo">0,0</span> km <em>de 9</em></p>
        <div className="route"><i id="route" /></div>
      </div>
    </aside>
  )
}
