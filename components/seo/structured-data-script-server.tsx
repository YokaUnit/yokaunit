interface StructuredDataScriptProps {
  data: Record<string, unknown> | null
  id?: string
}

/**
 * Server Component 用の構造化データ（JSON-LD）出力。
 * `<head>` 内でも安全に使えるよう、Client境界を跨がない実装にする。
 */
export function StructuredDataScriptServer({ data, id = "structured-data" }: StructuredDataScriptProps) {
  if (!data) return null

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

