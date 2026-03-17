import { Link, useParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, ChevronLeft, Circle, CheckCircle, PanelLeftClose, Layers, ClipboardCheck } from 'lucide-react'
import TopicIcon from './TopicIcon'
import { useState } from 'react'

const DIFFICULTY_COLOR = {
  beginner: 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/20',
  intermediate: 'bg-amber-500/5 text-amber-400 border border-amber-500/20',
  advanced: 'bg-rose-500/5 text-rose-400 border border-rose-500/20',
}

export default function Sidebar({ topics }) {
  const { topicSlug, lessonSlug } = useParams()
  const isQuizPage = window.location.pathname.endsWith('/quiz')

  const [expanded, setExpanded] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggle = (slug, currentIsOpen) => setExpanded(prev => ({ ...prev, [slug]: !currentIsOpen }))

  return (
    <>
      {/* MOBILE OVERLAY: Appears when sidebar is open on high zoom/small screens */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          /* FIX: Changed to 'fixed' for mobile/zoom and 'sticky' for desktop */
          fixed lg:sticky top-[56px] left-0 z-40 shrink-0 transition-all duration-300 ease-in-out
          bg-[#050505]/95 backdrop-blur-xl border-r border-slate-800/60 h-[calc(100vh-56px)]
          
          /* FIX: Use transform for mobile/zoom hide logic to prevent 'vanishing' */
          ${sidebarOpen 
            ? 'translate-x-0 w-64' 
            : '-translate-x-full lg:translate-x-0 lg:w-0'
          }
        `}
      >
        {/* Scrollable inner */}
        <div className={`
          w-64 h-full flex flex-col overflow-y-auto sidebar-scroll
          transition-opacity duration-200
          ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none lg:pointer-events-auto'}
        `}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-6 pb-4 shrink-0 border-b border-slate-800/40 mb-3">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Layers size={12} className="text-slate-600" />
              System_Directory
            </p>
            <button
              onClick={() => setSidebarOpen(false)}
              className="cursor-none p-1.5 rounded-lg text-slate-600 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <PanelLeftClose size={14} />
            </button>
          </div>

          {/* Loading skeleton */}
          {!topics?.length
            ? <div className="px-4 space-y-3 mt-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-10 bg-slate-900/50 border border-slate-800/50 rounded-xl animate-pulse" />
                ))}
              </div>

            : <div className="px-3 pb-6">
                {topics.map((topic) => {
                  const isActive = topic.slug === topicSlug
                  const isOpen = expanded[topic.slug] !== undefined ? expanded[topic.slug] : isActive

                  return (
                    <div key={topic.slug} className="mb-1.5">
                      <button
                        onClick={() => toggle(topic.slug, isOpen)}
                        className={`cursor-none w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-bold transition-all group border
                          ${isActive
                            ? 'text-slate-200 bg-slate-900/60 border-slate-800'
                            : 'text-slate-500 border-transparent hover:bg-slate-900/30 hover:text-slate-300'
                          }`}
                      >
                        <TopicIcon
                          slug={topic.slug}
                          size={14}
                          boxSize="w-6 h-6"
                          className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}
                        />
                        <span className="flex-1 truncate tracking-tight">{topic.title}</span>
                        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
                          <ChevronDown size={14} className="opacity-40" />
                        </span>
                      </button>

                      <div className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isOpen ? 'max-h-[2000px] opacity-100 mt-1.5 mb-3' : 'max-h-0 opacity-0'}
                      `}>
                        <div className="ml-6 flex flex-col gap-0.5 border-l border-slate-800/60 pl-3 py-0.5">
                          {topic.lessons.map((lesson) => {
                            const isCurrent = lesson.slug === lessonSlug && topic.slug === topicSlug
                            const isThisQuiz = isCurrent && isQuizPage

                            return (
                              <div key={lesson.slug} className="flex flex-col gap-1.5 mb-2">
                                <Link
                                  to={`/topic/${topic.slug}/${lesson.slug}`}
                                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                  className={`cursor-none flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group/link border
                                    ${isCurrent && !isQuizPage
                                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                                      : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/60'
                                    }`}
                                >
                                  {isCurrent && !isQuizPage
                                    ? <CheckCircle size={14} className="shrink-0 text-emerald-500" />
                                    : <Circle size={14} className="shrink-0 opacity-30 group-hover/link:opacity-60" />
                                  }
                                  <span className="flex-1 truncate">{lesson.title}</span>
                                  {!(isCurrent && !isQuizPage) && (
                                    <span className={`w-5 h-5 flex items-center justify-center rounded border font-mono font-bold uppercase text-[10px] ${DIFFICULTY_COLOR[lesson.difficulty]}`}>
                                      {lesson.difficulty[0]}
                                    </span>
                                  )}
                                </Link>

                                {isCurrent && (
                                  <Link
                                    to={`/topic/${topic.slug}/${lesson.slug}/quiz`}
                                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                    className={`cursor-none flex items-center gap-3 pl-6 pr-3 py-2 rounded-xl text-[12px] font-medium transition-all group/quiz border ml-1
                                      ${isThisQuiz
                                        ? 'bg-amber-500/10 border-amber-500/25 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.1)]'
                                        : 'border-transparent text-slate-600 hover:text-amber-400 hover:bg-amber-500/5 hover:border-amber-500/15'
                                      }`}
                                  >
                                    <ClipboardCheck
                                      size={13}
                                      className={`shrink-0 ${isThisQuiz ? 'text-amber-400' : 'opacity-50 group-hover/quiz:opacity-100 group-hover/quiz:text-amber-400'}`}
                                    />
                                    <span className="font-mono tracking-widest text-[10px] uppercase">Quiz</span>
                                  </Link>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
          }
        </div>

        {/* Toggle tab - FIX: Forced visibility with high z-index and fixed position on small screens */}
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className={`
            cursor-none absolute top-6 -right-5 z-50
            flex items-center justify-center
            w-5 h-10 rounded-r-lg
            bg-[#0a0a0a] border border-l-0 border-slate-800
            hover:border-emerald-500/50 hover:text-emerald-400
            text-slate-500 shadow-lg transition-all duration-300
            ${!sidebarOpen ? 'translate-x-5 lg:translate-x-0' : ''}
          `}
        >
          {sidebarOpen ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
        </button>
      </aside>
    </>
  )
}
