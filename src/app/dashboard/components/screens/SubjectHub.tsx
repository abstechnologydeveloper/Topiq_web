"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SUBJECT_DIAGRAMS } from "../../data/subjects";
import { BackChevron, MicIcon, SearchIcon, SendIcon, SpeakButtonSVG, ThreadMark } from "./shared";
import ArticleModal, { type ArticleCfg } from "./ArticleModal";
import type { SubjectData } from "./DiscoverScreen";

export type ArticleTarget = { kind: "topic" | "tutorial"; index: number };

type Props = {
  subjectId: string;
  subjects: Record<string, SubjectData>;
  student: { grade: string };
  goTab: (tab: string) => void;
  onDone: (subjectId: string) => void;
  initialPane?: "overview" | "learn" | "flash";
};

type Bubble =
  | { role: "user"; text: string }
  | { role: "ai"; node: React.ReactNode };

export default function SubjectHub({ subjectId, subjects, student, goTab, onDone, initialPane = "overview" }: Props) {
  const s = subjects[subjectId];

  const [pane, setPane] = useState<"overview" | "learn" | "flash">("overview");
  const [topicQuery, setTopicQuery] = useState("");

  const [flashIndex, setFlashIndex] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [flashReview, setFlashReview] = useState(false);
  const [flashAgainQueue, setFlashAgainQueue] = useState<{ front: string; back: string }[]>([]);
  const [flashDone, setFlashDone] = useState(false);

  const [hubChat, setHubChat] = useState<Bubble[]>([]);
  const [hubInput, setHubInput] = useState("");

  const [article, setArticle] = useState<ArticleCfg | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const cards = s.flashcards;
  const flashLen = cards.length;
  const flashPrevDisabled = flashIndex === 0;
  const flashNextDisabled = flashIndex === flashLen - 1;

  const recTitle = useMemo(
    () => s.topics.find((t) => t.pct < 100 && t.pct > 0)?.t || s.topics[0].t,
    [s],
  );
  const recIdx = useMemo(() => {
    const i = s.topics.findIndex((t) => t.pct < 100 && t.pct > 0);
    return i >= 0 ? i : 0;
  }, [s]);

  const initHubChat = useMemo(
    () => [
      { role: "user" as const, text: `Can you explain ${s.topics[0].t.toLowerCase()} simply?` },
      {
        role: "ai" as const,
        node: (
          <>
            Here&apos;s the grounded explanation, tied directly to your {s.name} syllabus.
            <div className="grounding">
              <ThreadMark />
              <span className="chip">
                § {s.name} — {s.topics[0].t}
              </span>
            </div>
            <button className="speak-btn">
              <SpeakButtonSVG />
              <span className="speak-label">Listen</span>
            </button>
          </>
        ),
      },
    ],
    [s],
  );

  useEffect(() => {
    setHubChat(initHubChat);
    setPane(initialPane);
    setTopicQuery("");
    setFlashIndex(0);
    setFlashFlipped(false);
    setFlashReview(false);
    setFlashAgainQueue([]);
    setFlashDone(false);
  }, [subjectId, initHubChat, initialPane]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [hubChat]);

  const showPane = (name: "overview" | "learn" | "flash") => setPane(name);

  const filteredTopics = useMemo(() => {
    const q = topicQuery.trim().toLowerCase();
    if (!q) return s.topics.map((t, i) => ({ t, i }));
    return s.topics.map((t, i) => ({ t, i })).filter((x) => x.t.t.toLowerCase().includes(q));
  }, [topicQuery, s]);

  const openTopicArticle = (topicIndex: number) => {
    const topic = s.topics[topicIndex];
    const sections =
      topic.article && topic.article.length
        ? topic.article
        : s.tutorials.slice(0, 2).map((t) => ({
            heading: t.title,
            text: t.content || "Content grounded in your syllabus goes here.",
          }));
    setArticle({
      eyebrow: `${s.icon} ${s.name}<span class="dot"></span>${sections.length + 3} min read`,
      title: topic.t,
      videoMins: "6 min",
      sections,
      showTermGrid: true,
      quickCheck: (s.questions && s.questions[0]) || null,
      takeaway:
        topic.takeaway ||
        `You now understand the core idea behind ${topic.t.toLowerCase()}. Head to Practice to test yourself on it.`,
      ref: `§ ${s.name} — ${topic.t}`,
      subjectId,
      doneMessage: "Mark as done ✓",
      isTutorial: false,
    });
  };

  const openTutorial = (i: number) => {
    const t = s.tutorials[i];
    const content =
      t.content || "Full tutorial content would stream here, grounded in the exact syllabus section it comes from.";
    const sentences = content.split(". ").filter(Boolean);
    const mid = Math.ceil(sentences.length / 2);
    const sections = [
      { heading: null, text: sentences.slice(0, mid).join(". ") + (sentences.length > 1 ? "." : "") },
      { heading: null, text: sentences.slice(mid).join(". ") },
    ];
    setArticle({
      eyebrow: `${s.icon} ${s.name}<span class="dot"></span>${t.format} · ${t.mins}`,
      title: t.title,
      videoMins: t.format === "Video" ? t.mins : null,
      sections,
      showTermGrid: false,
      quickCheck: null,
      takeaway: null,
      ref: t.ref || `§ ${s.name}`,
      subjectId,
      doneMessage: "Mark as done ✓",
      isTutorial: true,
    });
  };

  const updateFlashcard = (index: number) => {
    setFlashFlipped(false);
    setFlashReview(flashReview);
    setFlashIndex(index);
  };

  const flashPrev = () => {
    if (flashIndex > 0) updateFlashcard(flashIndex - 1);
  };
  const flashNext = () => {
    if (flashIndex < flashLen - 1) updateFlashcard(flashIndex + 1);
  };
  const flipFlash = () => setFlashFlipped((f) => !f);

  const rateFlash = (rating: "again" | "good" | "easy") => {
    if (rating === "again") setFlashAgainQueue((q) => [...q, cards[flashIndex]]);
    if (flashIndex < flashLen - 1) {
      setFlashIndex(flashIndex + 1);
      setFlashFlipped(false);
    } else if (flashReview) {
      setFlashDone(true);
    } else {
      setFlashReview(true);
      setFlashAgainQueue([]);
      setFlashIndex(0);
      setFlashFlipped(false);
    }
  };

  const sendMessage = () => {
    const text = hubInput.trim();
    if (!text) return;
    const newChat: Bubble[] = [...hubChat, { role: "user", text }];
    setHubChat(newChat);
    setHubInput("");
    setTimeout(() => {
      setHubChat((prev) => [
        ...prev,
        {
          role: "ai",
          node: (
            <>
              Here&apos;s the grounded explanation for that, tied to your {s.name} syllabus rather than a generic web answer.
              <div className="grounding">
                <ThreadMark />
                <span className="chip">
                  § {s.name} — {s.topics[0].t}
                </span>
              </div>
              <button className="speak-btn">
                <SpeakButtonSVG />
                <span className="speak-label">Listen</span>
              </button>
            </>
          ),
        },
      ]);
    }, 900);
  };

  const flashProgressText = flashReview
    ? "Reviewing cards marked \"Again\""
    : `Card ${flashIndex + 1} of ${flashLen} · tap card to flip · arrows to skip`;

  return (
    <>
      <section className="screen active" id="screen-hub">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div className="back-row" style={{ marginBottom: 0 }} onClick={() => goTab("subjects")}>
            <BackChevron />
            Subjects
          </div>
          <span className="mode-badge">{student.grade}</span>
        </div>
        <div className="hub-header">
          <div>
            <h1 className="page-title" style={{ marginBottom: 0 }}>
              {s.icon} {s.name}
            </h1>
          </div>
        </div>

        <div className="search-bar">
          <SearchIcon size={18} />
          <input
            type="text"
            placeholder="Search a topic in this subject…"
            value={topicQuery}
            onChange={(e) => setTopicQuery(e.target.value)}
          />
        </div>

        <div className="subnav">
          <button className={pane === "overview" ? "active" : ""} onClick={() => showPane("overview")}>
            Overview
          </button>
          <button className={pane === "learn" ? "active" : ""} onClick={() => showPane("learn")}>
            Learn
          </button>
          <button className={pane === "flash" ? "active" : ""} onClick={() => showPane("flash")}>
            Flashcards
          </button>
        </div>

        {pane === "overview" && (
          <div className="hub-pane active">
            <div className="recommend-card">
              <div>
                <div className="lbl">Recommended next</div>
                <div className="ttl">{recTitle}</div>
              </div>
              <button onClick={() => openTopicArticle(recIdx)}>Start</button>
            </div>
            <div className="card" style={{ padding: "4px 16px" }}>
              {filteredTopics.length ? (
                filteredTopics.map(({ t, i }) => (
                  <div key={i} className="topic-row" onClick={() => openTopicArticle(i)}>
                    <div className="topic-dot" style={{ background: `var(--${t.status})` }}></div>
                    <div className="topic-title">{t.t}</div>
                    <div className="topic-bar-track">
                      <div
                        className="topic-bar-fill"
                        style={{
                          width: `${t.pct}%`,
                          background: `var(--${t.status === "ash-line" ? "ash-line" : t.status})`,
                        }}
                      ></div>
                    </div>
                    <div className="topic-pct">{t.pct}%</div>
                  </div>
                ))
              ) : (
                <p style={{ padding: "14px 4px", color: "var(--ash)", fontSize: 13 }}>
                  No topics match that search.
                </p>
              )}
            </div>
          </div>
        )}

        {pane === "learn" && (
          <div className="hub-pane active">
            <span className="eyebrow">Watch, read &amp; understand</span>
            <div>
              {s.tutorials.map((t, i) => (
                <div key={i} className="tut-card" onClick={() => openTutorial(i)}>
                  <div className="tut-thumb" style={{ background: `var(--${s.color}-soft)` }}>
                    {t.icon}
                    {t.format === "Video" ? (
                      <div className="play-overlay">
                        <svg viewBox="0 0 24 24" fill="rgba(20,23,43,0.55)">
                          <circle cx="12" cy="12" r="11" />
                        </svg>
                        <svg style={{ position: "absolute" }} viewBox="0 0 24 24" fill="#fff">
                          <path d="M9 6v12l9-6z" />
                        </svg>
                      </div>
                    ) : null}
                  </div>
                  <div className="tut-body">
                    <div className="tut-title">
                      <span className="tut-step">{i + 1}</span>
                      {t.title}
                    </div>
                    <div className="tut-meta">
                      <span className="format-tag">{t.format === "Video" ? "▶ Watch" : "📖 Read"}</span>
                      <span>{t.mins}</span>
                    </div>
                    <div className="grounding">
                      <ThreadMark />
                      <span className="chip">{t.ref || `§ ${s.name}`}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <span className="eyebrow" style={{ marginTop: 6 }}>
              Still stuck? Ask Sabi AI right here
            </span>
            <div className="usage-chip">
              <span className="uc-label">3 free Sabi AI questions left today</span>
              <span className="uc-link">Upgrade</span>
            </div>
            <div className="chat-scroll" style={{ marginBottom: 12 }}>
              {hubChat.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="bubble user">
                    {m.text}
                  </div>
                ) : (
                  <div key={i} className="bubble ai">
                    {m.node}
                  </div>
                ),
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="composer-v2">
              <button className="icon-btn mic" title="Ask by voice">
                <MicIcon size={16} />
              </button>
              <input
                type="text"
                placeholder="Ask about this subject…"
                value={hubInput}
                onChange={(e) => setHubInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button className="send-btn" onClick={sendMessage}>
                <SendIcon size={16} />
              </button>
            </div>
          </div>
        )}

        {pane === "flash" && (
          <div className="hub-pane active">
            {!flashDone ? (
              <div className="flash-wrap">
                <div className="flash-carousel">
                  <button
                    className="flash-arrow"
                    onClick={flashPrev}
                    title="Previous card"
                    disabled={flashPrevDisabled}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <div
                    className={`flashcard${flashFlipped ? " flipped" : ""}`}
                    id="flashcard"
                    onClick={flipFlash}
                  >
                    <div className="flashcard-inner">
                      <div className="flashcard-face flashcard-front">
                        {cards[flashIndex] ? cards[flashIndex].front : ""}
                      </div>
                      <div className="flashcard-face flashcard-back">
                        {cards[flashIndex] ? cards[flashIndex].back : ""}
                      </div>
                    </div>
                  </div>
                  <button
                    className="flash-arrow"
                    onClick={flashNext}
                    title="Next card"
                    disabled={flashNextDisabled}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
                <div className="flash-progress">{flashProgressText}</div>
                <div className="rate-row">
                  <button className={`rate-btn rate-again${flashFlipped ? " show" : ""}`} onClick={() => rateFlash("again")}>
                    Again
                  </button>
                  <button className={`rate-btn rate-good${flashFlipped ? " show" : ""}`} onClick={() => rateFlash("good")}>
                    Good
                  </button>
                  <button className={`rate-btn rate-easy${flashFlipped ? " show" : ""}`} onClick={() => rateFlash("easy")}>
                    Easy
                  </button>
                </div>
              </div>
            ) : (
              <div className="flash-done card">
                <div className="eyebrow" style={{ justifyContent: "center" }}>
                  Deck reviewed
                </div>
                <p style={{ fontSize: 14, color: "var(--ash)", marginBottom: 12 }}>
                  Cards marked &quot;Again&quot; will resurface sooner next session.
                </p>
                <button
                  onClick={() => {
                    setFlashDone(false);
                    setFlashIndex(0);
                    setFlashFlipped(false);
                    setFlashReview(false);
                    setFlashAgainQueue([]);
                  }}
                  style={{
                    background: "var(--ink)",
                    color: "var(--paper)",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: 20,
                    fontWeight: 700,
                    fontSize: "12.5px",
                    cursor: "pointer",
                  }}
                >
                  Review again
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {article && (
        <ArticleModal
          cfg={article}
          subjects={subjects}
          diagrams={SUBJECT_DIAGRAMS}
          onClose={() => setArticle(null)}
          onDone={() => onDone(subjectId)}
        />
      )}
    </>
  );
}