import { ImageResponse } from "next/og";

// 1200×630 OG / Twitter summary_large_image — mirrors the hero: warm timber
// dusk, ember firelight glow lower-left, the greeting line. Next serves this for
// both openGraph and twitter (card: summary_large_image) automatically.
export const alt = "Kayon Ridge — a warm timber villa retreat above Lembang, West Java";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          background:
            "radial-gradient(120% 90% at 12% 108%, rgba(224,144,74,0.55) 0%, rgba(224,144,74,0) 42%), linear-gradient(155deg, #31241a 0%, #241a12 55%, #1c130c 100%)",
          color: "#efe4d2",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* top brand row */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 80,
            display: "flex",
            alignItems: "baseline",
            gap: 14,
          }}
        >
          <div style={{ fontSize: 40, fontWeight: 700 }}>Kayon</div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#e0904a",
              fontFamily: "sans-serif",
            }}
          >
            Ridge
          </div>
        </div>

        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e0904a",
            fontFamily: "sans-serif",
            marginBottom: 22,
          }}
        >
          Lembang Highlands · West Java
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 68, lineHeight: 1.05, fontWeight: 600 }}>
          <span>Come in from the cold.</span>
          <span style={{ fontStyle: "italic", color: "#e0904a" }}>
            The fire&apos;s already lit.
          </span>
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 26,
            color: "#c4b29b",
            fontFamily: "sans-serif",
            maxWidth: 820,
          }}
        >
          A warm timber house on a pine-forest ridge above Lembang. Pine, tea gardens, and the valley below.
        </div>
      </div>
    ),
    { ...size },
  );
}
