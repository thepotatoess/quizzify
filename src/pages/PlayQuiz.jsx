import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../auth/AuthProvider'
import './PlayQuiz.css'

export default function PlayQuiz(){
  const { id } = useParams()
  const nav = useNavigate()
  const { user } = useAuth()
  const [quiz, setQuiz] = useState(null)
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [done, setDone] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(()=>{
    (async ()=>{
      const { data: q } = await supabase.from('quiz_content').select('*').eq('id', id).single()
      setQuiz(q)
      const { data: qs } = await supabase.from('quiz_questions').select('id, question_text, position, quiz_options(id, option_text, is_correct)').eq('quiz_id', id).order('position', { ascending: true })
      setQuestions(qs || [])
      setTimeLeft(q?.time_limit_per_question || 30)
    })()
  }, [id])

  // Timer per question
  useEffect(()=>{
    if(done || showAnswer) return
    if(timeLeft <= 0){ handleAnswer(null); return }
    const t = setTimeout(()=> setTimeLeft(v => v - 1),1000)
    return ()=>clearTimeout(t)
  }, [timeLeft, done, showAnswer, handleAnswer])

  const current = useMemo(()=> questions[idx], [questions, idx])

  const handleAnswer = useCallback((optionId) => {
    if(!current || showAnswer) return
    setSelected(optionId)
    const correctId = current.quiz_options.find(o=>o.is_correct)?.id
    if(optionId && optionId === correctId) setScore(s=>s+1)
    setShowAnswer(true)
  }, [current, showAnswer])

  const nextQuestion = () => {
    if(idx + 1 < questions.length){
      setIdx(i=>i+1)
      setSelected(null)
      setShowAnswer(false)
      setTimeLeft(quiz?.time_limit_per_question || 30)
    } else {
      setDone(true)
    }
  }

  useEffect(()=>{
    (async ()=>{
      if(done){
        if(user){
          await supabase.from('quiz_stats').insert([{ quiz_id: id, user_id: user.id, score }])
        }
      }
    })()
  }, [done, id, score, user])

  if(!quiz) return <p>Loading…</p>
  if(done) return (
    <section className="play-wrap">
      <div className="play-card">
        <h2>Finished!</h2>
        <p>Score: {score} / {questions.length}</p>
        <div className="actions">
          <button className="btn" onClick={()=>nav('/quizzes')}>Back to list</button>
        </div>
      </div>
    </section>
  )

  return (
    <section className="play-wrap">
      <div className="play-card">
        <header className="play-head">
          <h3>{quiz.title}</h3>
          <div className="pill">Time left: {timeLeft}s</div>
        </header>
        <div className="progress"><div className="progress-inner" style={{width: `${(idx/questions.length)*100}%`}}></div></div>
        <div className="q-body">
          <p className="q-text">Q{idx+1}. {current?.question_text}</p>
          <div className="opts">
            {current?.quiz_options?.map(opt => (
              <button key={opt.id}
                disabled={showAnswer}
                className={`opt ${selected===opt.id && !showAnswer ? 'selected' : ''} ${showAnswer && opt.is_correct ? 'correct' : ''} ${showAnswer && selected===opt.id && !opt.is_correct ? 'wrong' : ''}`}
                onClick={()=>handleAnswer(opt.id)}>
                {opt.option_text}
              </button>
            ))}
          </div>
        </div>
        <footer className="play-foot">
          <span>Score: {score}/{questions.length}</span>
          {showAnswer && (
            <button className="btn btn-primary" onClick={nextQuestion}>{idx + 1 === questions.length ? 'Finish' : 'Next'}</button>
          )}
        </footer>
      </div>
    </section>
  )
}
