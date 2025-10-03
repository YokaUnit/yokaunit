"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { RelatedTools } from "@/components/related-tools"
import OnsenMapClient from "./OnsenMapClient"
import RecommendedHotels from "./components/RecommendedHotels"
import {
  Crown,
  MapPin,
  Star,
  TrendingUp,
  Search,
  Filter,
  Info,
  Share2,
  Twitter,
  Copy,
  Check,
  Heart,
  Building2,
  Users,
  Mail,
  Phone,
  ExternalLink,
  MessageCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function OnsenMapClientPage() {
  const [copiedUrl, setCopiedUrl] = useState(false)

  // 共有機能
  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = "2025年温泉ランキングマップ | 日本全国の名湯100選"
    const text = "日本全国の温泉ランキングを地図で探索！評価・料金・口コミで比較検索できる温泉ガイド"

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "line":
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "native":
        if (navigator.share) {
          try {
            await navigator.share({
              title: title,
              text: text,
              url: url,
            })
          } catch (err) {
            console.log("共有がキャンセルされました")
          }
        } else {
          toast({
            title: "共有機能が利用できません",
            description: "お使いのブラウザでは共有機能がサポートされていません",
            variant: "destructive",
          })
        }
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(url)
          setCopiedUrl(true)
          toast({
            title: "URLをコピーしました",
            description: "温泉ランキングマップのURLがクリップボードにコピーされました",
          })
          setTimeout(() => setCopiedUrl(false), 2000)
        } catch (err) {
          toast({
            title: "コピーに失敗しました",
            description: "手動でURLをコピーしてください",
            variant: "destructive",
          })
        }
        break
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* タイトルセクション */}
          <div className="text-center mb-6 md:mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">2025年温泉ランキングマップ</h1>
              <Crown className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-sm md:text-base text-gray-600 mb-3 max-w-4xl mx-auto">
              日本全国の名湯100選を地図上で探索できます。評価・料金・地域で絞り込み検索し、
              お気に入りの温泉を見つけましょう。各温泉の詳細情報、アクセス方法、料金を確認できます。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>全国100選</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>評価・口コミ</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>料金比較</span>
              </div>
              <Badge variant="outline" className="text-xs">
                ※データ登録時より変動している可能性があります
              </Badge>
            </div>
          </div>

          {/* 地図エリア */}
          <div className="h-[calc(100vh-280px)] min-h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <OnsenMapClient />
          </div>

          {/* 共有セクション */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 md:p-6 shadow-lg border border-blue-200/50">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Share2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">温泉ランキングマップを共有</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                友達や家族と温泉情報をシェアして、一緒に温泉旅行を計画しましょう
              </p>

              {/* 共有ボタン（デスクトップ・モバイル共通） */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  onClick={() => handleShare("twitter")}
                  className="bg-blue-500 hover:bg-blue-600 text-white h-12"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button onClick={() => handleShare("line")} className="bg-green-500 hover:bg-green-600 text-white h-12">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  LINE
                </Button>
                <Button
                  onClick={() => handleShare("native")}
                  className="bg-purple-500 hover:bg-purple-600 text-white h-12"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  共有をする
                </Button>
                <Button
                  onClick={() => handleShare("copy")}
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 h-12"
                >
                  {copiedUrl ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copiedUrl ? "コピー済み" : "URLコピー"}
                </Button>
              </div>
            </div>
          </div>

          {/* データ出典・情報源セクション */}
          <div className="mt-4 bg-white/70 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-sm border-l-4 border-blue-400">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-2">データ出典・情報源について</h3>
                <div className="text-xs text-gray-600 space-y-1.5">
                  <p>
                    本ページのランキング・評価情報は、
                    <a
                      href="https://onsen.nifty.com/rank/year/"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline mx-1"
                    >
                      ニフティ温泉 年間ランキング
                      <ExternalLink className="w-3 h-3 inline ml-0.5" />
                    </a>
                    や
                    <a
                      href="https://www.google.co.jp/maps?hl=ja"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline mx-1"
                    >
                      Googleマップ
                      <ExternalLink className="w-3 h-3 inline ml-0.5" />
                    </a>
                    の口コミ・評価数、各施設の公式サイトなどをもとに独自に集計・編集しています。
                  </p>
                  <p>
                    情報はできる限り最新のものを掲載していますが、営業時間・料金・施設内容などが変更となる場合もあります。
                    正確な情報については、必ず各施設の公式サイトまたは現地にてご確認ください。
                  </p>
                  <p>
                    掲載内容に誤りがある場合や掲載停止を希望される場合は、お手数ですが
                    <a href="/contact" className="text-blue-600 hover:text-blue-800 underline mx-1">
                      お問い合わせフォーム
                    </a>
                    よりご連絡ください。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 使い方セクション - コンパクト */}
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-lg">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">使い方ガイド</h2>
              <p className="text-sm text-gray-600">効率的に理想の温泉を見つけるための3ステップ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
              {/* 検索機能 */}
              <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-2 md:pb-3">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                    <Search className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-sm md:text-lg">検索・絞り込み</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                    温泉名や地域で検索し、評価・料金で絞り込み
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1 hidden md:block">
                    <li>• 温泉名・地域での検索</li>
                    <li>• ランキング・評価順ソート</li>
                    <li>• 料金帯での絞り込み</li>
                  </ul>
                </CardContent>
              </Card>

              {/* 地図操作 */}
              <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-2 md:pb-3">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                    <MapPin className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-sm md:text-lg">ピンをクリック</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                    地図上のピンをクリックして詳細情報を確認
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1 hidden md:block">
                    <li>• ピンクリックで詳細表示</li>
                    <li>• ズーム操作で拡大・縮小</li>
                    <li>• 検索結果から直接移動</li>
                  </ul>
                </CardContent>
              </Card>

              {/* 詳細情報 */}
              <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-2 md:pb-3">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                    <Info className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-sm md:text-lg">詳細・予約</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                    詳細ページで情報確認、予約サイトへ移動
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1 hidden md:block">
                    <li>• 営業時間・料金・アクセス</li>
                    <li>• 温泉の特徴・設備情報</li>
                    <li>• 公式サイト・予約リンク</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* 特徴 - モバイルでコンパクト */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 text-sm">
              <div className="text-center p-2 md:p-3 bg-blue-50 rounded-lg">
                <Crown className="w-4 h-4 md:w-6 md:h-6 text-yellow-500 mx-auto mb-1" />
                <p className="font-medium text-gray-900 text-xs md:text-sm">ランキング順</p>
                <p className="text-gray-600 text-xs">TOP100選</p>
              </div>
              <div className="text-center p-2 md:p-3 bg-green-50 rounded-lg">
                <MapPin className="w-4 h-4 md:w-6 md:h-6 text-green-600 mx-auto mb-1" />
                <p className="font-medium text-gray-900 text-xs md:text-sm">地図で探索</p>
                <p className="text-gray-600 text-xs">視覚的検索</p>
              </div>
              <div className="text-center p-2 md:p-3 bg-purple-50 rounded-lg">
                <Filter className="w-4 h-4 md:w-6 md:h-6 text-purple-600 mx-auto mb-1" />
                <p className="font-medium text-gray-900 text-xs md:text-sm">詳細フィルター</p>
                <p className="text-gray-600 text-xs">条件絞り込み</p>
              </div>
              <div className="text-center p-2 md:p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-orange-600 mx-auto mb-1" />
                <p className="font-medium text-gray-900 text-xs md:text-sm">最新情報</p>
                <p className="text-gray-600 text-xs">2025年版</p>
              </div>
            </div>
          </div>

          {/* 宿泊・キャンペーンPRセクション */}
          <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 md:p-6 shadow-lg border border-orange-200">
            <div className="text-center mb-4 md:mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">お得な宿泊・キャンペーン情報</h2>
              </div>
              <p className="text-sm text-gray-600">特別プランで温泉旅行をもっとお得に楽しもう</p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="bg-white/80 rounded-lg p-3 md:p-4 border border-orange-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">
                      温泉宿泊プラン特集
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">
                      ランキング上位の温泉宿で特別プランをご用意。最大30%OFF + 特典付きプランも多数！
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="destructive" className="text-xs">
                        期間限定
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        最大30%OFF
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-1 shrink-0">
                    詳細を見る
                  </Button>
                </div>
              </div>

              <div className="bg-white/80 rounded-lg p-3 md:p-4 border border-orange-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">
                      企業・団体向け温泉ツアー
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">
                      社員旅行や団体旅行に最適な温泉ツアープランをご提案。貸切プランや特別料金でご案内。
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        団体割引
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        貸切可能
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 text-xs md:text-sm bg-transparent shrink-0"
                  >
                    お問い合わせ
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 楽天APIを使ったおすすめホテル一覧 */}
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
            <RecommendedHotels 
              title="楽天トラベル おすすめホテル" 
              maxHotels={6} 
            />
          </div>

          {/* お問い合わせセクション */}
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
            <div className="text-center mb-4 md:mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">お問い合わせ</h2>
              </div>
              <p className="text-sm text-gray-600">ご質問・ご要望はお気軽にどうぞ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Building2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">企業・法人の方</h3>
                </div>
                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
                  広告掲載、宿泊施設の掲載、企業向けプランのご相談など、ビジネスに関するお問い合わせ
                </p>
                <Button
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm"
                  asChild
                >
                  <a href="/contact">
                    <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    企業向けお問い合わせ
                  </a>
                </Button>
              </div>

              <div className="bg-green-50 rounded-lg p-3 md:p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">一般の方</h3>
                </div>
                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
                  サイトの使い方、温泉情報の修正依頼、その他ご質問・ご要望など、一般的なお問い合わせ
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50 text-xs md:text-sm bg-transparent"
                  asChild
                >
                  <a href="/contact">
                    <Phone className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    一般お問い合わせ
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <RelatedTools currentToolSlug="onsenmap" />

      <SiteFooter />
    </div>
  )
}
