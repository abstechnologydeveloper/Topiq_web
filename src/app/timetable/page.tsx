'use client'

import { useState } from 'react'
import { Eyebrow, PageTitle, Subnav } from '@/components/ui/shared'
import { TimetablePane } from './components/timetable-pane'
import { TodoPane } from './components/todo-pane'
import { ExamsPane } from './components/exams-pane'

const PANES = ['Timetable', 'To-do', 'Exams']

export default function TimetablePage() {
  const [pane, setPane] = useState('Timetable')
  const [day, setDay] = useState('Monday')

  return (
    <div>
      <Eyebrow>Your mini workspace</Eyebrow>
      <PageTitle title="Plan your week" sub="Timetable, homework and upcoming exams — all in one place, colour-coded by subject." />

      <Subnav tabs={PANES} active={pane} onChange={setPane} />

      {pane === 'Timetable' && <TimetablePane day={day} onDayChange={setDay} />}
      {pane === 'To-do' && <TodoPane />}
      {pane === 'Exams' && <ExamsPane />}
    </div>
  )
}
