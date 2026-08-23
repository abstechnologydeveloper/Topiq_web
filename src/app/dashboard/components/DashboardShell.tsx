"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "./navConfig";
import { useDashboard } from "./DashboardContext";
import { ASSIGNMENTS } from "../data";
import StartLiveModal from "./screens/StartLiveModal";
import AssignmentQuickAddModal from "./screens/AssignmentQuickAddModal";
import TeacherClassQuickAddModal from "./screens/TeacherClassQuickAddModal";
import { NavItemView } from "./shell/NavItemView";
import type { NavItem } from "./navConfig";
import Topbar from "./shell/Topbar";
import RailNav from "./shell/RailNav";
import Tabbar from "./shell/Tabbar";
import Drawer from "./shell/Drawer";
import AccountSwitchModal, { type LinkedAccountMode } from "./shell/AccountSwitchModal";
import Toast from "./shell/Toast";

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

  const detailActive = (item: NavItem) =>
    item.kind === "account" && (pathname?.split("?")[0] || "") === "/dashboard/profile";

  const renderItem = (surface: "rail" | "drawer" | "tab") => (item: NavItem, index: number) => (
    <NavItemView
      key={index}
      item={item}
      surface={surface}
      index={index}
      active={detailActive(item) || isActive(item)}
      liveSession={Boolean(liveSession)}
      challengeCount={activeChallenges.length}
      pendingAssign={pendingAssign}
      avatarUrl={profile.avatar}
      firstName={profile.firstName}
      onSelect={goTab}
    />
  );

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
          renderItem={(item, surface, index) => renderItem(surface)(item, index)}
          appMode={appMode}
          onSwitchAccount={openAccountSwitch}
          onLogout={logout}
        />

        <main className="min-w-0 flex-1 overflow-y-auto p-5 pb-24 nav:px-10 nav:pt-7 nav:pb-10">{children}</main>
      </div>

      {/* ---------- Tab bar (mobile) ---------- */}
      <Tabbar items={nav.tabs} renderItem={(item, surface, index) => renderItem(surface)(item, index)} />

      {/* ---------- Mobile drawer ---------- */}
      {drawerOpen && (
        <Drawer
          items={nav.drawer}
          renderItem={(item, surface, index) => renderItem(surface)(item, index)}
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
          className="fixed inset-0 z-100 flex animate-[fade_.2s_ease] items-end justify-center bg-[rgba(20,23,43,0.55)]"
          id="certModal"
        >
          <div className="m-auto max-h-[82vh] w-full max-w-130 overflow-y-auto rounded-t-[20px] bg-paper px-5 pt-5.5 pb-7">
            <button
              className="float-right h-7.5 w-7.5 cursor-pointer rounded-full border-none bg-paper-dim text-sm"
              onClick={() => setCertSubject(null)}
            >
              ✕
            </button>
            <div className="rounded-card border-2 border-thread bg-[linear-gradient(160deg,var(--thread-soft),var(--surface))] px-5 py-7.5 text-center">
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
              className="mt-2 cursor-pointer rounded-[22px] border-none bg-thread px-5 py-2.75 text-[13px] font-bold text-white"
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