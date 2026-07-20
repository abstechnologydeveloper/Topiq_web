import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: string
  desc: string
  progress: number
  total: number
  xp: number
}

export function ChallengeCard({ icon, title, desc, progress, total, xp }: Props) {
  return (
    <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-4">
      <div className="flex items-start gap-3 mb-2.5">
        <div className="w-[38px] h-[38px] rounded-[10px] bg-paper-dim flex items-center justify-center shrink-0 text-surface-900">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[14px] text-surface-900 mb-0.5">{title}</div>
          <div className="text-[12px] text-ash leading-[1.5]">{desc}</div>
        </div>
      </div>
      <div className="h-[6px] rounded-full bg-ash-line overflow-hidden mb-1.5">
        <div className="h-full rounded-full bg-surface-900 transition-all" style={{ width: `${(progress / total) * 100}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-ash">{progress}/{total} · +{xp} XP</span>
        <button className="bg-surface-900 text-surface-50 border-none px-[14px] py-[7px] rounded-[16px] font-bold text-[11.5px] cursor-pointer">
          {progress > 0 ? 'Continue' : 'Start'}
        </button>
      </div>
    </div>
  )
}
