"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, LIVE_CLASS_LOG, ROSTERS, TEACHER_TODAY_SCHEDULE, TIMETABLE } from "../../data";
import { SUBJECTS } from "../../data/subjects";
import type { SubjectData } from "../../components/screens/DiscoverScreen";
import type { SessionCfg } from "../../components/screens/practiceTypes";
import { BackChevron } from "../../components/screens/shared";
import { useDashboard } from "../../components/DashboardContext";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

type Props = {
  subjects: Record<string, SubjectData>;
  student: { grade: string };
  startSession: (cfg: SessionCfg) => void;
};

const HUB_PANES = ["today", "upcoming", "attended", "missed"] as const;

const EYEBROW = "mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-thread";

const SCHED_ROW = "flex items-center gap-3 rounded-btn border border-ash-line bg-surface p-3.5 mb-2.5";
const SCHED_ROW_LIVE = "border-thread bg-thread-soft cursor-pointer";
const SCHED_ROW_UPCOMING = "cursor-pointer";
const SCHED_ROW_COMPLETED = "opacity-50 cursor-default";
const LSR_TIME = "w-[46px] shrink-0 font-mono text-[12.5px] font-bold text-ash";
const LSR_ICON = "flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[17px]";
const LSR_MAIN = "min-w-0 flex-1";
const LSR_TITLE = "text-sub font-bold";
const LSR_SUB = "mt-px text-[11.5px] text-ash";
const LSR_STATUS = "flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11.5px] font-bold";
const DOTPULSE = "inline-block h-[7px] w-[7px] shrink-0 animate-[lsblink_1.3s_infinite] rounded-full bg-thread";
const SUBNAV_BTN = "shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent px-3.5 py-2.5 text-[13px] font-bold";

function getTopicSections(subject: SubjectData, topicIndex: number) {
  const topic = subject.topics[topicIndex];
  if (topic && topic.article) return topic.article;
  return subject.tutorials.slice(0, 2).map((t) => ({ heading: t.title, text: t.content || "Content grounded in your syllabus goes here." }));
}

type TeacherScheduleItem = { time: string; classId: string; addedByUser?: boolean };

export default function LiveClassScreen({ subjects, student, startSession }: Props) {
  const router = useRouter();
  const { liveSession, liveView, setLiveView, appMode, endLiveSession, startLiveForClass } = useDashboard();
  const [hubPane, setHubPane] = useState<(typeof HUB_PANES)[number]>("today");
  const [livePane, setLivePane] = useState<"learn" | "practice" | "interactive">("learn");
  const [pollAnswered, setPollAnswered] = useState(false);
  const [pollResponses, setPollResponses] = useState(0);
  const [latestPick, setLatestPick] = useState<number>(-1);
  const [pollPcts, setPollPcts] = useState<number[]>([]);
  const [teacherSchedule, setTeacherSchedule] = useState<TeacherScheduleItem[]>(
    () => JSON.parse(JSON.stringify(TEACHER_TODAY_SCHEDULE)),
  );
  const [qaOpen, setQaOpen] = useState(false);
  const [qaTime, setQaTime] = useState("");
  const [qaClass, setQaClass] = useState<string | null>(null);
  const [qaTimeError, setQaTimeError] = useState(false);

  const liveIdx = liveSession ? (TIMETABLE["Mon"] as { time: string; subj: string }[]).findIndex((p) => p.subj === liveSession.subjectId) : -1;
  const liveClass = liveSession ? CLASSES.find((c) => c.id === liveSession.classId) : undefined;

  const openHub = () => {
    setLiveView("hub");
    setLivePane("learn");
    setPollAnswered(false);
  };

  const openSession = () => {
    if (!liveSession) return;
    setLiveView("session");
    setLivePane("learn");
    setPollAnswered(false);
  };

  const isLiveClass = (classId: string) => liveSession !== null && liveSession.classId === classId;

  const teacherRows = teacherSchedule.map((item) => {
    const c = CLASSES.find((x) => x.id === item.classId);
    if (!c) return null;
    const s = SUBJECT_LOOKUP[c.subject];
    const isLive = isLiveClass(c.id);
    const onClick = isLive ? openSession : () => startLiveForClass(c.id);
    return (
      <div
        className={`${SCHED_ROW} ${isLive ? SCHED_ROW_LIVE : SCHED_ROW_UPCOMING}`}
        key={`${c.id}-${item.time}`}
        onClick={onClick}
      >
        <div className={LSR_TIME}>{item.time}</div>
        <div className={LSR_ICON} style={{ background: `var(--${s.color}-soft)` }}>{s.icon}</div>
        <div className={LSR_MAIN}>
          <div className={LSR_TITLE}>{c.name}</div>
          <div className={LSR_SUB}>{c.students} students · {c.board}</div>
        </div>
        <div className={`${LSR_STATUS} ${isLive ? "text-thread" : "text-ash"}`}>
          {isLive ? (
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span className={DOTPULSE}></span>Live — manage →
            </span>
          ) : (
            "Start →"
          )}
        </div>
      </div>
    );
  });

  const openQa = () => {
    setQaTime("");
    setQaClass(null);
    setQaTimeError(false);
    setQaOpen(true);
  };

  const confirmQa = () => {
    const time = qaTime.trim();
    setQaTimeError(!time);
    if (!time || !qaClass) return;
    setTeacherSchedule((prev) => {
      const next = [...prev, { time, classId: qaClass, addedByUser: true }];
      return next.sort((a, b) => a.time.localeCompare(b.time, undefined, { numeric: true }));
    });
    setQaOpen(false);
  };

  const selectQaClass = (id: string) => setQaClass(id);

  const selectHubPane = (name: (typeof HUB_PANES)[number]) => setHubPane(name);

  const todayRows = (TIMETABLE["Mon"] as { time: string; subj: string }[]).map((p, i) => {
    const s = subjects[p.subj];
    if (!s) return null;
    const isLive = i === liveIdx;
    const status = isLive ? "live" : liveIdx >= 0 && i < liveIdx ? "completed" : "upcoming";
    const statusLabel = isLive ? (
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span className={DOTPULSE}></span>Live — join →
      </span>
    ) : status === "completed" ? (
      "Completed"
    ) : (
      "Upcoming"
    );
    return (
      <div className={`${SCHED_ROW} ${status === "live" ? SCHED_ROW_LIVE : status === "completed" ? SCHED_ROW_COMPLETED : SCHED_ROW_UPCOMING}`} key={i} onClick={isLive ? openSession : undefined}>
        <div className={LSR_TIME}>{p.time}</div>
        <div className={LSR_ICON} style={{ background: `var(--${s.color}-soft)` }}>{s.icon}</div>
        <div className={LSR_MAIN}>
          <div className={LSR_TITLE}>{s.name}</div>
          <div className={LSR_SUB}>{student.grade} · with your teacher</div>
        </div>
        <div className={`${LSR_STATUS} ${status === "live" ? "text-thread" : "text-ash"}`}>{statusLabel}</div>
      </div>
    );
  });

  const logRows = useMemo(() => {
    const items = LIVE_CLASS_LOG.filter((c) => c.status === hubPane);
    return items.map((c) => {
      const s = subjects[c.subject];
      if (!s) return null;
      let badge: React.ReactNode;
      if (c.status === "attended") badge = <span className="shrink-0 rounded-card bg-thread-soft px-2.5 py-[5px] text-[11px] font-bold text-thread">✓ Attended</span>;
      else if (c.status === "missed") badge = <span className="shrink-0 rounded-card bg-coral-soft px-2.5 py-[5px] text-[11px] font-bold text-coral">✕ Missed</span>;
      else badge = <span className="shrink-0 rounded-card bg-ember-soft px-2.5 py-[5px] text-[11px] font-bold text-ember">Upcoming</span>;
      return (
        <div className={`${SCHED_ROW} cursor-default`} key={c.id}>
          <div className={LSR_ICON} style={{ background: `var(--${s.color}-soft)` }}>{s.icon}</div>
          <div className={LSR_MAIN}>
            <div className={LSR_TITLE}>{s.name}</div>
            <div className={LSR_SUB}>{c.instructor} · {c.day}, {c.time}</div>
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
      className="cursor-pointer rounded-[20px] border-none bg-ink px-5 py-2.5 text-[12.5px] font-bold text-paper"
    >
      Practise this topic →
    </button>
  ) : null;

  return (
    <section className="block p-0 animate-[fade_.25s_ease]" id="screen-livesession">
      <div
        className={`cursor-pointer mb-3.5 items-center gap-2 text-[13px] font-semibold text-ash ${liveView === "session" ? "flex" : "hidden"}`}
        id="lsBackRow"
        onClick={() => (liveView === "session" ? openHub() : router.push("/dashboard"))}
      >
        <BackChevron />
        <span id="lsBackLabel">{liveView === "session" ? "Back to schedule" : "Back"}</span>
      </div>

      <div id="lsHub" className={liveView === "hub" ? "block" : "hidden"}>
        <span className={EYEBROW}>Live Class</span>
        {appMode === "teacher" ? (
          <>
            <h1 className="font-display mb-1 text-[25px] font-semibold tracking-[-0.01em]" id="lsHubTitle">Today's classes</h1>
            <p className="text-sub text-ash mb-[18px]" id="lsHubSub">
              {liveSession ? "One class is live right now." : "Tap any class below to go live."}
            </p>
            <div id="lsScheduleList">
              {teacherRows.length
                ? teacherRows
                : <p className="text-[13px] text-ash">No classes scheduled today.</p>}
            </div>
            <button
              className="mt-2.5 w-full cursor-pointer rounded-btn border-[1.5px] border-dashed border-ash-line bg-transparent p-3 text-[13px] font-bold text-ash hover:border-thread hover:text-thread"
              id="lsAddClassBtn"
              onClick={openQa}
            >
              + Add a class to today
            </button>
          </>
        ) : (
          <>
            <h1 className="font-display mb-1 text-[25px] font-semibold tracking-[-0.01em]" id="lsHubTitle">
              {hubPane === "today" ? "Today's classes" : hubPane === "upcoming" ? "Upcoming classes" : hubPane === "attended" ? "Attended classes" : "Missed classes"}
            </h1>
            <p className="text-sub text-ash mb-[18px]" id="lsHubSub">
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
            <div className="mb-[18px] flex gap-1 overflow-x-auto border-b border-ash-line pb-0.5" id="lsHubSubnav">
              {HUB_PANES.map((name) => (
                <button
                  key={name}
                  className={`${SUBNAV_BTN} ${hubPane === name ? "text-ink [border-bottom:2px_solid_var(--thread)]" : "text-ash [border-bottom:2px_solid_transparent]"}`}
                  data-lshubpane={name}
                  onClick={() => selectHubPane(name)}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              ))}
            </div>
            <div id="lsScheduleList">
              {hubPane === "today"
                ? todayRows
                : logRows.length
                  ? logRows
                  : <p className="px-1 py-4 text-[13px] text-ash">No {hubPane} classes to show.</p>}
            </div>
          </>
        )}
      </div>

      {liveSession && liveSub && liveTopic && (
        <div id="lsLiveContent" className={liveView === "session" ? "block" : "hidden"}>
          <div className="mb-3.5 flex items-center gap-2.5 rounded-card bg-[linear-gradient(120deg,var(--coral),#C23350)] px-4 py-3.5 text-white">
            <span className="h-[9px] w-[9px] shrink-0 animate-[lsblink_1.3s_infinite] rounded-full bg-surface"></span>
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.04em] text-[#FFD9E0]">Live now</div>
              <div className="text-[14.5px] font-bold" id="lsTopbarTitle">{liveTopic.t}</div>
              <div className="text-[11.5px] opacity-90" id="lsTopbarSub">{liveSub.icon} {liveSub.name} · {liveC ? liveC.name : ""}</div>
            </div>
            <button
              className={`ml-auto shrink-0 cursor-pointer rounded-card border-none bg-surface px-3.5 py-2 text-label font-bold text-coral ${appMode === "teacher" ? "inline-block" : "hidden"}`}
              id="lsEndBtn"
              onClick={endLiveSession}
            >
              End session
            </button>
          </div>

          <div className="mb-[18px] flex gap-1 overflow-x-auto border-b border-ash-line pb-0.5" id="lsSubnav">
            {(["learn", "practice", "interactive"] as const).map((pane) => (
              <button
                key={pane}
                className={`${SUBNAV_BTN} ${livePane === pane ? "text-ink [border-bottom:2px_solid_var(--thread)]" : "text-ash [border-bottom:2px_solid_transparent]"}`}
                data-lspane={pane}
                onClick={() => setLivePaneFn(pane)}
              >
                {pane.charAt(0).toUpperCase() + pane.slice(1)}
              </button>
            ))}
          </div>

          <div id="lspane-learn" className={livePane === "learn" ? "block" : "hidden"}>
            <span className={EYEBROW}>Following along with your teacher</span>
            <div id="lsLearnContent">
              {liveSections.map((sec, i) => (
                <div key={i}>
                  {sec.heading && <div className="mt-1 mb-2 font-display text-[16.5px] font-semibold">{sec.heading}</div>}
                  <p className="mb-3.5 text-[14.5px] leading-[1.7] text-ink-soft">{sec.text}</p>
                </div>
              ))}
              {liveTopic.takeaway && (
                <div className="mb-4 flex items-start gap-2.5 rounded-btn bg-ink px-4 py-3.5 text-paper">
                  <span className="shrink-0 text-lg">💡</span>
                  <div>
                    <div className="mb-[3px] font-mono text-[10px] uppercase tracking-[0.05em] text-ember-soft">Key takeaway</div>
                    <div className="text-[13px] leading-[1.55]">{liveTopic.takeaway}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div id="lspane-practice" className={livePane === "practice" ? "block" : "hidden"}>
            <span className={EYEBROW}>Try it yourself</span>
            <div className="rounded-[18px] border border-ash-line bg-surface p-4">
              <p className="mb-3 text-[13px] text-ink-soft">Practise the topic your teacher is covering right now — your results feed straight back into this class's mastery.</p>
              {practiceBtn}
            </div>
          </div>

          <div id="lspane-interactive" className={livePane === "interactive" ? "block" : "hidden"}>
            <span className={EYEBROW}>Answer live, together</span>
            <div className="mb-3.5 rounded-card border border-ash-line bg-surface p-4">
              <div className="flex items-center gap-1.5">
                <span className="m-0 block font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-thread">Question from your teacher</span>
              </div>
              {pollQ ? (
                <>
                  <div className="my-2 mb-3.5 text-[15px] font-bold" id="lsPollQ">{pollQ.text}</div>
                  <div id="lsPollOptions">
                    {pollQ.options.map((opt, i) => {
                      const answered = pollAnswered;
                      const pct = answered ? pollPcts[i] : 0;
                      const isCorrect = answered && i === pollQ.correct;
                      const isWrong = answered && i === latestPick && i !== pollQ.correct;
                      return (
                        <div
                          className={`relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-tile border-1_5 py-2.5 px-3 mb-2 text-[13px] font-semibold ${isCorrect ? "border-thread" : isWrong ? "border-coral" : "border-ash-line"}`}
                          key={i}
                          onClick={() => answerPoll(i)}
                        >
                          <div
                            className={`absolute inset-0 z-0 transition-[width] duration-[400ms] ${isWrong ? "bg-coral-soft" : "bg-thread-soft"}`}
                            style={answered ? { width: `${pct}%` } : undefined}
                          ></div>
                          <span className="relative z-[1]">{opt}</span>
                          <span className="relative z-[1] ml-auto font-bold text-ash">{answered ? pct + "%" : ""}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="font-mono text-[11.5px] text-ash" id="lsPollCount">{pollResponses} of {liveTotal} students answered</div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5" id="lsClassmateStrip">
                    {classStudents.slice(0, 7).map((st, i) => (
                      <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-thread-soft text-[10.5px] font-bold text-thread" key={i}>{st.name.split(" ").map((w) => w[0]).join("")}</span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="my-2 mb-3.5 text-[15px] font-bold" id="lsPollQ">No interactive questions for this subject yet.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {qaOpen && (
        <div className="fixed inset-0 z-[100] flex animate-[fade_.2s_ease] items-end justify-center bg-[rgba(20,23,43,0.55)]" id="quickAddModal">
          <div className="m-auto max-h-[82vh] w-full max-w-[520px] overflow-y-auto rounded-t-[20px] bg-paper px-5 pt-[22px] pb-7">
            <button className="float-right h-[30px] w-[30px] cursor-pointer rounded-full border-none bg-paper-dim text-sm" onClick={() => setQaOpen(false)} aria-label="Close">✕</button>
            <h2 id="qaTitle" className="clear-both mb-2.5 font-display text-[20px] font-semibold">Add a class to today's schedule</h2>
            <div className="mb-4">
              <span className="mb-2 block font-mono text-[10.5px] font-bold uppercase tracking-[0.05em] text-ash">What time?</span>
              <input
                type="text"
                placeholder="e.g. 2:30"
                value={qaTime}
                onChange={(e) => {
                  setQaTime(e.target.value);
                  if (e.target.value.trim()) setQaTimeError(false);
                }}
                className={`w-full rounded-input border-1_5 bg-transparent px-3.5 py-[11px] font-sans text-input outline-none ${qaTimeError ? "border-coral" : "border-ash-line"} focus:border-thread`}
              />
            </div>
            <div className="mb-4" id="qaClassRow">
              <span className="mb-2 block font-mono text-[10.5px] font-bold uppercase tracking-[0.05em] text-ash">Class</span>
              <div className="mb-4 flex gap-2 overflow-x-auto pb-1" id="qaClassChips">
                {CLASSES.map((c) => (
                  <button
                    key={c.id}
                    className={`shrink-0 cursor-pointer whitespace-nowrap rounded-card border-1_5 bg-surface px-[13px] py-[7px] text-[12.5px] font-bold ${qaClass === c.id ? "border-thread bg-thread-soft text-thread" : "border-ash-line text-ash"}`}
                    onClick={() => selectQaClass(c.id)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <button className="mt-2 cursor-pointer rounded-[22px] border-none bg-thread px-5 py-[11px] text-[13px] font-bold text-white" onClick={confirmQa}>Add →</button>
          </div>
        </div>
      )}
      </section>
  );
}