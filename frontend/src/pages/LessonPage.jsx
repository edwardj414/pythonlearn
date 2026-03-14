// src/pages/LessonPage.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTopics, getLesson } from '../api'
import SnakeCursor from '../components/SnakeCursor'
import Sidebar from '../components/Sidebar'
import LessonContent from '../components/LessonContent'
import CodeEditor from '../components/CodeEditor'
import {
  ChevronLeft, ChevronRight, Clock, Terminal,
  BookOpen, ClipboardCheck, ArrowUpRight, Loader2, Home
} from 'lucide-react'

const DIFF_BADGE = {
  beginner:     'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
  intermediate: 'border-amber-500/30  text-amber-400  bg-amber-500/5',
  advanced:     'border-rose-500/30   text-rose-400   bg-rose-500/5',
}

export default function LessonPage() {
  const { topicSlug, lessonSlug } = useParams()

  const [topics, setTopics]   = useState([])
  const [lesson, setLesson]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab]         = useState('lesson')

  useEffect(() => {
    setLoading(true)
    setTab('lesson')
    Promise.all([getTopics(), getLesson(topicSlug, lessonSlug)])
      .then(([{ data: topicsData }, { data: lessonData }]) => {
        setTopics(topicsData)
        setLesson(lessonData)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [topicSlug, lessonSlug])

  const allLessons = topics.flatMap(t =>
    t.lessons.map(l => ({ ...l, topicSlug: t.slug, topicTitle: t.title }))
  )
  const currentIdx = allLessons.findIndex(
    l => l.slug === lessonSlug && l.topicSlug === topicSlug
  )
  const prev = currentIdx > 0 ? allLessons[currentIdx - 1] : null
  const next = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null

  const TABS = [
    { id: 'lesson', label: 'THEORY',    icon: <BookOpen size={14} /> },
    { id: 'code',   label: 'WORKSPACE', icon: <Terminal size={14} /> },
  ]

  return (
    <div className="bg-[#050505] h-[calc(100vh-56px)] text-slate-300 font-sans selection:bg-emerald-500/30 relative overflow-hidden cursor-none">
      <SnakeCursor />
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-40 z-0 pointer-events-none" />

      <header className="relative z-40 h-14 border-b border-slate-800/60 bg-[#080808]/90 backdrop-blur-xl flex items-center px-4 justify-between">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden sm:flex">
          <Link to="/" className="cursor-none hover:text-emerald-400 transition-colors flex items-center gap-1"><Home size={12} /> Root</Link>
          <ChevronRight size={10} className="text-slate-800" />
          <Link to={`/topic/${topicSlug}`} className="cursor-none hover:text-emerald-400 transition-colors truncate max-w-[120px]">{topicSlug.replace(/-/g, '_')}</Link>
          <ChevronRight size={10} className="text-slate-800" />
          <span className="text-slate-300 truncate max-w-[150px]">{lesson?.title || 'Loading...'}</span>
        </div>

        {lesson && (
          <div className="flex bg-black border border-slate-800 rounded-lg p-1 mx-auto sm:mx-0">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`cursor-none flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black transition-all ${
                  tab === t.id
                    ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900'
                }`}>
                {t.icon}<span className="hidden sm:block">{t.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="w-[150px] flex justify-end">
          {lesson && (
            <div className={`text-[10px] font-mono px-2 py-1 rounded border uppercase tracking-widest ${DIFF_BADGE[lesson.difficulty]}`}>
              {lesson.difficulty}
            </div>
          )}
        </div>
      </header>

      <div className="relative z-10 flex h-[calc(100vh-112px)]">
        <div className="hidden lg:block border-r border-slate-800/60 bg-[#050505]/80 backdrop-blur-md">
          <Sidebar topics={topics} />
        </div>

        <main className="flex-1 overflow-y-auto bg-transparent scroll-smooth">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-600 font-mono">
              <Loader2 size={32} className="animate-spin text-emerald-500 mb-4" />
              <span className="text-xs tracking-[0.3em]">SYNCHRONIZING_NODES...</span>
            </div>
          ) : !lesson ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-600 font-mono">
              <span className="text-rose-500 mb-2">Error 404:</span> Lesson_Object_Not_Found
            </div>
          ) : (
            <>
              {/* ── THEORY TAB ── */}
              {tab === 'lesson' && (
                <div className="max-w-3xl mx-auto px-8 py-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-24">
                  <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-slate-800 bg-slate-900/50 text-[10px] font-mono text-emerald-500 tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        MODULE_ACTIVE
                      </div>
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-2">
                        <Clock size={14} className="text-slate-600" /> EST_TIME: 5 MIN
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight border-b border-slate-800 pb-6">
                      {lesson.title}
                    </h1>
                  </div>

                  <div className="prose prose-invert prose-emerald max-w-none text-slate-400 leading-relaxed text-lg">
                    <LessonContent content={lesson.content} />
                  </div>

                  {/* ── TAKE QUIZ BANNER ── */}
                  <div className="mt-16 mb-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 flex items-center justify-between gap-6">
                    <div>
                      <div className="text-[10px] font-mono text-emerald-500/70 tracking-widest mb-1">KNOWLEDGE_CHECK</div>
                      <h3 className="text-lg font-black text-white tracking-tight">Ready to test your knowledge?</h3>
                      <p className="text-sm text-slate-500 mt-1">Take the quiz for this module and earn XP.</p>
                    </div>
                    <Link
                      to={`/topic/${topicSlug}/${lessonSlug}/quiz`}
                      className="cursor-none flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-black text-sm tracking-wider hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all"
                    >
                      <ClipboardCheck size={16} /> TAKE_QUIZ
                    </Link>
                  </div>

                  {/* ── NAVIGATION ── */}
                  <div className="flex items-center justify-between mt-8 pt-10 border-t border-slate-800/50">
                    {prev ? (
                      <Link to={`/topic/${prev.topicSlug}/${prev.slug}`}
                        className="cursor-none group flex items-center gap-4 text-slate-500 hover:text-white transition-all">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-all">
                          <ChevronLeft size={20} />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-600">Prev_Module</div>
                          <div className="font-bold tracking-tight">{prev.title}</div>
                        </div>
                      </Link>
                    ) : <div />}

                    {next ? (
                      <Link to={`/topic/${next.topicSlug}/${next.slug}`}
                        className="cursor-none group flex flex-row-reverse items-center gap-4 text-slate-500 hover:text-white transition-all text-right">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-black transition-all">
                          <ChevronRight size={20} />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-600">Next_Module</div>
                          <div className="font-bold tracking-tight">{next.title}</div>
                        </div>
                      </Link>
                    ) : (
                      <Link to="/" className="cursor-none group flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-400 transition-all">
                        Terminating Session <ArrowUpRight size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* ── WORKSPACE TAB ── */}
              {tab === 'code' && (
                <div className="h-full p-6 animate-in fade-in duration-500">
                  <div className="w-full h-full relative group">
                    <div className="absolute -inset-1 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative h-full bg-[#0d0d0d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-[#111]">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5 mr-4">
                            <div className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors" />
                          </div>
                          <h2 className="text-xs font-mono font-bold text-slate-200 tracking-wider">WORKSPACE_LAB</h2>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">main.py</div>
                      </div>
                      <div className="flex-1 p-6 bg-[#0a0a0a]">
                        <CodeEditor defaultCode={lesson.code_example || '# Write your code here...'} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}