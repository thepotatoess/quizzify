import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Modal from '../components/Modal.jsx'
import './SignUp.css'

function scorePassword(pw=''){/* helper from shared */let s=0;if(!pw)return 0;const L={};for(let i=0;i<pw.length;i++){L[pw[i]]=(L[pw[i]]||0)+1;s+=5.0/L[pw[i]]}const v={digits:/\d/.test(pw),lower:/[a-z]/.test(pw),upper:/[A-Z]/.test(pw),nonWords:/[^\da-zA-Z]/.test(pw)};let c=0;for(const k in v)c+=v[k]?1:0;s+=(c-1)*10;s+=Math.min(20,Math.max(0,(pw.length-8)*2));return Math.max(0,Math.min(100,Math.floor(s)))}
function StrengthBar({ value }){/* helper from shared */const t=value<30?'Weak':value<60?'Fair':value<80?'Good':'Strong';return(<div className="strength"><div className="strength-bar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} role="progressbar"><span style={{width:`${value}%`}}/></div><span className={`strength-label v-${t.toLowerCase()}`}>{t}</span></div>)}

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [openTips, setOpenTips] = useState(false)

  const strength = scorePassword(password)

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr(''); setMsg('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setErr(error.message)
    else setMsg('Check your email to confirm your account.')
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h2>Create account</h2>
        <p className="muted">Start your first quiz in minutes. No credit card required.</p>
        <form onSubmit={onSubmit} className="form">
          <label>
            <span>Email</span>
            <input type="email" placeholder="you@example.com" value={email}
                   onChange={(e)=>setEmail(e.target.value)} required autoComplete="email" />
          </label>

          <label>
            <span>Password <button type="button" className="link" onClick={()=>setOpenTips(true)}>Password tips</button></span>
            <div className="pw-field">
              <input type={showPw? 'text':'password'} placeholder="At least 8 characters" value={password}
                     onChange={(e)=>setPassword(e.target.value)} required autoComplete="new-password" />
              <button type="button" className="icon-btn" aria-label={showPw? 'Hide password':'Show password'} onClick={()=>setShowPw(v=>!v)}>
                {showPw? '🙈':'👁️'}
              </button>
            </div>
            <StrengthBar value={strength} />
          </label>

          {err && <p className="error">{err}</p>}
          {msg && <p className="success">{msg}</p>}

          <button className="btn btn-primary" type="submit" disabled={strength<40}>Sign up</button>
        </form>
        <p className="muted small">By signing up you agree to our Terms and Privacy Policy.</p>
      </div>

      <Modal open={openTips} onClose={()=>setOpenTips(false)} title="Create a strong password">
        <ul className="tips">
          <li>Use 12+ characters</li>
          <li>Mix UPPER/lower case, numbers, and symbols</li>
          <li>Avoid dictionary words and personal info</li>
          <li>Prefer a passphrase (e.g., 3–4 random words)</li>
          <li>Use a password manager</li>
        </ul>
      </Modal>
    </section>
  )
}