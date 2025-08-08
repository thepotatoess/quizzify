import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../auth/AuthProvider'

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
    if(done) return
    const t = setInterval(()=>{
      setTimeLeft(v=>{
        if(v<=1){ handleAnswer(null); return quiz?.time_limit_per_question || 30 }
        return v-1
      })
    },1000)
    return ()=>clearInterval(t)
  }, [idx, done, quiz])

  const current = useMemo(()=> questions[idx], [questions, idx])

  const handleAnswer = (optionId) => {
    if(!current) return
    const isCorrect = current.quiz_options.find(o=>o.id===optionId)?.is_correct
    if(isCorrect) setScore(s=>s+1)

    if(idx + 1 < questions.length){
      setIdx(i=>i+1)
      setSelected(null)
      setTimeLeft(quiz?.time_limit_per_question || 30)
    } else {
      setDone(true)
    }
  }

  useEffect(()=>{
    (async ()=>{
      if(done){
        // Persist results
        if(user){
          await supabase.from('quiz_stats').insert([{ quiz_id: id, user_id: user.id, score }])
        }
      }
    })()
  }, [done])

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
        <div className="q-body">
          <p className="q-text">Q{idx+1}. {current?.question_text}</p>
          <div className="opts">
            {current?.quiz_options?.map(opt => (
              <button key={opt.id}
                className={`opt ${selected===opt.id ? 'selected' : ''}`}
                onClick={()=>{setSelected(opt.id); handleAnswer(opt.id)}}>
                {opt.option_text}
              </button>
            ))}
          </div>
        </div>
        <footer className="play-foot">
          <span>Score: {score}/{questions.length}</span>
        </footer>
      </div>
    </section>
  )
}