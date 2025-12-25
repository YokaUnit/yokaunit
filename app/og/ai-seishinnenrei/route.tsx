import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  const width = 1536
  const height = 1024

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
            "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(59,130,246,1) 50%, rgba(236,72,153,1) 100%)",
          color: "#ffffff",
          fontFamily: "Noto Sans JP, sans-serif",
          position: "relative",
        }}
      >
        {/* 装飾的な円 */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        
        {/* メインコンテンツ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 100,
              marginBottom: 30,
            }}
          >
            🧠
          </div>
          <div
            style={{
              fontSize: 90,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.2,
              padding: "0 80px",
              textShadow:
                "0 4px 12px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.4)",
              marginBottom: 30,
            }}
          >
            AI精神年齢診断
          </div>
          <div
            style={{
              fontSize: 40,
              opacity: 0.95,
              textAlign: "center",
              padding: "0 100px",
              lineHeight: 1.4,
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            あなたの心理年齢は何歳？5つの質問でAIが即診断
          </div>
          <div
            style={{
              marginTop: 50,
              display: "flex",
              gap: 20,
              fontSize: 30,
              opacity: 0.9,
            }}
          >
            <span>⚡ 30秒診断</span>
            <span>💯 完全無料</span>
            <span>📱 スマホ対応</span>
          </div>
        </div>
        
        <div
          style={{
            position: "absolute",
            bottom: 50,
            right: 60,
            fontSize: 40,
            fontWeight: 700,
            opacity: 0.95,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
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



