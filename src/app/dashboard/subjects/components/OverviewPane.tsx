"use client";

import type { SubjectData } from "../../components/screens/DiscoverScreen";
import TopicRow from "./TopicRow";
import { RECOMMEND_CARD, REC_LBL, REC_TTL, REC_BTN } from "./constants";

export default function OverviewPane({
  subject,
  recTitle,
  recIdx,
  filteredTopics,
  onOpenTopic,
}: {
  subject: SubjectData;
  recTitle: string;
  recIdx: number;
  filteredTopics: { t: SubjectData["topics"][number]; i: number }[];
  onOpenTopic: (i: number) => void;
}) {
  return (
    <div className="block animate-[fade_.2s_ease]">
      <div className={RECOMMEND_CARD}>
        <div>
          <div className={REC_LBL}>Recommended next</div>
          <div className={REC_TTL}>{recTitle}</div>
        </div>
        <button className={REC_BTN} onClick={() => onOpenTopic(recIdx)}>Start</button>
      </div>
      <div className="rounded-[18px] border border-ash-line bg-surface px-4 py-1">
        {filteredTopics.length ? (
          filteredTopics.map(({ t, i }) => <TopicRow key={i} topic={t} onOpen={() => onOpenTopic(i)} />)
        ) : (
          <p className="px-1 py-3.5 text-[13px] text-ash">No topics match that search.</p>
        )}
      </div>
    </div>
  );
}