export function TypingIndicator() {
  return (
    <div className="flex gap-2 justify-start">
      <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-surface-50 text-[10px] font-bold shrink-0">AI</div>
      <div className="bg-surface-50 border border-ash-line rounded-[14px] rounded-bl-[4px] px-4 py-3">
        <div className="flex gap-1">
          <span className="w-[6px] h-[6px] rounded-full bg-ash animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-[6px] h-[6px] rounded-full bg-ash animate-bounce" style={{ animationDelay: '200ms' }} />
          <span className="w-[6px] h-[6px] rounded-full bg-ash animate-bounce" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  )
}
