import { useState } from 'react'
import { brl, models, type ModelId } from './data'

const every = (km: number, range: number) => {
  const d = Math.floor(range / km)
  return d < 1 ? 'Mais de uma carga por dia' : d === 1 ? 'Todo dia' : `A cada ${d} dias`
}

export function Compare({ setModel }: { setModel: (m: ModelId) => void }) {
  const [km, setKm] = useState(18)
  const rows: [string, (m: (typeof models)[number]) => string][] = [
    ['Preço', (m) => brl(m.price)],
    ['Parcelado', (m) => `12x de ${brl(Math.round(m.price / 12))}`],
    ['Peso', (m) => m.weight],
    ['Autonomia', (m) => `${m.range} km`],
    ['Recarga', (m) => every(km, m.range)],
    ['Motor', (m) => m.motor],
    ['Bateria', (m) => m.battery],
    ['Carga cheia', (m) => m.charge],
    ['Cabe em', (m) => m.fits],
    ['Cores', (m) => m.colors],
  ]
  return (
    <section className="compare" id="modelos" data-sec data-nav="paper" aria-labelledby="mod-t">
      <h2 id="mod-t" className="rv">Três modelos. Escolha pelo seu trajeto.</h2>
      <div className="km rv">
        <label htmlFor="km">Quanto você pedala por dia?</label>
        <input id="km" type="range" min="4" max="80" step="2" value={km} onChange={(e) => setKm(+e.target.value)} />
        <output htmlFor="km" className="num">{km} km</output>
      </div>
      <div className="table-wrap rv">
        <table>
          <caption className="sr">Comparativo dos três modelos Vélo Nove</caption>
          <thead>
            <tr>
              <td />
              {models.map((m) => (
                <th key={m.id} scope="col">
                  <span className="m-name">{m.name}</span>
                  <span className="m-role">{m.role}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, get]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {models.map((m) => <td key={m.id}>{get(m)}</td>)}
              </tr>
            ))}
            <tr className="cta-row">
              <th scope="row"><span className="sr">Agendar</span></th>
              {models.map((m) => (
                <td key={m.id}><a className="btn btn--sm" href="#test-ride" onClick={() => setModel(m.id)}>Testar<span className="sr"> o {m.name}</span></a></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="fine rv">Autonomia estimada em modo eco, piloto de 75 kg, terreno plano. A linha de recarga muda com a distância escolhida acima.</p>
    </section>
  )
}
