import './QuizCard.css'

export default function QuizCard({ quiz, onPlay }) {
  return (
    <article className="quiz-card">
      <header>
        <h3>{quiz.title}</h3>
        <span className={`badge b-${quiz.difficulty?.toLowerCase() || 'medium'}`}>{quiz.difficulty}</span>
      </header>
      <p className="muted small">{quiz.description || '—'}</p>
      <div className="meta">
        <span>{quiz.category_name}</span>
        <span>{quiz.type_name}</span>
        <span>{quiz.attempts} attempts</span>
        <span>Record: {quiz.best_score}</span>
      </div>
      <div className="actions">
        <button className="btn btn-primary" onClick={() => onPlay(quiz.id)}>Play</button>
      </div>
    </article>
  )
}