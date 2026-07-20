interface Props {
  text: string
}

export function AnswerDisplay({ text }: Props) {
  return (
    <div className="text-left w-full max-w-[420px] bg-surface-50 border border-ash-line rounded-[14px] p-3.5 text-[14px] leading-[1.5]">
      {text}
    </div>
  )
}
