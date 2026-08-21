"use client";

import { SUBJECTS } from "../../../data";
import { LABEL, OB_FIELD, QA_INPUT } from "./shared";

const SUBJECTS_BY_ID = SUBJECTS as Record<string, { icon: string; name: string }>;

export function TeacherDetails({
  tFirstName,
  onChangeTFirstName,
  tLastName,
  onChangeTLastName,
  tPhone,
  onChangeTPhone,
  selectedSubjects,
  onToggleSubject,
  teacherSchoolCode,
  onChangeTeacherSchoolCode,
}: {
  tFirstName: string;
  onChangeTFirstName: (v: string) => void;
  tLastName: string;
  onChangeTLastName: (v: string) => void;
  tPhone: string;
  onChangeTPhone: (v: string) => void;
  selectedSubjects: string[];
  onToggleSubject: (id: string) => void;
  teacherSchoolCode: string;
  onChangeTeacherSchoolCode: (v: string) => void;
}) {
  return (
    <div id="obFieldsTeacher">
      <div className="flex gap-2.5">
        <div className={`${OB_FIELD} mb-0 flex-1`}>
          <label className={LABEL}>First name</label>
          <input
            type="text"
            className={QA_INPUT}
            id="obTFirstName"
            placeholder="Funmilayo"
            value={tFirstName}
            onChange={(e) => onChangeTFirstName(e.target.value)}
          />
        </div>
        <div className={`${OB_FIELD} mb-0 flex-1`}>
          <label className={LABEL}>Last name</label>
          <input
            type="text"
            className={QA_INPUT}
            id="obTLastName"
            placeholder="Adeyemi"
            value={tLastName}
            onChange={(e) => onChangeTLastName(e.target.value)}
          />
        </div>
      </div>
      <div className={OB_FIELD}>
        <label className={LABEL}>
          Phone number <span className="font-normal text-ash">(optional)</span>
        </label>
        <input
          type="tel"
          className={QA_INPUT}
          id="obTPhone"
          placeholder="080X XXX XXXX"
          value={tPhone}
          onChange={(e) => onChangeTPhone(e.target.value)}
        />
      </div>
      <div className={OB_FIELD}>
        <label className={LABEL}>Subject(s) you teach</label>
        <div className="flex flex-wrap gap-2" id="obSubjectGrid">
          {Object.keys(SUBJECTS_BY_ID).map((id) => {
            const s = SUBJECTS_BY_ID[id];
            return (
              <button
                key={id}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-card border-1_5 border-ash-line bg-surface px-[13px] py-[7px] text-[12.5px] font-bold text-ash ${selectedSubjects.includes(id) ? "border-thread bg-thread-soft text-thread" : ""}`}
                onClick={() => onToggleSubject(id)}
              >
                {s.icon} {s.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className={OB_FIELD}>
        <label className={LABEL}>
          School code <span className="font-normal text-ash">(optional)</span>
        </label>
        <input
          type="text"
          className={`${QA_INPUT} uppercase`}
          id="obTeacherSchoolCode"
          placeholder="e.g. CORONA2026"
          value={teacherSchoolCode}
          onChange={(e) => onChangeTeacherSchoolCode(e.target.value)}
        />
        <p className="mt-1.5 text-[11px] leading-[1.5] text-ash">
          Have a code from your school admin? Enter it and your AbSTopiq for Teachers plan is
          covered by your school, free. No code — teach independently on the free plan, or
          upgrade anytime.
        </p>
      </div>
    </div>
  );
}