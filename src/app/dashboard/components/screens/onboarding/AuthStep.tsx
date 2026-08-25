"use client";

import Image from "next/image";

export default function AuthStep({ onContinue }: { onContinue: () => void }) {
  return (
    <>
      <div className="flex items-center justify-center gap-2.5 mb-7">
        <Image src="/logo.png" alt="AbSTopiq" width={52} height={52} />
      </div>
      <div className="mb-2 text-center text-headline font-semibold font-display">
        Learn it. Practice it. Sabi it.
      </div>
      <p className="mb-7 text-center text-sub text-ash">
        Sign up in one tap — onboarding takes just a minute after.
      </p>

      <button
        className="mb-3 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-btn border-1_5 border-ash-line bg-surface px-3.25 py-3.25 text-input font-bold text-ink hover:border-thread"
        onClick={() => onContinue()}
      >
        <span className="flex h-4.75 w-4.75 shrink-0 items-center justify-center rounded-full text-label font-extrabold bg-[conic-gradient(from_-45deg,#4285F4_0_25%,#34A853_0_50%,#FBBC05_0_75%,#EA4335_0_100%)] text-white">
          <svg width="12" height="12" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
            />
          </svg>
        </span> Continue with Google
      </button>
      <button
        className="mb-3 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-btn border-1_5 border-ink bg-ink px-[13px] py-[13px] text-input font-bold text-white hover:border-thread"
        onClick={() => onContinue()}
      >
        <span className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full text-label font-extrabold bg-surface text-ink">
          <svg width="13" height="13" viewBox="0 0 384 512">
            <path
              fill="currentColor"
              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 2 168.4 2 273.5c0 20.9 4.1 44.1 12.4 69.3 10.7 32.1 49.3 119.2 89.6 117.9 22.5-.6 30-14.6 62.3-14.6 31.9 0 37.1 14.6 62.4 14.6 40.5.7 77.4-76.1 87.7-108.3-54.6-25.8-57.8-91.8-58.4-113.4zM256.5 62.3c18.3-22.1 15.6-43.6 15.1-46.3-16.8 1.1-35.7 11.9-46.9 25.7-10.3 12.6-19.6 32.1-15.4 49.7 17.3.8 35.1-8.4 47.2-29.1z"
            />
          </svg>
        </span> Continue with Apple
      </button>
      <button
        className="mb-3 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-btn border-1_5 border-[#1877F2] bg-[#1877F2] px-[13px] py-[13px] text-input font-bold text-white hover:border-thread"
        onClick={() => onContinue()}
      >
        <span className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full text-label font-extrabold bg-surface text-[#1877F2]">
          <svg width="12" height="12" viewBox="0 0 24 24">
            <path
              fill="#1877F2"
              d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.026 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
            />
          </svg>
        </span> Continue with Facebook
      </button>
      <p className="mt-4 text-center text-fine leading-[1.6] text-ash">
        By continuing, you agree to AbSTopiq's Terms of Service and Privacy Policy.
      </p>
    </>
  );
}