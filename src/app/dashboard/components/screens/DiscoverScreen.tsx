"use client";

import { useMemo, useRef, useState } from "react";
import { SearchIcon } from "./shared";
import { useDashboard } from "../DashboardContext";
import { ASSIGNMENTS } from "../../data";

export type SubjectData = {
  name: string;
  icon: string;
  color: string;
  mastery: number;
  level: string;
  boards: string[];
  mandatory?: boolean;
  topics: {
    t: string;
    pct: number;
    status: string;
    article?: { heading: string; text: string }[];
    takeaway?: string;
  }[];
  tutorials: { title: string; format: string; mins: string; icon: string; content?: string; ref?: string }[];
  flashcards: { front: string; back: string }[];
  papers: { year: string; board: string; q: string; explain: string; ref: string }[];
  questions: {
    tag: string;
    text: string;
    options: string[];
    correct: number;
    explain: string;
    ref: string;
  }[];
  passage?: unknown;
};

const PREFERRED_ORDER = ["mathematics", "biology", "physics", "chemistry", "english", "economics"];

type Props = {
  subjects: Record<string, SubjectData>;
  student: { grade: string };
  goTab: (tab: string) => void;
  openSubject: (id: string, pane?: string) => void;
};

export default function DiscoverScreen({ subjects, student, goTab, openSubject }: Props) {
  const { assignDone } = useDashboard();
  const [homeActiveSubject, setHomeActiveSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const ids = useMemo(() => {
    const preferred = PREFERRED_ORDER.filter((id) => subjects[id]);
    const rest = Object.keys(subjects).filter((id) => !PREFERRED_ORDER.includes(id));
    return preferred.concat(rest);
  }, [subjects]);

  const pendingAssign = useMemo(
    () => ASSIGNMENTS.filter((a) => !assignDone[a.id]).length,
    [assignDone],
  );

  const activeSubject = homeActiveSubject && subjects[homeActiveSubject] ? homeActiveSubject : ids[0];

  const searchIndex = useMemo(
    () =>
      Object.keys(subjects).flatMap((id) => {
        const s = subjects[id];
        return s.topics.map((t) => ({ subject: id, name: s.name, icon: s.icon, color: s.color, topic: t.t }));
      }),
    [subjects],
  );

  const matches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter(
      (r) => r.topic.toLowerCase().includes(q) || r.name.toLowerCase().includes(q),
    );
  }, [searchQuery, searchIndex]);

  const selectHomeSubject = (id: string) => setHomeActiveSubject(id);

  const heroTopic = useMemo<{ subject: string; topic: string; pct: number } | null>(() => {
    let best: { subject: string; topic: string; pct: number } | null = null;
    Object.keys(subjects).forEach((id) => {
      const s = subjects[id];
      const weakest = [...s.topics]
        .filter((t) => t.pct < 70)
        .sort((a, b) => a.pct - b.pct)[0];
      if (weakest && (!best || weakest.pct < best.pct)) {
        best = { subject: id, topic: weakest.t, pct: weakest.pct };
      }
    });
    return best;
  }, [subjects]);

  const heroSub = heroTopic ? subjects[heroTopic.subject] : null;

  return (
    <section className="screen active" id="screen-discover">
      <div className="greeting-header">
        <div className="gh-name">Good afternoon, Chidinma 👋</div>
        <div className="gh-meta">
          SS2 · <strong>47 days</strong> to WAEC
        </div>
      </div>

      <div className="search-wrap" ref={wrapRef}>
        <div className="home-search">
          <SearchIcon size={17} className="" />
          <input
            type="text"
            placeholder="Search any topic, e.g. osmosis…"
            value={searchQuery}
            onFocus={() => {
              if (searchQuery.trim()) setSearchOpen(true);
            }}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(!!e.target.value.trim());
            }}
          />
          <span className="hs-ai">✨</span>
        </div>
        {searchOpen && searchQuery.trim() ? (
          <div className="search-dropdown" onClick={(e) => e.stopPropagation()}>
            {matches.length
              ? matches.map((r, i) => (
                  <div
                    key={i}
                    className="result-row"
                    onClick={() => {
                      openSubject(r.subject, "overview");
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className="result-icon" style={{ background: `var(--${r.color}-soft)` }}>
                      {r.icon}
                    </div>
                    <div className="result-main">
                      <div className="result-title">{r.topic}</div>
                      <div className="result-meta">{r.name}</div>
                    </div>
                    <svg className="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                ))
              : (
                  <p style={{ padding: "14px 16px", color: "var(--ash)", fontSize: 13 }}>
                    No matches — try another topic or subject.
                  </p>
                )}
          </div>
        ) : null}
      </div>

      <div className="live-session-banner" style={{ display: "none" }}>
        <span className="ls-dot"></span>
        <div>
          <div className="ls-label">Live now</div>
          <div className="ls-title"></div>
        </div>
        <button className="ls-join">Join →</button>
      </div>

      <span className="eyebrow">Today&apos;s plan</span>
      <div
        className="continue-hero-card"
        onClick={() => heroTopic && openSubject(heroTopic.subject, "learn")}
      >
        <div className="chc-top">
          <div>
            <div className="chc-label">Up next · {heroSub ? heroSub.name : ""}</div>
            <div className="chc-title">
              {heroSub ? heroSub.icon : ""} {heroTopic ? heroTopic.topic : ""}
            </div>
          </div>
          <div className="chc-pct">{heroTopic ? heroTopic.pct + "%" : ""}</div>
        </div>
        <div className="chc-track">
          <div className="chc-fill" style={{ width: `${heroTopic ? heroTopic.pct : 0}%` }}></div>
        </div>
      </div>

      <div className="quick-card-row">
        <div className="quick-card" onClick={() => goTab("workspace")}>
          <div className="qc-icon">📅</div>
          <div className="qc-title">Timetable</div>
          <div className="qc-sub">3 sessions today</div>
        </div>
        <div className="quick-card" onClick={() => goTab("challenges")}>
          <div className="qc-icon">🏆</div>
          <div className="qc-title">Challenges</div>
          <div className="qc-sub">4 to try</div>
        </div>
        <div className="quick-card" onClick={() => goTab("studentassign")}>
          <div className="qc-icon">📋</div>
          <div className="qc-title">Assignments</div>
          <div className="qc-sub">{pendingAssign ? `${pendingAssign} pending` : "All caught up"}</div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span className="eyebrow" style={{ marginBottom: 0 }}>
          Your subjects
        </span>
        <span
          style={{ fontSize: 12, fontWeight: 700, color: "var(--thread)", cursor: "pointer" }}
          onClick={() => goTab("subjects")}
        >
          See all →
        </span>
      </div>

      <div className="home-subject-chips">
        {ids.map((id) => {
          const s = subjects[id];
          const tone = s.mastery >= 60 ? "var(--thread)" : s.mastery >= 35 ? "var(--ember)" : "var(--coral)";
          return (
            <div
              key={id}
              className={`home-subject-card${id === activeSubject ? " active" : ""}`}
              onClick={() => selectHomeSubject(id)}
            >
              <span className="hsc-icon-badge" style={{ background: `var(--${s.color}-soft)` }}>
                {s.icon}
              </span>
              <div className="hsc-name">{s.name.split(" ")[0]}</div>
              <div className="hsc-mastery" style={{ color: tone }}>
                {s.mastery}%
              </div>
            </div>
          );
        })}
      </div>

      <div>
        {activeSubject
          ? (() => {
              const s = subjects[activeSubject];
              return (
                <>
                  {s.topics.slice(0, 3).map((t, i) => {
                    const mins = 12 + ((i * 7 + t.pct) % 14);
                    const barColor = t.status === "ash-line" ? "ash-line" : t.status;
                    return (
                      <div
                        key={i}
                        className="home-topic-card"
                        onClick={() => openSubject(activeSubject, "overview")}
                      >
                        <span className="htc-icon" style={{ background: `var(--${s.color}-soft)` }}>
                          {s.icon}
                        </span>
                        <div className="htc-main">
                          <div className="htc-title">{t.t}</div>
                          <div className="htc-meta">
                            {student.grade} · {s.topics.length} sections
                          </div>
                        </div>
                        <div className="htc-side">
                          <div className="htc-time">🕐 {mins} min</div>
                          <div className="htc-bar-track">
                            <div
                              className="htc-bar-fill"
                              style={{ width: `${t.pct}%`, background: `var(--${barColor})` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="home-view-all" onClick={() => openSubject(activeSubject, "overview")}>
                    View all {s.name} topics →
                  </div>
                </>
              );
            })()
          : null}
      </div>

      <div className="promo-banner" onClick={() => goTab("subscription")} style={{ marginTop: 8 }}>
        <span className="pb-icon">🎓</span>
        <div>
          <div className="pb-title">WAEC registration closes in 6 weeks</div>
          <div className="pb-sub">
            Get the Exam-Ready Pass — unlimited Sabi AI + mock exams through results day
          </div>
        </div>
        <svg className="pb-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </section>
  );
}