import { useEffect } from 'react'
import { Compass } from '../Icons'
import type { Dict } from '../i18n'

/**
 * The launch frame: the mark on white and nothing else. It holds for just
 * under two seconds while locale and any saved application resolve, or
 * until the customer taps through it.
 */
const HOLD_MS = 1800

export default function Launch({ t, onDone }: { t: Dict; onDone: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onDone, HOLD_MS)
    return () => window.clearTimeout(id)
  }, [onDone])

  return (
    <button className="screen launch" onClick={onDone} aria-label={t.brand}>
      <span className="mark">
        <Compass />
        {t.brand}
      </span>
    </button>
  )
}
