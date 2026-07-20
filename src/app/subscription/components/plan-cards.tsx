import { ArrowRight } from 'lucide-react'

export function PlanCards() {
  return (
    <div className="flex gap-2 mb-4">
      <div className="flex-1 border border-ash-line rounded-[14px] p-3.5 text-center cursor-pointer hover:border-brand-600 transition">
        <div className="font-bold text-[12.5px] text-surface-900 mb-1">Monthly</div>
        <div className="font-display text-[19px] font-semibold text-surface-900">₦1,500</div>
        <div className="text-[10.5px] text-ash">per month</div>
      </div>
      <div className="flex-1 border border-secondary-500 rounded-[14px] p-3.5 text-center bg-ember-soft relative cursor-pointer">
        <span className="absolute -top-[9px] left-1/2 -translate-x-1/2 bg-secondary-500 text-surface-900 font-mono text-[9px] font-bold px-2 py-[2px] rounded-[8px] whitespace-nowrap">WAEC SEASON</span>
        <div className="font-bold text-[12.5px] text-surface-900 mb-1">Exam-Ready Pass</div>
        <div className="font-display text-[19px] font-semibold text-surface-900">₦2,000</div>
        <div className="text-[10.5px] text-ash">through results day</div>
      </div>
    </div>
  )
}
