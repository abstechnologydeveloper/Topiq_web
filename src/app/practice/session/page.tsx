'use client'

import { useState } from 'react'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { useRouter } from 'next/navigation'
import { SelectStage } from './components/select-stage'
import { QuizStage } from './components/quiz-stage'
import { ScoreStage } from './components/score-stage'

export default function PracticeSessionPage() {
  const router = useRouter()
  const [stage, setStage] = useState<'select' | 'quiz' | 'score'>('select')
  const [questions, setQuestions] = useState<any[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [results, setResults] = useState<{ q: any; chosen: number; correct: number }[]>([])

  const startSession = (subjectId?: string) => {
    let qs = TOPICS.flatMap(t => t.questions)
    if (subjectId) qs = qs.filter(q => TOPICS.find(t => t.id === q.topicId)?.subjectId === subjectId)
    qs = qs.sort(() => Math.random() - 0.5).slice(0, 5)
    setQuestions(qs)
    setQIndex(0)
    setScore(0)
    setChosen(null)
    setResults([])
    setStage('quiz')
  }

  const answer = (idx: number) => {
    if (chosen !== null) return
    setChosen(idx)
    const correct = idx === questions[qIndex].correctIndex
    if (correct) setScore(s => s + 1)
    setResults(prev => [...prev, { q: questions[qIndex], chosen: idx, correct: questions[qIndex].correctIndex }])
  }

  const next = () => {
    if (qIndex + 1 >= questions.length) setStage('score')
    else { setQIndex(i => i + 1); setChosen(null) }
  }

  const exit = () => router.push('/practice')

  if (stage === 'select') {
    return <SelectStage onSelect={startSession} onClose={exit} />
  }

  const q = questions[qIndex]

  if (stage === 'score') {
    return (
      <ScoreStage
        score={score}
        total={questions.length}
        results={results}
        onRetry={() => startSession()}
        onClose={exit}
      />
    )
  }

  if (!q) return null

  return (
    <QuizStage
      question={q}
      qIndex={qIndex}
      total={questions.length}
      score={score}
      chosen={chosen}
      onAnswer={answer}
      onNext={next}
      onClose={exit}
    />
  )
}
