'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { findAnswer, SUBJECTS, TOPICS, STATS } from '@/lib/data'

interface Msg { isUser: boolean; text: string; ref?: string; subject?: string }

export default function AskPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [activeSubj, setActiveSubj] = useState<string | null>(null)
  const [showActions, setShowActions] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = () => {
    const text = input.trim()
    if (!text) return
    const subjName = activeSubj ? SUBJECTS.find(s => s.id === activeSubj)?.name || '' : ''
    setMessages(prev => [...prev, { isUser: true, text, subject: subjName }])
    setInput('')
    setShowActions(false)

    const answer = findAnswer(text)
    let refStr: string | undefined
    for (const t of TOPICS) {
      if (answer.includes(t.name) || (text.length > 5 && t.tutorial.toLowerCase().includes(text.substring(0, 5).toLowerCase()))) {
        refStr = '§ WAEC ' + (SUBJECTS.find(s => s.id === t.subjectId)?.name || '') + ' — ' + t.name
        break
      }
    }
    setTimeout(() => {
      setMessages(prev => [...prev, { isUser: false, text: answer, ref: refStr }])
    }, 600)
  }

  const quickAction = (prefix: string) => {
    setInput(prefix)
    setShowActions(false)
  }

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-surface-900">Ask Topiq</h1>
          <Link href="/progress" className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs font-bold text-orange-800">
            🔥 {STATS.streak}d streak · <span className="underline">View progress →</span>
          </Link>
        </div>
        <p className="text-sm text-surface-500 mt-1">Type it, say it, or scan it — every answer traces back to your syllabus.</p>
        <div className="flex gap-2 mt-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-300 rounded-full text-[11px] font-semibold text-green-700">🔊 Voice replies</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-300 rounded-full text-[11px] font-semibold text-blue-700">✨ All subjects</span>
        </div>
        <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1">
          {SUBJECTS.map(s => (
            <button key={s.id} onClick={() => setActiveSubj(activeSubj === s.id ? null : s.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition ${activeSubj === s.id ? 'bg-brand-50 border-brand-300 text-brand-700' : 'border-surface-200 text-surface-600 hover:border-brand-300'}`}>
              <span className="text-sm">{s.icon}</span> {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="text-base font-semibold text-surface-800">Ask about any topic, in any subject</h3>
            <p className="text-sm text-surface-400 mt-1 max-w-xs">Type it, say it, or scan a question — every answer is grounded in your syllabus.</p>
          </div>
        ) : messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.isUser ? 'justify-end' : 'justify-start'}`}>
            {!m.isUser && (
              <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">AI</div>
            )}
            <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.isUser ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-surface-100 text-surface-800 rounded-bl-sm'}`}>
              {m.subject && <p className="text-[11px] font-semibold opacity-60 mb-1">{m.subject}</p>}
              <p>{m.text}</p>
              {m.ref && (
                <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-brand-50 text-brand-700 text-[11px] rounded-full font-medium">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {m.ref}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t pt-3">
        {showActions && (
          <div className="flex gap-2 mb-3 overflow-x-auto">
            {[
              { icon: '💬', label: 'Explain a topic', action: () => quickAction('Explain ') },
              { icon: '✅', label: 'Check my working', action: () => quickAction('Can you check: ') },
              { icon: '📷', label: 'Scan question', action: () => {} },
            ].map((a, i) => (
              <button key={i} onClick={a.action} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-xs font-medium text-surface-600 hover:border-brand-300 hover:bg-brand-50 min-w-[80px]">
                <span className="text-lg">{a.icon}</span> {a.label}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          <button onClick={() => {}} className="w-9 h-9 border rounded-xl flex items-center justify-center text-surface-400 hover:text-brand-600 hover:border-brand-400 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
          </button>
          <button onClick={() => setShowActions(!showActions)} className="w-9 h-9 border rounded-xl flex items-center justify-center text-surface-400 hover:text-brand-600 hover:border-brand-400 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onFocus={() => setShowActions(false)} onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask anything, any subject..."
            className="flex-1 border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400 bg-surface-200/70" />
          <button onClick={send} className="w-9 h-9 bg-brand-600 text-white rounded-xl flex items-center justify-center hover:bg-brand-700 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}