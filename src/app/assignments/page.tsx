'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { Dna, FlaskConical, Ruler, ArrowLeft, Minus, Plus, ArrowRight, X } from 'lucide-react'
import { AssignmentCard } from './components/assignment-card'

const assignments = [
  { icon: <Dna size={17} />, title: 'Biology: Cell Structure', className: 'SS1A Biology', subject: 'Biology', subjectId: 'biology', dueLabel: 'Tomorrow', status: 'pending' as const },
  { icon: <FlaskConical size={17} />, title: 'Chemistry: Periodic Table', className: 'SS2B Chemistry', subject: 'Chemistry', subjectId: 'chemistry', dueLabel: 'This week', status: 'done' as const },
  { icon: <Ruler size={17} />, title: 'Mathematics: Algebra', className: 'SS1A Maths', subject: 'Mathematics', subjectId: 'mathematics', dueLabel: 'Today', status: 'pending' as const },
  { icon: <Ruler size={17} />, title: 'Mathematics: Geometry', className: 'SS1A Maths', subject: 'Mathematics', subjectId: 'mathematics', dueLabel: '12 Jul 2026', status: 'pending' as const },
]

function AssignmentsInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [practiceAssignment, setPracticeAssignment] = useState<number | null>(null)
  const [dur, setDur] = useState(20)
  const [qCount, setQCount] = useState(10)

  // open practice modal if navigated from weak points
  useEffect(() => {
    const subj = searchParams.get('practice')
    if (subj) {
      const idx = assignments.findIndex(a => a.subjectId === subj)
      if (idx >= 0) { setPracticeAssignment(idx); setDur(20); setQCount(10) }
    }
  }, [searchParams])

  const a = practiceAssignment !== null ? assignments[practiceAssignment] : null

  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Discover
      </Link>
      <Eyebrow>From your teachers</Eyebrow>
      <PageTitle title="Assignments" sub="Work your teachers have set for your classes — do it here and it feeds straight back to them." />

      <div className="space-y-3">
        {assignments.map((a, i) => (
          <AssignmentCard key={i} {...a} onStart={() => { setPracticeAssignment(i); setDur(20); setQCount(10) }} />
        ))}
      </div>

      {/* practice setup modal */}
      {practiceAssignment !== null && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
          <div className="w-full sm:max-w-[400px] bg-surface-50 rounded-[20px] sm:rounded-[20px] p-5 sm:p-6 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-surface-900">{a?.icon} {a?.subject} practice</h2>
              <button onClick={() => setPracticeAssignment(null)} className="w-8 h-8 rounded-full flex items-center justify-center bg-paper-dim text-ash cursor-pointer">
                <X size={15} />
              </button>
            </div>
            <p className="text-[13px] text-ash mb-5">Pick a duration and number of questions to begin.</p>

            <div className="space-y-5">
              <div>
                <span className="text-[13px] font-semibold text-surface-900 block mb-2.5 uppercase tracking-wide">Duration</span>
                <div className="flex items-center justify-between bg-paper-dim rounded-[12px] px-2.5 py-1.5 w-full">
                  <button onClick={() => setDur(d => Math.max(10, d - 5))}
                    className="w-8.5 h-8.5 rounded-[9px] border border-ash-line bg-surface-50 flex items-center justify-center cursor-pointer hover:border-brand-600 transition">
                    <Minus size={15} />
                  </button>
                  <span className="font-mono font-bold text-[14px] text-surface-900 w-[52px] text-center">{dur} min</span>
                  <button onClick={() => setDur(d => Math.min(60, d + 5))}
                    className="w-8.5 h-8.5 rounded-[9px] border border-ash-line bg-surface-50 flex items-center justify-center cursor-pointer hover:border-brand-600 transition">
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[13px] font-semibold text-surface-900 block mb-2.5 uppercase tracking-wide">Number of questions</span>
                <div className="flex items-center justify-between bg-paper-dim rounded-[12px] px-2.5 py-1.5 w-full">
                  <button onClick={() => setQCount(c => Math.max(5, c - 5))}
                    className="w-8.5 h-8.5 rounded-[9px] border border-ash-line bg-surface-50 flex items-center justify-center cursor-pointer hover:border-brand-600 transition">
                    <Minus size={15} />
                  </button>
                  <span className="font-mono font-bold text-[14px] text-surface-900 w-[52px] text-center">{qCount}</span>
                  <button onClick={() => setQCount(c => Math.min(40, c + 5))}
                    className="w-8.5 h-8.5 rounded-[9px] border border-ash-line bg-surface-50 flex items-center justify-center cursor-pointer hover:border-brand-600 transition">
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => {
              if (!a) return
              setPracticeAssignment(null)
              router.push(`/practice/session?subject=${a.subjectId}&dur=${dur}&count=${qCount}`)
            }}
              className="w-full mt-6 h-11 rounded-[22px] bg-brand-600 text-white font-bold text-[13px] flex items-center justify-center gap-2 cursor-pointer hover:bg-brand-700 transition">
              Start practice <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AssignmentsPage() {
  return (
    <Suspense fallback={null}>
      <AssignmentsInner />
    </Suspense>
  )
}
