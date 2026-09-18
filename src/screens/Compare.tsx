import { Close } from '../Icons'
import type { Dict } from '../i18n'
import { rank } from '../products'

/**
 * The shortlist with its reasoning shown. Ranked on fit rather than margin,
 * with the trade-off spelled out on every card — which is what stops the
 * suggestion from being an opaque pick.
 */
export default function Compare({
  t,
  open,
  profile,
  goals,
  chosen,
  onPick,
  onClose,
}: {
  t: Dict
  open: boolean
  profile: string[]
  goals: string[]
  chosen: string | null
  onPick: (id: string) => void
  onClose: () => void
}) {
  const ranked = rank(profile, goals).slice(0, 3)
  const top = ranked[0]?.id

  return (
    <div className={`compare${open ? ' compare--open' : ''}`}>
      <div className="compare__panel" role="dialog" aria-modal="true" aria-label={t.compare.title}>
        <header className="compare__bar">
          <span className="compare__id">
            <span className="compare__title">{t.compare.title}</span>
            <span className="compare__sub">{t.compare.sub}</span>
          </span>
          <button className="compare__close" onClick={onClose} aria-label={t.compare.close}>
            <Close />
          </button>
        </header>

        <div className="compare__list">
          {ranked.map((p) => {
            const copy = t.products[p.id]
            const isChosen = (chosen ?? top) === p.id
            return (
              <article className={`card${isChosen ? ' card--on' : ''}`} key={p.id}>
                {p.id === top && <p className="card__badge">{t.compare.badge}</p>}
                <h2 className="card__name">{copy.name}</h2>
                <p className="card__tagline">{copy.tagline}</p>
                <p className="card__terms">{copy.terms}</p>
                <p className="card__trade">{copy.trade}</p>
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    onPick(p.id)
                    onClose()
                  }}
                  disabled={isChosen}
                >
                  {isChosen ? t.compare.badge : t.compare.pick}
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
