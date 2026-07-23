'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Flag, BookOpen, GraduationCap, ChevronDown, Globe, Star } from 'lucide-react'
import { SUBJECTS } from '@/lib/data'

const BOARDS = [
  { id: 'WAEC', icon: <Flag size={18} />, label: 'WAEC' },
  { id: 'JAMB', icon: <GraduationCap size={18} />, label: 'JAMB' },
  { id: 'NECO', icon: <BookOpen size={18} />, label: 'NECO' },
  { id: 'GCE', icon: <Flag size={18} />, label: 'GCE' },
  { id: 'IGCSE', icon: <Globe size={18} />, label: 'IGCSE' },
  { id: 'SAT', icon: <Star size={18} />, label: 'SAT' },
]

const BOARD_SUBJECTS: Record<string, string[]> = {
  WAEC: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  JAMB: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  NECO: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  GCE: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  IGCSE: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  SAT: ['english', 'mathematics'],
}

const MOCK_TYPES = [
  { label: 'Full Mock', count: 180 },
  { label: 'Quick Mock', count: 90 },
]

export function MockExamCard() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [board, setBoard] = useState<string | null>(null)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [mockType, setMockType] = useState('Full Mock')
  const [year, setYear] = useState('2025')
  const [showBreakdown, setShowBreakdown] = useState(false)

  const activeMock = MOCK_TYPES.find(m => m.label === mockType)
  const mockCount = activeMock?.count ?? 180

  const pickMock = (label: string) => {
    setMockType(label)
  }

  const reset = () => {
    setBoard(null)
    setSelectedSubjects([])
    setMockType('Full Mock')
    setYear('2025')
    setShowBreakdown(false)
  }

  const open = () => {
    reset()
    setShowModal(true)
  }

  const toggleSubject = (id: string) => {
    if (id === 'english') return
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : prev.length < maxSubjects ? [...prev, id] : prev
    )
  }

  const start = () => {
    if (!board || selectedSubjects.length === 0) return
    setShowModal(false)
    const subjectsParam = selectedSubjects.join(',')
    const mockDuration = mockCount === 180 ? 120 : 60
    router.push(`/practice/session?mode=mock&subjects=${subjectsParam}&board=${board}&year=${year}&type=${mockType}&dur=${mockDuration}&count=${mockCount}`)
  }

  const perSubject = Math.max(1, Math.floor(mockCount / selectedSubjects.length))
  const availableCount = board ? (BOARD_SUBJECTS[board]?.length || 0) : 0
  const maxSubjects = Math.min(4, availableCount)
  const canProceed = selectedSubjects.length >= maxSubjects

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
          <div className="bg-surface-50 w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[17px] text-surface-900">Set up your mock exam</h2>
              <button onClick={() => { setShowModal(false); reset() }} className="text-ash text-lg cursor-pointer">&times;</button>
            </div>
            <p className="text-[13px] text-ash mb-4">Just like the real thing — pick up to {maxSubjects} subjects, English compulsory, sat one paper at a time in order.</p>

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
                  Subjects — pick up to {maxSubjects} · English is compulsory
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(BOARD_SUBJECTS[board] || []).map(id => {
                    const s = SUBJECTS.find(sub => sub.id === id)
                    if (!s) return null
                    const isEnglish = id === 'english'
                    const isSelected = selectedSubjects.includes(id)
                    const maxedOut = !isEnglish && !isSelected && selectedSubjects.length >= maxSubjects
                    return (
                      <button
                        key={id}
                        onClick={() => toggleSubject(id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-[12px] font-bold cursor-pointer transition ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50 text-brand-600'
                            : maxedOut
                              ? 'border-ash-line/40 bg-surface-50 text-ash/40 cursor-not-allowed'
                              : 'border-ash-line bg-surface-50 text-ash hover:border-brand-600'
                        } ${isEnglish ? 'opacity-80' : ''}`}
                        disabled={!isSelected && !isEnglish && selectedSubjects.length >= maxSubjects}
                      >
                        {s.icon} {s.name}{isEnglish ? ' · compulsory' : ''}
                      </button>
                    )
                  })}
                </div>
                {selectedSubjects.length > 0 && (
                  <p className="text-[11px] text-ash mt-1.5">{selectedSubjects.length} subject{selectedSubjects.length === 1 ? '' : 's'} selected (up to {maxSubjects} allowed)</p>
                )}
              </div>
            )}

            {canProceed && (
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
                  <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Mock type</span>
                  <div className="flex gap-1.5">
                    {MOCK_TYPES.map(t => (
                      <button
                        key={t.label}
                        onClick={() => pickMock(t.label)}
                        className={`flex-1 px-3 py-2 rounded-full border-2 text-[12px] font-bold cursor-pointer transition ${
                          mockType === t.label
                            ? 'border-brand-600 bg-brand-50 text-brand-600'
                            : 'border-ash-line bg-surface-50 text-ash hover:border-brand-600'
                        }`}
                      >
                        {t.label} · {t.count} Qs
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-[12px] border border-ash-line bg-surface-50 text-[12px] font-bold cursor-pointer hover:border-brand-600 transition ${showBreakdown ? 'mb-1' : 'mb-4'}`}
                >
                  <span>{mockCount} questions total — tap to view breakdown</span>
                  <ChevronDown size={14} className={`transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
                </button>

                {showBreakdown && (
                  <div className="mb-4 px-1 space-y-2">
                    {selectedSubjects.map(id => {
                      const s = SUBJECTS.find(sub => sub.id === id)
                      return (
                        <div key={id} className="flex items-center justify-between text-[13px]">
                          <span className="font-semibold text-surface-900 flex items-center gap-1.5">{s?.icon} {s?.name}</span>
                          <span className="font-mono text-ash">{perSubject} Qs</span>
                        </div>
                      )
                    })}
                    <div className="flex items-center justify-between text-[13px] pt-2 border-t border-ash-line">
                      <span className="font-bold text-surface-900">Total</span>
                      <span className="font-mono font-bold text-surface-900">{mockCount} questions</span>
                    </div>
                  </div>
                )}

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
