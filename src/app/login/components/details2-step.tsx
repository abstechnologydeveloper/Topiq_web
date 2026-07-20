"use client";

import { ArrowLeft } from "lucide-react";

interface Props {
  curriculum: "ng" | "intl";
  setCurriculum: (v: "ng" | "intl") => void;
  grade: string;
  setGrade: (v: string) => void;
  grades: string[];
  gender: string;
  setGender: (v: string) => void;
  track: string;
  setTrack: (v: string) => void;
  schoolCode: string;
  setSchoolCode: (v: string) => void;
  onBack: () => void;
  onFinish: () => void;
}

export default function Details2Step({
  curriculum, setCurriculum,
  grade, setGrade,
  grades,
  gender, setGender,
  track, setTrack,
  schoolCode, setSchoolCode,
  onBack, onFinish,
}: Props) {
  return (
    <div>
      <div className="text-center font-mono text-xs font-bold uppercase tracking-[.04em] bg-paper-dim text-ash px-1.75 py-0.5 rounded-lg w-fit mx-auto mb-3.5">
        Onboarding · Step 2 of 2
      </div>
      <h2 className="font-display text-[25px] font-semibold text-center mb-2 text-ink dark:text-white">
        Almost done
      </h2>
      <p className="text-sm text-ash text-center mb-7 leading-relaxed">
        This helps us match content to your class.
      </p>

      <div className="mb-5">
        <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Curriculum</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => { setCurriculum("ng"); setGrade(""); }}
            className={`flex-1 py-3 px-2 border-2 rounded-[14px] text-sm font-bold transition cursor-pointer ${
              curriculum === "ng"
                ? "border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                : "border-ash-line text-ink-soft bg-white dark:bg-ink"
            }`}
          >
            <span className="text-xs font-bold text-nowrap">Nigerian (JSS/SS)</span>
          </button>
          <button
            type="button"
            onClick={() => { setCurriculum("intl"); setGrade(""); }}
            className={`flex-1 py-3 px-2 border-2 rounded-[14px] text-sm font-bold transition cursor-pointer ${
              curriculum === "intl"
                ? "border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                : "border-ash-line text-ink-soft bg-white dark:bg-ink"
            }`}
          >
            <span className="text-xs font-bold text-nowrap">International (Grade 9–12)</span>
          </button>
        </div>
      </div>

      <div className="mb-5">
        <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Grade level</label>
        <div className="grid grid-cols-3 gap-2">
          {grades.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGrade(g)}
              className={`text-center py-3 px-1 border-2 rounded-xl font-bold text-sm cursor-pointer transition ${
                grade === g
                  ? "border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                  : "border-ash-line text-ink-soft bg-white dark:bg-ink hover:border-brand-600"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Gender</label>
        <div className="grid grid-cols-2 gap-2">
          {["Female", "Male"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={`text-center py-3 px-1 border-2 rounded-xl font-bold text-sm cursor-pointer transition ${
                gender === g
                  ? "border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                  : "border-ash-line text-ink-soft bg-white dark:bg-ink hover:border-brand-600"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {curriculum === "ng" && grade.startsWith("SS") && (
        <div className="mb-5">
          <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Class of study</label>
          <div className="grid grid-cols-3 gap-2">
            {["Science", "Arts", "Commercial"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrack(t)}
                className={`text-center py-3 px-1 border-2 rounded-xl font-bold text-sm cursor-pointer transition ${
                  track === t
                    ? "border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                    : "border-ash-line text-ink-soft bg-white dark:bg-ink hover:border-brand-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <label className="text-[13px] font-bold text-ink-soft block mb-1.5">
          School code <span className="font-normal text-ash">(optional)</span>
        </label>
        <input
          value={schoolCode}
          onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
          className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60 uppercase"
          placeholder="e.g. CORONA2026"
        />
        <p className="text-sm text-ash mt-1.5 leading-relaxed">
          Ask your school for their Topiq code — it links your account to
          their plan, so you're covered free. Don't have one? Leave blank,
          you can add it later.
        </p>
      </div>

      <button
        className="flex items-center gap-1.5 text-ash text-sm font-semibold cursor-pointer mb-4"
        onClick={onBack}
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <button
        onClick={onFinish}
        disabled={!grade}
        className="w-full bg-ink dark:bg-white text-white dark:text-ink border-none py-3.25 rounded-[14px] font-bold text-base cursor-pointer mt-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all"
      >
        Finish setup &rarr;
      </button>
    </div>
  );
}
