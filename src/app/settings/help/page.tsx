import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { ArrowLeft } from 'lucide-react'

export default function HelpPage() {
  return (
    <div>
      <Link href="/settings" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Settings
      </Link>
      <Eyebrow>We're here</Eyebrow>
      <PageTitle title="Help & support" sub="Common questions and ways to reach us." />
      <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-4">
        {[
          'How do I reset my password?',
          'How does Sabi AI work?',
          'How do I link my school?',
          'How do I cancel my subscription?',
        ].map((q, i) => (
          <div key={i} className="py-3 px-1 border-b border-ash-line last:border-b-0 cursor-pointer hover:bg-paper-dim/30 transition">
            <span className="font-semibold text-[13px] text-surface-900">{q}</span>
          </div>
        ))}
      </div>
      <p className="text-[13.5px] text-ash">Still stuck? Reach us at <strong className="text-surface-900">support@abstopiq.com</strong>.</p>
    </div>
  )
}
