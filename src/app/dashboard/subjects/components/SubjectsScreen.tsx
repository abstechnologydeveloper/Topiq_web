"use client";

import type { SubjectData } from "../../components/screens/DiscoverScreen";
import SubjectCard from "./SubjectCard";
import { EYEBROW, PAGE_TITLE, PAGE_SUB, SUBJECT_GRID } from "./constants";

type Props = {
  subjects: Record<string, SubjectData>;
  student: { grade: string };
  openSubject: (id: string, pane?: string) => void;
};

export default function SubjectsScreen({ subjects, student, openSubject }: Props) {
  return (
    <section className="block animate-[fade_.25s_ease] p-0">
      <span className={EYEBROW}>Your library</span>
      <h1 className={PAGE_TITLE}>Subjects</h1>
      <p className={PAGE_SUB}>Every subject, grounded in your syllabus — no board attached to learning.</p>
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