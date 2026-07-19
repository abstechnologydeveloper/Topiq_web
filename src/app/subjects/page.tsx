import Link from 'next/link'
import { SUBJECTS } from '@/lib/data'

export default function SubjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-surface-900">Subjects</h1>
      <p className="mt-2 text-surface-500">Pick a subject to browse its topic tree.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUBJECTS.map(s => (
          <Link key={s.id} href={`/subjects/${s.id}`} className="group rounded-xl border bg-surface-50 p-5 shadow-sm hover:shadow-md hover:border-brand-300 transition">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center text-2xl mb-3" style={{ backgroundColor: `${s.colorHex}18` }}>{s.icon}</div>
            <h3 className="text-lg font-semibold text-surface-900">{s.name}</h3>
            <p className="text-sm text-surface-400 mt-1">{s.topicCount} topics · {s.questionCount} questions</p>
            <div className="mt-3 h-1 bg-surface-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${s.masteryScore}%` }} />
            </div>
            <p className="text-xs text-brand-600 mt-1 font-medium">{s.masteryScore}% mastery</p>
          </Link>
        ))}
      </div>
    </div>
  )
}