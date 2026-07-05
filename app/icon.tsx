import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Simple lotus favicon for browser tabs. */
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
          backgroundColor: "#0D1533",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 9999,
            backgroundColor: "#E8A0BF",
            boxShadow: "0 0 0 3px #D4A017",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
