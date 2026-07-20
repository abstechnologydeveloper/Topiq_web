'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MicButton } from './components/mic-button'
import { Transcript } from './components/transcript'
import { AnswerDisplay } from './components/answer-display'

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
        <ArrowLeft size={16} />
        Sabi AI
      </Link>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-3 py-5">
        <MicButton mode={mode} onToggle={toggleMic} />

        <div className="font-bold text-[14.5px] text-surface-900">
          {mode === 'idle' && 'Tap to speak'}
          {mode === 'listening' && 'Listening...'}
          {mode === 'thinking' && 'Thinking...'}
          {mode === 'answered' && 'Answer ready'}
        </div>

        {transcript && mode !== 'idle' && (
          <Transcript text={transcript} />
        )}

        {answer && (
          <AnswerDisplay text={answer} />
        )}
      </div>
    </div>
  )
}
