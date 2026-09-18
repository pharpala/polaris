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
          <path
            d="M23.2 4.2v3.6a2 2 0 0 0 0-3.6Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      </span>
    </div>
  )
}

export default function App() {
  return (
    <div className="stage">
      <div className="phone">
        <div className="phone__screen">
          <span className="phone__island" aria-hidden />
          <StatusBar />

          <main className="welcome">
            <h1 className="welcome__mark">Polaris</h1>
          </main>

          <span className="phone__home" aria-hidden />
        </div>
      </div>
    </div>
  )
}
