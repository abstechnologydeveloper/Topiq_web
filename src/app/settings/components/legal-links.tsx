import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function LegalLinks() {
  const links = [
    { href: '/settings/help', label: 'Help & support' },
    { href: '/settings/privacy', label: 'Privacy policy' },
    { href: '/settings/terms', label: 'Terms of service' },
  ]

  return (
    <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-4">
      {links.map((l, i) => (
        <Link key={i} href={l.href}
          className="flex items-center justify-between py-3 px-1 border-b border-ash-line cursor-pointer hover:bg-paper-dim/30 transition">
          <span className="font-semibold text-[13px] text-surface-900">{l.label}</span>
          <ChevronRight size={18} className="text-ash shrink-0" />
        </Link>
      ))}
      <div className="flex items-center justify-between py-3 px-1">
        <span className="font-semibold text-[13px] text-ash">App version</span>
        <span className="text-[13px] text-ash">v2.5</span>
      </div>
    </div>
  )
}
