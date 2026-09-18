import { Choice, Question } from '../components/Question'
import type { Dict } from '../i18n'

/** Picking this clears everything else, and picking anything else clears it. */
const EXCLUSIVE = 'unsure'

/**
 * The closing question, and the one the recommendation gets ranked against.
 * It comes in two versions: a newcomer who has told us they are settling into
 * Canada is asked about settling into Canada, with transfers into the country
 * and Canadian credit history on the list. Everyone else gets the general set.
 */
export default function Goals({
  t,
  newcomer,
  value,
  onChange,
  onNext,
  onHelp,
}: {
  t: Dict
  newcomer: boolean
  value: string[]
  onChange: (next: string[]) => void
  onNext: () => void
  onHelp: () => void
}) {
  const set = newcomer ? t.goalsNewcomer : t.goals

  const toggle = (id: string) => {
    if (id === EXCLUSIVE) return onChange(value.includes(id) ? [] : [id])
    const kept = value.filter((v) => v !== EXCLUSIVE)
    onChange(kept.includes(id) ? kept.filter((v) => v !== id) : [...kept, id])
  }

  return (
    <Question
      t={t}
      onHelp={onHelp}
      title={set.title}
      sub={set.sub}
      cta={set.cta}
      ready={value.length > 0}
      onNext={onNext}
    >
      {set.groups.map((g) => (
        <div className="group" key={g.label}>
          <p className="group__label">{g.label}</p>
          <div className="choices" role="group" aria-label={g.label}>
            {g.options.map((o) => (
              <Choice
                key={o.id}
                option={o}
                on={value.includes(o.id)}
                multi
                onPick={() => toggle(o.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </Question>
  )
}
