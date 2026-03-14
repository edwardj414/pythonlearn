import { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Copy, Check, Terminal } from 'lucide-react'
import { runCode } from '../api'

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
      const result = await runCode(code)
      setOutput(result)
    } catch (err) {
      setOutput({ stderr: 'Network error: Could not connect to code runner.', stdout: '', code: 1 })
    }
    setRunning(false)
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
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mt-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-xs ml-2 font-mono">interactive_example.py</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
          >
            {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
          >
            <Play size={12} className={running ? 'animate-spin' : ''} />
            {running ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
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

      {/* Output Panel */}
      {output !== null && (
        <div className="bg-gray-950 border-t border-gray-700">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800">
            <Terminal size={13} className="text-gray-400" />
            <span className="text-xs text-gray-400 font-medium">Output</span>
            {hasError
              ? <span className="ml-auto text-xs text-red-400 bg-red-900/30 px-2 py-0.5 rounded">Error (exit {output.code})</span>
              : <span className="ml-auto text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded">✓ Success</span>
            }
          </div>
          <div className="output-box text-sm p-4 max-h-48 overflow-y-auto">
            {output.stdout && (
              <pre className="text-green-300 whitespace-pre-wrap">{output.stdout}</pre>
            )}
            {output.stderr && (
              <pre className="text-red-400 whitespace-pre-wrap">{output.stderr}</pre>
            )}
            {!output.stdout && !output.stderr && (
              <span className="text-gray-500 italic">(no output)</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
