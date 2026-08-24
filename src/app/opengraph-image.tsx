import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "AbSTopiq — Learn It. Practice It. Sabi It.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logo = await fetch(
    new URL("/logo.png", "https://www.abstopiq.com"),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#ffffff",
        color: "#0f172a",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <img src={logo as any} alt="AbSTopiq" width={180} height={120} />
      </div>

      {/* Main heading */}
      <div
        style={{
          display: "flex",
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: "24px",
        }}
      >
        Learn It. Practice It. Sabi It.
      </div>

      {/* Description */}
      <div
        style={{
          display: "flex",
          fontSize: 30,
          lineHeight: 1.4,
          color: "#475569",
          maxWidth: "900px",
        }}
      >
        Every subject, grounded in your syllabus. Lessons, practice and Sabi AI
        that cites its sources.
      </div>

      {/* Website */}
      <div
        style={{
          display: "flex",
          marginTop: "50px",
          fontSize: 24,
          color: "#64748b",
        }}
      >
        www.abstopiq.com
      </div>
    </div>,
    {
      ...size,
    },
  );
}
