'use client'

import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'

export default function CompetitionsPage() {
  const comps = [
    { icon: '🏆', name: 'Nigeria Biology Olympiad', level: 'National · SS1-SS3', desc: 'Annual competition testing biological knowledge and practical skills. Top students advance to the International Biology Olympiad (IBO).', tags: ['Biology', 'Olympiad', 'Free'], entry: 'Open now' },
    { icon: '🧮', name: 'National Mathematics Contest', level: 'National · JSS1-SS3', desc: 'Organised by the Mathematical Association of Nigeria. Tests problem-solving and mathematical reasoning.', tags: ['Mathematics', 'Competition'], entry: 'Closes 30 Aug' },
    { icon: '🔬', name: 'WAEC Distinction Quiz', level: 'National · SS2-SS3', desc: 'A quiz competition for WAEC candidates across all subjects. Top performers receive certificates and scholarships.', tags: ['WAEC', 'Quiz', 'Scholarship'], entry: 'Open now' },
  ]

  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        Discover
      </Link>
      <Eyebrow>Beyond the syllabus</Eyebrow>
      <PageTitle title="🏆 Competitions" sub="National and international academic competitions — Sabi AI can build you a prep track for any of these." />

      <div className="space-y-3">
        {comps.map((c, i) => (
          <div key={i} className="bg-surface-50 border border-ash-line rounded-[--radius] p-4">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-[44px] h-[44px] rounded-[12px] bg-ember-soft flex items-center justify-center text-[20px] shrink-0">{c.icon}</div>
              <div>
                <div className="font-display text-[15.5px] font-semibold text-surface-900">{c.name}</div>
                <div className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.04em]">{c.level}</div>
              </div>
            </div>
            <p className="text-[13px] text-ink-soft leading-[1.55] mb-3">{c.desc}</p>
            <div className="flex gap-2 flex-wrap mb-3">
              {c.tags.map((t, j) => (
                <span key={j} className="font-mono text-[10.5px] font-bold bg-paper-dim px-[9px] py-[4px] rounded-[10px] text-ink-soft">{t}</span>
              ))}
            </div>
            <button className="bg-surface-900 text-surface-50 border-none px-4 py-[9px] rounded-[20px] font-bold text-[12.5px] cursor-pointer">{c.entry} →</button>
          </div>
        ))}
      </div>
    </div>
  )
}
