import { useMemo, useState } from 'react'
import './styles.css'
import Sheet from './components/Sheet'
import { Check, ChevronLeft, Compass, Globe, StatusIcons } from './Icons'
import { dicts, langOrder, type LangCode } from './i18n'
import Follow from './screens/Follow'
import Goals from './screens/Goals'
import Launch from './screens/Launch'
import Profile from './screens/Profile'

/**
 * The customer is already signed in, so there is no home screen and no
 * credentials step. The mark resolves, then stage 1 of the journey —
 * understand intent — starts asking.
 *
 * The path is not fixed. The first question is a multi-select, and each thing
 * the customer picks opens its own follow-up, so the queue below is built
 * from their answers rather than declared up front. Two people never see the
 * same set of questions, and the dot count changes as they choose.
 */
type Step = 'launch' | 'profile' | 'goals' | 'end' | `follow:${string}`

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
  const [follows, setFollows] = useState<Record<string, string>>({})
  const [otherText, setOtherText] = useState('')
  const [goals, setGoals] = useState<string[]>([])

  const t = dicts[lang]

  // Built from the answers, in the order the options were offered so the
  // sequence stays predictable.
  const queue = useMemo<Step[]>(() => {
    const opened = t.profile.options
      .filter((o) => profile.includes(o.id) && t.follow[o.id])
      .map((o) => `follow:${o.id}` as Step)
    return ['profile', ...opened, 'goals']
  }, [profile, t])

  const index = queue.indexOf(step)
  const onQueue = index >= 0

  const next = () => setStep(queue[index + 1] ?? 'end')
  const back = () => setStep(index > 0 ? queue[index - 1] : 'launch')

  const restart = () => {
    setProfile([])
    setFollows({})
    setOtherText('')
    setGoals([])
    setStep('launch')
  }

  const followId = step.startsWith('follow:') ? step.slice('follow:'.length) : null

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

          {onQueue && (
            <div className="appbar">
              <button className="appbar__back" onClick={back} aria-label={t.back}>
                <ChevronLeft />
              </button>
              <span className="wordmark">{t.brand}</span>
              <span
                className="dots"
                role="progressbar"
                aria-valuenow={index + 1}
                aria-valuemax={queue.length}
              >
                {queue.map((s, i) => (
                  <span key={s} className={`dot${i === index ? ' dot--on' : ''}`} />
                ))}
              </span>
              {/* Language stays in reach on every question, because for a
                  newcomer the language of the disclosures is the first
                  barrier, not the last. */}
              <button
                className="langBtn"
                onClick={() => setLangOpen(true)}
                aria-label={t.lang.open}
              >
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
              onNext={next}
            />
          )}

          {followId && t.follow[followId] && (
            <Follow
              key={followId}
              t={t}
              q={t.follow[followId]}
              value={follows[followId]}
              text={otherText}
              onPick={(id) => setFollows((f) => ({ ...f, [followId]: id }))}
              onText={setOtherText}
              onNext={next}
            />
          )}

          {step === 'goals' && (
            <Goals
              t={t}
              value={goals}
              onToggle={(id) =>
                setGoals((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]))
              }
              onNext={next}
            />
          )}

          {step === 'end' && (
            <div className="screen end">
              <span className="mark">
                <Compass />
                {t.brand}
              </span>
              <p className="end__note">
                End of the built flow. Stage 2 — the recommendation, ranked against these
                answers with the reasoning attached — comes next.
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
              <button key={l} className="row" onClick={() => setLang(l)} aria-pressed={lang === l}>
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
