import { useEffect, useState } from 'react'
import { Lock } from '../Icons'
import type { Dict } from '../i18n'

/** Screening runs behind the journey rather than in front of it. */
const TICK_MS = 2400

/**
 * Stage 5. Screening, sanctions and AML run in the background; the customer
 * is told where it is up to and can walk away without losing it. The deck's
 * finding is that customers abandon during a 48–72 hour manual review
 * because nobody tells them anything — so the fix is status, not speed.
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
  const [stage, setStage] = useState(1)
  const c = t.checks
  const done = stage >= c.rows.length

  useEffect(() => {
    if (done) return
    const id = window.setTimeout(() => setStage((n) => n + 1), TICK_MS)
    return () => window.clearTimeout(id)
  }, [stage, done])

  return (
    <div className="screen q">
      <div className="q__scroll">
        <p className="q__saved">{t.saved}</p>
        <h1 className="q__h">{done ? c.titleDone : c.title}</h1>
        <p className="q__sub">{done ? c.subDone : c.sub}</p>

        <div className="bar" role="progressbar" aria-valuenow={stage} aria-valuemax={c.rows.length}>
          <span className="bar__fill" style={{ inlineSize: `${(stage / c.rows.length) * 100}%` }} />
        </div>

        <div className="data">
          {c.rows.map((row, i) => {
            const state = i < stage ? 'good' : i === stage ? 'wait' : 'next'
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

        {done ? (
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
