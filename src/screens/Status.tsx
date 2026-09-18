import { useState } from 'react'
import { Question } from '../components/Question'
import Sheet from '../components/Sheet'
import { Check, Chevron } from '../Icons'
import type { Dict } from '../i18n'

/**
 * Stage 1, question 2. Residency status decides which identity documents the
 * capture step accepts — the deck's fix for newcomers being pushed to a
 * branch. It sits behind a field rather than on the page, because the list is
 * long and the answer is a single fact.
 */
export default function Status({
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
  const [open, setOpen] = useState(false)
  const picked = t.status.options.find((o) => o.id === value)

  return (
    <Question
      title={t.status.title}
      sub={t.status.sub}
      foot={t.status.foot}
      cta={t.status.cta}
      ready={value !== null}
      onNext={onNext}
    >
      <button className="select" onClick={() => setOpen(true)}>
        <span className="select__text">
          <span className="select__label">{t.status.label}</span>
          <span className={`select__value${picked ? '' : ' select__value--empty'}`}>
            {picked ? picked.label : t.status.placeholder}
          </span>
        </span>
        <Chevron />
      </button>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title={t.status.sheetTitle}
        body={t.status.sheetBody}
        done={t.lang.done}
      >
        {t.status.options.map((o) => (
          <button
            key={o.id}
            className="row"
            onClick={() => {
              onPick(o.id)
              setOpen(false)
            }}
            aria-pressed={value === o.id}
          >
            <span>{o.label}</span>
            {value === o.id && (
              <span className="tick">
                <Check />
              </span>
            )}
          </button>
        ))}
      </Sheet>
    </Question>
  )
}
