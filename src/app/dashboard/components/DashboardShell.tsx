"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV, type NavItem } from "./navConfig";
import { useDashboard } from "./DashboardContext";
import { ASSIGNMENTS } from "../data";
import StartLiveModal from "./screens/StartLiveModal";
import AssignmentQuickAddModal from "./screens/AssignmentQuickAddModal";
import TeacherClassQuickAddModal from "./screens/TeacherClassQuickAddModal";

const BRAND_MARK =
  "w-[34px] h-[34px] object-contain shrink-0 [html[data-theme=dark]_&]:rounded-[9px] [html[data-theme=dark]_&]:bg-white [html[data-theme=dark]_&]:p-0.5";
const BRAND_NAME = "font-display font-semibold text-[20px] tracking-[-0.01em]";
const BRAND_SWITCH_BTN =
  "flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-ash hover:bg-paper-dim hover:text-ink";

const AVATAR_CIRCLE =
  "flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-thread";

const RAIL_LINK =
  "relative flex w-full items-center gap-3 rounded-xl border-none bg-transparent px-3 py-2.5 text-left font-sans text-input font-semibold text-ash transition-colors duration-150 cursor-pointer hover:bg-paper-dim hover:text-ink [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0";
const RAIL_LINK_ACTIVE =
  "bg-thread-soft text-ink hover:bg-thread-soft [&_svg]:stroke-thread before:absolute before:-left-4 before:top-2 before:bottom-2 before:w-[3px] before:rounded-r-[3px] before:bg-thread before:content-['']";
const DRAWER_LINK =
  "relative flex w-full items-center gap-3 rounded-xl border-none bg-transparent px-3 py-[11px] text-left font-sans text-[14.5px] font-semibold text-ink cursor-pointer hover:bg-thread-soft [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0 [&_svg]:text-ash";
const DRAWER_LINK_ACTIVE = "bg-thread-soft [&_svg]:stroke-thread";
const TAB =
  "relative flex flex-1 flex-col items-center gap-1 rounded-[10px] border-none bg-transparent px-0.5 py-1.5 text-[11px] font-semibold text-ash cursor-pointer [&_svg]:h-[22px] [&_svg]:w-[22px]";
const TAB_ACTIVE = "text-ink [&_svg]:stroke-thread";

const RL_COUNT =
  "ml-auto shrink-0 rounded-lg bg-paper-dim px-[7px] py-0.5 font-mono text-[10px] font-bold text-ash";
const RL_COUNT_ACTIVE = "bg-surface text-thread";

const LIVE_BADGE_RAIL =
  "absolute top-0.5 right-1.5 h-[9px] w-[9px] rounded-full border-2 border-paper bg-coral animate-[navdotpulse_1.6s_infinite]";
const LIVE_BADGE_DRAWER =
  "absolute top-1.5 left-[22px] right-auto h-[9px] w-[9px] rounded-full border-2 border-paper bg-coral animate-[navdotpulse_1.6s_infinite]";

const MODE_SWITCH_BTN =
  "mt-1.5 flex w-full cursor-pointer items-center gap-2 rounded-tile border-1_5 border-ash-line bg-surface px-3 py-2.5 text-left text-[12.5px] font-bold text-ink hover:border-thread";

const ChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const Hamburger = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const Checkmark = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--thread)"
    strokeWidth="2"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const LINKED_ACCOUNTS = [
  { mode: "student", icon: "🎓", label: "Chidinma Okafor", role: "Student" },
  { mode: "teacher", icon: "🧑‍🏫", label: "Mrs. F. Adeyemi", role: "Teacher" },
  { mode: "school", icon: "🏫", label: "Corona Secondary School", role: "School Admin" },
] as const;

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

  const switchAccount = (mode: typeof LINKED_ACCOUNTS[number]["mode"]) => {
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
      if (item.upgrade) {
        cls +=
          " bg-thread text-white font-extrabold mt-1 [&_svg]:stroke-white [&_svg]:fill-white hover:bg-thread hover:text-white hover:opacity-90";
        if (active) cls += " bg-thread text-white";
      } else if (active) {
        cls += " " + RAIL_LINK_ACTIVE;
      }
      return cls;
    }
    if (surface === "drawer") {
      let cls = DRAWER_LINK;
      if (item.upgrade) {
        cls +=
          " bg-thread text-white font-extrabold mt-1 [&_svg]:stroke-white [&_svg]:fill-white hover:bg-thread hover:text-white hover:opacity-90";
        if (active) cls += " bg-thread text-white";
      } else if (active) {
        cls += " " + DRAWER_LINK_ACTIVE;
      }
      return cls;
    }
    return active ? `${TAB} ${TAB_ACTIVE}` : TAB;
  };

  const renderNavItem = (item: NavItem, surface: "rail" | "drawer" | "tab", index: number) => {
    if (item.kind === "divider") {
      if (surface === "rail") {
        return (
          <div
            key={index}
            className={`h-px bg-ash-line my-2.5 mx-1.5 ${item.gap ? "mt-auto mb-2.5" : ""}`}
          />
        );
      }
      return (
        <div
          key={index}
          className={`h-px bg-ash-line my-2.5 mx-1 ${item.gap ? "mt-auto mb-2.5" : ""}`}
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#fff"
              >
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
    const countCls = (id: string) =>
      `${RL_COUNT} ${isActive(item) && surface !== "tab" ? RL_COUNT_ACTIVE : ""}`;
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
          <span className={countCls(`${surface}ChallengeCount`)} id={`${surface}ChallengeCount`}>
            {activeChallenges.length}
          </span>
        ) : null}
        {surface !== "tab" && item.tab === "studentassign" && pendingAssign > 0 ? (
          <span
            className={countCls(surface === "drawer" ? "drawerAssignCount" : "railAssignCount")}
            id={surface === "drawer" ? "drawerAssignCount" : "railAssignCount"}
          >
            {pendingAssign}
          </span>
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
        <div
          className="sticky top-0 z-20 flex items-center justify-between border-b border-ash-line bg-paper px-5 pt-[18px] pb-3.5 nav:hidden"
          id="appTopbar"
        >
          <div className="flex items-center gap-2.5">
            <button
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[9px] border-none bg-paper-dim text-ink"
              onClick={openDrawer}
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
                onClick={openAccountSwitch}
              >
                <ChevronDown />
              </button>
            </div>
          </div>
          <div
            className="flex cursor-pointer items-center gap-1.5 rounded-[20px] bg-ember-soft px-2.5 py-1.5 font-mono text-label font-semibold"
            onClick={() => goTab("progress")}
          >
            🔥 12-day streak
          </div>
        </div>
      )}

      {/* ---------- Body: rail + main ---------- */}
      <div className="flex min-h-0 flex-1">
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
            <button className={BRAND_SWITCH_BTN} title="Switch account" aria-label="Switch account" onClick={openAccountSwitch}>
              <ChevronDown />
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="contents">{nav.rail.map((i, idx) => renderNavItem(i, "rail", idx))}</div>
          </div>
          <button
            className={MODE_SWITCH_BTN}
            style={{ display: appMode === "student" ? "none" : "flex" }}
            onClick={logout}
          >
            🚪 Log out
          </button>
        </nav>

        <main className="min-w-0 flex-1 overflow-y-auto p-5 pb-24 nav:px-10 nav:pt-7 nav:pb-10">{children}</main>
      </div>

      {/* ---------- Tab bar (mobile) ---------- */}
      <nav className="sticky bottom-0 z-20 flex border-t border-ash-line bg-paper px-1.5 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] nav:hidden">
        <div className="contents">{nav.tabs.map((i, idx) => renderNavItem(i, "tab", idx))}</div>
      </nav>

      {/* ---------- Mobile drawer ---------- */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[200] animate-[fade_.2s_ease] bg-[rgba(20,23,43,0.55)] nav:hidden!"
          id="drawerOverlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDrawer();
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
                  onClick={openAccountSwitch}
                >
                  <ChevronDown />
                </button>
              </div>
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-paper-dim"
                onClick={closeDrawer}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto">
              <div className="contents">
                {nav.drawer.map((i, idx) => renderNavItem(i, "drawer", idx))}
              </div>
            </div>
            <button
              className={MODE_SWITCH_BTN}
              style={{ display: appMode === "student" ? "none" : "flex" }}
              onClick={logout}
            >
              🚪 Log out
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-[400] max-w-[88%] -translate-x-1/2 translate-y-0 rounded-[30px] bg-ink px-5 py-[13px] text-center text-sub font-semibold text-paper opacity-100 shadow-[0_10px_30px_rgba(0,0,0,.25)] transition-[opacity,transform] duration-300"
          dangerouslySetInnerHTML={{ __html: toast }}
        />
      )}

      {accountSwitchOpen && (
        <div
          className="fixed inset-0 z-[100] flex animate-[fade_.2s_ease] items-end justify-center bg-[rgba(20,23,43,0.55)]"
          id="accountSwitchModal"
        >
          <div className="m-auto max-h-[82vh] w-full max-w-[520px] overflow-y-auto rounded-t-[20px] bg-paper px-5 pt-[22px] pb-7">
            <button
              className="float-right h-[30px] w-[30px] cursor-pointer rounded-full border-none bg-paper-dim text-sm"
              onClick={closeAccountSwitch}
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="clear-both mb-2.5 font-display text-[20px] font-semibold">Switch account</h2>
            <p style={{ fontSize: "12px", color: "var(--ash)", margin: "-6px 0 16px", lineHeight: 1.5 }}>
              Jump between your linked AbSTopiq accounts.
            </p>
            <div id="accountSwitchList">
              {LINKED_ACCOUNTS.map((a) => (
                <div
                  key={a.mode}
                  className="flex cursor-pointer items-center gap-3 border-b border-ash-line px-1 py-[11px] last:border-b-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => switchAccount(a.mode)}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-dim text-label font-bold">
                    {a.icon}
                  </div>
                  <div className="flex-1 text-sub font-semibold">
                    {a.label}
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--ash)" }}>
                      {a.role}
                      {a.mode === appMode ? " · current" : ""}
                    </div>
                  </div>
                  {a.mode === appMode ? <Checkmark /> : null}
                </div>
              ))}
            </div>
            <button
              className="mt-2.5 w-full cursor-pointer rounded-btn border-[1.5px] border-dashed border-ash-line bg-transparent p-3 text-[13px] font-bold text-ash hover:border-thread hover:text-thread"
              onClick={addAnotherAccount}
            >
              + Add another account
            </button>
          </div>
        </div>
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