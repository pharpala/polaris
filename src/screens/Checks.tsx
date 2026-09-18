import { Lock } from '../Icons'
import type { Dict } from '../i18n'

/**
 * Stage 5, and deliberately an end state rather than a sequence that
 * completes on screen. Screening, sanctions and AML take as long as they
 * take; the bar keeps running and nothing here pretends otherwise.
 *
 * What the deck asks for is not speed, it is status: customers abandon a
 * 48–72 hour manual review because nobody tells them anything. So the
 * primary action is Leave for now — the journey is safe to walk away from,
 * and the email brings them back.
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
  const c = t.checks

  return (
    <div className="screen q">
      <div className="q__scroll">
        <p className="q__saved">{t.saved}</p>
        <h1 className="q__h">{c.title}</h1>
        <p className="q__sub">{c.sub}</p>

        {/* Indeterminate: there is no honest percentage to show. */}
        <div className="bar" role="progressbar" aria-label={c.running}>
          <span className="bar__fill" />
        </div>

        <div className="data">
          {c.rows.map((row) => (
            <div className="data__row" key={row.label}>
              <span className="data__k">{row.label}</span>
              <span className={`data__v status status--${row.state}`}>
                {c.state[row.state]}
              </span>
            </div>
          ))}
        </div>

        <p className="secure">
          <span className="secure__mark">
            <Lock />
          </span>
          {c.secure}
        </p>

        <button className="btn btn--ghost" onClick={onNext}>
          {c.leave}
        </button>

        <p className="legal">{c.foot}</p>
      </div>

      <button className="help" onClick={onHelp}>
        <span className="help__mark">?</span>
        {t.help}
      </button>
    </div>
  )
}
