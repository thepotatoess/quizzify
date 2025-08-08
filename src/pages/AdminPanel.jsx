import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import './AdminPanel.css'

export default function AdminPanel(){
  const { user } = useAuth()
  const nav = useNavigate()
  const [quizzes, setQuizzes] = useState([])

  useEffect(()=>{
    if(!user?.user_metadata?.is_admin) return
    ;(async()=>{
      const { data } = await supabase.from('quiz_catalog').select('*')
      setQuizzes(data || [])
    })()
  },[user])

  if(!user?.user_metadata?.is_admin) return <p>Access denied</p>

  const deleteQuiz = async (id) => {
    if(!window.confirm('Delete this quiz?')) return
    await supabase.from('quiz_content').delete().eq('id', id)
    setQuizzes(q=>q.filter(x=>x.id!==id))
  }

  return (
    <section className="admin-panel">
      <div className="container">
        <h2>Admin Panel</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th><th>Category</th><th>Difficulty</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map(q=>(
              <tr key={q.id}>
                <td>{q.title}</td>
                <td>{q.category_name}</td>
                <td>{q.difficulty}</td>
                <td>
                  <button className="btn btn-ghost" onClick={()=>nav(`/edit-quiz/${q.id}`)}>Edit</button>
                  <button className="btn btn-ghost" onClick={()=>deleteQuiz(q.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}