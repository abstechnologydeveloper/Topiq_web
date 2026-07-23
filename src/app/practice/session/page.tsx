'use client'

import { Suspense, useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { QuizStage } from './components/quiz-stage'
import { ScoreStage } from './components/score-stage'

function PracticeSessionInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const subjectId = searchParams.get('subject') || 'biology'
  const durationMin = parseInt(searchParams.get('dur') || '20', 10)
  const questionCount = parseInt(searchParams.get('count') || '10', 10)

  const s = SUBJECTS.find(x => x.id === subjectId)

  const [stage, setStage] = useState<'quiz' | 'score'>('quiz')
  const [questions, setQuestions] = useState<any[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [answeredMap, setAnsweredMap] = useState<Record<number, number>>({})
  const [score, setScore] = useState(0)
  const [results, setResults] = useState<{ q: any; chosen: number; correct: number }[]>([])
  const [secondsLeft, setSecondsLeft] = useState(durationMin * 60)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // build questions on mount
  useEffect(() => {
    let pool = TOPICS.flatMap(t => t.questions)
    if (subjectId) pool = pool.filter(q => TOPICS.find(t => t.id === q.topicId)?.subjectId === subjectId)
    pool = pool.sort(() => Math.random() - 0.5)
    const qs: any[] = []
    for (let i = 0; i < questionCount; i++) {
      qs.push({ ...pool[i % pool.length], _id: i })
    }
    setQuestions(qs)
    setQIndex(0)
    setScore(0)
    setAnsweredMap({})
    setResults([])
    setStage('quiz')
  }, [subjectId, questionCount])

  const computeScoreAndResults = useCallback((answers: Record<number, number>) => {
    let s = 0
    const r: { q: any; chosen: number; correct: number }[] = []
    questions.forEach((q, i) => {
      const chosen = answers[i] ?? -1
      if (chosen === q.correctIndex) s++
      r.push({ q, chosen, correct: q.correctIndex })
    })
    return { score: s, results: r }
  }, [questions])

  const finish = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    const { score: s, results: r } = computeScoreAndResults(answeredMap)
    setScore(s)
    setResults(r)
    setStage('score')
  }, [computeScoreAndResults, answeredMap])

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
    setAnsweredMap(prev => {
      if (prev[qIndex] !== undefined) return prev
      return { ...prev, [qIndex]: idx }
    })
  }

  const next = () => {
    if (qIndex + 1 >= questions.length) finish()
    else { setQIndex(i => i + 1) }
  }

  const prev = () => {
    if (qIndex > 0) { setQIndex(i => i - 1) }
  }

  const jump = (i: number) => {
    if (i >= 0 && i < questions.length) setQIndex(i)
  }

  const exit = () => router.back()

  if (!s || questions.length === 0) return null

  if (stage === 'score') {
    return (
      <ScoreStage
        score={score}
        total={questions.length}
        results={results}
        onRetry={() => {
          let pool = TOPICS.flatMap(t => t.questions)
            .filter(q => TOPICS.find(t => t.id === q.topicId)?.subjectId === subjectId)
            .sort(() => Math.random() - 0.5)
          const qs: any[] = []
          for (let i = 0; i < questionCount; i++) {
            qs.push({ ...pool[i % pool.length], _id: i })
          }
          setQuestions(qs)
          setQIndex(0)
          setScore(0)
          setAnsweredMap({})
          setResults([])
          setSecondsLeft(durationMin * 60)
          setStage('quiz')
        }}
        onClose={exit}
        onPractice={(topicId) => {
          const subj = TOPICS.find(t => t.id === topicId)?.subjectId || subjectId
          router.push(`/assignments?practice=${subj}`)
        }}
      />
    )
  }

  return (
    <QuizStage
      subjectName={s.name}
      subjectIcon={s.icon}
      tag="Practice · WAEC"
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
