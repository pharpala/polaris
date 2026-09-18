import type { ReactNode } from 'react'
import { Check } from '../Icons'

export type Option = { id: string; label: string; note?: string }

/**
 * The shape every question shares: the saved note, a serif headline, the
 * reason underneath, the control, and the assistant within reach. The commit
 * is optional — a question that offers a straight choice between two answers
 * advances on the tap, with nothing left to confirm.
 */
export function Question({
  t,
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
  title: string
  sub: string
  foot?: string
  cta?: string
  ready?: boolean
  onNext?: () => void
  onSkip?: () => void
  children: ReactNode
}) {
  return (
    <div className="screen q">
      <div className="q__scroll">
        <p className="q__saved">{t.saved}</p>
        <h1 className="q__h">{title}</h1>
        <p className="q__sub">{sub}</p>

        {children}

        {cta && onNext && (
          <button className="btn btn--primary" disabled={ready === false} onClick={onNext}>
            {cta}
          </button>
        )}

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

/** Selection is a blue tick; the card itself stays white. Single answers get
 *  a round marker, the multi-selects a square one. */
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
      <span className={`choice__box${multi ? '' : ' choice__box--round'}`}>
        {on && <Check size={12} />}
      </span>
    </button>
  )
}
