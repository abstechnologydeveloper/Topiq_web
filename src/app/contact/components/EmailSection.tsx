export default function EmailSection() {
  return (
    <section>
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow-row center">
            <span className="eyebrow">Prefer email?</span>
          </div>
          <h2 style={{ fontSize: 24 }}>Reach us directly</h2>
        </div>
        <div className="plain-contact" style={{ justifyContent: "center" }}>
          <div className="pc-item">
            <div className="pc-lbl">General</div>
            <div className="pc-val">hello@abstopiq.com</div>
          </div>
          <div className="pc-item">
            <div className="pc-lbl">Schools &amp; districts</div>
            <div className="pc-val">partners@abstopiq.com</div>
          </div>
        </div>
      </div>
    </section>
  );
}