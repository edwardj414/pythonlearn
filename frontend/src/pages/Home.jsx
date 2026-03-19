// src/pages/Home.jsx
import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getTopics } from '../api'
import SnakeCursor from '../components/SnakeCursor'
import { Terminal, Database, Cpu, ArrowUpRight, Play, Layers, Code, Zap, Shield, GitBranch } from 'lucide-react'
import TopicIcon from '../components/TopicIcon'

const DIFF_BADGE = {
  beginner:     'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
  intermediate: 'border-amber-500/30 text-amber-400 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
  advanced:     'border-rose-500/30 text-rose-400 bg-rose-500/10 shadow-[0_0_10px_rgba(244,63,94,0.2)]',
}

const STATS = [
  { value: 16, suffix: '+', label: 'Core Modules' },
  { value: 60, suffix: '+', label: 'Quizzes' },
  { value: 100, suffix: '%', label: 'Browser-Based' },
  { value: 0, suffix: 'ms', label: 'Setup Time' },
]

// Intersection observer hook for scroll reveals
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

// Animated counter
function Counter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (target === 0) { setCount(0); return }
    let start = 0
    const step = Math.ceil(target / 40)
    const id = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(id) }
      else setCount(start)
    }, 30)
    return () => clearInterval(id)
  }, [inView, target])
  return <>{count}{suffix}</>
}

export default function Home() {
  const [topics, setTopics]             = useState([])
  const [loading, setLoading]           = useState(true)
  const [terminalText, setTerminalText] = useState('')

  const mouseRef     = useRef({ x: -999, y: -999 })
  const glowRef      = useRef(null)
  const innerGlowRef = useRef(null)
  const rafRef       = useRef(null)
  const location     = useLocation()

  const [statsRef, statsInView]     = useInView(0.2)
  const [bentoRef, bentoInView]     = useInView(0.1)
  const [topicsRef, topicsInView]   = useInView(0.1)

  // ── Smooth cursor glow (ref-based, 60fps) ──
  useEffect(() => {
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove, { passive: true })
    let cx = -999, cy = -999
    const tick = () => {
      cx += (mouseRef.current.x - cx) * 0.07
      cy += (mouseRef.current.y - cy) * 0.07
      if (glowRef.current) {
        glowRef.current.style.left = cx + 'px'
        glowRef.current.style.top  = cy + 'px'
      }
      if (innerGlowRef.current) {
        innerGlowRef.current.style.left = mouseRef.current.x + 'px'
        innerGlowRef.current.style.top  = mouseRef.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current) }
  }, [])

  // ── Typing effect ──
  useEffect(() => {
    const text = "import sys\nimport ai_models\n\ndef init_engine():\n    print('Booting Python 3.10 Runtime...')\n    print('Loading Neural Weights...')\n    return 'System Ready.'\n\ninit_engine()"
    let i = 0
    const id = setInterval(() => { setTerminalText(text.substring(0, i)); i++; if (i > text.length) clearInterval(id) }, 25)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (location.hash === '#topics') {
      const el = document.getElementById('topics')
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [location])

  useEffect(() => {
    getTopics().then(({ data }) => { setTopics(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="bg-[#050505] min-h-screen text-slate-300 font-sans selection:bg-emerald-500/30 relative overflow-hidden cursor-none">
      <SnakeCursor />

      {/* ── CURSOR GLOWS ── */}
      <div ref={glowRef} className="pointer-events-none fixed z-10"
        style={{ transform: 'translate(-50%,-50%)', willChange: 'left,top' }}>
        <div className="w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,9,0.07) 0%, rgba(16,185,9,0.02) 40%, transparent 70%)' }} />
      </div>
      <div ref={innerGlowRef} className="pointer-events-none fixed z-10"
        style={{ transform: 'translate(-50%,-50%)', willChange: 'left,top' }}>
        <div className="w-[160px] h-[160px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,9,0.14) 0%, transparent 70%)' }} />
      </div>

      {/* ── STATIC BACKGROUND ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] opacity-60 z-0" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/8 blur-[150px] rounded-full pointer-events-none z-0 animate-[breathe_6s_infinite_alternate]" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/3 blur-[0px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/3 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 4px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[90vh] pt-20 pb-">
          <div className="flex flex-col items-start text-left z-20">

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-xs font-mono text-emerald-400 mb-8 tracking-widest animate-in slide-in-from-top-4 fade-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              RUNTIME V2.0 ACTIVE
            </div>

            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[1.1] pb-4 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-150 fill-mode-both">
              Write Python.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 animate-[gradient_8s_ease_infinite] bg-[length:200%_auto] py-2">
                Deploy Reality.
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300 fill-mode-both">
              An interactive curriculum engineered specifically for serious developers. Master core syntax, build full-stack Django apps, and train AI models directly in your browser.
            </p>

            <div className="flex flex-wrap items-center gap-5 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both">
              <Link to="/topic/python-basics/variables-data-types"
                className="cursor-none group relative overflow-hidden bg-emerald-500 text-black px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center gap-2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]" />
                Initialize Course <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
              <Link to="/compiler"
                className="cursor-none group flex items-center gap-3 bg-[#0a0a0a] border border-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-900 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:scale-105">
                <Code size={18} className="text-slate-500 group-hover:text-emerald-400 transition-colors" /> Open IDE
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-12 pt-10 border-t border-slate-800/40 animate-in fade-in duration-1000 delay-700 fill-mode-both">
              {[
                { icon: <Zap size={13} className="text-amber-400" />, label: 'Zero Setup' },
                { icon: <Shield size={13} className="text-emerald-400" />, label: 'Sandboxed' },
                { icon: <GitBranch size={13} className="text-cyan-400" />, label: 'Open Source' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  {icon} {label}
                </div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div className="hidden lg:block relative animate-in slide-in-from-right-12 fade-in duration-1000 delay-700 fill-mode-both">
            <div className="animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-2xl opacity-50" />
              <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/50 bg-[#111]/80">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-xs font-mono text-slate-500">engine.py — Python 3.10</div>
                  <div className="w-10" />
                </div>
                <div className="p-6 font-mono text-sm leading-loose h-[320px] overflow-y-auto text-emerald-400/90 whitespace-pre-wrap scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
                  {terminalText}
                  <span className="w-2.5 h-5 bg-emerald-400 inline-block align-middle ml-1 animate-[blink_1s_infinite]" />
                  {terminalText.length > 130 && (
                    <div className="mt-4 pt-4 border-t border-slate-800/50 text-slate-300 animate-in fade-in duration-500">
                      <div className="flex items-center gap-2 text-cyan-400"><Play size={12} className="fill-cyan-400" /> Execution complete in 0.042s</div>
                      <div className="text-slate-500 mt-1">{'>>> System is waiting for user input...'}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            ANIMATED STATS BAR
        ══════════════════════════════════════ */}
        <div ref={statsRef} className="py-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {STATS.map(({ value, suffix, label }, i) => (
              <div key={label}
                className={`text-center transition-all duration-700 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-4xl font-black text-white mb-1 tabular-nums">
                  <Counter target={value} suffix={suffix} inView={statsInView} />
                </div>
                <div className="text-xs font-mono text-slate-600 tracking-widest uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            CURRICULUM DIRECTORY
        ══════════════════════════════════════ */}
        <div id="topics" ref={topicsRef} className="py-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

          <div className={`mb-16 text-center transition-all duration-700 ${topicsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-[10px] font-mono text-slate-500 tracking-widest mb-4">
              CURRICULUM / MODULES
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">The Directory</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">A highly structured, linear progression designed to compound your knowledge without the fluff.</p>
          </div>

          {loading ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-900/30 rounded-xl animate-pulse border border-slate-800/50" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-w-4xl mx-auto">
              {topics.map((topic, index) => (
                <Link key={topic.slug}
                  to={`/topic/${topic.slug}/${topic.lessons[0]?.slug || ''}`}
                  className={`
                    group flex flex-col md:flex-row md:items-center justify-between p-6
                    bg-[#0a0a0a]/50 backdrop-blur-sm border border-slate-800
                    hover:border-emerald-500/50 rounded-2xl overflow-hidden relative
                    hover:bg-[#0f0f0f] hover:-translate-y-0.5
                    hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.2)]
                    transition-all duration-300
                    ${topicsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                  `}
                  style={{ transitionDelay: `${index * 60}ms`, transitionProperty: 'opacity, transform, border-color, background-color, box-shadow' }}
                >
                  {/* Hover sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/[0.03] to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-emerald-500/0 group-hover:bg-emerald-500/60 transition-all duration-300 rounded-full" />

                  <div className="flex items-center gap-6 mb-4 md:mb-0 relative z-10">
                    <TopicIcon
                      slug={topic.slug}
                      size={17}
                      boxSize="w-9 h-9"
                      className="group-hover:scale-110 group-hover:shadow-[0_0_14px_rgba(16,185,129,0.2)] transition-all duration-300"
                    />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-mono text-slate-700 group-hover:text-emerald-500/70 transition-colors tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-bold text-lg text-slate-200 group-hover:text-white transition-colors tracking-tight">{topic.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600 max-w-xl line-clamp-1 group-hover:text-slate-400 transition-colors">{topic.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 relative z-10 shrink-0">
                    <div className="text-xs font-mono text-slate-600 flex items-center gap-1.5">
                      <Database size={11} /> {topic.lessons.length}
                    </div>
                    <div className="flex gap-1.5">
                      {[...new Set(topic.lessons.map(l => l.difficulty))].map(d => (
                        <span key={d} className={`text-[9px] px-2 py-0.5 rounded border font-mono uppercase tracking-wider ${DIFF_BADGE[d]}`}>{d[0]}</span>
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all duration-300">
                      <ArrowUpRight size={15} className="text-slate-500 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════
            BENTO ARCHITECTURE
        ══════════════════════════════════════ */}
        <div ref={bentoRef} className="py-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

          <div className={`mb-16 text-center transition-all duration-700 ${bentoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-[10px] font-mono text-slate-500 tracking-widest mb-4">
              SYSTEM / ARCHITECTURE
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">Platform Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">

            {/* Large card */}
            <div className={`
              group md:col-span-2 bg-[#0a0a0a] p-10 rounded-3xl border border-slate-800
              hover:border-emerald-500/30 transition-all duration-500 overflow-hidden relative
              hover:shadow-[0_20px_60px_-20px_rgba(16,185,129,0.15)]
              ${bentoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `} style={{ transitionDelay: '100ms' }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-colors duration-700" />
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-500">
                  <Terminal size={22} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Native In-Browser Runtime</h3>
                <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">Write, compile, and execute Python code entirely within your browser. Our sandboxed runtime ensures zero setup time.</p>

                <div className="w-full bg-[#050505] border border-slate-800 rounded-xl overflow-hidden group-hover:border-slate-700 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] transition-all duration-500">
                  <div className="relative top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="p-3 flex items-center gap-2 border-b border-slate-800">
                    <div className="w-2 h-2 rounded-full bg-rose-500/60" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  </div>
                  <div className="p-5 font-mono text-sm text-slate-400">
                    <div className="text-emerald-400 mb-2">➜  ~ python3 core_systems.py</div>
                    <div className="text-slate-500">Deploying environment logic...</div>
                    <div className="mt-1">Status: <span className="text-emerald-400 animate-pulse">Online</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side cards */}
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <Layers size={24} className="text-cyan-400" />,
                  iconBg: 'bg-cyan-500/10 border-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]',
                  border: 'hover:border-cyan-500/30',
                  title: 'Structured Theory',
                  desc: 'Linear progression designed to build compounding knowledge, avoiding tutorial hell entirely.',
                  delay: '200ms',
                },
                {
                  icon: <Cpu size={24} className="text-amber-400" />,
                  iconBg: 'bg-amber-500/10 border-amber-500/20 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]',
                  border: 'hover:border-amber-500/30',
                  title: 'AI / ML Ready',
                  desc: 'Built to give you the exact foundations needed to pivot into Data Models and Machine Learning.',
                  delay: '300ms',
                },
              ].map(({ icon, iconBg, border, title, desc, delay }) => (
                <div key={title}
                  className={`
                    group flex-1 bg-[#0a0a0a] p-8 rounded-3xl border border-slate-800
                    ${border} transition-all duration-500 hover:-translate-y-1 relative overflow-hidden
                    hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
                    ${bentoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  `}
                  style={{ transitionDelay: delay }}>
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 ${iconBg}`}>
                    {icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            FOOTER CTA
        ══════════════════════════════════════ */}
        <div className="py-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono text-emerald-500 tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              READY TO INITIALIZE
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-6 leading-tight">
              Start writing Python.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Ship something real.</span>
            </h2>
            <p className="text-slate-500 mb-10 text-lg">No account needed. No setup. Just open and code.</p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/topic/python-basics/variables-data-types"
                className="cursor-none group relative overflow-hidden bg-emerald-500 text-black px-10 py-4 rounded-xl font-black tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] flex items-center gap-2 text-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]" />
                Begin Module 01 <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes breathe {
          0%   { transform: scale(1) translateX(-50%);    opacity: 0.15; }
          100% { transform: scale(1.15) translateX(-43%); opacity: 0.45; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes gradient {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @keyframes shine {
          100% { transform: translateX(200%); }
        }
        .scrollbar-thin::-webkit-scrollbar              { width: 4px; }
        .scrollbar-track-transparent::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thumb-slate-700::-webkit-scrollbar-thumb  { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  )
}
