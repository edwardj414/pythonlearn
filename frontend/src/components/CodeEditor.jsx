import { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Copy, Check, Terminal } from 'lucide-react'
import { runCode } from '../api'

// ── NEW: Authentic Terminal Typing Effect ──
const TypewriterText = ({ text, className, isError }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    setDisplayedText('')
    setIsTyping(true)
    let i = 0
    if (!text) {
      setIsTyping(false)
      return
    }

    // Dynamic speed: Type faster if the output is really long
    const charsPerTick = Math.max(1, Math.floor(text.length / 60))

    const timer = setInterval(() => {
      i += charsPerTick
      setDisplayedText(text.substring(0, i))
      if (i >= text.length) {
        setDisplayedText(text)
        setIsTyping(false)
        clearInterval(timer)
      }
    }, 15) // 15ms per frame

    return () => clearInterval(timer)
  }, [text])

  return (
    <div className={`font-mono ${className}`}>
      <span className="whitespace-pre-wrap break-words">{displayedText}</span>
      {/* Blinking block cursor */}
      <span className={`inline-block w-2 h-3.5 ml-1 align-baseline animate-[blink_1s_infinite] ${isError ? 'bg-rose-500' : 'bg-emerald-400'} ${!isTyping && 'opacity-50'}`} />

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function CodeEditor({ defaultCode = '' }) {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState(null)
  const [running, setRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const editorRef = useRef(null)

  const handleRun = async () => {
    setRunning(true)
    setOutput(null)
    try {
      const response = await runCode(code)
      setOutput(response.data)
    } catch (err) {
      setOutput({
        stderr: err.response?.data?.stderr || err.message || 'Network error: Could not connect to code runner.',
        stdout: '',
        code: 1
      })
    } finally {
      setRunning(false)
    }
  }

  const handleReset = () => {
    setCode(defaultCode)
    setOutput(null)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const hasError = output && (output.code !== 0 || output.stderr)

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 shadow-sm mt-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#0a0a0a] border-b border-slate-800 px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-slate-400 text-xs ml-2 font-mono">interactive_example.py</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-emerald-300 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
          >
            <Play size={12} className={running ? 'animate-spin' : ''} />
            {running ? 'Executing...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="relative">
        {/* Loading overlay */}
        {running && (
          <div className="absolute inset-0 bg-[#0d0d0d]/40 backdrop-blur-[1px] z-10 flex items-center justify-center animate-in fade-in duration-300">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#050505] border border-slate-800 text-emerald-400 font-mono text-xs shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Compiling...
            </div>
          </div>
        )}

        <Editor
          height="320px"
          language="python"
          value={code}
          onChange={(val) => setCode(val || '')}
          onMount={(editor) => { editorRef.current = editor }}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            roundedSelection: true,
            tabSize: 4,
            wordWrap: 'on',
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>

      {/* Animated Output Panel */}
      {output !== null && (
        <div className="bg-[#050505] border-t border-slate-800 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800/60 bg-[#0a0a0a]">
            <Terminal size={13} className="text-slate-500" />
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Console Output</span>
            {hasError
              ? <span className="ml-auto text-[10px] font-mono tracking-widest uppercase text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">Exit Code {output.code}</span>
              : <span className="ml-auto text-[10px] font-mono tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">✓ Execution Successful</span>
            }
          </div>

          <div className="p-4 max-h-48 overflow-y-auto custom-scrollbar">
            {output.stdout && (
              <TypewriterText text={output.stdout} className="text-emerald-300" isError={false} />
            )}

            {output.stderr && (
              <div className={output.stdout ? "mt-3 pt-3 border-t border-rose-900/30" : ""}>
                <TypewriterText text={output.stderr} className="text-rose-400" isError={true} />
              </div>
            )}

            {!output.stdout && !output.stderr && (
              <span className="text-slate-600 italic font-mono text-sm">(no output)</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
