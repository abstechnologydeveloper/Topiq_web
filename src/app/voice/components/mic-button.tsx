import { Mic } from 'lucide-react'

interface Props {
  mode: 'idle' | 'listening' | 'thinking' | 'answered'
  onToggle: () => void
}

export function MicButton({ mode, onToggle }: Props) {
  return (
    <div className={`w-[132px] h-[132px] rounded-full flex items-center justify-center transition-all duration-200 ${
      mode === 'listening' ? 'bg-coral-soft animate-pulse' :
      mode === 'thinking' ? 'bg-ember-soft' : 'bg-brand-50'
    }`}>
      <button onClick={onToggle}
        className={`w-[76px] h-[76px] rounded-full border-none flex items-center justify-center cursor-pointer transition-all ${
          mode === 'listening' ? 'bg-coral' :
          mode === 'thinking' ? 'bg-secondary-500' : 'bg-brand-600'
        }`}>
        <Mic size={30} className="text-white" />
      </button>
    </div>
  )
}
