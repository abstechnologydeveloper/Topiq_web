export default function StorySection() {
  return (
    <section>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <h3>Why &quot;grounded&quot; is the whole point</h3>
            <p>
              Most study apps either hand a student generic content that
              doesn&apos;t match their syllabus, or an AI chatbot that answers
              confidently from the whole internet — right or wrong. We built
              AbSTopiq around one rule: every lesson and every Sabi AI answer has
              to trace back to the actual syllabus before it&apos;s shown.
              Everything else — the subjects, the practice sets, the library — is
              built on top of that rule.
            </p>
          </div>
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="mini-testimonial" style={{ padding: "24px 26px" }}>
              <blockquote style={{ fontSize: 16 }}>
                &quot;Learn it. Practice it. Sabi it.&quot; isn&apos;t a slogan we
                picked for marketing — it&apos;s the actual order the app is
                built in.
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}