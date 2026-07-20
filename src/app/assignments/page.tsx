'use client'

import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { Dna, FlaskConical, Ruler, ArrowLeft } from 'lucide-react'
import { AssignmentCard } from './components/assignment-card'

const assignments = [
  { icon: <Dna size={17} />, title: 'Biology: Cell Structure', teacher: 'Mrs. Adeyemi', due: '12 Jun 2026', status: 'pending' as const },
  { icon: <FlaskConical size={17} />, title: 'Chemistry: Periodic Table', teacher: 'Mr. Okonkwo', due: '15 Jun 2026', status: 'done' as const },
  { icon: <Ruler size={17} />, title: 'Mathematics: Algebra', teacher: 'Mr. Bello', due: '18 Jun 2026', status: 'pending' as const },
]

export default function AssignmentsPage() {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Discover
      </Link>
      <Eyebrow>From your teachers</Eyebrow>
      <PageTitle title="Assignments" sub="Work your teachers have set for your classes — do it here and it feeds straight back to them." />

      <div className="space-y-3">
        {assignments.map((a, i) => (
          <AssignmentCard key={i} {...a} />
        ))}
      </div>
    </div>
  )
}
