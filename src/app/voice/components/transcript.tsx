interface Props {
  text: string
}

export function Transcript({ text }: Props) {
  return (
    <div className="text-[14px] italic text-ink-soft max-w-[340px]">{text}</div>
  )
}
