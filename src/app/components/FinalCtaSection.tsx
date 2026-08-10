import Link from "next/link";

export default function FinalCtaSection() {
  return (
    <section>
      <div className="wrap">
        <div className="final-cta">
          <h2>Learn it. Practice it. Sabi it.</h2>
          <p>
            Free for students, free to start for teachers, and straightforward
            for schools — with Sabi AI grounded in your syllabus the whole way
            through.
          </p>
          <div className="final-actions">
            <Link className="btn btn-ember" href="/pricing">
              Start free — no card needed
            </Link>
            <Link className="btn btn-outline-light" href="/schools">
              Set up your school →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}