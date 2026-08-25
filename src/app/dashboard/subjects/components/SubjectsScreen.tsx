"use client";

import type { SubjectData } from "../../components/screens/DiscoverScreen";
import SubjectCard from "./SubjectCard";
import { EYEBROW, SUBJECT_GRID } from "./constants";

type Props = {
  subjects: Record<string, SubjectData>;
  student: { grade: string };
  openSubject: (id: string, pane?: string) => void;
};

export default function SubjectsScreen({ subjects, student, openSubject }: Props) {
  return (
    <section className="block animate-[fade_.25s_ease] p-0">
      <span className={EYEBROW}>Your library</span>
      <h1 className="page-title">Subjects</h1>
      <p className="page-sub">Every subject, grounded in your syllabus — no board attached to learning.</p>
      <div className={SUBJECT_GRID}>
        {Object.keys(subjects).map((id) => (
          <SubjectCard
            key={id}
            subject={subjects[id]}
            grade={student.grade}
            onOpen={() => openSubject(id, "overview")}
          />
        ))}
      </div>
    </section>
  );
}