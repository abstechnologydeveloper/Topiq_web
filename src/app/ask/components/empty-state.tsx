import { BrainCircuit, MessageSquare, CheckCircle, Camera } from 'lucide-react'

interface Props {
  onSend: (text: string) => void
}

const prompts = [
  { icon: <MessageSquare size={16} />, label: 'Explain photosynthesis simply' },
  { icon: <CheckCircle size={16} />, label: 'Can you check my working for this equation?' },
  { icon: <Camera size={16} />, label: 'Scan a question from my textbook' },
]

export function EmptyState({ onSend }: Props) {
  return (
    <div className="text-center py-8">
      <div className="w-[52px] h-[52px] rounded-[16px] bg-brand-50 flex items-center justify-center mx-auto mb-3.5">
        <BrainCircuit size={22} className="text-brand-600" />
      </div>
      <p className="text-[14px] text-ash font-semibold mb-1">Ask about any topic, in any subject</p>
      <p className="text-[12px] text-ash mb-6">Type it, say it, or scan a question — every answer is grounded in your syllabus.</p>
      <div className="max-w-[340px] mx-auto space-y-2">
        {prompts.map((p, i) => (
          <button key={i} onClick={() => onSend(p.label)}
            className="flex items-center gap-2.5 w-full bg-surface-50 border border-ash-line rounded-[14px] px-3.5 py-[11px] text-[13.5px] font-semibold text-left cursor-pointer hover:border-brand-600 transition">
            <span className="text-surface-900 shrink-0">{p.icon}</span> {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
