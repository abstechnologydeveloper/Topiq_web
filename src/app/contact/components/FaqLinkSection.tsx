import Link from "next/link";

export default function FaqLinkSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <p className="lede" style={{ margin: "0 auto 18px" }}>
          Most questions are answered already —{" "}
          <Link href="/#faqList" style={{ color: "var(--thread)", fontWeight: 700 }}>
            see the FAQ →
          </Link>
        </p>
      </div>
    </section>
  );
}