import type { Subject } from '@/lib/types'
import { GroundingChip } from '@/components/ui/shared'

interface Props {
  subj: Subject
  tutorial: string
  topicName: string
}

export function TutorialContent({ subj, tutorial, topicName }: Props) {
  const lines = tutorial.split('\n')

  return (
    <div className="space-y-4 max-w-[640px] mx-auto">
      <div className="bg-paper-dim rounded-[14px] p-4 flex items-center justify-center">
        <span className="text-[32px] text-surface-900">{subj.icon}</span>
      </div>

      <p className="text-[14.5px] leading-[1.7] text-ink-soft">{lines[0]}</p>

      {lines.slice(1).map((line, i) => {
        if (line.startsWith('•') || line.startsWith('-')) {
          return <li key={i} className="text-[14px] text-ink-soft ml-4 leading-[1.6]">{line.replace(/^[•-]\s*/, '')}</li>
        }
        if (line.trim()) {
          return <p key={i} className="text-[14.5px] leading-[1.7] text-ink-soft">{line}</p>
        }
        return null
      })}

      {lines.length > 2 && (
        <GroundingChip text={`WAEC ${subj.name} — ${topicName}`} />
      )}
    </div>
  )
}
