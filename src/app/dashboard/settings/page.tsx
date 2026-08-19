"use client";

import { useRouter } from "next/navigation";
import { useDashboard } from "../components/DashboardContext";
import { BackChevron, ChevronMicro } from "../components/screens/shared";

export default function Page() {
  const router = useRouter();
  const { logout, dark, toggleDark } = useDashboard();

  return (
    <section className="screen active" id="screen-settings">
      <div className="back-row" onClick={() => router.push("/dashboard/profile")}>
        <BackChevron /> Profile
      </div>
      <span className="eyebrow">Manage your account</span>
      <h1 className="page-title">Settings</h1>
      <p className="page-sub">Account, legal and support — everything else lives here.</p>

      <div className="card" style={{ padding: "4px 16px", marginBottom: "16px" }}>
        <div className="roster-row" style={{ cursor: "pointer" }} onClick={() => router.push("/dashboard/profile")}>
          <div className="roster-name" style={{ fontWeight: 600 }}>Edit profile</div>
          <ChevronMicro className="chev" />
        </div>
        <div className="roster-row" style={{ cursor: "pointer" }} onClick={() => router.push("/dashboard/upgrade")}>
          <div className="roster-name" style={{ fontWeight: 600 }}>Subscription &amp; billing</div>
          <ChevronMicro className="chev" />
        </div>
        <div className="roster-row" style={{ cursor: "pointer" }}>
          <div className="roster-name" style={{ fontWeight: 600 }}>Notifications</div>
          <ChevronMicro className="chev" />
        </div>
        <div className="roster-row" style={{ borderBottom: "none" }}>
          <div className="roster-name" style={{ fontWeight: 600 }}>Dark mode</div>
          <button
            className={`dm-switch${dark ? " on" : ""}`}
            onClick={toggleDark}
            aria-label="Toggle dark mode"
          >
            <span className="dm-knob" />
          </button>
        </div>
      </div>

      <span className="eyebrow">Legal &amp; support</span>
      <div className="card" style={{ padding: "4px 16px", marginBottom: "16px" }}>
        <div className="roster-row" style={{ cursor: "pointer" }} onClick={() => router.push("/dashboard/help")}>
          <div className="roster-name" style={{ fontWeight: 600 }}>Help &amp; support</div>
          <ChevronMicro className="chev" />
        </div>
        <div className="roster-row" style={{ cursor: "pointer" }} onClick={() => router.push("/dashboard/privacy")}>
          <div className="roster-name" style={{ fontWeight: 600 }}>Privacy policy</div>
          <ChevronMicro className="chev" />
        </div>
        <div className="roster-row" style={{ cursor: "pointer" }} onClick={() => router.push("/dashboard/terms")}>
          <div className="roster-name" style={{ fontWeight: 600 }}>Terms of service</div>
          <ChevronMicro className="chev" />
        </div>
        <div className="roster-row" style={{ borderBottom: "none" }}>
          <div className="roster-name" style={{ fontWeight: 600, color: "var(--ash)" }}>App version</div>
          <div style={{ fontSize: "13px", color: "var(--ash)" }}>v2.5</div>
        </div>
      </div>

      <button
        className="add-entry-btn"
        style={{ borderStyle: "solid", borderColor: "#E4453A", color: "#E4453A" }}
        onClick={logout}
      >
        🚪 Log out
      </button>
    </section>
  );
}