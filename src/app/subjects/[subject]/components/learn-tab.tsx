import type { Topic, Subject } from '@/lib/types'
import { Eyebrow, GroundingChip } from '@/components/ui/shared'
import { ArrowRight, Camera, Mic, Send } from 'lucide-react'

interface Props {
  subj: Subject
  slug: string
  topics: Topic[]
}

export function LearnTab({ subj, slug, topics }: Props) {
  return (
    <div className="relative min-h-[calc(100vh-22rem)]">
      <div className="pb-4">
        <Eyebrow>Watch, read & understand</Eyebrow>
        <div className="space-y-2.5">
          {topics.map(t => (
            <div key={t.id}
              onClick={() => window.location.href = `/subjects/${slug}/${t.id}`}
              className="flex gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3 cursor-pointer hover:border-brand-600 hover:-translate-y-[1px] transition-all">
              <div className="w-[76px] h-[76px] rounded-[12px] shrink-0 flex items-center justify-center relative" style={{ background: `${subj.colorHex}18` }}>
                <span className="text-surface-900 text-[24px]">{subj.icon}</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="text-[14px] font-bold text-surface-900 mb-1 leading-[1.3]">{t.name}</div>
                <div className="text-[11.5px] text-ash flex items-center gap-2 mb-1.5">
                  <span className="font-mono font-semibold">{t.questions.length} questions</span>
                </div>
                <p className="text-[12.5px] text-ink-soft line-clamp-2 leading-[1.5]">{t.tutorial.split('\n')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Eyebrow className="block mb-3">Still stuck? Ask Sabi AI right here</Eyebrow>
      <div className="flex items-center justify-between bg-paper-dim rounded-[12px] px-3.5 py-2.5 mb-3 text-[12px]">
        <span className="font-bold">3 questions left today (free plan)</span>
        <span className="font-mono font-bold text-brand-600 underline cursor-pointer flex items-center gap-1">Get unlimited <ArrowRight size={12} /></span>
      </div>

      <div className="h-4" />

      <div className="fixed bottom-0 left-0 right-0 lg:left-56 bg-gradient-to-t from-surface-50 via-surface-50 to-transparent pt-6 pb-4">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-1.5 border border-ash-line rounded-[26px] px-2 py-1.5 bg-surface-50">
            <button className="w-[36px] h-[36px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0 hover:bg-ash-line transition">
              <Camera size={18} className="text-ash" />
            </button>
            <button className="w-[36px] h-[36px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0 hover:bg-ash-line transition">
              <Mic size={16} className="text-ash" />
            </button>
            <input type="text" placeholder={`Ask about ${subj.name}…`}
              className="flex-1 border-none outline-none text-[14px] font-sans bg-transparent text-surface-900 placeholder:text-ash px-2" />
            <button className="w-[36px] h-[36px] rounded-full bg-secondary-500 flex items-center justify-center cursor-pointer shrink-0">
              <Send size={16} className="text-surface-900" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
