import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div>
      <Link href="/settings" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Settings
      </Link>
      <Eyebrow>Last updated July 2026</Eyebrow>
      <PageTitle title="Terms of service" sub="The basic rules for using AbSTopiq. Placeholder copy for this mockup — final legal text goes here." />
      <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-4">
        <p className="text-[13px] text-ash leading-[1.7]">By using AbSTopiq you agree to use the platform for personal learning, keep your login details private, and follow your school's code of conduct where applicable. Subscriptions renew automatically unless cancelled before the renewal date.</p>
      </div>
    </div>
  )
}
