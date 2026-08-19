import type { ReactNode } from "react";

export type NavItem =
  | { kind: "link"; tab: string; path: string; label: string; icon: ReactNode; count?: string; upgrade?: boolean }
  | { kind: "divider"; gap?: boolean }
  | { kind: "account"; tab: string; role: string };

export const TAB_TO_PATH: Record<string, string> = {
  discover: "/dashboard",
  subjects: "/dashboard/subjects",
  practicehub: "/dashboard/practice",
  practicesession: "/dashboard/practice-session",
  hub: "/dashboard/subjects",
  studentassign: "/dashboard/assignments",
  livesession: "/dashboard/live",
  ask: "/dashboard/ask",
  workspace: "/dashboard/plan",
  challenges: "/dashboard/challenges",
  books: "/dashboard/books",
  competitions: "/dashboard/competitions",
  profile: "/dashboard/profile",
  badges: "/dashboard/badges",
  settings: "/dashboard/settings",
  help: "/dashboard/help",
  privacy: "/dashboard/privacy",
  terms: "/dashboard/terms",
  subscription: "/dashboard/upgrade",
  progress: "/dashboard/progress",
  teacherdash: "/dashboard/teacherdash",
  teacherclasses: "/dashboard/classes",
  teacherassign: "/dashboard/assignments",
  lessonprep: "/dashboard/lesson-prep",
  schooladmin: "/dashboard/schooladmin",
};

function svg(width: number, children: ReactNode, strokeWidth = 1.8) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={width}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {children}
    </svg>
  );
}

const I = {
  search: svg(20, (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  )),
  subjects: svg(20, (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z" />
      <path d="M14 3v6h6" />
    </>
  )),
  check: svg(20, (
    <>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </>
  )),
  assignment: svg(20, (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </>
  )),
  radar: svg(20, (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 0 0 7M5.2 5.2a10 10 0 0 0 0 13.6M18.8 5.2a10 10 0 0 0 0 13.6" />
    </>
  )),
  ask: svg(20, (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  )),
  plan: svg(20, (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 2v4M16 2v4" />
    </>
  )),
  progress: svg(20, (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-6 4 4 5-8" />
    </>
  )),
  challenges: svg(20, (
    <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
  )),
  books: svg(20, (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  )),
  competitions: svg(20, (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4a1 1 0 0 0-1 1 4 4 0 0 0 4 4M17 6h3a1 1 0 0 1 1 1 4 4 0 0 1-4 4" />
    </>
  )),
  gear: svg(20, (
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  )),
  upgrade: svg(20, (
    <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
  ), 2),
  teacherdash: svg(20, (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  )),
  classes: svg(20, (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  )),
  lessonprep: svg(20, (
    <>
      <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2z" />
      <path d="M19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9L19 15z" />
    </>
  )),
  admin: svg(20, (
    <>
      <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
    </>
  )),
};

const L = (
  tab: string,
  path: string,
  label: string,
  icon: ReactNode,
  count?: string,
  upgrade?: boolean
): NavItem => ({ kind: "link", tab, path, label, icon, count, upgrade });

const D = (gap?: boolean): NavItem => ({ kind: "divider", gap });
const ACCOUNT = (tab: string, role: string): NavItem => ({ kind: "account", tab, role });

export const NAV: Record<
  "student" | "teacher" | "school",
  { rail: NavItem[]; tabs: NavItem[]; drawer: NavItem[] }
> = {
  student: {
    rail: [
      L("discover", "/dashboard", "Discover", I.search),
      L("subjects", "/dashboard/subjects", "Subjects", I.subjects),
      L("practicehub", "/dashboard/practice", "Practice", I.check),
      L("studentassign", "/dashboard/assignments", "Assignments", I.assignment),
      L("livesession", "/dashboard/live", "Live Class", I.radar),
      L("ask", "/dashboard/ask", "Sabi AI", I.ask),
      L("workspace", "/dashboard/plan", "Plan", I.plan),
      D(),
      L("challenges", "/dashboard/challenges", "Challenges", I.challenges),
      L("books", "/dashboard/books", "Books", I.books, "42.3k"),
      L("competitions", "/dashboard/competitions", "Competitions", I.competitions),
      D(true),
      ACCOUNT("profile", "View profile"),
      L("settings", "/dashboard/settings", "Settings", I.gear),
      L("subscription", "/dashboard/upgrade", "Upgrade", I.upgrade, undefined, true),
    ],
    tabs: [
      L("discover", "/dashboard", "Discover", I.search),
      L("subjects", "/dashboard/subjects", "Subjects", I.subjects),
      L("practicehub", "/dashboard/practice", "Practice", I.check),
      L("livesession", "/dashboard/live", "Live Class", I.radar),
      L("ask", "/dashboard/ask", "Sabi AI", I.ask),
    ],
    drawer: [
      L("discover", "/dashboard", "Discover", I.search),
      L("subjects", "/dashboard/subjects", "Subjects", I.subjects),
      L("practicehub", "/dashboard/practice", "Practice", I.check),
      L("studentassign", "/dashboard/assignments", "Assignments", I.assignment),
      L("livesession", "/dashboard/live", "Live Class", I.radar),
      L("ask", "/dashboard/ask", "Sabi AI", I.ask),
      L("workspace", "/dashboard/plan", "Plan", I.plan),
      L("progress", "/dashboard/progress", "Progress", I.progress),
      D(),
      L("challenges", "/dashboard/challenges", "Challenges", I.challenges),
      L("books", "/dashboard/books", "Books", I.books, "42.3k"),
      L("competitions", "/dashboard/competitions", "Competitions", I.competitions),
      D(true),
      ACCOUNT("profile", "View profile"),
      L("settings", "/dashboard/settings", "Settings", I.gear),
      L("subscription", "/dashboard/upgrade", "Upgrade", I.upgrade, undefined, true),
    ],
  },
  teacher: {
    rail: [
      L("teacherdash", "/dashboard/teacherdash", "Dashboard", I.teacherdash),
      L("teacherclasses", "/dashboard/classes", "Classes", I.classes),
      L("livesession", "/dashboard/live", "Live Class", I.radar),
      L("teacherassign", "/dashboard/assignments", "Assignments", I.check),
      L("lessonprep", "/dashboard/lesson-prep", "Lesson Prep", I.lessonprep),
      L("ask", "/dashboard/ask", "Sabi AI", I.ask),
    ],
    tabs: [
      L("teacherdash", "/dashboard/teacherdash", "Dashboard", I.teacherdash),
      L("teacherclasses", "/dashboard/classes", "Classes", I.classes),
      L("livesession", "/dashboard/live", "Live Class", I.radar),
      L("teacherassign", "/dashboard/assignments", "Assignments", I.check),
      L("ask", "/dashboard/ask", "Sabi AI", I.ask),
    ],
    drawer: [
      L("teacherdash", "/dashboard/teacherdash", "Dashboard", I.teacherdash),
      L("teacherclasses", "/dashboard/classes", "Classes", I.classes),
      L("livesession", "/dashboard/live", "Live Class", I.radar),
      L("teacherassign", "/dashboard/assignments", "Assignments", I.check),
      L("lessonprep", "/dashboard/lesson-prep", "Lesson Prep", I.lessonprep),
      L("ask", "/dashboard/ask", "Sabi AI", I.ask),
    ],
  },
  school: {
    rail: [
      L("schooladmin", "/dashboard/schooladmin", "Admin", I.admin),
      L("ask", "/dashboard/ask", "Sabi AI", I.ask),
    ],
    tabs: [
      L("schooladmin", "/dashboard/schooladmin", "Admin", I.admin),
      L("ask", "/dashboard/ask", "Sabi AI", I.ask),
    ],
    drawer: [
      L("schooladmin", "/dashboard/schooladmin", "Admin", I.admin),
      L("ask", "/dashboard/ask", "Sabi AI", I.ask),
    ],
  },
};

export type AppMode = "student" | "teacher" | "school";