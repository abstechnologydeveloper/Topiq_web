"use client";

import { useState } from "react";
import { BackChevron, PlanStatusCard, type PlanStatus } from "./shared";

type Props = {
  goTab: (tab: string) => void;
  plan: PlanStatus;
  activatePlus: () => void;
};

const FREE_FEATURES = [
  {
    icon: "📚",
    title: "Practice, flashcards, lessons",
    desc: "Unlimited on every plan — this never gets paywalled.",
  },
  {
    icon: "💬",
    title: "Sabi AI chat & scan",
    desc: "Free: 3 questions a day. Plus: unlimited, anytime.",
  },
  {
    icon: "🎧",
    title: "Audio lesson narration & voice replies",
    desc: "Plus only — listen to any lesson, or hear Sabi AI answer out loud.",
  },
  {
    icon: "⏱",
    title: "Timed mock exams",
    desc: "Plus only — full exam-style simulation, graded instantly.",
  },
];

const REFERRAL_LINK = "abstopiq.app/join/CORONA2026";

export default function SubscriptionScreen({ goTab, plan, activatePlus }: Props) {
  const [copyLabel, setCopyLabel] = useState("Copy");

  const covered = plan.isPlusUser;

  const copyReferralLink = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(REFERRAL_LINK).catch(() => {});
    setCopyLabel("Copied ✓");
    window.setTimeout(() => setCopyLabel("Copy"), 1800);
  };

  return (
    <section className="screen active" id="screen-subscription">
      <div className="back-row" onClick={() => goTab("progress")}>
        <BackChevron /> Progress
      </div>
      <span className="eyebrow">Your plan</span>
      <h1 className="page-title">Subscription</h1>
      <p className="page-sub">
        Practice, flashcards and lessons are free — always. Here's what Plus adds, and what
        you're currently on.
      </p>

      <div id="subscriptionPlanCard" style={{ cursor: "default" }}>
        <PlanStatusCard plan={plan} cursor="default" />
      </div>

      <span className="eyebrow">Free vs. AbSTopiq Plus</span>
      <div className="card" style={{ padding: "4px 16px", marginBottom: 20 }}>
        {FREE_FEATURES.map((f) => (
          <div className="school-feature-row" key={f.title}>
            <span className="sf-icon">{f.icon}</span>
            <div>
              <div className="sf-title">{f.title}</div>
              <div className="sf-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <span className="eyebrow" id="subscriptionPlansEyebrow">
        {covered ? "You're all set" : "Choose a plan"}
      </span>
      <div className="plan-toggle-row" id="subscriptionPlanCards" style={{ display: covered ? "none" : "flex" }}>
        <div className="plan-card" onClick={activatePlus}>
          <div className="pc-name">Monthly</div>
          <div className="pc-price">₦1,500</div>
          <div className="pc-period">per month</div>
        </div>
        <div className="plan-card best" onClick={activatePlus}>
          <span className="pc-badge">WAEC SEASON</span>
          <div className="pc-name">Exam-Ready Pass</div>
          <div className="pc-price">₦2,000</div>
          <div className="pc-period">through results day</div>
        </div>
      </div>
      <button className="modal-done-btn" id="subscriptionCtaBtn" style={{ width: "100%", display: covered ? "none" : "block" }} onClick={activatePlus}>
        Start 7-day free trial →
      </button>

      <div className="rail-divider" style={{ margin: "26px 6px 20px" }}></div>

      <span className="eyebrow">Or get it free — invite your school</span>
      <p className="page-sub" style={{ marginTop: -6 }}>
        If your school signs up, every student and teacher there gets Sabi AI, audio lessons,
        and mock exams free — covered by the school's plan, not your pocket.
      </p>
      <div className="recommend-card">
        <div>
          <div className="lbl">Your referral link</div>
          <div className="ttl">{REFERRAL_LINK}</div>
        </div>
        <button onClick={copyReferralLink}>{copyLabel}</button>
      </div>
      <p style={{ fontSize: 12, color: "var(--ash)", margin: "-10px 0 20px", lineHeight: 1.5 }}>
        Send this to your school's admin, principal, or ICT coordinator — it takes them straight
        to setup.
      </p>
    </section>
  );
}
