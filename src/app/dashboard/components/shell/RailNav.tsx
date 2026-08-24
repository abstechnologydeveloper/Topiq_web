"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import type { NavItem } from "../navConfig";
import { BRAND_MARK, BRAND_NAME, BRAND_SWITCH_BTN, MODE_SWITCH_BTN } from "./shellClasses";
import { ChevronDown } from "./ShellIcons";

export default function RailNav({
  items,
  renderItem,
  appMode,
  onSwitchAccount,
  onLogout,
}: {
  items: NavItem[];
  renderItem: (item: NavItem, surface: "rail", index: number) => ReactNode;
  appMode: string;
  onSwitchAccount: () => void;
  onLogout: () => void;
}) {
  return (
    <nav className="hidden w-[232px] shrink-0 flex-col overflow-y-auto border-r border-ash-line bg-paper pt-[22px] px-4 pb-[18px] nav:flex">
      <div className="mb-[26px] flex items-center gap-2.5 px-1.5">
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
      <div className="flex flex-1 flex-col gap-0.5">
        <div className="contents">{items.map((i, idx) => renderItem(i, "rail", idx))}</div>
      </div>
      <button
        className={`${MODE_SWITCH_BTN} ${appMode === "student" ? "hidden" : "flex"}`}
        onClick={onLogout}
      >
        🚪 Log out
      </button>
    </nav>
  );
}