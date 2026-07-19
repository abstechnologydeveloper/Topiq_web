'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SUBJECTS, TOPICS } from '@/lib/data'

export default function PracticePage() {
  const [stage, setStage] = useState<'select' | 'quiz' | 'score'>('select')
  const [subjectId, setSubjectId] = useState<string | null>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [examMode, setExamMode] = useState(false)

  const startExam = () => {
    const allQs = TOPICS.flatMap(t => t.questions).sort(() => Math.random() - 0.5).slice(0, 10)
    setQuestions(allQs); setQIndex(0); setScore(0); setChosen(null)
    setExamMode(true); setSubjectId(null); setStage('quiz')
  }

  const startSubject = (id: string) => {
    const allQs = TOPICS.filter(t => t.subjectId === id).flatMap(t => t.questions).slice(0, 5)
    setQuestions(allQs); setQIndex(0); setScore(0); setChosen(null)
    setSubjectId(id); setExamMode(false); setStage('quiz')
  }

  const answer = (idx: number) => {
    if (chosen !== null) return
    setChosen(idx)
    if (idx === questions[qIndex].correctIndex) setScore(s => s + 1)
  }

  const next = () => {
    if (qIndex + 1 >= questions.length) setStage('score')
    else { setQIndex(i => i + 1); setChosen(null) }
  }

  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0

  const subj = subjectId ? SUBJECTS.find(s => s.id === subjectId) : null
  const q = questions[qIndex]

  if (stage === 'score') {
    const color = pct >= 70 ? 'border-green-400 text-green-600' : pct >= 40 ? 'border-amber-400 text-amber-600' : 'border-red-400 text-red-500'
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center mx-auto ${color}`}>
          <span className="text-3xl font-extrabold">{score}/{questions.length}</span>
        </div>
        <p className="text-sm text-surface-400 mt-1 font-semibold">{pct}%</p>
        <h2 className="text-xl font-bold text-surface-900 mt-4">{pct >= 70 ? 'Great work! 🎉' : pct >= 40 ? 'Keep practicing! 💪' : "Don't give up! 📚"}</h2>
        {subj && <p className="text-sm text-surface-500 mt-1">{subj.name}</p>}
        <div className="flex gap-2 justify-center mt-6">
          <button onClick={() => { examMode ? startExam() : startSubject(subjectId!) }} className="px-5 py-2.5 bg-brand-600 text-white rounded-xl font-semibold text-sm">Try Again</button>
          <button onClick={() => setStage('select')} className="px-5 py-2.5 border rounded-xl text-sm font-semibold text-surface-600">Back</button>
        </div>
      </div>
    )
  }

  if (stage === 'quiz' && q) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <button onClick={() => setStage('select')} className="text-sm text-surface-400 hover:text-surface-600 flex items-center gap-1">&larr; Back</button>
          <span className="text-surface-300">|</span>
          <span className="text-sm font-semibold text-surface-500">{examMode ? 'Mock Exam' : 'Practice'} — Q{qIndex + 1}/{questions.length}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-1 bg-surface-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-600 transition-all" style={{ width: `${(qIndex / questions.length) * 100}%` }} />
          </div>
          <span className="text-xs font-semibold text-brand-600">Score: {score}</span>
        </div>
        <div className="rounded-xl border bg-surface-50 p-6">
          <p className="text-lg font-semibold text-surface-900 mb-4">{q.text}</p>
          <div className="space-y-2">
            {q.options.map((o: string, i: number) => {
              const isCorr = i === q.correctIndex; const isChosen = i === chosen
              let bg = ''; if (chosen !== null) { if (isCorr) bg = 'bg-green-50 border-green-400 text-green-700'; else if (isChosen) bg = 'bg-red-50 border-red-400 text-red-500' }
              return (
                <button key={i} disabled={chosen !== null} onClick={() => answer(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border font-medium text-sm transition ${bg || 'border-surface-200 hover:border-brand-300 hover:bg-brand-50'}`}>
                  {String.fromCharCode(65 + i)}) {o}
                </button>
              )
            })}
          </div>
          {chosen !== null && (
            <div className="mt-4 p-4 bg-surface-50 rounded-xl">
              <p className={`font-semibold text-sm ${chosen === q.correctIndex ? 'text-green-600' : 'text-red-500'}`}>{chosen === q.correctIndex ? '✅ Correct!' : '❌ Incorrect'}</p>
              <p className="text-sm text-surface-600 mt-1 leading-relaxed">{q.explanation}</p>
              <button onClick={next} className="mt-3 px-4 py-1.5 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700">Next →</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-surface-900">Practice</h1>
      <p className="mt-2 text-surface-500">WAEC, JAMB, NECO, GCE, or international boards — pick a board or just practise by subject.</p>

      <div className="flex items-center gap-2 mt-5 text-surface-500 text-sm font-semibold">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Timed · full simulation
      </div>
      <div className="mt-2 rounded-xl border bg-brand-50/50 p-5">
        <h2 className="text-lg font-bold text-surface-900">Start a mock exam</h2>
        <p className="text-sm text-surface-500 mt-1">A timed, exam-style practice session — just like sitting the real thing, graded instantly.</p>
        <button onClick={startExam} className="mt-3 px-5 py-2.5 bg-brand-600 text-white rounded-xl font-semibold text-sm hover:bg-brand-700">Start a Mock Exam →</button>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-surface-900 mb-3">Nigerian Boards</h2>
        <div className="space-y-2">
          {[
            { flag: '🇳🇬', name: 'WAEC', sub: 'Nigeria & West Africa · 6 subjects' },
            { flag: '🎓', name: 'JAMB', sub: 'Nigeria · 4 subjects' },
            { flag: '📗', name: 'NECO', sub: 'Nigeria · 3 subjects' },
            { flag: '📘', name: 'GCE', sub: 'Nigeria & West Africa · 3 subjects' },
          ].map(b => (
            <div key={b.name} onClick={() => startSubject(SUBJECTS[0].id)} className="flex items-center gap-3 rounded-lg border bg-surface-50 p-3 cursor-pointer hover:border-brand-300 transition">
              <span className="text-xl">{b.flag}</span>
              <div className="flex-1"><p className="font-semibold text-sm text-surface-900">{b.name}</p><p className="text-xs text-surface-400">{b.sub}</p></div>
              <span className="text-brand-600 font-semibold text-sm">Start →</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-surface-900 mb-3">International</h2>
        <div className="space-y-2">
          {[
            { flag: '🌍', name: 'IGCSE', sub: 'International · 4 subjects' },
            { flag: '🇬🇧', name: 'GCSE / A-Levels', sub: 'UK · 4 subjects' },
          ].map(b => (
            <div key={b.name} onClick={() => startSubject(SUBJECTS[0].id)} className="flex items-center gap-3 rounded-lg border bg-surface-50 p-3 cursor-pointer hover:border-brand-300 transition">
              <span className="text-xl">{b.flag}</span>
              <div className="flex-1"><p className="font-semibold text-sm text-surface-900">{b.name}</p><p className="text-xs text-surface-400">{b.sub}</p></div>
              <span className="text-brand-600 font-semibold text-sm">Start →</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-surface-900 mb-1">By Subject</h2>
        <p className="text-sm text-surface-500 mb-3">No exam board — just practise.</p>
        <div className="space-y-2">
          {SUBJECTS.map(s => (
            <div key={s.id} onClick={() => startSubject(s.id)} className="flex items-center gap-3 rounded-lg border bg-surface-50 p-3 cursor-pointer hover:border-brand-300 transition">
              <span className="text-xl">{s.icon}</span>
              <div className="flex-1"><p className="font-semibold text-sm text-surface-900">{s.name}</p><p className="text-xs text-surface-400">{s.questionCount} questions</p></div>
              <span className="text-brand-600 font-semibold text-sm">Start →</span>
            </div>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}