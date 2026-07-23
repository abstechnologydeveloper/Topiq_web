'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { Flame, Award, Dna, FlaskConical, Brain, Target, Zap, Globe } from 'lucide-react'
import { ChallengeCard } from './components/challenge-card'

const challenges = [
  { id: 'streak', icon: <Flame size={17} />, title: '7-day streak', desc: 'Practise for 7 days in a row', progress: 3, total: 7, xp: 150 },
  { id: 'master', icon: <Award size={17} />, title: 'Question master', desc: 'Answer 50 questions correctly', progress: 24, total: 50, xp: 300 },
  { id: 'bio', icon: <Dna size={17} />, title: 'Biology explorer', desc: 'Complete all Biology topics', progress: 3, total: 5, xp: 500 },
  { id: 'chem', icon: <FlaskConical size={17} />, title: 'Chemistry whiz', desc: 'Score 80%+ in Chemistry practice', progress: 0, total: 1, xp: 400 },
  { id: 'physics', icon: <Zap size={17} />, title: 'Physics ace', desc: 'Complete all Physics topics', progress: 1, total: 2, xp: 450 },
  { id: 'mental', icon: <Brain size={17} />, title: 'Mental math', desc: 'Solve 30 math questions in a row', progress: 0, total: 30, xp: 350 },
  { id: 'target', icon: <Target size={17} />, title: 'Perfect score', desc: 'Score 100% on any practice session', progress: 0, total: 1, xp: 600 },
  { id: 'global', icon: <Globe size={17} />, title: 'Global learner', desc: 'Practise in 3 different subjects', progress: 2, total: 3, xp: 250 },
]

export default function ChallengesPage() {
  const [inProgress, setInProgress] = useState<string[]>(
    challenges.filter(c => c.progress > 0).map(c => c.id)
  )

  const startChallenge = (id: string) => {
    if (!inProgress.includes(id)) setInProgress([...inProgress, id])
  }

  const giveUpChallenge = (id: string) => {
    setInProgress(inProgress.filter(i => i !== id))
  }

  const available = challenges.filter(c => !inProgress.includes(c.id))
  const active = challenges.filter(c => inProgress.includes(c.id))

  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <span className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          Discover
        </span>
      </Link>
      <Eyebrow>Push yourself</Eyebrow>
      <PageTitle title="Challenges" sub="Set a target, then chip away at it — practising toward a challenge counts the same as regular practice." />

      {active.length > 0 && (
        <>
          <Eyebrow>In progress</Eyebrow>
          <div className="space-y-3 mb-5">
            {active.map(c => (
              <ChallengeCard key={c.id} {...c} status="in-progress" onGiveUp={() => giveUpChallenge(c.id)} />
            ))}
          </div>
        </>
      )}

      <Eyebrow>Start a challenge</Eyebrow>
      <div className="space-y-3 mb-5">
        {available.map(c => (
          <ChallengeCard key={c.id} {...c} status="available" onStart={() => startChallenge(c.id)} />
        ))}
      </div>
    </div>
  )
}
