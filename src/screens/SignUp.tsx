import { useEffect, useState } from 'react'
import { Eye, EyeOff } from '../Icons'
import type { Dict } from '../i18n'

const CHECK_MS = 1500

/**
 * Email and password. The reference screen asks for both with no reason
 * given; the deck's future state explains why each piece of information is
 * needed at the point it is asked, so each field carries its own line.
 */
export default function SignUp({ t, onNext }: { t: Dict; onNext: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shown, setShown] = useState(false)
  const [checking, setChecking] = useState(false)

  const ready = /.+@.+\..+/.test(email) && password.length >= 8

  // The reference shows a spinner in the button while the address is checked.
  useEffect(() => {
    if (!checking) return
    const id = window.setTimeout(onNext, CHECK_MS)
    return () => window.clearTimeout(id)
  }, [checking, onNext])

  return (
    <div className="screen form">
      <div className="form__body">
        <label className="field">
          <span className="field__label">{t.signup.email}</span>
          <input
            className="field__input"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={checking}
          />
        </label>
        <p className="why">{t.signup.emailWhy}</p>

        <label className="field">
          <span className="field__label">{t.signup.password}</span>
          <input
            className="field__input"
            type={shown ? 'text' : 'password'}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={checking}
          />
          <button
            type="button"
            className="field__toggle"
            onClick={() => setShown((s) => !s)}
            aria-label={shown ? t.signup.hide : t.signup.show}
          >
            {shown ? <EyeOff /> : <Eye />}
          </button>
        </label>
        <p className="why">{t.signup.passwordWhy}</p>
      </div>

      <div className="form__foot">
        <p className="legal">
          {t.signup.legal.split(t.signup.terms)[0]}
          <a href="#terms" onClick={(e) => e.preventDefault()}>{t.signup.terms}</a>
          {t.signup.legal.split(t.signup.terms)[1]?.split(t.signup.privacy)[0]}
          <a href="#privacy" onClick={(e) => e.preventDefault()}>{t.signup.privacy}</a>
          {t.signup.legal.split(t.signup.privacy)[1]}
        </p>

        <button
          className="btn btn--primary"
          disabled={!ready || checking}
          onClick={() => setChecking(true)}
        >
          {checking ? (
            <span className="btn__busy">
              <span className="spinner" aria-hidden />
              {t.signup.checking}
            </span>
          ) : (
            t.signup.next
          )}
        </button>
      </div>
    </div>
  )
}
