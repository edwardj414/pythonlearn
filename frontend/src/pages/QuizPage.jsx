// src/pages/QuizPage.jsx
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getQuiz } from '../api'
import SnakeCursor from '../components/SnakeCursor'
import {
  ChevronLeft, ChevronRight, Home, CheckCircle2,
  XCircle, RotateCcw, Trophy, Zap, Loader2, ClipboardCheck
} from 'lucide-react'

// Import your AES Decryption utility
import { decryptPayload } from '../utils/crypto';

export default function QuizPage() {
  const { topicSlug, lessonSlug } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz]           = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(false)
  const [answers, setAnswers]     = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore]         = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setAnswers({})
    setSubmitted(false)
    setScore(null)

    getQuiz(topicSlug, lessonSlug)
      .then(({ data }) => {
        // Intercept and decrypt the payload before setting state
        const unlockedData = decryptPayload(data);
        setQuiz(unlockedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Quiz Fetch/Decrypt Error:", err);
        setError(true);
        setLoading(false);
      })
  }, [topicSlug, lessonSlug])

  const handleSelect = (questionId, option) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  const handleSubmit = () => {
    if (!quiz?.questions) return
    const correct = quiz.questions.filter(q => answers[q.id] === q.correct).length
    setScore(correct)
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(null)
  }

  const total       = quiz?.questions?.length ?? 0
  const allAnswered = total > 0 && Object.keys(answers).length === total
  const pct         = submitted && total > 0 ? Math.round((score / total) * 100) : null

  return (
    <div className="bg-[#050505] min-h-[calc(100vh-56px)] text-slate-300 font-sans selection:bg-emerald-500/30 relative cursor-none">
      <SnakeCursor />

      {/* Background dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-40 z-0 pointer-events-none" />

      {/* ── TOP TOOLBAR ── */}
      <header className="sticky top-0 z-40 h-14 border-b border-slate-800/60 bg-[#080808]/90 backdrop-blur-xl flex items-center px-4 justify-between">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          <Link to="/" className="cursor-none hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Home size={12} /> Root
          </Link>
          <ChevronRight size={10} className="text-slate-800" />
          <Link to={`/topic/${topicSlug}`} className="cursor-none hover:text-emerald-400 transition-colors">
            {topicSlug.replace(/-/g, '_')}
          </Link>
          <ChevronRight size={10} className="text-slate-800" />
          <Link to={`/topic/${topicSlug}/${lessonSlug}`} className="cursor-none hover:text-emerald-400 transition-colors">
            {lessonSlug.replace(/-/g, '_')}
          </Link>
          <ChevronRight size={10} className="text-slate-800" />
          <span className="text-emerald-400">QUIZ</span>
        </div>

        {/* Back to lesson */}
        <Link
          to={`/topic/${topicSlug}/${lessonSlug}`}
          className="cursor-none flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-500 hover:text-white hover:border-slate-600 text-[10px] font-mono tracking-widest transition-all"
        >
          <ChevronLeft size={12} /> BACK_TO_LESSON
        </Link>
      </header>

      {/* ── CONTENT ── */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12 pb-32">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-600 font-mono">
            <Loader2 size={28} className="animate-spin text-emerald-500 mb-3" />
            <span className="text-xs tracking-[0.3em]">LOADING_ASSESSMENT...</span>
          </div>
        )}

        {/* Error */}
        {!loading && (error || !quiz) && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 font-mono">
            <XCircle size={32} className="text-rose-500/60" />
            <span className="text-xs tracking-[0.2em] text-slate-500">NO_QUIZ_FOR_THIS_MODULE</span>
            <Link
              to={`/topic/${topicSlug}/${lessonSlug}`}
              className="cursor-none mt-4 flex items-center gap-2 px-5 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white text-xs font-mono transition-all"
            >
              <ChevronLeft size={14} /> RETURN_TO_LESSON
            </Link>
          </div>
        )}

        {/* Quiz */}
        {!loading && quiz && (
          <>
            {/* Quiz Header */}
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-slate-800 bg-slate-900/50 text-[10px] font-mono text-emerald-500 tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ASSESSMENT_MODE
                </div>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                  <Zap size={12} className="text-amber-500" />
                  {quiz.xp_reward} XP REWARD
                </span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter border-b border-slate-800 pb-5">
                {quiz.title}
              </h1>
              <p className="text-xs font-mono text-slate-500 mt-3 tracking-widest">
                {total} QUESTION{total !== 1 ? 'S' : ''} — SELECT THE CORRECT ANSWER FOR EACH
              </p>
            </div>

            {/* Score Banner */}
            {submitted && (
              <div className={`mb-10 p-5 rounded-xl border flex items-center gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                pct >= 80
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : pct >= 50
                  ? 'border-amber-500/30 bg-amber-500/5'
                  : 'border-rose-500/30 bg-rose-500/5'
              }`}>
                <Trophy size={32} className={
                  pct >= 80 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-rose-400'
                } />
                <div className="flex-1">
                  <div className="text-2xl font-black text-white tracking-tight">
                    {score}/{total} &nbsp;—&nbsp; {pct}%
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1 tracking-widest">
                    {pct >= 80
                      ? `+${quiz.xp_reward} XP EARNED — OUTSTANDING`
                      : pct >= 50
                      ? 'GOOD EFFORT — REVIEW WEAK AREAS'
                      : 'STUDY THE THEORY AND RETRY'}
                  </div>
                </div>
              </div>
            )}

            {/* Questions */}
            <div className="space-y-6">
              {quiz.questions.map((q, idx) => {
                const selected    = answers[q.id]
                const isCorrect   = submitted && selected === q.correct
                const isWrong     = submitted && selected && selected !== q.correct

                const options = [
                  { key: 'a', label: q.option_a },
                  { key: 'b', label: q.option_b },
                  q.option_c ? { key: 'c', label: q.option_c } : null,
                  q.option_d ? { key: 'd', label: q.option_d } : null,
                ].filter(Boolean)

                return (
                  <div
                    key={q.id}
                    className={`rounded-xl border p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
                      submitted
                        ? isCorrect
                          ? 'border-emerald-500/30 bg-emerald-500/[0.03]'
                          : isWrong
                          ? 'border-rose-500/30 bg-rose-500/[0.03]'
                          : 'border-slate-700/60 bg-slate-900/20'
                        : 'border-slate-800 bg-slate-900/20 hover:border-slate-700'
                    }`}
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    {/* Question */}
                    <div className="flex items-start gap-3 mb-5">
                      <span className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400 flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-slate-200 font-semibold leading-snug">{q.text}</p>
                        {q.code_snippet && (
                          <pre className="mt-3 bg-[#0d1612] border border-slate-800 rounded-lg px-4 py-3 text-[13px] font-mono text-emerald-300 overflow-x-auto code-scrollbar">
                            {q.code_snippet}
                          </pre>
                        )}
                      </div>
                      {submitted && (
                        isCorrect
                          ? <CheckCircle2 size={20} className="flex-shrink-0 text-emerald-400 mt-0.5" />
                          : isWrong
                          ? <XCircle      size={20} className="flex-shrink-0 text-rose-400   mt-0.5" />
                          : null
                      )}
                    </div>

                    {/* Options */}
                    <div className="space-y-2 pl-9">
                      {options.map(({ key, label }) => {
                        const isSelected   = selected === key
                        const isThisRight  = submitted && key === q.correct
                        const isThisWrong  = submitted && isSelected && key !== q.correct

                        return (
                          <button
                            key={key}
                            onClick={() => handleSelect(q.id, key)}
                            className={`cursor-none w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-all ${
                              isThisRight
                                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                                : isThisWrong
                                ? 'border-rose-500/50 bg-rose-500/10 text-rose-300'
                                : isSelected
                                ? 'border-emerald-500/40 bg-emerald-500/[0.08] text-white'
                                : 'border-slate-700/60 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-200 hover:bg-slate-800/60'
                            } ${submitted ? 'pointer-events-none' : ''}`}
                          >
                            <span className={`flex-shrink-0 w-5 h-5 rounded border text-[10px] font-mono flex items-center justify-center uppercase ${
                              isThisRight
                                ? 'border-emerald-500 bg-emerald-500 text-black'
                                : isThisWrong
                                ? 'border-rose-500 bg-rose-500 text-white'
                                : isSelected
                                ? 'border-emerald-500/60 text-emerald-400'
                                : 'border-slate-600 text-slate-500'
                            }`}>
                              {key}
                            </span>
                            {label}
                          </button>
                        )
                      })}
                    </div>

                    {/* Explanation */}
                    {submitted && q.explanation && (
                      <div className="mt-4 pl-9">
                        <div className={`text-xs font-mono px-3 py-2 rounded-lg border ${
                          isCorrect
                            ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400/80'
                            : 'border-slate-700 bg-slate-900/50 text-slate-400'
                        }`}>
                          <span className="text-slate-500 mr-2">EXPLANATION:</span>
                          {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Submit */}
            {!submitted && (
              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className={`cursor-none flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm tracking-wider transition-all ${
                    allAnswered
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-800 text-slate-600 border border-slate-700 pointer-events-none'
                  }`}
                >
                  <ClipboardCheck size={16} />
                  {allAnswered
                    ? 'SUBMIT ASSESSMENT'
                    : `${Object.keys(answers).length}/${total} ANSWERED`}
                </button>
              </div>
            )}

            {/* Post-submit: back to lesson */}
            {submitted && (
              <div className="mt-10 flex justify-between items-center pt-8 border-t border-slate-800/50 animate-in fade-in duration-500">
                <Link
                  to={`/topic/${topicSlug}/${lessonSlug}`}
                  className="cursor-none flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 text-xs font-mono transition-all"
                >
                  <ChevronLeft size={14} /> BACK_TO_LESSON
                </Link>
                {pct < 100 && (
                  <button
                    onClick={handleReset}
                    className="cursor-none flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-xs font-mono transition-all"
                  >
                    <RotateCcw size={14} /> TRY_AGAIN
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}