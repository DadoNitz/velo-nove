import { useState, type FormEvent } from 'react'
import BlurText from './react-bits/BlurText'
import { colors, models, points, type ColorId, type ModelId } from './data'

// No backend: the form opens the visitor's e-mail with the request already written.
export function TestRide({ colorId, modelId }: { colorId: ColorId; modelId: ModelId }) {
  const [sent, setSent] = useState(false)
  const color = colors.find((c) => c.id === colorId)!.name
  const model = models.find((m) => m.id === modelId)!.name
  const today = new Date().toISOString().slice(0, 10)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `Test-ride Vélo Nove — ${f.get('ponto')}`
    const body = [
      `Oi! Quero agendar um test-ride de 30 minutos.`, '',
      `Nome: ${f.get('nome')}`, `Ponto Nove: ${f.get('ponto')}`, `Dia: ${new Date(f.get('dia') + 'T12:00').toLocaleDateString('pt-BR')}`,
      `Modelo: ${model}, cor ${color}`,
    ].join('\n')
    location.href = `mailto:testride@velonove.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="ride" id="test-ride" data-sec data-nav="ink" aria-labelledby="ride-t">
      <img className="ride-img" src="img/ciclista-entardecer.jpg" width="1024" height="683" loading="lazy" decoding="async" alt="Ciclista em silhueta atravessa uma ponte ao pôr do sol, com o sol entre as grades do guarda-corpo" />
      <div className="ride-box">
        <h2 id="ride-t"><BlurText text="Pedale os 9 km antes de decidir." delay={70} /></h2>
        <p className="rv">Test-ride grátis de 30 minutos em um dos pontos Nove. Leve um documento com foto; o capacete é por nossa conta.</p>
        <form className="rv" onSubmit={submit}>
          <div className="field">
            <label htmlFor="nome">Seu nome</label>
            <input id="nome" name="nome" type="text" autoComplete="name" required />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="ponto">Ponto Nove</label>
              <select id="ponto" name="ponto" defaultValue={points[0]}>
                {points.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="dia">Dia</label>
              <input id="dia" name="dia" type="date" min={today} required />
            </div>
          </div>
          <p className="ride-pick" aria-live="polite">Você vai pedalar: <strong>{model}, cor {color}</strong></p>
          <button className="btn btn--hot" type="submit">Pedir meu test-ride</button>
          <p className="ride-sent" role="status">{sent ? 'Abrimos o seu e-mail com o pedido pronto. É só enviar.' : ''}</p>
        </form>
      </div>
    </section>
  )
}
