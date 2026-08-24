"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import type { NavItem } from "../navConfig";
import { BRAND_MARK, BRAND_SWITCH_BTN, MODE_SWITCH_BTN } from "./shellClasses";
import { ChevronDown, CloseIcon } from "./ShellIcons";

export default function Drawer({
  items,
  renderItem,
  appMode,
  onClose,
  onSwitchAccount,
  onLogout,
}: {
  items: NavItem[];
  renderItem: (item: NavItem, surface: "drawer", index: number) => ReactNode;
  appMode: string;
  onClose: () => void;
  onSwitchAccount: () => void;
  onLogout: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] animate-[fade_.2s_ease] bg-[rgba(20,23,43,0.55)] nav:hidden!"
      id="drawerOverlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute bottom-0 left-0 top-0 flex w-[78%] max-w-[300px] flex-col bg-paper px-4 py-5 shadow-[8px_0_30px_rgba(0,0,0,0.25)]">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-[9px]">
            <Image
              className={BRAND_MARK}
              src="/logo.png"
              alt="AbSTopiq"
              width={34}
              height={34}
            />
            <button
              className={BRAND_SWITCH_BTN}
              title="Switch account"
              aria-label="Switch account"
              onClick={onSwitchAccount}
            >
              <ChevronDown />
            </button>
          </div>
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-paper-dim"
            onClick={onClose}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto">
          <div className="contents">
            {items.map((i, idx) => renderItem(i, "drawer", idx))}
          </div>
        </div>
        <button
          className={`${MODE_SWITCH_BTN} ${appMode === "student" ? "hidden" : "flex"}`}
          onClick={onLogout}
        >
          🚪 Log out
        </button>
      </div>
    </div>
  );
}