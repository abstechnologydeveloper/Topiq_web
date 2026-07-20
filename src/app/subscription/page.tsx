'use client'

import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { Flame, BookOpenCheck, MessageSquare, Headphones, Timer, ArrowLeft, ArrowRight } from 'lucide-react'
import { FeatureList } from './components/feature-list'
import { PlanCards } from './components/plan-cards'

const features = [
  { icon: <BookOpenCheck size={18} />, title: 'Practice, flashcards, lessons', desc: 'Unlimited on every plan — this never gets paywalled.' },
  { icon: <MessageSquare size={18} />, title: 'Sabi AI chat & scan', desc: 'Free: 3 questions a day. Plus: unlimited, anytime.' },
  { icon: <Headphones size={18} />, title: 'Audio lesson narration & voice replies', desc: 'Plus only — listen to any lesson, or hear Sabi AI answer out loud.' },
  { icon: <Timer size={18} />, title: 'Timed mock exams', desc: 'Plus only — full exam-style simulation, graded instantly.' },
]

export default function SubscriptionPage() {
  return (
    <div>
      <Link href="/progress" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Progress
      </Link>
      <Eyebrow>Your plan</Eyebrow>
      <PageTitle title="Subscription" sub="Practice, flashcards and lessons are free — always. Here's what Plus adds, and what you're currently on." />

      <div className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 mb-5">
        <Flame size={22} className="text-surface-900 shrink-0" />
        <div>
          <div className="font-bold text-[13.5px] text-surface-900">Free plan</div>
          <div className="text-[11.5px] text-ash">3 Sabi AI questions/day · no timed mocks</div>
        </div>
      </div>

      <Eyebrow>Free vs. AbSTopiq Plus</Eyebrow>
      <FeatureList features={features} />

      <Eyebrow>Choose a plan</Eyebrow>
      <PlanCards />
      <button className="w-full bg-brand-600 text-surface-50 border-none px-4 py-[11px] rounded-[22px] font-bold text-[13px] cursor-pointer mb-8 flex items-center justify-center gap-1.5">
        Start 7-day free trial <ArrowRight size={13} />
      </button>

      <div className="border-t border-ash-line pt-6">
        <Eyebrow>Or get it free — invite your school</Eyebrow>
        <p className="text-[13.5px] text-ash mt-[-4px] mb-4">If your school signs up, every student and teacher there gets Sabi AI, audio lessons, and mock exams free.</p>
        <div className="flex items-center gap-3.5 bg-surface-900 text-surface-50 rounded-[--radius] p-4">
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10.5px] text-ember-soft tracking-[.05em] uppercase mb-1">Your referral link</div>
            <div className="font-display text-[17px] font-semibold">abstopiq.app/join/CORONA2026</div>
          </div>
          <button className="shrink-0 bg-secondary-500 text-surface-900 border-none px-4 py-2 rounded-[20px] font-bold text-[12.5px] cursor-pointer">Copy</button>
        </div>
      </div>
    </div>
  )
}
