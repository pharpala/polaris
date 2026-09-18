import { useState } from 'react'
import Capture from '../components/Capture'
import { Question } from '../components/Question'
import Sheet from '../components/Sheet'
import { Check, Chevron } from '../Icons'
import type { Dict } from '../i18n'

/**
 * Capture identity. One step on the rail, three moments inside it: choose the
 * document, photograph it, then match a face to it.
 *
 * Every document a newcomer actually arrives with is a first-class choice
 * here — a foreign passport, a PR card, a permit — which is the deck's fix
 * for 49% newcomer abandonment and the branch visit that is Polaris policy
 * rather than regulation.
 */
export default function Identity({
  t,
  doc,
  onDoc,
  onNext,
  onHelp,
}: {
  t: Dict
  doc: string | null
  onDoc: (id: string) => void
  onNext: () => void
  onHelp: () => void
}) {
  const [phase, setPhase] = useState<'setup' | 'id' | 'selfie' | 'confirm'>('setup')
  const [open, setOpen] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const i = t.identity
  const picked = i.docs.find((o) => o.id === doc)

  if (phase === 'id') {
    return (
      <Capture
        t={t}
        kind="id"
        doc={picked?.label}
        onDone={() => setPhase('selfie')}
        onHelp={onHelp}
      />
    )
  }

  if (phase === 'selfie') {
    return <Capture t={t} kind="selfie" onDone={() => setPhase('confirm')} onHelp={onHelp} />
  }

  /* Read off the document rather than typed in by the customer — and shown
     back for confirmation before anything is submitted, which is the deck's
     "customer confirms pre-filled information before submission". */
  if (phase === 'confirm') {
    const e = t.extracted
    return (
      <Question
        t={t}
        onHelp={onHelp}
        title={e.title}
        sub={e.sub}
        cta={e.confirm}
        onNext={onNext}
        onAlt={{ label: e.edit, onClick: () => setPhase('id') }}
      >
        <div className="data">
          <div className="data__row">
            <span className="data__k">{e.name}</span>
            <span className="data__v">{e.nameValue}</span>
          </div>
          <div className="data__row">
            <span className="data__k">{e.dob}</span>
            <span className="data__v">{e.dobValue}</span>
          </div>
          <div className="data__row">
            <span className="data__k">{e.id}</span>
            <span className="data__v">{picked?.label ?? ''}</span>
          </div>
        </div>
      </Question>
    )
  }

  return (
    <Question
      t={t}
      onHelp={onHelp}
      title={i.title}
      sub={i.sub}
      cta={i.open}
      ready={!!doc && agreed}
      onNext={() => setPhase('id')}
    >
      <p className="q__hint">{i.which}</p>

      <button className="select" onClick={() => setOpen(true)}>
        <span className="select__text">
          <span className={`select__value${picked ? '' : ' select__value--empty'}`}>
            {picked ? picked.label : i.placeholder}
          </span>
        </span>
        <Chevron />
      </button>

      <button className="skip skip--inline" onClick={onHelp}>
        {i.none}
      </button>

      <button
        className={`consent${agreed ? ' consent--on' : ''}`}
        onClick={() => setAgreed((v) => !v)}
        role="checkbox"
        aria-checked={agreed}
      >
        <span className="choice__box">{agreed && <Check size={13} />}</span>
        <span>{i.consent}</span>
      </button>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title={i.which}
        body={i.sheetBody}
        done={t.lang.done}
      >
        {i.docs.map((o) => (
          <button
            key={o.id}
            className="row"
            onClick={() => {
              onDoc(o.id)
              setOpen(false)
            }}
            aria-pressed={doc === o.id}
          >
            <span>{o.label}</span>
            {doc === o.id && (
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
