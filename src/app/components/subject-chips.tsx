import Link from 'next/link'
import { SUBJECTS } from '@/lib/data'

export function SubjectChips() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar mb-4">
      {SUBJECTS.map(s => (
        <Link key={s.id} href={`/subjects/${s.id}`}
          className="shrink-0 text-[12.5px] font-semibold px-3 py-1.5 rounded-full border border-ash-line bg-surface-50 text-surface-700 hover:border-brand-600 transition whitespace-nowrap flex items-center gap-1.5">
          {s.icon} {s.name}
        </Link>
      ))}
    </div>
  )
}
