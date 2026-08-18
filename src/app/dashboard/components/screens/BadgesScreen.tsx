"use client";

import { useRouter } from "next/navigation";
import { SUBJECTS, earnedBadges, earnedCertificates } from "../../data";
import { useDashboard } from "../DashboardContext";
import { BackChevron } from "./shared";

const subjectsById = SUBJECTS as Record<string, { name: string; icon: string }>;

export default function BadgesScreen() {
  const router = useRouter();
  const { setCertSubject } = useDashboard();

  const certSubjectName = (subjectId: string) => {
    const s = subjectsById[subjectId];
    return s ? `${s.icon} ${s.name}` : subjectId;
  };

  return (
    <section className="screen active" id="screen-badges">
      <div className="back-row" onClick={() => router.push("/dashboard/profile")}>
        <BackChevron /> Profile
      </div>
      <span className="eyebrow">What you've earned</span>
      <h1 className="page-title">Badges &amp; Certificates</h1>
      <p className="page-sub">
        A badge for every topic you finish, and a certificate once you clear a whole subject.
      </p>

      <span className="eyebrow">Certificates of completion</span>
      <div className="card" style={{ padding: "4px 16px", marginBottom: 20 }} id="certificatesList">
        {earnedCertificates.length ? (
          earnedCertificates
            .slice()
            .reverse()
            .map((c) => {
              const s = subjectsById[c.subject];
              return (
                <div
                  className="badge-row"
                  key={c.subject}
                  onClick={() => setCertSubject(c.subject)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="badge-icon cert">🎓</div>
                  <div className="badge-body">
                    <div className="badge-title">{s ? s.name : c.subject} — Certificate of Completion</div>
                    <div className="badge-meta">Earned {c.date} · tap to view</div>
                  </div>
                </div>
              );
            })
        ) : (
          <p style={{ fontSize: 13, color: "var(--ash)", padding: "10px 4px" }}>
            Complete every topic in a subject to earn a certificate.
          </p>
        )}
      </div>

      <span className="eyebrow">Topic completion badges</span>
      <div className="card" style={{ padding: "4px 16px" }} id="badgesList">
        {earnedBadges.length ? (
          earnedBadges
            .slice()
            .reverse()
            .map((b) => (
              <div className="badge-row" key={`${b.subject}-${b.topic}`}>
                <div className="badge-icon">🏆</div>
                <div className="badge-body">
                  <div className="badge-title">{b.topic}</div>
                  <div className="badge-meta">
                    {certSubjectName(b.subject)} · {b.date}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p style={{ fontSize: 13, color: "var(--ash)", padding: "10px 4px" }}>
            Complete a topic in Learn to earn your first badge.
          </p>
        )}
      </div>
    </section>
  );
}