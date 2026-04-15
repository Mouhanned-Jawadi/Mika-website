import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaLock } from 'react-icons/fa'

export const AdminLogin = ({ onLogin, logo }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const ADMIN_EMAIL = 'mika@admin.com'
  const ADMIN_PASSWORD = 'mika123'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      toast.success('🎉 Welcome back, Admin! 👑')
      onLogin()
      setEmail('')
      setPassword('')
    } else {
      toast.error('❌ Invalid credentials')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-ivory via-brand-blush to-brand-ivory px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-brand-gold/30 bg-white p-8 shadow-soft">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="text-5xl">
              <FaLock className="text-brand-berry" />
            </div>
          </div>

          <h1 className="font-display text-3xl text-center text-brand-ink mb-2">Admin Panel</h1>
          <p className="text-center text-brand-muted text-sm mb-8">QueensBags Management</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="label-block">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="mika@admin.com"
                disabled={isLoading}
              />
            </label>

            <label className="label-block">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary !justify-center w-full mt-6"
            >
              {isLoading ? 'Logging in...' : 'Login to Admin Panel'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-brand-gold/20">
            <p className="text-xs text-brand-muted text-center">
              Default credentials for demo: mika@admin.com / mika123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
