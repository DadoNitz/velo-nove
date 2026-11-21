import BlurText from './react-bits/BlurText'
import Magnet from './react-bits/Magnet'
import { Mini } from './Stage'
import { brl, colors, type ColorId } from './data'

// The live thing: pick a colour and the pinned bike changes (see Stage).
export function Configurator({ colorId, setColor, three }: { colorId: ColorId; setColor: (c: ColorId) => void; three: boolean }) {
  const cur = colors.find((c) => c.id === colorId)!
  return (
    <section className="config" id="cor" data-sec data-nav="orange" aria-labelledby="cor-t">
      <h2 id="cor-t"><BlurText text="Escolha a sua cor." delay={70} /></h2>
      <div className="rv mini-wrap"><Mini colorId={colorId} three={three} /></div>
      <p className="rv">A bicicleta troca na hora. São quatro cores de série, todas pelo mesmo preço.</p>
      <div className="swatches rv" role="radiogroup" aria-label="Cor da bicicleta">
        {colors.map((c) => (
          <label key={c.id} className="swatch">
            <input type="radio" name="cor" value={c.id} checked={c.id === colorId} onChange={() => setColor(c.id)} />
            <span className="chip" style={{ background: c.bike }} />
            <span className="swatch-name">{c.name}</span>
          </label>
        ))}
      </div>
      <p className="swatch-note rv" aria-live="polite"><strong>{cur.name}.</strong> {cur.note}</p>
      <p className="price rv"><span className="num">{brl(11900)}</span><small>ou 12x de R$ 992 sem juros</small></p>
      <Magnet padding={70} magnetStrength={4} maxOffset={14} wrapperClassName="rv" style={{ display: 'inline-block' }}><a className="btn" href="#test-ride">Agendar test-ride nesta cor</a></Magnet>
    </section>
  )
}
