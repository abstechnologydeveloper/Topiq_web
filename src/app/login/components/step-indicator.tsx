import { Check } from 'lucide-react'

export function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              i < current
                ? 'bg-brand-600 text-white'
                : i === current
                  ? 'bg-brand-50 text-brand-700 border-2 border-brand-600'
                  : 'bg-surface-100 text-surface-400'
            }`}
          >
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`flex-1 h-0.5 rounded transition-colors ${
                i < current ? 'bg-brand-600' : 'bg-surface-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
