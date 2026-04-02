import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt =
  "YokaUnit Movies｜何を観るか迷ったとき｜配信と評価で候補を絞る"

export const size = { width: 1200, height: 630 }

export const contentType = "image/png"

const NOTO_BOLD =
  "https://fonts.gstatic.com/s/notosansjp/v52/NotoSansJP-Bold.woff2"

export default async function Image() {
  let fonts: {
    name: string
    data: ArrayBuffer
    style: "normal"
    weight: 700
  }[] = []

  try {
    const res = await fetch(NOTO_BOLD)
    if (res.ok) {
      fonts = [
        {
          name: "Noto Sans JP",
          data: await res.arrayBuffer(),
          style: "normal",
          weight: 700,
        },
      ]
    }
  } catch {
    /* フォント取得失敗時は英字のみで描画 */
  }

  const fontFamily = fonts.length ? "Noto Sans JP" : "system-ui, sans-serif"

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(145deg, #06080f 0%, #0f172a 45%, #1c1917 100%)",
          padding: 56,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 56,
            width: 120,
            height: 4,
            background: "#fcd34d",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            color: "#f8fafc",
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            fontFamily,
          }}
        >
          YokaUnit Movies
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "#e2e8f0",
            lineHeight: 1.4,
            maxWidth: 920,
            fontFamily,
          }}
        >
          何を観るか迷ったとき
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 26,
            color: "#94a3b8",
            lineHeight: 1.45,
            maxWidth: 920,
            fontFamily,
          }}
        >
          契約中のVODと評価で、候補を絞る（デモ）
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "#fcd34d",
            fontFamily,
          }}
        >
          yokaunit.com/movies
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  )
}
