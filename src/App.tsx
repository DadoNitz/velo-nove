import { useEffect, useState } from 'react'
import { Compare } from './Compare'
import { Configurator } from './Configurator'
import { CountUp } from './CountUp'
import { chapters, credits, specs, type ColorId, type ModelId } from './data'
import { initScroll } from './scroll'
import { Mini, Stage } from './Stage'
import { TestRide } from './TestRide'

const num = (s: string) => {
  const m = s.match(/^(\d+(?:,\d+)?)(.*)$/)
  return m ? { to: parseFloat(m[1].replace(',', '.')), dec: (m[1].split(',')[1] ?? '').length, rest: m[2] } : null
}

export default function App() {
  const [colorId, setColor] = useState<ColorId>('asfalto')
  const [modelId, setModel] = useState<ModelId>('nove')
  const [active, setActive] = useState(-1)

  useEffect(() => initScroll(setActive), [])

  return (
    <>
      <a className="skip" href="#historia">Ir para o conteúdo</a>
      <nav className="nav" aria-label="Principal">
        <a href="#historia" className="hide-s">História</a>
        <a href="#cor" className="hide-s">Cor</a>
        <a href="#modelos">Modelos</a>
        <a href="#test-ride" className="nav-cta">Agendar test-ride</a>
      </nav>

      <main>
        <div className="split">
          <Stage colorId={colorId} active={active} />
          <div className="col">
            <header className="hero" id="topo" data-sec data-nav="orange">
              <div className="hero-top">
                <h1 className="rv">A elétrica urbana de 9 quilos.</h1>
                <p className="lead rv">Alumínio, correia sem graxa e 90 km por carga. A partir de R$ 11.900.</p>
                <a className="btn rv" href="#test-ride">Agendar test-ride</a>
              </div>
              <p className="wordmark rv" id="wordmark">vélo nove</p>
            </header>

            <div id="historia">
              {chapters.map((c) => (
                <section key={c.id} className="chapter" data-sec data-nav="orange" aria-labelledby={`${c.id}-t`}>
                  <div className="rv mini-wrap"><Mini colorId={colorId} focus={c.focus} /></div>
                  <p className="figure rv"><CountUp to={c.value} dec={c.dec} /> <span className="unit">{c.unit}</span></p>
                  <h2 id={`${c.id}-t`} className="rv">{c.title}</h2>
                  <p className="rv">{c.text}</p>
                  <figure className="photo rv">
                    <img src={`img/${c.img}`} width="1024" height="640" loading="lazy" decoding="async" alt={c.alt} />
                    <figcaption>{c.caption}</figcaption>
                  </figure>
                </section>
              ))}
            </div>

            <section className="specs" id="ficha" data-sec data-nav="orange" aria-labelledby="ficha-t">
              <h2 id="ficha-t" className="rv">Ficha técnica</h2>
              <dl className="rv">
                {specs.map(([fig, txt]) => {
                  const n = num(fig)
                  return (
                    <div key={fig}>
                      <dt>{n ? <><CountUp to={n.to} dec={n.dec} />{n.rest}</> : fig}</dt>
                      <dd>{txt}</dd>
                    </div>
                  )
                })}
              </dl>
            </section>

            <Configurator colorId={colorId} setColor={setColor} />
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
    </>
  )
}
