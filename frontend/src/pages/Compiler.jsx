// src/pages/Compiler.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Terminal, ArrowLeft, Cpu, Zap } from 'lucide-react'
import CodeEditor from '../components/CodeEditor'
import SnakeCursor from '../components/SnakeCursor'

export default function Compiler() {
  const defaultCode = `# Welcome to the Python Learn Sandbox!
# You can write, test, and execute Python code right here.

def greet(name):
    return f"Hello, {name}! Ready to build something awesome?"

print(greet("Developer"))
`

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#050505] flex flex-col text-slate-300 cursor-none relative overflow-hidden">
      <SnakeCursor />

      {/* Background dot grid - Muted for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex-1 flex flex-col relative z-10">

        {/* ── HEADER ── */}
        <div className="mb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">
            <Link to="/" className="cursor-none hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <ArrowLeft size={11} /> Root
            </Link>
            <span className="text-slate-800">/</span>
            <span className="text-emerald-400">Interactive_IDE</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              {/* Icon */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#0a0a0a] border border-slate-800/60 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <Terminal className="text-emerald-500" size={26} strokeWidth={1.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#050505] animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-black text-white tracking-tighter">Interactive Compiler</h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-mono text-emerald-400 font-bold tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Runtime_Active
                  </span>
                </div>
                <p className="text-slate-500 text-sm font-mono">
                  Isolated sandbox — write, run, iterate
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="hidden md:flex items-center gap-8 text-[10px] font-mono text-slate-600 tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-slate-700" />
                <span>Python 3.11</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-amber-600/80" />
                <span>Zero Install</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── EDITOR WRAPPER ── */}
        <div className="flex-1 flex flex-col min-h-[550px] relative group">
          {/* Subtle outer glow on hover */}
          <div className="absolute -inset-0.5 bg-emerald-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 pointer-events-none" />

          {/* Outer card / Frame */}
          <div className="relative flex-1 flex flex-col bg-[#0a0a0a] border border-slate-800/60 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

            {/* Title bar / Window Control */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/60 bg-[#050505] shrink-0">
              <div className="flex items-center gap-4">
                {/* Traffic lights */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                </div>
                <div className="w-px h-4 bg-slate-800/60" />
                <span className="text-[11px] font-mono text-slate-500 tracking-wider">sandbox.py</span>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600 tracking-widest">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                  CONNECTED
                </span>
                <span className="opacity-40">UTF-8</span>
                <span className="opacity-40">LF</span>
              </div>
            </div>

            {/* Main Editor Mounting Point */}
            <div className="flex-1 p-0 bg-[#0d0d0d]">
              <CodeEditor defaultCode={defaultCode} />
            </div>

            {/* Internal Status Bar */}
            <div className="shrink-0 h-8 border-t border-slate-800/60 bg-[#050505] px-5 flex items-center justify-between">
              <div className="flex items-center gap-5 text-[9px] font-mono text-slate-600 tracking-widest">
                <div className="flex gap-2">
                  <span className="text-emerald-500/50 uppercase">Python</span>
                  <span className="text-slate-800">|</span>
                  <span>Spaces: 4</span>
                  <span className="text-slate-800">|</span>
                  <span className="text-emerald-500/70">No Errors</span>
                </div>
              </div>
              <div className="text-[9px] font-mono text-slate-700 tracking-widest uppercase">
                PythonLearn IDE v2.0
              </div>
            </div>
          </div>
        </div>

        {/* ── KEYBOARD SHORTCUTS FOOTER ── */}
        <div className="mt-6 flex items-center justify-center gap-5 text-[10px] font-mono text-slate-600 tracking-[0.2em] uppercase pb-6 opacity-60">
          <span>Shift+Enter <span className="text-slate-800 ml-1">Run</span></span>
          <span className="text-slate-800">·</span>
          <span>Ctrl+/ <span className="text-slate-800 ml-1">Comment</span></span>
          <span className="text-slate-800">·</span>
          <span>Ctrl+Z <span className="text-slate-800 ml-1">Undo</span></span>
        </div>

      </div>
    </div>
  )
}
