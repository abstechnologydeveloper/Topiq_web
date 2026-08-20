"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { OB_GRADES, OB_TRACK_GRADES, SCHOOLS, SUBJECTS } from "../../data";
import { useDashboard } from "../DashboardContext";
import type { ObRole } from "../DashboardContext";

const SCHOOLS_BY_CODE = SCHOOLS as Record<string, { name: string; id: string }>;
const SUBJECTS_BY_ID = SUBJECTS as Record<string, { icon: string; name: string }>;

const STEP_ORDER: Record<string, number> = { auth: 1, role: 2, details: 3, details2: 4 };

const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const PersonSVG = ({ size = 30 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--ash)"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const CameraBadge = () => (
  <span className="avatar-badge">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  </span>
);

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
    <div className="onboarding-overlay" id="onboardingOverlay">
      <div className="ob-card">
        <div className={`ob-progress ${step === "auth" ? "" : "show"}`} id="obProgress">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`dot ${progressN >= n ? "done" : ""}`} id={`obDot${n}`} />
          ))}
        </div>

        {/* STEP 1: AUTH */}
        <div className={`ob-step ${step === "auth" ? "active" : ""}`} id="ob-step-auth">
          <div className="ob-brand">
            <Image className="brand-mark" src="/logo.png" alt="AbSTopiq" width={52} height={52} />
            <div className="brand-name" />
          </div>
          <div className="ob-headline">Learn it. Practice it. Sabi it.</div>
          <p className="ob-sub">Sign up in one tap — onboarding takes just a minute after.</p>

          <button className="auth-btn" onClick={() => goToStep("role")}>
            <span className="auth-icon google">
              <svg width="12" height="12" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                />
              </svg>
            </span> Continue with Google
          </button>
          <button className="auth-btn apple" onClick={() => goToStep("role")}>
            <span className="auth-icon apple">
              <svg width="13" height="13" viewBox="0 0 384 512">
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 2 168.4 2 273.5c0 20.9 4.1 44.1 12.4 69.3 10.7 32.1 49.3 119.2 89.6 117.9 22.5-.6 30-14.6 62.3-14.6 31.9 0 37.1 14.6 62.4 14.6 40.5.7 77.4-76.1 87.7-108.3-54.6-25.8-57.8-91.8-58.4-113.4zM256.5 62.3c18.3-22.1 15.6-43.6 15.1-46.3-16.8 1.1-35.7 11.9-46.9 25.7-10.3 12.6-19.6 32.1-15.4 49.7 17.3.8 35.1-8.4 47.2-29.1z"
                />
              </svg>
            </span> Continue with Apple
          </button>
          <button className="auth-btn facebook" onClick={() => goToStep("role")}>
            <span className="auth-icon facebook">
              <svg width="12" height="12" viewBox="0 0 24 24">
                <path
                  fill="#1877F2"
                  d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.026 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
                />
              </svg>
            </span> Continue with Facebook
          </button>
          <p className="ob-legal">
            By continuing, you agree to AbSTopiq's Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* STEP 2: ROLE */}
        <div className={`ob-step ${step === "role" ? "active" : ""}`} id="ob-step-role">
          <span className="mode-badge" style={{ display: "block", textAlign: "center", width: "fit-content", margin: "0 auto 14px" }}>
            Onboarding · Step 1 of 2
          </span>
          <div className="ob-headline">Who's this for?</div>
          <p className="ob-sub">This decides what your AbSTopiq looks like — we'll set it up right.</p>

          <div
            className={`role-card ${obRole === "student" ? "selected" : ""}`}
            id="obRoleStudent"
            onClick={() => selectRole("student")}
          >
            <span className="rc-icon">🎓</span>
            <div>
              <div className="rc-name">Student</div>
              <div className="rc-desc">Learn, practice, and prep for exams</div>
            </div>
          </div>
          <div
            className={`role-card ${obRole === "teacher" ? "selected" : ""}`}
            id="obRoleTeacher"
            onClick={() => selectRole("teacher")}
          >
            <span className="rc-icon">🍎</span>
            <div>
              <div className="rc-name">Teacher</div>
              <div className="rc-desc">Track a class and set assignments</div>
            </div>
          </div>
          <div
            className={`role-card ${obRole === "school" ? "selected" : ""}`}
            id="obRoleSchool"
            onClick={() => selectRole("school")}
          >
            <span className="rc-icon">🏫</span>
            <div>
              <div className="rc-name">School / Institution</div>
              <div className="rc-desc">Set up AbSTopiq for your whole school</div>
            </div>
          </div>

          <div className="ob-back" onClick={() => goToStep("auth")}>
            <BackIcon /> Back
          </div>
        </div>

        {/* STEP 3: DETAILS */}
        <div className={`ob-step ${step === "details" ? "active" : ""}`} id="ob-step-details">
          <span className="mode-badge" style={{ display: "block", textAlign: "center", width: "fit-content", margin: "0 auto 14px" }}>
            Onboarding · Step 2 of 2
          </span>
          <div className="ob-headline">{detailsHeadline}</div>
          <p className="ob-sub">{detailsSub}</p>

          {obRole === "student" && (
            <div id="obFieldsStudent">
              <div className="avatar-picker" onClick={() => avatarInputRef.current && avatarInputRef.current.click()}>
                <div className="avatar-circle" id="obAvatarCircle">
                  {obAvatarDataUrl ? (
                    <img src={obAvatarDataUrl} alt="Profile picture" />
                  ) : (
                    <>
                      <PersonSVG />
                      <CameraBadge />
                    </>
                  )}
                </div>
                <span className="avatar-hint">Add profile picture</span>
                <input
                  type="file"
                  accept="image/*"
                  id="obAvatarInput"
                  ref={avatarInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => previewAvatar(e.target.files?.[0])}
                />
              </div>
              <div className="ob-field">
                <label>Username</label>
                <div className="username-input-wrap">
                  <span>@</span>
                  <input
                    type="text"
                    id="obUsername"
                    placeholder="chidinma_o"
                    value={obUsername}
                    onChange={(e) => setObUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="ob-field-row">
                <div className="ob-field">
                  <label>First name</label>
                  <input
                    type="text"
                    className="qa-text-input"
                    id="obFirstName"
                    placeholder="Chidinma"
                    value={obFirstName}
                    onChange={(e) => setObFirstName(e.target.value)}
                  />
                </div>
                <div className="ob-field">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="qa-text-input"
                    id="obLastName"
                    placeholder="Okafor"
                    value={obLastName}
                    onChange={(e) => setObLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="ob-field-row">
                <div className="ob-field">
                  <label>Age</label>
                  <input
                    type="number"
                    className="qa-text-input"
                    id="obAge"
                    placeholder="16"
                    min={8}
                    max={25}
                    value={obAge}
                    onChange={(e) => setObAge(e.target.value)}
                  />
                </div>
                <div className="ob-field">
                  <label>Date of birth</label>
                  <input
                    type="date"
                    className="qa-text-input"
                    id="obDob"
                    value={obDob}
                    onChange={(e) => setObDob(e.target.value)}
                  />
                </div>
              </div>
              <div className="ob-field">
                <label>
                  Phone number <span style={{ fontWeight: 400, color: "var(--ash)" }}>(optional)</span>
                </label>
                <input
                  type="tel"
                  className="qa-text-input"
                  id="obPhone"
                  placeholder="080X XXX XXXX"
                  value={obPhone}
                  onChange={(e) => setObPhone(e.target.value)}
                />
              </div>
            </div>
          )}

          {obRole === "teacher" && (
            <div id="obFieldsTeacher">
              <div className="ob-field-row">
                <div className="ob-field">
                  <label>First name</label>
                  <input
                    type="text"
                    className="qa-text-input"
                    id="obTFirstName"
                    placeholder="Funmilayo"
                    value={obTFirstName}
                    onChange={(e) => setObTFirstName(e.target.value)}
                  />
                </div>
                <div className="ob-field">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="qa-text-input"
                    id="obTLastName"
                    placeholder="Adeyemi"
                    value={obTLastName}
                    onChange={(e) => setObTLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="ob-field">
                <label>
                  Phone number <span style={{ fontWeight: 400, color: "var(--ash)" }}>(optional)</span>
                </label>
                <input
                  type="tel"
                  className="qa-text-input"
                  id="obTPhone"
                  placeholder="080X XXX XXXX"
                  value={obTPhone}
                  onChange={(e) => setObTPhone(e.target.value)}
                />
              </div>
              <div className="ob-field">
                <label>Subject(s) you teach</label>
                <div className="ob-subject-grid" id="obSubjectGrid">
                  {Object.keys(SUBJECTS_BY_ID).map((id) => {
                    const s = SUBJECTS_BY_ID[id];
                    return (
                      <button
                        key={id}
                        className={`context-chip ${obSelectedSubjects.includes(id) ? "active" : ""}`}
                        onClick={() => toggleSubject(id)}
                      >
                        {s.icon} {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="ob-field">
                <label>
                  School code <span style={{ fontWeight: 400, color: "var(--ash)" }}>(optional)</span>
                </label>
                <input
                  type="text"
                  className="qa-text-input"
                  id="obTeacherSchoolCode"
                  placeholder="e.g. CORONA2026"
                  style={{ textTransform: "uppercase" }}
                  value={obTeacherSchoolCode}
                  onChange={(e) => setObTeacherSchoolCode(e.target.value)}
                />
                <p style={{ fontSize: 11, color: "var(--ash)", marginTop: 6, lineHeight: 1.5 }}>
                  Have a code from your school admin? Enter it and your AbSTopiq for Teachers plan is
                  covered by your school, free. No code — teach independently on the free plan, or
                  upgrade anytime.
                </p>
              </div>
            </div>
          )}

          {obRole === "school" && (
            <div id="obFieldsSchool">
              <div className="ob-field">
                <label>Institution name</label>
                <input
                  type="text"
                  className="qa-text-input"
                  id="obInstName"
                  placeholder="Corona Secondary School"
                  value={obInstName}
                  onChange={(e) => setObInstName(e.target.value)}
                />
              </div>
              <div className="ob-field">
                <label>Contact person</label>
                <input
                  type="text"
                  className="qa-text-input"
                  id="obContactName"
                  placeholder="Full name"
                  value={obContactName}
                  onChange={(e) => setObContactName(e.target.value)}
                />
              </div>
              <div className="ob-field">
                <label>
                  Phone number <span style={{ fontWeight: 400, color: "var(--ash)" }}>(optional)</span>
                </label>
                <input
                  type="tel"
                  className="qa-text-input"
                  id="obInstPhone"
                  placeholder="080X XXX XXXX"
                  value={obInstPhone}
                  onChange={(e) => setObInstPhone(e.target.value)}
                />
              </div>
              <div className="ob-field">
                <label>Estimated number of students</label>
                <input
                  type="number"
                  className="qa-text-input"
                  id="obInstSize"
                  placeholder="e.g. 250"
                  value={obInstSize}
                  onChange={(e) => setObInstSize(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="ob-back" onClick={() => goToStep("role")}>
            <BackIcon /> Back
          </div>
          <button className="ob-finish-btn" id="obDetailsPrimaryBtn" onClick={detailsPrimary}>
            {detailsPrimaryLabel}
          </button>
        </div>

        {/* STEP 4: DETAILS 2 (student only) */}
        <div className={`ob-step ${step === "details2" ? "active" : ""}`} id="ob-step-details2">
          <span className="mode-badge" style={{ display: "block", textAlign: "center", width: "fit-content", margin: "0 auto 14px" }}>
            Onboarding · Step 2 of 2
          </span>
          <div className="ob-headline">Almost done</div>
          <p className="ob-sub">This helps us match content to your class.</p>

          <div className="ob-field">
            <label>Grade level</label>
            <div className="type-toggle" id="obCurriculumToggle">
              <button
                type="button"
                className={`type-toggle-btn ${obCurriculum === "ng" ? "active" : ""}`}
                onClick={() => pickCurriculum("ng")}
              >
                <span className="ttb-name">Nigerian (JSS/SS)</span>
              </button>
              <button
                type="button"
                className={`type-toggle-btn ${obCurriculum === "intl" ? "active" : ""}`}
                onClick={() => pickCurriculum("intl")}
              >
                <span className="ttb-name">International (Grade 9–12)</span>
              </button>
            </div>
            <div className="ob-grade-grid" id="obGradeGrid">
              {OB_GRADES[obCurriculum].map((g) => (
                <div
                  key={g}
                  className={`ob-grade-chip ${g === obSelectedGrade ? "active" : ""}`}
                  onClick={() => pickGrade(g)}
                >
                  {g}
                </div>
              ))}
            </div>
          </div>
          <div className="ob-field">
            <label>Gender</label>
            <div className="ob-grade-grid" id="obGenderGrid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
              {["Female", "Male"].map((g) => (
                <div
                  key={g}
                  className={`ob-grade-chip ${g === obSelectedGender ? "active" : ""}`}
                  onClick={() => setObSelectedGender(g)}
                >
                  {g}
                </div>
              ))}
            </div>
          </div>
          <div className="ob-field" id="obTrackField" style={{ display: trackVisible ? "block" : "none" }}>
            <label>Class of study</label>
            <div className="ob-grade-grid" id="obTrackGrid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {["Science", "Arts", "Commercial"].map((t) => (
                <div
                  key={t}
                  className={`ob-grade-chip ${t === obSelectedTrack ? "active" : ""}`}
                  onClick={() => setObSelectedTrack(t)}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="ob-field">
            <label>
              School code <span style={{ fontWeight: 400, color: "var(--ash)" }}>(optional)</span>
            </label>
            <input
              type="text"
              className="qa-text-input"
              id="obStudentSchoolCode"
              placeholder="e.g. CORONA2026"
              style={{ textTransform: "uppercase" }}
              value={obStudentSchoolCode}
              onChange={(e) => setObStudentSchoolCode(e.target.value)}
            />
            <p style={{ fontSize: 11, color: "var(--ash)", marginTop: 6, lineHeight: 1.5 }}>
              Ask your school for their AbSTopiq code — it links your account to their plan, so
              you're covered free. Don't have one? Leave blank, you can add it later.
            </p>
          </div>

          <div className="ob-back" onClick={() => goToStep("details")}>
            <BackIcon /> Back
          </div>
          <button className="ob-finish-btn" onClick={finish}>
            Finish setup →
          </button>
        </div>
      </div>
    </div>
  );
}