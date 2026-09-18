type P = { size?: number }

export function ChevronLeft({ size = 22 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  )
}

export function Chevron({ size = 20 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="square" aria-hidden>
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  )
}

export function Check({ size = 14 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="3" strokeLinecap="square" aria-hidden>
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  )
}

export function Globe({ size = 15 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M3 12h18M12 2.8c2.4 2.5 3.6 5.6 3.6 9.2s-1.2 6.7-3.6 9.2c-2.4-2.5-3.6-5.6-3.6-9.2S9.6 5.3 12 2.8Z" />
    </svg>
  )
}

/** Device chrome — the status strip a real handset draws. */
export function StatusIcons() {
  return (
    <span className="statusbar__icons">
      <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
        <rect x="0" y="7.5" width="3" height="3.5" rx="0.5" />
        <rect x="4.6" y="5" width="3" height="6" rx="0.5" />
        <rect x="9.2" y="2.5" width="3" height="8.5" rx="0.5" />
        <rect x="13.8" y="0" width="3" height="11" rx="0.5" />
      </svg>
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" aria-hidden>
        <path d="M1 3.4a10 10 0 0 1 14 0" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M3.8 6.2a6 6 0 0 1 8.4 0" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="9.2" r="1.3" fill="currentColor" stroke="none" />
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden>
        <rect x="0.6" y="0.6" width="21" height="10.8" rx="2.6" stroke="currentColor"
          strokeOpacity="0.4" strokeWidth="1.1" />
        <rect x="2.2" y="2.2" width="17.8" height="7.6" rx="1.6" fill="currentColor" />
        <path d="M23.2 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </span>
  )
}

/**
 * The Polaris compass rose, redrawn in one colour from the symbol in the case
 * brief: a four-point star on a long north–south axis, a bearing ring with
 * diagonal ticks, and a square hub knocked out of the centre.
 */
export function Compass({ className = 'mark__glyph' }: { className?: string }) {
  const tick = (x1: number, y1: number, x2: number, y2: number) => (
    <line key={`${x1}${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
  )
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden focusable="false">
      <g stroke="currentColor" strokeOpacity="0.34" strokeWidth="1.15" fill="none">
        <circle cx="16" cy="16" r="14.1" />
        <g strokeLinecap="round">
          {tick(21.7, 10.3, 24.8, 7.2)}
          {tick(21.7, 21.7, 24.8, 24.8)}
          {tick(10.3, 21.7, 7.2, 24.8)}
          {tick(10.3, 10.3, 7.2, 7.2)}
        </g>
      </g>
      <path
        d="M16 1.6 17.6 14.4 29 16 17.6 17.6 16 30.4 14.4 17.6 3 16 14.4 14.4Z"
        fill="currentColor"
      />
      {/* The hub is knocked out to the screen colour rather than drawn. */}
      <rect x="14.4" y="14.4" width="3.2" height="3.2" fill="var(--white)" />
    </svg>
  )
}
