"use client";

import { useMemo, useState } from "react";
import {
  useDashboard,
  type WsDay,
  type WsTask,
  type WsExam,
} from "../DashboardContext";
import type { SubjectData } from "./DiscoverScreen";

type Props = {
  subjects: Record<string, SubjectData>;
};

export type WsPaneTab = "calendar" | "timetable" | "todo" | "exams";

const FAR_FUTURE = new Date(8640000000000000);

function calendarDayKey(d: Date): string {
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function taskDueDate(due: string): Date | null {
  const today = new Date();
  if (due === "Today") return today;
  if (due === "Tomorrow") {
    const d = new Date(today);
    d.setDate(d.getDate() + 1);
    return d;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(due)) {
    const [y, m, d] = due.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  return null;
}

function formatTaskDue(due: string): string {
  const d = taskDueDate(due);
  if (!d) return due;
  const today = new Date();
  if (calendarDayKey(d) === calendarDayKey(today)) return "Today";
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (calendarDayKey(d) === calendarDayKey(tomorrow)) return "Tomorrow";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function advanceRecurrence(date: Date, recurrence: string): Date {
  const d = new Date(date);
  if (recurrence === "daily") {
    d.setDate(d.getDate() + 1);
    return d;
  }
  if (recurrence === "weekly") {
    d.setDate(d.getDate() + 7);
    return d;
  }
  if (recurrence === "weekdays") {
    do {
      d.setDate(d.getDate() + 1);
    } while (d.getDay() === 0 || d.getDay() === 6);
    return d;
  }
  return d;
}

export default function WorkspaceScreen({ subjects }: Props) {
  const {
    goTab,
    timetable,
    setTimetable,
    tasks,
    setTasks,
    exams,
    setExams,
    setToast,
    openSubject,
    startSession,
  } = useDashboard();

  const [wsPane, setWsPane] = useState<WsPaneTab>("calendar");
  const [activeDay, setActiveDay] = useState("Mon");
  const [calViewDate, setCalViewDate] = useState<Date>(() => new Date());
  const [calSelectedDate, setCalSelectedDate] = useState<Date>(() => new Date());

  const toggleTask = (id: number) => {
    const t = tasks.find((x) => x.id === id);
    if (!t) return;
    if (!t.done && t.recurrence && t.recurrence !== "none") {
      const current = taskDueDate(t.due) || new Date();
      const next = advanceRecurrence(current, t.recurrence);
      const iso =
        next.getFullYear() +
        "-" +
        String(next.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(next.getDate()).padStart(2, "0");
      setTasks((prev) => prev.map((x) => (x.id === id ? { ...x, due: iso } : x)));
      setToast(`🔁 Rescheduled — next due ${formatTaskDue(iso)}`);
    } else {
      setTasks((prev) => prev.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
    }
  };

  const renderWeekGlance = () => {
    const days = Object.keys(timetable);
    const jsDayIdx = new Date().getDay();
    const todayKey = days[(jsDayIdx + 6) % 7];
    return days.map((d) => {
      const periods = timetable[d] || [];
      return (
        <div
          key={d}
          className={`wg-day ${d === activeDay ? "active" : ""} ${d === todayKey ? "is-today" : ""}`}
          onClick={() => {
            setActiveDay(d);
            setWsPane("timetable");
          }}
        >
          <span className="wg-daylabel">{d}{d === todayKey ? " •" : ""}</span>
          <div className="wg-dots">
            {periods.length
              ? periods.slice(0, 4).map((p, i) => (
                  <span
                    key={i}
                    className="wg-dot"
                    style={{ background: `var(--${subjects[p.subj].color})` }}
                  ></span>
                ))
              : <span className="wg-flag">–</span>}
          </div>
        </div>
      );
    });
  };

  const renderTimetable = () => {
    const periods = timetable[activeDay] || [];
    if (!periods.length)
      return (
        <p style={{ padding: "16px 4px", color: "var(--ash)", fontSize: 13 }}>
          No classes scheduled — good day to catch up on Practice.
        </p>
      );
    return periods.map((p, i) => {
      const s = subjects[p.subj];
      const fromSchool = false;
      return (
        <div
          key={i}
          className="topic-row"
          style={{ cursor: "pointer" }}
          onClick={() => openSubject(p.subj, "overview")}
        >
          <div className="topic-dot" style={{ background: `var(--${s.color})` }}></div>
          <div className="topic-title">{s.icon} {s.name}</div>
          <span
            className="plus-lock"
            style={{ background: fromSchool ? "var(--thread-soft)" : "var(--paper-dim)", color: fromSchool ? "var(--thread)" : "var(--ash)" }}
          >
            {fromSchool ? "🏫 School" : "👤 You"}
          </span>
          <div className="qtag" style={{ margin: "0 0 0 8px" }}>{p.time}</div>
        </div>
      );
    });
  };

  const sortedTasks = useMemo(() => {
    return tasks.slice().sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      const da = taskDueDate(a.due), db = taskDueDate(b.due);
      if (da && db) return da.getTime() - db.getTime();
      return da ? -1 : db ? 1 : 0;
    });
  }, [tasks]);

  const renderTasks = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const buckets = [
      {
        key: "today",
        label: "Today",
        test: (t: WsTask) =>
          calendarDayKey(taskDueDate(t.due) || FAR_FUTURE) === calendarDayKey(today),
      },
      {
        key: "tomorrow",
        label: "Tomorrow",
        test: (t: WsTask) =>
          calendarDayKey(taskDueDate(t.due) || FAR_FUTURE) === calendarDayKey(tomorrow),
      },
      {
        key: "later",
        label: "Later",
        test: (t: WsTask) => {
          const d = taskDueDate(t.due);
          return !!d && d.getTime() > tomorrow.getTime();
        },
      },
      {
        key: "unscheduled",
        label: "No date",
        test: (t: WsTask) => !taskDueDate(t.due),
      },
    ];
    const used = new Set<number>();
    const blocks: React.ReactNode[] = [];
    buckets.forEach((b) => {
      const items = sortedTasks.filter((t) => !used.has(t.id) && b.test(t));
      items.forEach((t) => used.add(t.id));
      if (!items.length) return;
      blocks.push(
        <div key={b.key}>
          <div className="task-group-header">{b.label}</div>
          <div className="card" style={{ padding: "4px 16px" }}>
            {items.map((t) => {
              const recurIcon =
                t.recurrence && t.recurrence !== "none"
                  ? <span title={`Repeats ${t.recurrence}`}>🔁</span>
                  : null;
              const notesIcon = t.notes
                ? <span title={t.notes}>📝</span>
                : null;
              return (
                <div
                  key={t.id}
                  className="topic-row"
                  style={{ cursor: "pointer", ...(t.done ? { opacity: 0.5 } : {}) }}
                  onClick={() => toggleTask(t.id)}
                >
                  <div
                    className="plan-check"
                    style={t.done ? { background: "var(--thread)", borderColor: "var(--thread)" } : {}}
                  ></div>
                  <div className="topic-title" style={t.done ? { textDecoration: "line-through" } : {}}>
                    {recurIcon} {notesIcon} {t.title}
                  </div>
                  <span
                    className="plan-why"
                    style={{ background: `var(--${t.priority}-soft, var(--paper-dim))`, color: `var(--${t.priority})` }}
                  >
                    {formatTaskDue(t.due)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>,
      );
    });
    return (
      <>
        {blocks.length ? blocks : (
          <p style={{ padding: "16px 4px", color: "var(--ash)", fontSize: 13 }}>
            No tasks yet — add your first one.
          </p>
        )}
      </>
    );
  };

  const dueTodayCount = useMemo(() => {
    const today = new Date();
    return tasks.filter(
      (t) =>
        !t.done &&
        calendarDayKey(taskDueDate(t.due) || FAR_FUTURE) === calendarDayKey(today),
    ).length;
  }, [tasks]);

  const renderExams = () => {
    const sorted = exams.slice().sort((a, b) => a.days - b.days);
    return sorted.map((e) => {
      const s = subjects[e.subject];
      const urgentColor = e.days <= 7 ? "var(--coral)" : e.days <= 21 ? "var(--ember)" : "var(--thread)";
      return (
        <div
          key={e.name}
          className="plan-item"
          style={{ cursor: "pointer" }}
          onClick={() =>
            startSession({
              mode: "single",
              subjectId: e.subject,
              board: s.boards[0],
              year: null,
              duration: 20,
              count: 10,
            })
          }
        >
          <div className="plan-icon" style={{ background: `var(--${s.color}-soft)` }}>{s.icon}</div>
          <div className="plan-body">
            <div className="plan-title">{e.name}</div>
            <div className="plan-meta">{e.board} · {s.name}</div>
          </div>
          <div className="plan-why" style={{ color: urgentColor }}>{e.days}d left</div>
        </div>
      );
    });
  };

  const renderCalendar = () => {
    const year = calViewDate.getFullYear();
    const month = calViewDate.getMonth();
    const label = calViewDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    const today = new Date();
    const taskDates: Record<string, WsTask[]> = {};
    tasks.forEach((t) => {
      const d = taskDueDate(t.due);
      if (d) (taskDates[calendarDayKey(d)] = taskDates[calendarDayKey(d)] || []).push(t);
    });
    const examDates: Record<string, WsExam> = {};
    exams.forEach((e) => {
      const d = new Date(today);
      d.setDate(d.getDate() + e.days);
      examDates[calendarDayKey(d)] = e;
    });
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = (firstOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: React.ReactNode[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(<div key={"e" + i} className="cal-cell empty"></div>);
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const key = calendarDayKey(d);
      const isToday = key === calendarDayKey(today);
      const isSelected = key === calendarDayKey(calSelectedDate);
      const hasTask = !!taskDates[key];
      const hasExam = !!examDates[key];
      cells.push(
        <div
          key={day}
          className={`cal-cell ${isToday ? "is-today" : ""} ${isSelected ? "selected" : ""} ${hasExam ? "has-exam" : ""}`}
          onClick={() => setCalSelectedDate(new Date(year, month, day))}
        >
          {day}{(hasTask || hasExam) ? <span className="cal-dot"></span> : null}
        </div>,
      );
    }
    const key = calendarDayKey(calSelectedDate);
    const agenda: React.ReactNode[] = [];
    if (examDates[key]) {
      const e = examDates[key];
      const s = subjects[e.subject];
      agenda.push(
        <div className="cal-agenda-row" key="ex">
          🎯 <strong>{e.name}</strong> — {e.board} {s.name}
        </div>,
      );
    }
    if (taskDates[key]) {
      taskDates[key].forEach((t, i) =>
        agenda.push(
          <div className="cal-agenda-row" key={"t" + i}>🗒️ {t.title}</div>,
        ),
      );
    }
    return (
      <>
        <div className="cal-header">
          <button className="cal-nav-btn" onClick={() => setCalViewDate(new Date(year, month - 1, 1))}>‹</button>
          <span className="cal-month-label">{label}</span>
          <button className="cal-nav-btn" onClick={() => setCalViewDate(new Date(year, month + 1, 1))}>›</button>
        </div>
        <div className="cal-weekday-row"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
        <div className="cal-grid">{cells}</div>
      </>
    );
  };

  const renderAgenda = () => {
    const today = new Date();
    const taskDates: Record<string, WsTask[]> = {};
    tasks.forEach((t) => {
      const d = taskDueDate(t.due);
      if (d) (taskDates[calendarDayKey(d)] = taskDates[calendarDayKey(d)] || []).push(t);
    });
    const examDates: Record<string, WsExam> = {};
    exams.forEach((e) => {
      const d = new Date(today);
      d.setDate(d.getDate() + e.days);
      examDates[calendarDayKey(d)] = e;
    });
    const key = calendarDayKey(calSelectedDate);
    const rows: React.ReactNode[] = [];
    if (examDates[key]) {
      const e = examDates[key];
      const s = subjects[e.subject];
      rows.push(<div className="cal-agenda-row" key="ex">🎯 <strong>{e.name}</strong> — {e.board} {s.name}</div>);
    }
    if (taskDates[key]) {
      taskDates[key].forEach((t, i) =>
        rows.push(<div className="cal-agenda-row" key={"t" + i}>🗒️ {t.title}</div>),
      );
    }
    return rows.length ? rows : (
      <p style={{ fontSize: 13, color: "var(--ash)", padding: "6px 4px" }}>
        Nothing scheduled this day.
      </p>
    );
  };

  const [qaOpen, setQaOpen] = useState<"task" | "class" | "exam" | null>(null);

  return (
    <section className="screen active" id="screen-workspace">
      <span className="eyebrow">Your mini workspace</span>
      <h1 className="page-title">Plan your week</h1>
      <p className="page-sub">
        Timetable, homework and upcoming exams — all in one place, colour-coded by subject.
      </p>

      <div className="week-glance" id="weekGlance">{renderWeekGlance()}</div>

      <div className="subnav" id="wsSubnav">
        <button className={wsPane === "calendar" ? "active" : ""} data-wspane="calendar" onClick={() => setWsPane("calendar")}>Calendar</button>
        <button className={wsPane === "timetable" ? "active" : ""} data-wspane="timetable" onClick={() => setWsPane("timetable")}>Timetable</button>
        <button className={wsPane === "todo" ? "active" : ""} data-wspane="todo" onClick={() => setWsPane("todo")}>To-do</button>
        <button className={wsPane === "exams" ? "active" : ""} data-wspane="exams" onClick={() => setWsPane("exams")}>Exams</button>
      </div>

      <div className={`ws-pane ${wsPane === "calendar" ? "active" : ""}`} id="wspane-calendar">
        {renderCalendar()}
        <span className="eyebrow" style={{ marginTop: 16 }}>On this day</span>
        <div id="calAgenda">{renderAgenda()}</div>
      </div>

      <div className={`ws-pane ${wsPane === "timetable" ? "active" : ""}`} id="wspane-timetable">
        <div className="card" style={{ padding: "4px 16px" }} id="timetableList">{renderTimetable()}</div>
        <button className="add-entry-btn" id="addClassBtn" onClick={() => setQaOpen("class")}>+ Add a class</button>
      </div>

      <div className={`ws-pane ${wsPane === "todo" ? "active" : ""}`} id="wspane-todo">
        <div className="recommend-card">
          <div>
            <div className="lbl">Due today</div>
            <div className="ttl" id="taskDueCount">
              {dueTodayCount} task{dueTodayCount === 1 ? "" : "s"} left
            </div>
          </div>
          <button onClick={() => setQaOpen("task")}>+ Add task</button>
        </div>
        <div id="taskList">{renderTasks()}</div>
      </div>

      <div className={`ws-pane ${wsPane === "exams" ? "active" : ""}`} id="wspane-exams">
        <span className="eyebrow">Countdown</span>
        <div className="plan-strip" id="examList">{renderExams()}</div>
        <button className="add-entry-btn" onClick={() => setQaOpen("exam")}>+ Add an exam</button>
      </div>

      {qaOpen && (
        <QuickAddModal
          mode={qaOpen}
          activeDay={activeDay}
          subjects={subjects}
          timetable={timetable}
          setTimetable={setTimetable}
          tasks={tasks}
          setTasks={setTasks}
          exams={exams}
          setExams={setExams}
          onClose={() => setQaOpen(null)}
        />
      )}
    </section>
  );
}

function QuickAddModal({
  mode,
  activeDay,
  subjects,
  timetable,
  setTimetable,
  tasks,
  setTasks,
  exams,
  setExams,
  onClose,
}: {
  mode: string;
  activeDay: string;
  subjects: Record<string, SubjectData>;
  timetable: WsDay;
  setTimetable: React.Dispatch<React.SetStateAction<WsDay>>;
  tasks: WsTask[];
  setTasks: React.Dispatch<React.SetStateAction<WsTask[]>>;
  exams: WsExam[];
  setExams: React.Dispatch<React.SetStateAction<WsExam[]>>;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState<string | null>(null);
  const [clazz, setClazz] = useState<string | null>(mode === "exam" ? "WAEC" : null);
  const [extra, setExtra] = useState<string | null>(
    mode === "class" ? null : mode === "exam" ? "1 week" : "Today",
  );
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [recur, setRecur] = useState("none");
  const [notes, setNotes] = useState("");
  const [nameError, setNameError] = useState(false);

  const title =
    mode === "task" ? "Add a task" : mode === "class" ? `Add a class to ${activeDay}` : "Add an exam";
  const nameLabel =
    mode === "task" ? "What do you need to do?" : mode === "class" ? "What time?" : "Exam name";
  const placeholder =
    mode === "task"
      ? "e.g. Finish algebra worksheet, or Call the dentist"
      : mode === "class"
      ? "e.g. 2:30"
      : "e.g. Biology Paper 2";

  const extraLabel = mode === "exam" ? "When" : "Due";

  const submit = () => {
    const trimmed = name.trim();
    const needsSubject = mode !== "task";
    const needsClass = mode === "exam";
    if (!trimmed || (needsSubject && !subject) || (needsClass && !clazz)) {
      setNameError(!trimmed);
      return;
    }
    if (mode === "task") {
      const priorityColor: Record<string, string> = { low: "thread", medium: "ember", high: "coral" };
      setTasks((prev) => [
        ...prev,
        { id: Date.now(), title: trimmed, due: extra || "Today", done: false, priority: priorityColor[priority] || "ember", recurrence: recur || "none", notes },
      ]);
    } else if (mode === "exam") {
      const daysMap: Record<string, number> = { "1 week": 7, "2 weeks": 14, "3 weeks": 21, "1 month": 30, "2 months": 60 };
      setExams((prev) => [...prev, { name: trimmed, board: clazz!, subject: subject!, days: daysMap[extra || "1 week"] || 14 }]);
    } else if (mode === "class") {
      if (subject) {
        setTimetable((prev) => {
          const dayArr = [...(prev[activeDay] || [])];
          dayArr.push({ time: trimmed, subj: subject, addedByUser: true });
          dayArr.sort((a, b) => a.time.localeCompare(b.time, undefined, { numeric: true }));
          return { ...prev, [activeDay]: dayArr };
        });
      }
    }
    onClose();
  };

  const showSubject = mode !== "task";
  const showExtra = mode === "task" || mode === "exam";
  const showDate = mode === "task";
  const showPriority = mode === "task";
  const showRecur = mode === "task";
  const showNotes = mode === "task";
  const extraOptions =
    mode === "exam" ? ["1 week", "2 weeks", "3 weeks", "1 month", "2 months"] : ["Today", "Tomorrow"];

  return (
    <div className="modal-overlay show" id="quickAddModal">
      <div className="modal-sheet">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>{title}</h2>
        <div className="mock-picker-row">
          <span className="mock-picker-label">{nameLabel}</span>
          <input
            type="text"
            className="qa-text-input"
            placeholder={placeholder}
            value={name}
            onChange={(e) => { setName(e.target.value); if (nameError) setNameError(false); }}
            style={nameError ? { borderColor: "var(--coral)" } : {}}
          />
        </div>

        {showSubject && (
          <div className="mock-picker-row" id="qaSubjectRow">
            <span className="mock-picker-label" id="qaSubjectLabel">Subject</span>
            <div className="ask-context-row" id="qaSubjectChips">
              {Object.keys(subjects).map((id) => {
                const s = subjects[id];
                return (
                  <button
                    key={id}
                    className={`context-chip ${subject === id ? "active" : ""}`}
                    onClick={() => setSubject(id)}
                  >
                    {s.icon} {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {mode === "exam" && (
          <div className="mock-picker-row" id="qaClassRow">
            <span className="mock-picker-label">Exam board</span>
            <div className="ask-context-row" id="qaClassChips">
              {["WAEC", "JAMB", "NECO", "GCE"].map((b) => (
                <button
                  key={b}
                  className={`context-chip ${clazz === b ? "active" : ""}`}
                  onClick={() => setClazz(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {showExtra && (
          <div className="mock-picker-row" id="qaExtraRow">
            <span className="mock-picker-label" id="qaExtraLabel">{extraLabel}</span>
            <div className="ask-context-row" id="qaExtraChips">
              {extraOptions.map((o) => (
                <button
                  key={o}
                  className={`context-chip ${extra === o ? "active" : ""}`}
                  onClick={() => setExtra(o)}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {showDate && (
          <div className="mock-picker-row" id="qaDateRow">
            <span className="mock-picker-label">Or pick an exact date</span>
            <input
              type="date"
              className="qa-text-input"
              value={due}
              onChange={(e) => {
                setDue(e.target.value);
                if (e.target.value) setExtra(e.target.value);
              }}
            />
          </div>
        )}

        {showPriority && (
          <div className="mock-picker-row" id="qaPriorityRow">
            <span className="mock-picker-label">Priority</span>
            <div className="ask-context-row" id="qaPriorityChips">
              {[{ v: "low", l: "Low" }, { v: "medium", l: "Medium" }, { v: "high", l: "High" }].map((p) => (
                <button
                  key={p.v}
                  className={`context-chip ${priority === p.v ? "active" : ""}`}
                  onClick={() => setPriority(p.v)}
                >
                  {p.l}
                </button>
              ))}
            </div>
          </div>
        )}

        {showRecur && (
          <div className="mock-picker-row" id="qaRecurRow">
            <span className="mock-picker-label">Repeat</span>
            <div className="ask-context-row" id="qaRecurChips">
              {[{ v: "none", l: "Once" }, { v: "daily", l: "Daily" }, { v: "weekdays", l: "Weekdays" }, { v: "weekly", l: "Weekly" }].map((r) => (
                <button
                  key={r.v}
                  className={`context-chip ${recur === r.v ? "active" : ""}`}
                  onClick={() => setRecur(r.v)}
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>
        )}

        {showNotes && (
          <div className="mock-picker-row" id="qaNotesRow">
            <span className="mock-picker-label">Notes <span style={{ fontWeight: 400, color: "var(--ash)" }}>(optional)</span></span>
            <textarea
              className="qa-text-input"
              style={{ minHeight: 60, resize: "vertical" }}
              placeholder="Any extra detail…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        )}

        <button className="modal-done-btn" onClick={submit}>Add →</button>
      </div>
    </div>
  );
}