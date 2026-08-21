"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { OB_TRACK_GRADES, SCHOOLS } from "../../../data";
import { useDashboard } from "../../DashboardContext";
import type { ObRole } from "../../DashboardContext";

const SCHOOLS_BY_CODE = SCHOOLS as Record<string, { name: string; id: string }>;

const STEP_ORDER: Record<string, number> = { auth: 1, role: 2, details: 3, details2: 4 };

export function useOnboarding() {
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
  const [obSelectedGrade, setObSelectedGrade] = useState<string | null>(null);
  const [obSelectedGender, setObSelectedGender] = useState<string | null>(null);
  const [obSelectedTrack, setObSelectedTrack] = useState<string | null>(null);
  const [obSelectedSubjects, setObSelectedSubjects] = useState<string[]>([]);
  const [obAvatarDataUrl, setObAvatarDataUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!onboardingOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [onboardingOpen]);

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

  return {
    onboardingOpen,
    step,
    goToStep,
    obRole,
    selectRole,
    obUsername,
    setObUsername,
    obFirstName,
    setObFirstName,
    obLastName,
    setObLastName,
    obAge,
    setObAge,
    obDob,
    setObDob,
    obPhone,
    setObPhone,
    obTFirstName,
    setObTFirstName,
    obTLastName,
    setObTLastName,
    obTPhone,
    setObTPhone,
    obInstName,
    setObInstName,
    obContactName,
    setObContactName,
    obInstPhone,
    setObInstPhone,
    obInstSize,
    setObInstSize,
    obTeacherSchoolCode,
    setObTeacherSchoolCode,
    obStudentSchoolCode,
    setObStudentSchoolCode,
    obSelectedGrade,
    setObSelectedGrade,
    obSelectedGender,
    setObSelectedGender,
    obSelectedTrack,
    setObSelectedTrack,
    obSelectedSubjects,
    setObSelectedSubjects,
    obAvatarDataUrl,
    setObAvatarDataUrl,
    avatarInputRef,
    previewAvatar,
    toggleSubject,
    pickGrade,
    trackVisible,
    detailsHeadline,
    detailsSub,
    detailsPrimaryLabel,
    detailsPrimary,
    finish,
    progressN,
  };
}