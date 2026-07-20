import Link from 'next/link'
import { Calendar, Trophy, Clipboard } from 'lucide-react'

export function QuickLinks() {
  return (
    <div className="grid grid-cols-3 gap-2.5 mb-5">
      <Link href="/timetable" className="rounded-[14px] border border-ash-line bg-surface-50 p-3 text-center hover:border-brand-600 transition cursor-pointer">
        <Calendar size={22} className="text-surface-900 mx-auto" />
        <div className="text-[12.5px] font-bold text-surface-900 mt-1">Timetable</div>
        <div className="text-[10.5px] text-ash">3 sessions today</div>
      </Link>
      <Link href="/challenges" className="rounded-[14px] border border-ash-line bg-surface-50 p-3 text-center hover:border-brand-600 transition cursor-pointer">
        <Trophy size={22} className="text-surface-900 mx-auto" />
        <div className="text-[12.5px] font-bold text-surface-900 mt-1">Challenges</div>
        <div className="text-[10.5px] text-ash">4 to try</div>
      </Link>
      <Link href="/assignments" className="rounded-[14px] border border-ash-line bg-surface-50 p-3 text-center hover:border-brand-600 transition cursor-pointer">
        <Clipboard size={22} className="text-surface-900 mx-auto" />
        <div className="text-[12.5px] font-bold text-surface-900 mt-1">Assignments</div>
        <div className="text-[10.5px] text-ash">Sent by teachers</div>
      </Link>
    </div>
  )
}
