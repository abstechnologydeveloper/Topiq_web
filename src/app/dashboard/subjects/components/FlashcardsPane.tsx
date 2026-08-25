"use client";

import { useState } from "react";
import { EYEBROW, CARD } from "./constants";

type Card = { front: string; back: string };

const FLASH_ARROW =
  "flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center rounded-full border-1_5 border-ash-line bg-surface text-ink transition-colors duration-150 hover:bg-paper-dim disabled:opacity-35 disabled:cursor-default";
const FLASH_FACE =
  "absolute inset-0 flex items-center justify-center rounded-card p-6 text-center text-base font-semibold [backface-visibility:hidden]";

export default function FlashcardsPane({ cards }: { cards: Card[] }) {
  const [flashIndex, setFlashIndex] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [flashReview, setFlashReview] = useState(false);
  const [flashAgainQueue, setFlashAgainQueue] = useState<Card[]>([]);
  const [flashDone, setFlashDone] = useState(false);

  const flashLen = cards.length;
  const flashPrevDisabled = flashIndex === 0;
  const flashNextDisabled = flashIndex === flashLen - 1;

  const updateFlashcard = (index: number) => {
    setFlashFlipped(false);
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

  const flashProgressText = flashReview
    ? 'Reviewing cards marked "Again"'
    : `Card ${flashIndex + 1} of ${flashLen} · tap card to flip · arrows to skip`;

  if (flashDone) {
    return (
      <div className="block animate-[fade_.2s_ease]">
        <div className={`${CARD} p-6 text-center`}>
          <div className={EYEBROW} style={{ justifyContent: "center" }}>
            Deck reviewed
          </div>
          <p className="mb-3 text-body text-ash">
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
            className="cursor-pointer rounded-[20px] border-none bg-ink px-5 py-2.5 text-meta font-bold text-paper"
          >
            Review again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="block animate-[fade_.2s_ease]">
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
            className="h-[190px] flex-1 cursor-pointer [perspective:1000px]"
            onClick={flipFlash}
          >
            <div
              className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${flashFlipped ? "[transform:rotateY(180deg)]" : ""}`}
            >
              <div className={`${FLASH_FACE} border-1_5 border-violet bg-violet-soft text-ink`}>
                {cards[flashIndex] ? cards[flashIndex].front : ""}
              </div>
              <div
                className={`${FLASH_FACE} bg-ink text-input font-medium leading-[1.5] text-paper [transform:rotateY(180deg)]`}
              >
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
        <div className="mb-3.5 mt-2.5 text-center font-mono text-xs text-ash">
          {flashProgressText}
        </div>
        <div className="mx-auto flex w-full max-w-[420px] gap-2">
          <button
            className="flex-1 cursor-pointer rounded-tile border-1_5 border-ash-line bg-surface px-1 py-2.5 text-xs font-bold text-coral"
            onClick={() => rateFlash("again")}
          >
            Again
          </button>
          <button
            className="flex-1 cursor-pointer rounded-tile border-1_5 border-ash-line bg-surface px-1 py-2.5 text-xs font-bold text-ember"
            onClick={() => rateFlash("good")}
          >
            Good
          </button>
          <button
            className="flex-1 cursor-pointer rounded-tile border-1_5 border-ash-line bg-surface px-1 py-2.5 text-xs font-bold text-thread"
            onClick={() => rateFlash("easy")}
          >
            Easy
          </button>
        </div>
      </div>
    </div>
  );
}