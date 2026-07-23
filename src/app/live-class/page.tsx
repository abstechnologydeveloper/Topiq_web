'use client'

import { useState } from 'react'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { ArrowLeft, ChevronRight, Lightbulb } from 'lucide-react'

const GRADE_LEVEL = 'SS2'

const SCHEDULE = [
  { time: '8:00 AM – 9:30 AM', subject: 'Biology', topic: 'Cell Structure & Function', status: 'completed' as const, slug: 'biology' },
  { time: '10:00 AM – 11:30 AM', subject: 'Chemistry', topic: 'Atomic Structure', status: 'live' as const, slug: 'chemistry' },
  { time: '12:00 PM – 1:30 PM', subject: 'Physics', topic: 'Motion & Forces', status: 'upcoming' as const, slug: 'physics' },
  { time: '2:00 PM – 3:30 PM', subject: 'Mathematics', topic: 'Algebra', status: 'upcoming' as const, slug: 'mathematics' },
]

export default function LiveClassPage() {
  const [activeView, setActiveView] = useState<'hub' | 'live'>('hub')
  const [liveSession, setLiveSession] = useState<typeof SCHEDULE[0] | null>(null)
  const [liveTab, setLiveTab] = useState<'learn' | 'practice' | 'interactive'>('learn')

  const joinSession = (s: typeof SCHEDULE[0]) => {
    setLiveSession(s)
    setActiveView('live')
    setLiveTab('learn')
  }

  const endSession = () => {
    setActiveView('hub')
    setLiveSession(null)
  }

  if (activeView === 'live' && liveSession) {
    return (
      <div>
        <button onClick={() => setActiveView('hub')}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-ash mb-3 cursor-pointer bg-transparent border-none">
          <ArrowLeft size={15} />
          Back to schedule
        </button>

        <div className="bg-gradient-to-r from-coral to-[#C23350] text-white rounded-[14px] p-3.5 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-[9px] h-[9px] rounded-full bg-white shrink-0 animate-pulse" />
            <div className="font-mono text-[10px] font-bold text-[#FFD9E0] uppercase tracking-[.04em]">Live now</div>
            <button onClick={endSession}
              className="ml-auto bg-white text-coral border-none px-3.5 py-1.5 rounded-[16px] font-bold text-[11px] cursor-pointer shrink-0">End session</button>
          </div>
          <div className="font-bold text-[17px] mt-1">{liveSession.topic}</div>
          <div className="font-mono text-[11px] font-bold text-[#FFD9E0] uppercase tracking-[.06em] mt-1.5">{liveSession.slug}</div>
          <div className="font-bold text-[14px] mt-0.5">{liveSession.subject} · {GRADE_LEVEL}</div>
        </div>

        <div className="flex gap-1 mb-4 border-b border-ash-line">
          {(['learn', 'practice', 'interactive'] as const).map(t => (
            <button key={t} onClick={() => setLiveTab(t)}
              className={`flex-1 pb-2.5 text-[13px] font-bold cursor-pointer border-b-2 transition bg-transparent ${
                liveTab === t ? 'text-surface-900 border-brand-600' : 'text-ash border-transparent'
              }`}>{t === 'learn' ? 'Learn' : t === 'practice' ? 'Practice' : 'Interactive'}</button>
          ))}
        </div>

        {liveTab === 'learn' && (
          <div>
            <Eyebrow>Following along with your teacher</Eyebrow>
            <div className="bg-surface-50 border border-ash-line rounded-[14px] p-5 text-center">
              <div className="text-[32px] mb-2">📺</div>
              <p className="text-[13.5px] text-ink-soft">Your teacher is sharing their screen. The lesson content will appear here.</p>
            </div>
          </div>
        )}

        {liveTab === 'practice' && (
          <div>
            <Eyebrow>Try it yourself</Eyebrow>
            <div className="bg-surface-50 border border-ash-line rounded-[14px] p-4">
              <p className="text-[13px] text-ink-soft mb-3">Practise the topic your teacher is covering right now — your results feed straight back into this class&apos;s mastery.</p>
              <button className="bg-surface-900 text-surface-50 border-none px-5 py-2.5 rounded-[20px] font-bold text-[12.5px] cursor-pointer">Practise this topic →</button>
            </div>
          </div>
        )}

        {liveTab === 'interactive' && (
          <div>
            <Eyebrow>Answer live, together</Eyebrow>
            <div className="bg-surface-50 border border-ash-line rounded-[14px] p-4">
              <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Question from your teacher</span>
              <p className="text-[15px] font-semibold text-surface-900 mb-3">What is the function of the mitochondria?</p>
              <div className="space-y-2">
                {['Protein synthesis', 'ATP production', 'Lipid storage', 'DNA replication'].map((opt, i) => (
                  <div key={i}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 border border-ash-line rounded-[12px] text-[13.5px] font-medium cursor-pointer hover:border-brand-600 transition">
                    <span className="w-[20px] h-[20px] rounded-full bg-paper-dim flex items-center justify-center font-mono text-[10.5px] font-semibold shrink-0">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3 text-[11.5px] text-ash font-mono">12 responses so far</div>
            </div>
          </div>
        )}

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

  return (
    <div>
      <Eyebrow>Live Class</Eyebrow>
      <PageTitle title="Today's classes" sub="Your schedule for today — tap the live one to jump in." />

      <div className="space-y-2.5">
        {SCHEDULE.map((s, i) => (
          <div key={i}
            onClick={() => s.status === 'live' && joinSession(s)}
            className={`flex items-center gap-3 bg-surface-50 border rounded-[14px] p-3.5 transition ${
              s.status === 'live'
                ? 'border-brand-600 bg-brand-50 cursor-pointer hover:-translate-y-0.5'
                : s.status === 'completed'
                ? 'border-ash-line opacity-50'
                : 'border-ash-line cursor-default'
            }`}>
            <div className="font-mono font-bold text-[12.5px] text-ash w-[46px] shrink-0">{s.time.split(' – ')[0]}</div>
            <div className="w-[38px] h-[38px] rounded-[10px] bg-paper-dim flex items-center justify-center text-[17px] shrink-0">
              {s.subject === 'Biology' && '🧬'}
              {s.subject === 'Chemistry' && '⚗️'}
              {s.subject === 'Physics' && '⚡'}
              {s.subject === 'Mathematics' && '📐'}
              {s.subject === 'English' && '📖'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[13.5px] text-surface-900">{s.topic}</div>
              <div className="text-[11.5px] text-ash">{s.subject} · SS2</div>
            </div>
            <div className="flex items-center gap-1.5">
              {s.status === 'live' && (
                <span className="flex items-center gap-1.5 font-bold text-[11.5px] text-brand-600">
                  <span className="w-[7px] h-[7px] rounded-full bg-brand-600 animate-pulse" />
                  Live
                </span>
              )}
              {s.status === 'completed' && <span className="font-bold text-[11.5px] text-ash">Completed</span>}
              {s.status === 'upcoming' && <span className="font-bold text-[11.5px] text-ash">{s.time.split(' – ')[1]}</span>}
              {s.status === 'live' && <ChevronRight size={16} className="text-brand-600" />}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
