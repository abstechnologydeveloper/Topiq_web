'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { useAuthStore } from '@/lib/auth/store'
import { Eyebrow, PromoBanner, PromoteCard } from '@/components/ui/shared'
import { ArrowRight, Pencil, GraduationCap } from 'lucide-react'
import { UserGreeting } from '@/app/components/user-greeting'
import { QuickLinks } from '@/app/components/quick-links'
import { SubjectChips } from '@/app/components/subject-chips'
import { UpNextCard } from '@/app/components/up-next-card'

export default function Home() {
  const authUser = useAuthStore(s => s.user)
  const router = useRouter()

  useEffect(() => {
    if (!authUser) router.replace('/login')
  }, [authUser, router])

  if (!authUser) return null

  const user = { name: authUser.firstName || 'Chidinma', grade: authUser.grade || 'SS2' }
  const weak = TOPICS.filter(t => t.masteryScore < 60).sort((a, b) => a.masteryScore - b.masteryScore).slice(0, 4)
  const topWeak = weak[0]
  const subj = topWeak ? SUBJECTS.find(s => s.id === topWeak.subjectId) : null

  return (
    <div>
      <UserGreeting name={user.name} grade={user.grade} />

      <QuickLinks />

      <Eyebrow>Today's plan</Eyebrow>
      {subj && topWeak && <UpNextCard subject={subj} topic={topWeak} />}

      <div className="flex items-baseline justify-between mb-2.5">
        <Eyebrow className="mb-0">Your subjects</Eyebrow>
        <Link href="/subjects" className="text-[12px] font-bold text-brand-600 flex items-center gap-1">See all <ArrowRight size={12} /></Link>
      </div>

      <SubjectChips />

      <PromoBanner
        icon={<GraduationCap size={22} />}
        title="WAEC registration closes in 6 weeks"
        sub="Get the Exam-Ready Pass — unlimited Sabi AI + mock exams through results day"
        onClick={() => router.push('/subscription')}
      />

      <PromoteCard
        icon={<Pencil size={22} />}
        title="Practice"
        sub="Sharpen any topic, any board"
        onClick={() => router.push('/practice')}
      />
    </div>
  )
}
