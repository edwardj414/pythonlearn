import { Link } from 'react-router-dom'
import { Terminal, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  return (
    // THEME: Deep graphite background with glassmorphism and slate borders
    <nav className="bg-[#050505]/90 backdrop-blur-xl border-b border-slate-800/60 sticky top-0 z-50">
      {/* Subtle emerald glowing top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo - Upgraded to Engineering Studio aesthetic */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-none group flex items-center gap-3 shrink-0"
        >
          {/* Brutalist icon container */}
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all duration-300">
            <Terminal size={18} className="text-emerald-400" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-white">
            Python<span className="text-emerald-500">Learn</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">

          {/* System Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-[10px] font-mono text-emerald-500 tracking-widest cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            SYSTEM_ONLINE
          </div>

          <Link
            to="/#topics"
            className="cursor-none text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Curriculum
          </Link>

          <a
            href="https://docs.python.org/3/tutorial/index.html"
            target="_blank"
            rel="noreferrer"
            className="cursor-none group flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            Official Docs
            <ArrowUpRight size={14} className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

      </div>
    </nav>
  )
}