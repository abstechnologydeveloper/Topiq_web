"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SUBJECT_DIAGRAMS } from "../../data/subjects";
import { BackChevron, MicIcon, SearchIcon, SendIcon, SpeakButtonSVG, ThreadMark } from "../../components/screens/shared";
import ArticleModal, { type ArticleCfg } from "./ArticleModal";
import type { SubjectData } from "../../components/screens/DiscoverScreen";

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

const TUT_CARD =
  "mb-2.5 flex cursor-pointer gap-[13px] rounded-btn border border-ash-line bg-surface p-3 transition-[border-color,transform] duration-150 hover:border-thread hover:-translate-y-px";
const FLASH_ARROW =
  "flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center rounded-full border-1_5 border-ash-line bg-surface text-ink transition-colors duration-150 hover:bg-paper-dim disabled:opacity-35 disabled:cursor-default";
const FLASH_FACE =
  "absolute inset-0 flex items-center justify-center rounded-card p-6 text-center text-base font-semibold [backface-visibility:hidden]";

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
      <section className="block animate-[fade_.25s_ease] p-0">
        <div className="mb-3.5 flex items-center justify-between">
          <div className="back-row !mb-0" onClick={() => goTab("subjects")}>
            <BackChevron />
            Subjects
          </div>
          <span className="mode-badge">{student.grade}</span>
        </div>
        <h1 className="font-display mb-3.5 text-[25px] font-semibold tracking-[-0.01em]">
          {s.icon} {s.name}
        </h1>

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
          <div className="block animate-[fade_.2s_ease]">
            <div className="recommend-card">
              <div>
                <div className="lbl">Recommended next</div>
                <div className="ttl">{recTitle}</div>
              </div>
              <button onClick={() => openTopicArticle(recIdx)}>Start</button>
            </div>
            <div className="rounded-[18px] border border-ash-line bg-surface px-4 py-1">
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
                <p className="px-1 py-3.5 text-[13px] text-ash">No topics match that search.</p>
              )}
            </div>
          </div>
        )}

        {pane === "learn" && (
          <div className="block animate-[fade_.2s_ease]">
            <span className="eyebrow">Watch, read &amp; understand</span>
            <div>
              {s.tutorials.map((t, i) => (
                <div key={i} className={TUT_CARD} onClick={() => openTutorial(i)}>
                  <div className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-tile text-2xl" style={{ background: `var(--${s.color}-soft)` }}>
                    {t.icon}
                    {t.format === "Video" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="h-[26px] w-[26px]" viewBox="0 0 24 24" fill="rgba(20,23,43,0.55)">
                          <circle cx="12" cy="12" r="11" />
                        </svg>
                        <svg className="absolute h-[26px] w-[26px]" viewBox="0 0 24 24" fill="#fff">
                          <path d="M9 6v12l9-6z" />
                        </svg>
                      </div>
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="text-input mb-[3px] font-bold leading-[1.3]">
                      <span className="mr-[5px] inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-paper-dim text-[9.5px] font-bold">{i + 1}</span>
                      {t.title}
                    </div>
                    <div className="mb-1.5 flex items-center gap-2 text-[11.5px] text-ash">
                      <span className="font-mono font-semibold">{t.format === "Video" ? "▶ Watch" : "📖 Read"}</span>
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

            <span className="eyebrow mt-1.5">Still stuck? Ask Sabi AI right here</span>
            <div className="usage-chip">
              <span className="uc-label">3 free Sabi AI questions left today</span>
              <span className="uc-link">Upgrade</span>
            </div>
            <div className="chat-scroll mb-3">
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
          <div className="block animate-[fade_.2s_ease]">
            {!flashDone ? (
              <div className="flex flex-col items-center">
                <div className="flex w-full max-w-[420px] items-center gap-2.5">
                  <button
                    className={FLASH_ARROW}
                    onClick={flashPrev}
                    title="Previous card"
                    disabled={flashPrevDisabled}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <div
                    className={`h-[190px] flex-1 cursor-pointer [perspective:1000px]`}
                    onClick={flipFlash}
                  >
                    <div
                      className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${flashFlipped ? "[transform:rotateY(180deg)]" : ""}`}
                    >
                      <div className={`${FLASH_FACE} border-1_5 border-violet bg-violet-soft text-ink`}>
                        {cards[flashIndex] ? cards[flashIndex].front : ""}
                      </div>
                      <div className={`${FLASH_FACE} bg-ink text-input font-medium leading-[1.5] text-paper [transform:rotateY(180deg)]`}>
                        {cards[flashIndex] ? cards[flashIndex].back : ""}
                      </div>
                    </div>
                  </div>
                  <button
                    className={FLASH_ARROW}
                    onClick={flashNext}
                    title="Next card"
                    disabled={flashNextDisabled}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
                <div className="mb-3.5 mt-2.5 text-center font-mono text-xs text-ash">{flashProgressText}</div>
                <div className="mx-auto flex w-full max-w-[420px] gap-2">
                  <button className="flex-1 cursor-pointer rounded-tile border-1_5 border-ash-line bg-surface px-1 py-2.5 text-xs font-bold text-coral" onClick={() => rateFlash("again")}>
                    Again
                  </button>
                  <button className="flex-1 cursor-pointer rounded-tile border-1_5 border-ash-line bg-surface px-1 py-2.5 text-xs font-bold text-ember" onClick={() => rateFlash("good")}>
                    Good
                  </button>
                  <button className="flex-1 cursor-pointer rounded-tile border-1_5 border-ash-line bg-surface px-1 py-2.5 text-xs font-bold text-thread" onClick={() => rateFlash("easy")}>
                    Easy
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-6 text-center">
                <div className="eyebrow justify-center">Deck reviewed</div>
                <p className="mb-3 text-sm text-ash">
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
                  className="cursor-pointer rounded-[20px] border-none bg-ink px-5 py-2.5 text-[12.5px] font-bold text-paper"
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