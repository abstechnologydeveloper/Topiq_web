"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth/store";
import ProgressDots from "./components/progress-dots";
import AuthStep from "./components/auth-step";
import RoleStep from "./components/role-step";
import DetailsStep from "./components/details-step";
import Details2Step from "./components/details2-step";
import type { OnboardingStep } from "./components/types";

const NG_GRADES = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
const INTL_GRADES = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];

export default function LoginPage() {
  const [step, setStep] = useState<OnboardingStep>("auth");
  const [role, setRole] = useState<"student" | "teacher" | "school" | null>(
    null,
  );
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [curriculum, setCurriculum] = useState<"ng" | "intl">("ng");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [track, setTrack] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [subjectsTaught, setSubjectsTaught] = useState<string[]>([]);
  const [instName, setInstName] = useState("");
  const [contactName, setContactName] = useState("");
  const [instPhone, setInstPhone] = useState("");
  const [instSize, setInstSize] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const { login, updateOnboarding } = useAuthStore();
  const router = useRouter();

  const grades = curriculum === "ng" ? NG_GRADES : INTL_GRADES;

  const handleSocialLogin = async () => {
    await login("user@example.com", "");
    setStep("role");
  };

  const goToStep = (s: OnboardingStep) => setStep(s);

  const handleFinishSetup = () => {
    updateOnboarding({
      firstName,
      lastName,
      age: parseInt(age) || 0,
      grade,
      board: "WAEC",
      role: role || "student",
      username,
      dob,
      phone,
      curriculum,
      gender,
      track,
      schoolCode,
      avatar: avatar || undefined,
    });
    router.push("/");
  };

  const handleRoleSelect = (r: "student" | "teacher" | "school") => {
    setRole(r);
    goToStep("details");
  };

  return (
    <div className="flex min-h-screen items-start justify-center px-6 py-10 bg-surface-50 dark:bg-ink">
      <div className="w-full max-w-100">
        <ProgressDots current={step} />

        {step === "auth" && <AuthStep onSocialLogin={handleSocialLogin} />}

        {step === "role" && (
          <RoleStep
            role={role}
            onSelect={handleRoleSelect}
            onBack={() => goToStep("auth")}
          />
        )}

        {step === "details" && (
          <DetailsStep
            role={role}
            username={username}
            setUsername={setUsername}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            age={age}
            setAge={setAge}
            dob={dob}
            setDob={setDob}
            phone={phone}
            setPhone={setPhone}
            subjectsTaught={subjectsTaught}
            setSubjectsTaught={setSubjectsTaught}
            schoolCode={schoolCode}
            setSchoolCode={setSchoolCode}
            instName={instName}
            setInstName={setInstName}
            contactName={contactName}
            setContactName={setContactName}
            instPhone={instPhone}
            setInstPhone={setInstPhone}
            instSize={instSize}
            setInstSize={setInstSize}
            avatar={avatar}
            setAvatar={setAvatar}
            onNext={() => goToStep("details2")}
            onBack={() => goToStep("role")}
            onFinish={handleFinishSetup}
          />
        )}

        {step === "details2" && (
          <Details2Step
            curriculum={curriculum}
            setCurriculum={setCurriculum}
            grade={grade}
            setGrade={setGrade}
            grades={grades}
            gender={gender}
            setGender={setGender}
            track={track}
            setTrack={setTrack}
            schoolCode={schoolCode}
            setSchoolCode={setSchoolCode}
            onBack={() => goToStep("details")}
            onFinish={handleFinishSetup}
          />
        )}
      </div>
    </div>
  );
}
