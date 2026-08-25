"use client";

import { useEffect, useRef, useState } from "react";
import { BackChevron, ThreadMark } from "../../components/screens/shared";
import type { SubjectData } from "../../components/screens/DiscoverScreen";
import AudioPlayer from "./AudioPlayer";
import VideoMock from "./VideoMock";
import QuickCheck from "./QuickCheck";
import SabiChatBlock, { type ChatBubble } from "./SabiChatBlock";
import GroundedReply from "./GroundedReply";
import { ARTICLE_EYEBROW, CHIP, DIAGRAM_BOX, EYEBROW, GROUNDING, TAKEAWAY_BOX, TERM_CARD } from "./constants";

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

type Props = {
  cfg: ArticleCfg;
  subjects: Record<string, SubjectData>;
  diagrams: Record<string, string>;
  onClose: () => void;
  onDone: () => void;
};

export default function ArticleModal({ cfg, subjects, diagrams, onClose, onDone }: Props) {
  const s = subjects[cfg.subjectId];

  const wordCount = cfg.sections.reduce((n, sec) => n + (sec.text ? sec.text.split(" ").length : 0), 0);
  const audioDuration = Math.max(90, Math.round((wordCount / 130) * 60));

  const [readingPct, setReadingPct] = useState(0);
  const [chat, setChat] = useState<ChatBubble[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReadingPct(0);
    setChat([]);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [cfg]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setReadingPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
  };

  const sendMessage = (text: string) => {
    setChat((prev) => [...prev, { role: "user", text }]);
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          node: (
            <GroundedReply
              intro={`Here's the grounded explanation for that, tied to your ${s.name} syllabus rather than a generic web answer.`}
              chipLabel={`${s.name} — ${cfg.title}`}
            />
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
            <span className={ARTICLE_EYEBROW} dangerouslySetInnerHTML={{ __html: cfg.eyebrow }} />
            <h2 className="font-display m-0 text-lg font-semibold leading-[1.25]">{cfg.title}</h2>
          </div>
        </div>
      </div>
      <div className="h-[3px] bg-ash-line">
        <div className="h-full bg-thread" style={{ width: `${readingPct}%` }}></div>
      </div>
      <div className="mx-auto w-full max-w-[640px] flex-1 overflow-y-auto px-5 pb-10 pt-4" ref={scrollRef} onScroll={onScroll}>
        <AudioPlayer duration={audioDuration} />

        {cfg.videoMins ? (
          <VideoMock gradientBg={`linear-gradient(135deg, var(--${s.color}-soft), var(--paper-dim))`} durationLabel={`${cfg.videoMins.replace(" min", "")}:00`} />
        ) : null}

        {cfg.sections.map((sec, i) => (
          <div key={i}>
            {sec.heading ? <div className="font-display mt-1 mb-2 text-[16.5px] font-semibold">{sec.heading}</div> : null}
            <p className="mb-3.5 text-[14.5px] leading-[1.7] text-ink-soft">{sec.text}</p>
            {i === 0 && cfg.showTermGrid ? (
              <div className="mb-4 grid grid-cols-2 gap-2">
                {s.flashcards.slice(0, 2).map((c, ci) => (
                  <div key={ci} className={TERM_CARD}>
                    <div className="text-input mb-0.5 font-bold">{c.front}</div>
                    <div className="text-[11px] leading-[1.4] text-ink-soft">{c.back}</div>
                  </div>
                ))}
              </div>
            ) : null}
            {i === 0 ? (
              <div
                className={DIAGRAM_BOX}
                dangerouslySetInnerHTML={{ __html: diagrams[cfg.subjectId] || `<div style="font-size:40px;">${s.icon}</div>` }}
              />
            ) : null}
            {i === 1 && cfg.quickCheck ? <QuickCheck data={cfg.quickCheck} /> : null}
          </div>
        ))}

        {cfg.takeaway ? (
          <div className={TAKEAWAY_BOX}>
            <span className="shrink-0 text-lg">💡</span>
            <div>
              <div className="font-mono mb-[3px] text-[10px] uppercase tracking-[0.05em] text-ember-soft">Key takeaway</div>
              <div className="text-[13px] leading-[1.55]">{cfg.takeaway}</div>
            </div>
          </div>
        ) : null}

        <div className={GROUNDING}>
          <ThreadMark />
          <span className={CHIP}>{cfg.ref}</span>
        </div>

        <span className={EYEBROW} style={{ marginTop: 16 }}>Still stuck? Ask Sabi AI right here</span>
        <SabiChatBlock messages={chat} onSend={sendMessage} placeholder="Ask about this, without leaving the page…" />
        <br />
        <button
          className="mt-2 cursor-pointer rounded-[22px] border-none bg-thread px-5 py-[11px] text-body font-bold text-white disabled:bg-ash-line disabled:text-ash disabled:opacity-45 disabled:cursor-not-allowed"
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