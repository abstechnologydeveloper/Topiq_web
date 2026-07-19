'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VoicePage() {
  const [mode, setMode] = useState<'idle' | 'listening' | 'thinking' | 'answered'>('idle')
  const [transcript, setTranscript] = useState('')
  const [answer, setAnswer] = useState('')

  const toggleMic = () => {
    if (mode === 'idle') {
      setMode('listening')
      setTimeout(() => {
        setTranscript('Explain the process of photosynthesis...')
        setMode('thinking')
        setTimeout(() => {
          setAnswer('Photosynthesis is the process by which green plants convert light energy into chemical energy. The equation is 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. This takes place in the chloroplasts, primarily in the palisade mesophyll cells of leaves.')
          setMode('answered')
        }, 1500)
      }, 2000)
    } else {
      setMode('idle')
      setTranscript('')
      setAnswer('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Link href="/ask" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        Sabi AI
      </Link>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-3 py-5">
        <div className={`w-[132px] h-[132px] rounded-full flex items-center justify-center transition-all duration-200 ${
          mode === 'listening' ? 'bg-coral-soft animate-pulse' :
          mode === 'thinking' ? 'bg-ember-soft' : 'bg-brand-50'
        }`}>
          <button onClick={toggleMic}
            className={`w-[76px] h-[76px] rounded-full border-none flex items-center justify-center cursor-pointer transition-all ${
              mode === 'listening' ? 'bg-coral' :
              mode === 'thinking' ? 'bg-secondary-500' : 'bg-brand-600'
            }`}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="9" y="2" width="6" height="12" rx="3"/>
              <path d="M5 10a7 7 0 0 0 14 0"/>
              <path d="M12 19v3"/>
            </svg>
          </button>
        </div>

        <div className="font-bold text-[14.5px] text-surface-900">
          {mode === 'idle' && 'Tap to speak'}
          {mode === 'listening' && 'Listening...'}
          {mode === 'thinking' && 'Thinking...'}
          {mode === 'answered' && 'Answer ready'}
        </div>

        {transcript && mode !== 'idle' && (
          <div className="text-[14px] italic text-ink-soft max-w-[340px]">{transcript}</div>
        )}

        {answer && (
          <div className="text-left w-full max-w-[420px] bg-surface-50 border border-ash-line rounded-[14px] p-3.5 text-[14px] leading-[1.5]">
            {answer}
          </div>
        )}
      </div>
    </div>
  )
}
