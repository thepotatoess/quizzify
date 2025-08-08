import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'

const DIFFS = ['Easy','Medium','Hard']

export default function CreateQuiz() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [timeLimit, setTimeLimit] = useState(30)
  const [typeId, setTypeId] = useState('')
  const [types, setTypes] = useState([])
  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([{ text: '', options: [{ text: '', correct: false },{ text:'', correct:false }] }])
  const [message, setMessage] = useState('')

  useEffect(() => {
    (async () => {
      const { data: typeData } = await supabase.from('quiz_types').select('*')
      setTypes(typeData || [])
      const { data: categoryData } = await supabase.from('quiz_categories').select('*')
      setCategories(categoryData || [])
    })()
  }, [])

  if (!user) return <p>You must be logged in to create quizzes.</p>

  const addQuestion = () => setQuestions([...questions, { text: '', options: [{ text: '', correct: false },{ text:'', correct:false }] }])
  const addOption = (qIndex) => {
    const updated = [...questions]
    updated[qIndex].options.push({ text: '', correct: false })
    setQuestions(updated)
  }
  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions]
    updated[qIndex].options.splice(oIndex,1)
    setQuestions(updated)
  }
  const updateQuestion = (qIndex, value) => {
    const updated = [...questions]
    updated[qIndex].text = value
    setQuestions(updated)
  }
  const updateOption = (qIndex, oIndex, field, value) => {
    const updated = [...questions]
    updated[qIndex].options[oIndex][field] = value
    setQuestions(updated)
  }

  const saveQuiz = async (e) => {
    e.preventDefault()
    setMessage('')

    const { data: quiz, error: quizError } = await supabase
      .from('quiz_content')
      .update([{ title, description, category_id: categoryId, difficulty, time_limit_per_question: timeLimit, type_id: typeId, creator_id: user.id }])
      .select()
      .single()

    if (quizError) return setMessage(quizError.message)

    for (const [qIndex, q] of questions.entries()) {
      const { data: question, error: qErr } = await supabase
        .from('quiz_questions')
        .update([{ quiz_id: quiz.id, question_text: q.text, position: qIndex + 1 }])
        .select()
        .single()
      if (qErr) return setMessage(qErr.message)

      for (const opt of q.options) {
        const { error: oErr } = await supabase.from('quiz_options').update([{
          question_id: question.id,
          option_text: opt.text,
          is_correct: opt.correct
        }])
        if (oErr) return setMessage(oErr.message)
      }
    }

    navigate(`/quiz/${quiz.id}`)
  }

  return (
    <section className="create-quiz">
      <div className="quiz-form">
        <h2>Create New Quiz</h2>
        <p className="muted">Multiple choice • Time per question • Difficulty</p>
        {message && <p className="error">{message}</p>}
        <form onSubmit={saveQuiz} className="form">
          <label>Title<input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required /></label>
          <label>Description<textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /></label>
          <div className="row-2">
            <label>Category<select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select></label>
            <label>Difficulty<select value={difficulty} onChange={e => setDifficulty(e.target.value)}>{DIFFS.map(d=> <option key={d}>{d}</option>)}</select></label>
          </div>
          <div className="row-2">
            <label>Time/Question (sec)<input type="number" min={5} max={300} value={timeLimit} onChange={e => setTimeLimit(parseInt(e.target.value||'0'))} /></label>
            <label>Type<select value={typeId} onChange={e => setTypeId(e.target.value)} required>
              <option value="">Select Quiz Type</option>
              {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select></label>
          </div>

          <h3>Questions</h3>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="question-block card">
              <label>Question {qIndex + 1}<input placeholder="Question text" value={q.text} onChange={e => updateQuestion(qIndex, e.target.value)} required /></label>
              <div className="options">
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="option-row">
                    <input placeholder={`Option ${oIndex + 1}`} value={opt.text} onChange={e => updateOption(qIndex, oIndex, 'text', e.target.value)} required />
                    <label className="chk">
                      <input type="checkbox" checked={opt.correct} onChange={e => updateOption(qIndex, oIndex, 'correct', e.target.checked)} /> Correct
                    </label>
                    <button type="button" className="icon-btn" onClick={() => removeOption(qIndex,oIndex)}>✕</button>
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-ghost" onClick={() => addOption(qIndex)}>+ Add Option</button>
            </div>
          ))}

          <div className="actions">
            <button type="button" className="btn" onClick={addQuestion}>+ Add Question</button>
            <button type="submit" className="btn btn-primary">Save Quiz</button>
          </div>
        </form>
      </div>
    </section>
  )
}