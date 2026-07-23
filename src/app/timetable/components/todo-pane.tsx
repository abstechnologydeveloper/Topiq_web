'use client'

import { useState } from 'react'
import { SUBJECTS } from '@/lib/data'

interface Task {
  id: number
  title: string
  subject: string
  due: string
  done: boolean
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'Finish Photosynthesis worksheet', subject: 'biology', due: 'Today', done: false },
  { id: 2, title: 'Practice 10 simultaneous equation problems', subject: 'mathematics', due: 'Today', done: false },
  { id: 3, title: "Read Ch. 4 — Newton's Laws", subject: 'physics', due: 'Tomorrow', done: false },
  { id: 4, title: 'Summarise comprehension passage', subject: 'english', due: 'Fri', done: true },
]

const DUE_OPTIONS = ['Today', 'Tomorrow', 'This week']

export function TodoPane() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSubject, setNewSubject] = useState('')
  const [newDue, setNewDue] = useState('Today')

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const addTask = () => {
    if (!newTitle.trim() || !newSubject) return
    const task: Task = {
      id: Date.now(),
      title: newTitle.trim(),
      subject: newSubject,
      due: newDue,
      done: false,
    }
    setTasks([...tasks, task])
    setNewTitle('')
    setNewSubject('')
    setNewDue('Today')
    setShowAdd(false)
  }

  const dueToday = tasks.filter(t => !t.done && t.due === 'Today').length

  return (
    <div>
      <div className="flex items-center gap-3.5 bg-surface-900 text-surface-50 rounded-[--radius] p-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10.5px] text-ember-soft tracking-[.05em] uppercase mb-1">Due today</div>
          <div className="font-display text-[17px] font-semibold">{dueToday} {dueToday === 1 ? 'task' : 'tasks'} left</div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="shrink-0 bg-secondary-500 text-surface-900 border-none px-4 py-2 rounded-[20px] font-bold text-[12.5px] cursor-pointer"
        >
          + Add task
        </button>
      </div>

      <div className="bg-surface-50 border border-ash-line rounded-[--radius]">
        {tasks.map(t => {
          const subj = SUBJECTS.find(s => s.id === t.subject)
          return (
            <div
              key={t.id}
              onClick={() => toggleTask(t.id)}
              className="flex items-center gap-3 py-3.5 px-4 border-b border-ash-line last:border-b-0 cursor-pointer transition hover:bg-paper-dim/30"
              style={{ opacity: t.done ? 0.5 : 1 }}
            >
              <div
                className="w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center transition"
                style={{
                  borderColor: t.done ? 'var(--color-brand-600)' : 'var(--ash-line)',
                  background: t.done ? 'var(--color-brand-600)' : 'transparent',
                }}
              >
                {t.done && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div
                className="flex-1 min-w-0 text-[14px] font-bold transition"
                style={{
                  color: t.done ? 'var(--ash)' : 'var(--surface-900)',
                  textDecoration: t.done ? 'line-through' : 'none',
                }}
              >
                {t.title}
              </div>
              <span
                className="font-mono text-[10.5px] font-semibold px-2 py-0.5 rounded shrink-0"
                style={{
                  background: subj ? subj.colorHex + '20' : 'var(--paper-dim)',
                  color: subj ? subj.colorHex : 'var(--ash)',
                }}
              >
                {t.due}
              </span>
            </div>
          )
        })}
      </div>

      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
          onClick={(e) => { if (e.target === e.currentTarget) setShowAdd(false) }}
        >
          <div className="bg-surface-50 w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[17px] text-surface-900">Add a task</h2>
              <button onClick={() => setShowAdd(false)} className="text-ash text-lg cursor-pointer">&times;</button>
            </div>

            <div className="mb-3">
              <label className="text-[11.5px] font-bold text-ash block mb-1.5">What do you need to do?</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Finish algebra worksheet"
                className="w-full border border-ash-line rounded-[12px] px-3.5 py-2.5 text-[14px] bg-transparent text-surface-900 outline-none"
              />
            </div>

            <div className="mb-3">
              <label className="text-[11.5px] font-bold text-ash block mb-1.5">Subject</label>
              <div className="flex flex-wrap gap-1.5">
                {SUBJECTS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setNewSubject(s.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-[12px] font-bold cursor-pointer transition ${
                      newSubject === s.id
                        ? 'border-brand-600 bg-brand-50 text-brand-600'
                        : 'border-ash-line bg-surface-50 text-ash hover:border-brand-600'
                    }`}
                  >
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[11.5px] font-bold text-ash block mb-1.5">Due</label>
              <div className="flex gap-1.5">
                {DUE_OPTIONS.map(d => (
                  <button
                    key={d}
                    onClick={() => setNewDue(d)}
                    className={`px-3 py-1.5 rounded-full border-2 text-[12px] font-bold cursor-pointer transition ${
                      newDue === d
                        ? 'border-brand-600 bg-brand-50 text-brand-600'
                        : 'border-ash-line bg-surface-50 text-ash hover:border-brand-600'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={addTask}
              className="w-full bg-surface-900 text-surface-50 border-none rounded-[14px] py-3 font-bold text-[13px] cursor-pointer"
            >
              Add &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
