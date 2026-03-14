// src/pages/TopicPage.jsx
import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { getTopics } from '../api' // Fix: using named import
import SnakeCursor from '../components/SnakeCursor'
import Sidebar from '../components/Sidebar'
import { BookOpen, ArrowRight, Sparkles, Home, Cpu, Terminal } from 'lucide-react'

export default function TopicPage() {
  const { topicSlug } = useParams()
  const [topics, setTopics] = useState([])
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(50)

  useEffect(() => {
    setLoading(true)
    getTopics().then(({ data }) => {
      setTopics(data)
      const t = data.find(t => t.slug === topicSlug)
      setTopic(t)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [topicSlug])

  useEffect(() => {
    if (!loading && (!topic?.lessons || topic.lessons.length === 0)) {
      if (timeLeft <= 0) return;
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [loading, topic, timeLeft])

  if (topic?.lessons?.length > 0) {
    return <Navigate to={`/topic/${topicSlug}/${topic.lessons[0].slug}`} replace />
  }

  return (
    <div className="bg-[#050505] h-[calc(100vh-56px)] text-slate-300 font-sans selection:bg-emerald-500/30 relative overflow-hidden cursor-none">

      <SnakeCursor />

      {/* --- BACKGROUND: Engineering Dot Grid --- */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-40 z-0"></div>

      <div className="relative z-10 flex h-full">
        <Sidebar topics={topics} />

        <main className="flex-1 flex flex-col items-center justify-center bg-transparent relative z-20">
          {loading ? (
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-2 border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-t-emerald-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-slate-500 font-mono text-[10px] animate-pulse tracking-[0.4em] uppercase">
                Synchronizing_Nodes...
              </p>
            </div>
          ) : (
            /* Redesigned Empty State: "The Engineering Void" */
            <div className="flex flex-col items-center text-center max-w-lg p-12 bg-[#0d0d0d] border border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden group">
              {/* Subtle accent glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full"></div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 mb-8 group-hover:border-emerald-500/30 transition-colors duration-500">
                {timeLeft > 0 ? (
                  <Cpu size={32} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                ) : (
                  <Sparkles size={32} className="text-emerald-400 animate-pulse" />
                )}
              </div>

              {timeLeft > 0 ? (
                <>
                  <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">
                    DEPLOYMENT_IN: <span className="text-emerald-500">{timeLeft}S</span>
                  </h2>
                  <p className="text-slate-500 mb-10 leading-relaxed font-medium">
                    Content for <span className="text-slate-300 italic">"{topic?.title || 'Unknown'}"</span> is currently being compiled into the curriculum.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">
                    TIMEOUT_REACHED
                  </h2>
                  <p className="text-slate-500 mb-10 leading-relaxed font-medium">
                    Writing top-tier engineering documentation takes time. We are currently finalizing the modules for <span className="text-emerald-500">{topic?.title}</span>.
                  </p>
                </>
              )}

              <Link
                to="/"
                className="cursor-none group flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-400 transition-all duration-300"
              >
                <Terminal size={18} /> Return to Root <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}