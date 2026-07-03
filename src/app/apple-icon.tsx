import { ImageResponse } from "next/og";

// Apple touch icon — warm timber monogram at 180×180.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #31241a 0%, #241a12 100%)",
          color: "#efe4d2",
          fontSize: 108,
          fontWeight: 700,
          fontFamily: "serif",
          position: "relative",
        }}
      >
        K
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 38,
            width: 22,
            height: 22,
            borderRadius: 22,
            background: "#e0904a",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
