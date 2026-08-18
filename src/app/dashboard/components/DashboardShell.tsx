"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV, type NavItem } from "./navConfig";
import { useDashboard } from "./DashboardContext";

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

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
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
    logout,
  } = useDashboard();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const nav = NAV[appMode];
  const showTopbar = pathname === "/dashboard";

  const isActive = (item: NavItem) => {
    if (item.kind !== "link") return false;
    const p = item.path;
    return pathname === p || (p !== "/dashboard" && pathname.startsWith(p));
  };

  const linkClass = (item: NavItem, surface: "rail" | "drawer" | "tab") => {
    if (item.kind !== "link") return "";
    const base = surface === "rail" ? "rail-link" : surface === "drawer" ? "drawer-link" : "tab";
    return [base, item.upgrade ? "upgrade-link" : "", isActive(item) ? "active" : ""]
      .filter(Boolean)
      .join(" ");
  };

  const renderNavItem = (item: NavItem, surface: "rail" | "drawer" | "tab", index: number) => {
    if (item.kind === "divider") {
      const base = surface === "rail" ? "rail-divider" : "drawer-divider";
      const cls = item.gap ? `${base} rail-gap` : base;
      return <div key={index} className={cls} />;
    }
    if (item.kind === "account") {
      const cls = surface === "rail" ? "rail-account" : "drawer-account";
      const active = detailActive(item);
      const avatarId = surface === "rail" ? "railAvatarCircle" : "drawerAvatarCircle";
      const nameId = surface === "rail" ? "railAvatarName" : "drawerAvatarName";
      return (
        <div
          key={index}
          className={`${cls} ${active ? "active" : ""}`}
          data-tab={item.tab}
          onClick={() => goTab(item.tab)}
        >
          <div className="rail-avatar-circle" id={avatarId}>
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile picture" />
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
          <div className="ra-text">
            <div className="ra-name" id={nameId}>{profile.firstName || "Profile"}</div>
            <div className="ra-role">{item.role}</div>
          </div>
        </div>
      );
    }
    return (
      <button
        key={index}
        data-tab={item.tab}
        className={linkClass(item, surface)}
        onClick={() => goTab(item.tab)}
      >
        {item.icon}
        {item.label}
        {surface !== "tab" && item.count ? (
          <span className="rl-count">{item.count}</span>
        ) : null}
        {surface !== "tab" && item.tab === "challenges" && activeChallenges.length > 0 ? (
          <span className="rl-count" id={`${surface}ChallengeCount`}>
            {activeChallenges.length}
          </span>
        ) : null}
      </button>
    );
  };

  const detailActive = (item: NavItem) => {
    if (item.kind !== "account") return false;
    const p = pathname?.split("?")[0] || "";
    return p === "/dashboard/profile";
  };

  return (
    <div className="app-shell">
      {/* ---------- Top bar (mobile) ---------- */}
      {showTopbar && (
        <div className="topbar" id="appTopbar">
          <div className="topbar-left">
            <button className="hamburger-btn" onClick={openDrawer} aria-label="Open menu">
              <Hamburger />
            </button>
            <div className="brand">
              <Image
                className="brand-mark"
                src="/logo.png"
                alt="AbSTopiq"
                width={34}
                height={34}
              />
              <div className="brand-name">{""}</div>
              <button
                className="brand-switch-btn"
                title="Switch account"
                aria-label="Switch account"
              >
                <ChevronDown />
              </button>
            </div>
          </div>
          <div className="streak" onClick={() => goTab("progress")} style={{ cursor: "pointer" }}>
            🔥 12-day streak
          </div>
        </div>
      )}

      {/* ---------- Body: rail + main ---------- */}
      <div className="body-row">
        <nav className="rail">
          <div className="rail-brand">
            <Image
              className="brand-mark"
              src="/logo.png"
              alt="AbSTopiq"
              width={34}
              height={34}
            />
            <div className="brand-name">{""}</div>
            <button className="brand-switch-btn" title="Switch account" aria-label="Switch account">
              <ChevronDown />
            </button>
          </div>
          <div className="rail-nav">
            <div className="nav-set active">{nav.rail.map((i, idx) => renderNavItem(i, "rail", idx))}</div>
          </div>
          <button className="mode-switch-btn" style={{ display: "none" }} onClick={logout}>
            🚪 Log out
          </button>
        </nav>

        <main>{children}</main>
      </div>

      {/* ---------- Tab bar (mobile) ---------- */}
      <nav className="tabbar">
        <div className="nav-set active">{nav.tabs.map((i, idx) => renderNavItem(i, "tab", idx))}</div>
      </nav>

      {/* ---------- Mobile drawer ---------- */}
      {drawerOpen && (
        <div
          className="drawer-overlay show"
          id="drawerOverlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDrawer();
          }}
        >
          <div className="drawer-panel">
            <div className="drawer-header">
              <div className="brand">
                <Image
                  className="brand-mark"
                  src="/logo.png"
                  alt="AbSTopiq"
                  width={34}
                  height={34}
                />
                <button
                  className="brand-switch-btn"
                  title="Switch account"
                  aria-label="Switch account"
                >
                  <ChevronDown />
                </button>
              </div>
              <button className="drawer-close" onClick={closeDrawer} aria-label="Close menu">
                <CloseIcon />
              </button>
            </div>
            <div className="drawer-nav">
              <div className="nav-set active">
                {nav.drawer.map((i, idx) => renderNavItem(i, "drawer", idx))}
              </div>
            </div>
            <button className="mode-switch-btn" style={{ display: "none" }} onClick={logout}>
              🚪 Log out
            </button>
          </div>
        </div>
      )}

      {toast && <div className="badge-toast show" dangerouslySetInnerHTML={{ __html: toast }} />}

      {certSubject && subjects[certSubject] ? (
        <div className="modal-overlay show" id="certModal">
          <div className="modal-sheet">
            <button className="modal-close" onClick={() => setCertSubject(null)}>
              ✕
            </button>
            <div className="certificate-card">
              <div className="cert-ribbon">🎓</div>
              <div className="cert-eyebrow">Certificate of Completion</div>
              <div className="cert-name">
                {profile.firstName || "Student"} {profile.lastName || ""}
              </div>
              <div className="cert-sub">has completed every topic in</div>
              <div className="cert-subject">
                {subjects[certSubject].icon} {subjects[certSubject].name}
              </div>
              <div className="cert-date">
                AbSTopiq · {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>
            <button className="modal-done-btn" onClick={() => setCertSubject(null)}>
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}