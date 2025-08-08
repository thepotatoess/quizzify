import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthCtx = createContext({ user: null, session: null, loading: true })

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadSessionAndUser() {
    // Get current session (may be stale for metadata)
    const { data: sessData } = await supabase.auth.getSession()
    setSession(sessData.session ?? null)

    // Get fresh user object from auth server (reflects new user_metadata)
    const { data: userData } = await supabase.auth.getUser()
    setUser(userData?.user ?? null)
    setLoading(false)
  }

  useEffect(() => {
    let ignore = false

    // Initial load
    loadSessionAndUser()

    // Subscribe to auth changes (SIGNED_IN, TOKEN_REFRESHED, SIGNED_OUT, etc.)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (ignore) return
      setSession(sess ?? null)
      // Whenever auth changes, re-fetch fresh user to get updated metadata
      supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null))
    })

    // Optional: refresh on tab focus (useful after changing metadata server-side)
    const onFocus = async () => {
      await supabase.auth.refreshSession()
      await loadSessionAndUser()
    }
    window.addEventListener('visibilitychange', () => {
      if (!document.hidden) onFocus()
    })

    return () => {
      ignore = true
      sub.subscription.unsubscribe()
      window.removeEventListener('visibilitychange', onFocus)
    }
  }, [])

  return (
    <AuthCtx.Provider value={{ user, session, loading }}>
      {children}
    </AuthCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthCtx)
