"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { STUDY_ACTIVITY_MINUTES } from "../../data";
import type { SubjectData } from "./DiscoverScreen";
import { BackChevron, PlanStatusCard, type PlanStatus } from "./shared";

type Props = {
  subjects: Record<string, SubjectData>;
  goTab: (tab: string) => void;
  plan: PlanStatus;
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEAT_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function ProgressRow({ subject, subjectIndex }: { subject: { icon: string; name: string; mastery: number; color: string }; subjectIndex: number }) {
  const cells = [];
  for (let d = 0; d < 7; d++) {
    const seed = (subjectIndex * 7 + d * 3) % 10;
    const intensity = Math.max(0, subject.mastery / 100 - d * 0.06 + (seed % 3) * 0.05);
    cells.push(
      <div
        key={d}
        className="hm-cell"
        style={{ background: `var(--${subject.color})`, opacity: Math.min(0.95, Math.max(0.08, intensity)).toFixed(2) }}
      ></div>,
    );
  }
  return (
    <>
      <div className="hm-label">{subject.icon} {subject.name.split(" ")[0]}</div>
      {cells}
    </>
  );
}

export default function ProgressScreen({ subjects, goTab, plan }: Props) {
  const router = useRouter();

  const masteryRows = useMemo(
    () =>
      Object.keys(subjects).map((id) => {
        const s = subjects[id];
        return { icon: s.icon, name: s.name, mastery: s.mastery, color: s.color };
      }),
    [subjects],
  );

  const maxMin = Math.max(...STUDY_ACTIVITY_MINUTES, 1);

  return (
    <section className="screen active" id="screen-progress">
      <div className="back-row" onClick={() => goTab("discover")}>
        <BackChevron /> Discover
      </div>
      <span className="eyebrow">This term</span>
      <h1 className="page-title">Your progress</h1>
      <p className="page-sub">Grounded in what you've actually covered, not a guess.</p>
      <div id="progressPlanCard" onClick={() => router.push("/dashboard/upgrade")}>
        <PlanStatusCard plan={plan} />
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">12</div><div className="lbl">day streak</div></div>
        <div className="stat"><div className="num">184</div><div className="lbl">questions asked</div></div>
        <div className="stat"><div className="num">76%</div><div className="lbl">avg. mastery</div></div>
      </div>
      <span className="eyebrow">Study minutes, last 7 days</span>
      <div className="activity-chart-card">
        <div className="activity-bar-chart" id="activityBarChart">
          {STUDY_ACTIVITY_MINUTES.map((mins, i) => {
            const missed = mins === 0;
            const heightPct = missed ? 10 : Math.max(10, Math.round((mins / maxMin) * 100));
            return (
              <div className="activity-bar-col" key={i}>
                <span className="activity-bar-val">{missed ? "—" : mins + "m"}</span>
                <div className={`activity-bar${missed ? " missed" : ""}`} style={{ height: `${heightPct}%` }}></div>
                <span className="activity-bar-daylabel">{DAYS[i]}</span>
              </div>
            );
          })}
        </div>
        <div className="activity-chart-legend">
          <span><span className="legend-dot active"></span> Studied</span>
          <span><span className="legend-dot missed"></span> Missed day</span>
        </div>
      </div>
      <span className="eyebrow">Study activity, last 7 days</span>
      <div className="heatmap" id="progressHeatmap">
        <div></div>
        {HEAT_DAYS.map((d, i) => <div className="hm-day-label" key={d + i}>{d}</div>)}
        {masteryRows.map((s, si) => (
          <ProgressRow key={s.name} subject={s} subjectIndex={si} />
        ))}
      </div>
      <span className="eyebrow">Mastery by subject</span>
      <div className="card" id="progressMastery">
        {masteryRows.map((s) => (
          <div className="mastery-row" key={s.name}>
            <div className="mastery-name">{s.icon} {s.name}</div>
            <div className="mastery-track">
              <div className="mastery-fill" style={{ width: `${s.mastery}%`, background: `var(--${s.color})` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}