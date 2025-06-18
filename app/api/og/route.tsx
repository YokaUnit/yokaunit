import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "YokaUnit"
    const description = searchParams.get("description") || "便利なWebツール集"
    const type = searchParams.get("type") || "default"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
          backgroundImage: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 30,
            }}
          >
            <span
              style={{
                fontSize: 60,
                fontWeight: "bold",
                color: "white",
              }}
            >
              YU
            </span>
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "white",
            }}
          >
            YokaUnit
          </div>
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: 20,
            maxWidth: 800,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.8)",
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          {description}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
