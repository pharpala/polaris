/**
 * The carousel artwork. The Wealthsimple reference floats rendered 3D coins
 * here; the Polaris palette has three flat colours and square corners, so
 * each slide gets a diagram that states the claim instead of decorating it.
 * Every value below is #FFFFFF, #324AFE or #181B1F, or ink mixed with white.
 */

const INK = 'var(--ink)'
const BLUE = 'var(--blue)'
const FAINT = 'var(--ink-14)'

/** 5 minutes against the 22 it takes today — one square a minute. */
export function Minutes() {
  const unit = 9
  const gap = 3.4
  const row = (n: number, y: number, fill: string) =>
    Array.from({ length: n }, (_, i) => (
      <rect key={i} x={i * (unit + gap)} y={y} width={unit} height={unit} fill={fill} />
    ))

  return (
    <svg className="art" viewBox="0 0 280 150" role="img" aria-label="Five minutes against twenty-two today">
      <g transform="translate(2 34)">
        {row(5, 0, BLUE)}
        <text className="art__label art__label--on" x="0" y="26">Polaris · 5 min</text>
      </g>
      <g transform="translate(2 92)">
        {row(22, 0, FAINT)}
        <text className="art__label" x="0" y="26">Today · 22 min</text>
      </g>
    </svg>
  )
}

/** A short list of options with the reasoning attached, not a catalogue. */
export function Options() {
  const card = (y: number, on: boolean) => (
    <g transform={`translate(38 ${y})`}>
      <rect width="204" height="40" fill={on ? BLUE : 'none'} stroke={on ? BLUE : FAINT} strokeWidth="1.4" />
      <rect x="16" y="13" width={on ? 74 : 62} height="5" fill={on ? 'var(--white)' : 'var(--ink-22)'} />
      <rect x="16" y="24" width={on ? 112 : 96} height="4" fill={on ? 'rgba(255,255,255,0.55)' : FAINT} />
      {on && (
        <g transform="translate(172 13)" stroke="var(--white)" strokeWidth="2.6" fill="none" strokeLinecap="square">
          <path d="M0 7.5 5.5 13 15 2" />
        </g>
      )}
    </g>
  )

  return (
    <svg className="art" viewBox="0 0 280 150" role="img" aria-label="Two or three accounts that fit, one recommended">
      {card(6, false)}
      {card(55, true)}
      {card(104, false)}
    </svg>
  )
}

/** Four scripts, equal weight — the disclosures included. */
export function Languages() {
  const tile = (x: number, y: number, glyph: string, on: boolean) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="66" height="56" fill={on ? BLUE : 'none'} stroke={on ? BLUE : FAINT} strokeWidth="1.4" />
      <text className="art__glyph" x="33" y="36" fill={on ? 'var(--white)' : INK}>{glyph}</text>
    </g>
  )

  return (
    <svg className="art" viewBox="0 0 280 150" role="img" aria-label="Four languages carried through the whole journey">
      {tile(66, 12, 'A', false)}
      {tile(148, 12, 'é', true)}
      {tile(66, 82, 'ñ', false)}
      {tile(148, 82, 'ع', false)}
    </svg>
  )
}

/** Progress holds, and a person can pick it up mid-track. */
export function Progress() {
  const step = (i: number, state: 'done' | 'now' | 'todo') => {
    const x = 14 + i * 42
    return (
      <g key={i} transform={`translate(${x} 58)`}>
        {state === 'done' && <rect width="18" height="18" fill={INK} />}
        {state === 'now' && (
          <>
            <rect x="-4" y="-4" width="26" height="26" fill="none" stroke={BLUE} strokeWidth="1.4" />
            <rect width="18" height="18" fill={BLUE} />
          </>
        )}
        {state === 'todo' && <rect width="18" height="18" fill="none" stroke={FAINT} strokeWidth="1.4" />}
      </g>
    )
  }

  return (
    <svg className="art" viewBox="0 0 280 150" role="img" aria-label="Progress saved partway through, nothing restarts">
      <line x1="14" y1="67" x2="266" y2="67" stroke={FAINT} strokeWidth="1.4" />
      <line x1="14" y1="67" x2="146" y2="67" stroke={INK} strokeWidth="1.4" />
      {(['done', 'done', 'done', 'now', 'todo', 'todo'] as const).map((s, i) => step(i, s))}
      <text className="art__label art__label--on" x="110" y="34">Saved here</text>
      <path d="M140 40v10" stroke={BLUE} strokeWidth="1.4" />
      <text className="art__label" x="14" y="112">Leave and come back · no restart</text>
    </svg>
  )
}

export const slideArt = [Minutes, Options, Languages, Progress]
