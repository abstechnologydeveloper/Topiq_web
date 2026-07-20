interface Props {
  isUser: boolean
  text: string
  ref?: string
}

export function ChatMessage({ isUser, text, ref: refText }: Props) {
  return (
    <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-surface-50 text-[10px] font-bold shrink-0">AI</div>
      )}
      <div className={`max-w-[88%] rounded-[14px] px-3.5 py-3 text-[14px] leading-[1.5] ${
        isUser
          ? 'bg-surface-900 text-surface-50 rounded-br-[4px]'
          : 'bg-surface-50 border border-ash-line rounded-bl-[4px]'
      }`}>
        <p>{text}</p>
        {refText && (
          <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-brand-50 text-brand-600 text-[11px] rounded-full font-medium">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {refText}
          </span>
        )}
      </div>
    </div>
  )
}
