import type { SleepPostureBand } from "../lib/types"

/** A8 素材010（300×250）・素材004（テキスト）— 掲載内容変更時はA8管理画面のコードに合わせて更新 */
const BANNER_HREF = "https://px.a8.net/svt/ejp?a8mat=4B1KXN+DTQHLE+4GZK+60H7L"
const BANNER_IMG =
  "https://www23.a8.net/svt/bgt?aid=260414267836&wid=005&eno=01&mid=s00000020864001010000&mc=1"
const BANNER_PIXEL = "https://www18.a8.net/0.gif?a8mat=4B1KXN+DTQHLE+4GZK+60H7L"

const TEXT_HREF = "https://px.a8.net/svt/ejp?a8mat=4B1KXN+DTQHLE+4GZK+5Z6WY"
const TEXT_PIXEL = "https://www18.a8.net/0.gif?a8mat=4B1KXN+DTQHLE+4GZK+5Z6WY"

function bridgeLine(band: SleepPostureBand): string {
  switch (band) {
    case "a":
      return "今の状態を維持しつつ、将来に向けて「首の安定」と枕の関係を知っておくのも一案です。"
    case "b":
      return "首まわりの状態に波がありやすい傾向でした。枕のフィットは要因のひとつなので、構造や試し方を公式で比較する参考にどうぞ。"
    case "c":
      return "睡眠環境の影響が出やすい傾向です。枕だけでなくマットレスとの組み合わせも含め、仕様は販売ページでご確認ください。"
    case "d":
      return "見直しの余地が大きい傾向でした。生活習慣に加え、寝具は個人差が大きいため、特徴を理解したうえで検討すると判断しやすいです。"
    default:
      return "枕の選び方は個人差が大きいです。気になる方は公式情報を参考にしてください。"
  }
}

interface AffiliateMakuraSectionProps {
  band: SleepPostureBand
}

/**
 * Cure:Re THE MAKURA（A8）— 診断結果の直後に表示。医療効果を断定しない文脈で案内する。
 */
export function AffiliateMakuraSection({ band }: AffiliateMakuraSectionProps) {
  return (
    <section
      className="rounded-xl border border-gray-200/90 bg-white/90 backdrop-blur-sm p-6 shadow-md text-left"
      aria-labelledby="affiliate-makura-heading"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h3 id="affiliate-makura-heading" className="text-base font-semibold text-gray-800">
          枕を選ぶときの参考（公式情報）
        </h3>
        <span className="text-[11px] text-gray-500 tabular-nums shrink-0">PR</span>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">{bridgeLine(band)}</p>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        特許取得の構造など、仕様の確認は販売ページが確実です。価格・返品・配送は必ず公式でご確認ください。
      </p>

      <div className="flex flex-col items-center gap-3">
        <a
          href={BANNER_HREF}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-block rounded-md overflow-hidden border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- 外部ASP計測用バナー */}
          <img src={BANNER_IMG} width={300} height={250} alt="Cure:Re THE MAKURA（詳細はリンク先）" className="block max-w-full h-auto" />
        </a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BANNER_PIXEL} width={1} height={1} alt="" className="hidden" aria-hidden />

        <p className="text-xs text-gray-500 w-full text-center sm:text-left leading-relaxed">
          画像が出ない場合は
          <a
            href={TEXT_HREF}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="text-gray-700 underline underline-offset-2"
          >
            テキストリンク
          </a>
          から開けます。
        </p>
        <p className="text-[11px] text-gray-500 w-full leading-relaxed">
          ※本リンクは広告です。効果には個人差があります。
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TEXT_PIXEL} width={1} height={1} alt="" className="hidden" aria-hidden />
      </div>
    </section>
  )
}
