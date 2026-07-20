"use client";

import { useRef } from "react";
import { ArrowLeft, User, Camera, ArrowRight } from "lucide-react";

interface Props {
  role: "student" | "teacher" | "school" | null;
  username: string;
  setUsername: (v: string) => void;
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  age: string;
  setAge: (v: string) => void;
  dob: string;
  setDob: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  subjectsTaught: string[];
  setSubjectsTaught: (v: string[]) => void;
  schoolCode: string;
  setSchoolCode: (v: string) => void;
  instName: string;
  setInstName: (v: string) => void;
  contactName: string;
  setContactName: (v: string) => void;
  instPhone: string;
  setInstPhone: (v: string) => void;
  instSize: string;
  setInstSize: (v: string) => void;
  avatar: string | null;
  setAvatar: (v: string | null) => void;
  onNext: () => void;
  onBack: () => void;
  onFinish: () => void;
}

const SUBJECTS = [
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
];

export default function DetailsStep({
  role,
  username, setUsername,
  firstName, setFirstName,
  lastName, setLastName,
  age, setAge,
  dob, setDob,
  phone, setPhone,
  subjectsTaught, setSubjectsTaught,
  schoolCode, setSchoolCode,
  instName, setInstName,
  contactName, setContactName,
  instPhone, setInstPhone,
  instSize, setInstSize,
  avatar, setAvatar,
  onNext, onBack, onFinish,
}: Props) {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="text-center font-mono text-xs font-bold uppercase tracking-[.04em] bg-paper-dim text-ash px-1.75 py-0.5 rounded-lg w-fit mx-auto mb-3.5">
        Onboarding · Step 2 of 2
      </div>
      <h2 className="font-display text-[25px] font-semibold text-center mb-2 text-ink dark:text-white">
        Tell us about you
      </h2>
      <p className="text-sm text-ash text-center mb-7 leading-relaxed">
        Just the basics — you can edit this anytime.
      </p>

      {role === "student" && (
        <>
          <div
            className="flex flex-col items-center mb-6 cursor-pointer"
            onClick={() => avatarInputRef.current?.click()}
          >
            <div className="w-21 h-21 rounded-full bg-paper-dim border border-dashed border-ash-line flex items-center justify-center overflow-hidden relative mb-2">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={30} className="text-ash" strokeWidth={1.8} />
              )}
              <span className="absolute -bottom-px -right-px w-6.5 h-6.5 rounded-full bg-ink flex items-center justify-center border-2 border-white">
                <Camera size={13} className="text-white" strokeWidth={2.2} />
              </span>
            </div>
            <span className="text-[13px] font-semibold text-ash">Add profile picture</span>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => setAvatar(ev.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <div className="mb-5">
            <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Username</label>
            <div className="flex items-center gap-0.5 border-2 border-ash-line rounded-[10px] px-3.5">
              <span className="text-ash font-semibold text-sm">@</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-none outline-none py-3 px-0.5 text-sm flex-1 bg-transparent text-ink dark:text-white placeholder:text-ash/60"
                placeholder="chidinma_o"
              />
            </div>
          </div>

          <div className="flex gap-3 mb-5">
            <div className="flex-1">
              <label className="text-[13px] font-bold text-ink-soft block mb-1.5">First name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                placeholder="Chidinma"
              />
            </div>
            <div className="flex-1">
              <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Last name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                placeholder="Okafor"
              />
            </div>
          </div>

          <div className="flex gap-3 mb-5">
            <div className="flex-1">
              <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Age</label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                placeholder="16"
                min="8"
                max="25"
              />
            </div>
            <div className="flex-1">
              <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Date of birth</label>
              <input
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                type="date"
                className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[13px] font-bold text-ink-soft block mb-1.5">
              Phone number <span className="font-normal text-ash">(optional)</span>
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
              placeholder="080X XXX XXXX"
            />
          </div>
        </>
      )}

      {role === "teacher" && (
        <>
          <div className="flex gap-3 mb-5">
            <div className="flex-1">
              <label className="text-[13px] font-bold text-ink-soft block mb-1.5">First name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                placeholder="Funmilayo"
              />
            </div>
            <div className="flex-1">
              <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Last name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                placeholder="Adeyemi"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[13px] font-bold text-ink-soft block mb-1.5">
              Phone number <span className="font-normal text-ash">(optional)</span>
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
              placeholder="080X XXX XXXX"
            />
          </div>

          <div className="mb-5">
            <label className="text-[13px] font-bold text-ink-soft block mb-1.5">
              Subject(s) you teach
            </label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    setSubjectsTaught(
                      subjectsTaught.includes(s)
                        ? subjectsTaught.filter((x) => x !== s)
                        : [...subjectsTaught, s]
                    )
                  }
                  className={`px-3.5 py-1.75 rounded-[10px] text-sm font-bold border-2 transition ${
                    subjectsTaught.includes(s)
                      ? "border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                      : "border-ash-line text-ink-soft hover:border-brand-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

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
              Have a code from your school admin? Enter it and your Topiq
              for Teachers plan is covered by your school, free. No code —
              teach independently on the free plan, or upgrade anytime.
            </p>
          </div>
        </>
      )}

      {role === "school" && (
        <>
          <div className="mb-5">
            <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Institution name</label>
            <input
              value={instName}
              onChange={(e) => setInstName(e.target.value)}
              className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
              placeholder="Corona Secondary School"
            />
          </div>
          <div className="mb-5">
            <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Contact person</label>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
              placeholder="Full name"
            />
          </div>
          <div className="mb-5">
            <label className="text-[13px] font-bold text-ink-soft block mb-1.5">
              Phone number <span className="font-normal text-ash">(optional)</span>
            </label>
            <input
              value={instPhone}
              onChange={(e) => setInstPhone(e.target.value)}
              type="tel"
              className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
              placeholder="080X XXX XXXX"
            />
          </div>
          <div className="mb-5">
            <label className="text-[13px] font-bold text-ink-soft block mb-1.5">Estimated number of students</label>
            <input
              value={instSize}
              onChange={(e) => setInstSize(e.target.value)}
              type="number"
              className="w-full border-2 border-ash-line rounded-[10px] px-3.5 py-3 text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
              placeholder="e.g. 250"
            />
          </div>
        </>
      )}

      <button
        className="flex items-center gap-1.5 text-ash text-sm font-semibold cursor-pointer mb-4"
        onClick={onBack}
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <button
        onClick={role === "student" ? onNext : onFinish}
        disabled={!firstName || !lastName}
        className="w-full bg-ink dark:bg-white text-white dark:text-ink border-none py-3.25 rounded-[14px] font-bold text-base cursor-pointer mt-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all"
      >
        {role === "student" ? <>Next step <ArrowRight size={15} className="inline" /></> : <>Finish setup <ArrowRight size={15} className="inline" /></>}
      </button>
    </div>
  );
}
