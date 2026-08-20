"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { OB_TRACK_GRADES, SCHOOLS } from "../../data";
import { useDashboard } from "../DashboardContext";
import type { ObRole } from "../DashboardContext";
import AuthStep from "./onboarding/AuthStep";
import RoleStep from "./onboarding/RoleStep";
import { StudentDetails, StudentDetails2 } from "./onboarding/StudentFlow";
import { TeacherDetails } from "./onboarding/TeacherFlow";
import { AdminDetails } from "./onboarding/AdminFlow";
import { BACK, BackIcon, FINISH_BTN, MODE_BADGE } from "./onboarding/shared";

const SCHOOLS_BY_CODE = SCHOOLS as Record<string, { name: string; id: string }>;

const STEP_ORDER: Record<string, number> = { auth: 1, role: 2, details: 3, details2: 4 };

export default function OnboardingFlow() {
  const router = useRouter();
  const {
    onboardingOpen,
    finishOnboarding,
    setAppMode,
    setStudentSchool,
    setTeacherSchool,
    setProfile,
  } = useDashboard();

  const [step, setStep] = useState("auth");
  const [obRole, setObRole] = useState<ObRole | null>(null);
  const [obUsername, setObUsername] = useState("");
  const [obFirstName, setObFirstName] = useState("");
  const [obLastName, setObLastName] = useState("");
  const [obAge, setObAge] = useState("");
  const [obDob, setObDob] = useState("");
  const [obPhone, setObPhone] = useState("");
  const [obTFirstName, setObTFirstName] = useState("");
  const [obTLastName, setObTLastName] = useState("");
  const [obTPhone, setObTPhone] = useState("");
  const [obInstName, setObInstName] = useState("");
  const [obContactName, setObContactName] = useState("");
  const [obInstPhone, setObInstPhone] = useState("");
  const [obInstSize, setObInstSize] = useState("");
  const [obTeacherSchoolCode, setObTeacherSchoolCode] = useState("");
  const [obStudentSchoolCode, setObStudentSchoolCode] = useState("");
  const [obCurriculum, setObCurriculum] = useState<"ng" | "intl">("ng");
  const [obSelectedGrade, setObSelectedGrade] = useState<string | null>(null);
  const [obSelectedGender, setObSelectedGender] = useState<string | null>(null);
  const [obSelectedTrack, setObSelectedTrack] = useState<string | null>(null);
  const [obSelectedSubjects, setObSelectedSubjects] = useState<string[]>([]);
  const [obAvatarDataUrl, setObAvatarDataUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  if (!onboardingOpen) return null;

  const goToStep = (s: string) => setStep(s);

  const selectRole = (role: ObRole) => {
    setObRole(role);
    setTimeout(() => setStep("details"), 150);
  };

  const toggleSubject = (id: string) => {
    setObSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const pickGrade = (g: string) => setObSelectedGrade(g);

  const pickCurriculum = (sys: "ng" | "intl") => {
    setObCurriculum(sys);
    setObSelectedGrade(null);
  };

  const trackVisible = obSelectedGrade === null ? false : OB_TRACK_GRADES.includes(obSelectedGrade);

  const previewAvatar = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setObAvatarDataUrl((e.target?.result as string) || null);
    reader.readAsDataURL(file);
  };

  const detailsHeadline =
    obRole === "school" ? "Tell us about your school" : "Tell us about you";
  const detailsSub =
    obRole === "school" ? "One profile covers your whole institution." : "Just the basics — you can edit this anytime.";
  const detailsPrimaryLabel = obRole === "student" ? "Next →" : "Finish setup →";

  const finish = () => {
    if (obRole === "teacher") {
      const code = obTeacherSchoolCode.trim().toUpperCase();
      setTeacherSchool(SCHOOLS_BY_CODE[code] || null);
      setAppMode("teacher");
      finishOnboarding();
      router.push("/dashboard/teacherdash");
    } else if (obRole === "school") {
      setAppMode("school");
      finishOnboarding();
      router.push("/dashboard/schooladmin");
    } else {
      const rawUsername = obUsername.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
      setProfile({
        firstName: obFirstName.trim() || "Chidinma",
        lastName: obLastName.trim() || "Okafor",
        age: obAge.trim() || "16",
        dob: obDob || "",
        phone: obPhone.trim() || "",
        grade: obSelectedGrade || "SS2",
        gender: obSelectedGender || "",
        track: obSelectedTrack || "",
        username: rawUsername || "chidinma_o",
        avatar: obAvatarDataUrl,
        participatedSubjects: [],
      });
      const code = obStudentSchoolCode.trim().toUpperCase();
      setStudentSchool(SCHOOLS_BY_CODE[code] || null);
      setAppMode("student");
      finishOnboarding();
      router.push("/dashboard");
    }
  };

  const detailsPrimary = () => {
    if (obRole === "student") goToStep("details2");
    else finish();
  };

  const progressN = STEP_ORDER[step] || 1;

  return (
    <div
      className="fixed inset-0 z-1000 flex items-start justify-center overflow-y-auto bg-paper px-6 py-10 [-webkit-overflow-scrolling:touch]"
      id="onboardingOverlay"
    >
      <div className="w-full max-w-100">
        <div
          className={`mb-7 gap-1.5 ${step === "auth" ? "hidden" : "flex"}`}
          id="obProgress"
        >
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`flex-1 h-1 rounded-[3px] ${progressN >= n ? "bg-thread" : "bg-ash-line"}`}
              id={`obDot${n}`}
            />
          ))}
        </div>

        {/* STEP 1: AUTH */}
        <div
          className={`${step === "auth" ? "block animate-[fade_.25s_ease]" : "hidden"}`}
          id="ob-step-auth"
        >
          <AuthStep onContinue={() => goToStep("role")} />
        </div>

        {/* STEP 2: ROLE */}
        <div
          className={`${step === "role" ? "block animate-[fade_.25s_ease]" : "hidden"}`}
          id="ob-step-role"
        >
          <RoleStep role={obRole} onSelect={selectRole} onBack={() => goToStep("auth")} />
        </div>

        {/* STEP 3: DETAILS */}
        <div
          className={`${step === "details" ? "block animate-[fade_.25s_ease]" : "hidden"}`}
          id="ob-step-details"
        >
          <span className={MODE_BADGE}>
            Onboarding · Step 2 of 2
          </span>
          <div className="mb-2 text-center text-[23px] font-semibold [font-family:'Fraunces',serif]">{detailsHeadline}</div>
          <p className="mb-7 text-center text-[13.5px] leading-[1.6] text-ash">{detailsSub}</p>

          {obRole === "student" && (
            <StudentDetails
              avatarDataUrl={obAvatarDataUrl}
              avatarInputRef={avatarInputRef}
              onAvatarFile={previewAvatar}
              username={obUsername}
              onChangeUsername={setObUsername}
              firstName={obFirstName}
              onChangeFirstName={setObFirstName}
              lastName={obLastName}
              onChangeLastName={setObLastName}
              age={obAge}
              onChangeAge={setObAge}
              dob={obDob}
              onChangeDob={setObDob}
              phone={obPhone}
              onChangePhone={setObPhone}
            />
          )}
          {obRole === "teacher" && (
            <TeacherDetails
              tFirstName={obTFirstName}
              onChangeTFirstName={setObTFirstName}
              tLastName={obTLastName}
              onChangeTLastName={setObTLastName}
              tPhone={obTPhone}
              onChangeTPhone={setObTPhone}
              selectedSubjects={obSelectedSubjects}
              onToggleSubject={toggleSubject}
              teacherSchoolCode={obTeacherSchoolCode}
              onChangeTeacherSchoolCode={setObTeacherSchoolCode}
            />
          )}
          {obRole === "school" && (
            <AdminDetails
              instName={obInstName}
              onChangeInstName={setObInstName}
              contactName={obContactName}
              onChangeContactName={setObContactName}
              instPhone={obInstPhone}
              onChangeInstPhone={setObInstPhone}
              instSize={obInstSize}
              onChangeInstSize={setObInstSize}
            />
          )}

          <div className={BACK} onClick={() => goToStep("role")}>
            <BackIcon /> Back
          </div>
          <button className={FINISH_BTN} id="obDetailsPrimaryBtn" onClick={detailsPrimary}>
            {detailsPrimaryLabel}
          </button>
        </div>

        {/* STEP 4: DETAILS 2 (student only) */}
        <div
          className={`${step === "details2" ? "block animate-[fade_.25s_ease]" : "hidden"}`}
          id="ob-step-details2"
        >
          <span className={MODE_BADGE}>
            Onboarding · Step 2 of 2
          </span>
          <div className="mb-2 text-center text-[23px] font-semibold [font-family:'Fraunces',serif]">Almost done</div>
          <p className="mb-7 text-center text-[13.5px] leading-[1.6] text-ash">This helps us match content to your class.</p>

          {obRole === "student" && (
            <StudentDetails2
              curriculum={obCurriculum}
              onPickCurriculum={pickCurriculum}
              selectedGrade={obSelectedGrade}
              onPickGrade={pickGrade}
              selectedGender={obSelectedGender}
              onPickGender={setObSelectedGender}
              trackVisible={trackVisible}
              selectedTrack={obSelectedTrack}
              onPickTrack={setObSelectedTrack}
              studentSchoolCode={obStudentSchoolCode}
              onChangeStudentSchoolCode={setObStudentSchoolCode}
            />
          )}

          <div className={BACK} onClick={() => goToStep("details")}>
            <BackIcon /> Back
          </div>
          <button className={FINISH_BTN} onClick={finish}>
            Finish setup →
          </button>
        </div>
      </div>
    </div>
  );
}