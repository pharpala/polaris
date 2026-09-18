import { useEffect, useRef, useState } from 'react'
import { answer } from '../assistant'
import { Close, Send } from '../Icons'
import type { Dict } from '../i18n'

type Msg = { id: number; from: 'ai' | 'me'; text: string; handoff?: boolean }

const TYPING_MS = 620

/**
 * The assistant. Replies are scripted, but the routing is not: what the
 * customer types is scored against the intents in `src/assistant.ts`, and a
 * question that matches nothing gets an honest answer plus a route to a
 * person rather than a guess.
 *
 * It knows which step it was opened from, so the offered questions are the
 * ones people actually ask there, and it knows whether the customer has told
 * us they are a newcomer, so the answers about documents, fees and branches
 * change accordingly.
 */
export default function Assistant({
  t,
  open,
  onClose,
  step,
  newcomer,
}: {
  t: Dict
  open: boolean
  onClose: () => void
  step: 'profile' | 'follow' | 'goals'
  newcomer: boolean
}) {
  const a = t.assist
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const [asked, setAsked] = useState<string[]>([])
  const log = useRef<HTMLDivElement>(null)
  const nextId = useRef(0)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  // Seed the greeting the first time it is opened, not on every open.
  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ id: nextId.current++, from: 'ai', text: a.greeting }])
    }
  }, [open, msgs.length, a.greeting])

  useEffect(() => {
    const el = log.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing])

  const ask = (question: string, intentId?: string) => {
    if (!question.trim()) return
    if (intentId) setAsked((s) => [...s, intentId])
    setMsgs((m) => [...m, { id: nextId.current++, from: 'me', text: question }])

    const reply = answer(question, a.intents, {
      newcomer,
      fallback: a.fallback,
      handoff: a.handoff,
    })

    timers.current.push(
      window.setTimeout(() => setTyping(true), 140),
      window.setTimeout(() => {
        setTyping(false)
        setMsgs((m) => [
          ...m,
          { id: nextId.current++, from: 'ai', text: reply.text, handoff: reply.handoff },
        ])
      }, 140 + TYPING_MS),
    )
  }

  // The step's suggestions, minus anything already asked.
  const prompts = a.prompts[step]
    .map((id) => a.intents.find((i) => i.id === id))
    .filter((i): i is (typeof a.intents)[number] => !!i && !asked.includes(i.id))

  return (
    <div className={`assist${open ? ' assist--open' : ''}`}>
      <div className="assist__panel" role="dialog" aria-modal="true" aria-label={a.title}>
        <header className="assist__bar">
          <span className="assist__badge">?</span>
          <span className="assist__id">
            <span className="assist__title">{a.title}</span>
            <span className="assist__sub">{a.sub}</span>
          </span>
          <button className="assist__close" onClick={onClose} aria-label={a.close}>
            <Close />
          </button>
        </header>

        <div className="assist__log" ref={log}>
          {msgs.map((m) => (
            <div key={m.id} className={`bubble bubble--${m.from}`}>
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="bubble bubble--ai bubble--typing" aria-label={a.typing}>
              <span /><span /><span />
            </div>
          )}
        </div>

        {prompts.length > 0 && (
          <div className="assist__prompts">
            {prompts.map((i) => (
              <button key={i.id} className="prompt" onClick={() => ask(i.q, i.id)}>
                {i.q}
              </button>
            ))}
          </div>
        )}

        <form
          className="assist__compose"
          onSubmit={(e) => {
            e.preventDefault()
            ask(draft)
            setDraft('')
          }}
        >
          <input
            className="assist__input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={a.placeholder}
            aria-label={a.placeholder}
          />
          <button className="assist__send" type="submit" aria-label={a.send} disabled={!draft.trim()}>
            <Send />
          </button>
        </form>
      </div>
    </div>
  )
}
