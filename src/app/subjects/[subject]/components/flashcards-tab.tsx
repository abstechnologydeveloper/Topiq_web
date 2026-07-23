import { Eyebrow } from '@/components/ui/shared'

interface Props {
  flipped: boolean
  fcIdx: number
  fcCards: number[]
  fcDone: boolean
  allCards: { question: string; answer: string }[]
  onFlip: () => void
  onRate: (rating: string) => void
  onRestart: () => void
}

export function FlashcardsTab({ flipped, fcIdx, fcCards, fcDone, allCards, onFlip, onRate, onRestart }: Props) {
  if (fcDone) {
    return (
      <div className="text-center py-8 bg-surface-50 border border-ash-line rounded-[--radius] p-6">
        <Eyebrow className="justify-center">Deck reviewed</Eyebrow>
        <p className="text-[14px] text-ash mb-3">Cards marked "Again" will resurface sooner next session.</p>
        <button onClick={onRestart} className="bg-surface-900 text-surface-50 border-none px-5 py-2.5 rounded-[20px] font-bold text-[12.5px] cursor-pointer">
          Review again
        </button>
      </div>
    )
  }

  if (allCards.length === 0 || fcCards.length === 0) {
    return <div className="text-center py-12 text-ash">No flashcards for this subject yet.</div>
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[420px] h-[190px] perspective-[1000px] mb-3.5 cursor-pointer"
        onClick={onFlip}>
        <div className={`relative w-full h-full transition-transform duration-500 ${flipped ? '[transform:rotateY(180deg)]' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 backface-hidden rounded-[16px] flex items-center justify-center text-center p-6 font-semibold text-[16px] bg-violet-soft text-surface-900 border border-violet"
            style={{ backfaceVisibility: 'hidden' }}>
            {allCards[fcCards[fcIdx % fcCards.length]]?.question}
          </div>
          <div className="absolute inset-0 backface-hidden rounded-[16px] flex items-center justify-center text-center p-6 font-medium text-[14px] leading-[1.5] bg-surface-900 text-surface-50"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            {allCards[fcCards[fcIdx % fcCards.length]]?.answer}
          </div>
        </div>
      </div>
      <div className="font-mono text-[12px] text-ash mb-2.5">Card {fcIdx + 1} of {allCards.length} · tap to flip</div>
      {flipped && (
        <div className="flex gap-2 w-full max-w-[420px]">
          <button onClick={() => onRate('again')} className="flex-1 border border-ash-line bg-surface-50 rounded-[12px] py-2.5 font-bold text-[12px] text-coral cursor-pointer hover:bg-coral-soft transition">Again</button>
          <button onClick={() => onRate('good')} className="flex-1 border border-ash-line bg-surface-50 rounded-[12px] py-2.5 font-bold text-[12px] text-secondary-500 cursor-pointer hover:bg-ember-soft transition">Good</button>
          <button onClick={() => onRate('easy')} className="flex-1 border border-ash-line bg-surface-50 rounded-[12px] py-2.5 font-bold text-[12px] text-brand-600 cursor-pointer hover:bg-brand-50 transition">Easy</button>
        </div>
      )}
    </div>
  )
}
