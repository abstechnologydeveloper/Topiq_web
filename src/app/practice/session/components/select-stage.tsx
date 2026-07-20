import { SUBJECTS } from '@/lib/data'
import { X } from 'lucide-react'

interface Props {
  onSelect: (subjectId: string) => void
  onClose: () => void
}

export function SelectStage({ onSelect, onClose }: Props) {
  return (
    <div className="max-w-[640px] mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onClose} className="w-[34px] h-[34px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0">
          <X size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10.5px] font-bold text-coral uppercase tracking-[.05em]">Practice</div>
          <div className="font-display text-[16px] font-semibold text-surface-900">Pick a subject</div>
        </div>
      </div>
      <div className="bg-surface-900 text-surface-50 rounded-[12px] px-3.5 py-2.5 mb-4 flex items-center gap-2 text-[12px] font-semibold">
        <span className="w-[7px] h-[7px] rounded-full bg-coral shrink-0" />
        Practice mode — answers aren't graded into your lesson progress
      </div>

      {SUBJECTS.map(s => (
        <div key={s.id} onClick={() => onSelect(s.id)}
          className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 mb-2.5 cursor-pointer hover:translate-x-0.5 hover:border-brand-600 transition-all">
          <div className="w-[32px] h-[32px] rounded-[9px] flex items-center justify-center shrink-0 text-surface-900" style={{ background: `${s.colorHex}18` }}>
            {s.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13.5px] font-bold text-surface-900">{s.name}</div>
            <div className="text-[11.5px] text-ash">{s.questionCount} practice questions</div>
          </div>
          <span className="font-mono text-[10px] font-semibold text-coral bg-coral-soft px-2 py-[3px] rounded-[10px] shrink-0">{s.masteryScore}%</span>
        </div>
      ))}
    </div>
  )
}
