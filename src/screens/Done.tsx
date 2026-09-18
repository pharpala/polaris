import { Compass } from '../Icons'
import type { Dict } from '../i18n'
import { rank } from '../products'

/** The account number a real opening would mint. Fictional. */
const ACCOUNT = '4520 1842 9901'

/**
 * Stage 6, done. No app bar, no dots, nothing left to do — the only screen
 * in the journey that is an arrival rather than a step.
 */
export default function Done({
  t,
  profile,
  goals,
  product,
  onRestart,
}: {
  t: Dict
  profile: string[]
  goals: string[]
  product: string | null
  onRestart: () => void
}) {
  const ranked = rank(profile, goals)
  const pick = ranked.find((p) => p.id === product) ?? ranked[0]
  const name = pick ? t.products[pick.id].name : ''
  const d = t.done

  return (
    <div className="screen open">
      <span className="open__mark">
        <Compass className="open__glyph" />
      </span>

      <h1 className="open__h">{d.title}</h1>
      <p className="open__p">{d.ready(name)}</p>

      <p className="open__label">{d.number}</p>
      <p className="open__number">{ACCOUNT}</p>

      <button className="btn btn--ghost open__restart" onClick={onRestart}>
        {d.restart}
      </button>
    </div>
  )
}
