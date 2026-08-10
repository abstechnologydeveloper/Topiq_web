export default function TimetableSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="mini-feat-row">
          <span className="mini-feat-num">02</span>
          <div>
            <h3 style={{ fontSize: 19, marginBottom: 8 }}>
              Your week, mapped out
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
              Homework, live sessions and exams in one timetable, colour-coded by
              subject, with a running countdown to WAEC. Set a challenge target
              and chip away at it — practising toward a challenge counts the same
              as regular practice. Earn a badge for every topic you finish, and a
              certificate once you clear a whole subject.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}