// LessonContent.jsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function LessonContent({ content }) {
  return (
    <div className="prose prose-invert max-w-none prose-blue">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const textContent = String(children).replace(/\n$/, '')

            // True block = has a language tag OR has actual newlines
            const isBlock = !inline && (match || textContent.includes('\n'))

            // 1. Detect Lifecycle Flow (Plain block with ↓ arrows)
            if (isBlock && !match && textContent.includes('↓')) {
              const lines = textContent.split('\n')
              return (
                <div className="flex flex-col items-center my-8 w-full max-w-md font-mono text-sm">
                  {lines.map((line, index) => {
                    const text = line.trim()
                    if (!text) return null
                    if (text === '↓') {
                      return <div key={index} className="text-blue-500 font-bold text-2xl my-2 animate-pulse">↓</div>
                    }
                    return (
                      <div key={index} className="w-full bg-blue-900/40 text-blue-200 border border-blue-500/30 px-4 py-3 rounded-xl shadow-lg text-center">
                        {text}
                      </div>
                    )
                  })}
                </div>
              )
            }

            // 2. Multi-line Code Blocks (e.g., ```bash, ```python, or plain ``` for folder trees)
            if (isBlock) {
              return (
                <div className="relative group my-6 w-full">
                  <div className="relative -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-20"></div>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match ? match[1] : 'text'}
                    PreTag="div"
                    className="!rounded-lg !text-sm !m-0 !bg-transparent border-0"
                    codeTagProps={{ style: { backgroundColor: 'transparent', border: 'none', padding: 0 } }}
                    {...props}
                  >
                    {textContent}
                  </SyntaxHighlighter>
                </div>
              )
            }

            // 3. Inline Code — single backticks AND single-line orphan code blocks
            return (
              <code
                className="inline bg-blue-500/10 text-blue-300 border border-blue-500/20 px-1.5 py-0.5 mx-0.5 rounded-md font-mono text-[0.9em] leading-tight"
                {...props}
              >
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}