"use client";

import { useState } from "react";
import { PlusIcon } from "@/components/icons";

const BILLING_FAQ = [
  {
    q: "Can I cancel anytime?",
    a: "Yes — Plus and the Exam-Ready Pass are both cancel-anytime; the Pass simply runs until your results are released either way.",
  },
  {
    q: "How do I pay?",
    a: "Card or bank transfer, processed securely through Paystack or Flutterwave, for individual plans; schools and districts are billed per term against a single invoice.",
  },
  {
    q: "Is there a refund if I stop using it?",
    a: "Monthly plans stop renewing the moment you cancel — no refund is needed since you're only charged one month at a time.",
  },
  {
    q: "Will this work on my phone?",
    a: "Yes — AbSTopiq is built to run well on entry-level Android phones and slower connections, with audio lessons and lightweight screens for days when data is tight.",
  },
];

export default function BillingFaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="section-head">
          <div className="eyebrow-row">
            <span className="eyebrow">Billing basics</span>
          </div>
          <h2 style={{ fontSize: 24 }}>A few quick answers</h2>
        </div>
        {BILLING_FAQ.map((item, i) => (
          <div className={`faq-item ${open === i ? "open" : ""}`} key={item.q}>
            <button
              className="faq-q"
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              {item.q}
              <PlusIcon />
            </button>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}