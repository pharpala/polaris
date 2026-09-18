import { Choice, Question } from '../components/Question'
import type { Dict } from '../i18n'

/**
 * Stage 1, question 1. What the customer tells us here sets the journey: it
 * decides which products are surfaced and which identity documents the
 * capture step has to accept. Newcomers lead the list, the segment the deck
 * names. Any combination is allowed, and it can be skipped.
 */
export default function Profile({
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
      title={t.profile.title}
      sub={t.profile.sub}
      cta={t.profile.cta}
      ready
      onNext={onNext}
      onSkip={onNext}
    >
      <div className="choices" role="group" aria-label={t.profile.title}>
        {t.profile.options.map((o) => (
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
