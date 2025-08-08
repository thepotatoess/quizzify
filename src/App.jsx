import './App.css'

export default function App() {
  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">Quizzify</div>
        <nav className="menu">
          <a href="#" className="menu-item">Home</a>
          <a href="#" className="menu-item">Learning Paths</a>
          <a href="#" className="menu-item">Quizzes</a>
          <a href="#" className="menu-item login-btn">Login</a>
        </nav>
      </header>
      <section className="hero">
        <h1>Learn Smarter with Quizzify</h1>
        <p>Create and explore quiz-based learning paths across any subject.</p>
        <button className="cta">Get Started</button>
      </section>
    </div>
  )
}
