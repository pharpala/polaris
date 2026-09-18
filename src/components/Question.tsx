import type { ReactNode } from 'react'
import { Check } from '../Icons'

export type Option = { id: string; label: string; note?: string }

/**
 * The shape every question shares: a large headline, the reason underneath,
 * the control, then the footnote and the commit. The headline lives in the
 * content rather than the app bar so the question is the first thing read.
 */
export function Question({
  title,
  sub,
  hint,
  foot,
  note,
  cta,
  ready,
  onNext,
  children,
}: {
  title: string
  sub: string
  hint?: string
  foot: string
  note?: string
  cta: string
  ready: boolean
  onNext: () => void
  children: ReactNode
}) {
  return (
    <div className="screen q">
      <div className="q__scroll">
        <h1 className="q__h">{title}</h1>
        <p className="q__sub">{sub}</p>
        {hint && <p className="q__hint">{hint}</p>}
        {children}
      </div>

      <div className="q__foot">
        <p className="legal">{foot}</p>
        {note && <p className="legal legal--note">{note}</p>}
        <button className="btn btn--primary" disabled={!ready} onClick={onNext}>
          {cta}
        </button>
      </div>
    </div>
  )
}

/** Selection is carried by a blue wash and a blue tick, never by a new hue. */
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
