"use client";

import { useMemo, useState } from "react";
import { SUBJECT_DIAGRAMS } from "../../data/subjects";
import { BackChevron } from "../../components/screens/shared";
import type { SubjectData } from "../../components/screens/DiscoverScreen";
import ArticleModal, { type ArticleCfg } from "./ArticleModal";
import OverviewPane from "./OverviewPane";
import LearnPane from "./LearnPane";
import FlashcardsPane from "./FlashcardsPane";
import { BACK_ROW, MODE_BADGE, PAGE_TITLE, SEARCH_BAR, SEARCH_ICON, SEARCH_INPUT, SUBNAV, SUBNAV_BTN } from "./constants";

type Props = {
  subjectId: string;
  subjects: Record<string, SubjectData>;
  student: { grade: string };
  goTab: (tab: string) => void;
  onDone: (subjectId: string) => void;
  initialPane?: "overview" | "learn" | "flash";
};

export default function SubjectHub({ subjectId, subjects, student, goTab, onDone, initialPane = "overview" }: Props) {
  const s = subjects[subjectId];

  const [pane, setPane] = useState<"overview" | "learn" | "flash">("overview");
  const [topicQuery, setTopicQuery] = useState("");
  const [article, setArticle] = useState<ArticleCfg | null>(null);

  const recTitle = useMemo(
    () => s.topics.find((t) => t.pct < 100 && t.pct > 0)?.t || s.topics[0].t,
    [s],
  );
  const recIdx = useMemo(() => {
    const i = s.topics.findIndex((t) => t.pct < 100 && t.pct > 0);
    return i >= 0 ? i : 0;
  }, [s]);

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

  return (
    <>
      <section className="block animate-[fade_.25s_ease] p-0">
        <div className="mb-3.5 flex items-center justify-between">
          <div className={BACK_ROW} onClick={() => goTab("subjects")}>
            <BackChevron />
            Subjects
          </div>
          <span className={MODE_BADGE}>{student.grade}</span>
        </div>
        <h1 className={PAGE_TITLE}>
          {s.icon} {s.name}
        </h1>

        <div className={SEARCH_BAR}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={SEARCH_ICON}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search a topic in this subject…"
            value={topicQuery}
            onChange={(e) => setTopicQuery(e.target.value)}
            className={SEARCH_INPUT}
          />
        </div>

        <div className={SUBNAV}>
          {(["overview", "learn", "flash"] as const).map((name) => (
            <button
              key={name}
              className={`${SUBNAV_BTN} ${pane === name ? "text-ink [border-bottom:2px_solid_var(--thread)]" : "text-ash [border-bottom:2px_solid_transparent]"}`}
              onClick={() => setPane(name)}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>

        {pane === "overview" && (
          <OverviewPane
            subject={s}
            recTitle={recTitle}
            recIdx={recIdx}
            filteredTopics={filteredTopics}
            onOpenTopic={openTopicArticle}
          />
        )}

        {pane === "learn" && <LearnPane subject={s} onOpenTutorial={openTutorial} />}

        {pane === "flash" && <FlashcardsPane key={subjectId} cards={s.flashcards} />}
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