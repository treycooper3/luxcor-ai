import { ImageResponse } from "next/og";

// Shared Open Graph / Twitter card renderer for luxcor.tech.
// Mirrors the live landing-page palette: #0a0a0a base, sky-blue primary
// gradient (#0EA5E9 → #38BDF8), gold secondary accent (#C9A96E), Playfair wordmark.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Luxcor AI — Custom AI Automation for Growing Businesses";

// Load a static-weight TTF from Google Fonts. An old User-Agent makes the
// css2 endpoint serve TTF (not woff2), which Satori can parse — the variable
// font from the google/fonts repo crashes Satori's parser.
async function loadPlayfair(): Promise<ArrayBuffer | null> {
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.45 Safari/535.19",
        },
      },
    );
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export async function renderOgCard() {
  const playfair = await loadPlayfair();
  const fonts = playfair
    ? [
        {
          name: "Playfair Display",
          data: playfair,
          weight: 700 as const,
          style: "normal" as const,
        },
      ]
    : undefined;
  const wordmarkFont = playfair ? "Playfair Display, Georgia, serif" : "Georgia, serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(14, 165, 233, 0.20) 0%, transparent 62%)",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 6,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, #0EA5E9, #C9A96E, #0EA5E9)",
          }}
        />

        {/* kicker */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 10,
            color: "#C9A96E",
            marginBottom: 28,
          }}
        >
          AI AUTOMATION AGENCY
        </div>

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div
            style={{
              display: "flex",
              fontFamily: wordmarkFont,
              fontWeight: 700,
              fontSize: 150,
              letterSpacing: 10,
              backgroundImage: "linear-gradient(135deg, #0EA5E9, #38BDF8, #0EA5E9)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            LUXCOR
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 72,
              letterSpacing: 6,
              color: "#C9A96E",
              marginLeft: 28,
            }}
          >
            AI
          </div>
        </div>

        {/* tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#d4d4d8",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Custom AI Automation for Growing Businesses
        </div>

        {/* footer */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: 4,
            color: "#0EA5E9",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#C9A96E",
              marginRight: 16,
            }}
          />
          luxcor.tech
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
