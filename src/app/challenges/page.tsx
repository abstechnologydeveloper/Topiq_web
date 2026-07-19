'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'

export default function ChallengesPage() {
  const challenges = [
    { icon: '🔥', title: '7-day streak', desc: 'Practise for 7 days in a row', progress: 3, total: 7, xp: 150, done: false },
    { icon: '💪', title: 'Question master', desc: 'Answer 50 questions correctly', progress: 24, total: 50, xp: 300, done: false },
    { icon: '🧬', title: 'Biology explorer', desc: 'Complete all Biology topics', progress: 3, total: 5, xp: 500, done: false },
    { icon: '⚗️', title: 'Chemistry whiz', desc: 'Score 80%+ in Chemistry practice', progress: 0, total: 1, xp: 400, done: false },
  ]

  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        Discover
      </Link>
      <Eyebrow>Push yourself</Eyebrow>
      <PageTitle title="Challenges" sub="Set a target, then chip away at it — practising toward a challenge counts the same as regular practice." />

      <Eyebrow>Start a challenge</Eyebrow>
      <div className="space-y-3 mb-5">
        {challenges.map((c, i) => (
          <div key={i} className="bg-surface-50 border border-ash-line rounded-[--radius] p-4">
            <div className="flex items-start gap-3 mb-2.5">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-paper-dim flex items-center justify-center text-[17px] shrink-0">{c.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[14px] text-surface-900 mb-0.5">{c.title}</div>
                <div className="text-[12px] text-ash leading-[1.5]">{c.desc}</div>
              </div>
            </div>
            <div className="h-[6px] rounded-full bg-ash-line overflow-hidden mb-1.5">
              <div className="h-full rounded-full bg-surface-900 transition-all" style={{ width: `${(c.progress / c.total) * 100}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-ash">{c.progress}/{c.total} · +{c.xp} XP</span>
              <button className="bg-surface-900 text-surface-50 border-none px-[14px] py-[7px] rounded-[16px] font-bold text-[11.5px] cursor-pointer">
                {c.progress > 0 ? 'Continue' : 'Start'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
