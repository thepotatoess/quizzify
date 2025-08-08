import './App.css'

export default function App() {
  return (
    <div className="app">
      <header className="navbar">
        <a href="#" className="logo">Quizzify</a>
        <nav className="menu">
          <a href="#" className="menu-item">Learning Paths</a>
          <a href="#" className="menu-item">Quizzes</a>
          <a href="#" className="menu-item login-btn">Login</a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Master Anything with Quizzify</h1>
            <p>
              Interactive quizzes that guide you through complete learning paths.
            </p>
            <button className="cta">Start Learning</button>
          </div>
        </section>
        <section className="features">
          <div className="feature">
            <span className="feature-icon" role="img" aria-label="brain">
              🧠
            </span>
            <h3>Interactive Quizzes</h3>
            <p>Challenge yourself and reinforce knowledge with fun quizzes.</p>
          </div>
          <div className="feature">
            <span className="feature-icon" role="img" aria-label="chart">
              📈
            </span>
            <h3>Track Progress</h3>
            <p>Monitor your improvement and stay motivated as you learn.</p>
          </div>
          <div className="feature">
            <span className="feature-icon" role="img" aria-label="globe">
              🌍
            </span>
            <h3>Diverse Paths</h3>
            <p>Explore subjects from geography to medicine and beyond.</p>
          </div>
        </section>
      </main>
      <footer className="footer">© 2024 Quizzify</footer>
    </div>
  )
}
