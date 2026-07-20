import type { ReactNode } from 'react'

interface Feature {
  icon: ReactNode
  title: string
  desc: string
}

interface Props {
  features: Feature[]
}

export function FeatureList({ features }: Props) {
  return (
    <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-5">
      {features.map((f, i) => (
        <div key={i} className="flex items-start gap-2.5 py-3 px-1 border-b border-ash-line last:border-b-0">
          <span className="text-surface-900 shrink-0 mt-0.5">{f.icon}</span>
          <div>
            <div className="font-bold text-[13.5px] text-surface-900 mb-0.5">{f.title}</div>
            <div className="text-[12px] text-ash leading-[1.5]">{f.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
