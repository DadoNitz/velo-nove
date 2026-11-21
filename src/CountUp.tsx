import { useEffect, useRef } from 'react'
import { reduced } from './spring'

const fmt = (n: number, dec: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec })

// Renders the final value in the markup (works without script); counts up once when it scrolls into view.
export function CountUp({ to, dec = 0 }: { to: number; dec?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    el.textContent = fmt(0, dec)
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (t: number) => {
        const p = Math.min((t - t0) / 1100, 1)
        el.textContent = fmt(to * (1 - (1 - p) ** 4), dec)
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf); el.textContent = fmt(to, dec) }
  }, [to, dec])
  return <span ref={ref} className="num">{fmt(to, dec)}</span>
}
