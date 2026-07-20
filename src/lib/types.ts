import type { ReactNode } from 'react'

export interface Subject {
  id: string
  name: string
  icon: ReactNode
  topicCount: number
  questionCount: number
  masteryScore: number
  colorHex: string
}

export interface Topic {
  id: string
  name: string
  subjectId: string
  questionCount: number
  masteryScore: number
  tutorial: string
  questions: Question[]
  flashcards: Flashcard[]
}

export interface Question {
  id: string
  topicId: string
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty: 'foundational' | 'intermediate' | 'advanced'
}

export interface Flashcard {
  question: string
  answer: string
}

export interface PastPaper {
  name: string
  exam: string
  year: string
  question: string
  answer: string
  reference: string
}

export interface TimetableSlot {
  weekday: number
  time: string
  title: string
  tag: string
  subjectId: string
}

export interface Deadline {
  title: string
  date: string
  daysLeft: number
  icon: ReactNode
  colorHex: string
}