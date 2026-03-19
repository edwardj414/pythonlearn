// src/components/TopicIcon.jsx
import {
  Code2, GitBranch, Wrench, Box, Database,
  ShieldAlert, RefreshCw, FolderOpen, Zap,
  FlaskConical, BookMarked, Tag, Terminal, Regex, Network, Globe, Package, Puzzle
} from 'lucide-react'

const ICON_MAP = {
  'python-basics':          { icon: Code2,         color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  'control-flow':           { icon: GitBranch,     color: 'text-blue-400',   bg: 'bg-blue-500/10   border-blue-500/20'   },
  'functions':              { icon: Wrench,         color: 'text-green-400',  bg: 'bg-green-500/10  border-green-500/20'  },
  'oop':                    { icon: Box,            color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  'data-structures':        { icon: Database,       color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  'error-handling':         { icon: ShieldAlert,    color: 'text-rose-400',   bg: 'bg-rose-500/10   border-rose-500/20'   },
  'generators-iterators':   { icon: RefreshCw,      color: 'text-teal-400',   bg: 'bg-teal-500/10   border-teal-500/20'   },
  'file-io':                { icon: FolderOpen,     color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  'concurrency':            { icon: Zap,            color: 'text-cyan-400',   bg: 'bg-cyan-500/10   border-cyan-500/20'   },
  'testing':                { icon: FlaskConical,   color: 'text-emerald-400',bg: 'bg-emerald-500/10 border-emerald-500/20'},
  'standard-library':       { icon: BookMarked,     color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
  'type-hints':             { icon: Tag,            color: 'text-pink-400',   bg: 'bg-pink-500/10   border-pink-500/20'   },
  'regex':                  { icon: Regex,          color: 'text-blue-400',   bg: 'bg-blue-500/10   border-blue-500/20'   },
  'algorithms':             { icon: Globe,          color: 'text-green-400',  bg: 'bg-green-500/10  border-green-500/20'  },
  'working-with-apis':      { icon: Network,        color: 'text-teal-400',   bg: 'bg-teal-500/10   border-teal-500/20'   },
  'packaging':              { icon: Package,        color: 'text-lime-400',   bg: 'bg-lime-500/10   border-lime-500/20'   },
  'design-patterns':        { icon: Puzzle,         color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },

}

const DEFAULT = { icon: Terminal, color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20' }

/**
 * TopicIcon — renders a styled icon box for a topic
 *
 * Props:
 *   slug     — topic slug string (e.g. 'python-basics')
 *   size     — lucide icon size (default 18)
 *   boxSize  — tailwind size classes for the box (default 'w-9 h-9')
 *   className — extra classes on the outer box
 *   iconOnly  — if true, renders just the icon without the box
 */
export default function TopicIcon({ slug, size = 18, boxSize = 'w-9 h-9', className = '', iconOnly = false }) {
  const { icon: Icon, color, bg } = ICON_MAP[slug] || DEFAULT

  if (iconOnly) return <Icon size={size} className={`${color} ${className}`} />

  return (
    <div className={`${boxSize} rounded-lg border flex items-center justify-center shrink-0 ${bg} ${className}`}>
      <Icon size={size} className={color} />
    </div>
  )
}

// Also export the raw map for use in other components
export { ICON_MAP, DEFAULT }