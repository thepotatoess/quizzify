import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Stat from '../components/Stat.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import './Home.css'

export default function Home() {
  return (
    <div className="app-container">
      <Navbar />

      {/* HERO */}
      <section className="hero hero-gradient" id="hero">
        <div className="hero-inner">
          <p className="eyebrow">Quizzes • Learning Paths • Insights</p>
          <h1 className="hero-title">
            Elevate your learning with
            <span className="text-accent"> guided quizzes</span>
          </h1>
          <p className="hero-sub">Master new topics through adaptive quizzes and curated learning paths—built for focus, momentum, and retention.</p>
          <div className="hero-actions" role="group" aria-label="Primary actions">
            <a href="/signup" className="btn btn-primary">Get started free</a>
            <a href="#quizzes" className="btn btn-ghost">Try a demo quiz</a>
          </div>

          {/* quick trust row */}
          <div className="hero-stats">
            <Stat kValue="500+" text="questions ready" />
            <Stat kValue="<5 min" text="to first quiz" />
            <Stat kValue="90%" text="report better recall" />
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          {/* Decorative blob */}
          <svg viewBox="0 0 400 400" className="blob">
            <defs>
              <radialGradient id="g1" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#7c87ff"/>
                <stop offset="60%" stopColor="#5d2ee6"/>
                <stop offset="100%" stopColor="#141414"/>
              </radialGradient>
            </defs>
            <path d="M260 55c40 22 74 60 83 105 9 45-7 97-39 126-32 29-80 35-124 29-44-6-84-24-106-56-22-33-27-79-9-117 17-37 56-68 99-82 44-14 92-11 96-5z" fill="url(#g1)"/>
          </svg>
        </div>
      </section>

      {/* LOGOS */}
      <section aria-label="Trusted by" className="logo-strip">
        <div className="container logos">
          {['Academy','Campus','SkillLab','LearnCo','QuizHub'].map((n,i)=> (
            <div className="logo-chip" key={i} aria-label={`Partner ${n}`}>{n}</div>
          ))}
        </div>
      </section>

      {/* LEARNING PATHS */}
      <section id="learning-paths" className="section">
        <div className="container">
          <header className="section-head">
            <h2>What are Learning Paths?</h2>
            <p>A curated journey through a topic—short modules, clear milestones, and quiz checkpoints to lock in knowledge.</p>
          </header>
          <div className="grid">
            <FeatureCard icon="🎯" title="Goals & milestones" desc="Define outcomes and track progress module by module." />
            <FeatureCard icon="⚙️" title="Adaptive progression" desc="Tasks adjust to your level so you learn at the right pace." />
            <FeatureCard icon="🧩" title="Blended content" desc="Text, video, flashcards—and quizzes—in a natural sequence." />
          </div>
        </div>
      </section>

      {/* QUIZZES */}
      <section id="quizzes" className="section alt">
        <div className="container">
          <header className="section-head">
            <h2>Quizzes that build knowledge</h2>
            <p>Spaced repetition, instant feedback, and explanations for every answer. Use pre‑built quizzes or create your own.</p>
          </header>
          <div className="grid">
            <FeatureCard icon="📝" title="Question types" desc="Multiple choice, true/false, glossary, code snippets." />
            <FeatureCard icon="💡" title="Explanations" desc="Each answer can include a quick rationale—learn from mistakes instantly." />
            <FeatureCard icon="📊" title="Insights" desc="See strengths & weaknesses by topic so you know what to practice next." />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonials" aria-label="What learners say">
        <div className="container t-wrap">
          <figure className="quote">
            <blockquote>“The first platform that actually kept me engaged—and I remember more after a week.”</blockquote>
            <figcaption>— Beta user, CS student</figcaption>
          </figure>
          <figure className="quote">
            <blockquote>“Clean, fast, and the quizzes feel purposeful. Love the progress tracking.”</blockquote>
            <figcaption>— Early adopter, teacher</figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="cta-band">
        <div className="container cta-card">
          <h2>Ready to learn smarter?</h2>
          <p>Create a free account and start your first quiz in under five minutes.</p>
          <div className="hero-actions">
            <a href="/signup" className="btn btn-primary">Create free account</a>
            <a href="/login" className="btn btn-ghost">Log in</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}