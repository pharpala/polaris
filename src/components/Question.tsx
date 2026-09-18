import type { ReactNode } from 'react'
import { Check } from '../Icons'

export type Option = { id: string; label: string; note?: string }

/**
 * The shape every question shares, following the target design: the saved
 * note, a serif headline, the reason underneath, the control, then the
 * commit, an optional skip, and the assistant within reach.
 */
export function Question({
  t,
  chip,
  title,
  sub,
  foot,
  cta,
  ready,
  onNext,
  onSkip,
  children,
}: {
  t: { saved: string; skip: string; help: string }
  chip?: string
  title: string
  sub: string
  foot?: string
  cta: string
  ready: boolean
  onNext: () => void
  onSkip?: () => void
  children: ReactNode
}) {
  return (
    <div className="screen q">
      <div className="q__scroll">
        {chip ? (
          <p className="q__chip">{chip}</p>
        ) : (
          <p className="q__saved">{t.saved}</p>
        )}
        <h1 className="q__h">{title}</h1>
        <p className="q__sub">{sub}</p>

        {children}

        <button className="btn btn--primary" disabled={!ready} onClick={onNext}>
          {cta}
        </button>

        {onSkip && (
          <button className="skip" onClick={onSkip}>
            {t.skip}
          </button>
        )}

        {foot && <p className="legal">{foot}</p>}
      </div>

      {/* The assistant is help reached when someone is stuck, never a
          gate standing between the customer and the account. */}
      <button className="help">
        <span className="help__mark">?</span>
        {t.help}
      </button>
    </div>
  )
}

/** Selection is a blue tick; the card itself stays white. */
export function Choice({
  option,
  on,
  multi = false,
  onPick,
}: {
  option: Option
  on: boolean
  multi?: boolean
  onPick: () => void
}) {
  return (
    <button
      className={`choice${on ? ' choice--on' : ''}`}
      onClick={onPick}
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={on}
    >
      <span className="choice__text">
        <span className="choice__label">{option.label}</span>
        {option.note && <span className="choice__note">{option.note}</span>}
      </span>
      <span className="choice__box">{on && <Check size={13} />}</span>
    </button>
  )
}
