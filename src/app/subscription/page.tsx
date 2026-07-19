'use client'

import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'

export default function SubscriptionPage() {
  return (
    <div>
      <Link href="/progress" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        Progress
      </Link>
      <Eyebrow>Your plan</Eyebrow>
      <PageTitle title="Subscription" sub="Practice, flashcards and lessons are free — always. Here's what Plus adds, and what you're currently on." />

      <div className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 mb-5">
        <span className="text-[22px]">🔥</span>
        <div>
          <div className="font-bold text-[13.5px] text-surface-900">Free plan</div>
          <div className="text-[11.5px] text-ash">3 Sabi AI questions/day · no timed mocks</div>
        </div>
      </div>

      <Eyebrow>Free vs. AbSTopiq Plus</Eyebrow>
      <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-5">
        {[
          ['📚', 'Practice, flashcards, lessons', 'Unlimited on every plan — this never gets paywalled.'],
          ['💬', 'Sabi AI chat & scan', 'Free: 3 questions a day. Plus: unlimited, anytime.'],
          ['🎧', 'Audio lesson narration & voice replies', 'Plus only — listen to any lesson, or hear Sabi AI answer out loud.'],
          ['⏱', 'Timed mock exams', 'Plus only — full exam-style simulation, graded instantly.'],
        ].map(([icon, title, desc], i) => (
          <div key={i} className="flex items-start gap-2.5 py-3 px-1 border-b border-ash-line last:border-b-0">
            <span className="text-[18px] shrink-0">{icon}</span>
            <div>
              <div className="font-bold text-[13.5px] text-surface-900 mb-0.5">{title}</div>
              <div className="text-[12px] text-ash leading-[1.5]">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Eyebrow>Choose a plan</Eyebrow>
      <div className="flex gap-2 mb-4">
        <div className="flex-1 border border-ash-line rounded-[14px] p-3.5 text-center cursor-pointer hover:border-brand-600 transition">
          <div className="font-bold text-[12.5px] text-surface-900 mb-1">Monthly</div>
          <div className="font-display text-[19px] font-semibold text-surface-900">₦1,500</div>
          <div className="text-[10.5px] text-ash">per month</div>
        </div>
        <div className="flex-1 border border-secondary-500 rounded-[14px] p-3.5 text-center bg-ember-soft relative cursor-pointer">
          <span className="absolute -top-[9px] left-1/2 -translate-x-1/2 bg-secondary-500 text-surface-900 font-mono text-[9px] font-bold px-2 py-[2px] rounded-[8px] whitespace-nowrap">WAEC SEASON</span>
          <div className="font-bold text-[12.5px] text-surface-900 mb-1">Exam-Ready Pass</div>
          <div className="font-display text-[19px] font-semibold text-surface-900">₦2,000</div>
          <div className="text-[10.5px] text-ash">through results day</div>
        </div>
      </div>
      <button className="w-full bg-brand-600 text-surface-50 border-none px-4 py-[11px] rounded-[22px] font-bold text-[13px] cursor-pointer mb-8">
        Start 7-day free trial →
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
