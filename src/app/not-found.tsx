import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "48px 24px",
        textAlign: "center",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(72px, 12vw, 120px)",
          fontWeight: 700,
          color: "var(--color-ember, #f97316)",
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        404
      </h1>
      <p style={{ fontSize: 18, color: "var(--color-slate, #64748b)", marginBottom: 32 }}>
        This page does not exist in real life. It might not have existed at all.
      </p>
      <Link
        href="/"
        className="btn btn-primary"
        style={{ textDecoration: "none" }}
      >
        Go back home
      </Link>
    </div>
  );
}