import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface Props {
  icon: ReactNode
  name: string
  level: string
  desc: string
  tags: string[]
  entry: string
  onStart: () => void
}

export function CompetitionCard({ icon, name, level, desc, tags, entry, onStart }: Props) {
  return (
    <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-4">
      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-[44px] h-[44px] rounded-[12px] bg-ember-soft flex items-center justify-center shrink-0 text-surface-900">{icon}</div>
        <div>
          <div className="font-display text-[15.5px] font-semibold text-surface-900">{name}</div>
          <div className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.04em]">{level}</div>
        </div>
      </div>
      <p className="text-[13px] text-ink-soft leading-[1.55] mb-3">{desc}</p>
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="font-mono text-[10.5px] font-bold text-coral bg-coral-soft px-[9px] py-[4px] rounded-[10px]">{entry}</span>
        {tags.map((t, j) => (
          <span key={j} className="font-mono text-[10.5px] font-bold bg-paper-dim px-[9px] py-[4px] rounded-[10px] text-ink-soft">{t}</span>
        ))}
      </div>
      <button onClick={onStart}
        className="bg-surface-900 text-surface-50 border-none px-4 py-[9px] rounded-[20px] font-bold text-[12.5px] cursor-pointer flex items-center gap-1.5 hover:opacity-85 transition">
        Start a prep track <ArrowRight size={12} />
      </button>
    </div>
  )
}
