import { createFileRoute } from '@tanstack/react-router'
import { Check, Loader2, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { env } from '@/env'

export const Route = createFileRoute('/')({ component: App })

type CheckStatus = 'idle' | 'loading' | 'available' | 'taken' | 'error'

async function checkUsername(username: string): Promise<boolean> {
  const response = await fetch(`${env.VITE_API_URL}/check/${encodeURIComponent(username)}`)
  if (!response.ok) {
    throw new Error('Failed to check username')
  }
  const data: { username: string; available: boolean } = await response.json()
  return data.available
}

function App() {
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState<CheckStatus>('idle')

  // Debounced username check
  useEffect(() => {
    if (!username.trim() || username.length < 3 || username.length > 16) {
      setStatus('idle')
      return
    }

    setStatus('loading')

    const controller = new AbortController()

    const timer = setTimeout(async () => {
      try {
        const isAvailable = await checkUsername(username)
        setStatus(isAvailable ? 'available' : 'taken')
      } catch {
        setStatus('error')
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [username])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/content-upper-3840.jpg"
        alt="Hytale Banner"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-transparent to-amber-500/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-16">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-2 md:mb-4 drop-shadow-2xl">
            <span className="text-white/90">HYTL.TOOLS</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/60 font-medium tracking-wide px-4">
            Check if a Hytale username is taken
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          <div className="relative group">
            {/* Glow effect - changes color based on status */}
            <div
              className={`absolute -inset-1 rounded-2xl opacity-50 group-hover:opacity-75 blur-lg transition-all duration-500 group-focus-within:opacity-100 ${
                status === 'available'
                  ? 'bg-emerald-500'
                  : status === 'taken' || status === 'error'
                    ? 'bg-red-500'
                    : 'bg-linear-to-r from-cyan-500 via-amber-500 to-cyan-500'
              }`}
            />

            {/* Input container */}
            <div
              className={`relative flex items-center bg-black/60 backdrop-blur-xl rounded-xl border overflow-hidden transition-colors duration-300 ${
                status === 'available'
                  ? 'border-emerald-500/50'
                  : status === 'taken' || status === 'error'
                    ? 'border-red-500/50'
                    : 'border-white/10'
              }`}
            >
              <Search className="absolute left-6 w-6 h-6 text-white/50" />
              <Input
                type="text"
                placeholder="Enter a username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-1p-ignore
                className="w-full h-16 md:h-20 pl-16 pr-16 text-xl md:text-2xl bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              {/* Status indicator */}
              <div className="absolute right-6 flex items-center justify-center">
                {status === 'loading' && (
                  <Loader2 className="w-6 h-6 text-white/70 animate-spin" />
                )}
                {status === 'available' && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                )}
                {status === 'taken' && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status text */}
          <p
            className={`text-center text-sm mt-4 transition-colors duration-300 ${
              status === 'available'
                ? 'text-emerald-400'
                : status === 'taken' || status === 'error'
                  ? 'text-red-400'
                  : 'text-white/40'
            }`}
          >
            {status === 'idle' && 'Start typing to check availability'}
            {status === 'loading' && 'Checking availability...'}
            {status === 'available' && `"${username}" is available!`}
            {status === 'taken' && `"${username}" is already taken`}
            {status === 'error' && 'Failed to check username'}
          </p>

          {/* Disclaimer */}
          <p className="text-center text-xs text-white/30 mt-6">
            may break at any time, due to hytale rate limits or api changes
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 z-10 text-center flex items-center justify-center gap-2">
        <a
          href="https://x.com/jackgamesftw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/40 hover:text-white/60 transition-colors"
        >
          made by @jackgamesftw
        </a>
        <span className="text-white/30">•</span>
        <a
          href="https://github.com/orgs/hytale-tools/repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/40 hover:text-white/60 transition-colors"
        >
          source code
        </a>
      </div>
    </div>
  )
}
