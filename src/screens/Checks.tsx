import { useEffect, useState } from 'react'
import { Lock } from '../Icons'
import type { Dict } from '../i18n'

/** Long enough to read as work happening, short enough for a demo. */
const CLEAR_MS = 3000

/**
 * Stage 5. Screening, sanctions and AML run behind the journey. While they
 * run there is no honest percentage to show, so the bar is indeterminate and
 * the primary action is Leave for now — the deck's finding is that customers
 * abandon a 48–72 hour review because nobody tells them anything, so the fix
 * is status rather than speed.
 *
 * Once they clear, the customer can carry on.
 */
export default function Checks({
  t,
  onNext,
  onHelp,
}: {
  t: Dict
  onNext: () => void
  onHelp: () => void
}) {
  const [cleared, setCleared] = useState(false)
  const c = t.checks

  useEffect(() => {
    const id = window.setTimeout(() => setCleared(true), CLEAR_MS)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="screen q">
      <div className="q__scroll">
        <p className="q__saved">{t.saved}</p>
        <h1 className="q__h">{cleared ? c.titleDone : c.title}</h1>
        <p className="q__sub">{cleared ? c.subDone : c.sub}</p>

        <div className={`bar${cleared ? ' bar--done' : ''}`} role="progressbar" aria-label={c.running}>
          <span className="bar__fill" />
        </div>

        <div className="data">
          {c.rows.map((row, i) => {
            // The second row is what the screening is actually doing.
            const state = cleared && i === 1 ? 'good' : row.state
            return (
              <div className="data__row" key={row.label}>
                <span className="data__k">{row.label}</span>
                <span className={`data__v status status--${state}`}>{c.state[state]}</span>
              </div>
            )
          })}
        </div>

        <p className="secure">
          <span className="secure__mark">
            <Lock />
          </span>
          {c.secure}
        </p>

        {cleared ? (
          <button className="btn btn--primary" onClick={onNext}>
            {c.continue}
          </button>
        ) : (
          <button className="btn btn--ghost" onClick={onNext}>
            {c.leave}
          </button>
        )}

        <p className="legal">{c.foot}</p>
      </div>

      <button className="help" onClick={onHelp}>
        <span className="help__mark">?</span>
        {t.help}
      </button>
    </div>
  )
}
