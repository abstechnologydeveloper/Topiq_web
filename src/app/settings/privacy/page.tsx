import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div>
      <Link href="/settings" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Settings
      </Link>
      <Eyebrow>Last updated July 2026</Eyebrow>
      <PageTitle title="Privacy policy" sub="A summary of how AbSTopiq collects, uses and protects your data." />
      <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-4">
        <p className="text-[13px] text-ash leading-[1.7]">We collect the information you give us when you create an account (name, grade, school), plus your activity on the platform (topics studied, practice results) so we can personalise your learning. We never sell your data. Parents and school admins can request access or deletion of a student's data at any time.</p>
      </div>
    </div>
  )
}
