"use client";

import { useEffect, useRef, useState } from "react";
import { BackChevron, MicIcon, SendIcon, SpeakButtonSVG, ThreadMark } from "../../components/screens/shared";
import type { SubjectData } from "../../components/screens/DiscoverScreen";

export type ArticleCfg = {
  eyebrow: string;
  title: string;
  videoMins: string | null;
  sections: { heading?: string | null; text: string }[];
  showTermGrid: boolean;
  quickCheck: { text: string; options: string[]; correct: number; explain: string } | null;
  takeaway: string | null;
  ref: string;
  subjectId: string;
  doneMessage: string;
  isTutorial: boolean;
};

type Bubble =
  | { role: "user"; text: string }
  | { role: "ai"; node: React.ReactNode };

type Props = {
  cfg: ArticleCfg;
  subjects: Record<string, SubjectData>;
  diagrams: Record<string, string>;
  onClose: () => void;
  onDone: () => void;
};

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = String(Math.floor(sec % 60)).padStart(2, "0");
  return m + ":" + s;
}

const ARTICLE_EYEBROW =
  "flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-ash";

export default function ArticleModal({ cfg, subjects, diagrams, onClose, onDone }: Props) {
  const s = subjects[cfg.subjectId];

  const wordCount = cfg.sections.reduce((n, sec) => n + (sec.text ? sec.text.split(" ").length : 0), 0);
  const audioDuration = Math.max(90, Math.round((wordCount / 130) * 60));

  const [audioElapsed, setAudioElapsed] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [readingPct, setReadingPct] = useState(0);
  const [chat, setChat] = useState<Bubble[]>([]);
  const [chatInput, setChatInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAudioElapsed(0);
    setAudioPlaying(false);
    setAudioSpeed(1);
    setVideoPlaying(false);
    setAnswerIdx(null);
    setReadingPct(0);
    setChat([]);
    setChatInput("");
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [cfg]);

  useEffect(() => {
    if (!audioPlaying) return;
    const id = window.setInterval(() => {
      setAudioElapsed((prev) => {
        const next = Math.min(audioDuration, prev + audioSpeed);
        if (next >= audioDuration) setAudioPlaying(false);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [audioPlaying, audioSpeed, audioDuration]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setReadingPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
  };

  const sendMessage = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChat((prev) => [...prev, { role: "user", text }]);
    setChatInput("");
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          node: (
            <>
              Here&apos;s the grounded explanation for that, tied to your {s.name} syllabus rather than a generic web answer.
              <div className="grounding">
                <ThreadMark />
                <span className="chip">
                  § {s.name} — {cfg.title}
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

  return (
    <div className="fixed inset-0 z-[100] flex animate-[fade_.2s_ease] flex-col bg-paper">
      <div className="sticky top-0 z-[5] shrink-0 bg-paper px-5 pt-3.5">
        <div className="mb-3 flex items-center gap-3">
          <button
            className="flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-paper-dim"
            onClick={onClose}
          >
            <BackChevron />
          </button>
          <div className="min-w-0 flex-1">
            <span className={`${ARTICLE_EYEBROW} !mb-0.5`} dangerouslySetInnerHTML={{ __html: cfg.eyebrow }} />
            <h2 className="m-0 font-display text-lg font-semibold leading-[1.25]">{cfg.title}</h2>
          </div>
        </div>
      </div>
      <div className="h-[3px] bg-ash-line">
        <div className="h-full w-0 bg-thread" style={{ width: `${readingPct}%` }}></div>
      </div>
      <div className="mx-auto w-full max-w-[640px] flex-1 overflow-y-auto px-5 pt-4 pb-10" ref={scrollRef} onScroll={onScroll}>
        <div>
          <div className="mb-[18px] flex items-center gap-3 rounded-card border-1_5 border-violet bg-violet-soft px-3.5 py-3">
            <button
              className={`flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-violet text-white`}
              onClick={() => setAudioPlaying((p) => !p)}
            >
              <svg style={{ display: audioPlaying ? "none" : "block" }} width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className={`ml-1.5 h-3 items-center gap-0.5 ${audioPlaying ? "inline-flex" : "hidden"}`}>
                {[0, 1, 2].map((b) => (
                  <span
                    key={b}
                    className={`w-0.5 rounded-sm bg-surface ${audioPlaying ? "animate-[audiobar_.8s_ease-in-out_infinite]" : ""}`}
                    style={{ height: 4, animationDelay: b ? `${b * 0.15}s` : undefined }}
                  ></span>
                ))}
              </span>
            </button>
            <div className="min-w-0 flex-1">
              <div className="text-input mb-1 font-bold">🎧 Listen to this lesson</div>
              <div className="mb-1 h-[5px] overflow-hidden rounded [background:rgba(124,111,224,0.25)]">
                <div className="h-full w-0 rounded bg-violet" style={{ width: `${(audioElapsed / audioDuration) * 100}%` }}></div>
              </div>
              <span className="font-mono text-[10.5px] text-ink-soft">
                {fmtTime(audioElapsed)} / {fmtTime(audioDuration)}
              </span>
            </div>
            <button
              className="shrink-0 cursor-pointer rounded-tile border border-violet bg-surface px-[9px] py-1 font-mono text-[11px] font-bold text-violet"
              onClick={() => {
                const speeds = [1, 1.25, 1.5, 0.75];
                setAudioSpeed(speeds[(speeds.indexOf(audioSpeed) + 1) % speeds.length]);
              }}
            >
              {audioSpeed}x
            </button>
          </div>

          {cfg.videoMins ? (
            <>
              <div
                className={`relative mb-1.5 flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-card`}
                onClick={() => setVideoPlaying((p) => !p)}
                style={{ background: `linear-gradient(135deg, var(--${s.color}-soft), var(--paper-dim))` }}
              >
                <span className="absolute right-2.5 top-2.5 rounded-lg bg-[rgba(20,23,43,0.65)] px-2 py-[3px] font-mono text-[10.5px] font-semibold text-white">{cfg.videoMins.replace(" min", "")}:00</span>
                <span className="absolute bottom-2.5 left-2.5 rounded bg-[rgba(20,23,43,0.65)] px-1.5 py-0.5 text-[10px] font-bold text-white">CC</span>
                <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition-transform duration-150 hover:scale-105 ${videoPlaying ? "!bg-white/50" : ""}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#18181B">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="mb-4 h-[5px] overflow-hidden rounded bg-ash-line">
                <div className="h-full w-0 rounded bg-coral transition-[width] duration-[3000ms]" style={{ width: videoPlaying ? "58%" : "0%" }}></div>
              </div>
            </>
          ) : null}

          {cfg.sections.map((sec, i) => (
            <div key={i}>
              {sec.heading ? <div className="mt-1 mb-2 font-display text-[16.5px] font-semibold">{sec.heading}</div> : null}
              <p className="mb-3.5 text-[14.5px] leading-[1.7] text-ink-soft">{sec.text}</p>
              {i === 0 && cfg.showTermGrid ? (
                <div className="mb-4 grid grid-cols-2 gap-2">
                  {s.flashcards.slice(0, 2).map((c, ci) => (
                    <div key={ci} className="rounded-tile border border-violet bg-violet-soft px-3 py-2.5">
                      <div className="text-input mb-0.5 font-bold">{c.front}</div>
                      <div className="text-[11px] leading-[1.4] text-ink-soft">{c.back}</div>
                    </div>
                  ))}
                </div>
              ) : null}
              {i === 0 ? (
                <div
                  className="mb-4 flex items-center justify-center rounded-btn bg-paper-dim p-4"
                  dangerouslySetInnerHTML={{ __html: diagrams[cfg.subjectId] || `<div style="font-size:40px;">${s.icon}</div>` }}
                />
              ) : null}
              {i === 1 && cfg.quickCheck ? (
                <div className="mb-4 rounded-btn border-1_5 border-ember bg-ember-soft p-3.5">
                  <div className="mb-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.04em] text-ink">Quick check</div>
                  <div className="text-sub mb-2.5 font-semibold">{cfg.quickCheck.text}</div>
                  <div>
                    {cfg.quickCheck.options.map((opt, oi) => {
                      const isCorrect = answerIdx !== null && oi === cfg.quickCheck!.correct;
                      const isWrong = answerIdx === oi && oi !== cfg.quickCheck!.correct;
                      return (
                        <div
                          key={oi}
                          className={`mb-1.5 cursor-pointer rounded-input border-1_5 px-[11px] py-[9px] text-[13px] font-semibold ${
                            isCorrect
                              ? "border-ink bg-ink text-white"
                              : isWrong
                                ? "border-ash-line bg-paper-dim text-ash line-through"
                                : "border-ash-line bg-surface"
                          }`}
                          onClick={() => answerIdx === null && setAnswerIdx(oi)}
                        >
                          {opt}
                        </div>
                      );
                    })}
                  </div>
                  {answerIdx !== null && (
                    <div className="mt-1.5 text-[12.5px] leading-[1.5] text-ink-soft">{cfg.quickCheck.explain}</div>
                  )}
                </div>
              ) : null}
            </div>
          ))}

          {cfg.takeaway ? (
            <div className="mb-4 flex items-start gap-2.5 rounded-btn bg-ink px-4 py-3.5 text-paper">
              <span className="shrink-0 text-lg">💡</span>
              <div>
                <div className="mb-[3px] font-mono text-[10px] uppercase tracking-[0.05em] text-ember-soft">Key takeaway</div>
                <div className="text-[13px] leading-[1.55]">{cfg.takeaway}</div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="grounding">
          <ThreadMark />
          <span className="chip">{cfg.ref}</span>
        </div>

        <span className="eyebrow mt-4">Still stuck? Ask Sabi AI right here</span>
        <div className="usage-chip">
          <span className="uc-label">3 free Sabi AI questions left today</span>
          <span className="uc-link">Upgrade</span>
        </div>
        <div className="chat-scroll mb-3">
          {chat.map((m, i) =>
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
            placeholder="Ask about this, without leaving the page…"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button className="send-btn" onClick={sendMessage}>
            <SendIcon size={16} />
          </button>
        </div>
        <br />
        <button
          className="modal-done-btn"
          onClick={() => {
            onDone();
            onClose();
          }}
        >
          {cfg.doneMessage}
        </button>
      </div>
    </div>
  );
}