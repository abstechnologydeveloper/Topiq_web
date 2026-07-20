"use client";

import type { OnboardingStep } from "./types";

interface Props {
  current: OnboardingStep;
}

const ORDER: Record<OnboardingStep, number> = {
  auth: 0,
  role: 1,
  details: 2,
  details2: 3,
};

export default function ProgressDots({ current }: Props) {
  return (
    <div className="flex gap-1.5 mb-7">
      {(Object.keys(ORDER) as OnboardingStep[]).map((s) => (
        <div
          key={s}
          className={`flex-1 h-1 rounded-full transition-colors ${
            ORDER[s] <= ORDER[current] ? "bg-brand-600" : "bg-ash-line"
          }`}
        />
      ))}
    </div>
  );
}
