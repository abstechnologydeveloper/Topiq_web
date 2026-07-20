import Link from 'next/link'
import type { Subject, Topic } from '@/lib/types'

interface Props {
  subject: Subject
  topic: Topic
}

export function UpNextCard({ subject, topic }: Props) {
  return (
    <Link href={`/subjects/${subject.id}`}
      className="block rounded-[--radius] border border-ash-line bg-surface-50 p-4 mb-4 hover:border-brand-600 transition cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[11px] font-semibold text-ash uppercase tracking-wide">Up next · {subject.name}</div>
          <div className="font-display text-[17px] font-semibold text-surface-900 mt-0.5 flex items-center gap-1.5">
            {subject.icon} {topic.name}
          </div>
        </div>
        <div className="text-[13px] font-bold text-ash">{topic.masteryScore}%</div>
      </div>
      <div className="h-[6px] rounded-full bg-ash-line overflow-hidden">
        <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${topic.masteryScore}%` }} />
      </div>
    </Link>
  )
}
