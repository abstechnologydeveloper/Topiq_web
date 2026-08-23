"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NAV, type NavItem } from "./navConfig";
import { useDashboard } from "./DashboardContext";
import { ASSIGNMENTS } from "../data";
import StartLiveModal from "./screens/StartLiveModal";
import AssignmentQuickAddModal from "./screens/AssignmentQuickAddModal";
import TeacherClassQuickAddModal from "./screens/TeacherClassQuickAddModal";
import {
  AVATAR_CIRCLE,
  DRAWER_LINK,
  DRAWER_LINK_ACTIVE,
  LIVE_BADGE_DRAWER,
  LIVE_BADGE_RAIL,
  RAIL_LINK,
  RAIL_LINK_ACTIVE,
  RL_COUNT,
  RL_COUNT_ACTIVE,
  TAB,
  TAB_ACTIVE,
} from "./shell/shellClasses";
import { Checkmark } from "./shell/ShellIcons";
import Topbar from "./shell/Topbar";
import RailNav from "./shell/RailNav";
import Tabbar from "./shell/Tabbar";
import Drawer from "./shell/Drawer";
import AccountSwitchModal, { type LinkedAccountMode } from "./shell/AccountSwitchModal";
import Toast from "./shell/Toast";

const UPGRADE_CLS =
  " bg-thread text-white font-extrabold mt-1 [&_svg]:stroke-white [&_svg]:fill-white hover:bg-thread hover:text-white hover:opacity-90";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [accountSwitchOpen, setAccountSwitchOpen] = useState(false);
  const {
    subjects,
    certSubject,
    setCertSubject,
    toast,
    drawerOpen,
    openDrawer,
    closeDrawer,
    goTab,
    activeChallenges,
    profile,
    appMode,
    setAppMode,
    logout,
    dark,
    liveSession,
    assignDone,
  } = useDashboard();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const pendingAssign = ASSIGNMENTS.filter((a) => !assignDone[a.id]).length;

  const openAccountSwitch = () => {
    closeDrawer();
    setAccountSwitchOpen(true);
  };
  const closeAccountSwitch = () => setAccountSwitchOpen(false);

  const switchAccount = (mode: LinkedAccountMode) => {
    closeAccountSwitch();
    if (mode === appMode) return;
    setAppMode(mode);
    const home = mode === "teacher" ? "teacherdash" : mode === "school" ? "schooladmin" : "discover";
    goTab(home);
  };

  const addAnotherAccount = () => {
    closeAccountSwitch();
    logout();
  };

  const nav = NAV[appMode];
  const showTopbar = pathname === "/dashboard";

  const isActive = (item: NavItem) => {
    if (item.kind !== "link") return false;
    const p = item.path;
    return pathname === p || (p !== "/dashboard" && pathname.startsWith(p));
  };

  const detailActive = (item: NavItem) => {
    if (item.kind !== "account") return false;
    const p = pathname?.split("?")[0] || "";
    return p === "/dashboard/profile";
  };

  const linkClass = (item: NavItem, surface: "rail" | "drawer" | "tab") => {
    if (item.kind !== "link") return "";
    const active = isActive(item);
    if (surface === "rail") {
      let cls = RAIL_LINK;
      if (item.upgrade) cls += UPGRADE_CLS;
      else if (active) cls += " " + RAIL_LINK_ACTIVE;
      return cls;
    }
    if (surface === "drawer") {
      let cls = DRAWER_LINK;
      if (item.upgrade) cls += UPGRADE_CLS;
      else if (active) cls += " " + DRAWER_LINK_ACTIVE;
      return cls;
    }
    return active ? `${TAB} ${TAB_ACTIVE}` : TAB;
  };

  const renderNavItem = (item: NavItem, surface: "rail" | "drawer" | "tab", index: number) => {
    if (item.kind === "divider") {
      return (
        <div
          key={index}
          className={`h-px bg-ash-line my-2.5 ${surface === "rail" ? "mx-1.5" : "mx-1"} ${item.gap ? "mt-auto mb-2.5" : ""}`}
        />
      );
    }
    if (item.kind === "account") {
      const active = detailActive(item);
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
          key={index}
          className={`${rowCls} ${active ? "bg-thread-soft" : ""}`}
          data-tab={item.tab}
          onClick={() => goTab(item.tab)}
        >
          <div className={AVATAR_CIRCLE} id={avatarId}>
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile picture" className="h-full w-full object-cover" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6z" />
              </svg>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className={`${nameCls} ${active ? "text-thread" : ""}`} id={nameId}>{profile.firstName || "Profile"}</div>
            <div className={roleCls}>{item.role}</div>
          </div>
        </div>
      );
    }
    const countCls = `${RL_COUNT} ${isActive(item) && surface !== "tab" ? RL_COUNT_ACTIVE : ""}`;
    return (
      <button
        key={index}
        data-tab={item.tab}
        className={linkClass(item, surface)}
        onClick={() => goTab(item.tab)}
      >
{item.icon}
        {item.label}
        {surface !== "tab" && item.tab === "challenges" && activeChallenges.length > 0 ? (
          <span className={countCls} id={`${surface}ChallengeCount`}>
            {activeChallenges.length}
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
  };

  return (
    <div className="flex w-full min-h-screen flex-col bg-paper nav:h-screen nav:max-h-screen nav:min-h-0 nav:overflow-hidden">
      {/* ---------- Top bar (mobile) ---------- */}
      {showTopbar && (
        <Topbar onMenu={openDrawer} onSwitchAccount={openAccountSwitch} onStreak={() => goTab("progress")} />
      )}

      {/* ---------- Body: rail + main ---------- */}
      <div className="flex min-h-0 flex-1">
        <RailNav
          items={nav.rail}
          renderItem={(item, surface, index) => renderNavItem(item, surface, index)}
          appMode={appMode}
          onSwitchAccount={openAccountSwitch}
          onLogout={logout}
        />

        <main className="min-w-0 flex-1 overflow-y-auto p-5 pb-24 nav:px-10 nav:pt-4 nav:pb-6">{children}</main>
      </div>

      {/* ---------- Tab bar (mobile) ---------- */}
      <Tabbar items={nav.tabs} renderItem={(item, surface, index) => renderNavItem(item, surface, index)} />

      {/* ---------- Mobile drawer ---------- */}
      {drawerOpen && (
        <Drawer
          items={nav.drawer}
          renderItem={(item, surface, index) => renderNavItem(item, surface, index)}
          appMode={appMode}
          onClose={closeDrawer}
          onSwitchAccount={openAccountSwitch}
          onLogout={logout}
        />
      )}

      {toast && <Toast toast={toast} />}

      {accountSwitchOpen && (
        <AccountSwitchModal
          appMode={appMode}
          onClose={closeAccountSwitch}
          onSwitch={switchAccount}
          onAddAnother={addAnotherAccount}
        />
      )}

      {certSubject && subjects[certSubject] ? (
        <div
          className="fixed inset-0 z-[100] flex animate-[fade_.2s_ease] items-end justify-center bg-[rgba(20,23,43,0.55)]"
          id="certModal"
        >
          <div className="m-auto max-h-[82vh] w-full max-w-[520px] overflow-y-auto rounded-t-[20px] bg-paper px-5 pt-[22px] pb-7">
            <button
              className="float-right h-[30px] w-[30px] cursor-pointer rounded-full border-none bg-paper-dim text-sm"
              onClick={() => setCertSubject(null)}
            >
              ✕
            </button>
            <div className="rounded-card border-2 border-thread bg-[linear-gradient(160deg,var(--thread-soft),var(--surface))] px-5 py-[30px] text-center">
              <div className="mb-2 text-[34px]">🎓</div>
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-thread">Certificate of Completion</div>
              <div className="mt-2.5 text-[19px] font-extrabold text-ink">
                {profile.firstName || "Student"} {profile.lastName || ""}
              </div>
              <div className="mt-1 text-[12.5px] text-ash">has completed every topic in</div>
              <div className="mt-1.5 text-base font-bold text-thread">
                {subjects[certSubject].icon} {subjects[certSubject].name}
              </div>
              <div className="mt-4 font-mono text-[11px] text-ash">
                AbSTopiq · {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>
            <button
              className="mt-2 cursor-pointer rounded-[22px] border-none bg-thread px-5 py-[11px] text-[13px] font-bold text-white"
              onClick={() => setCertSubject(null)}
            >
              Done
            </button>
          </div>
        </div>
      ) : null}

      <StartLiveModal />

      <AssignmentQuickAddModal />

      <TeacherClassQuickAddModal />
    </div>
  );
}