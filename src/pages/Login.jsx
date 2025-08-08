import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal.jsx'


function StrengthBar({ value }){const t=value<30?'Weak':value<60?'Fair':value<80?'Good':'Strong';return(<div className="strength"><div className="strength-bar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} role="progressbar"><span style={{width:`${value}%`}}/></div><span className={`strength-label v-${t.toLowerCase()}`}>{t}</span></div>)}

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [err, setErr] = useState('')


  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setErr(error.message)
    else nav('/')
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h2>Log in</h2>
        <p className="muted">Welcome back! Pick up where you left off.</p>
        <form onSubmit={onSubmit} className="form">
          <label>
            <span>Email</span>
            <input type="email" placeholder="you@example.com" value={email}
                   onChange={(e)=>setEmail(e.target.value)} required autoComplete="email" />
          </label>

          <label>
            <span>Password</span>
            <div className="pw-field">
              <input type={showPw? 'text':'password'} placeholder="Your password" value={password}
                     onChange={(e)=>setPassword(e.target.value)} required autoComplete="current-password" />
              <button type="button" className="icon-btn" aria-label={showPw? 'Hide password':'Show password'} onClick={()=>setShowPw(v=>!v)}>
                {showPw? '🙈':'👁️'}
              </button>
            </div>
           
          </label>

          {err && <p className="error">{err}</p>}

          <button className="btn btn-primary" type="submit">Log in</button>
        </form>
      </div>

      
    </section>
  )
}