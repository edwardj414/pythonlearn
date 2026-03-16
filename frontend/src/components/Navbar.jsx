import { Link, useLocation } from 'react-router-dom'
import { Terminal, ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [visible, setVisible]     = useState(true)
  const [lastY, setLastY]         = useState(0)
  const [mounted, setMounted]     = useState(false)

  // Fade in on mount
  useEffect(() => {
    setTimeout(() => setMounted(true), 50)
  }, [])

  // Hide on scroll down, reveal on scroll up, glass on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setVisible(y < lastY || y < 60)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .nav-mount   { animation: navSlideDown 0.6s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <nav
        className={`
          sticky top-0 z-50 backdrop-blur-xl border-b
          transition-all duration-500 ease-in-out
          ${mounted ? 'opacity-100' : 'opacity-0'}
          ${visible ? 'translate-y-0' : '-translate-y-full'}
          ${scrolled
            ? 'bg-[#060d09]/98 border-emerald-900/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-[#060d09]/95 border-emerald-900/30'
          }
        `}
      >
        {/* Animated shimmer top border */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent overflow-hidden">
          <div className="nav-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
        </div>

        {/* Subtle bottom glow when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        )}

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── LOGO ── */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-none group flex items-center gap-3 shrink-0"
          >
            {/* Icon with glow + spin on hover */}
            <div className="relative w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center
              group-hover:bg-emerald-500/20 group-hover:scale-110 group-hover:border-emerald-400/60
              group-hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]
              transition-all duration-300">
              <Terminal size={16} className="text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              {/* Ripple on hover */}
              <span className="absolute inset-0 rounded-lg border border-emerald-400/0 group-hover:border-emerald-400/40 group-hover:scale-150 group-hover:opacity-0 transition-all duration-500" />
            </div>

            {/* Wordmark */}
            <span className="font-bold text-xl tracking-tighter text-white overflow-hidden">
              <span className="inline-block group-hover:-translate-y-px transition-transform duration-200">Python</span>
              <span className="text-emerald-500 group-hover:text-emerald-400 transition-colors duration-200 inline-block group-hover:translate-y-px">Learn</span>
            </span>
          </Link>

          {/* ── RIGHT SIDE ── */}
          <div className="hidden md:flex items-center gap-6">

            {/* System status pill — glows more when scrolled */}
            <div className={`
              flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-[10px] tracking-widest
              cursor-default select-none transition-all duration-500
              ${scrolled
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.2)]'
                : 'border-slate-800 bg-slate-900/50 text-emerald-500'
              }
            `}>
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
              </span>
              SYSTEM_ONLINE
            </div>

            {/* Curriculum */}
            <Link
              to="/#topics"
              className="cursor-none relative text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200 group py-1"
            >
              Curriculum
              {/* Underline slide-in */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-emerald-500 group-hover:w-full transition-all duration-300 ease-out" />
            </Link>

            {/* Official Docs */}
            <a
              href="https://docs.python.org/3/tutorial/index.html"
              target="_blank"
              rel="noreferrer"
              className="cursor-none group flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors duration-200 relative py-1"
            >
              Official Docs
              <ArrowUpRight
                size={14}
                className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              />
              {/* Underline */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-emerald-500/60 group-hover:w-full transition-all duration-300 ease-out" />
            </a>

          </div>
        </div>
      </nav>
    </>
  )
}