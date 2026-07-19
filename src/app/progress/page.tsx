import { SUBJECTS, TOPICS, STATS } from '@/lib/data'

export default function ProgressPage() {
  const getBarColor = (s: number) => s >= 70 ? 'bg-green-500' : s < 50 ? 'bg-amber-400' : 'bg-brand-600'

  return (
    <div>
      <h1 className="text-3xl font-bold text-surface-900">Your Progress</h1>
      <p className="mt-2 text-surface-500">Keep it up — every day counts toward mastery.</p>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="rounded-lg border bg-surface-50 p-4"><p className="text-xs text-surface-400">Answered</p><p className="text-2xl font-bold text-surface-900">{STATS.answered}</p></div>
        <div className="rounded-lg border bg-surface-50 p-4"><p className="text-xs text-surface-400">Mastered</p><p className="text-2xl font-bold text-surface-900">{STATS.mastered}</p></div>
        <div className="rounded-lg border bg-surface-50 p-4"><p className="text-xs text-surface-400">Streak</p><p className="text-2xl font-bold text-surface-900">{STATS.streak}d</p></div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-surface-900 mb-2">Activity Heatmap</h2>
        <div className="flex gap-[2px] overflow-x-auto pb-2">
          {Array.from({ length: 84 }, (_, i) => {
            const lvl = (i * 7 + 5) % 5
            const colors = ['bg-surface-100', 'bg-purple-200', 'bg-purple-400', 'bg-purple-600', 'bg-purple-900']
            return <div key={i} className={`w-3 h-3 rounded-sm flex-shrink-0 ${colors[lvl]}`} />
          })}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-surface-900 mb-3">Per Subject</h2>
        <div className="space-y-3">
          {SUBJECTS.map(s => {
            const tops = TOPICS.filter(t => t.subjectId === s.id)
            return (
              <div key={s.id} className="rounded-xl border bg-surface-50 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-surface-900">{s.icon} {s.name}</h3>
                  <span className="text-sm font-bold text-brand-600">{s.masteryScore}%</span>
                </div>
                <div className="mt-2 h-1 bg-surface-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${getBarColor(s.masteryScore)}`} style={{ width: `${s.masteryScore}%` }} />
                </div>
                <p className="text-xs text-surface-400 mt-1">{s.questionCount} questions · {s.topicCount} topics</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {tops.map(t => (
                    <span key={t.id} className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${t.masteryScore >= 70 ? 'bg-green-50 text-green-700' : t.masteryScore < 50 ? 'bg-amber-50 text-amber-700' : 'bg-brand-50 text-brand-700'}`}>
                      {t.name}: {t.masteryScore}%
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}