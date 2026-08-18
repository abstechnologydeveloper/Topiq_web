"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, LIVE_CLASS_LOG, ROSTERS, TIMETABLE } from "../../data";
import type { SubjectData } from "./DiscoverScreen";
import type { SessionCfg } from "./practiceTypes";
import { BackChevron } from "./shared";

type Props = {
  subjects: Record<string, SubjectData>;
  student: { grade: string };
  startSession: (cfg: SessionCfg) => void;
};

type LiveSession = {
  classId: string;
  subjectId: string;
  topicIndex: number;
  pollIndex: number;
};

const seedLive: LiveSession = { classId: "ss2bio", subjectId: "biology", topicIndex: 1, pollIndex: 0 };
const HUB_PANES = ["today", "upcoming", "attended", "missed"] as const;

function getTopicSections(subject: SubjectData, topicIndex: number) {
  const topic = subject.topics[topicIndex];
  if (topic && topic.article) return topic.article;
  return subject.tutorials.slice(0, 2).map((t) => ({ heading: t.title, text: t.content || "Content grounded in your syllabus goes here." }));
}

export default function LiveClassScreen({ subjects, student, startSession }: Props) {
  const router = useRouter();
  const [liveSession, setLiveSession] = useState<LiveSession | null>(seedLive);
  const [view, setView] = useState<"hub" | "session">("hub");
  const [hubPane, setHubPane] = useState<(typeof HUB_PANES)[number]>("today");
  const [livePane, setLivePane] = useState<"learn" | "practice" | "interactive">("learn");
  const [pollAnswered, setPollAnswered] = useState(false);
  const [pollResponses, setPollResponses] = useState(0);
  const [latestPick, setLatestPick] = useState<number>(-1);
  const [pollPcts, setPollPcts] = useState<number[]>([]);

  const liveIdx = liveSession ? (TIMETABLE["Mon"] as { time: string; subj: string }[]).findIndex((p) => p.subj === liveSession.subjectId) : -1;
  const liveClass = liveSession ? CLASSES.find((c) => c.id === liveSession.classId) : undefined;

  const openHub = () => {
    setView("hub");
    setLivePane("learn");
    setPollAnswered(false);
  };

  const openSession = () => {
    if (!liveSession) return;
    setView("session");
    setLivePane("learn");
    setPollAnswered(false);
  };

  const selectHubPane = (name: (typeof HUB_PANES)[number]) => setHubPane(name);

  const todayRows = (TIMETABLE["Mon"] as { time: string; subj: string }[]).map((p, i) => {
    const s = subjects[p.subj];
    if (!s) return null;
    const isLive = i === liveIdx;
    const status = isLive ? "live" : liveIdx >= 0 && i < liveIdx ? "completed" : "upcoming";
    const statusLabel = isLive ? (
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span className="dotpulse"></span>Live — join →
      </span>
    ) : status === "completed" ? (
      "Completed"
    ) : (
      "Upcoming"
    );
    return (
      <div className={`ls-sched-row ${status}`} key={i} onClick={isLive ? openSession : undefined} style={isLive ? { cursor: "pointer" } : undefined}>
        <div className="lsr-time">{p.time}</div>
        <div className="lsr-icon" style={{ background: `var(--${s.color}-soft)` }}>{s.icon}</div>
        <div className="lsr-main">
          <div className="lsr-title">{s.name}</div>
          <div className="lsr-sub">{student.grade} · with your teacher</div>
        </div>
        <div className={`lsr-status ${status}`}>{statusLabel}</div>
      </div>
    );
  });

  const logRows = useMemo(() => {
    const items = LIVE_CLASS_LOG.filter((c) => c.status === hubPane);
    return items.map((c) => {
      const s = subjects[c.subject];
      if (!s) return null;
      let badge: React.ReactNode;
      if (c.status === "attended") badge = <span className="attend-badge attended">✓ Attended</span>;
      else if (c.status === "missed") badge = <span className="attend-badge missed">✕ Missed</span>;
      else badge = <span className="attend-badge upcoming">Upcoming</span>;
      return (
        <div className="ls-sched-row" key={c.id} style={{ cursor: "default" }}>
          <div className="lsr-icon" style={{ background: `var(--${s.color}-soft)` }}>{s.icon}</div>
          <div className="lsr-main">
            <div className="lsr-title">{s.name}</div>
            <div className="lsr-sub">{c.instructor} · {c.day}, {c.time}</div>
          </div>
          {badge}
        </div>
      );
    });
  }, [hubPane, subjects]);

  // ---------------- session view ----------------
  const liveC = liveClass;
  const liveSub = liveSession ? subjects[liveSession.subjectId] : undefined;
  const liveTopic = liveSession && liveSub ? liveSub.topics[liveSession.topicIndex] : undefined;
  const liveSections = liveSession && liveSub ? getTopicSections(liveSub, liveSession.topicIndex) : [];
  const pollQ = liveSub && liveSession ? liveSub.questions[liveSession.pollIndex % liveSub.questions.length] : null;
  const classStudents = (liveSession ? (ROSTERS as Record<string, { name: string }[]>)[liveSession.classId] || [] : []) as { name: string }[];
  const liveTotal = liveClass ? liveClass.students : 0;

  const setLivePaneFn = (name: "learn" | "practice" | "interactive") => {
    setLivePane(name);
    if (name === "interactive" && pollQ && !pollResponses) {
      setPollResponses(Math.floor(liveTotal * (0.15 + Math.random() * 0.15)));
    }
  };

  const answerPoll = (i: number) => {
    if (pollAnswered || !liveSession || !pollQ) return;
    const pcts = pollQ.options.map((_, idx) =>
      idx === pollQ.correct ? 68 : idx === i ? 14 : Math.floor(Math.random() * 10) + 3,
    );
    setPollPcts(pcts);
    setPollAnswered(true);
    setLatestPick(i);
    setPollResponses((n) => Math.min(liveTotal, n + 1));
  };

  const practiceBtn = liveSession && liveSub ? (
    <button
      id="lsPracticeBtn"
      onClick={() => startSession({ mode: "single", subjectId: liveSession.subjectId, board: liveSub.boards[0] || null, year: null, duration: 20, count: 10 })}
      style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "10px 20px", borderRadius: 20, fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}
    >
      Practise this topic →
    </button>
  ) : null;

  return (
    <section className="screen active" id="screen-livesession">
      <div className="back-row" id="lsBackRow" onClick={() => (view === "session" ? openHub() : router.push("/dashboard"))} style={view === "session" ? { display: "flex" } : { display: "none" }}>
        <BackChevron />
        <span id="lsBackLabel">{view === "session" ? "Back to schedule" : "Back"}</span>
      </div>

      <div id="lsHub" style={{ display: view === "hub" ? "block" : "none" }}>
        <span className="eyebrow">Live Class</span>
        <h1 className="page-title" id="lsHubTitle">
          {hubPane === "today" ? "Today's classes" : hubPane === "upcoming" ? "Upcoming classes" : hubPane === "attended" ? "Attended classes" : "Missed classes"}
        </h1>
        <p className="page-sub" id="lsHubSub">
          {hubPane === "today"
            ? liveIdx >= 0
              ? "One of your classes is live right now — tap it to join."
              : "Here's today's schedule. We'll notify you the moment a class goes live."
            : hubPane === "upcoming"
              ? "Classes coming up on your timetable."
              : hubPane === "attended"
                ? "Classes you've joined so far."
                : "Classes you missed — catch up with the recording or ask Sabi AI to summarise."}
        </p>
        <div className="subnav" id="lsHubSubnav" style={{ display: "flex" }}>
          {HUB_PANES.map((name) => (
            <button key={name} className={hubPane === name ? "active" : ""} data-lshubpane={name} onClick={() => selectHubPane(name)}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
        <div id="lsScheduleList">
          {hubPane === "today"
            ? todayRows
            : logRows.length
              ? logRows
              : <p style={{ fontSize: 13, color: "var(--ash)", padding: "16px 4px" }}>No {hubPane} classes to show.</p>}
        </div>
      </div>

      {liveSession && liveSub && liveTopic && (
        <div id="lsLiveContent" style={{ display: view === "session" ? "block" : "none" }}>
          <div className="live-topbar">
            <span className="lt-dot"></span>
            <div>
              <div className="lt-label">Live now</div>
              <div className="lt-title" id="lsTopbarTitle">{liveTopic.t}</div>
              <div className="lt-sub" id="lsTopbarSub">{liveSub.icon} {liveSub.name} · {liveC ? liveC.name : ""}</div>
            </div>
            <button className="lt-end" id="lsEndBtn" style={{ display: "none" }}>End session</button>
          </div>

          <div className="subnav" id="lsSubnav">
            <button className={livePane === "learn" ? "active" : ""} data-lspane="learn" onClick={() => setLivePaneFn("learn")}>Learn</button>
            <button className={livePane === "practice" ? "active" : ""} data-lspane="practice" onClick={() => setLivePaneFn("practice")}>Practice</button>
            <button className={livePane === "interactive" ? "active" : ""} data-lspane="interactive" onClick={() => setLivePaneFn("interactive")}>Interactive</button>
          </div>

          <div className="ws-pane" id="lspane-learn" style={{ display: livePane === "learn" ? "block" : "none" }}>
            <span className="eyebrow">Following along with your teacher</span>
            <div id="lsLearnContent">
              {liveSections.map((sec, i) => (
                <div key={i}>
                  {sec.heading && <div className="article-h3">{sec.heading}</div>}
                  <p className="simple-para">{sec.text}</p>
                </div>
              ))}
              {liveTopic.takeaway && (
                <div className="takeaway-box">
                  <span className="ta-icon">💡</span>
                  <div>
                    <div className="ta-label">Key takeaway</div>
                    <div className="ta-text">{liveTopic.takeaway}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="ws-pane" id="lspane-practice" style={{ display: livePane === "practice" ? "block" : "none" }}>
            <span className="eyebrow">Try it yourself</span>
            <div className="card">
              <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 12 }}>Practise the topic your teacher is covering right now — your results feed straight back into this class's mastery.</p>
              {practiceBtn}
            </div>
          </div>

          <div className="ws-pane" id="lspane-interactive" style={{ display: livePane === "interactive" ? "block" : "none" }}>
            <span className="eyebrow">Answer live, together</span>
            <div className="interactive-poll-card">
              <div className="ipc-eyebrow"><span className="eyebrow" style={{ margin: 0 }}>Question from your teacher</span></div>
              {pollQ ? (
                <>
                  <div className="ipc-q" id="lsPollQ">{pollQ.text}</div>
                  <div id="lsPollOptions">
                    {pollQ.options.map((opt, i) => {
                      const answered = pollAnswered;
                      const pct = answered ? pollPcts[i] : 0;
                      const isCorrect = answered && i === pollQ.correct;
                      const isWrong = answered && i === latestPick && i !== pollQ.correct;
                      return (
                        <div
                          className={`poll-option${isCorrect ? " correct" : ""}${isWrong ? " wrong" : ""}`}
                          key={i}
                          onClick={() => answerPoll(i)}
                        >
                          <div className="po-fill" style={answered ? { width: `${pct}%` } : undefined}></div>
                          <span className="po-label">{opt}</span>
                          <span className="po-pct">{answered ? pct + "%" : ""}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="poll-live-count" id="lsPollCount">{pollResponses} of {liveTotal} students answered</div>
                  <div className="classmate-strip" id="lsClassmateStrip">
                    {classStudents.slice(0, 7).map((st, i) => (
                      <span className="classmate-avatar" key={i}>{st.name.split(" ").map((w) => w[0]).join("")}</span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="ipc-q" id="lsPollQ">No interactive questions for this subject yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
      </section>
  );
}