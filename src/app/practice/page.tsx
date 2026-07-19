'use client'

import { useState } from 'react'
import { SUBJECTS } from '@/lib/data'
import { Eyebrow, Subnav } from '@/components/ui/shared'

const PANES = ['Nigerian Boards', 'International', 'By Subject']

export default function PracticePage() {
  const [pane, setPane] = useState('Nigerian Boards')

  const boards = {
    'Nigerian Boards': [
      { flag: '🇳🇬', name: 'WAEC', sub: 'Nigeria & West Africa · 6 subjects' },
      { flag: '🎓', name: 'JAMB', sub: 'Nigeria · 4 subjects' },
      { flag: '📗', name: 'NECO', sub: 'Nigeria · 3 subjects' },
      { flag: '📘', name: 'GCE', sub: 'Nigeria & West Africa · 3 subjects' },
    ],
    'International': [
      { flag: '🌍', name: 'IGCSE', sub: 'International · 4 subjects' },
      { flag: '🇬🇧', name: 'GCSE / A-Levels', sub: 'UK · 4 subjects' },
    ],
  }

  return (
    <div>
      <Eyebrow>Practice, any exam board</Eyebrow>
      <h1 className="font-display text-[25px] font-semibold tracking-[-0.01em] text-surface-900 mb-1">Practice</h1>
      <p className="text-[13.5px] text-ash mb-4">WAEC first — also JAMB, NECO, GCE, and international boards — or just practise by subject.</p>

      <div className="bg-[#FFF6DC] border border-secondary-500 rounded-[--radius] p-4 mb-4">
        <div className="font-mono text-[10.5px] font-bold text-secondary-600 uppercase tracking-[.04em] mb-1">Timed · full simulation</div>
        <h3 className="font-display text-[17px] font-semibold text-surface-900">Start a mock exam</h3>
        <p className="text-[13px] text-ink-soft mt-1 mb-3 leading-[1.55]">A timed, exam-style practice session — just like sitting the real thing, graded instantly.</p>
        <button onClick={() => window.location.href = '/practice/session'}
          className="bg-surface-900 text-surface-50 border-none px-4 py-2.5 rounded-[20px] font-bold text-[12.5px] cursor-pointer">
          Start a Mock Exam →
        </button>
      </div>

      <Subnav tabs={PANES} active={pane} onChange={setPane} />

      {pane === 'Nigerian Boards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {boards['Nigerian Boards'].map(b => (
            <div key={b.name} onClick={() => window.location.href = '/practice/session'}
              className="flex items-center gap-3.5 bg-surface-50 border border-ash-line rounded-[--radius] p-3.5 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(20,23,43,0.08)] transition-all">
              <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-[22px] shrink-0 bg-paper-dim">
                {b.flag}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[15.5px] text-surface-900">{b.name}</div>
                <div className="text-[12.5px] text-ash">{b.sub}</div>
              </div>
              <svg className="text-ash shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          ))}
        </div>
      )}

      {pane === 'International' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {boards['International'].map(b => (
            <div key={b.name} onClick={() => window.location.href = '/practice/session'}
              className="flex items-center gap-3.5 bg-surface-50 border border-ash-line rounded-[--radius] p-3.5 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(20,23,43,0.08)] transition-all">
              <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-[22px] shrink-0 bg-paper-dim">
                {b.flag}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[15.5px] text-surface-900">{b.name}</div>
                <div className="text-[12.5px] text-ash">{b.sub}</div>
              </div>
              <svg className="text-ash shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          ))}
        </div>
      )}

      {pane === 'By Subject' && (
        <div>
          <p className="text-[13.5px] text-ash mb-4 -mt-1">Normal practice questions, no specific exam board — just topic-level revision.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUBJECTS.map(s => (
              <div key={s.id} onClick={() => window.location.href = '/practice/session'}
                className="flex items-center gap-3.5 bg-surface-50 border border-ash-line rounded-[--radius] p-3.5 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(20,23,43,0.08)] transition-all">
                <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-[22px] shrink-0" style={{ backgroundColor: `${s.colorHex}18` }}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[15.5px] text-surface-900">{s.name}</div>
                  <div className="text-[12.5px] text-ash">{s.questionCount} questions</div>
                </div>
                <svg className="text-ash shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
