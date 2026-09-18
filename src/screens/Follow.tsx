import { Choice, Question } from '../components/Question'
import type { Dict, FollowQ } from '../i18n'

/**
 * A follow-up opened by one of the first answers. The customer sees only the
 * ones their own answers opened, and the chip above the headline names which
 * answer it is responding to — so the journey visibly bends around them
 * rather than marching through a fixed form.
 */
export default function Follow({
  t,
  q,
  value,
  text,
  onPick,
  onText,
  onNext,
}: {
  t: Dict
  q: FollowQ
  value: string | undefined
  text: string
  onPick: (id: string) => void
  onText: (v: string) => void
  onNext: () => void
}) {
  return (
    <Question
      t={t}
      chip={q.chip}
      title={q.title}
      sub={q.sub}
      cta={t.profile.cta}
      ready
      onNext={onNext}
      onSkip={onNext}
    >
      {q.options && (
        <div className="choices" role="radiogroup" aria-label={q.title}>
          {q.options.map((o) => (
            <Choice key={o.id} option={o} on={value === o.id} onPick={() => onPick(o.id)} />
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
