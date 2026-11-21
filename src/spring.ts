// Tiny interruptible spring. Retargeting keeps the live value and velocity, so a new input never snaps.
// response (s) and damping ratio follow Apple's parameters: 1 = no overshoot.
export function createSpring(initial: number, onUpdate: (v: number) => void, response = 0.4, damping = 1) {
  let x = initial, v = 0, target = initial, raf = 0, last = 0
  const k = (2 * Math.PI / response) ** 2, c = 2 * damping * Math.sqrt(k)
  const tick = (t: number) => {
    let dt = Math.min((t - last) / 1000, 0.05)
    last = t
    for (; dt > 0; dt -= 0.004) {
      const h = Math.min(dt, 0.004)
      v += (-k * (x - target) - c * v) * h
      x += v * h
    }
    onUpdate(x)
    if (Math.abs(x - target) < 0.05 && Math.abs(v) < 0.5) { x = target; v = 0; onUpdate(x); raf = 0; return }
    raf = requestAnimationFrame(tick)
  }
  return {
    to(t: number) { target = t; if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick) } },
    set(t: number) { x = target = t; v = 0; onUpdate(x) },
    get: () => x,
  }
}

export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
