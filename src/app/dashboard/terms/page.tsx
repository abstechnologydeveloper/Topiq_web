"use client";

import { useRouter } from "next/navigation";
import { BackChevron } from "../components/screens/shared";

export default function Page() {
  const router = useRouter();

  return (
    <section className="screen active" id="screen-terms">
      <div className="back-row" onClick={() => router.push("/dashboard/settings")}>
        <BackChevron /> Settings
      </div>
      <span className="eyebrow">Last updated July 2026</span>
      <h1 className="page-title">Terms of service</h1>
      <p className="page-sub">
        The basic rules for using AbSTopiq. Placeholder copy for this mockup — final legal text
        goes here.
      </p>
      <div className="card" style={{ padding: "16px", marginBottom: "16px" }}>
        <p style={{ fontSize: "13px", color: "var(--ash)", lineHeight: "1.7" }}>
          By using AbSTopiq you agree to use the platform for personal learning, keep your login
          details private, and follow your school's code of conduct where applicable. Subscriptions
          renew automatically unless cancelled before the renewal date.
        </p>
      </div>
    </section>
  );
}