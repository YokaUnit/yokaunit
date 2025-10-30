import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  const width = 1200
  const height = 630

  return new ImageResponse(
    (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(59,130,246,1) 100%)",
          color: "#ffffff",
          fontFamily: "Noto Sans JP, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            padding: "0 60px",
            textShadow:
              "0 2px 6px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          AI精神年齢診断
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            opacity: 0.95,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          あなたの心理年齢は何歳？5つの質問でAIが即診断。
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 40,
            fontSize: 28,
            fontWeight: 700,
            opacity: 0.95,
          }}
        >
          yokaunit.com
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  )
}


