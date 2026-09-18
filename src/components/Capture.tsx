import { useEffect, useRef, useState } from 'react'
import { coach, measure, SIMULATED, type Issue } from '../capture'
import { Camera } from '../Icons'
import type { Dict } from '../i18n'

const SAMPLE_MS = 220
/** How many clean frames in a row before the shutter opens. */
const STEADY = 3
/** The analysis runs on a downscaled copy; the preview stays full quality. */
const ANALYSIS_W = 160

/**
 * A camera that refuses a bad photo. It samples the live frame four or five
 * times a second, measures light, glare, sharpness and framing, and says the
 * single most useful thing — then only opens the shutter once the frame has
 * been clean for three samples running.
 *
 * With no camera available it falls back to the same coaching sequence,
 * labelled on screen, so the behaviour is still demonstrable.
 */
export default function Capture({
  t,
  kind,
  doc,
  onDone,
  onHelp,
}: {
  t: Dict
  kind: 'id' | 'selfie'
  doc?: string
  onDone: () => void
  onHelp: () => void
}) {
  const video = useRef<HTMLVideoElement>(null)
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const [issue, setIssue] = useState<Issue>('dark')
  const [steady, setSteady] = useState(0)
  const [live, setLive] = useState<boolean | null>(null)
  const [shot, setShot] = useState(false)

  // Ask for the camera. Denied or unsupported is a normal outcome, not an
  // error state — the coaching falls back to a sequence.
  useEffect(() => {
    let stream: MediaStream | null = null
    let cancelled = false

    navigator.mediaDevices
      ?.getUserMedia({
        video: { facingMode: kind === 'selfie' ? 'user' : 'environment' },
        audio: false,
      })
      .then((s) => {
        if (cancelled) return s.getTracks().forEach((tr) => tr.stop())
        stream = s
        setLive(true)
        if (video.current) {
          video.current.srcObject = s
          void video.current.play()
        }
      })
      .catch(() => !cancelled && setLive(false))

    return () => {
      cancelled = true
      stream?.getTracks().forEach((tr) => tr.stop())
    }
  }, [kind])

  // Real frames: measure and coach.
  useEffect(() => {
    if (live !== true) return
    const id = window.setInterval(() => {
      const v = video.current
      if (!v || v.videoWidth === 0) return

      canvas.current ??= document.createElement('canvas')
      const c = canvas.current
      const h = Math.max(1, Math.round((ANALYSIS_W * v.videoHeight) / v.videoWidth))
      c.width = ANALYSIS_W
      c.height = h
      const ctx = c.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      ctx.drawImage(v, 0, 0, ANALYSIS_W, h)

      const next = coach(measure(ctx.getImageData(0, 0, ANALYSIS_W, h)), kind)
      setIssue(next)
      setSteady((n) => (next === 'ok' ? Math.min(n + 1, STEADY) : 0))
    }, SAMPLE_MS)
    return () => window.clearInterval(id)
  }, [live, kind])

  // No camera: walk the same messages so the behaviour still reads.
  useEffect(() => {
    if (live !== false) return
    let i = 0
    const id = window.setInterval(() => {
      const next = SIMULATED[i++ % SIMULATED.length]
      setIssue(next)
      setSteady(next === 'ok' ? STEADY : 0)
    }, 1600)
    return () => window.clearInterval(id)
  }, [live])

  const ready = issue === 'ok' && steady >= STEADY
  const c = t.capture

  return (
    <div className="screen q">
      <div className="q__scroll">
        <p className="q__saved">{t.saved}</p>
        <h1 className="q__h">{kind === 'id' ? c.idTitle : c.selfieTitle}</h1>
        <p className="q__sub">
          {kind === 'id' ? c.idSub(doc ?? '') : c.selfieSub}
        </p>

        <div className={`view view--${kind}${ready ? ' view--ready' : ''}`}>
          <video
            ref={video}
            className={`view__feed${kind === 'selfie' ? ' view__feed--mirror' : ''}`}
            playsInline
            muted
            autoPlay
          />

          {/* The guide the customer is aiming at. */}
          <span className={`guide guide--${kind}`} aria-hidden />

          {live === false && kind === 'id' && (
            <span className="idcard" aria-hidden>
              <span className="idcard__row">
                <span>PASSPORT</span>
                <span>CAN</span>
              </span>
              <span className="idcard__name">PHILIPS, EDWARD</span>
              <span className="idcard__dob">DOB 14 MAR 1998</span>
            </span>
          )}

          {shot && <span className="view__flash" aria-hidden />}

          <p className="view__coach" role="status">
            {ready ? c.ok : c.issue[issue]}
          </p>

          {live === false && <p className="view__note">{c.noCamera}</p>}
        </div>

        <button
          className="btn btn--primary"
          disabled={!ready}
          onClick={() => {
            setShot(true)
            window.setTimeout(onDone, 420)
          }}
        >
          <Camera />
          {kind === 'id' ? c.takeId : c.takeSelfie}
        </button>

        <p className="legal">{kind === 'id' ? c.idFoot : c.selfieFoot}</p>
      </div>

      <button className="help" onClick={onHelp}>
        <span className="help__mark">?</span>
        {t.help}
      </button>
    </div>
  )
}
