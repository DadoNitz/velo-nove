import { reduced } from './spring'

const clamp = (n: number) => Math.min(1, Math.max(0, n))

// Scroll-linked state, written straight to CSS variables / DOM text (no React re-render per frame).
export function initScroll(onChapter: (i: number) => void) {
  const root = document.documentElement
  const story = document.getElementById('historia')!
  const odo = document.getElementById('odo')!
  const route = document.getElementById('route')!
  const still = reduced()
  let queued = false

  const update = () => {
    queued = false
    const y = scrollY, vh = innerHeight
    const r = story.getBoundingClientRect()
    const p = clamp((vh / 2 - r.top) / r.height)
    root.style.setProperty('--hero', clamp(y / vh).toFixed(3))
    odo.textContent = (p * 9).toFixed(1).replace('.', ',')
    route.style.transform = `scaleX(${p.toFixed(3)})`
    if (!still) root.style.setProperty('--rot', ((y * 0.42) % 360).toFixed(1) + 'deg')
  }
  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update) } }
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onScroll)
  update()

  // which chapter crosses the middle of the screen
  const chapters = [...story.querySelectorAll('.chapter')]
  const io = new IntersectionObserver((es) => {
    for (const e of es) {
      const i = chapters.indexOf(e.target)
      if (e.isIntersecting) onChapter(i)
    }
  }, { rootMargin: '-50% 0px -50% 0px' })
  chapters.forEach((c) => io.observe(c))
  const leave = new IntersectionObserver(([e]) => { if (!e.isIntersecting) onChapter(-1) })
  leave.observe(story)

  // nav follows the ground colour under it
  const themed = [...document.querySelectorAll<HTMLElement>('[data-nav]')]
  const nv = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) root.dataset.nav = (e.target as HTMLElement).dataset.nav
  }, { rootMargin: '0px 0px -95% 0px' })
  themed.forEach((s) => nv.observe(s))

  // entrances: heading, text, picture, staggered once per section
  const sections = [...document.querySelectorAll<HTMLElement>('[data-sec]')]
  sections.forEach((s) => s.querySelectorAll<HTMLElement>('.rv').forEach((el, i) => el.style.setProperty('--d', i * 80 + 'ms')))
  const rv = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target) }
  }, { threshold: 0.12 })
  sections.forEach((s) => rv.observe(s))
  root.classList.add('reveal-ready')

  return () => {
    removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll)
    io.disconnect(); leave.disconnect(); nv.disconnect(); rv.disconnect()
  }
}
