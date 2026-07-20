import { Pencil, Settings } from 'lucide-react'

interface Props {
  onEdit: () => void
}

export function ProfileActions({ onEdit }: Props) {
  return (
    <>
      <button onClick={onEdit}
        className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer mb-2.5 hover:border-brand-600 hover:text-brand-600 transition flex items-center justify-center gap-2">
        <Pencil size={15} /> Edit profile
      </button>
      <button onClick={() => window.location.href = '/settings'}
        className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer hover:border-brand-600 hover:text-brand-600 transition flex items-center justify-center gap-2">
        <Settings size={15} /> Settings
      </button>
    </>
  )
}
