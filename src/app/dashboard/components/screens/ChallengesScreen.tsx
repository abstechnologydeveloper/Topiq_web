"use client";

import { useRouter } from "next/navigation";
import { CHALLENGE_TEMPLATES } from "../../data";
import { useDashboard } from "../DashboardContext";
import { BackChevron } from "./shared";

export default function ChallengesScreen() {
  const router = useRouter();
  const { subjects, activeChallenges, completedChallenges, startChallenge, cancelChallenge } =
    useDashboard();

  const weakestSubjectId = () =>
    Object.keys(subjects).sort((a, b) => subjects[a].mastery - subjects[b].mastery)[0];

  const currentFor = (entry: (typeof activeChallenges)[number]) => {
    const t = CHALLENGE_TEMPLATES.find((x) => x.id === entry.templateId);
    if (!t) return entry.progress;
    if (t.type === "mastery")
      return Math.max(0, subjects[weakestSubjectId()].mastery - (entry.baseline || 0));
    return entry.progress;
  };

  const pctFor = (entry: (typeof activeChallenges)[number]) => {
    const t = CHALLENGE_TEMPLATES.find((x) => x.id === entry.templateId);
    if (!t) return 0;
    return Math.min(100, Math.round((currentFor(entry) / t.target) * 100));
  };

  const available = CHALLENGE_TEMPLATES.map((t) => {
    const active = activeChallenges.some((c) => c.templateId === t.id);
    const done = completedChallenges.includes(t.id);
    return { ...t, active, done };
  });

  return (
    <section className="screen active" id="screen-challenges">
      <div className="back-row" onClick={() => router.push("/dashboard")}>
        <BackChevron /> Discover
      </div>
      <span className="eyebrow">Push yourself</span>
      <h1 className="page-title">Challenges</h1>
      <p className="page-sub">
        Set a target, then chip away at it — practising toward a challenge counts the same as
        regular practice.
      </p>

      <div id="activeChallengesSection" style={{ display: activeChallenges.length ? "block" : "none" }}>
        <span className="eyebrow">In progress</span>
        <div id="activeChallengesList" style={{ marginBottom: 22 }}>
          {activeChallenges.map((entry) => {
            const t = CHALLENGE_TEMPLATES.find((x) => x.id === entry.templateId);
            if (!t) return null;
            const current = currentFor(entry);
            return (
              <div className="challenge-card" key={entry.templateId}>
                <div className="ch-top">
                  <div className="ch-icon">{t.icon}</div>
                  <div>
                    <div className="ch-title">{t.title}</div>
                    <div className="ch-desc">{t.desc}</div>
                  </div>
                </div>
                <div className="ch-track">
                  <div className="ch-fill" style={{ width: `${pctFor(entry)}%` }}></div>
                </div>
                <div className="ch-meta-row">
                  <span className="ch-progress-label">
                    {current}/{t.target} {t.unit}
                  </span>
                  <span
                    className="ch-progress-label"
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => cancelChallenge(t.id)}
                  >
                    Give up
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <span className="eyebrow">Start a challenge</span>
      <div id="availableChallengesList" style={{ marginBottom: 22 }}>
        {available.map((t) => (
          <div className="challenge-card" key={t.id}>
            <div className="ch-top">
              <div className="ch-icon">{t.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="ch-title">{t.title}</div>
                <div className="ch-desc">{t.desc}</div>
              </div>
              <button
                className="ch-start-btn"
                disabled={t.active || t.done}
                onClick={() => startChallenge(t.id)}
              >
                {t.done ? "Done ✓" : t.active ? "Active" : "Start"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div id="completedChallengesSection" style={{ display: completedChallenges.length ? "block" : "none" }}>
        <span className="eyebrow">Completed</span>
        <div id="completedChallengesList">
          {completedChallenges.map((id) => {
            const t = CHALLENGE_TEMPLATES.find((x) => x.id === id);
            if (!t) return null;
            return (
              <div className="challenge-card done" key={id}>
                <div className="ch-top">
                  <div className="ch-icon">{t.icon}</div>
                  <div>
                    <div className="ch-title">{t.title}</div>
                    <div className="ch-desc">Completed 🎉</div>
                  </div>
                  <span className="ch-badge">EARNED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}