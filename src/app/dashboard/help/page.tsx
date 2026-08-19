"use client";

import { useRouter } from "next/navigation";
import { BackChevron } from "../components/screens/shared";

export default function Page() {
  const router = useRouter();

  return (
    <section className="screen active" id="screen-help">
      <div className="back-row" onClick={() => router.push("/dashboard/settings")}>
        <BackChevron /> Settings
      </div>
      <span className="eyebrow">We're here</span>
      <h1 className="page-title">Help &amp; support</h1>
      <p className="page-sub">Common questions and ways to reach us.</p>
      <div className="card" style={{ padding: "4px 16px", marginBottom: "16px" }}>
        <div className="roster-row">
          <div className="roster-name" style={{ fontWeight: 600 }}>How do I reset my password?</div>
        </div>
        <div className="roster-row">
          <div className="roster-name" style={{ fontWeight: 600 }}>How does Sabi AI work?</div>
        </div>
        <div className="roster-row">
          <div className="roster-name" style={{ fontWeight: 600 }}>How do I link my school?</div>
        </div>
        <div className="roster-row" style={{ borderBottom: "none" }}>
          <div className="roster-name" style={{ fontWeight: 600 }}>How do I cancel my subscription?</div>
        </div>
      </div>
      <p className="page-sub">
        Still stuck? Reach us at <strong>support@abstopiq.com</strong>.
      </p>
    </section>
  );
}