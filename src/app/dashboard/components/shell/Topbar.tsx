"use client";

import Image from "next/image";
import { BRAND_MARK, BRAND_NAME, BRAND_SWITCH_BTN } from "./shellClasses";
import { ChevronDown, Hamburger } from "./ShellIcons";

export default function Topbar({
  onMenu,
  onSwitchAccount,
  onStreak,
}: {
  onMenu: () => void;
  onSwitchAccount: () => void;
  onStreak: () => void;
}) {
  return (
    <div
      className="sticky top-0 z-20 flex items-center justify-between border-b border-ash-line bg-paper px-5 pt-[18px] pb-3.5 nav:hidden"
      id="appTopbar"
    >
      <div className="flex items-center gap-2.5">
        <button
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[9px] border-none bg-paper-dim text-ink"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <Hamburger />
        </button>
        <div className="flex items-center gap-[9px]">
          <Image
            className={BRAND_MARK}
            src="/logo.png"
            alt="AbSTopiq"
            width={34}
            height={34}
          />
          <div className={BRAND_NAME}>{""}</div>
          <button
            className={BRAND_SWITCH_BTN}
            title="Switch account"
            aria-label="Switch account"
            onClick={onSwitchAccount}
          >
            <ChevronDown />
          </button>
        </div>
      </div>
      <div
        className="flex cursor-pointer items-center gap-1.5 rounded-[20px] bg-ember-soft px-2.5 py-1.5 font-mono text-label font-semibold"
        onClick={onStreak}
      >
        🔥 12-day streak
      </div>
    </div>
  );
}