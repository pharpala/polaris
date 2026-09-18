import { Choice, Question } from '../components/Question'
import type { Dict } from '../i18n'

/**
 * Stage 1, question 1. Life stage sets the whole journey: it decides which
 * products are surfaced and which identity documents the capture step has to
 * accept. Newcomers are the segment the deck names, so they lead the list.
 */
export default function Profile({
  t,
  value,
  onPick,
  onNext,
}: {
  t: Dict
  value: string | null
  onPick: (id: string) => void
  onNext: () => void
}) {
  return (
    <Question
      title={t.profile.title}
      sub={t.profile.sub}
      hint={t.q.choose}
      foot={t.profile.foot}
      note={t.aiNote}
      cta={t.profile.cta}
      ready={value !== null}
      onNext={onNext}
    >
      <div className="choices" role="radiogroup" aria-label={t.profile.title}>
        {t.profile.options.map((o) => (
          <Choice key={o.id} option={o} on={value === o.id} onPick={() => onPick(o.id)} />
        ))}
      </div>
    </Question>
  )
}
