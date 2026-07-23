'use client'

import { use, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { GroundingChip } from '@/components/ui/shared'
import { ArrowLeft, Play, Pause, Volume2, Check, X, Lightbulb, ChevronRight } from 'lucide-react'

const KEY_TAKEAWAYS: Record<string, string[]> = {
  'bio-cell': [
    'Cells are the basic unit of life — all living organisms are made of cells.',
    'Key organelles include the nucleus (DNA), mitochondria (ATP), and ribosomes (protein synthesis).',
    'Plant cells have cell walls, chloroplasts, and larger vacuoles — animal cells do not.',
  ],
  'bio-photo': [
    'Photosynthesis converts light energy into chemical energy (glucose).',
    'Equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
    'Rate is affected by light intensity, CO₂ concentration, and temperature.',
  ],
  'bio-nutrition': [
    'Iodine test: starch → blue-black colour.',
    "Benedict's test: reducing sugars → brick-red precipitate.",
    'Biuret test: proteins → purple colour.',
  ],
  'bio-ecology': [
    'Ecology studies the interaction between organisms and their environment.',
    'A population is the same species in an area; a community is all populations.',
    'An ecosystem includes both biotic (living) and abiotic (non-living) factors.',
  ],
  'bio-genetics': [
    'Genotype is the genetic makeup; phenotype is the observable characteristic.',
    'A monohybrid cross between two heterozygotes gives a 3:1 phenotypic ratio.',
    'Mendel\'s laws: segregation and independent assortment.',
  ],
  'chem-atom': [
    'Atomic number (Z) = number of protons. Mass number (A) = protons + neutrons.',
    'Isotopes have the same Z but different A (different neutron count).',
    'Electronic configuration follows the 2, 8, 8 pattern for the first 20 elements.',
  ],
  'chem-bond': [
    'Ionic bonding: transfer of electrons between a metal and a non-metal.',
    'Covalent bonding: sharing of electrons between non-metals.',
    'Dot-and-cross diagrams are common WAEC questions.',
  ],
  'chem-acid': [
    'Acids have pH < 7, bases have pH > 7, neutral solutions have pH = 7.',
    'Acid + Base → Salt + Water (neutralisation).',
    'Litmus: blue → red in acid, red → blue in base.',
  ],
  'phys-motion': [
    "Newton's First Law: inertia — an object stays at rest or uniform motion unless acted upon.",
    "Newton's Second Law: F = ma.",
    "Newton's Third Law: every action has an equal and opposite reaction.",
  ],
  'phys-elec': [
    "Ohm's Law: V = IR.",
    'Series: R = R₁ + R₂ + ...  Parallel: 1/R = 1/R₁ + 1/R₂ + ...',
    'Power: P = IV.',
  ],
  'math-alg': [
    'Quadratic formula: x = [-b ± √(b²-4ac)] / 2a.',
    'Factorisation, completing the square, and the formula are the three methods.',
    'Difference of two squares: a² - b² = (a-b)(a+b).',
  ],
  'math-trig': [
    'SOH CAH TOA: sin = O/H, cos = A/H, tan = O/A.',
    'sin 30° = ½, sin 45° = 1/√2, sin 60° = √3/2.',
  ],
  'eng-comp': [
    'Read the passage twice — once for gist, once for detail.',
    'Answer in your own words — WAEC penalises direct copying.',
    'Underline key phrases as you read.',
  ],
  'eng-essay': [
    'Structure: Introduction → Body (3-4 paragraphs) → Conclusion.',
    'Five types: Narrative, Descriptive, Argumentative, Expository, Letter.',
    'Stay on topic and manage your time.',
  ],
}

export default function TopicPage({ params }: { params: Promise<{ subject: string; topic: string }> }) {
  const { subject: slug, topic: topicSlug } = use(params)
  const subj = SUBJECTS.find(s => s.id === slug)
  const topic = TOPICS.find(t => t.id === topicSlug)

  const [selected, setSelected] = useState<number | null>(null)
  const [showExplain, setShowExplain] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  if (!subj || !topic) return <div className="text-center py-20 text-ash">Topic not found</div>

  const q = topic.questions[0]
  const isComplete = selected !== null

  const handleSelect = (idx: number) => {
    if (isComplete) return
    setSelected(idx)
    setShowExplain(true)
  }

  const toggleSpeech = useCallback(() => {
    if (!window.speechSynthesis) return
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      setPlaying(false)
      return
    }
    const clean = topic.tutorial.replace(/\n/g, ' ')
    const utterance = new SpeechSynthesisUtterance(clean)
    utterance.rate = 0.9
    utterance.onstart = () => { setSpeaking(true); setPlaying(true) }
    utterance.onend = () => { setSpeaking(false); setPlaying(false) }
    utterance.onpause = () => setPlaying(false)
    utterance.onresume = () => setPlaying(true)
    synthRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [topic.tutorial, speaking])

  const takeaways = KEY_TAKEAWAYS[topic.id] || [
    'Review the tutorial notes above for key concepts.',
    'Practice the questions below to test your understanding.',
    'Use flashcards to reinforce what you\'ve learned.',
  ]

  return (
    <div>
      <div className="sticky top-0 bg-surface-50 z-10 pt-2 pb-0">
        <div className="flex items-center gap-3 mb-3">
          <Link href={`/subjects/${slug}`}
            className="w-[34px] h-[34px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0">
            <ArrowLeft size={16} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10.5px] font-bold text-brand-600 uppercase tracking-[.06em] mb-0">{subj.name}</div>
            <h2 className="font-display text-[18px] font-semibold leading-[1.25] text-surface-900">{topic.name}</h2>
          </div>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto mt-4">
        <div className="flex items-center gap-3 bg-violet-soft border border-violet rounded-[14px] p-3 mb-5">
          <button onClick={toggleSpeech}
            className="w-[42px] h-[42px] rounded-full bg-violet flex items-center justify-center cursor-pointer shrink-0 text-white">
            {speaking ? <Pause size={18} /> : playing ? <Volume2 size={18} /> : <Play size={18} />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-bold text-surface-900">Listen to this lesson</div>
            <div className="text-[11px] text-ink-soft">{speaking ? 'Playing...' : 'Tap to play audio narration'}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-paper-dim rounded-[14px] p-4 flex items-center justify-center">
            <span className="text-[32px] text-surface-900">{subj.icon}</span>
          </div>

          <p className="text-[14.5px] leading-[1.7] text-ink-soft text-left">{topic.tutorial.split('\n')[0]}</p>

          {topic.tutorial.split('\n').slice(1).map((line, i) => {
            if (line.startsWith('•') || line.startsWith('-')) {
              return <li key={i} className="text-[14px] text-ink-soft ml-4 leading-[1.6] text-left">{line.replace(/^[•-]\s*/, '')}</li>
            }
            if (line.trim()) {
              return <p key={i} className="text-[14.5px] leading-[1.7] text-ink-soft text-left">{line}</p>
            }
            return null
          })}

          {topic.tutorial.split('\n').length > 2 && (
            <GroundingChip text={`WAEC ${subj.name} — ${topic.name}`} />
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-ash-line">
          <span className="font-mono text-[10.5px] font-bold text-ember text-uppercase tracking-[.05em] block mb-3">Quick check</span>
          {q ? (
            <div className="bg-ember-soft border border-ember rounded-[14px] p-4">
              <p className="text-[13.5px] font-semibold text-surface-900 mb-3 leading-[1.5]">{q.text}</p>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  let cls = 'border-ash-line bg-surface-50'
                  if (isComplete && i === q.correctIndex) cls = 'border-surface-900 bg-surface-900 text-surface-50'
                  else if (isComplete && i === selected && i !== q.correctIndex) cls = 'border-ash-line bg-paper-dim text-ash line-through'
                  else if (selected === i) cls = 'border-ember bg-ember-soft'

                  return (
                    <div key={i} onClick={() => handleSelect(i)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 border-[1.5px] rounded-[12px] cursor-pointer text-[13.5px] font-medium transition ${cls}`}>
                      <span className="w-[20px] h-[20px] rounded-full bg-paper-dim flex items-center justify-center font-mono text-[10.5px] font-semibold shrink-0"
                        style={isComplete && i === q.correctIndex ? { background: '#fff', color: 'var(--color-surface-900)' } : {}}>
                        {isComplete && i === q.correctIndex ? <Check size={12} /> : isComplete && i === selected ? <X size={12} /> : String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </div>
                  )
                })}
              </div>
              {isComplete && (
                <div className="mt-3 bg-surface-50 rounded-[10px] p-3 animate-fadeIn">
                  <p className="text-[12.5px] leading-[1.55] text-ink-soft">{q.explanation}</p>
                  <GroundingChip text={`§ WAEC ${subj.name} — ${topic.name}`} />
                </div>
              )}
            </div>
          ) : (
            <p className="text-[13px] text-ash">No questions available for this topic.</p>
          )}
        </div>

        <div className="mt-6 bg-surface-900 text-surface-50 rounded-[14px] p-4 flex gap-3 items-start">
          <Lightbulb size={20} className="text-ember-soft shrink-0 mt-0.5" />
          <div>
            <span className="font-mono text-[10px] font-bold text-ember-soft uppercase tracking-[.05em] block mb-2">Key takeaway</span>
            <ul className="space-y-1.5">
              {takeaways.map((t, i) => (
                <li key={i} className="text-[13px] leading-[1.55] flex items-start gap-2">
                  <span className="text-ember mt-1 shrink-0">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link href={`/subjects/${slug}`}
          className="mt-6 w-full h-11 rounded-[22px] bg-brand-600 text-white font-bold text-[13px] flex items-center justify-center gap-2 no-underline cursor-pointer hover:bg-brand-700 transition">
          Finish lesson <ChevronRight size={15} />
        </Link>

        <div className="h-8" />
      </div>
    </div>
  )
}
