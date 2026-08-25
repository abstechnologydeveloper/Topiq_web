"use client";

import { useState, type ReactNode } from "react";
import { MicIcon, SendIcon } from "../../components/screens/shared";
import GroundedReply from "./GroundedReply";
import { BUBBLE, BUBBLE_USER, BUBBLE_AI, CHAT_SCROLL, COMPOSER, COMPOSER_INPUT, ICON_BTN, SEND_BTN, USAGE_CHIP, UC_LABEL, UC_LINK } from "./constants";

export type ChatBubble =
  | { role: "user"; text: string }
  | { role: "ai"; node: ReactNode };

export default function SabiChatBlock({
  messages,
  onSend,
  placeholder,
}: {
  messages: ChatBubble[];
  onSend: (text: string) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
  };

  return (
    <>
      <div className={USAGE_CHIP}>
        <span className={UC_LABEL}>3 free Sabi AI questions left today</span>
        <span className={UC_LINK}>Upgrade</span>
      </div>
      <div className={`${CHAT_SCROLL} mb-3`}>
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className={`${BUBBLE} ${BUBBLE_USER}`}>
              {m.text}
            </div>
          ) : (
            <div key={i} className={`${BUBBLE} ${BUBBLE_AI}`}>
              {m.node}
            </div>
          ),
        )}
      </div>
      <div className={COMPOSER}>
        <button className={ICON_BTN} title="Ask by voice">
          <MicIcon size={16} />
        </button>
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          className={COMPOSER_INPUT}
        />
        <button className={SEND_BTN} onClick={send}>
          <SendIcon size={16} />
        </button>
      </div>
    </>
  );
}

export { GroundedReply };