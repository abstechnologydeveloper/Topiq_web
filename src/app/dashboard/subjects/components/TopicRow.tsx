"use client";

type Topic = { t: string; pct: number; status: string };

import { TOPIC_ROW, TOPIC_DOT, TOPIC_TITLE, TOPIC_BAR_TRACK, TOPIC_BAR_FILL, TOPIC_PCT, FOCUS_RING } from "./constants";

export default function TopicRow({ topic, onOpen }: { topic: Topic; onOpen: () => void }) {
  return (
    <div
      className={`${TOPIC_ROW} ${FOCUS_RING}`}
      onClick={onOpen}
    >
      <div className={TOPIC_DOT} style={{ background: `var(--${topic.status})` }}></div>
      <div className={TOPIC_TITLE}>{topic.t}</div>
      <div className={TOPIC_BAR_TRACK}>
        <div
          className={TOPIC_BAR_FILL}
          style={{
            width: `${topic.pct}%`,
            background: `var(--${topic.status === "ash-line" ? "ash-line" : topic.status})`,
          }}
        ></div>
      </div>
      <div className={TOPIC_PCT}>{topic.pct}%</div>
    </div>
  );
}