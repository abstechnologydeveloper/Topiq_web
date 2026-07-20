import { Hand } from 'lucide-react'

interface Props {
  name: string
  grade: string
}

export function UserGreeting({ name, grade }: Props) {
  return (
    <div className="mb-4">
      <div className="font-display text-[20px] font-semibold text-surface-900">
        Good afternoon, {name} <Hand size={20} className="inline" />
      </div>
      <div className="text-[13px] text-ash mt-0.5">{grade} · <strong>47 days</strong> to WAEC</div>
    </div>
  )
}
