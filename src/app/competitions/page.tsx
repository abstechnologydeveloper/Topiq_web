'use client'

import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { Trophy, Calculator, Microscope, ArrowLeft } from 'lucide-react'
import { CompetitionCard } from './components/competition-card'

const comps = [
  { icon: <Trophy size={20} />, name: 'Nigeria Biology Olympiad', level: 'National · SS1-SS3', desc: 'Annual competition testing biological knowledge and practical skills. Top students advance to the International Biology Olympiad (IBO).', tags: ['Biology', 'Olympiad', 'Free'], entry: 'Open now' },
  { icon: <Calculator size={20} />, name: 'National Mathematics Contest', level: 'National · JSS1-SS3', desc: 'Organised by the Mathematical Association of Nigeria. Tests problem-solving and mathematical reasoning.', tags: ['Mathematics', 'Competition'], entry: 'Closes 30 Aug' },
  { icon: <Microscope size={20} />, name: 'WAEC Distinction Quiz', level: 'National · SS2-SS3', desc: 'A quiz competition for WAEC candidates across all subjects. Top performers receive certificates and scholarships.', tags: ['WAEC', 'Quiz', 'Scholarship'], entry: 'Open now' },
]

export default function CompetitionsPage() {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Discover
      </Link>
      <Eyebrow>Beyond the syllabus</Eyebrow>
      <PageTitle title={<span className="flex items-center gap-2"><Trophy size={24} /> Competitions</span>} sub="National and international academic competitions — Sabi AI can build you a prep track for any of these." />

      <div className="space-y-3">
        {comps.map((c, i) => (
          <CompetitionCard key={i} {...c} />
        ))}
      </div>
    </div>
  )
}
