"use client";

import { PS_MODE_BANNER, PS_BANNER_DOT } from "./constants";

export default function SessionBanner({
  mockMode,
  mockType,
  mockSubjectCount,
  totalQuestions,
  currentSubjectLabel,
  adaptiveInfo,
}: {
  mockMode: boolean;
  mockType?: string;
  mockSubjectCount?: number;
  totalQuestions?: number;
  currentSubjectLabel?: string;
  adaptiveInfo?: string;
}) {
  if (!mockMode) {
    return (
      <div className={PS_MODE_BANNER}>
        <span className={PS_BANNER_DOT}></span>
        {adaptiveInfo || "Practice"}
      </div>
    );
  }
  return (
    <div className={PS_MODE_BANNER}>
      <span className={PS_BANNER_DOT}></span>
      Mock · {mockType?.charAt(0).toUpperCase() + (mockType?.slice(1) || "")} · {mockSubjectCount} subjects · {totalQuestions} Qs — now: {currentSubjectLabel}
    </div>
  );
}