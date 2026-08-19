"use client";

import { useRouter } from "next/navigation";
import { BackChevron } from "../components/screens/shared";

export default function Page() {
  const router = useRouter();

  return (
    <section className="screen active" id="screen-privacy">
      <div className="back-row" onClick={() => router.push("/dashboard/settings")}>
        <BackChevron /> Settings
      </div>
      <span className="eyebrow">Last updated July 2026</span>
      <h1 className="page-title">Privacy policy</h1>
      <p className="page-sub">
        A summary of how AbSTopiq collects, uses and protects your data. Placeholder copy for this
        mockup — final legal text goes here.
      </p>
      <div className="card" style={{ padding: "16px", marginBottom: "16px" }}>
        <p style={{ fontSize: "13px", color: "var(--ash)", lineHeight: "1.7" }}>
          We collect the information you give us when you create an account (name, grade, school),
          plus your activity on the platform (topics studied, practice results) so we can
          personalise your learning. We never sell your data. Parents and school admins can request
          access or deletion of a student's data at any time.
        </p>
      </div>
    </section>
  );
}