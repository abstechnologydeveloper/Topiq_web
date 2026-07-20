'use client'

import { useState } from 'react'
import { Eyebrow, Subnav } from '@/components/ui/shared'
import { GraduationCap, BookOpen, Book, Globe, Flag } from 'lucide-react'
import { MockExamCard } from './components/mock-exam-card'
import { BoardGrid } from './components/board-grid'
import { SubjectCardList } from './components/subject-card-list'

const PANES = ['Nigerian Boards', 'International', 'By Subject']

const boards: Record<string, { flag: React.ReactNode; name: string; sub: string }[]> = {
  'Nigerian Boards': [
    { flag: <Flag size={22} />, name: 'WAEC', sub: 'Nigeria & West Africa · 6 subjects' },
    { flag: <GraduationCap size={22} />, name: 'JAMB', sub: 'Nigeria · 4 subjects' },
    { flag: <BookOpen size={22} />, name: 'NECO', sub: 'Nigeria · 3 subjects' },
    { flag: <Book size={22} />, name: 'GCE', sub: 'Nigeria & West Africa · 3 subjects' },
  ],
  'International': [
    { flag: <Globe size={22} />, name: 'IGCSE', sub: 'International · 4 subjects' },
    { flag: <Flag size={22} />, name: 'GCSE / A-Levels', sub: 'UK · 4 subjects' },
  ],
}

export default function PracticePage() {
  const [pane, setPane] = useState('Nigerian Boards')

  return (
    <div>
      <Eyebrow>Practice, any exam board</Eyebrow>
      <h1 className="font-display text-[25px] font-semibold tracking-[-0.01em] text-surface-900 mb-1">Practice</h1>
      <p className="text-[13.5px] text-ash mb-4">WAEC first — also JAMB, NECO, GCE, and international boards — or just practise by subject.</p>

      <MockExamCard />

      <Subnav tabs={PANES} active={pane} onChange={setPane} />

      {pane === 'Nigerian Boards' && <BoardGrid boards={boards['Nigerian Boards']} />}
      {pane === 'International' && <BoardGrid boards={boards['International']} />}
      {pane === 'By Subject' && <SubjectCardList />}
    </div>
  )
}
