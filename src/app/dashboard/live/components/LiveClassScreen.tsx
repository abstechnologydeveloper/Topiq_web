"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, ROSTERS, TEACHER_TODAY_SCHEDULE, TIMETABLE } from "../../data";
import { SUBJECTS } from "../../data/subjects";
import type { SubjectData } from "../../components/screens/DiscoverScreen";
import type { SessionCfg } from "../../components/screens/practiceTypes";
import { BackChevron } from "../../components/screens/shared";
import { useDashboard } from "../../components/DashboardContext";
import LiveHub from "./LiveHub";
import LiveTopbar from "./LiveTopbar";
import LearnPane from "./LearnPane";
import PracticePane from "./PracticePane";
import InteractivePoll from "./InteractivePoll";
import QaModal from "./QaModal";
import { buildLogRows, buildTeacherRows, buildTodayRows } from "./liveRows";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;
const HUB_PANES = ["today", "upcoming", "attended", "missed"] as const;

type Props = {
  subjects: Record<string, SubjectData>;
  student: { grade: string };
  startSession: (cfg: SessionCfg) => void;
};

type TeacherScheduleItem = { time: string; classId: string; addedByUser?: boolean };

function getTopicSections(subject: SubjectData, topicIndex: number) {
  const topic = subject.topics[topicIndex];
  if (topic && topic.article) return topic.article;
  return subject.tutorials.slice(0, 2).map((t) => ({ heading: t.title, text: t.content || "Content grounded in your syllabus goes here." }));
}

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
  const isTeacher = appMode === "teacher";
  const rowCtx = useMemo(
    () => ({ liveSession, subjects, studentGrade: student.grade }),
    [liveSession, subjects, student.grade],
  );

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

  const teacherRows = buildTeacherRows(teacherSchedule, CLASSES, rowCtx, openSession, startLiveForClass);
  const todayRows = buildTodayRows(TIMETABLE["Mon"] as { time: string; subj: string }[], rowCtx, liveIdx, openSession);
  const logRows = useMemo(() => buildLogRows(hubPane, rowCtx), [hubPane, rowCtx]);

  // ---------------- session view ----------------
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
    setPollPcts(pollQ.options.map((_, idx) =>
      idx === pollQ.correct ? 68 : idx === i ? 14 : Math.floor(Math.random() * 10) + 3,
    ));
    setPollAnswered(true);
    setLatestPick(i);
    setPollResponses((n) => Math.min(liveTotal, n + 1));
  };

  const hubTitle =
    isTeacher || hubPane === "today"
      ? "Today's classes"
      : hubPane === "upcoming"
        ? "Upcoming classes"
        : hubPane === "attended"
          ? "Attended classes"
          : "Missed classes";
  const hubSub = isTeacher
    ? liveSession
      ? "One class is live right now."
      : "Tap any class below to go live."
    : hubPane === "today"
      ? liveIdx >= 0
        ? "One of your classes is live right now — tap it to join."
        : "Here's today's schedule. We'll notify you the moment a class goes live."
      : hubPane === "upcoming"
        ? "Classes coming up on your timetable."
        : hubPane === "attended"
          ? "Classes you've joined so far."
          : "Classes you missed — catch up with the recording or ask Sabi AI to summarise.";

  return (
    <section className="block animate-[fade_.25s_ease] p-0">
      <div
        className={`mb-3.5 cursor-pointer items-center gap-2 text-[13px] font-semibold text-ash ${liveView === "session" ? "flex" : "hidden"}`}
        onClick={() => (liveView === "session" ? openHub() : router.push("/dashboard"))}
      >
        <BackChevron />
        <span>{liveView === "session" ? "Back to schedule" : "Back"}</span>
      </div>

      <div className={liveView === "hub" ? "block" : "hidden"}>
        <LiveHub
          title={hubTitle}
          sub={hubSub}
          isTeacher={isTeacher}
          hubPane={hubPane}
          panes={HUB_PANES}
          onPane={(name) => setHubPane(name as (typeof HUB_PANES)[number])}
          todayRows={isTeacher ? teacherRows : todayRows}
          logRows={logRows}
          emptyText={`No ${hubPane} classes to show.`}
          onAddClass={openQa}
        />
      </div>

      {liveSession && liveSub && liveTopic && (
        <div className={liveView === "session" ? "block" : "hidden"}>
          <LiveTopbar
            label="Live now"
            title={liveTopic.t}
            sub={`${liveSub.icon} ${liveSub.name} · ${liveClass ? liveClass.name : ""}`}
            isTeacher={isTeacher}
            onEnd={endLiveSession}
          />

          <div className="mb-[18px] flex gap-1 overflow-x-auto border-b border-ash-line pb-0.5">
            {(["learn", "practice", "interactive"] as const).map((pane) => (
              <button
                key={pane}
                className={`shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent px-3.5 py-2.5 text-[13px] font-bold ${livePane === pane ? "text-ink [border-bottom:2px_solid_var(--thread)]" : "text-ash [border-bottom:2px_solid_transparent]"}`}
                data-lspane={pane}
                onClick={() => setLivePaneFn(pane)}
              >
                {pane.charAt(0).toUpperCase() + pane.slice(1)}
              </button>
            ))}
          </div>

          <div className={livePane === "learn" ? "block" : "hidden"}>
            <LearnPane sections={liveSections} takeaway={liveTopic.takeaway} />
          </div>

          <div className={livePane === "practice" ? "block" : "hidden"}>
            <PracticePane
              onPractice={() =>
                startSession({ mode: "single", subjectId: liveSession.subjectId, board: liveSub.boards[0] || null, year: null, duration: 20, count: 10 })
              }
            />
          </div>

          <div className={livePane === "interactive" ? "block" : "hidden"}>
            <InteractivePoll
              pollQ={pollQ}
              answered={pollAnswered}
              pcts={pollPcts}
              latestPick={latestPick}
              responses={pollResponses}
              total={liveTotal}
              classmates={classStudents}
              onAnswer={answerPoll}
            />
          </div>
        </div>
      )}

      {qaOpen && (
        <QaModal
          qaTime={qaTime}
          qaTimeError={qaTimeError}
          onTimeChange={(v) => {
            setQaTime(v);
            if (v.trim()) setQaTimeError(false);
          }}
          classes={CLASSES.map((c) => ({ id: c.id, name: c.name }))}
          qaClass={qaClass}
          onSelectClass={setQaClass}
          onClose={() => setQaOpen(false)}
          onConfirm={confirmQa}
        />
      )}
    </section>
  );
}