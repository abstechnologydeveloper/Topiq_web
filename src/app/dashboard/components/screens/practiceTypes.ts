import type { SubjectData } from "./DiscoverScreen";

export type PQuestion = {
  tag: string;
  text: string;
  options: string[];
  correct: number;
  explain: string;
  ref: string;
  _answered?: boolean;
  _wasCorrect?: boolean;
  _selectedIndex?: number;
};

export type SingleSessionCfg = {
  mode: "single";
  subjectId: string;
  board: string | null;
  year: string | null;
  duration: number;
  count: number;
};

export type MockSessionCfg = {
  mode: "mock";
  board: string;
  year: string;
  mockType: "full" | "quick";
  ordered: string[];
  totalMinutes: number;
};

export type SessionCfg = SingleSessionCfg | MockSessionCfg;

export function subjectsForBoard(subjects: Record<string, SubjectData>, board: string): string[] {
  return Object.keys(subjects).filter((id) => subjects[id].boards.includes(board));
}

export function examYearsFor(subjects: Record<string, SubjectData>, subjectId: string): string[] {
  const s = subjects[subjectId];
  const years = [...new Set((s.papers || []).map((p) => p.year))].sort((a, b) => Number(b) - Number(a));
  return years.length ? years : ["2023", "2022", "2021"];
}

export function matchTopicForQuestion(subjects: Record<string, SubjectData>, subjectId: string, q: PQuestion): number {
  const s = subjects[subjectId];
  if (!q.ref) return -1;
  const refLower = q.ref.toLowerCase();
  let idx = s.topics.findIndex((t) => refLower.includes(t.t.toLowerCase()));
  if (idx === -1) {
    idx = s.topics.findIndex((t) => {
      const firstWord = t.t.toLowerCase().split(" ")[0];
      return firstWord.length > 3 && refLower.includes(firstWord);
    });
  }
  return idx;
}

export function formatDuration(ms: number): string {
  const totalSec = Math.max(1, Math.round(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export function fmtClock(sec: number): string {
  const m = Math.floor(Math.max(0, sec) / 60);
  const s = String(Math.max(0, sec) % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function cloneQuestions(
  subjects: Record<string, SubjectData>,
  subjectId: string,
  year: string | null,
  count: number,
): PQuestion[] {
  const s = subjects[subjectId];
  let pool = [...s.questions];
  if (year) {
    const matched = pool.filter((q) => q.tag && q.tag.includes(year));
    if (matched.length) pool = matched;
  }
  if (!pool.length) pool = [...s.questions];
  const out: PQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const base = pool[i % pool.length];
    out.push({ ...base });
  }
  return out;
}

export function countForMockSubject(
  subjects: Record<string, SubjectData>,
  subjectId: string,
  mockType: "full" | "quick",
): number {
  const english = mockType === "full" ? 60 : 30;
  const other = mockType === "full" ? 40 : 20;
  return subjectId === "english" ? english : other;
}