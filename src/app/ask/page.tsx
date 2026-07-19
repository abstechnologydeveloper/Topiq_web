'use client'

import { useState, useRef, useEffect } from 'react'
import { SUBJECTS } from '@/lib/data'
import { Eyebrow, UsageChip } from '@/components/ui/shared'

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

  const contextChips = ['All subjects']
  SUBJECTS.forEach(s => contextChips.push(s.icon + ' ' + s.name))

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <Eyebrow>Grounded help, any subject</Eyebrow>
        <h1 className="font-display text-[25px] font-semibold tracking-[-0.01em] text-surface-900 mb-1">Sabi AI</h1>
        <p className="text-[13.5px] text-ash mb-4">AbSTopiq's AI — type it, say it, or scan it. Every answer traces back to your syllabus.</p>
      </div>

      <UsageChip label="3 questions left today (free plan)" link="Get unlimited →" />

      <div onClick={() => window.location.href = '/voice'}
        className="flex items-center gap-3 bg-brand-50 border border-ash-line rounded-[16px] p-3.5 mb-4 cursor-pointer hover:-translate-y-[1px] transition-all">
        <div className="w-[44px] h-[44px] rounded-full bg-surface-50 flex items-center justify-center text-[20px] shrink-0">
          🎙️
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[14.5px] text-surface-900">Voice Learning</div>
          <div className="text-[12px] text-ink-soft mt-0.5">Talk it through — Sabi AI listens and answers out loud</div>
        </div>
        <svg className="text-brand-600 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
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
          <div className="text-center py-8">
            <div className="w-[52px] h-[52px] rounded-[16px] bg-brand-50 flex items-center justify-center mx-auto mb-3.5 text-[22px]">🧠</div>
            <p className="text-[14px] text-ash font-semibold mb-1">Ask about any topic, in any subject</p>
            <p className="text-[12px] text-ash mb-6">Type it, say it, or scan a question — every answer is grounded in your syllabus.</p>
            <div className="max-w-[340px] mx-auto space-y-2">
              {[
                { icon: '💬', label: 'Explain photosynthesis simply' },
                { icon: '✅', label: 'Can you check my working for this equation?' },
                { icon: '📷', label: 'Scan a question from my textbook' },
              ].map((p, i) => (
                <button key={i} onClick={() => send(p.label)}
                  className="flex items-center gap-2.5 w-full bg-surface-50 border border-ash-line rounded-[14px] px-3.5 py-[11px] text-[13.5px] font-semibold text-left cursor-pointer hover:border-brand-600 transition">
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.isUser ? 'justify-end' : 'justify-start'}`}>
              {!m.isUser && (
                <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-surface-50 text-[10px] font-bold shrink-0">AI</div>
              )}
              <div className={`max-w-[88%] rounded-[14px] px-3.5 py-3 text-[14px] leading-[1.5] ${
                m.isUser
                  ? 'bg-surface-900 text-surface-50 rounded-br-[4px]'
                  : 'bg-surface-50 border border-ash-line rounded-bl-[4px]'
              }`}>
                <p>{m.text}</p>
                {m.ref && (
                  <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-brand-50 text-brand-600 text-[11px] rounded-full font-medium">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {m.ref}
                  </span>
                )}
              </div>
            </div>
          ))
        )}

        {typing && (
          <div className="flex gap-2 justify-start">
            <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-surface-50 text-[10px] font-bold shrink-0">AI</div>
            <div className="bg-surface-50 border border-ash-line rounded-[14px] rounded-bl-[4px] px-4 py-3">
              <div className="flex gap-1">
                <span className="w-[6px] h-[6px] rounded-full bg-ash animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-[6px] h-[6px] rounded-full bg-ash animate-bounce" style={{ animationDelay: '200ms' }} />
                <span className="w-[6px] h-[6px] rounded-full bg-ash animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div>
        <p className="text-[11px] text-ash mb-2 text-center font-medium">Sabi AI can make mistakes. Check important info.</p>
        <div className="flex items-center gap-1.5 border border-ash-line rounded-[26px] px-2 py-1.5 bg-surface-50">
          <button className="w-[36px] h-[36px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0 hover:bg-ash-line transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          </button>
          <button className="w-[36px] h-[36px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0 hover:bg-ash-line transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 19v3"/></svg>
          </button>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask anything, any subject…"
            className="flex-1 border-none outline-none text-[14px] font-sans bg-transparent text-surface-900 placeholder:text-ash px-1" />
          <button onClick={() => send()}
            className="w-[36px] h-[36px] rounded-full bg-secondary-500 flex items-center justify-center cursor-pointer shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
