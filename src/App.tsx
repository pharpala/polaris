import { useState } from 'react'
import './styles.css'
import { ArrowLeft, Check, Compass, StatusIcons } from './Icons'
import { dicts, langOrder, type LangCode } from './i18n'
import Launch from './screens/Launch'
import Phone from './screens/Phone'
import SignUp from './screens/SignUp'
import Welcome from './screens/Welcome'

type Step = 'launch' | 'welcome' | 'signup' | 'phone' | 'end'

/** The two steps that sit inside the account-setup section and show the rail. */
const RAIL: Step[] = ['signup', 'phone']

function StatusBar() {
  return (
    <div className="statusbar" aria-hidden>
      <span className="statusbar__time">9:41</span>
      <StatusIcons />
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState<LangCode>('en')
  const [step, setStep] = useState<Step>('launch')
  const [langOpen, setLangOpen] = useState(false)

  const t = dicts[lang]
  const railIndex = RAIL.indexOf(step)
  const onRail = railIndex >= 0
  const bare = step === 'launch' || step === 'welcome'

  const back = () => setStep(step === 'phone' ? 'signup' : 'welcome')

  const title = step === 'signup' ? t.signup.stage : step === 'phone' ? t.phone.stage : t.brand

  return (
    <div className="stage">
      <div className="device">
        {/* Side hardware. Present on a drawn phone, meaningless on a real one. */}
        <span className="device__key device__key--action" aria-hidden />
        <span className="device__key device__key--volUp" aria-hidden />
        <span className="device__key device__key--volDown" aria-hidden />
        <span className="device__key device__key--power" aria-hidden />

        <div className="device__screen" lang={lang}>
          <span className="device__island" aria-hidden />
          <StatusBar />

          {!bare && (
            <div className="appbar">
              <div className="appbar__row">
                <button className="appbar__back" onClick={back} aria-label={t.back}>
                  <ArrowLeft />
                </button>
                <span className="appbar__title">{title}</span>
                <span className="appbar__pad" />
              </div>
              {onRail && (
                <>
                  <div
                    className="rail"
                    role="progressbar"
                    aria-valuenow={railIndex + 1}
                    aria-valuemax={RAIL.length}
                  >
                    <span
                      className="rail__fill"
                      style={{ inlineSize: `${((railIndex + 1) / RAIL.length) * 100}%` }}
                    />
                  </div>
                  <span className="appbar__step">{t.signup.step(railIndex + 1, RAIL.length)}</span>
                </>
              )}
            </div>
          )}

          {step === 'launch' && <Launch t={t} onDone={() => setStep('welcome')} />}
          {step === 'welcome' && (
            <Welcome t={t} onStart={() => setStep('signup')} onLang={() => setLangOpen(true)} />
          )}
          {step === 'signup' && <SignUp t={t} onNext={() => setStep('phone')} />}
          {step === 'phone' && <Phone t={t} onNext={() => setStep('end')} />}
          {step === 'end' && (
            <div className="screen end">
              <span className="mark">
                <Compass />
                {t.brand}
              </span>
              <p className="end__note">
                End of the built flow. Stage 1 of the journey — the guided questions — comes next.
              </p>
              <button className="btn btn--ghost" onClick={() => setStep('launch')}>
                Restart
              </button>
            </div>
          )}

          {/* Language is offered before anything else, because for a newcomer
              the language of the disclosures is the first barrier. */}
          <div className={`sheet${langOpen ? ' sheet--open' : ''}`}>
            <button
              className="sheet__scrim"
              onClick={() => setLangOpen(false)}
              aria-label={t.lang.done}
              tabIndex={langOpen ? 0 : -1}
            />
            <div className="sheet__panel" role="dialog" aria-modal="true" aria-label={t.lang.title}>
              <h2 className="sheet__h">{t.lang.title}</h2>
              <p className="sheet__p">{t.lang.body}</p>
              {langOrder.map((l) => (
                <button
                  key={l}
                  className="langRow"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                >
                  <span>
                    {dicts[l].meta.native}
                    <span className="langRow__note">{dicts[l].meta.note}</span>
                  </span>
                  {lang === l && (
                    <span className="tick">
                      <Check />
                    </span>
                  )}
                </button>
              ))}
              <button className="btn btn--primary" onClick={() => setLangOpen(false)}>
                {t.lang.done}
              </button>
            </div>
          </div>

          <span className="device__home" aria-hidden />
        </div>
      </div>
    </div>
  )
}
