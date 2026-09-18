import { useState } from 'react'
import './styles.css'
import Sheet from './components/Sheet'
import { Check, ChevronLeft, Compass, Globe, StatusIcons } from './Icons'
import { dicts, langOrder, type LangCode } from './i18n'
import Goals from './screens/Goals'
import Launch from './screens/Launch'
import Profile from './screens/Profile'
import Status from './screens/Status'

/**
 * The customer is already signed in, so there is no home screen and no
 * credentials step. The mark resolves, then stage 1 of the journey —
 * understand intent — starts asking.
 */
type Step = 'launch' | 'profile' | 'status' | 'goals' | 'end'

const RAIL: Step[] = ['profile', 'status', 'goals']

/** The target design shows six dots: the three questions here, then the
 *  recommendation, identity capture and review still to build. */
const DOTS = 6

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

  const [profile, setProfile] = useState<string[]>([])
  const [status, setStatus] = useState<string | null>(null)
  const [goals, setGoals] = useState<string[]>([])

  const t = dicts[lang]
  const railIndex = RAIL.indexOf(step)
  const onRail = railIndex >= 0

  const back = () => setStep(railIndex > 0 ? RAIL[railIndex - 1] : 'launch')

  const restart = () => {
    setProfile([])
    setStatus(null)
    setGoals([])
    setStep('launch')
  }

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

          {onRail && (
            <div className="appbar">
              <button className="appbar__back" onClick={back} aria-label={t.back}>
                <ChevronLeft />
              </button>
              <span className="wordmark">{t.brand}</span>
              <span
                className="dots"
                role="progressbar"
                aria-valuenow={railIndex + 1}
                aria-valuemax={DOTS}
              >
                {Array.from({ length: DOTS }, (_, i) => (
                  <span key={i} className={`dot${i === railIndex ? ' dot--on' : ''}`} />
                ))}
              </span>
              {/* Language stays in reach on every question, because for a
                  newcomer the language of the disclosures is the first
                  barrier, not the last. */}
              <button className="langBtn" onClick={() => setLangOpen(true)} aria-label={t.lang.open}>
                <Globe />
              </button>
            </div>
          )}

          {step === 'launch' && <Launch t={t} onDone={() => setStep('profile')} />}

          {step === 'profile' && (
            <Profile
              t={t}
              value={profile}
              onToggle={(id) =>
                setProfile((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
              }
              onNext={() => setStep('status')}
            />
          )}

          {step === 'status' && (
            <Status t={t} value={status} onPick={setStatus} onNext={() => setStep('goals')} />
          )}

          {step === 'goals' && (
            <Goals
              t={t}
              value={goals}
              onToggle={(id) =>
                setGoals((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]))
              }
              onNext={() => setStep('end')}
            />
          )}

          {step === 'end' && (
            <div className="screen end">
              <span className="mark">
                <Compass />
                {t.brand}
              </span>
              <p className="end__note">
                End of the built flow. Stage 2 — the recommendation, with the reasoning
                attached — comes next.
              </p>
              <button className="btn btn--ghost" onClick={restart}>
                Restart
              </button>
            </div>
          )}

          <Sheet
            open={langOpen}
            onClose={() => setLangOpen(false)}
            title={t.lang.title}
            body={t.lang.body}
            done={t.lang.done}
          >
            {langOrder.map((l) => (
              <button
                key={l}
                className="row"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
              >
                <span>
                  {dicts[l].meta.native}
                  <span className="row__note">{dicts[l].meta.note}</span>
                </span>
                {lang === l && (
                  <span className="tick">
                    <Check />
                  </span>
                )}
              </button>
            ))}
          </Sheet>

          <span className="device__home" aria-hidden />
        </div>
      </div>
    </div>
  )
}
