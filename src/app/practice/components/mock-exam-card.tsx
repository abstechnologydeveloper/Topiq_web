import { ArrowRight } from 'lucide-react'

export function MockExamCard() {
  return (
    <div className="bg-[#FFF6DC] dark:bg-[#3A2E10] border border-secondary-500 rounded-[--radius] p-4 mb-4">
      <div className="font-mono text-[10.5px] font-bold text-secondary-600 uppercase tracking-[.04em] mb-1">Timed · full simulation</div>
      <h3 className="font-display text-[17px] font-semibold text-surface-900 dark:text-white">Start a mock exam</h3>
      <p className="text-[13px] text-ink-soft dark:text-ash/80 mt-1 mb-3 leading-[1.55]">A timed, exam-style practice session — just like sitting the real thing, graded instantly.</p>
      <button onClick={() => window.location.href = '/practice/session'}
        className="bg-surface-900 text-surface-50 border-none px-4 py-2.5 rounded-[20px] font-bold text-[12.5px] cursor-pointer flex items-center gap-1.5">
        Start a Mock Exam <ArrowRight size={12} />
      </button>
    </div>
  )
}
