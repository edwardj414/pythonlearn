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
    <div className="min-h-[calc(100vh-56px)] bg-[#050505] flex flex-col text-slate-200 cursor-none relative overflow-hidden">
      <SnakeCursor />

      {/* Background dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />

      {/* Emerald glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 flex flex-col relative z-10">

        {/* ── HEADER ── */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">
            <Link to="/" className="cursor-none hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <ArrowLeft size={11} /> Root
            </Link>
            <span className="text-slate-700">/</span>
            <span className="text-emerald-400">Interactive_IDE</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              {/* Icon */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  <Terminal className="text-emerald-400" size={26} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#050505] animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-black text-white tracking-tighter">Interactive Compiler</h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono text-emerald-400 tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    RUNTIME_ACTIVE
                  </span>
                </div>
                <p className="text-slate-500 text-sm font-mono">
                  Isolated sandbox — write, run, iterate
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-slate-600 tracking-widest">
              <div className="flex items-center gap-2">
                <Cpu size={12} className="text-slate-700" />
                <span>PYTHON 3.11</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={12} className="text-amber-600" />
                <span>ZERO INSTALL</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── EDITOR WRAPPER ── */}
        <div className="flex-1 flex flex-col min-h-[600px] relative group">
          {/* Glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

          {/* Outer card */}
          <div className="relative flex-1 flex flex-col bg-[#080808] border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl">

            {/* Title bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/60 bg-[#0a0a0a] shrink-0">
              <div className="flex items-center gap-3">
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors" />
                </div>
                <div className="w-px h-4 bg-slate-800" />
                <span className="text-[11px] font-mono text-slate-500 tracking-wider">sandbox.py</span>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600 tracking-widest">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  CONNECTED
                </span>
                <span>UTF-8</span>
                <span>LF</span>
              </div>
            </div>

            {/* Editor area */}
            <div className="flex-1 p-0 bg-[#050505]">
              <CodeEditor defaultCode={defaultCode} />
            </div>

            {/* Bottom status bar */}
            <div className="shrink-0 h-7 border-t border-slate-800/60 bg-[#0a0a0a] px-5 flex items-center justify-between">
              <div className="flex items-center gap-4 text-[9px] font-mono text-slate-700 tracking-widest">
                <span>PYTHON</span>
                <span className="text-slate-800">|</span>
                <span>SPACES: 4</span>
                <span className="text-slate-800">|</span>
                <span className="text-emerald-600">NO ERRORS</span>
              </div>
              <div className="text-[9px] font-mono text-slate-700 tracking-widest">
                PythonLearn IDE v2.0
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER HINT ── */}
        <div className="mt-4 flex items-center justify-center gap-6 text-[10px] font-mono text-slate-700 tracking-widest pb-4">
          <span>SHIFT+ENTER to run</span>
          <span className="text-slate-800">·</span>
          <span>CTRL+/ to comment</span>
          <span className="text-slate-800">·</span>
          <span>CTRL+Z to undo</span>
        </div>

      </div>
    </div>
  )
}