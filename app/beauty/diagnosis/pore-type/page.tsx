import type { Metadata } from "next"
import { PoreTypeDiagnosisClient } from "./PoreTypeDiagnosisClient"

export const metadata: Metadata = {
  title: "毛穴タイプ診断 | YokaUnit Beauty",
  description:
    "黒ずみ毛穴・開き毛穴・たるみ毛穴・詰まり毛穴の中から、あなたの毛穴タイプをチェックできる無料の毛穴診断ツール。毛穴悩みの原因とケアの方向性を知ることができます。",
}

export default function PoreTypeDiagnosisPage() {
  return <PoreTypeDiagnosisClient />
}

