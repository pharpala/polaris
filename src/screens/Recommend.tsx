import { Question } from '../components/Question'
import type { Dict } from '../i18n'
import { rank, reasons } from '../products'

/**
 * Stage 2. One suggestion, the reason for it in the customer's own words, and
 * every fee on the card rather than behind a link. The alternatives are one
 * tap away, because a recommendation you cannot check is just a sales pitch.
 */
export default function Recommend({
  t,
  profile,
  goals,
  chosen,
  onCompare,
  onNext,
  onHelp,
}: {
  t: Dict
  profile: string[]
  goals: string[]
  chosen: string | null
  onCompare: () => void
  onNext: () => void
  onHelp: () => void
}) {
  const ranked = rank(profile, goals)
  const pick = ranked.find((p) => p.id === chosen) ?? ranked[0]
  if (!pick) return null

  const copy = t.products[pick.id]
  const said = reasons(pick, goals)
    .map((g) => t.goalPhrase[g])
    .filter(Boolean)

  const sub =
    said.length > 0
      ? t.rec.because(said.join(t.and), copy.name)
      : t.rec.generic(copy.name)

  return (
    <Question
      t={t}
      onHelp={onHelp}
      title={t.rec.title}
      sub={sub}
      cta={t.rec.cta}
      onNext={onNext}
      onAlt={{ label: t.rec.compare, onClick: onCompare }}
    >
      <article className="card">
        <p className="card__badge">{t.rec.badge}</p>
        <h2 className="card__name">{copy.name}</h2>
        <p className="card__tagline">{copy.tagline}</p>
        <p className="card__terms">{copy.terms}</p>
      </article>
    </Question>
  )
}
