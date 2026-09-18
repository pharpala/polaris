import { useEffect, useRef, useState } from 'react'
import { Compass, Globe } from '../Icons'
import { slideArt } from '../Illustrations'
import type { Dict } from '../i18n'

const AUTO_MS = 5200

/**
 * The value-proposition carousel. Four slides, one claim each, every one of
 * them traceable to the deck: the five-minute open, a shortlist instead of a
 * catalogue, language carried through the disclosures, and progress that
 * survives an interruption.
 */
export default function Welcome({
  t,
  onStart,
  onLang,
}: {
  t: Dict
  onStart: () => void
  onLang: () => void
}) {
  const [i, setI] = useState(0)
  const [held, setHeld] = useState(false)
  const drag = useRef<number | null>(null)

  // Advance on its own until the customer touches it, then stay put.
  useEffect(() => {
    if (held) return
    const id = window.setTimeout(() => setI((n) => (n + 1) % t.slides.length), AUTO_MS)
    return () => window.clearTimeout(id)
  }, [i, held, t.slides.length])

  const go = (n: number) => {
    setHeld(true)
    setI((n + t.slides.length) % t.slides.length)
  }

  const Art = slideArt[i]
  const slide = t.slides[i]

  return (
    <div className="screen welcome">
      <header className="welcome__bar">
        <span className="mark mark--sm">
          <Compass />
          {t.brand}
        </span>
        <button className="chip" onClick={onLang} aria-label={t.lang.open}>
          <Globe />
          {t.meta.chip}
        </button>
      </header>

      <div
        className="welcome__deck"
        onPointerDown={(e) => (drag.current = e.clientX)}
        onPointerUp={(e) => {
          const dx = drag.current === null ? 0 : e.clientX - drag.current
          drag.current = null
          if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1))
        }}
      >
        <div className="welcome__art" key={`art-${i}`}>
          <Art />
        </div>

        <div className="welcome__copy" key={`copy-${i}`}>
          <h1 className="welcome__h">{slide.title}</h1>
          <p className="welcome__p">{slide.body}</p>
        </div>
      </div>

      {/* Square language for a square system: bars, not dots. */}
      <div className="pips" role="tablist">
        {t.slides.map((s, n) => (
          <button
            key={s.title}
            className={`pip${n === i ? ' pip--on' : ''}`}
            onClick={() => go(n)}
            role="tab"
            aria-selected={n === i}
            aria-label={t.welcome.slideLabel(n + 1)}
          />
        ))}
      </div>

      <div className="welcome__foot">
        <button className="btn btn--primary" onClick={onStart}>
          {t.welcome.start}
        </button>
        <button className="btn btn--ghost" onClick={onStart}>
          {t.welcome.signIn}
        </button>
        <p className="note">{t.aiNote}</p>
        <p className="note note--faint">{t.legal}</p>
      </div>
    </div>
  )
}
