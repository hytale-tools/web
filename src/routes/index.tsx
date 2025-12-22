import { createFileRoute, Link } from '@tanstack/react-router';
import { Check, Loader2, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Advertisement from '@/components/Advertisement';
import { Input } from '@/components/ui/input';
import { env } from '@/env';

export const Route = createFileRoute('/')({
  component: App
});

type CheckStatus = 'idle' | 'loading' | 'available' | 'taken' | 'error' | 'invalid' | 'rate_limited';

const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/

type CheckUsernameResponse = 
  | {
      username: string;
      available: boolean;
      cached: boolean;
    }
  | {
      error: 'hytale_api_error' | 'rate_limited';
      retryAfter: number;
    };

async function checkUsername(username: string, maxRetries = 3): Promise<CheckUsernameResponse> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${env.VITE_API_URL}/check/${username.toLowerCase()}`);

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') ?? '0';

        return {
          error: 'rate_limited',
          retryAfter: parseInt(retryAfter, 10),
        };
      }

      if (response.status !== 200) {
        throw new Error('Failed to check username');
      }

      return await response.json() as CheckUsernameResponse;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 500 * 2 ** (attempt - 1)));
      }
    }
  }

  throw lastError ?? new Error('Failed to check username after retries');
}

function App() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<CheckStatus>('idle');
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  useEffect(() => {
    if (!username.trim() || username.length < 3) {
      setStatus('idle');
      return;
    }

    if (username.length > 16 || !USERNAME_REGEX.test(username)) {
      setStatus('invalid')
      return
    }

    setStatus('loading');

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const response = await checkUsername(username);
        if ('error' in response) {
          if (response.error === 'rate_limited') {
            setStatus('rate_limited');
            setRetryAfter(response.retryAfter);
          } else {
            setStatus('error');
            setRetryAfter(null);
          }
          return;
        }

        setStatus(response.available ? 'available' : 'taken');
      } catch {
        console.error('Failed to check username');
        setStatus('error');
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      controller.abort();
    }
  }, [username])

  // Countdown timer for retry after
  useEffect(() => {
    if (retryAfter === null || retryAfter <= 0) return;

    const interval = setInterval(() => {
      setRetryAfter(prev => {
        if (prev === null || prev <= 1) {
          setStatus('idle');
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [retryAfter])

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
                  : status === 'taken' || status === 'error' || status === 'invalid' || status === 'rate_limited'
                    ? 'bg-red-500'
                    : 'bg-linear-to-r from-cyan-500 via-amber-500 to-cyan-500'
              }`}
            />

            {/* Input container */}
            <div
              className={`relative flex items-center bg-black/60 backdrop-blur-xl rounded-xl border overflow-hidden transition-colors duration-300 ${
                status === 'available'
                  ? 'border-emerald-500/50'
                  : status === 'taken' || status === 'error' || status === 'invalid' || status === 'rate_limited'
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
                {['taken', 'invalid', 'rate_limited'].includes(status) ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Status text */}
          <p
            className={`text-center text-sm mt-4 transition-colors duration-300 ${
              status === 'available'
                ? 'text-emerald-400'
                : status === 'taken' || status === 'error' || status === 'invalid' || status === 'rate_limited'
                  ? 'text-red-400'
                  : 'text-white/40'
            }`}
          >
            {status === 'idle' && 'Start typing to check availability'}
            {status === 'loading' && 'Checking availability...'}
            {status === 'available' && `"${username}" is available!`}
            {status === 'taken' && `"${username}" is already taken`}
            {status === 'error' && 'Failed to check username - please try again'}
            {status === 'invalid' && 'Invalid username - must be 3-16 characters, letters, numbers, and underscores only'}
            {status === 'rate_limited' && retryAfter !== null && `Rate limit exceeded - try again in ${retryAfter} second${retryAfter !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 z-10 text-center flex flex-col items-center gap-1">
        <p className="text-xs text-white/30">Unofficial tool, not affiliated with Hytale</p>
        <div className="flex items-center gap-2">
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
          <span className="text-white/30">•</span>
          <Link
            to="/terms"
            className="text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            terms of service
          </Link>
        </div>
      </div>

      <Advertisement />
    </div>
  )
}
