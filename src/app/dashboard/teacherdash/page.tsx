"use client";

import { useDashboard } from "../components/DashboardContext";

export default function TeacherDashboardPage() {
  const { teacherSchool } = useDashboard();
  return (
    <section className="screen active" id="screen-teacherdash">
      <span className="eyebrow">Teacher workspace</span>
      <h1 className="page-title">Teacher Dashboard</h1>
      <p className="page-sub">
        Your classes, assignments and prep tools will live here.
      </p>
      <div className="plan-status-card">
        {teacherSchool ? (
          <>
            <span className="psc-icon">🏫</span>
            <div>
              <div className="psc-title">Covered by {teacherSchool.name}</div>
              <div className="psc-sub">
                Unlimited classes, assignments &amp; Sabi AI — free, via your school
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="psc-icon">🔓</span>
            <div>
              <div className="psc-title">Free plan</div>
              <div className="psc-sub">2/2 assignments left this term · Upgrade for unlimited</div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}