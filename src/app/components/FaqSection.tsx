import FaqList from "./FaqList";

export default function FaqSection() {
  return (
    <section>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div
          className="section-head center"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="eyebrow-row center">
            <span className="eyebrow">Questions</span>
          </div>
          <h2>Before you ask Sabi AI, ask us</h2>
        </div>
        <FaqList />
      </div>
    </section>
  );
}