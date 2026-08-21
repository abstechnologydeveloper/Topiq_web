"use client";

import type { RefObject } from "react";
import { OB_GRADES } from "../../../data";
import { CameraBadge, LABEL, OB_FIELD, PersonSVG, QA_INPUT } from "./shared";

export function StudentDetails({
  avatarDataUrl,
  avatarInputRef,
  onAvatarFile,
  username,
  onChangeUsername,
  firstName,
  onChangeFirstName,
  lastName,
  onChangeLastName,
  age,
  onChangeAge,
  dob,
  onChangeDob,
  phone,
  onChangePhone,
}: {
  avatarDataUrl: string | null;
  avatarInputRef: RefObject<HTMLInputElement | null>;
  onAvatarFile: (file: File | undefined) => void;
  username: string;
  onChangeUsername: (v: string) => void;
  firstName: string;
  onChangeFirstName: (v: string) => void;
  lastName: string;
  onChangeLastName: (v: string) => void;
  age: string;
  onChangeAge: (v: string) => void;
  dob: string;
  onChangeDob: (v: string) => void;
  phone: string;
  onChangePhone: (v: string) => void;
}) {
  return (
    <div id="obFieldsStudent">
      <div className="mb-[22px] flex cursor-pointer flex-col items-center" onClick={() => avatarInputRef.current && avatarInputRef.current.click()}>
        <div className="relative mb-2 flex h-[84px] w-[84px] items-center justify-center overflow-hidden rounded-full border-1_5 border-dashed border-ash-line bg-paper-dim" id="obAvatarCircle">
          {avatarDataUrl ? (
            <img src={avatarDataUrl} alt="Profile picture" className="h-full w-full object-cover" />
          ) : (
            <>
              <PersonSVG />
              <CameraBadge />
            </>
          )}
        </div>
        <span className="text-label font-bold text-ash">Add profile picture</span>
        <input
          type="file"
          accept="image/*"
          id="obAvatarInput"
          ref={avatarInputRef}
          className="hidden"
          onChange={(e) => onAvatarFile(e.target.files?.[0])}
        />
      </div>
      <div className={OB_FIELD}>
        <label className={LABEL}>Username</label>
        <div className="flex items-center gap-0.5 rounded-input border-1_5 border-ash-line px-3.5">
          <span className="text-input font-semibold text-ash">@</span>
          <input
            type="text"
            id="obUsername"
            placeholder="chidinma_o"
            className="flex-1 bg-transparent px-0.5 py-[11px] text-input outline-none"
            value={username}
            onChange={(e) => onChangeUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2.5">
        <div className={`${OB_FIELD} mb-0 flex-1`}>
          <label className={LABEL}>First name</label>
          <input
            type="text"
            className={QA_INPUT}
            id="obFirstName"
            placeholder="Chidinma"
            value={firstName}
            onChange={(e) => onChangeFirstName(e.target.value)}
          />
        </div>
        <div className={`${OB_FIELD} mb-0 flex-1`}>
          <label className={LABEL}>Last name</label>
          <input
            type="text"
            className={QA_INPUT}
            id="obLastName"
            placeholder="Okafor"
            value={lastName}
            onChange={(e) => onChangeLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2.5">
        <div className={`${OB_FIELD} mb-0 flex-1`}>
          <label className={LABEL}>Age</label>
          <input
            type="number"
            className={QA_INPUT}
            id="obAge"
            placeholder="16"
            min={8}
            max={25}
            value={age}
            onChange={(e) => onChangeAge(e.target.value)}
          />
        </div>
        <div className={`${OB_FIELD} mb-0 flex-1`}>
          <label className={LABEL}>Date of birth</label>
          <input
            type="date"
            className={QA_INPUT}
            id="obDob"
            value={dob}
            onChange={(e) => onChangeDob(e.target.value)}
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
          id="obPhone"
          placeholder="080X XXX XXXX"
          value={phone}
          onChange={(e) => onChangePhone(e.target.value)}
        />
      </div>
    </div>
  );
}

export function StudentDetails2({
  curriculum,
  onPickCurriculum,
  selectedGrade,
  onPickGrade,
  selectedGender,
  onPickGender,
  trackVisible,
  selectedTrack,
  onPickTrack,
  studentSchoolCode,
  onChangeStudentSchoolCode,
}: {
  curriculum: "ng" | "intl";
  onPickCurriculum: (sys: "ng" | "intl") => void;
  selectedGrade: string | null;
  onPickGrade: (g: string) => void;
  selectedGender: string | null;
  onPickGender: (g: string) => void;
  trackVisible: boolean;
  selectedTrack: string | null;
  onPickTrack: (t: string) => void;
  studentSchoolCode: string;
  onChangeStudentSchoolCode: (v: string) => void;
}) {
  return (
    <>
      <div className={OB_FIELD}>
        <label className={LABEL}>Grade level</label>
        <div className="mb-5 flex gap-2" id="obCurriculumToggle">
          <button
            type="button"
            className={`flex flex-col items-center gap-0.5 rounded-btn border-1_5 border-ash-line bg-surface px-2.5 py-3 ${curriculum === "ng" ? "border-thread bg-thread-soft" : ""}`}
            onClick={() => onPickCurriculum("ng")}
          >
            <span className={`text-[12.5px] font-bold ${curriculum === "ng" ? "text-thread" : "text-ink-soft"}`}>Nigerian (JSS/SS)</span>
          </button>
          <button
            type="button"
            className={`flex flex-col items-center gap-0.5 rounded-btn border-1_5 border-ash-line bg-surface px-2.5 py-3 ${curriculum === "intl" ? "border-thread bg-thread-soft" : ""}`}
            onClick={() => onPickCurriculum("intl")}
          >
            <span className={`text-[12.5px] font-bold ${curriculum === "intl" ? "text-thread" : "text-ink-soft"}`}>International (Grade 9–12)</span>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2" id="obGradeGrid">
          {OB_GRADES[curriculum].map((g) => (
            <div
              key={g}
              className={`cursor-pointer rounded-tile border-1_5 border-ash-line px-1 py-[11px] text-center text-[13px] font-bold ${g === selectedGrade ? "border-thread bg-thread-soft text-thread" : ""}`}
              onClick={() => onPickGrade(g)}
            >
              {g}
            </div>
          ))}
        </div>
      </div>
      <div className={OB_FIELD}>
        <label className={LABEL}>Gender</label>
        <div className="grid grid-cols-2 gap-2" id="obGenderGrid">
          {["Female", "Male"].map((g) => (
            <div
              key={g}
              className={`cursor-pointer rounded-tile border-1_5 border-ash-line px-1 py-[11px] text-center text-[13px] font-bold ${g === selectedGender ? "border-thread bg-thread-soft text-thread" : ""}`}
              onClick={() => onPickGender(g)}
            >
              {g}
            </div>
          ))}
        </div>
      </div>
      <div className={`${OB_FIELD} ${trackVisible ? "block" : "hidden"}`} id="obTrackField">
        <label className={LABEL}>Class of study</label>
        <div className="grid grid-cols-3 gap-2" id="obTrackGrid">
          {["Science", "Arts", "Commercial"].map((t) => (
            <div
              key={t}
              className={`cursor-pointer rounded-tile border-1_5 border-ash-line px-1 py-[11px] text-center text-[13px] font-bold ${t === selectedTrack ? "border-thread bg-thread-soft text-thread" : ""}`}
              onClick={() => onPickTrack(t)}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className={OB_FIELD}>
        <label className={LABEL}>
          School code <span className="font-normal text-ash">(optional)</span>
        </label>
        <input
          type="text"
          className={`${QA_INPUT} uppercase`}
          id="obStudentSchoolCode"
          placeholder="e.g. CORONA2026"
          value={studentSchoolCode}
          onChange={(e) => onChangeStudentSchoolCode(e.target.value)}
        />
        <p className="mt-1.5 text-[11px] leading-[1.5] text-ash">
          Ask your school for their AbSTopiq code — it links your account to their plan, so
          you're covered free. Don't have one? Leave blank, you can add it later.
        </p>
      </div>
    </>
  );
}