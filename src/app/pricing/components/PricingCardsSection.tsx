"use client";

import { useState } from "react";
import { CheckIcon, PlusIcon } from "@/components/icons";

interface Plan {
  name: string;
  amount: string;
  per: string;
  features: string[];
  ctaLabel: string;
  highlight?: boolean;
  stamp?: string;
  ember?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Student — Free",
    amount: "₦0",
    per: "forever",
    features: [
      "Unlimited practice & flashcards",
      "3 Sabi AI questions a day",
      "All subject lessons",
    ],
    ctaLabel: "Get started",
  },
  {
    name: "Exam-Ready Pass",
    amount: "₦2,000",
    per: "through results day",
    features: [
      "Unlimited Sabi AI",
      "Full timed mock exams",
      "Runs until your results land",
    ],
    ctaLabel: "Get exam-ready",
    highlight: true,
    stamp: "WAEC season",
    ember: true,
  },
  {
    name: "Student — Plus",
    amount: "₦1,500",
    per: "per month",
    features: [
      "Unlimited Sabi AI, any time",
      "Audio lesson narration",
      "Voice replies from Sabi AI",
    ],
    ctaLabel: "Go Plus",
  },
  {
    name: "Teachers",
    amount: "₦3,000",
    per: "per month, or free via school",
    features: [
      "Unlimited classes & assignments",
      "Live teaching sessions",
      "Unlimited Sabi AI for lesson prep",
    ],
    ctaLabel: "Start teaching",
  },
];

export default function PricingCardsSection() {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow-row center">
            <span className="eyebrow">Pricing</span>
          </div>
          <h1>
            Learning is free, always. Exam season is where Plus earns its keep.
          </h1>
        </div>
        <div className="pricing-grid">
          {PLANS.map((p) => (
            <div
              className={`price-card${p.highlight ? " highlight" : ""}`}
              key={p.name}
            >
              {p.stamp && <div className="price-stamp">{p.stamp}</div>}
              <div className="price-name">{p.name}</div>
              <div className="price-amount">{p.amount}</div>
              <div className="price-per">{p.per}</div>
              <ul className="price-list">
                {p.features.map((f) => (
                  <li key={f}>
                    <CheckIcon size={15} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                className={`btn ${p.ember ? "btn-ember" : "btn-ghost"} price-cta`}
                href="/"
                style={{ width: "100%" }}
              >
                {p.ctaLabel}
              </a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--ash)", marginTop: 22 }}>
          Schools: ₦500 per student per term (100+ seats) — covers every student
          and teacher, free at the point of use.{" "}
          <a href="/schools" style={{ color: "var(--thread)", fontWeight: 700 }}>
            Talk to us →
          </a>
        </p>
      </div>
    </section>
  );
}