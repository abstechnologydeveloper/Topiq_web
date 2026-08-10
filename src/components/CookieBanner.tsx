"use client";

import Link from "next/link";

export default function CookieBanner() {
  const dismiss = () => {
    const el = document.getElementById("cookieBanner");
    el?.classList.add("hidden");
  };

  return (
    <div className="cookie-banner" id="cookieBanner">
      <p>
        We use essential cookies to run AbSTopiq, and basic analytics to see
        what&apos;s working. No ads, no data sold. See our{" "}
        <Link
          href="/privacy"
          style={{ color: "#fff", textDecoration: "underline", cursor: "pointer" }}
        >
          Privacy policy
        </Link>
        .
      </p>
      <button className="btn btn-ember" onClick={dismiss}>
        Got it
      </button>
    </div>
  );
}