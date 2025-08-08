import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import QuizCard from '../components/QuizCard.jsx'

export default function BrowseQuizzes() {
  const nav = useNavigate()
  const [list, setList] = useState([])
  const [cats, setCats] = useState([])
  const [filters, setFilters] = useState({ category: 'All', difficulty: 'All', q: '' })

  useEffect(() => {
    (async () => {
      const { data: catalog } = await supabase.from('quiz_catalog').select('*')
      setList(catalog || [])
      const { data: categories } = await supabase.from('quiz_categories').select('*')
      setCats(categories || [])
    })()
  }, [])

  const filtered = useMemo(() => list.filter(q => {
    const byCat = filters.category === 'All' || q.category_name === filters.category
    const byDiff = filters.difficulty === 'All' || q.difficulty === filters.difficulty
    const byQ = !filters.q || (q.title + ' ' + (q.description||'')).toLowerCase().includes(filters.q.toLowerCase())
    return byCat && byDiff && byQ
  }), [list, filters])

  return (
    <section className="browse">
      <div className="container">
        <header className="section-head">
          <h2>Browse Quizzes</h2>
          <div className="filters">
            <input placeholder="Search" value={filters.q} onChange={e=>setFilters({...filters,q:e.target.value})} />
            <select value={filters.category} onChange={e=>setFilters({...filters,category:e.target.value})}>
              <option>All</option>
              {cats.map(c => <option key={c.id}>{c.name}</option>)}
            </select>
            <select value={filters.difficulty} onChange={e=>setFilters({...filters,difficulty:e.target.value})}>
              {['All','Easy','Medium','Hard'].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </header>
        <div className="grid quiz-grid">
          {filtered.map(item => (
            <QuizCard key={item.id} quiz={item} onPlay={(id)=>nav(`/quiz/${id}`)} />
          ))}
        </div>
      </div>
    </section>
  )
}