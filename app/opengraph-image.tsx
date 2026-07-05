import { ImageResponse } from "next/og";
import { config } from "@/config";

export const runtime = "edge";
export const alt = `${config.eventType} of ${config.motherName} — You're Invited`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** WhatsApp / social link preview: temple arch + "You're Invited". */
export default async function OgImage() {
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
          fontFamily: "Georgia, serif",
        }}
      >
        {/* full moon */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 120,
            width: 110,
            height: 110,
            borderRadius: 9999,
            backgroundColor: "#FBEFC5",
            boxShadow: "0 0 80px 30px rgba(242,201,76,0.35)",
          }}
        />
        {/* arch card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 660,
            height: 470,
            border: "3px solid #D4A017",
            borderTopLeftRadius: 330,
            borderTopRightRadius: 330,
            boxShadow: "inset 0 0 0 10px #0D1533, inset 0 0 0 12px rgba(242,201,76,0.6)",
            paddingTop: 70,
          }}
        >
          <div
            style={{
              color: "#F2C94C",
              fontSize: 20,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            {config.heroTagline}
          </div>
          <div
            style={{
              color: "#FDF6E3",
              fontSize: 88,
              marginTop: 28,
              fontStyle: "italic",
            }}
          >
            You&rsquo;re Invited
          </div>
          <div
            style={{
              color: "#F2C94C",
              fontSize: 40,
              marginTop: 24,
            }}
          >
            {config.eventType} · {config.dateDisplay}
          </div>
          {/* lotus dot row */}
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 2 ? 14 : 10,
                  height: i === 2 ? 14 : 10,
                  borderRadius: 9999,
                  backgroundColor: i === 2 ? "#E8A0BF" : "#D4A017",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
