'use client'

import { useState } from 'react'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { ScheduleCard } from './components/schedule-card'
import { LiveSession } from './components/live-session'
import type { ScheduleItem } from './components/schedule-card'

const SCHEDULE: ScheduleItem[] = [
  { time: '8:00 AM – 9:30 AM', subject: 'Biology', topic: 'Cell Structure & Function', status: 'completed', slug: 'biology' },
  { time: '10:00 AM – 11:30 AM', subject: 'Chemistry', topic: 'Atomic Structure', status: 'live', slug: 'chemistry' },
  { time: '12:00 PM – 1:30 PM', subject: 'Physics', topic: 'Motion & Forces', status: 'upcoming', slug: 'physics' },
  { time: '2:00 PM – 3:30 PM', subject: 'Mathematics', topic: 'Algebra', status: 'upcoming', slug: 'mathematics' },
]

export default function LiveClassPage() {
  const [activeView, setActiveView] = useState<'hub' | 'live'>('hub')
  const [liveSession, setLiveSession] = useState<ScheduleItem | null>(null)

  const joinSession = (s: ScheduleItem) => {
    setLiveSession(s)
    setActiveView('live')
  }

  const endSession = () => {
    setActiveView('hub')
    setLiveSession(null)
  }

  if (activeView === 'live' && liveSession) {
    return <LiveSession session={liveSession} onBack={() => setActiveView('hub')} onEnd={endSession} />
  }

  return (
    <div>
      <Eyebrow>Live Class</Eyebrow>
      <PageTitle title="Today's classes" sub="Your schedule for today — tap the live one to jump in." />

      <div className="space-y-2.5">
        {SCHEDULE.map((s, i) => (
          <ScheduleCard key={i} s={s} onJoin={joinSession} />
        ))}
      </div>
    </div>
  )
}
