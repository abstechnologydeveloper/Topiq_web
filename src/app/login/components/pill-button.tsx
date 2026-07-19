export function PillButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${
        selected
          ? 'bg-brand-50 border-brand-300 text-brand-700'
          : 'border-surface-200 text-surface-600 hover:border-brand-200 hover:text-surface-700'
      }`}
    >
      {children}
    </button>
  )
}
