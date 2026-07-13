'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SUBJECTS, TIMETABLE_SLOTS, DEADLINES, WEEKDAYS } from '@/lib/data'

type Tab = 'timetable' | 'todo' | 'exams'

export default function TimetablePage() {
  const [tab, setTab] = useState<Tab>('timetable')
  const todayIdx = new Date().getDay()
  const [selDay, setSelDay] = useState(todayIdx)
  const daySlots = TIMETABLE_SLOTS.filter(s => s.weekday === selDay + 1)

  const rows = [
    { time: '8:00', cells: ['📐 Mathematics', '', '📝 English', '', '📐 Mathematics', '', ''] },
    { time: '9:00', cells: ['🧬 Biology', '', '', '', '📝 English', '', ''] },
    { time: '10:30', cells: ['📝 English', '🧬 Biology', '', '⚡ Physics', '', '🧬 Biology', ''] },
    { time: '12:00', cells: ['', '⚡ Physics', '🧬 Biology', '', '🧬 Biology', '', ''] },
    { time: '14:00', cells: ['', '', '📐 Mathematics', '', '', '📐 Mathematics', ''] },
    { time: '16:00', cells: ['⚡ Physics', '', '', '📐 Mathematics', '', '', '⚡ Physics'] },
  ]

  const subjectColor = (label: string) => {
    for (const s of SUBJECTS) {
      if (label.includes(s.icon)) return s.colorHex + '22'
    }
    return 'transparent'
  }

  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-surface-900">Plan your week</h1>
          <button className="px-3 py-1.5 border rounded-lg text-sm font-semibold text-surface-600 hover:border-brand-300">+ Add</button>
        </div>
        <p className="text-sm text-surface-500 mt-1">Timetable, homework and upcoming exams — all in one place, colour-coded by subject.</p>
      </div>

      <div className="flex gap-1 border-b mb-5">
        {(['timetable', 'todo', 'exams'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition capitalize ${tab === t ? 'border-brand-600 text-brand-600' : 'border-transparent text-surface-400 hover:text-surface-600'}`}>
            {t === 'exams' ? 'Exams' : t === 'todo' ? 'To-do' : 'Timetable'}
          </button>
        ))}
      </div>

      {tab === 'timetable' && (
        <div>
          <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
            {WEEKDAYS.map((d, i) => (
              <button key={d} onClick={() => setSelDay(i)}
                className={`min-w-[44px] py-1.5 rounded-lg text-center text-xs font-medium border transition ${selDay === i ? 'bg-brand-600 border-brand-600 text-white' : 'border-surface-200 text-surface-600 hover:border-brand-300'}`}>
                <span className="text-sm font-bold block">{i + 6}</span><span>{d}</span>
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-surface-50">
                  <th className="py-2 px-1 text-left font-semibold text-surface-500 w-10">Time</th>
                  {WEEKDAYS.map(d => <th key={d} className={`py-2 px-1 font-semibold ${selDay === WEEKDAYS.indexOf(d) ? 'text-brand-600' : 'text-surface-500'}`}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-surface-100">
                    <td className="py-1.5 px-1 text-surface-400 font-medium">{row.time}</td>
                    {row.cells.map((cell, ci) => (
                      <td key={ci} className="py-1.5 px-0.5">
                        {cell ? (
                          <div className="rounded-md px-1 py-0.5 text-[10px] font-semibold text-surface-700" style={{ backgroundColor: subjectColor(cell) }}>
                            {cell.replace(/[^\w\s]/g, '').trim().substring(0, 6)}
                          </div>
                        ) : <span className="text-surface-200">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'todo' && (
        <div className="space-y-2">
          {[
            { icon: '🧬', title: 'Complete Biology cell structure practice', due: 'Tomorrow', color: '#4CAF50' },
            { icon: '⚗️', title: 'Submit Chemistry assignment — acids & bases', due: '12 June', color: '#FF9800' },
            { icon: '⚡', title: 'Review Physics motion formulas', due: 'Thursday', color: '#2196F3' },
            { icon: '📖', title: 'English essay: write draft', due: 'Friday', color: '#F59E0B' },
            { icon: '📐', title: 'Mathematics algebra revision set B', due: 'Next Monday', color: '#E91E63' },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border bg-white p-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-base" style={{ backgroundColor: t.color + '20' }}>{t.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-surface-900">{t.title}</p>
                <p className="text-xs text-surface-400">{t.due}</p>
              </div>
              <div className="w-5 h-5 border-2 rounded flex items-center justify-center border-surface-300" />
            </div>
          ))}
        </div>
      )}

      {tab === 'exams' && (
        <div>
          <div className="space-y-3">
            {DEADLINES.map((d, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border bg-white p-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: d.colorHex + '20' }}>{d.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-surface-900">{d.title}</p>
                  <p className="text-xs text-surface-400">Due: {d.date}</p>
                </div>
                <div className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: d.colorHex + '18', color: d.colorHex }}>{d.daysLeft}d left</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}