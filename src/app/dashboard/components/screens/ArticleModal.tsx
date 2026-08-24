"use client";

import { useEffect, useRef, useState } from "react";
import { BackChevron, MicIcon, SendIcon, SpeakButtonSVG, ThreadMark } from "./shared";
import type { SubjectData } from "./DiscoverScreen";

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
    <div className="sheet-overlay show" id="tutModal">
      <div className="sheet-header">
        <div className="sheet-header-row">
          <button className="sheet-back" onClick={onClose}>
            <BackChevron />
          </button>
          <div className="sheet-header-titles">
            <span className="article-eyebrow" style={{ marginBottom: 2 }} dangerouslySetInnerHTML={{ __html: cfg.eyebrow }} />
            <h2>{cfg.title}</h2>
          </div>
        </div>
      </div>
      <div className="reading-progress-track">
        <div className="reading-progress-fill" style={{ width: `${readingPct}%` }}></div>
      </div>
      <div className="sheet-scroll" ref={scrollRef} onScroll={onScroll}>
        <div>
          <div className="audio-player">
            <button
              className={`audio-play-btn${audioPlaying ? " playing" : ""}`}
              onClick={() => setAudioPlaying((p) => !p)}
            >
              <svg style={{ display: audioPlaying ? "none" : "block" }} width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="audio-bars" style={{ display: audioPlaying ? "inline-flex" : "none" }}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <div className="audio-body">
              <div className="audio-label">🎧 Listen to this lesson</div>
              <div className="audio-scrub">
                <div className="audio-scrub-fill" style={{ width: `${(audioElapsed / audioDuration) * 100}%` }}></div>
              </div>
              <span className="audio-time">
                {fmtTime(audioElapsed)} / {fmtTime(audioDuration)}
              </span>
            </div>
            <button
              className="audio-speed-btn"
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
                className={`video-mock${videoPlaying ? " playing" : ""}`}
                onClick={() => setVideoPlaying((p) => !p)}
                style={{ background: `linear-gradient(135deg, var(--${s.color}-soft), var(--paper-dim))` }}
              >
                <span className="video-duration">{cfg.videoMins.replace(" min", "")}:00</span>
                <span className="video-cc">CC</span>
                <div className="video-play">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#18181B">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="video-track">
                <div className="video-track-fill" style={{ width: videoPlaying ? "58%" : "0%" }}></div>
              </div>
            </>
          ) : null}

          {cfg.sections.map((sec, i) => (
            <div key={i}>
              {sec.heading ? <div className="article-h3">{sec.heading}</div> : null}
              <p className="simple-para">{sec.text}</p>
              {i === 0 && cfg.showTermGrid ? (
                <div className="term-grid">
                  {s.flashcards.slice(0, 2).map((c, ci) => (
                    <div key={ci} className="term-card">
                      <div className="tname">{c.front}</div>
                      <div className="tdef">{c.back}</div>
                    </div>
                  ))}
                </div>
              ) : null}
              {i === 0 ? (
                <div
                  className="diagram-box"
                  dangerouslySetInnerHTML={{ __html: diagrams[cfg.subjectId] || `<div style="font-size:40px;">${s.icon}</div>` }}
                />
              ) : null}
              {i === 1 && cfg.quickCheck ? (
                <div className="quickcheck-box">
                  <div className="qc-label">Quick check</div>
                  <div className="qc-text">{cfg.quickCheck.text}</div>
                  <div>
                    {cfg.quickCheck.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`qc-option${answerIdx !== null ? (oi === cfg.quickCheck!.correct ? " correct" : oi === answerIdx ? " wrong" : "") : ""}`}
                        onClick={() => answerIdx === null && setAnswerIdx(oi)}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                  <div className={`qc-feedback${answerIdx !== null ? " show" : ""}`}>{cfg.quickCheck.explain}</div>
                </div>
              ) : null}
            </div>
          ))}

          {cfg.takeaway ? (
            <div className="takeaway-box">
              <span className="ta-icon">💡</span>
              <div>
                <div className="ta-label">Key takeaway</div>
                <div className="ta-text">{cfg.takeaway}</div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="grounding">
          <ThreadMark />
          <span className="chip">{cfg.ref}</span>
        </div>

        <span className="eyebrow" style={{ marginTop: 16 }}>
          Still stuck? Ask Sabi AI right here
        </span>
        <div className="usage-chip">
          <span className="uc-label">3 free Sabi AI questions left today</span>
          <span className="uc-link">Upgrade</span>
        </div>
        <div className="chat-scroll" style={{ marginBottom: 12 }}>
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