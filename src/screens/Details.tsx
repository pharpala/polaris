import { useState } from 'react'
import { Question } from '../components/Question'
import type { Dict } from '../i18n'

/**
 * Collect once. Everything Polaris already holds arrives filled in — the
 * deck's "pre-fills data Polaris already holds where permitted" — and the
 * customer confirms rather than types. The name is deliberately absent: it
 * comes off the ID, so asking for it here would be asking twice.
 *
 * The two links underneath are the cases that push a newcomer into a branch
 * today: a phone number that is not Canadian yet, and an address that is a
 * hotel or a friend's sofa.
 */
export default function Details({
  t,
  value,
  onChange,
  onNext,
  onHelp,
}: {
  t: Dict
  value: { email: string; mobile: string; address: string }
  onChange: (next: { email: string; mobile: string; address: string }) => void
  onNext: () => void
  onHelp: () => void
}) {
  const [intl, setIntl] = useState(false)
  const [temp, setTemp] = useState(false)
  const d = t.details

  const set = (k: keyof typeof value) => (e: { target: { value: string } }) =>
    onChange({ ...value, [k]: e.target.value })

  const ready =
    /.+@.+\..+/.test(value.email) && value.mobile.trim().length > 6 && value.address.trim().length > 6

  return (
    <Question
      t={t}
      onHelp={onHelp}
      title={d.title}
      sub={d.sub}
      cta={d.cta}
      ready={ready}
      onNext={onNext}
    >
      <p className="prefill">{d.prefilled}</p>

      <label className="field">
        <span className="field__label">{d.email}</span>
        <input className="field__input" type="email" value={value.email} onChange={set('email')} />
      </label>

      <label className="field">
        <span className="field__label">{intl ? d.mobileIntl : d.mobile}</span>
        <input className="field__input" type="tel" value={value.mobile} onChange={set('mobile')} />
      </label>

      <label className="field">
        <span className="field__label">{d.address}</span>
        <input className="field__input" value={value.address} onChange={set('address')} />
      </label>

      <button
        className="skip skip--inline"
        onClick={() => {
          setIntl((v) => !v)
          if (!intl) onChange({ ...value, mobile: '+52 55 1234 5678' })
        }}
      >
        {d.intl}
      </button>
      {intl && <p className="prefill prefill--note">{d.intlNote}</p>}

      <button className="skip skip--inline" onClick={() => setTemp((v) => !v)}>
        {d.temp}
      </button>
      {temp && <p className="prefill prefill--note">{d.tempNote}</p>}
    </Question>
  )
}
