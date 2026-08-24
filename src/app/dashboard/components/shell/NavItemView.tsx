"use client";

import type { NavItem } from "../navConfig";
import {
  AVATAR_CIRCLE,
  DRAWER_LINK,
  DRAWER_LINK_ACTIVE,
  LIVE_BADGE_DRAWER,
  LIVE_BADGE_RAIL,
  LINK_BG,
  RAIL_LINK,
  RAIL_LINK_ACTIVE,
  RL_COUNT,
  RL_COUNT_ACTIVE,
  TAB,
  TAB_ACTIVE,
} from "./shellClasses";

const UPGRADE_CLS =
  " bg-thread text-white font-extrabold mt-1 [&_svg]:stroke-white [&_svg]:fill-white hover:bg-thread hover:text-white hover:opacity-90";

export function NavItemView({
  item,
  surface,
  index,
  active,
  liveSession,
  challengeCount,
  pendingAssign,
  avatarUrl,
  firstName,
  onSelect,
}: {
  item: NavItem;
  surface: "rail" | "drawer" | "tab";
  index: number;
  active: boolean;
  liveSession: boolean;
  challengeCount: number;
  pendingAssign: number;
  avatarUrl?: string | null;
  firstName?: string;
  onSelect: (tab: string) => void;
}) {
  const linkClass = () => {
    if (item.kind !== "link") return "";
    if (surface === "rail") {
      let cls = RAIL_LINK;
      if (!item.upgrade) cls += " " + LINK_BG;
      if (item.upgrade) cls += UPGRADE_CLS;
      else if (active) cls += " " + RAIL_LINK_ACTIVE;
      return cls;
    }
    if (surface === "drawer") {
      let cls = DRAWER_LINK;
      if (!item.upgrade) cls += " " + LINK_BG;
      if (item.upgrade) cls += UPGRADE_CLS;
      else if (active) cls += " " + DRAWER_LINK_ACTIVE;
      return cls;
    }
    return active ? `${TAB} ${TAB_ACTIVE}` : TAB;
  };

  if (item.kind === "divider") {
    return (
      <div
        className={`h-px bg-ash-line my-2.5 ${surface === "rail" ? "mx-1.5" : "mx-1"} ${item.gap ? "mt-auto mb-2.5" : ""}`}
      />
    );
  }

  if (item.kind === "account") {
    const avatarId = surface === "rail" ? "railAvatarCircle" : "drawerAvatarCircle";
    const nameId = surface === "rail" ? "railAvatarName" : "drawerAvatarName";
    const rowCls =
      surface === "rail"
        ? "flex items-center gap-2.5 rounded-xl px-2.5 py-2 cursor-pointer hover:bg-paper-dim"
        : "flex items-center gap-2.5 rounded-xl px-2.5 py-[9px] cursor-pointer hover:bg-paper-dim";
    const nameCls =
      surface === "rail"
        ? "text-[13px] font-bold whitespace-nowrap overflow-hidden text-ellipsis"
        : "text-sub font-bold whitespace-nowrap overflow-hidden text-ellipsis";
    const roleCls = surface === "rail" ? "text-[10.5px] text-ash" : "text-[11px] text-ash";
    return (
      <div
        className={`${rowCls} ${active ? "bg-thread-soft" : ""}`}
        data-tab={item.tab}
        onClick={() => onSelect(item.tab)}
      >
        <div className={AVATAR_CIRCLE} id={avatarId}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile picture" className="h-full w-full object-cover" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6z" />
            </svg>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className={`${nameCls} ${active ? "text-thread" : ""}`} id={nameId}>{firstName || "Profile"}</div>
          <div className={roleCls}>{item.role}</div>
        </div>
      </div>
    );
  }

  const countCls = `${RL_COUNT} ${active && surface !== "tab" ? RL_COUNT_ACTIVE : ""}`;
  return (
    <button
      data-tab={item.tab}
      className={linkClass()}
      onClick={() => onSelect(item.tab)}
    >
{item.icon}
      {item.label}
      {surface !== "tab" && item.tab === "challenges" && challengeCount > 0 ? (
        <span className={countCls} id={`${surface}ChallengeCount`}>
          {challengeCount}
        </span>
      ) : null}
      {surface !== "tab" && item.tab === "studentassign" && pendingAssign > 0 ? (
        <span
          className={countCls}
          id={surface === "drawer" ? "drawerAssignCount" : "railAssignCount"}
        >
          {pendingAssign}
        </span>
      ) : null}
      {surface !== "tab" && item.count ? (
        <span className={countCls}>{item.count}</span>
      ) : null}
      {item.tab === "livesession" && liveSession ? (
        <span
          className={surface === "drawer" ? LIVE_BADGE_DRAWER : LIVE_BADGE_RAIL}
          title="A live class is happening now"
        />
      ) : null}
    </button>
  );
}