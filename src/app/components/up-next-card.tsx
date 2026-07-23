import Link from 'next/link'
import type { Subject, Topic } from '@/lib/types'

interface Props {
  subject: Subject
  topic: Topic
}

export function UpNextCard({ subject, topic }: Props) {
  return (
    <Link href={`/subjects/${subject.id}`}
      className="block rounded-2xl p-3.5 mb-3.5 text-white relative overflow-hidden cursor-pointer"
      style={{ background: 'linear-gradient(120deg, #7C3AED, #3D1690)' }}>
      <div className="flex items-center justify-between gap-2.5 mb-2.5">
        <div>
          <div className="font-mono text-[10px] font-bold tracking-[.05em] uppercase text-[#B8B4E8] mb-1">Up next · {subject.name}</div>
          <div className="font-display text-[15.5px] font-semibold flex items-center gap-1.5">
            {subject.icon} {topic.name}
          </div>
        </div>
        <div className="font-mono text-[13px] font-bold shrink-0">{topic.masteryScore}%</div>
      </div>
      <div className="h-[4px] rounded-[3px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.18)' }}>
        <div className="h-full rounded-[3px] transition-all" style={{ width: `${topic.masteryScore}%`, background: 'var(--color-secondary-500, #F4B400)' }} />
      </div>
    </Link>
  )
}
