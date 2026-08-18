"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { OB_GRADES, OB_TRACK_GRADES } from "../../data";
import { useDashboard } from "../DashboardContext";
import { BackChevron } from "./shared";

const PersonPlaceholder = () => (
  <svg
    width="24"
    height="24"
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
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  </span>
);

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, setProfile, goTab, studentSchool } = useDashboard();
  const fileRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);
  const [peFirstName, setPeFirstName] = useState("");
  const [peLastName, setPeLastName] = useState("");
  const [peAge, setPeAge] = useState("");
  const [peDob, setPeDob] = useState("");
  const [pePhone, setPePhone] = useState("");
  const [peUsername, setPeUsername] = useState("");
  const [peCurriculum, setPeCurriculum] = useState<"ng" | "intl">("ng");
  const [peSelectedGrade, setPeSelectedGrade] = useState<string | null>(null);
  const [peSelectedGender, setPeSelectedGender] = useState<string | null>(null);
  const [peSelectedTrack, setPeSelectedTrack] = useState<string | null>(null);
  const [peAvatarDataUrl, setPeAvatarDataUrl] = useState<string | null>(null);

  const openProfileEdit = () => {
    setPeFirstName(profile.firstName);
    setPeLastName(profile.lastName);
    setPeAge(profile.age);
    setPeDob(profile.dob);
    setPePhone(profile.phone);
    setPeUsername(profile.username || "");
    setPeAvatarDataUrl(profile.avatar || null);
    setPeSelectedGrade(profile.grade);
    setPeCurriculum(profile.grade.startsWith("Grade") ? "intl" : "ng");
    setPeSelectedGender(profile.gender);
    setPeSelectedTrack(profile.track);
    setEditing(true);
  };

  const closeProfileEdit = () => setEditing(false);

  const previewAvatar = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setPeAvatarDataUrl((e.target?.result as string) || null);
    reader.readAsDataURL(file);
  };

  const pePickCurriculum = (sys: "ng" | "intl") => {
    setPeCurriculum(sys);
    setPeSelectedGrade(null);
  };

  const pePickChip = (group: "peGrade" | "peGender" | "peTrack", value: string) => {
    if (group === "peGrade") setPeSelectedGrade(value);
    else if (group === "peGender") setPeSelectedGender(value);
    else setPeSelectedTrack(value);
  };

  const trackVisible = peSelectedGrade === null ? false : OB_TRACK_GRADES.includes(peSelectedGrade);

  const saveProfileEdit = () => {
    const rawUsername = peUsername.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
    setProfile({
      firstName: peFirstName.trim() || profile.firstName,
      lastName: peLastName.trim() || profile.lastName,
      age: peAge.trim() || profile.age,
      dob: peDob || profile.dob,
      phone: pePhone.trim() || profile.phone,
      grade: peSelectedGrade || profile.grade,
      gender: peSelectedGender || profile.gender,
      track: peSelectedTrack || profile.track,
      username: rawUsername || profile.username,
      avatar: peAvatarDataUrl,
      participatedSubjects: profile.participatedSubjects,
    });
    setEditing(false);
  };

  const avatarImgOrPlaceholder = (withBadge: boolean) =>
    peAvatarDataUrl ? (
      <img src={peAvatarDataUrl} alt="Profile picture" />
    ) : (
      <>
        <PersonPlaceholder />
        {withBadge && <CameraBadge />}
      </>
    );

  return (
    <section className="screen active" id="screen-profile">
      <div className="back-row" onClick={() => router.push("/dashboard/progress")}>
        <BackChevron /> Progress
      </div>
      <span className="eyebrow">Your account</span>
      <h1 className="page-title">Profile</h1>
      <p className="page-sub">The basics we use to personalise AbSTopiq for you.</p>

      {!editing && (
        <div id="profileView">
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div className="avatar-circle-sm" id="pvAvatar">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile picture" />
              ) : (
                <PersonPlaceholder />
              )}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }} id="pvFullName">
                {[profile.firstName, profile.lastName].join(" ").trim() || "—"}
              </div>
              <div style={{ fontSize: 13, color: "var(--ash)" }} id="pvUsername">
                {profile.username ? `@${profile.username}` : ""}
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: "4px 16px", marginBottom: 16 }}>
            {[
              ["pvFirstName", "First name", profile.firstName || "—"],
              ["pvLastName", "Last name", profile.lastName || "—"],
              ["pvAge", "Age", profile.age || "—"],
              ["pvDob", "Date of birth", profile.dob || "—"],
              ["pvPhone", "Phone number", profile.phone || "—"],
              ["pvGrade", "Grade level", profile.grade || "—"],
              ["pvGender", "Gender", profile.gender || "—"],
              ["pvTrack", "Class of study", profile.track || "—"],
              ["pvSchool", "School", studentSchool ? studentSchool.name : "Not linked — individual account"],
            ].map(([id, label, value], i) => (
              <div className="roster-row" key={label}>
                <div className="roster-name" style={{ fontWeight: 600, color: "var(--ash)" }}>
                  {label}
                </div>
                <div
                  className="topic-pct"
                  id={id}
                  style={{ width: "auto", fontWeight: 700, color: "var(--ink)", textAlign: "right" }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
          <button className="add-entry-btn" onClick={openProfileEdit}>
            ✎ Edit profile
          </button>
          <button className="add-entry-btn" style={{ marginTop: 10 }} onClick={() => goTab("badges")}>
            🏆 Badges &amp; Certificates
          </button>
          <button className="add-entry-btn" style={{ marginTop: 10 }} onClick={() => goTab("settings")}>
            ⚙ Settings
          </button>
        </div>
      )}

      {editing && (
        <div id="profileEdit">
          <div
            className="avatar-picker"
            onClick={() => fileRef.current && fileRef.current.click()}
          >
            <div className="avatar-circle" id="peAvatarCircle">
              {avatarImgOrPlaceholder(true)}
            </div>
            <span className="avatar-hint">Change profile picture</span>
            <input
              type="file"
              accept="image/*"
              id="peAvatarInput"
              ref={fileRef}
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
                id="peUsername"
                value={peUsername}
                onChange={(e) => setPeUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="ob-field-row">
            <div className="ob-field">
              <label>First name</label>
              <input
                type="text"
                className="qa-text-input"
                id="peFirstName"
                value={peFirstName}
                onChange={(e) => setPeFirstName(e.target.value)}
              />
            </div>
            <div className="ob-field">
              <label>Last name</label>
              <input
                type="text"
                className="qa-text-input"
                id="peLastName"
                value={peLastName}
                onChange={(e) => setPeLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="ob-field-row">
            <div className="ob-field">
              <label>Age</label>
              <input
                type="number"
                className="qa-text-input"
                id="peAge"
                value={peAge}
                onChange={(e) => setPeAge(e.target.value)}
              />
            </div>
            <div className="ob-field">
              <label>Date of birth</label>
              <input
                type="date"
                className="qa-text-input"
                id="peDob"
                value={peDob}
                onChange={(e) => setPeDob(e.target.value)}
              />
            </div>
          </div>
          <div className="ob-field">
            <label>Phone number</label>
            <input
              type="tel"
              className="qa-text-input"
              id="pePhone"
              value={pePhone}
              onChange={(e) => setPePhone(e.target.value)}
            />
          </div>
          <div className="ob-field">
            <label>Curriculum</label>
            <div className="type-toggle" id="peCurriculumToggle">
              <button
                type="button"
                className={`type-toggle-btn ${peCurriculum === "ng" ? "active" : ""}`}
                onClick={() => pePickCurriculum("ng")}
              >
                <span className="ttb-name">Nigerian (JSS/SS)</span>
              </button>
              <button
                type="button"
                className={`type-toggle-btn ${peCurriculum === "intl" ? "active" : ""}`}
                onClick={() => pePickCurriculum("intl")}
              >
                <span className="ttb-name">International (Grade 9–12)</span>
              </button>
            </div>
          </div>
          <div className="ob-field">
            <label>Grade level</label>
            <div className="ob-grade-grid" id="peGradeGrid">
              {OB_GRADES[peCurriculum].map((g) => (
                <div
                  key={g}
                  className={`ob-grade-chip ${g === peSelectedGrade ? "active" : ""}`}
                  onClick={() => pePickChip("peGrade", g)}
                >
                  {g}
                </div>
              ))}
            </div>
          </div>
          <div className="ob-field">
            <label>Gender</label>
            <div className="ob-grade-grid" id="peGenderGrid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
              {["Female", "Male"].map((g) => (
                <div
                  key={g}
                  className={`ob-grade-chip ${g === peSelectedGender ? "active" : ""}`}
                  onClick={() => pePickChip("peGender", g)}
                >
                  {g}
                </div>
              ))}
            </div>
          </div>
          <div className="ob-field" id="peTrackField" style={{ display: trackVisible ? "block" : "none" }}>
            <label>Class of study</label>
            <div className="ob-grade-grid" id="peTrackGrid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {["Science", "Arts", "Commercial"].map((t) => (
                <div
                  key={t}
                  className={`ob-grade-chip ${t === peSelectedTrack ? "active" : ""}`}
                  onClick={() => pePickChip("peTrack", t)}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
          <button className="modal-done-btn" style={{ width: "100%" }} onClick={saveProfileEdit}>
            Save changes
          </button>
          <button className="add-entry-btn" style={{ marginTop: 10 }} onClick={closeProfileEdit}>
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}