"use client";

import { COMPETITIONS } from "../../data/challenges";
import type { SubjectData } from "./DiscoverScreen";
import { BackChevron } from "./shared";
import type { SessionCfg } from "../../practice/components/practiceTypes";

type Props = {
  subjects: Record<string, SubjectData>;
  goTab: (tab: string) => void;
  startSession: (cfg: SessionCfg) => void;
};

export default function CompetitionsScreen({ subjects, goTab, startSession }: Props) {
  const startPrepTrack = (subjectId: string) => {
    const s = subjects[subjectId];
    startSession({
      mode: "single",
      subjectId,
      board: s ? s.boards[0] : null,
      year: null,
      duration: 20,
      count: 10,
    });
  };

  return (
    <section className="screen active" id="screen-competitions">
      <div className="back-row" onClick={() => goTab("discover")}>
        <BackChevron /> Discover
      </div>
      <span className="eyebrow">Beyond the syllabus</span>
      <h1 className="page-title">🏆 Competitions</h1>
      <p className="page-sub">
        National and international academic competitions — Sabi AI can build you a prep track
        for any of these.
      </p>
      <div id="competitionsList">
        {COMPETITIONS.map((c) => {
          const s = subjects[c.subject];
          return (
            <div className="comp-card" key={c.name}>
              <div className="comp-top">
                <div className="comp-icon">{c.icon}</div>
                <div>
                  <div className="comp-name">{c.name}</div>
                  <div className="comp-level">{c.level}</div>
                </div>
              </div>
              <p className="comp-desc">{c.desc}</p>
              <div className="comp-meta-row">
                <span className="comp-tag">{s.icon} {s.name}</span>
                <span className="comp-tag">🗓 {c.months}</span>
              </div>
              <button className="comp-cta" onClick={() => startPrepTrack(c.subject)}>
                Start a prep track →
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}