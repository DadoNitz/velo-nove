import { useEffect, useState } from 'react'
import { Compare } from './Compare'
import { Configurator } from './Configurator'
import BlurText from './react-bits/BlurText'
import ClickSpark from './react-bits/ClickSpark'
import CountUp from './react-bits/CountUp'
import Magnet from './react-bits/Magnet'
import ShinyText from './react-bits/ShinyText'
import TiltedCard from './react-bits/TiltedCard'
import { chapters, credits, specs, type ColorId, type ModelId } from './data'
import { initScroll } from './scroll'
import { can3D, Mini, Stage } from './Stage'
import { TestRide } from './TestRide'

const Cta = ({ href, children }: { href: string; children: string }) => (
  <Magnet padding={70} magnetStrength={4} maxOffset={14} wrapperClassName="rv" style={{ display: 'inline-block' }}><a className="btn" href={href}>{children}</a></Magnet>
)

const num = (s: string) => {
  const m = s.match(/^(\d+(?:,\d+)?)(.*)$/)
  return m ? { to: parseFloat(m[1].replace(',', '.')), dec: (m[1].split(',')[1] ?? '').length, rest: m[2] } : null
}

export default function App() {
  const [colorId, setColor] = useState<ColorId>('asfalto')
  const [modelId, setModel] = useState<ModelId>('nove')
  const [active, setActive] = useState(-1)

  const [near, setNear] = useState(false) // colour section within a screen: fetch and build the 3D bike
  const [cfg, setCfg] = useState(false) // colour section crosses the middle: the pinned bike turns 3D
  const [phone, setPhone] = useState(() => matchMedia('(max-width: 860px)').matches)

  useEffect(() => initScroll(setActive), [])
  useEffect(() => {
    const el = document.getElementById('cor')!, mq = matchMedia('(max-width: 860px)')
    const onMq = () => setPhone(mq.matches)
    mq.addEventListener('change', onMq)
    const a = new IntersectionObserver(([e]) => { if (e.isIntersecting && can3D()) { setNear(true); a.disconnect() } }, { rootMargin: '100% 0px' })
    const b = new IntersectionObserver(([e]) => setCfg(e.isIntersecting), { rootMargin: '-50% 0px -50% 0px' })
    a.observe(el); b.observe(el)
    return () => { mq.removeEventListener('change', onMq); a.disconnect(); b.disconnect() }
  }, [])

  return (
    <ClickSpark sparkColor="#ff7a1f" sparkCount={9} sparkSize={12} sparkRadius={26} duration={520} layer="front">
      <a className="skip" href="#historia">Ir para o conteúdo</a>
      <nav className="nav" aria-label="Principal">
        <a href="#historia" className="hide-s">História</a>
        <a href="#cor" className="hide-s">Cor</a>
        <a href="#modelos">Modelos</a>
        <a href="#test-ride" className="nav-cta">Agendar test-ride</a>
      </nav>

      <main>
        <div className="split">
          <Stage colorId={colorId} active={active} load3d={near && !phone} on3d={cfg} />
          <div className="col">
            <header className="hero" id="topo" data-sec data-nav="orange">
              <div className="hero-top">
                <h1 className="rv">A elétrica urbana de 9 quilos.</h1>
                <p className="lead rv">Alumínio, correia sem graxa e 90 km por carga. A partir de R$ 11.900.</p>
                <Cta href="#test-ride">Agendar test-ride</Cta>
              </div>
              <p className="wordmark rv" id="wordmark"><ShinyText text="vélo nove" color="#050f16" shineColor="#fff3e6" speed={3} delay={2} trigger="loop" /></p>
            </header>

            <div id="historia">
              {chapters.map((c, i) => (
                <section key={c.id} className="chapter" data-sec data-nav="orange" aria-labelledby={`${c.id}-t`}>
                  <div className="rv mini-wrap"><Mini colorId={colorId} focus={c.focus} /></div>
                  <p className="kicker rv">{i + 1} de {chapters.length} · {c.callout.label.split(' · ')[0]}</p>
                  <p className="figure rv"><CountUp to={c.value} decimals={c.dec} mode="roll" duration={1.6} className="num" /> <span className="unit">{c.unit}</span></p>
                  <h2 id={`${c.id}-t`}><BlurText text={c.title} delay={70} /></h2>
                  <p className="rv">{c.text}</p>
                  <figure className="photo rv">
                    <TiltedCard imageSrc={`img/${c.img}`} altText={c.alt} containerHeight="auto" imageWidth="100%" imageHeight="auto" rotateAmplitude={9} scaleOnHover={1.03} glare={0.25} radius={0} />
                    <figcaption>{c.caption}</figcaption>
                  </figure>
                </section>
              ))}
            </div>

            <section className="specs" id="ficha" data-sec data-nav="orange" aria-labelledby="ficha-t">
              <h2 id="ficha-t"><BlurText text="Ficha técnica" delay={70} /></h2>
              <dl className="rv">
                {specs.map(([fig, txt]) => {
                  const n = num(fig)
                  return (
                    <div key={fig}>
                      <dt>{n ? <><CountUp to={n.to} decimals={n.dec} className="num" />{n.rest}</> : fig}</dt>
                      <dd>{txt}</dd>
                    </div>
                  )
                })}
              </dl>
            </section>

            <Configurator colorId={colorId} setColor={setColor} three={near && phone} />
          </div>
        </div>

        <Compare setModel={setModel} />
        <TestRide colorId={colorId} modelId={modelId} />
      </main>

      <footer className="foot" data-sec data-nav="ink">
        <div className="foot-line">
          <p>Bicicleta elétrica urbana</p>
          <p className="foot-links"><a href="#historia">História</a><a href="#cor">Cor</a><a href="#modelos">Modelos</a><a href="#test-ride">Test-ride</a></p>
          <p className="foot-end">2026 · <a href="#topo">Privacidade</a></p>
        </div>
        <p className="foot-note">Projeto de portfólio, marca fictícia: Vélo Nove não existe e nada aqui está à venda.</p>
        <p className="foot-credits">
          Fotos:{' '}
          {credits.map((c, i) => (
            <span key={c.url}><a href={c.url} rel="noopener">{c.title}</a>, {c.by} ({c.lic}){i < credits.length - 1 ? '; ' : '.'}</span>
          ))}
        </p>
      </footer>
    </ClickSpark>
  )
}
