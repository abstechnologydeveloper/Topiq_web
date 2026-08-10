"use client";

import { useState } from "react";
import { PlusIcon } from "@/components/icons";

const FAQ = [
  {
    q: "Is AbSTopiq an exam-prep app or a learning app?",
    a: "Learning comes first — Subjects, lessons and the book library have no exam board attached; they teach the curriculum on its own terms. Practice is where a specific board (WAEC, NECO, JAMB, GCE and others) comes in, for when exam season is close.",
  },
  {
    q: "What does \"grounded\" actually mean?",
    a: "Every lesson and every Sabi AI answer is matched to a specific part of the syllabus before it's shown to you. For Sabi AI, that comes with a citation — subject, topic and page — so you can verify it instead of taking it on faith.",
  },
  {
    q: "How is Sabi AI different from a general AI chatbot?",
    a: "General chat AI answers from the whole internet and can sound confident while being wrong for your syllabus. Sabi AI is scoped to what you're actually being taught, and shows the page it drew from.",
  },
  {
    q: "Can my school try this before paying for it?",
    a: "Yes — teachers can start on the free plan with one class immediately, and school admins can talk to us about a pilot before committing to a term-wide plan.",
  },
  {
    q: "Is student data safe?",
    a: "Student data is stored to power learning features only — progress, mastery, and assignment history — and is never sold to third parties. Full detail lives in the privacy policy linked in the footer.",
  },
  {
    q: "Is AbSTopiq only for Nigerian boards?",
    a: "Learning itself isn't tied to any board. Practice today covers WAEC, NECO, JAMB and GCE, with IGCSE and SAT for students preparing for international routes — and is built to extend to other WAEC member countries and exam systems.",
  },
];

export default function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div id="faqList">
      {FAQ.map((item, i) => (
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
  );
}