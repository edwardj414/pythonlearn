// src/pages/Compiler.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Terminal, ArrowLeft } from 'lucide-react'
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
    <div className="min-h-[calc(100vh-56px)] bg-[#0F0A1F] flex flex-col text-slate-200 cursor-none">

      {/* Background Glow */}
      <SnakeCursor />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 flex flex-col relative z-10">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <Terminal className="text-purple-400" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Interactive Compiler</h1>
              <p className="text-slate-400 mt-1">Test your Python logic in an isolated, browser-based environment.</p>
            </div>
          </div>
        </div>

        {/* Editor Container - Glassmorphism Wrapper */}
        <div className="flex-1 flex flex-col min-h-[600px] bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-1 rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex-1 bg-[#1A122E]/90 backdrop-blur-xl rounded-xl p-6 flex flex-col">
            <CodeEditor defaultCode={defaultCode} />
          </div>
        </div>

      </div>
    </div>
  )
}