import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: string
  desc: string
  progress: number
  total: number
  xp: number
  status?: 'available' | 'in-progress' | 'completed'
  onStart?: () => void
  onGiveUp?: () => void
}

export function ChallengeCard({ icon, title, desc, progress, total, xp, status = 'available', onStart, onGiveUp }: Props) {
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
        {status === 'in-progress' ? (
          <button onClick={onGiveUp} className="bg-transparent border border-ash-line text-ash px-[14px] py-[7px] rounded-[16px] font-bold text-[11.5px] cursor-pointer hover:border-red-400 hover:text-red-500 transition">
            Give up
          </button>
        ) : status === 'completed' ? (
          <button className="bg-emerald-50 text-emerald-600 border border-emerald-500 px-[14px] py-[7px] rounded-[16px] font-bold text-[11.5px] cursor-default flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Earned
          </button>
        ) : (
          <button onClick={onStart} className="bg-surface-900 text-surface-50 border-none px-[14px] py-[7px] rounded-[16px] font-bold text-[11.5px] cursor-pointer">
            Start
          </button>
        )}
      </div>
    </div>
  )
}
