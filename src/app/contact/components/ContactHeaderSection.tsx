export default function ContactHeaderSection() {
  return (
    <header className="persona-hero">
      <div className="wrap">
        <div className="persona-hero-inner">
          <span className="persona-eyebrow-badge">Contact us</span>
          <h1>Let&apos;s talk</h1>
          <p className="lede" style={{ fontSize: 16 }}>
            Student, teacher, school or district admin, or just curious — tell
            us what you need and we&apos;ll point you the right way.
          </p>
          <div className="persona-stats">
            <div className="persona-stat">
              <span className="n">1 day</span>
              <span className="l">Usual reply time</span>
            </div>
            <div className="persona-stat">
              <span className="n">Lagos</span>
              <span className="l">Based, working nationwide</span>
            </div>
            <div className="persona-stat">
              <span className="n">Free</span>
              <span className="l">To reach out, no strings</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}