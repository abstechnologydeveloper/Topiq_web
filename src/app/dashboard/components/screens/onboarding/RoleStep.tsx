"use client";

import type { ObRole } from "../../DashboardContext";
import { BACK, BackIcon, MODE_BADGE } from "./shared";

export default function RoleStep({
  role,
  onSelect,
  onBack,
}: {
  role: ObRole | null;
  onSelect: (r: ObRole) => void;
  onBack: () => void;
}) {
  return (
    <>
      <span className={MODE_BADGE}>
        Onboarding · Step 1 of 2
      </span>
      <div className="mb-2 text-center text-headline font-semibold font-display">Who's this for?</div>
      <p className="mb-7 text-center text-sub text-ash">This decides what your AbSTopiq looks like — we'll set it up right.</p>

      <div
        className={`mb-3 flex cursor-pointer items-center gap-3.5 rounded-card border-1_5 border-ash-line bg-surface p-4 hover:border-thread ${role === "student" ? "border-thread bg-thread-soft" : ""}`}
        id="obRoleStudent"
        onClick={() => onSelect("student")}
      >
        <span className="shrink-0 text-[26px]">🎓</span>
        <div>
          <div className="text-[14.5px] font-bold">Student</div>
          <div className="text-label text-ash">Learn, practice, and prep for exams</div>
        </div>
      </div>
      <div
        className={`mb-3 flex cursor-pointer items-center gap-3.5 rounded-card border-1_5 border-ash-line bg-surface p-4 hover:border-thread ${role === "teacher" ? "border-thread bg-thread-soft" : ""}`}
        id="obRoleTeacher"
        onClick={() => onSelect("teacher")}
      >
        <span className="shrink-0 text-[26px]">🍎</span>
        <div>
          <div className="text-[14.5px] font-bold">Teacher</div>
          <div className="text-label text-ash">Track a class and set assignments</div>
        </div>
      </div>
      <div
        className={`mb-3 flex cursor-pointer items-center gap-3.5 rounded-card border-1_5 border-ash-line bg-surface p-4 hover:border-thread ${role === "school" ? "border-thread bg-thread-soft" : ""}`}
        id="obRoleSchool"
        onClick={() => onSelect("school")}
      >
        <span className="shrink-0 text-[26px]">🏫</span>
        <div>
          <div className="text-[14.5px] font-bold">School / Institution</div>
          <div className="text-label text-ash">Set up AbSTopiq for your whole school</div>
        </div>
      </div>

      <div className={BACK} onClick={onBack}>
        <BackIcon /> Back
      </div>
    </>
  );
}