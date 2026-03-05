import { Metadata } from "next"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Droplets, Palette, Sparkle, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "YokaUnit Beauty - 無料で使える美容診断・美容ツール集",
  description:
    "YokaUnit Beautyは、肌質診断・毛穴タイプ診断・パーソナルカラー診断などで「自分に本当に合う美容」が分かる無料の美容診断メディアです。登録不要で、肌・コスメ・ヘアの悩みを診断から解決へ。",
  openGraph: {
    title: "YokaUnit Beauty - 無料美容診断ポータル",
    description:
      "肌質診断・毛穴タイプ診断・パーソナルカラー診断など、診断から自分に合う美容が分かる無料ツールを提供する美容専門メディア。",
    url: "https://yokaunit.com/beauty",
    siteName: "YokaUnit Beauty",
    images: [
      {
        url: "/logo_heart.png",
        width: 800,
        height: 800,
        alt: "YokaUnit Beauty ロゴ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://yokaunit.com/beauty",
  },
}

const diagnosisCards = [
  {
    href: "/beauty/diagnosis/pore-type",
    title: "毛穴タイプ診断",
    label: "イチオシ",
    description: "黒ずみ・開き・たるみ…毛穴悩みのタイプに合わせたケアの方向性を診断。",
    icon: <Sparkles className="h-5 w-5 text-rose-500" />,
    status: "now" as const,
    image: "/beauty/diagnosis/pore-type.png",
  },
  {
    href: "/beauty/diagnosis/skin-type",
    title: "肌質診断",
    label: "まずはここから",
    description: "乾燥肌・脂性肌・混合肌・普通肌…あなたの素肌タイプを1〜2分でチェック。",
    icon: <Droplets className="h-5 w-5 text-rose-400" />,
    status: "now" as const,
    image: "/beauty/diagnosis/skin-type.png.png",
  },
  {
    href: "/beauty/diagnosis/personal-color",
    title: "パーソナルカラー診断",
    label: "準備中",
    description: "似合う色・コスメ・ファッションの方向性が分かるベース診断。",
    icon: <Palette className="h-5 w-5 text-rose-400" />,
    status: "coming" as const,
  },
]

const toolCards = [
  {
    href: "/beauty/tools/skincare-routine",
    title: "スキンケアルーティン診断",
    description: "今のスキンケアが合っているか、ステップごとにチェック。",
    status: "coming" as const,
  },
  {
    href: "/beauty/tools/cosmetic-expiry",
    title: "コスメ使用期限チェッカー",
    description: "開封日から、そろそろ替えどきのコスメをチェック。",
    status: "coming" as const,
  },
]

export default function BeautyHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BeautySiteHeader />
      <BeautyBackgroundAnimation />
      <ScrollToTop />

      <main className="flex-1 relative">
        {/* ヒーローセクション */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="rounded-3xl border border-gray-100 bg-white/90 shadow-lg overflow-hidden flex flex-col md:grid md:grid-cols-2">
              {/* 画像（モバイルは上、PCは左） */}
              <div className="relative h-52 md:h-80">
                <Image
                  src="/beauty/hero-skin.png"
                  alt="スキンケアをしている女性の頬"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
              {/* テキスト */}
              <div className="flex flex-col justify-center gap-4 px-5 py-6 md:px-8 md:py-10 text-center md:text-left">
                <div className="inline-flex items-center justify-center md:justify-start gap-2 rounded-full bg-gray-50 px-3 py-1 border border-gray-100 w-fit mx-auto md:mx-0">
                  <Sparkle className="h-4 w-4 text-rose-500" />
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-gray-600 uppercase">
                    Beauty Diagnosis
                  </p>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                  診断から、あなた専用の美容が見つかる。
                </h1>
                <p className="text-xs md:text-sm text-gray-700 max-w-md mx-auto md:mx-0">
                  毛穴・肌質などを1〜2分で無料チェックして、自分に合ったケアの方向性を知ることができます。
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                  <Link href="/beauty/diagnosis/pore-type">
                    <button className="inline-flex items-center rounded-full bg-rose-500 px-4 py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition-colors">
                      毛穴タイプ診断を今すぐはじめる
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </Link>
                  <Link href="/beauty/diagnosis/skin-type">
                    <button className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1.5 text-xs md:text-sm text-gray-800 hover:bg-gray-50 transition-colors">
                      肌質診断もチェックする
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 診断一覧＋サイドバー */}
        <section className="container mx-auto px-4 pt-6 pb-10 md:pb-16">
          <div className="mb-4 md:mb-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-1">Diagnosis</p>
            <h2 className="text-base md:text-xl font-bold text-gray-900">
              あなたに合う美容が分かる診断メニュー
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {diagnosisCards.map((card) => (
                  <Link
                    key={card.href}
                    href={card.status === "now" ? card.href : "#"}
                    aria-disabled={card.status === "coming"}
                    className={card.status === "coming" ? "cursor-not-allowed" : ""}
                  >
                    <Card
                      className={`h-full hover-lift transition-all duration-300 border-gray-100 ${
                        card.status === "now" ? "bg-white" : "bg-white/90"
                      }`}
                    >
                      {card.image && (
                        <div className="relative w-full overflow-hidden aspect-[4/3]">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50">
                              {card.icon}
                            </div>
                            <CardTitle className="text-base md:text-lg text-gray-900">{card.title}</CardTitle>
                          </div>
                          <Badge
                            className={
                              card.status === "now"
                                ? "bg-rose-500 text-white text-xs"
                                : "bg-rose-100 text-rose-500 text-xs"
                            }
                          >
                            {card.label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-1">
                        <p className="text-xs md:text-sm text-gray-700 mb-3">{card.description}</p>
                        {card.status === "now" ? (
                          <span className="inline-flex items-center text-[11px] md:text-xs font-medium text-rose-600">
                            無料診断をはじめる
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[11px] md:text-xs font-medium text-gray-400">
                            近日公開予定
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3 text-xs md:text-sm text-gray-800">
                <p className="font-semibold mb-1 text-gray-900">このサイトでできること</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                    <span>毛穴タイプ診断・肌質診断で、自分の肌悩みの「原因タイプ」が分かる</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                    <span>タイプ別のNGケア / OKケアから、今日から変えるべきポイントが見える</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                    <span>今後は、診断タイプに合ったスキンケアルーティンやアイテムも紹介予定</span>
                  </li>
                </ul>
              </div>

              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm md:text-base text-gray-900">
                    美容ツール（近日追加予定）
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {toolCards.map((tool) => (
                    <div
                      key={tool.href}
                      className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-xs font-semibold text-gray-800">{tool.title}</p>
                        <Badge className="bg-rose-100 text-rose-500 text-[10px]">準備中</Badge>
                      </div>
                      <p className="text-[11px] text-gray-700 leading-relaxed">{tool.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-rose-500 to-pink-500 text-white border-none shadow-lg">
                <CardContent className="pt-4 pb-4">
                  <p className="text-xs font-semibold mb-1">Coming soon</p>
                  <p className="text-sm md:text-base font-bold mb-2">
                    美容記事で、診断の「理由」も一緒に解説
                  </p>
                  <p className="text-[11px] md:text-xs text-rose-50 leading-relaxed">
                    「なぜこのケアが自分に合うのか？」まで分かる、美容記事エリアを準備中です。
                    スキンケア・メイク・ヘアケアの3つのカテゴリから少しずつ公開していきます。
                  </p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>

      <BeautySiteFooter />
    </div>
  )
}

