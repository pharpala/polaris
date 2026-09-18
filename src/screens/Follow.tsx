import { useEffect, useRef, useState } from 'react'
import { Choice, Question } from '../components/Question'
import type { Dict, FollowQ } from '../i18n'

/** Long enough to see the answer land, short enough not to feel like a wait. */
const ADVANCE_MS = 340

/**
 * A follow-up opened by one of the first answers. The customer sees only the
 * ones their own answers opened, and each names what they said in its own
 * subhead — so the journey reads as a reply rather than the next page of a
 * form. Two answers, so there is nothing to confirm: the tap is the answer.
 */
export default function Follow({
  t,
  q,
  value,
  text,
  onPick,
  onText,
  onNext,
  onHelp,
}: {
  t: Dict
  q: FollowQ
  value: string | undefined
  text: string
  onPick: (id: string) => void
  onText: (v: string) => void
  onNext: () => void
  onHelp: () => void
}) {
  const [leaving, setLeaving] = useState<string | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])

  const pick = (id: string) => {
    onPick(id)
    setLeaving(id)
    timer.current = window.setTimeout(onNext, ADVANCE_MS)
  }

  return (
    <Question
      t={t}
      onHelp={onHelp}
      title={q.title}
      sub={q.sub}
      cta={q.input ? t.profile.cta : undefined}
      onNext={q.input ? onNext : undefined}
      onSkip={q.input ? onNext : undefined}
    >
      {q.options && (
        <div className="choices" role="radiogroup" aria-label={q.title}>
          {q.options.map((o) => (
            <Choice
              key={o.id}
              option={o}
              on={leaving === o.id || value === o.id}
              onPick={() => pick(o.id)}
            />
          ))}
        </div>
      )}

      {q.input && (
        <label className="textField">
          <span className="textField__label">{q.input.label}</span>
          <textarea
            className="textField__input"
            rows={3}
            placeholder={q.input.placeholder}
            value={text}
            onChange={(e) => onText(e.target.value)}
          />
        </label>
      )}
    </Question>
  )
}
