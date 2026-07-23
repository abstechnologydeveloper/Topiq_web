'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Flag, BookOpen, GraduationCap } from 'lucide-react'
import { SUBJECTS } from '@/lib/data'

const BOARDS = [
  { id: 'WAEC', icon: <Flag size={18} />, label: 'WAEC' },
  { id: 'JAMB', icon: <GraduationCap size={18} />, label: 'JAMB' },
  { id: 'NECO', icon: <BookOpen size={18} />, label: 'NECO' },
  { id: 'GCE', icon: <Flag size={18} />, label: 'GCE' },
]

const BOARD_SUBJECTS: Record<string, string[]> = {
  WAEC: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  JAMB: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  NECO: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  GCE: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
}

export function MockExamCard() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [board, setBoard] = useState<string | null>(null)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [duration, setDuration] = useState(30)
  const [count, setCount] = useState(20)
  const [year, setYear] = useState('2025')

  const reset = () => {
    setBoard(null)
    setSelectedSubjects([])
    setDuration(30)
    setCount(20)
    setYear('2025')
  }

  const open = () => {
    reset()
    setShowModal(true)
  }

  const toggleSubject = (id: string) => {
    if (id === 'english') return
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const start = () => {
    if (!board || selectedSubjects.length === 0) return
    setShowModal(false)
    router.push(`/practice/session?subject=${selectedSubjects[0]}&dur=${duration}&count=${count}`)
  }

  return (
    <>
      <div className="bg-[#FFF6DC] dark:bg-[#3A2E10] border border-secondary-500 rounded-[--radius] p-4 mb-4">
        <div className="font-mono text-[10.5px] font-bold text-secondary-600 uppercase tracking-[.04em] mb-1">Timed · full simulation</div>
        <h3 className="font-display text-[17px] font-semibold text-surface-900 dark:text-white">Start a mock exam</h3>
        <p className="text-[13px] text-ink-soft dark:text-ash/80 mt-1 mb-3 leading-[1.55]">A timed, exam-style practice session — just like sitting the real thing, graded instantly.</p>
        <button onClick={open}
          className="bg-surface-900 text-surface-50 border-none px-4 py-2.5 rounded-[20px] font-bold text-[12.5px] cursor-pointer flex items-center gap-1.5">
          Start a Mock Exam <ArrowRight size={12} />
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowModal(false); reset() } }}
        >
          <div className="bg-surface-50 w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[17px] text-surface-900">Set up your mock exam</h2>
              <button onClick={() => { setShowModal(false); reset() }} className="text-ash text-lg cursor-pointer">&times;</button>
            </div>
            <p className="text-[13px] text-ash mb-4">Just like the real thing — pick up to 4 subjects, English compulsory, sat one paper at a time in order.</p>

            <div className="mb-4">
              <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Exam board</span>
              <div className="flex flex-wrap gap-1.5">
                {BOARDS.map(b => (
                  <button
                    key={b.id}
                    onClick={() => { setBoard(b.id); setSelectedSubjects(['english']) }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-[12px] font-bold cursor-pointer transition ${
                      board === b.id
                        ? 'border-brand-600 bg-brand-50 text-brand-600'
                        : 'border-ash-line bg-surface-50 text-ash hover:border-brand-600'
                    }`}
                  >
                    {b.icon} {b.label}
                  </button>
                ))}
              </div>
            </div>

            {board && (
              <div className="mb-4">
                <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">
                  Subjects — pick up to 4 · English is compulsory
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(BOARD_SUBJECTS[board] || []).map(id => {
                    const s = SUBJECTS.find(sub => sub.id === id)
                    if (!s) return null
                    const isEnglish = id === 'english'
                    const isSelected = selectedSubjects.includes(id)
                    return (
                      <button
                        key={id}
                        onClick={() => toggleSubject(id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-[12px] font-bold cursor-pointer transition ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50 text-brand-600'
                            : 'border-ash-line bg-surface-50 text-ash hover:border-brand-600'
                        } ${isEnglish ? 'opacity-80' : ''}`}
                        disabled={!isSelected && !isEnglish && selectedSubjects.length >= 4}
                      >
                        {s.icon} {s.name}{isEnglish ? ' · compulsory' : ''}
                      </button>
                    )
                  })}
                </div>
                {selectedSubjects.length > 0 && (
                  <p className="text-[11px] text-ash mt-1.5">{selectedSubjects.length} subject{selectedSubjects.length === 1 ? '' : 's'} selected (up to 4 allowed)</p>
                )}
              </div>
            )}

            {selectedSubjects.length > 0 && (
              <>
                <div className="mb-4">
                  <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Exam year</span>
                  <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="w-full border border-ash-line rounded-[12px] px-3.5 py-2.5 text-[14px] bg-surface-50 text-surface-900 outline-none"
                  >
                    {['2025', '2024', '2023', '2022'].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Duration</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setDuration(Math.max(10, duration - 5))}
                      className="w-9 h-9 rounded-full border border-ash-line flex items-center justify-center text-lg font-bold text-ash cursor-pointer hover:border-brand-600 transition"
                    >−</button>
                    <span className="font-bold text-[16px] text-surface-900 w-16 text-center">{duration} min</span>
                    <button
                      onClick={() => setDuration(Math.min(60, duration + 5))}
                      className="w-9 h-9 rounded-full border border-ash-line flex items-center justify-center text-lg font-bold text-ash cursor-pointer hover:border-brand-600 transition"
                    >+</button>
                  </div>
                </div>

                <div className="mb-5">
                  <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Number of questions</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setCount(Math.max(5, count - 5))}
                      className="w-9 h-9 rounded-full border border-ash-line flex items-center justify-center text-lg font-bold text-ash cursor-pointer hover:border-brand-600 transition"
                    >−</button>
                    <span className="font-bold text-[16px] text-surface-900 w-16 text-center">{count}</span>
                    <button
                      onClick={() => setCount(Math.min(40, count + 5))}
                      className="w-9 h-9 rounded-full border border-ash-line flex items-center justify-center text-lg font-bold text-ash cursor-pointer hover:border-brand-600 transition"
                    >+</button>
                  </div>
                </div>

                <button
                  onClick={start}
                  className="w-full bg-surface-900 text-surface-50 border-none rounded-[14px] py-3 font-bold text-[13px] cursor-pointer"
                >
                  Start timed session &rarr;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
