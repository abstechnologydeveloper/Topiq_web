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
import { studentProfile } from "../data/student";
import { TAB_TO_PATH } from "./navConfig";
import type { SubjectData } from "./screens/DiscoverScreen";
import type { SessionCfg } from "./screens/practiceTypes";

export type Pane = "overview" | "learn" | "flash";
export type Student = { grade: string };

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
      }}
    >
      {children}
    </Ctx.Provider>
  );
}