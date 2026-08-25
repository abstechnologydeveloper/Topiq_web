"use client";

import { useEffect, useMemo, useState } from "react";
import { ThreadMark } from "../../components/screens/shared";
import type { SubjectData } from "../../components/screens/DiscoverScreen";
import SabiChatBlock, { type ChatBubble } from "./SabiChatBlock";
import GroundedReply from "./GroundedReply";
import { EYEBROW, CHIP, GROUNDING } from "./constants";

const TUT_CARD =
  "mb-2.5 flex cursor-pointer gap-[13px] rounded-btn border border-ash-line bg-surface p-3 transition-[border-color,transform] duration-150 hover:border-thread hover:-translate-y-px";

export default function LearnPane({
  subject,
  onOpenTutorial,
}: {
  subject: SubjectData;
  onOpenTutorial: (i: number) => void;
}) {
  const s = subject;
  const [hubChat, setHubChat] = useState<ChatBubble[]>([]);

  const initHubChat = useMemo(
    () => [
      { role: "user" as const, text: `Can you explain ${s.topics[0].t.toLowerCase()} simply?` },
      {
        role: "ai" as const,
        node: (
          <GroundedReply
            intro={`Here's the grounded explanation, tied directly to your ${s.name} syllabus.`}
            chipLabel={`${s.name} — ${s.topics[0].t}`}
          />
        ),
      },
    ],
    [s],
  );

  useEffect(() => {
    setHubChat(initHubChat);
  }, [initHubChat]);

  const sendMessage = (text: string) => {
    setHubChat((prev) => [...prev, { role: "user", text }]);
    setTimeout(() => {
      setHubChat((prev) => [
        ...prev,
        {
          role: "ai",
          node: (
            <GroundedReply
              intro={`Here's the grounded explanation for that, tied to your ${s.name} syllabus rather than a generic web answer.`}
              chipLabel={`${s.name} — ${s.topics[0].t}`}
            />
          ),
        },
      ]);
    }, 900);
  };

  return (
    <div className="block animate-[fade_.2s_ease]">
      <span className={EYEBROW}>Watch, read &amp; understand</span>
      <div>
        {s.tutorials.map((t, i) => (
          <div key={i} className={TUT_CARD} onClick={() => onOpenTutorial(i)}>
            <div
              className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-tile text-2xl"
              style={{ background: `var(--${s.color}-soft)` }}
            >
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
                <span className="mr-[5px] inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-paper-dim text-[9.5px] font-bold">
                  {i + 1}
                </span>
                {t.title}
              </div>
              <div className="mb-1.5 flex items-center gap-2 text-[11.5px] text-ash">
                <span className="font-mono font-semibold">{t.format === "Video" ? "▶ Watch" : "📖 Read"}</span>
                <span>{t.mins}</span>
              </div>
              <div className={GROUNDING}>
                <ThreadMark />
                <span className={CHIP}>{t.ref || `${s.name}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <span className={`${EYEBROW} mt-1.5`}>Still stuck? Ask Sabi AI right here</span>
      <SabiChatBlock
        messages={hubChat}
        onSend={sendMessage}
        placeholder="Ask about this subject…"
      />
    </div>
  );
}