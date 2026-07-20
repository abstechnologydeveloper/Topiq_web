'use client'

import { useState, useRef, useEffect } from 'react'
import { SUBJECTS } from '@/lib/data'
import { Eyebrow, UsageChip } from '@/components/ui/shared'
import { ArrowRight, ChevronRight, Mic } from 'lucide-react'
import { EmptyState } from './components/empty-state'
import { ChatMessage } from './components/chat-message'
import { TypingIndicator } from './components/typing-indicator'
import { ChatInput } from './components/chat-input'

interface Msg { isUser: boolean; text: string; ref?: string }

export default function AskPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const send = (text?: string) => {
    const msg = (text || input).trim()
    if (!msg) return
    setMessages(prev => [...prev, { isUser: true, text: msg }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, {
        isUser: false,
        text: `Here's what I found about "${msg}" — photosynthesis is the process by which green plants convert light energy into chemical energy. The key equation is 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. This is covered in the WAEC Biology syllabus under the topic "Photosynthesis" and is a common exam question.`,
        ref: '§ WAEC Biology — Photosynthesis',
      }])
    }, 800)
  }

  const contextChips = ['All subjects', ...SUBJECTS.map(s => s.name)]

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <Eyebrow>Grounded help, any subject</Eyebrow>
        <h1 className="font-display text-[25px] font-semibold tracking-[-0.01em] text-surface-900 mb-1">Sabi AI</h1>
        <p className="text-[13.5px] text-ash mb-4">AbSTopiq's AI — type it, say it, or scan it. Every answer traces back to your syllabus.</p>
      </div>

      <UsageChip label="3 questions left today (free plan)" link={<span>Get unlimited <ArrowRight size={12} className="inline" /></span>} />

      <div onClick={() => window.location.href = '/voice'}
        className="flex items-center gap-3 bg-brand-50 border border-ash-line rounded-[16px] p-3.5 mb-4 cursor-pointer hover:-translate-y-[1px] transition-all">
        <div className="w-[44px] h-[44px] rounded-full bg-surface-50 flex items-center justify-center shrink-0 text-surface-900">
          <Mic size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[14.5px] text-surface-900">Voice Learning</div>
          <div className="text-[12px] text-ink-soft mt-0.5">Talk it through — Sabi AI listens and answers out loud</div>
        </div>
        <ChevronRight size={18} className="text-brand-600 shrink-0" />
      </div>

      {messages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 no-scrollbar">
          {['Biology', 'Chemistry', 'Physics', 'Mathematics', 'English'].map(s => (
            <button key={s}
              className="shrink-0 text-[12.5px] font-bold px-3.5 py-1.5 rounded-full border border-ash-line bg-surface-50 text-ash cursor-pointer whitespace-nowrap hover:border-brand-600 hover:text-brand-600 transition">
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState onSend={send} />
        ) : (
          messages.map((m, i) => (
            <ChatMessage key={i} isUser={m.isUser} text={m.text} ref={m.ref} />
          ))
        )}

        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <ChatInput value={input} onChange={setInput} onSend={() => send()} />
    </div>
  )
}
