import type { Topic, Subject } from '@/lib/types'
import { TopicRow, RecommendCard } from '@/components/ui/shared'

interface Props {
  subj: Subject
  slug: string
  topics: Topic[]
}

export function OverviewTab({ subj, slug, topics }: Props) {
  return (
    <div>
      {topics.length > 0 && (
        <RecommendCard
          eyebrow="Recommended next"
          title={topics.find(t => t.masteryScore < 100)?.name || topics[0].name}
          cta="Start"
        />
      )}
      <div className="bg-surface-50 border border-ash-line rounded-[--radius] px-4">
        {topics.map(t => (
          <TopicRow
            key={t.id}
            name={<span className="flex items-center gap-1.5">{subj.icon} {t.name}</span>}
            pct={t.masteryScore}
            onClick={() => window.location.href = `/subjects/${slug}/${t.id}`}
          />
        ))}
      </div>
    </div>
  )
}
