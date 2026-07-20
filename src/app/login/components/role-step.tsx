"use client";

import { GraduationCap, BookOpen, Building2, ArrowLeft } from "lucide-react";

interface Props {
  role: "student" | "teacher" | "school" | null;
  onSelect: (role: "student" | "teacher" | "school") => void;
  onBack: () => void;
}

const ROLES = [
  {
    key: "student" as const,
    icon: GraduationCap,
    name: "Student",
    desc: "Learn, practice, and prep for exams",
  },
  {
    key: "teacher" as const,
    icon: BookOpen,
    name: "Teacher",
    desc: "Track a class and set assignments",
  },
  {
    key: "school" as const,
    icon: Building2,
    name: "School / Institution",
    desc: "Set up Topiq for your whole school",
  },
];

export default function RoleStep({ role, onSelect, onBack }: Props) {
  return (
    <div>
      <div className="text-center font-mono text-xs font-bold uppercase tracking-[.04em] bg-paper-dim text-ash px-1.75 py-0.5 rounded-lg w-fit mx-auto mb-3.5">
        Onboarding · Step 1 of 2
      </div>
      <h2 className="font-display text-[25px] font-semibold text-center mb-2 text-ink dark:text-white">
        Who's this for?
      </h2>
      <p className="text-sm text-ash text-center mb-7 leading-relaxed">
        This decides what your Topiq looks like — we'll set it up right.
      </p>

      {ROLES.map((r) => {
        const Icon = r.icon;
        return (
          <div
            key={r.key}
            className={`flex items-center gap-3.5 bg-white dark:bg-ink border-2 border-ash-line rounded-2xl p-4 mb-3 cursor-pointer transition-all ${
              role === r.key
                ? "border-brand-600 bg-brand-50 dark:bg-brand-900/20"
                : "hover:border-brand-600"
            }`}
            onClick={() => onSelect(r.key)}
          >
            <Icon size={26} className="shrink-0 text-ink dark:text-white" />
            <div>
              <div className="font-bold text-base text-ink dark:text-white">
                {r.name}
              </div>
              <div className="text-sm text-ash">{r.desc}</div>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        className="flex items-center gap-1.5 text-ash text-sm font-semibold cursor-pointer mb-4"
        onClick={onBack}
      >
        <ArrowLeft size={15} />
        Back
      </button>
    </div>
  );
}
