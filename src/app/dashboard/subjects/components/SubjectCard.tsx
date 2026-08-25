"use client";

import type { SubjectData } from "../../components/screens/DiscoverScreen";
import { SUBJECT_CARD, SUBJECT_INFO, SUBJECT_NAME, SUBJECT_META } from "./constants";

export default function SubjectCard({
  subject,
  grade,
  onOpen,
}: {
  subject: SubjectData;
  grade: string;
  onOpen: () => void;
}) {
  const s = subject;
  const dash = 119.4 - (119.4 * s.mastery) / 100;
  return (
    <div
      className={`${SUBJECT_CARD} hover:border-thread [html[data-theme=dark]_&]:hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)]`}
      onClick={onOpen}
    >
      <svg width="46" height="46" viewBox="0 0 46 46">
        <circle cx="23" cy="23" r="19" fill="none" stroke="#E4E4E7" strokeWidth="5" />
        <circle
          cx="23"
          cy="23"
          r="19"
          fill="none"
          stroke={`var(--${s.color})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="119.4"
          strokeDashoffset={dash}
          transform="rotate(-90 23 23)"
        />
        <text x="23" y="27" textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono" fill="#18181B" fontWeight="600">
          {s.mastery}%
        </text>
      </svg>
      <div className={SUBJECT_INFO}>
        <div className={SUBJECT_NAME}>
          {s.icon} {s.name}
        </div>
        <div className={SUBJECT_META}>
          {s.topics.length} topics · {grade}
        </div>
      </div>
      <svg className="shrink-0 text-ash" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
}