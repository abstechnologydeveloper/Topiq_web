import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lightbulb, BookOpen, PenTool, Users } from 'lucide-react'
import { Eyebrow } from '@/components/ui/shared'
import type { ScheduleItem } from './schedule-card'

const GRADE_LEVEL = 'SS2'

interface Props {
  session: ScheduleItem
  onBack: () => void
  onEnd: () => void
}

export function LiveSession({ session, onBack, onEnd }: Props) {
  const [liveTab, setLiveTab] = useState<'learn' | 'practice' | 'interactive'>('learn')

  return (
    <div>
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-ash mb-3 cursor-pointer bg-transparent border-none">
        <ArrowLeft size={15} />
        Back to schedule
      </button>

      <div className="bg-gradient-to-r from-coral to-[#C23350] text-white rounded-[14px] p-3.5 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-[9px] h-[9px] rounded-full bg-white shrink-0 animate-pulse" />
          <div className="font-mono text-[10px] font-bold text-[#FFD9E0] uppercase tracking-[.04em]">Live now</div>
          <button onClick={onEnd}
            className="ml-auto bg-white text-coral border-none px-3.5 py-1.5 rounded-[16px] font-bold text-[11px] cursor-pointer shrink-0">End session</button>
        </div>
        <div className="font-bold text-[17px] mt-1">{session.topic}</div>
        <div className="font-bold text-[14px] mt-0.5">{session.subject} · {GRADE_LEVEL}</div>
      </div>

      <div className="flex gap-1 mb-4 border-b border-ash-line">
        {(['learn', 'practice', 'interactive'] as const).map(t => (
          <button key={t} onClick={() => setLiveTab(t)}
            className={`flex-1 pb-2.5 text-[13px] font-bold cursor-pointer border-b-2 transition bg-transparent ${
              liveTab === t ? 'text-surface-900 border-brand-600' : 'text-ash border-transparent'
            }`}>
            {t === 'learn' ? 'Learn' : t === 'practice' ? 'Practice' : 'Interactive'}
          </button>
        ))}
      </div>

      {liveTab === 'learn' && <LearnTab subject={session.subject} topic={session.topic} />}
      {liveTab === 'practice' && <PracticeTab subject={session.subject} slug={session.slug} />}
      {liveTab === 'interactive' && <InteractiveTab />}
    </div>
  )
}

function LearnTab({ subject, topic }: { subject: string; topic: string }) {
  return (
    <div>
      <Eyebrow>Following along with your teacher</Eyebrow>
      <div className="bg-surface-50 border border-ash-line rounded-[14px] p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-brand-50 flex items-center justify-center text-[18px] shrink-0">
            <BookOpen size={18} className="text-brand-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[14px] text-surface-900">{topic}</div>
            <div className="text-[12px] text-ash">{subject} · SS2</div>
          </div>
        </div>
        <p className="text-[13.5px] text-ink-soft leading-[1.6]">
          Your teacher is now covering <strong>{topic}</strong>. Follow along with the explanations, 
          examples, and diagrams shared on screen. Take notes and prepare for the practice session.
        </p>
        <div className="mt-3 flex items-center gap-2 text-[12px] text-ash">
          <span className="w-[6px] h-[6px] rounded-full bg-green-500" />
          Recording in progress
        </div>
      </div>

      <div className="mt-6 bg-surface-900 text-surface-50 rounded-[14px] p-4 flex gap-3 items-start">
        <Lightbulb size={20} className="text-ember-soft shrink-0 mt-0.5" />
        <div>
          <span className="font-mono text-[10px] font-bold text-ember-soft uppercase tracking-[.05em] block mb-2">Key takeaway</span>
          <ul className="space-y-1.5">
            <li className="text-[13px] leading-[1.55] flex items-start gap-2"><span className="text-ember mt-1 shrink-0">•</span><span>Follow your teacher&apos;s explanations and examples carefully.</span></li>
            <li className="text-[13px] leading-[1.55] flex items-start gap-2"><span className="text-ember mt-1 shrink-0">•</span><span>Use the Practice tab to test your understanding of this topic.</span></li>
            <li className="text-[13px] leading-[1.55] flex items-start gap-2"><span className="text-ember mt-1 shrink-0">•</span><span>Answer polls in the Interactive tab to see how your classmates compare.</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function PracticeTab({ subject, slug }: { subject: string; slug: string }) {
  const router = useRouter()

  return (
    <div>
      <Eyebrow>Try it yourself</Eyebrow>
      <div className="bg-surface-50 border border-ash-line rounded-[14px] p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-amber-50 flex items-center justify-center shrink-0">
            <PenTool size={18} className="text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[14px] text-surface-900">Practice questions</div>
            <div className="text-[12px] text-ash">{subject}</div>
          </div>
        </div>
        <p className="text-[13px] text-ink-soft mb-3 leading-[1.6]">
          Practise the topic your teacher is covering right now — your results feed straight back into this class&apos;s mastery.
        </p>
        <button onClick={() => router.push(`/practice/session?subject=${slug}&dur=20&count=10`)}
          className="bg-surface-900 text-surface-50 border-none px-5 py-2.5 rounded-[20px] font-bold text-[12.5px] cursor-pointer">Practise this topic →</button>
      </div>
    </div>
  )
}

const POLL_OPTIONS = ['Protein synthesis', 'ATP production', 'Lipid storage', 'DNA replication']
const CORRECT_INDEX = 1

// simulated votes across the class (in a real app this would come from the server)
const MOCK_VOTES = [3, 12, 2, 5]

function InteractiveTab() {
  const [selected, setSelected] = useState<number | null>(null)

  const total = MOCK_VOTES.reduce((a, b) => a + b, 0)
  const showResults = selected !== null

  return (
    <div>
      <Eyebrow>Answer live, together</Eyebrow>
      <div className="bg-surface-50 border border-ash-line rounded-[14px] p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-violet-50 flex items-center justify-center shrink-0">
            <Users size={18} className="text-violet-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[14px] text-surface-900">Live poll</div>
            <div className="text-[12px] text-ash">Answer with your class</div>
          </div>
        </div>
        <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Question from your teacher</span>
        <p className="text-[15px] font-semibold text-surface-900 mb-3">What is the function of the mitochondria?</p>
        <div className="space-y-2">
          {POLL_OPTIONS.map((opt, i) => {
            const voteShare = total > 0 ? Math.round((MOCK_VOTES[i] / total) * 100) : 0
            const isCorrect = i === CORRECT_INDEX
            const isSelected = selected === i
            const isWrongSelected = isSelected && !isCorrect

            return (
              <div key={i} onClick={() => setSelected(i)}
                className="relative flex items-center gap-2.5 px-3.5 py-2.5 border rounded-[12px] text-[13.5px] font-medium transition cursor-pointer overflow-hidden"
                style={{ borderColor: showResults ? (isCorrect ? '#16a34a' : isSelected ? '#dc2626' : '#e6e6e6') : '#e6e6e6' }}>
                <div className="absolute inset-0 rounded-[12px] transition-all" style={{
                  width: showResults ? `${voteShare}%` : '0%',
                  background: isCorrect ? '#dcfce7' : '#fee2e2',
                  opacity: showResults ? 1 : 0,
                }} />
                <span className="w-[20px] h-[20px] rounded-full bg-paper-dim flex items-center justify-center font-mono text-[10.5px] font-semibold shrink-0 relative">{String.fromCharCode(65 + i)}</span>
                <span className="relative flex-1">{opt}</span>
                {showResults && (
                  <span className={`relative font-bold text-[12px] font-mono ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                    {voteShare}%
                  </span>
                )}
                {showResults && isCorrect && (
                  <span className="relative text-[12px]">✅</span>
                )}
                {isWrongSelected && (
                  <span className="relative text-[12px]">✘</span>
                )}
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-2 mt-3 text-[11.5px] text-ash font-mono">{total} responses so far</div>
      </div>
    </div>
  )
}
