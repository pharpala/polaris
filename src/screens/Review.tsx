import { useState } from 'react'
import { Question } from '../components/Question'
import { Check } from '../Icons'
import type { Dict } from '../i18n'
import { rank } from '../products'

/**
 * Stage 6. Everything the customer gave, everything Polaris read, the price
 * and the terms — on one screen, before anything is opened. The agreement
 * text is fixed and unaltered; the AI explains around it rather than
 * rewriting it.
 */
export default function Review({
  t,
  profile,
  goals,
  product,
  email,
  doc,
  onNext,
  onHelp,
}: {
  t: Dict
  profile: string[]
  goals: string[]
  product: string | null
  email: string
  doc: string | null
  onNext: () => void
  onHelp: () => void
}) {
  const [agreed, setAgreed] = useState(false)
  const r = t.review
  const ranked = rank(profile, goals)
  const pick = ranked.find((p) => p.id === product) ?? ranked[0]
  const copy = pick ? t.products[pick.id] : null
  const docLabel = t.identity.docs.find((d) => d.id === doc)?.label ?? ''

  return (
    <Question
      t={t}
      onHelp={onHelp}
      title={r.title}
      sub={r.sub}
      cta={r.cta}
      ready={agreed}
      onNext={onNext}
    >
      <div className="data">
        <div className="data__row">
          <span className="data__k">{r.name}</span>
          <span className="data__v">{t.extracted.nameValue}</span>
        </div>
        <div className="data__row">
          <span className="data__k">{r.email}</span>
          <span className="data__v">{email}</span>
        </div>
        <div className="data__row">
          <span className="data__k">{r.id}</span>
          <span className="data__v">{docLabel}</span>
        </div>
        <div className="data__row">
          <span className="data__k">{r.account}</span>
          <span className="data__v">{copy?.name ?? ''}</span>
        </div>
      </div>

      {copy && <p className="card__terms card__terms--loose">{copy.terms}</p>}

      <p className="q__hint q__hint--spaced">{r.termsLabel}</p>
      <p className="terms">{r.terms}</p>

      <button
        className={`consent consent--ink${agreed ? ' consent--on' : ''}`}
        onClick={() => setAgreed((v) => !v)}
        role="checkbox"
        aria-checked={agreed}
      >
        <span className="choice__box">{agreed && <Check size={13} />}</span>
        <span>{r.agree}</span>
      </button>
    </Question>
  )
}
