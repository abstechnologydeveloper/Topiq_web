"use client";

import { useMemo, useState } from "react";
import { CLASSES, LP_DURATIONS, LP_TYPES } from "../../data/teacher";
import { SUBJECTS } from "../../data/subjects";
import { ChevronMicro } from "./shared";
import type { SubjectData } from "./DiscoverScreen";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

type HistoryEntry = {
  id: number;
  type: string;
  typeName: string;
  icon: string;
  subject: string;
  subjectName: string;
  board: string;
  topic: string;
  className: string;
  duration: string;
};

function lpSplitTime(duration: string, part: "intro" | "main" | "activity" | "eval") {
  const mins = parseInt(duration, 10) || 40;
  const shares = { intro: 0.15, main: 0.45, activity: 0.25, eval: 0.15 };
  return Math.max(3, Math.round(mins * shares[part])) + "m";
}

function lpBody(entry: HistoryEntry) {
  const { type, subjectName, topic, className, board, duration } = entry;
  if (type === "note") {
    return `
      <h3>Learning objectives</h3>
      <p>By the end of the lesson, students should be able to define, explain and apply key ideas in <strong>${topic}</strong>, in line with the ${board} ${subjectName} syllabus.</p>
      <h3>Success criteria</h3>
      <ul>
        <li>Can state the key definitions related to ${topic} in their own words</li>
        <li>Can work through at least one ${board}-style question on ${topic} independently</li>
        <li>Can explain ${topic} to a classmate using a real-world example</li>
      </ul>
      <h3>Introduction (${lpSplitTime(duration, "intro")})</h3>
      <p>Recap the previous topic, then link it to ${topic} using an example students in ${className} can relate to.</p>
      <h3>Content development (${lpSplitTime(duration, "main")})</h3>
      <ul>
        <li>Core definitions and terminology for ${topic}</li>
        <li>Worked example demonstrating the main concept</li>
        <li>Common misconceptions and how to address them</li>
        <li>Link to past ${board} ${subjectName} exam questions on this topic</li>
      </ul>
      <h3>Class activity (${lpSplitTime(duration, "activity")})</h3>
      <p>Pair students to attempt two guided questions on ${topic}, then review as a class.</p>
      <h3>Differentiation</h3>
      <ul>
        <li><strong>Struggling learners:</strong> Provide a worked-example scaffold and reduce the question set to the two most essential items</li>
        <li><strong>Advanced learners:</strong> Extend with a past ${board} theory question on ${topic} and ask them to justify their reasoning</li>
      </ul>
      <h3>Evaluation (${lpSplitTime(duration, "eval")})</h3>
      <p>Ask 3 quick oral questions to check understanding before moving on.</p>
      <h3>Assignment</h3>
      <p>Set 5 ${board}-style practice questions on ${topic} for homework, due next class.</p>`;
  }
  if (type === "scheme") {
    const weeks = [1, 2, 3, 4, 5, 6]
      .map(
        (w) =>
          `<tr><td>Week ${w}</td><td>${w === 1 ? topic : `${topic} — part ${w}`}</td><td>${
            w < 6 ? "Teaching + practice" : "Revision & assessment"
          }</td></tr>`,
      )
      .join("");
    return `
      <h3>Term overview</h3>
      <p>A 6-week breakdown for ${subjectName} — ${className}, covering ${topic} in progressive depth, aligned to the ${board} syllabus.</p>
      <table>
        <tr><th>Week</th><th>Focus</th><th>Activity</th></tr>
        ${weeks}
      </table>
      <h3>Differentiation notes</h3>
      <p>Build in a 15-minute catch-up slot each Friday for students falling behind, and extension past-question sets for those ahead of pace.</p>`;
  }
  if (type === "quiz") {
    const qs = [1, 2, 3, 4, 5]
      .map(
        (n) =>
          `<li>Question ${n} on ${topic} — <em>(A) Option A &nbsp; (B) Option B &nbsp; (C) Option C &nbsp; (D) Option D</em></li>`,
      )
      .join("");
    return `
      <h3>Quiz — ${topic}</h3>
      <p>5 ${board}-style multiple-choice questions, syllabus-matched to ${subjectName}.</p>
      <ol>${qs}</ol>
      <h3>Answer key</h3>
      <p>1. B &nbsp; 2. A &nbsp; 3. D &nbsp; 4. C &nbsp; 5. A</p>
      <h3>Bonus: theory question</h3>
      <p>One ${board}-style structured/essay question on ${topic}, for students who finish early or as a written follow-up.</p>`;
  }
  return `
    <h3>Duration</h3>
    <p>${duration} · ${className} · ${board} ${subjectName}</p>
    <h3>Instructional objectives</h3>
    <p>Students will understand and apply ${topic} within ${subjectName}, in line with the ${board} syllabus.</p>
    <h3>Materials</h3>
    <p>Textbook, whiteboard, practice worksheet on ${topic}.</p>
    <h3>Procedure</h3>
    <ul>
      <li><strong>Introduction (${lpSplitTime(duration, "intro")}):</strong> Hook question to activate prior knowledge</li>
      <li><strong>Development (${lpSplitTime(duration, "main")}):</strong> Direct instruction + worked examples on ${topic}</li>
      <li><strong>Application (${lpSplitTime(duration, "activity")}):</strong> Guided practice in pairs</li>
      <li><strong>Conclusion (${lpSplitTime(duration, "eval")}):</strong> Recap and preview next lesson</li>
    </ul>
    <h3>Differentiation</h3>
    <ul>
      <li><strong>Struggling learners:</strong> Sentence starters and a worked example to follow along with</li>
      <li><strong>Advanced learners:</strong> An extension question drawn from past ${board} papers</li>
    </ul>
    <h3>Assessment</h3>
    <p>Exit ticket — one question on ${topic} answered before students leave.</p>`;
}

export default function LessonPrepScreen() {
  const [lpType, setLpType] = useState("note");
  const [lpSubject, setLpSubject] = useState<string | null>(null);
  const [lpBoard, setLpBoard] = useState<string | null>(null);
  const [lpClass, setLpClass] = useState<string | null>(null);
  const [lpDuration, setLpDuration] = useState("40 min");
  const [lpTopic, setLpTopic] = useState("");
  const [topicError, setTopicError] = useState(false);
  const [genText, setGenText] = useState("✨ Generate →");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [result, setResult] = useState<HistoryEntry | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const subjectKeys = useMemo(
    () => Object.keys(SUBJECTS).filter((id) => SUBJECT_LOOKUP[id]),
    [],
  );

  const effectiveBoard = (() => {
    if (!lpSubject) return null;
    const boards = SUBJECT_LOOKUP[lpSubject].boards;
    if (!lpBoard || !boards.includes(lpBoard)) return boards[0];
    return lpBoard;
  })();

  const genFlash = (text: string) => {
    setGenText(text);
    window.setTimeout(() => setGenText("✨ Generate →"), 1800);
  };

  const flash = (key: "copied" | "saved", target: boolean) => {
    if (key === "copied") setCopied(target);
    else setSaved(target);
    if (target)
      window.setTimeout(() => {
        if (key === "copied") setCopied(false);
        else setSaved(false);
      }, 1400);
  };

  const openResult = (entry: HistoryEntry) => {
    setResult(entry);
    window.setTimeout(() => {
      const el = document.getElementById("lpResult");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const generate = () => {
    const topic = lpTopic.trim();
    setTopicError(!topic);
    if (!topic || !lpSubject) {
      if (!lpSubject) genFlash("Pick a subject first");
      return;
    }
    const s = SUBJECT_LOOKUP[lpSubject];
    const c = CLASSES.find((x) => x.id === lpClass);
    const className = c ? c.name : "your class";
    const t = LP_TYPES.find((x) => x.id === lpType)!;
    const entry: HistoryEntry = {
      id: Date.now(),
      type: lpType,
      typeName: t.name,
      icon: t.icon,
      subject: lpSubject,
      subjectName: s.name,
      board: effectiveBoard || "",
      topic,
      className,
      duration: lpDuration,
    };
    setHistory((prev) => [entry, ...prev]);
    openResult(entry);
  };

  const reopen = (id: number) => {
    const entry = history.find((h) => h.id === id);
    if (entry) openResult(entry);
  };

  const pick = <T,>(setter: (v: T) => void, value: T) => () => setter(value);

  const chip = (active: boolean, label: string, onClick: () => void) => (
    <button className={`context-chip${active ? " active" : ""}`} onClick={onClick}>
      {label}
    </button>
  );

  return (
    <section className="screen active" id="screen-lessonprep">
      <span className="eyebrow">AI-powered, for teachers</span>
      <h1 className="page-title">Lesson Prep</h1>
      <p className="page-sub">
        Generate lesson notes, schemes of work and quiz questions — grounded in your syllabus, ready
        to edit and share.
      </p>

      <span className="eyebrow">What do you need?</span>
      <div className="genre-grid" style={{ marginBottom: "16px" }}>
        {LP_TYPES.map((t) => (
          <div
            key={t.id}
            className={`genre-card lp-type-card${lpType === t.id ? " active" : ""}`}
            onClick={pick(setLpType, t.id)}
          >
            <span className="gc-icon" style={{ background: `var(--${t.color}-soft)` }}>
              {t.icon}
            </span>
            <div className="gc-name">{t.name}</div>
          </div>
        ))}
      </div>

      <div className="mock-picker-row">
        <span className="mock-picker-label">Subject</span>
        <div className="ask-context-row">
          {subjectKeys.map((id) => {
            const s = SUBJECT_LOOKUP[id];
            return (
              <button
                key={id}
                className={`context-chip${lpSubject === id ? " active" : ""}`}
                onClick={() => {
                  setLpSubject(id);
                  setLpBoard(null);
                }}
              >
                {s.icon} {s.name}
              </button>
            );
          })}
        </div>
      </div>
      {lpSubject && (
        <div className="mock-picker-row">
          <span className="mock-picker-label">Exam board</span>
          <div className="ask-context-row">
            {SUBJECT_LOOKUP[lpSubject].boards.map((b) =>
              chip(effectiveBoard === b, b, pick(setLpBoard, b)),
            )}
          </div>
        </div>
      )}
      <div className="mock-picker-row">
        <span className="mock-picker-label">Class</span>
        <div className="ask-context-row">
          {CLASSES.map((c) => chip(lpClass === c.id, c.name, pick(setLpClass, c.id)))}
        </div>
      </div>
      <div className="mock-picker-row">
        <span className="mock-picker-label">Topic</span>
        <input
          type="text"
          className="qa-text-input"
          placeholder="e.g. Photosynthesis, Simultaneous equations…"
          value={lpTopic}
          onChange={(e) => {
            setLpTopic(e.target.value);
            if (e.target.value.trim()) setTopicError(false);
          }}
          style={topicError ? { borderColor: "var(--coral)" } : undefined}
        />
      </div>
      <div className="mock-picker-row">
        <span className="mock-picker-label">Duration</span>
        <div className="ask-context-row">
          {LP_DURATIONS.map((d) => chip(lpDuration === d, d, pick(setLpDuration, d)))}
        </div>
      </div>

      <button className="modal-done-btn" style={{ width: "100%" }} onClick={generate}>
        {genText}
      </button>

      {result && (
        <div id="lpResult" style={{ marginTop: "22px" }}>
          <div className="lp-doc">
            <div className="lp-doc-head">
              <span className="lp-doc-icon">{result.icon}</span>
              <div>
                <div className="lp-doc-title">
                  {result.topic} — {result.typeName}
                </div>
                <div className="lp-doc-meta">
                  {result.subjectName} · {result.className}
                </div>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: lpBody(result) }} />
            <div className="lp-doc-actions">
              <button className="lp-secondary" onClick={() => flash("copied", true)}>
                {copied ? "Copied ✓" : "Copy text"}
              </button>
              <button className="lp-primary" onClick={() => flash("saved", true)}>
                {saved ? "Saved ✓" : "Save to class"}
              </button>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: "26px" }}>
          <span className="eyebrow">Recent</span>
          {history.map((h) => (
            <div className="lp-history-row" key={h.id} onClick={() => reopen(h.id)}>
              <span className="lp-hicon">{h.icon}</span>
              <div className="lp-hmain">
                <div className="lp-htitle">
                  {h.topic} — {h.typeName}
                </div>
                <div className="lp-hmeta">
                  {h.subjectName} · {h.className}
                </div>
              </div>
              <ChevronMicro className="chev" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}