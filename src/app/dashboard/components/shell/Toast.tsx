"use client";

export default function Toast({ toast }: { toast: string }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 z-[400] max-w-[88%] -translate-x-1/2 translate-y-0 rounded-[30px] bg-ink px-5 py-[13px] text-center text-sub font-semibold text-paper opacity-100 shadow-[0_10px_30px_rgba(0,0,0,.25)] transition-[opacity,transform] duration-300"
      dangerouslySetInnerHTML={{ __html: toast }}
    />
  );
}