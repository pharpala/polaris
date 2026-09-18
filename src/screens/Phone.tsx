import { useState } from 'react'
import type { Dict } from '../i18n'

/** Format as the customer types: 416 555 0134. */
const format = (raw: string) => {
  const d = raw.replace(/\D/g, '').slice(0, 10)
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6)].filter(Boolean).join(' ')
}

export default function Phone({ t, onNext }: { t: Dict; onNext: () => void }) {
  const [value, setValue] = useState('')
  const ready = value.replace(/\D/g, '').length === 10

  return (
    <div className="screen form">
      <div className="form__body">
        <label className="field">
          <span className="field__label">{t.phone.label}</span>
          <span className="field__prefix">+1</span>
          <input
            className="field__input field__input--prefixed"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={value}
            onChange={(e) => setValue(format(e.target.value))}
          />
        </label>
        <p className="why">{t.phone.why}</p>
      </div>

      <div className="form__foot">
        <p className="legal">{t.phone.hint}</p>
        <button className="btn btn--primary" disabled={!ready} onClick={onNext}>
          {t.phone.cta}
        </button>
      </div>
    </div>
  )
}
