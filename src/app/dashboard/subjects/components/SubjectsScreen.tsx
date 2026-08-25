"use client";

import type { SubjectData } from "../../components/screens/DiscoverScreen";

type Props = {
  subjects: Record<string, SubjectData>;
  student: { grade: string };
  openSubject: (id: string, pane?: string) => void;
};

export default function SubjectsScreen({ subjects, student, openSubject }: Props) {
  return (
    <section className="block animate-[fade_.25s_ease] p-0">
      <span className="eyebrow">Your library</span>
      <h1 className="page-title">Subjects</h1>
      <p className="page-sub">Every subject, grounded in your syllabus — no board attached to learning.</p>
      <div className="subject-grid">
        {Object.keys(subjects).map((id) => {
          const s = subjects[id];
          const dash = 119.4 - (119.4 * s.mastery) / 100;
          return (
            <div
              key={id}
              className="subject-card"
              onClick={() => openSubject(id, "overview")}
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
                <text
                  x="23"
                  y="27"
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="IBM Plex Mono"
                  fill="#18181B"
                  fontWeight="600"
                >
                  {s.mastery}%
                </text>
              </svg>
              <div className="subject-info">
                <div className="name">
                  {s.icon} {s.name}
                </div>
                <div className="meta">
                  {s.topics.length} topics · {student.grade}
                </div>
              </div>
              <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          );
        })}
      </div>
    </section>
  );
}