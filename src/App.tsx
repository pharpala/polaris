import './styles.css'

/** Device chrome, not UI — the status strip a real handset would draw. */
function StatusBar() {
  return (
    <div className="statusbar" aria-hidden>
      <span className="statusbar__time">9:41</span>
      <span className="statusbar__icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7.5" width="3" height="3.5" rx="0.5" />
          <rect x="4.6" y="5" width="3" height="6" rx="0.5" />
          <rect x="9.2" y="2.5" width="3" height="8.5" rx="0.5" />
          <rect x="13.8" y="0" width="3" height="11" rx="0.5" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor">
          <path d="M1 3.4a10 10 0 0 1 14 0" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3.8 6.2a6 6 0 0 1 8.4 0" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="8" cy="9.2" r="1.3" fill="currentColor" stroke="none" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.6"
            y="0.6"
            width="21"
            height="10.8"
            rx="2.6"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.1"
          />
          <rect x="2.2" y="2.2" width="17.8" height="7.6" rx="1.6" fill="currentColor" />
          <path d="M23.2 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </span>
    </div>
  )
}

/**
 * The Polaris compass rose, redrawn in one colour from the symbol in the case
 * brief: a four-point star on a long north–south axis, a bearing ring with
 * diagonal ticks, and a square hub knocked out of the centre. The brief's
 * navy tile is dropped — only the symbol carries over.
 */
function Compass() {
  const tick = (x1: number, y1: number, x2: number, y2: number) => (
    <line key={`${x1}${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
  )

  return (
    <svg className="mark__glyph" viewBox="0 0 32 32" aria-hidden focusable="false">
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

/** The app itself. Everything around it is the silhouette. */
function Welcome() {
  return (
    <main className="welcome">
      <h1 className="welcome__mark">
        <Compass />
        Polaris
      </h1>
    </main>
  )
}

export default function App() {
  return (
    <div className="stage">
      <div className="device">
        {/* Side hardware. Present on a drawn phone, meaningless on a real one. */}
        <span className="device__key device__key--action" aria-hidden />
        <span className="device__key device__key--volUp" aria-hidden />
        <span className="device__key device__key--volDown" aria-hidden />
        <span className="device__key device__key--power" aria-hidden />

        <div className="device__screen">
          <span className="device__island" aria-hidden />
          <StatusBar />
          <Welcome />
          <span className="device__home" aria-hidden />
        </div>
      </div>
    </div>
  )
}
