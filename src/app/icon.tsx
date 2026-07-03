import { ImageResponse } from "next/og";

// Favicon — warm timber monogram "K" with an ember dot. Regenerated at build.
// If a brand PNG is dropped in /public, add an `icons` field to layout metadata
// pointing at it to override this generated icon.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#241a12",
          color: "#efe4d2",
          fontSize: 40,
          fontWeight: 700,
          fontFamily: "serif",
          borderRadius: 14,
          position: "relative",
        }}
      >
        K
        <div
          style={{
            position: "absolute",
            right: 12,
            top: 12,
            width: 9,
            height: 9,
            borderRadius: 9,
            background: "#e0904a",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
