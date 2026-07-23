import { Image, Mic, Send } from 'lucide-react'

interface Props {
  value: string
  onChange: (v: string) => void
  onSend: () => void
}

export function ChatInput({ value, onChange, onSend }: Props) {
  return (
    <div>
      <p className="text-[11px] text-ash mb-2 text-center font-medium">Sabi AI can make mistakes. Check important info.</p>
      <div className="flex items-center gap-1.5 border border-ash-line rounded-[26px] px-2 py-1.5 bg-surface-50">
        <button className="w-[36px] h-[36px] rounded-full bg-paper-dim items-center justify-center cursor-pointer shrink-0 hover:bg-ash-line transition hidden sm:flex">
          <Image size={18} className="text-ash" />
        </button>
        <button className="w-[36px] h-[36px] rounded-full bg-paper-dim items-center justify-center cursor-pointer shrink-0 hover:bg-ash-line transition hidden sm:flex">
          <Mic size={16} className="text-ash" />
        </button>
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSend()}
          placeholder="Ask anything, any subject…"
          className="flex-1 min-w-0 border-none outline-none text-[14px] font-sans bg-transparent text-surface-900 placeholder:text-ash px-1" />
        <button onClick={onSend}
          className="w-[36px] h-[36px] rounded-full bg-secondary-500 flex items-center justify-center cursor-pointer shrink-0">
          <Send size={16} className="text-surface-900" />
        </button>
      </div>
    </div>
  )
}
