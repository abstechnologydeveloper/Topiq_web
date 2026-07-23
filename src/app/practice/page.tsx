'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eyebrow, Subnav } from '@/components/ui/shared'
import { GraduationCap, BookOpen, Book, Globe, Flag, ArrowLeft, ChevronRight, X } from 'lucide-react'
import { MockExamCard } from './components/mock-exam-card'
import { SubjectCardList } from './components/subject-card-list'
import { SUBJECTS } from '@/lib/data'

const PANES = ['Nigerian Boards', 'International', 'By Subject']

const BOARD_SUBJECTS: Record<string, string[]> = {
  WAEC: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  JAMB: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  NECO: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  GCE: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  IGCSE: ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
  'GCSE / A-Levels': ['english', 'mathematics', 'biology', 'chemistry', 'physics'],
}

const boards: Record<string, { flag: React.ReactNode; name: string; sub: string }[]> = {
  'Nigerian Boards': [
    { flag: <Flag size={22} />, name: 'WAEC', sub: 'Nigeria & West Africa · 6 subjects' },
    { flag: <GraduationCap size={22} />, name: 'JAMB', sub: 'Nigeria · 4 subjects' },
    { flag: <BookOpen size={22} />, name: 'NECO', sub: 'Nigeria · 3 subjects' },
    { flag: <Book size={22} />, name: 'GCE', sub: 'Nigeria & West Africa · 3 subjects' },
  ],
  'International': [
    { flag: <Globe size={22} />, name: 'IGCSE', sub: 'International · 4 subjects' },
    { flag: <Flag size={22} />, name: 'GCSE / A-Levels', sub: 'UK · 4 subjects' },
  ],
}

const AFRICAN_BOARDS_DESC: Record<string, string> = {
  WAEC: 'West African Senior School Certificate',
  JAMB: 'Joint university admissions exam (UTME)',
  NECO: 'National Examinations Council',
  GCE: 'WAEC General Certificate (private candidates)',
  IGCSE: 'Cambridge International GCSE',
  'GCSE / A-Levels': 'UK General Certificate of Education',
}

export default function PracticePage() {
  const router = useRouter()
  const [pane, setPane] = useState('Nigerian Boards')
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null)
  const [setupSubject, setSetupSubject] = useState<string | null>(null)
  const [setupBoard, setSetupBoard] = useState<string | null>(null)
  const [setupYear, setSetupYear] = useState('2025')
  const [setupDuration, setSetupDuration] = useState(20)
  const [setupCount, setSetupCount] = useState(10)

  const openBoard = (name: string) => setSelectedBoard(name)
  const goBack = () => setSelectedBoard(null)

  const openSetup = (subjectId: string) => {
    setSetupSubject(subjectId)
    setSetupBoard(selectedBoard)
    setSetupYear('2025')
    setSetupDuration(20)
    setSetupCount(10)
  }

  const closeSetup = () => {
    setSetupSubject(null)
    setSetupBoard(null)
  }

  const startPractice = () => {
    if (!setupSubject) return
    const id = setupSubject
    closeSetup()
    router.push(`/practice/session?subject=${id}&dur=${setupDuration}&count=${setupCount}${setupBoard ? `&board=${setupBoard}&year=${setupYear}` : ''}`)
  }

  const subjectIds = selectedBoard ? (BOARD_SUBJECTS[selectedBoard] || []) : []

  const setupMeta = setupSubject ? SUBJECTS.find(s => s.id === setupSubject) : null

  return (
    <div>
      <Eyebrow>Practice, any exam board</Eyebrow>
      <h1 className="font-display text-[25px] font-semibold tracking-[-0.01em] text-surface-900 mb-1">Practice</h1>
      <p className="text-[13.5px] text-ash mb-4">WAEC first — also JAMB, NECO, GCE, and international boards — or just practise by subject.</p>

      <MockExamCard />

      <Subnav tabs={PANES} active={pane} onChange={setPane} />

      {pane !== 'By Subject' && !selectedBoard && (
        <div className="grid grid-cols-2 gap-3">
          {(boards[pane] || []).map(b => (
            <div key={b.name} onClick={() => openBoard(b.name)}
              className="flex items-center gap-3.5 bg-surface-50 border border-ash-line rounded-[--radius] p-3.5 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(20,23,43,0.08)] transition-all">
              <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">
                {b.flag}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[15.5px] text-surface-900">{b.name}</div>
                <div className="text-[12.5px] text-ash">{b.sub}</div>
              </div>
              <ChevronRight size={18} className="text-ash shrink-0" />
            </div>
          ))}
        </div>
      )}

      {pane !== 'By Subject' && selectedBoard && (
        <div>
          <div onClick={goBack}
            className="flex items-center gap-2 text-[13px] font-bold text-ash cursor-pointer mb-3 hover:text-surface-900 transition">
            <ArrowLeft size={15} />
            All boards
          </div>
          <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-4 mb-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900 text-[19px]">
                {(boards[pane] || []).find(b => b.name === selectedBoard)?.flag}
              </div>
              <div>
                <div className="font-bold text-[15px] text-surface-900">{selectedBoard}</div>
                <div className="text-[12px] text-ash">{AFRICAN_BOARDS_DESC[selectedBoard] || ''}</div>
              </div>
            </div>
            {subjectIds.map(id => {
              const s = SUBJECTS.find(sub => sub.id === id)
              if (!s) return null
              return (
                <div key={id} onClick={() => openSetup(id)}
                  className="flex items-center gap-3 py-3 border-b border-ash-line last:border-b-0 cursor-pointer">
                  <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 text-[15px] bg-paper-dim text-surface-900">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-surface-900">{s.name}</div>
                    <div className="text-[12px] text-ash">{s.masteryScore}% mastery · Practice now</div>
                  </div>
                  <ChevronRight size={16} className="text-ash shrink-0" />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {pane === 'By Subject' && <SubjectCardList />}

      {/* Practice setup modal */}
      {setupSubject && setupMeta && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
          onClick={(e) => { if (e.target === e.currentTarget) closeSetup() }}
        >
          <div className="bg-surface-50 w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[17px] text-surface-900 flex items-center gap-2">{setupMeta.icon} {setupMeta.name} practice</h2>
              <button onClick={closeSetup} className="text-ash text-lg cursor-pointer">&times;</button>
            </div>
            <p className="text-[13px] text-ash mb-4">
              {setupBoard
                ? `${setupBoard} — pick a year, duration and number of questions.`
                : 'Pick a duration and number of questions to begin.'}
            </p>

            {setupBoard && (
              <div className="mb-4">
                <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Exam year</span>
                <select
                  value={setupYear}
                  onChange={e => setSetupYear(e.target.value)}
                  className="w-full border border-ash-line rounded-[12px] px-3.5 py-2.5 text-[14px] bg-surface-50 text-surface-900 outline-none"
                >
                  {['2025', '2024', '2023', '2022'].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Duration</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSetupDuration(Math.max(10, setupDuration - 5))}
                  className="w-9 h-9 rounded-full border border-ash-line flex items-center justify-center text-lg font-bold text-ash cursor-pointer hover:border-brand-600 transition"
                >−</button>
                <span className="font-bold text-[16px] text-surface-900 w-16 text-center">{setupDuration} min</span>
                <button
                  onClick={() => setSetupDuration(Math.min(60, setupDuration + 5))}
                  className="w-9 h-9 rounded-full border border-ash-line flex items-center justify-center text-lg font-bold text-ash cursor-pointer hover:border-brand-600 transition"
                >+</button>
              </div>
            </div>

            <div className="mb-5">
              <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Number of questions</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSetupCount(Math.max(5, setupCount - 5))}
                  className="w-9 h-9 rounded-full border border-ash-line flex items-center justify-center text-lg font-bold text-ash cursor-pointer hover:border-brand-600 transition"
                >−</button>
                <span className="font-bold text-[16px] text-surface-900 w-16 text-center">{setupCount}</span>
                <button
                  onClick={() => setSetupCount(Math.min(40, setupCount + 5))}
                  className="w-9 h-9 rounded-full border border-ash-line flex items-center justify-center text-lg font-bold text-ash cursor-pointer hover:border-brand-600 transition"
                >+</button>
              </div>
            </div>

            <button
              onClick={startPractice}
              className="w-full bg-surface-900 text-surface-50 border-none rounded-[14px] py-3 font-bold text-[13px] cursor-pointer"
            >
              Start practice &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
