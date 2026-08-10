import Link from "next/link";

export default function SchoolCoveredSection() {
  return (
    <section>
      <div className="wrap">
        <div className="mini-feat-row">
          <span className="mini-feat-num">03</span>
          <div>
            <h3 style={{ fontSize: 19, marginBottom: 8 }}>
              Is your school already on AbSTopiq?
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
              If your school is one of the 80+ already covered through a district
              or school plan — including Lagos State&apos;s Education District IV
              — you can be added as a teacher for free. Ask your school admin, or{" "}
              <Link
                href="/contact"
                style={{ color: "var(--thread)", fontWeight: 700 }}
              >
                tell us your school&apos;s name
              </Link>{" "}
              and we&apos;ll help you get set up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}