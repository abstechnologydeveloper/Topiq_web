import Link from "next/link";

export default function TeacherPricingSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div
          className="section-head center"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="eyebrow-row center">
            <span className="eyebrow">Teacher pricing</span>
          </div>
          <h3 style={{ fontSize: 24 }}>
            Free for one class. ₦3,000/month for more. Free via your school.
          </h3>
          <p className="lede" style={{ margin: "0 auto" }}>
            One class, unlimited assignments, and Lesson Prep AI cost nothing to
            try. Go unlimited for ₦3,000/month — or free automatically if your
            school is on a school plan.
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link className="btn btn-primary" href="/pricing">
            See the full pricing table →
          </Link>
        </div>
      </div>
    </section>
  );
}