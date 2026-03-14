// src/pages/Home.jsx
import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getTopics } from '../api'
import SnakeCursor from '../components/SnakeCursor'
import { Terminal, Database, Cpu, ArrowUpRight, Play, CheckCircle2, Layers, Code } from 'lucide-react'

const DIFF_BADGE = {
  beginner: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
  intermediate: 'border-amber-500/30 text-amber-400 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
  advanced: 'border-rose-500/30 text-rose-400 bg-rose-500/10 shadow-[0_0_10px_rgba(244,63,94,0.2)]',
}

export default function Home() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [terminalText, setTerminalText] = useState('')
  const location = useLocation()

  // Dynamic Terminal Typing Effect
  useEffect(() => {
    const textToType = "import sys\nimport ai_models\n\ndef init_engine():\n    print('Booting Python 3.10 Runtime...')\n    print('Loading Neural Weights...')\n    return 'System Ready.'\n\ninit_engine()";
    let i = 0;
    const typingInterval = setInterval(() => {
      setTerminalText(textToType.substring(0, i));
      i++;
      if (i > textToType.length) clearInterval(typingInterval);
    }, 25);
    return () => clearInterval(typingInterval);
  }, []);

  // Smooth Scroll
  useEffect(() => {
    if (location.hash === '#topics') {
      const element = document.getElementById('topics');
      if (element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location]);

  useEffect(() => {
    getTopics().then(({ data }) => { setTopics(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="bg-[#050505] min-h-screen text-slate-300 font-sans selection:bg-emerald-500/30 relative overflow-hidden cursor-none">

      <SnakeCursor />

      {/* --- DYNAMIC BACKGROUND --- */}
      {/* Animated subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-30 z-0 animate-[pulse_4s_ease-in-out_infinite]"></div>

      {/* Breathing emerald core spotlight */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none z-0 animate-[breathe_6s_infinite_alternate]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* --- HERO SECTION --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[90vh] pt-20 pb-12">

          {/* LEFT: Copy & Actions */}
          <div className="flex flex-col items-start text-left z-20">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-xs font-mono text-emerald-400 mb-8 tracking-widest animate-in slide-in-from-top-4 fade-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              RUNTIME V2.0 ACTIVE
            </div>

            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[1.05] animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-150 fill-mode-both">
              Write Python.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 animate-[gradient_8s_ease_infinite] bg-[length:200%_auto]">
                Deploy Reality.
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300 fill-mode-both">
              An interactive curriculum engineered specifically for serious developers. Master core syntax, build full-stack Django apps, and train AI models directly in your browser.
            </p>

            <div className="flex flex-wrap items-center gap-5 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both">
              <Link
                to="/topic/python-basics/variables-data-types"
                className="cursor-none group relative overflow-hidden bg-emerald-500 text-black px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] flex items-center gap-2"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]"></div>
                Initialize Course <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>

              <Link
                to="/compiler"
                className="cursor-none group flex items-center gap-3 bg-[#0a0a0a] border border-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-900 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:scale-105"
              >
                <Code size={18} className="text-slate-500 group-hover:text-emerald-400 transition-colors" /> Open IDE
              </Link>
            </div>
          </div>

          {/* RIGHT: Live Animated Terminal */}
          <div className="hidden lg:block relative animate-in slide-in-from-right-12 fade-in duration-1000 delay-700 fill-mode-both">
            {/* Floating animation wrapper */}
            <div className="animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

                {/* Mac-style Window Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/50 bg-[#111]/80">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors"></div>
                  </div>
                  <div className="text-xs font-mono text-slate-500">engine.py — Python 3.10</div>
                  <div className="w-10"></div> {/* Spacer for centering */}
                </div>

                {/* Live Typing Body */}
                <div className="p-6 font-mono text-sm leading-loose h-[320px] overflow-hidden text-emerald-400/90 whitespace-pre-wrap">
                  {terminalText}
                  <span className="w-2.5 h-5 bg-emerald-400 inline-block align-middle ml-1 animate-[blink_1s_infinite]"></span>

                  {/* Fake output that appears after typing finishes */}
                  {terminalText.length > 130 && (
                    <div className="mt-4 pt-4 border-t border-slate-800/50 text-slate-300 animate-in fade-in duration-500">
                      <div className="flex items-center gap-2 text-cyan-400"><Play size={12} className="fill-cyan-400"/> Execution complete in 0.042s</div>
                      <div className="text-slate-500 mt-1">{'>>> System is waiting for user input...'}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- CURRICULUM DIRECTORY --- */}
        <div id="topics" className="py-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

          <div className="mb-16 text-center">
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
            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
              {topics.map((topic, index) => (
                <Link
                  key={topic.slug}
                  to={`/topic/${topic.slug}/${topic.lessons[0]?.slug || ''}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#0a0a0a]/50 backdrop-blur-sm border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition-all duration-500 hover:bg-[#111] hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)] overflow-hidden relative"
                >
                  {/* Subtle hover background sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>

                  <div className="flex items-center gap-6 mb-4 md:mb-0 relative z-10">
                    <div className="text-3xl text-slate-600 group-hover:text-emerald-400 transition-colors duration-500 w-12 text-center group-hover:scale-110">
                      {topic.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono text-emerald-500/50 group-hover:text-emerald-400 transition-colors">0{index + 1}</span>
                        <h3 className="font-bold text-xl text-slate-200 group-hover:text-white transition-colors tracking-tight">
                          {topic.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-500 max-w-xl line-clamp-1 group-hover:text-slate-400 transition-colors">{topic.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 relative z-10">
                    <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                      <Database size={12} /> {topic.lessons.length} Nodes
                    </div>
                    <div className="flex gap-2">
                      {[...new Set(topic.lessons.map(l => l.difficulty))].map(d => (
                        <span key={d} className={`text-[10px] px-2.5 py-1 rounded-md border font-mono uppercase tracking-wider ${DIFF_BADGE[d]}`}>
                          {d}
                        </span>
                      ))}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-500">
                      <ArrowUpRight size={18} className="text-slate-400 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* --- DYNAMIC BENTO ARCHITECTURE --- */}
        <div className="py-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

          <h2 className="text-4xl font-black text-white tracking-tight mb-16 text-center">Platform Architecture</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {/* Large Bento Box */}
            <div className="group md:col-span-2 bg-[#0a0a0a] p-10 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-colors duration-700"></div>

              <Terminal size={36} className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Native In-Browser Runtime</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">Write, compile, and execute Python code entirely within your browser environment. Our sandboxed runtime ensures zero setup time.</p>

              <div className="w-full bg-[#050505] border border-slate-800 rounded-xl overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-shadow duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"></div>
                <div className="p-4 flex items-center gap-3 border-b border-slate-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="p-5 font-mono text-sm text-slate-400">
                  <div className="text-emerald-400 mb-2">➜  ~ python3 core_systems.py</div>
                  <div>Deploying environment logic...</div>
                  <div>Status: <span className="text-emerald-400 animate-pulse">Online</span></div>
                </div>
              </div>
            </div>

            {/* Side Bento Stack */}
            <div className="flex flex-col gap-6">
              <div className="group flex-1 bg-[#0a0a0a] p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-1">
                <Layers size={32} className="text-cyan-400 mb-5 group-hover:rotate-12 transition-transform duration-500" />
                <h3 className="text-xl font-bold text-white mb-2">Structured Theory</h3>
                <p className="text-slate-500">Linear progression designed to build compounding knowledge, avoiding tutorial hell entirely.</p>
              </div>

              <div className="group flex-1 bg-[#0a0a0a] p-8 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1">
                <Cpu size={32} className="text-amber-400 mb-5 group-hover:rotate-12 transition-transform duration-500" />
                <h3 className="text-xl font-bold text-white mb-2">AI / ML Ready</h3>
                <p className="text-slate-500">Built to give you the exact foundations needed to pivot into Data Models and Machine Learning.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* --- CUSTOM CSS ANIMATIONS --- */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes breathe {
          0% { transform: scale(1) translateX(-50%); opacity: 0.3; }
          100% { transform: scale(1.1) translateX(-45%); opacity: 0.5; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}