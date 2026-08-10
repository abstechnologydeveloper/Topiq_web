export default function ChromeBar({ url }: { url: string }) {
  return (
    <div className="chrome">
      <span className="dotx" style={{ background: "#EF6650" }}></span>
      <span className="dotx" style={{ background: "#F1B400" }}></span>
      <span className="dotx" style={{ background: "#41C463" }}></span>
      <span className="url">{url}</span>
    </div>
  );
}