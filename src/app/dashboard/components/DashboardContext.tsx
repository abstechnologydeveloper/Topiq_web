"use client";

import {
  createContext,
  useEffect,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useRouter } from "next/navigation";
import { SUBJECTS } from "../data/subjects";
import { CHALLENGE_TEMPLATES } from "../data/challenges";
import { studentProfile } from "../data/student";
import { TIMETABLE, TASKS, EXAMS } from "../data/workspace";
import { TAB_TO_PATH } from "./navConfig";
import type { SubjectData } from "./screens/DiscoverScreen";
import type { SessionCfg } from "./screens/practiceTypes";

export type Pane = "overview" | "learn" | "flash";
export type Student = { grade: string };
export type ChallengeEntry = { templateId: string; progress: number; baseline?: number };

export type WsSubject = { time: string; subj: string; addedByUser?: boolean };
export type WsDay = Record<string, WsSubject[]>;
export type WsTask = {
  id: number;
  title: string;
  due: string;
  done: boolean;
  priority: string;
  recurrence: string;
  notes: string;
};
export type WsExam = { name: string; board: string; days: number; subject: string };

export type ProfileData = {
  firstName: string;
  lastName: string;
  age: string;
  dob: string;
  phone: string;
  grade: string;
  gender: string;
  track: string;
  username: string;
  avatar: string | null;
  participatedSubjects: string[];
};

export type DashboardCtx = {
  subjects: Record<string, SubjectData>;
  setSubjects: Dispatch<SetStateAction<Record<string, SubjectData>>>;
  participated: string[];
  subjectId: string;
  requestedPane: Pane;
  sessionCfg: SessionCfg | null;
  toast: string | null;
  setToast: Dispatch<SetStateAction<string | null>>;
  certSubject: string | null;
  setCertSubject: Dispatch<SetStateAction<string | null>>;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  student: Student;
  goTab: (tab: string) => void;
  openSubject: (id: string, pane?: string) => void;
  startSession: (cfg: SessionCfg) => void;
  exitSession: () => void;
  handleTopicDone: (subjectId: string) => void;
  assignDone: Record<number, boolean>;
  markAssignDone: (id: number) => void;
  activeChallenges: ChallengeEntry[];
  completedChallenges: string[];
  startChallenge: (templateId: string) => void;
  cancelChallenge: (templateId: string) => void;
  registerChallengeProgress: (isCorrect: boolean) => void;
  isPlusUser: boolean;
  freeAiUsesLeft: number;
  activatePlus: () => void;
  timetable: WsDay;
  setTimetable: Dispatch<SetStateAction<WsDay>>;
  tasks: WsTask[];
  setTasks: Dispatch<SetStateAction<WsTask[]>>;
  exams: WsExam[];
  setExams: Dispatch<SetStateAction<WsExam[]>>;
  profile: ProfileData;
  setProfile: Dispatch<SetStateAction<ProfileData>>;
};

const Ctx = createContext<DashboardCtx | null>(null);

export function useDashboard() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDashboard must be used within DashboardProvider");
  return v;
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Record<string, SubjectData>>(
    () => JSON.parse(JSON.stringify(SUBJECTS)),
  );
  const [participated, setParticipated] = useState<string[]>([]);
  const [subjectId, setSubjectId] = useState("biology");
  const [requestedPane, setRequestedPane] = useState<Pane>("overview");
  const [sessionCfg, setSessionCfg] = useState<SessionCfg | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [certSubject, setCertSubject] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [assignDone, setAssignDone] = useState<Record<number, boolean>>({});
  const [activeChallenges, setActiveChallenges] = useState<ChallengeEntry[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [timetable, setTimetable] = useState<WsDay>(() => JSON.parse(JSON.stringify(TIMETABLE)));
  const [tasks, setTasks] = useState<WsTask[]>(() => JSON.parse(JSON.stringify(TASKS)));
  const [exams, setExams] = useState<WsExam[]>(() => JSON.parse(JSON.stringify(EXAMS)));
  const [profile, setProfile] = useState<ProfileData>(() =>
    JSON.parse(JSON.stringify(studentProfile)),
  );

  const challengeStreakDays = 12;
  const [challengeCorrectStreak, setChallengeCorrectStreak] = useState(0);

  const FREE_AI_DAILY = 3;
  const [isPlusUser, setIsPlusUser] = useState(false);
  const [freeAiUsesLeft, setFreeAiUsesLeft] = useState(FREE_AI_DAILY);

  const activatePlus = () => {
    setIsPlusUser(true);
    setFreeAiUsesLeft(FREE_AI_DAILY);
  };

  const weakestSubjectId = () =>
    Object.keys(subjects).sort((a, b) => subjects[a].mastery - subjects[b].mastery)[0];

  const checkChallengeCompletion = (entry: ChallengeEntry) => {
    const t = CHALLENGE_TEMPLATES.find((x) => x.id === entry.templateId);
    if (!t) return;
    let current = entry.progress;
    if (t.type === "mastery")
      current = Math.max(0, subjects[weakestSubjectId()].mastery - (entry.baseline || 0));
    if (current >= t.target && !completedChallenges.includes(entry.templateId)) {
      setCompletedChallenges((prev) =>
        prev.includes(entry.templateId) ? prev : [...prev, entry.templateId],
      );
      setActiveChallenges((prev) =>
        prev.filter((c) => c.templateId !== entry.templateId),
      );
    }
  };

  const startChallenge = (templateId: string) => {
    if (activeChallenges.some((c) => c.templateId === templateId)) return;
    const t = CHALLENGE_TEMPLATES.find((x) => x.id === templateId);
    if (!t) return;
    const entry: ChallengeEntry = { templateId, progress: 0 };
    if (t.type === "streak") entry.progress = Math.min(t.target, challengeStreakDays);
    if (t.type === "mastery") entry.baseline = subjects[weakestSubjectId()].mastery;
    setActiveChallenges((prev) => [...prev, entry]);
    checkChallengeCompletion(entry);
  };

  const cancelChallenge = (templateId: string) => {
    setActiveChallenges((prev) => prev.filter((c) => c.templateId !== templateId));
  };

  const registerChallengeProgress = (isCorrect: boolean) => {
    const streak = isCorrect ? challengeCorrectStreak + 1 : 0;
    setChallengeCorrectStreak(streak);
    const newlyCompleted: string[] = [];
    const nextActive = activeChallenges
      .map((entry) => {
        const t = CHALLENGE_TEMPLATES.find((x) => x.id === entry.templateId);
        if (!t) return entry;
        const n = { ...entry };
        if (t.type === "count" && isCorrect) n.progress = Math.min(t.target, n.progress + 1);
        if (t.type === "accuracy") n.progress = Math.min(t.target, streak);
        if (t.type === "mastery")
          n.progress = Math.max(0, subjects[weakestSubjectId()].mastery - (n.baseline || 0));
        return n;
      })
      .filter((entry) => {
        const t = CHALLENGE_TEMPLATES.find((x) => x.id === entry.templateId);
        if (!t) return false;
        let current = entry.progress;
        if (t.type === "mastery")
          current = Math.max(0, subjects[weakestSubjectId()].mastery - (entry.baseline || 0));
        if (current >= t.target && !completedChallenges.includes(entry.templateId)) {
          newlyCompleted.push(entry.templateId);
          return false;
        }
        return true;
      });
    if (newlyCompleted.length) {
      setCompletedChallenges((prev) => [
        ...new Set([...prev, ...newlyCompleted]),
      ]);
    }
    setActiveChallenges(nextActive);
  };

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const markAssignDone = (id: number) =>
    setAssignDone((prev) => (prev[id] ? prev : { ...prev, [id]: true }));

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast, setToast]);

  const goTab = (tab: string) => {
    setDrawerOpen(false);
    if (tab !== "practicesession") setSessionCfg(null);
    const path = tab === "hub" ? `/dashboard/subjects/${subjectId}` : TAB_TO_PATH[tab];
    if (path) router.push(path);
  };

  const openSubject = (id: string, pane?: string) => {
    setSubjectId(id);
    setRequestedPane((pane as Pane) || "overview");
    setDrawerOpen(false);
    setParticipated((prev) => (prev.includes(id) ? prev : [...prev, id]));
    router.push(
      `/dashboard/subjects/${id}${pane ? `?pane=${encodeURIComponent(pane)}` : ""}`,
    );
  };

  const startSession = (cfg: SessionCfg) => {
    setSessionCfg(cfg);
    setDrawerOpen(false);
    router.push("/dashboard/practice-session");
  };

  const exitSession = () => {
    setSessionCfg(null);
    setDrawerOpen(false);
    router.push("/dashboard/practice");
  };

  const handleTopicDone = (subjectId: string) => {
    const s = subjects[subjectId];
    if (!s) return;
    const idx = s.topics.findIndex((t) => t.pct < 100);
    const target = s.topics[idx >= 0 ? idx : 0];
    const nextPct = Math.min(100, target.pct + 8);
    const nextStatus = nextPct >= 60 ? "thread" : nextPct >= 25 ? "ember" : target.status;
    setSubjects((prev) => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        topics: prev[subjectId].topics.map((t, i) =>
          i === (idx >= 0 ? idx : 0) ? { ...t, pct: nextPct, status: nextStatus } : t,
        ),
      },
    }));
    if (nextPct >= 100 && target.pct < 100) {
      setToast(`🏆 Topic Badge earned — <strong>${target.t}</strong>`);
      const willAllDone = subjects[subjectId].topics
        .map((t, i) => (i === (idx >= 0 ? idx : 0) ? nextPct : t.pct))
        .every((p) => p >= 100);
      if (willAllDone) setCertSubject(subjectId);
    }
  };

  const student: Student = { grade: studentProfile.grade || "SS2" };

  return (
    <Ctx.Provider
      value={{
        subjects,
        setSubjects,
        participated,
        subjectId,
        requestedPane,
        sessionCfg,
        toast,
        setToast,
        certSubject,
        setCertSubject,
        drawerOpen,
        openDrawer,
        closeDrawer,
        student,
        goTab,
        openSubject,
        startSession,
        exitSession,
        handleTopicDone,
        assignDone,
        markAssignDone,
        activeChallenges,
        completedChallenges,
        startChallenge,
        cancelChallenge,
        registerChallengeProgress,
        isPlusUser,
        freeAiUsesLeft,
        activatePlus,
        timetable,
        setTimetable,
        tasks,
        setTasks,
        exams,
        setExams,
        profile,
        setProfile,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}