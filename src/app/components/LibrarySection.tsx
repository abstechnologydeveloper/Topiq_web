export default function LibrarySection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="mini-feat-row">
          <span className="mini-feat-num">01</span>
          <div>
            <h3 style={{ fontSize: 19, marginBottom: 8 }}>
              A library behind every subject
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
              42,300 books and 31,800 textbooks, searchable by title, topic or
              author — with a practice set attached to almost every one, so
              reading and practising stay in the same place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}