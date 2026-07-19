'use client'

import Link from 'next/link'
import { use, useState } from 'react'
import { SUBJECTS, TOPICS, PAPERS } from '@/lib/data'

const TABS = ['Overview', 'Learn', 'Practice', 'Flashcards', 'Papers', 'Ask'] as const

export default function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: slug } = use(params)
  const subj = SUBJECTS.find(s => s.id === slug)
  const [tab, setTab] = useState<typeof TABS[number]>('Overview')
  // Flashcard state
  const [fcIdx, setFcIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [fcAgain, setFcAgain] = useState<number[]>([])
  const [fcDone, setFcDone] = useState(false)
  // Ask state
  const [askQ, setAskQ] = useState('')
  const [askA, setAskA] = useState('')
  const [askRef, setAskRef] = useState('')

  if (!subj) return <div className="text-center py-20 text-surface-400">Subject not found</div>

  const topics = TOPICS.filter(t => t.subjectId === slug)
  const papers = PAPERS[slug] || []
  const allCards = topics.flatMap(t => t.flashcards)
  const color = subj.colorHex

  const startFc = () => {
    setFcIdx(0)
    setFlipped(false)
    setFcDone(false)
    setFcAgain(allCards.map((_, i) => i))
  }

  const rateCard = (rating: string) => {
    if (fcAgain.length === 0) return
    const cardIdx = fcAgain[fcIdx % fcAgain.length]
    const next = [...fcAgain]
    if (rating !== 'again') next.splice(next.indexOf(cardIdx), 1)
    setFcAgain(next)
    setFlipped(false)
    setFcIdx(prev => prev + 1)
    if (next.length === 0) setFcDone(true)
  }

  const doAsk = () => {
    if (!askQ.trim()) return
    for (const t of topics) {
      for (const q of t.questions) {
        if (q.text.toLowerCase().includes(askQ.toLowerCase()) || askQ.toLowerCase().includes(q.text.toLowerCase().substring(0, 10))) {
          setAskA(q.explanation)
          setAskRef(`§ WAEC ${subj.name} — ${t.name}`)
          setAskQ('')
          return
        }
      }
    }
    setAskA(`I couldn't find a direct syllabus reference for "${askQ}". Try rephrasing.`)
    setAskRef('')
    setAskQ('')
  }

  return (
    <div>
      <Link href="/subjects" className="text-sm text-brand-600 hover:underline">&larr; All Subjects</Link>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${color}18` }}>{subj.icon}</div>
        <div>
          <h1 className="text-2xl font-bold text-surface-900">{subj.name}</h1>
          <p className="text-sm text-surface-500">{subj.topicCount} topics · {subj.questionCount} questions</p>
        </div>
      </div>

      <div className="flex gap-1 mt-6 border-b overflow-x-auto pb-px">
        {TABS.map(t => (
          <button key={t} onClick={() => { setTab(t); if (t === 'Flashcards') startFc(); setAskA('') }}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition ${tab === t ? 'border-brand-600 text-brand-600' : 'border-transparent text-surface-500 hover:text-surface-700'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {/* Overview */}
        {tab === 'Overview' && (
          <div className="space-y-3">
            {topics.map(t => (
              <Link key={t.id} href={`/subjects/${slug}/${t.id}`} className="block rounded-xl border bg-white p-4 hover:border-brand-300 transition">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-surface-900">{t.name}</h3>
                  <span className="text-sm font-semibold text-brand-600">{t.masteryScore}%</span>
                </div>
                <div className="mt-2 h-1 bg-surface-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{
                    width: `${t.masteryScore}%`,
                    backgroundColor: t.masteryScore >= 70 ? '#4ADE80' : t.masteryScore < 50 ? '#FBBF24' : 'var(--color-brand-400)'
                  }} />
                </div>
                <p className="text-xs text-surface-400 mt-1">{t.questions.length} questions · {t.flashcards.length} flashcards</p>
              </Link>
            ))}
          </div>
        )}

        {/* Learn */}
        {tab === 'Learn' && (
          <div className="space-y-3">
            {topics.map(t => (
              <Link key={t.id} href={`/subjects/${slug}/${t.id}`} className="block rounded-xl border bg-white p-4 hover:border-brand-300 transition">
                <h3 className="font-semibold text-surface-900">{t.name}</h3>
                <p className="text-xs text-surface-400 mt-1">Mastery: {t.masteryScore}% · {t.questions.length} practice Qs</p>
                <div className="mt-2 p-3 rounded-lg text-sm leading-relaxed text-surface-600" style={{ backgroundColor: `${color}14` }}>
                  {t.tutorial.split('\n').slice(0, 3).join(' ').substring(0, 200)}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Practice */}
        {tab === 'Practice' && (
          <div className="text-center py-8">
            <Link href="/practice" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition">
              Start Practice Session — {subj.name}
            </Link>
          </div>
        )}

        {/* Flashcards */}
        {tab === 'Flashcards' && (
          <div className="text-center max-w-md mx-auto">
            {fcDone ? (
              <div className="py-8">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-lg font-semibold text-surface-900">All cards reviewed!</h3>
                <p className="text-sm text-surface-400">Come back tomorrow for spaced repetition.</p>
              </div>
            ) : allCards.length > 0 && fcAgain.length > 0 ? (
              <>
                <p className="text-xs text-surface-400 mb-3">Card {fcIdx + 1}/{allCards.length}</p>
                <div onClick={() => setFlipped(!flipped)} className="rounded-xl border bg-white p-8 min-h-[120px] flex items-center justify-center cursor-pointer hover:border-brand-300 transition select-none">
                  <p className={`text-lg font-semibold ${flipped ? 'text-brand-600' : 'text-surface-900'}`}>
                    {flipped ? allCards[fcAgain[fcIdx % fcAgain.length]]?.answer : allCards[fcAgain[fcIdx % fcAgain.length]]?.question}
                  </p>
                </div>
                <p className="text-xs text-surface-400 mt-2">Tap card to flip</p>
                <div className="flex gap-2 justify-center mt-4">
                  <button onClick={() => rateCard('again')} className="px-4 py-2 rounded-full border text-sm font-semibold text-red-500 hover:bg-red-50 hover:border-red-300">Again</button>
                  <button onClick={() => rateCard('good')} className="px-4 py-2 rounded-full border text-sm font-semibold text-amber-600 hover:bg-amber-50 hover:border-amber-300">Good</button>
                  <button onClick={() => rateCard('easy')} className="px-4 py-2 rounded-full border text-sm font-semibold text-green-600 hover:bg-green-50 hover:border-green-300">Easy</button>
                </div>
              </>
            ) : (
              <div className="py-8 text-surface-400">No flashcards for this subject yet.</div>
            )}
          </div>
        )}

        {/* Papers */}
        {tab === 'Papers' && (
          <div className="space-y-2">
            {papers.length === 0 ? (
              <p className="text-surface-400 py-8 text-center">No past papers available yet.</p>
            ) : papers.map((p, i) => (
              <div key={i} className="rounded-xl border bg-white p-4 cursor-pointer hover:border-brand-300 transition" onClick={() => { setTab('Ask'); setAskA(p.answer); setAskRef(p.reference); setAskQ('') }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-surface-900 text-sm">{p.name}</p>
                    <p className="text-xs text-surface-400">{p.exam} · {p.year}</p>
                  </div>
                  <span className="text-brand-600 text-sm font-semibold">Ask →</span>
                </div>
                <p className="text-xs text-surface-500 mt-2 line-clamp-1">{p.question}</p>
              </div>
            ))}
            <p className="text-xs text-surface-400 mt-2">Tap any paper to open it in Ask AI with a grounded answer.</p>
          </div>
        )}

        {/* Ask */}
        {tab === 'Ask' && (
          <div>
            <p className="text-sm text-surface-500 mb-3">Ask Sabi AI about {subj.name} — every answer is grounded in your syllabus.</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={askQ}
                onChange={e => setAskQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doAsk()}
                placeholder="E.g. Explain photosynthesis..."
                className="flex-1 border rounded-xl px-4 py-2 text-sm outline-none focus:border-brand-400"
              />
              <button onClick={doAsk} className="px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700">Ask</button>
            </div>
            {askA && (
              <div className="mt-4 p-4 bg-surface-100 rounded-xl">
                <div className="flex gap-2 items-start">
                  <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">AI</div>
                  <div>
                    <p className="text-sm leading-relaxed text-surface-700">{askA}</p>
                    {askRef && (
                      <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-brand-50 text-brand-700 text-[11px] rounded-full font-medium">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {askRef}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}