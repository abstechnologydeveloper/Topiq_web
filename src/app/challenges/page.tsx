'use client'

import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { Flame, Award, Dna, FlaskConical, ArrowLeft } from 'lucide-react'
import { ChallengeCard } from './components/challenge-card'

const challenges = [
  { icon: <Flame size={17} />, title: '7-day streak', desc: 'Practise for 7 days in a row', progress: 3, total: 7, xp: 150 },
  { icon: <Award size={17} />, title: 'Question master', desc: 'Answer 50 questions correctly', progress: 24, total: 50, xp: 300 },
  { icon: <Dna size={17} />, title: 'Biology explorer', desc: 'Complete all Biology topics', progress: 3, total: 5, xp: 500 },
  { icon: <FlaskConical size={17} />, title: 'Chemistry whiz', desc: 'Score 80%+ in Chemistry practice', progress: 0, total: 1, xp: 400 },
]

export default function ChallengesPage() {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Discover
      </Link>
      <Eyebrow>Push yourself</Eyebrow>
      <PageTitle title="Challenges" sub="Set a target, then chip away at it — practising toward a challenge counts the same as regular practice." />

      <Eyebrow>Start a challenge</Eyebrow>
      <div className="space-y-3 mb-5">
        {challenges.map((c, i) => (
          <ChallengeCard key={i} {...c} />
        ))}
      </div>
    </div>
  )
}
