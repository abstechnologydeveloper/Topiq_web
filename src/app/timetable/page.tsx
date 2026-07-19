'use client'

import { useState } from 'react'
import { TIMETABLE_SLOTS, DEADLINES, WEEKDAYS } from '@/lib/data'
import { Eyebrow, PageTitle, Subnav } from '@/components/ui/shared'

const PANES = ['Timetable', 'To-do', 'Exams']
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function TimetablePage() {
  const [pane, setPane] = useState('Timetable')
  const [day, setDay] = useState('Monday')

  const slotsForDay = TIMETABLE_SLOTS.filter(s => WEEKDAYS[s.weekday] === day.substring(0, 3))
  const tagColors: Record<string, string> = {
    Study: 'bg-brand-50 text-brand-600',
    Practice: 'bg-coral-soft text-coral',
    Tutorial: 'bg-violet-soft text-violet',
    CBT: 'bg-ember-soft text-secondary-600',
    Flashcards: 'bg-paper-dim text-ash',
  }

  return (
    <div>
      <Eyebrow>Your mini workspace</Eyebrow>
      <PageTitle title="Plan your week" sub="Timetable, homework and upcoming exams — all in one place, colour-coded by subject." />

      <Subnav tabs={PANES} active={pane} onChange={setPane} />

      {pane === 'Timetable' && (
        <div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 no-scrollbar">
            {DAYS.map(d => (
              <button key={d} onClick={() => setDay(d)}
                className={`shrink-0 font-mono text-[11px] font-semibold px-2.5 py-1.5 rounded-[14px] border cursor-pointer transition ${
                  day === d ? 'bg-brand-50 border-brand-600 text-brand-600' : 'bg-surface-50 border-ash-line text-ash hover:border-brand-600'
                }`}>
                {d.substring(0, 3)}
              </button>
            ))}
          </div>
          <div className="bg-surface-50 border border-ash-line rounded-[--radius]">
            {slotsForDay.length === 0 ? (
              <p className="text-center py-8 text-ash text-[14px]">No classes scheduled for {day}</p>
            ) : slotsForDay.map((slot, i) => (
              <div key={i} className="flex items-center gap-3 py-3.5 px-1 border-b border-ash-line last:border-b-0">
                <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 text-[15px] bg-paper-dim">
                  {slot.subjectId === 'biology' ? '🧬' : slot.subjectId === 'chemistry' ? '⚗️' : slot.subjectId === 'physics' ? '⚡' : slot.subjectId === 'mathematics' ? '📐' : '📖'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-surface-900">{slot.title}</div>
                  <div className="text-[12px] text-ash">{slot.time}</div>
                </div>
                <span className={`font-mono text-[10.5px] font-semibold px-2 py-1 rounded-[8px] ${tagColors[slot.tag] || 'bg-paper-dim text-ash'}`}>
                  {slot.tag}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer mt-2.5 hover:border-brand-600 hover:text-brand-600 transition">
            + Add a class
          </button>
        </div>
      )}

      {pane === 'To-do' && (
        <div>
          <div className="flex items-center gap-3.5 bg-surface-900 text-surface-50 rounded-[--radius] p-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10.5px] text-ember-soft tracking-[.05em] uppercase mb-1">Due today</div>
              <div className="font-display text-[17px] font-semibold">2 tasks left</div>
            </div>
            <button className="shrink-0 bg-secondary-500 text-surface-900 border-none px-4 py-2 rounded-[20px] font-bold text-[12.5px] cursor-pointer">
              + Add task
            </button>
          </div>
          <div className="bg-surface-50 border border-ash-line rounded-[--radius]">
            {DEADLINES.slice(0, 2).map((d, i) => (
              <div key={i} className="flex items-center gap-3 py-3.5 px-1 border-b border-ash-line last:border-b-0">
                <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 text-[15px] bg-paper-dim">{d.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-surface-900">{d.title}</div>
                  <div className="text-[12px] text-ash">Due {d.date} · {d.daysLeft}d left</div>
                </div>
                <span className="font-mono text-[10.5px] font-bold text-brand-600 cursor-pointer">Start →</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {pane === 'Exams' && (
        <div>
          <Eyebrow>Countdown</Eyebrow>
          <div className="space-y-2">
            {DEADLINES.map((d, i) => (
              <div key={i} className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 cursor-pointer hover:translate-x-0.5 hover:border-brand-600 transition-all">
                <div className="w-[32px] h-[32px] rounded-[9px] flex items-center justify-center text-[14px] shrink-0" style={{ background: `${d.colorHex}18` }}>
                  {d.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-bold text-surface-900">{d.title}</div>
                  <div className="text-[11.5px] text-ash">{d.date} · {d.daysLeft} days away</div>
                </div>
                <span className="font-mono text-[10px] font-semibold text-coral bg-coral-soft px-2 py-[3px] rounded-[10px] shrink-0">{d.daysLeft}d</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
