import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider.jsx'
import { supabase } from '../lib/supabaseClient'
import './Navbar.css'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <header className="navbar frosted" role="banner">
      <div className="logo">Quizzify</div>
      <nav aria-label="Main menu" className="nav">
        <a href="#learning-paths">Learning Paths</a>
        <a href="#quizzes">Quizzes</a>
        <a href="/quizzes">All Quizzes</a>
        <a href="/create-quiz">Create Quiz</a>
        {!user ? (
          <>
            <Link className="btn btn-outline" to="/login">Log in</Link>
            <Link className="btn btn-primary" to="/signup">Sign up</Link>
            
          </>
        ) : (
          <button className="btn btn-ghost" onClick={() => supabase.auth.signOut()}>
            Log out
          </button>
        )}
      </nav>
    </header>
  )
}