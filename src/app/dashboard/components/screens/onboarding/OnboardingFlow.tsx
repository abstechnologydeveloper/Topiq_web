"use client";

import { useOnboarding } from "./useOnboarding";
import AuthStep from "./AuthStep";
import RoleStep from "./RoleStep";
import { StudentDetails, StudentDetails2 } from "./StudentFlow";
import { TeacherDetails } from "./TeacherFlow";
import { AdminDetails } from "./AdminFlow";
import { BACK, BackIcon, FINISH_BTN, MODE_BADGE } from "./shared";

export default function OnboardingFlow() {
  const o = useOnboarding();

  if (!o.onboardingOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-paper px-6 py-10 [-webkit-overflow-scrolling:touch]"
      id="onboardingOverlay"
    >
      <div className="w-full max-w-100">
        <div
          className={`mb-7 gap-1.5 ${o.step === "auth" ? "hidden" : "flex"}`}
          id="obProgress"
        >
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`flex-1 h-1 rounded-[3px] ${o.progressN >= n ? "bg-thread" : "bg-ash-line"}`}
              id={`obDot${n}`}
            />
          ))}
        </div>

        {/* STEP 1: AUTH */}
        <div
          className={`${o.step === "auth" ? "block animate-[fade_.25s_ease]" : "hidden"}`}
          id="ob-step-auth"
        >
          <AuthStep onContinue={() => o.goToStep("role")} />
        </div>

        {/* STEP 2: ROLE */}
        <div
          className={`${o.step === "role" ? "block animate-[fade_.25s_ease]" : "hidden"}`}
          id="ob-step-role"
        >
          <RoleStep role={o.obRole} onSelect={o.selectRole} onBack={() => o.goToStep("auth")} />
        </div>

        {/* STEP 3: DETAILS */}
        <div
          className={`${o.step === "details" ? "block animate-[fade_.25s_ease]" : "hidden"}`}
          id="ob-step-details"
        >
          <span className={MODE_BADGE}>
            Onboarding · Step 2 of 2
          </span>
          <div className="mb-2 text-center text-headline font-semibold font-display">{o.detailsHeadline}</div>
          <p className="mb-7 text-center text-sub text-ash">{o.detailsSub}</p>

          {o.obRole === "student" && (
            <StudentDetails
              avatarDataUrl={o.obAvatarDataUrl}
              avatarInputRef={o.avatarInputRef}
              onAvatarFile={o.previewAvatar}
              username={o.obUsername}
              onChangeUsername={o.setObUsername}
              firstName={o.obFirstName}
              onChangeFirstName={o.setObFirstName}
              lastName={o.obLastName}
              onChangeLastName={o.setObLastName}
              age={o.obAge}
              onChangeAge={o.setObAge}
              dob={o.obDob}
              onChangeDob={o.setObDob}
              phone={o.obPhone}
              onChangePhone={o.setObPhone}
            />
          )}
          {o.obRole === "teacher" && (
            <TeacherDetails
              tFirstName={o.obTFirstName}
              onChangeTFirstName={o.setObTFirstName}
              tLastName={o.obTLastName}
              onChangeTLastName={o.setObTLastName}
              tPhone={o.obTPhone}
              onChangeTPhone={o.setObTPhone}
              selectedSubjects={o.obSelectedSubjects}
              onToggleSubject={o.toggleSubject}
              teacherSchoolCode={o.obTeacherSchoolCode}
              onChangeTeacherSchoolCode={o.setObTeacherSchoolCode}
            />
          )}
          {o.obRole === "school" && (
            <AdminDetails
              instName={o.obInstName}
              onChangeInstName={o.setObInstName}
              contactName={o.obContactName}
              onChangeContactName={o.setObContactName}
              instPhone={o.obInstPhone}
              onChangeInstPhone={o.setObInstPhone}
              instSize={o.obInstSize}
              onChangeInstSize={o.setObInstSize}
            />
          )}

          <div className={BACK} onClick={() => o.goToStep("role")}>
            <BackIcon /> Back
          </div>
          <button className={FINISH_BTN} id="obDetailsPrimaryBtn" onClick={o.detailsPrimary}>
            {o.detailsPrimaryLabel}
          </button>
        </div>

        {/* STEP 4: DETAILS 2 (student only) */}
        <div
          className={`${o.step === "details2" ? "block animate-[fade_.25s_ease]" : "hidden"}`}
          id="ob-step-details2"
        >
          <span className={MODE_BADGE}>
            Onboarding · Step 2 of 2
          </span>
          <div className="mb-2 text-center text-headline font-semibold font-display">Almost done</div>
          <p className="mb-7 text-center text-sub text-ash">This helps us match content to your class.</p>

          {o.obRole === "student" && (
            <StudentDetails2
              curriculum={o.obCurriculum}
              onPickCurriculum={o.pickCurriculum}
              selectedGrade={o.obSelectedGrade}
              onPickGrade={o.pickGrade}
              selectedGender={o.obSelectedGender}
              onPickGender={o.setObSelectedGender}
              trackVisible={o.trackVisible}
              selectedTrack={o.obSelectedTrack}
              onPickTrack={o.setObSelectedTrack}
              studentSchoolCode={o.obStudentSchoolCode}
              onChangeStudentSchoolCode={o.setObStudentSchoolCode}
            />
          )}

          <div className={BACK} onClick={() => o.goToStep("details")}>
            <BackIcon /> Back
          </div>
          <button className={FINISH_BTN} onClick={o.finish}>
            Finish setup →
          </button>
        </div>
      </div>
    </div>
  );
}