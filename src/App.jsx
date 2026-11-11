import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="brand" href="/" aria-label="Artificial Moral Assistant home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3.5c1.7 5.2 2.3 5.8 7.5 7.5-5.2 1.7-5.8 2.3-7.5 7.5-1.7-5.2-2.3-5.8-7.5-7.5 5.2-1.7 5.8-2.3 7.5-7.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>Artificial Moral Assistant</span>
        </a>
        <div className="header-note">
          <span className="status-dot" aria-hidden="true" />
          Database online
        </div>
      </header>

      <main className="welcome-main">
        <section className="welcome-content" aria-labelledby="welcome-title">
          <h1 id="welcome-title">Artificial Moral Assistant</h1>
          <button className="start-button" type="button">
            Start
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4.5 10h10m-4-4 4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className="welcome-note">Anonymous user study.</p>
        </section>
      </main>

      <footer className="app-footer">
        Copyright: Joakim Borg - Uppsala University 2027
      </footer>
    </div>
  )
}

export default App
