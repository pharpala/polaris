import { Choice, Question } from '../components/Question'
import type { Dict } from '../i18n'

/** Stage 1, question 3. What the account is for, which is what the
 *  recommendation is ranked against. */
export default function Goals({
  t,
  value,
  onToggle,
  onNext,
  onHelp,
}: {
  t: Dict
  value: string[]
  onToggle: (id: string) => void
  onNext: () => void
  onHelp: () => void
}) {
  return (
    <Question
      t={t}
      onHelp={onHelp}
      title={t.goals.title}
      sub={t.goals.sub}
      foot={t.goals.foot}
      cta={t.goals.cta}
      ready={value.length > 0}
      onNext={onNext}
    >
      <div className="choices" role="group" aria-label={t.goals.title}>
        {t.goals.options.map((o) => (
          <Choice
            key={o.id}
            option={o}
            on={value.includes(o.id)}
            multi
            onPick={() => onToggle(o.id)}
          />
        ))}
      </div>
    </Question>
  )
}
