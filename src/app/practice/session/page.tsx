'use client'

import { Suspense, useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { X, Minus, Plus, ArrowRight } from 'lucide-react'
import type React from 'react'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { QuizStage } from './components/quiz-stage'
import { ScoreStage } from './components/score-stage'

function PracticeSessionInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const mode = searchParams.get('mode')
  const subjectsParam = searchParams.get('subjects')
  const board = searchParams.get('board')
  const examYear = searchParams.get('year')
  const examType = searchParams.get('type')
  const durationMin = parseInt(searchParams.get('dur') || '20', 10)
  const totalCount = parseInt(searchParams.get('count') || '10', 10)

  const isMock = mode === 'mock' && !!subjectsParam
  const subjectIds = isMock
    ? subjectsParam!.split(',')
    : [searchParams.get('subject') || 'biology']

  const perSubjectCount = isMock ? Math.floor(totalCount / subjectIds.length) : totalCount

  const [stage, setStage] = useState<'quiz' | 'score'>('quiz')
  const [subjectQuestions, setSubjectQuestions] = useState<Record<string, any[]>>({})
  const [activeSubject, setActiveSubject] = useState<string>(subjectIds[0])
  const [subjectAnswered, setSubjectAnswered] = useState<Record<string, Record<number, number>>>({})
  const [subjectQIndex, setSubjectQIndex] = useState<Record<string, number>>({})
  const [secondsLeft, setSecondsLeft] = useState(durationMin * 60)
  const [readPassage, setReadPassage] = useState<Record<string, boolean>>({})
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const questions = subjectQuestions[activeSubject] || []
  const answeredMap = subjectAnswered[activeSubject] || {}
  const qIndex = subjectQIndex[activeSubject] || 0
  const activeSubjMeta = SUBJECTS.find(s => s.id === activeSubject)

  // build question pools on mount
  useEffect(() => {
    const qMap: Record<string, any[]> = {}
    subjectIds.forEach(id => {
      let pool = TOPICS.flatMap(t => t.questions)
        .filter(q => TOPICS.find(t => t.id === q.topicId)?.subjectId === id)
      pool = pool.sort(() => Math.random() - 0.5)
      const count = isMock ? perSubjectCount : totalCount
      const qs: any[] = []
      for (let i = 0; i < count; i++) {
        qs.push({ ...pool[i % pool.length], _id: i })
      }
      qMap[id] = qs
    })
    setSubjectQuestions(qMap)
    setActiveSubject(subjectIds[0])
    setSubjectAnswered({})
    setSubjectQIndex(Object.fromEntries(subjectIds.map(id => [id, 0])))
    setStage('quiz')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Score stage
  const [score, setScore] = useState(0)
  const [results, setResults] = useState<{ q: any; chosen: number; correct: number }[]>([])
  const [subjectScores, setSubjectScores] = useState<{ id: string; name: string; icon: React.ReactNode; score: number; total: number }[]>([])
  const [practiceTopicId, setPracticeTopicId] = useState<string | null>(null)
  const [practiceDuration, setPracticeDuration] = useState(20)
  const [practiceCount, setPracticeCount] = useState(10)

  const computeScoreAndResults = useCallback((answers: Record<number, number>, qs: any[]) => {
    let s = 0
    const r: { q: any; chosen: number; correct: number }[] = []
    qs.forEach((q, i) => {
      const chosen = answers[i] ?? -1
      if (chosen === q.correctIndex) s++
      r.push({ q, chosen, correct: q.correctIndex })
    })
    return { score: s, results: r }
  }, [])

  const finish = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    const allAnswers: Record<number, number> = {}
    const allQs: any[] = []
    const sScores: { id: string; name: string; icon: React.ReactNode; score: number; total: number }[] = []
    subjectIds.forEach(id => {
      const subjAns = subjectAnswered[id] || {}
      const subjQs = subjectQuestions[id] || []
      let subjScore = 0
      subjQs.forEach((q, i) => {
        if ((subjAns[i] ?? -1) === q.correctIndex) subjScore++
      })
      const meta = SUBJECTS.find(s => s.id === id)
      sScores.push({ id, name: meta?.name || id, icon: meta?.icon || null, score: subjScore, total: subjQs.length })
      Object.entries(subjAns).forEach(([k, v]) => { allAnswers[Number(k)] = v })
      allQs.push(...subjQs)
    })
    const { score: s, results: r } = computeScoreAndResults(allAnswers, allQs)
    setScore(s)
    setResults(r)
    setSubjectScores(sScores)
    setStage('score')
  }, [computeScoreAndResults, subjectAnswered, subjectQuestions, subjectIds])

  const finishRef = useRef<() => void>(() => {})
  useEffect(() => { finishRef.current = finish }, [finish])

  // timer
  useEffect(() => {
    if (stage !== 'quiz') return
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          finishRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [stage])

  const answer = (idx: number) => {
    setSubjectAnswered(prev => {
      const subjAns = prev[activeSubject] || {}
      if (subjAns[qIndex] !== undefined) return prev
      return { ...prev, [activeSubject]: { ...subjAns, [qIndex]: idx } }
    })
  }

  const next = () => {
    if (qIndex + 1 >= questions.length) finish()
    else { setSubjectQIndex(prev => ({ ...prev, [activeSubject]: qIndex + 1 })) }
  }

  const prev = () => {
    if (qIndex > 0) { setSubjectQIndex(prev => ({ ...prev, [activeSubject]: qIndex - 1 })) }
  }

  const jump = (i: number) => {
    if (i >= 0 && i < questions.length) setSubjectQIndex(prev => ({ ...prev, [activeSubject]: i }))
  }

  const switchSubject = (id: string) => {
    setActiveSubject(id)
  }

  const exit = () => router.back()

  // aggregate per-subject counts
  const totalAnsweredAll = Object.values(subjectAnswered).reduce(
    (sum, m) => sum + Object.keys(m).length, 0
  )
  const totalQuestionsAll = Object.values(subjectQuestions).reduce(
    (sum, qs) => sum + qs.length, 0
  )

  const subjectCards = isMock ? subjectIds.map(id => {
    const s = SUBJECTS.find(x => x.id === id)
    const ans = Object.keys(subjectAnswered[id] || {}).length
    const total = (subjectQuestions[id] || []).length
    return {
      id,
      name: s?.name || id,
      icon: s?.icon || null,
      answeredCount: ans,
      totalCount: total,
      isActive: id === activeSubject,
    }
  }) : []

  if (Object.keys(subjectQuestions).length === 0 || !activeSubjMeta) return null

  if (stage === 'score') {
    return (
      <>
        <ScoreStage
          score={score}
          total={totalQuestionsAll}
          results={results}
          onRetry={() => {
            const qMap: Record<string, any[]> = {}
            subjectIds.forEach(id => {
              let pool = TOPICS.flatMap(t => t.questions)
                .filter(q => TOPICS.find(t => t.id === q.topicId)?.subjectId === id)
              pool = pool.sort(() => Math.random() - 0.5)
              const count = isMock ? perSubjectCount : totalCount
              const qs: any[] = []
              for (let i = 0; i < count; i++) {
                qs.push({ ...pool[i % pool.length], _id: i })
              }
              qMap[id] = qs
            })
            setSubjectQuestions(qMap)
            setActiveSubject(subjectIds[0])
            setSubjectAnswered({})
            setSubjectQIndex(Object.fromEntries(subjectIds.map(id => [id, 0])))
            setReadPassage({})
            setScore(0)
            setResults([])
            setSubjectScores([])
            setSecondsLeft(durationMin * 60)
            setStage('quiz')
          }}
          onClose={exit}
          onPractice={(topicId) => {
            setPracticeTopicId(topicId)
            setPracticeDuration(20)
            setPracticeCount(10)
          }}
          isMock={isMock}
          subjectScores={subjectScores}
        />

        {practiceTopicId && (() => {
          const subjId = TOPICS.find(t => t.id === practiceTopicId)?.subjectId || subjectIds[0]
          const subjMeta = SUBJECTS.find(s => s.id === subjId)
          return (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
              onClick={(e) => { if (e.target === e.currentTarget) setPracticeTopicId(null) }}>
              <div className="w-full sm:max-w-[400px] bg-surface-50 rounded-t-[20px] sm:rounded-[20px] p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-surface-900 flex items-center gap-2">{subjMeta?.icon} {subjMeta?.name} practice</h2>
                  <button onClick={() => setPracticeTopicId(null)} className="w-8 h-8 rounded-full flex items-center justify-center bg-paper-dim text-ash cursor-pointer">
                    <X size={15} />
                  </button>
                </div>
                <p className="text-[13px] text-ash mb-5">Pick a duration and number of questions to begin.</p>

                <div className="space-y-5">
                  <div>
                    <span className="text-[13px] font-semibold text-surface-900 block mb-2.5 uppercase tracking-wide">Duration</span>
                    <div className="flex items-center justify-between bg-paper-dim rounded-[12px] px-2.5 py-1.5 w-full">
                      <button onClick={() => setPracticeDuration(Math.max(10, practiceDuration - 5))}
                        className="w-8.5 h-8.5 rounded-[9px] border border-ash-line bg-surface-50 flex items-center justify-center cursor-pointer hover:border-brand-600 transition">
                        <Minus size={15} />
                      </button>
                      <span className="font-mono font-bold text-[14px] text-surface-900 w-[52px] text-center">{practiceDuration} min</span>
                      <button onClick={() => setPracticeDuration(Math.min(60, practiceDuration + 5))}
                        className="w-8.5 h-8.5 rounded-[9px] border border-ash-line bg-surface-50 flex items-center justify-center cursor-pointer hover:border-brand-600 transition">
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[13px] font-semibold text-surface-900 block mb-2.5 uppercase tracking-wide">Number of questions</span>
                    <div className="flex items-center justify-between bg-paper-dim rounded-[12px] px-2.5 py-1.5 w-full">
                      <button onClick={() => setPracticeCount(Math.max(5, practiceCount - 5))}
                        className="w-8.5 h-8.5 rounded-[9px] border border-ash-line bg-surface-50 flex items-center justify-center cursor-pointer hover:border-brand-600 transition">
                        <Minus size={15} />
                      </button>
                      <span className="font-mono font-bold text-[14px] text-surface-900 w-[52px] text-center">{practiceCount}</span>
                      <button onClick={() => setPracticeCount(Math.min(40, practiceCount + 5))}
                        className="w-8.5 h-8.5 rounded-[9px] border border-ash-line bg-surface-50 flex items-center justify-center cursor-pointer hover:border-brand-600 transition">
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                </div>

                <button onClick={() => {
                  const id = subjId
                  setPracticeTopicId(null)
                  window.location.href = `/practice/session?subject=${id}&dur=${practiceDuration}&count=${practiceCount}`
                }}
                  className="w-full mt-6 h-11 rounded-[22px] bg-brand-600 text-white font-bold text-[13px] flex items-center justify-center gap-2 cursor-pointer hover:bg-brand-700 transition">
                  Start practice <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )
        })()}
      </>
    )
  }

  // comprehension passage for English subject in mock mode
  const engTopic = TOPICS.find(t => t.id === 'eng-comp')
  if (isMock && activeSubject === 'english' && !readPassage['english'] && engTopic) {
    return (
      <div className="max-w-[640px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={exit} className="w-[34px] h-[34px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0">
            <X size={16} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10.5px] font-bold text-coral uppercase tracking-[.05em] flex items-center gap-1.5 flex-wrap">
              <span>Mock exam</span>
              {board && <span className="text-ash normal-case font-semibold">· {board}</span>}
              {examYear && <span className="text-ash normal-case font-semibold">· {examYear}</span>}
            </div>
            <div className="flex items-center gap-2 text-[13px] font-semibold text-surface-900 flex-wrap">
              <span className="flex items-center gap-1">{activeSubjMeta.icon} {activeSubjMeta.name}</span>
              {examType && <span className="text-ash">· {examType}</span>}
            </div>
          </div>
        </div>

        <div className="bg-surface-900 text-surface-50 rounded-[12px] px-3.5 py-2.5 mb-4 flex items-center gap-2 text-[12px] font-semibold">
          <span className="w-[7px] h-[7px] rounded-full bg-coral shrink-0 animate-pulse" />
          Timed mock exam — {durationMin} minutes total across {subjectIds.length} subjects, graded instantly
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {subjectCards.map(s => (
            <button
              key={s.id}
              onClick={() => switchSubject(s.id)}
              className={`px-3 py-2 rounded-[12px] border-2 cursor-pointer transition shrink-0 text-left ${
                s.isActive
                  ? 'border-brand-600 bg-brand-50 text-brand-600'
                  : 'border-ash-line bg-surface-50 text-ash hover:border-brand-600'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[12px]">
                {s.icon}
                <span className="font-bold">{s.name}</span>
              </div>
              <div className="font-mono text-[10px] opacity-70 mt-0.5">{s.answeredCount}/{s.totalCount}</div>
            </button>
          ))}
        </div>

        <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-5 mb-4">
          <div className="font-mono text-[10.5px] font-bold text-coral uppercase tracking-[.05em] mb-2">Comprehension passage</div>
          <div className="font-display text-[15px] font-semibold text-surface-900 mb-3">Read the passage below carefully.</div>
          <div className="text-[14px] text-ink-soft leading-[1.7] whitespace-pre-line bg-paper-dim rounded-[12px] p-4 mb-4">
            {engTopic.tutorial}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setReadPassage(prev => ({ ...prev, english: true }))}
              className="bg-surface-900 text-surface-50 border-none rounded-[20px] px-5 py-2.5 font-bold text-[12.5px] cursor-pointer hover:opacity-85 transition"
            >
              I&apos;ve read the passage — start questions
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <QuizStage
      subjectName={activeSubjMeta.name}
      subjectIcon={activeSubjMeta.icon}
      tag={isMock ? 'Mock exam' : 'Practice · WAEC'}
      questions={questions}
      qIndex={qIndex}
      total={questions.length}
      answeredMap={answeredMap}
      secondsLeft={secondsLeft}
      onAnswer={answer}
      onNext={next}
      onPrev={prev}
      onJump={jump}
      onSubmit={finish}
      onClose={exit}
      isMock={isMock}
      boardName={board || ''}
      examYear={examYear || ''}
      examType={examType || ''}
      subjects={subjectCards}
      onSubjectClick={switchSubject}
      totalAnsweredAll={totalAnsweredAll}
      totalQuestionsAll={totalQuestionsAll}
      totalMockMinutes={durationMin}
    />
  )
}

export default function PracticeSessionPage() {
  return (
    <Suspense fallback={null}>
      <PracticeSessionInner />
    </Suspense>
  )
}
