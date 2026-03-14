import { Link, useParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, ChevronLeft, Circle, CheckCircle, PanelLeftClose, Layers } from 'lucide-react'
import { useState } from 'react'

// Engineering Studio Difficulty Badges
const DIFFICULTY_COLOR = {
  beginner: 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/20',
  intermediate: 'bg-amber-500/5 text-amber-400 border border-amber-500/20',
  advanced: 'bg-rose-500/5 text-rose-400 border border-rose-500/20',
}

export default function Sidebar({ topics }) {
  const { topicSlug, lessonSlug } = useParams()
  const [collapsed, setCollapsed] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggle = (slug) => setCollapsed(c => ({ ...c, [slug]: !c[slug] }))

  return (
    <aside
      className={`
        relative sticky top-[56px] z-20 shrink-0 transition-all duration-300 ease-in-out
        bg-[#050505]/95 backdrop-blur-xl border-r border-slate-800/60 h-[calc(100vh-56px)]
        ${sidebarOpen ? 'w-64' : 'w-0'}
      `}
    >

      {/* Inner div controls the independent scrolling */}
      <div className={`
        w-64 h-full flex flex-col overflow-y-auto sidebar-scroll
        transition-opacity duration-200
        ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>

        {/* Header - Upgraded to Monospace System Label */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4 shrink-0 border-b border-slate-800/40 mb-3">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Layers size={12} className="text-slate-600" />
            System_Directory
          </p>
          <button
            onClick={() => setSidebarOpen(false)}
            className="cursor-none p-1.5 rounded-lg text-slate-600 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            title="Collapse sidebar"
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

          /* Topic list */
          : <div className="px-3 pb-6">
              {topics.map((topic) => {
                const isActive = topic.slug === topicSlug
                const isOpen = collapsed[topic.slug] !== undefined ? !collapsed[topic.slug] : isActive

                return (
                  <div key={topic.slug} className="mb-1.5">

                    {/* Topic toggle button */}
                    <button
                      onClick={() => toggle(topic.slug)}
                      className={`cursor-none w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-bold transition-all group border
                        ${isActive
                          ? 'text-slate-200 bg-slate-900/60 border-slate-800'
                          : 'text-slate-500 border-transparent hover:bg-slate-900/30 hover:text-slate-300'
                        }`}
                    >
                      <span className={`w-6 flex justify-center text-lg transition-all duration-300 ${isActive ? 'grayscale-0' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                        {topic.icon}
                      </span>
                      <span className="flex-1 truncate tracking-tight">{topic.title}</span>
                      <span className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
                        <ChevronDown size={14} className="opacity-40" />
                      </span>
                    </button>

                    {/* Lessons */}
                    <div className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${isOpen ? 'max-h-[800px] opacity-100 mt-1.5 mb-3' : 'max-h-0 opacity-0'}
                    `}>
                      <div className="ml-6 flex flex-col gap-1 border-l border-slate-800/60 pl-3 py-0.5">
                        {topic.lessons.map((lesson) => {
                          const isCurrent = lesson.slug === lessonSlug && topic.slug === topicSlug
                          return (
                            <Link
                              key={lesson.slug}
                              to={`/topic/${topic.slug}/${lesson.slug}`}
                              className={`cursor-none flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group/link border
                                ${isCurrent
                                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                                  : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/60'
                                }`}
                            >
                              {isCurrent
                                ? <CheckCircle size={14} className="shrink-0 text-emerald-500" />
                                : <Circle size={14} className="shrink-0 opacity-30 group-hover/link:opacity-60" />
                              }
                              <span className="flex-1 truncate">{lesson.title}</span>
                              {!isCurrent && (
                                <span className={`w-5 h-5 flex items-center justify-center rounded border font-mono font-bold uppercase ${DIFFICULTY_COLOR[lesson.difficulty]}`}>
                                  {lesson.difficulty[0]}
                                </span>
                              )}
                            </Link>
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

      {/* ── Toggle Tab ─────────── */}
      <button
        onClick={() => setSidebarOpen(o => !o)}
        title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        className={`
          cursor-none absolute top-6 -right-5 z-20
          flex items-center justify-center
          w-5 h-10 rounded-r-lg
          bg-[#0a0a0a] border border-l-0 border-slate-800
          hover:border-emerald-500/50 hover:text-emerald-400
          text-slate-500 shadow-lg
          transition-all duration-300
        `}
      >
        {sidebarOpen
          ? <ChevronLeft size={13} />
          : <ChevronRight size={13} />
        }
      </button>

    </aside>
  )
}