import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Heart, Lightbulb, Users, Mail, ExternalLink, Clock, Shield, Smartphone, Zap, Globe, Code, MessageCircle, HelpCircle, Calendar, Star, Award, Target, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import { BackgroundAnimation } from "@/components/background-animation"

export const metadata: Metadata = {
  title: "当サイトについて | YokaUnit - 日常に役立つ便利ツール集の詳細情報",
  description:
    "YokaUnit（ヨカユニット）は、パスワード生成・割り勘計算・温泉マップ・ゲームなど、日常や仕事で使える便利なWebツールを無料提供。個人開発者が運営し、ユーザビリティとSEO対策を重視した設計。登録不要・広告控えめで誰でも快適に利用可能。",
  keywords: [
    "YokaUnit",
    "ヨカユニット",
    "無料ツール",
    "Webツール",
    "オンラインツール",
    "便利ツール",
    "個人開発",
    "パスワード生成",
    "割り勘計算",
    "温泉マップ",
    "ゲーム",
    "登録不要",
    "広告なし",
    "スマホ対応",
    "SEO対策",
    "サイト概要",
    "運営者情報",
    "使い方",
    "機能紹介",
    "日本語ツール",
    "プライバシー保護",
    "セキュリティ",
    "ユーザビリティ",
    "レスポンシブデザイン",
  ],
  openGraph: {
    title: "当サイトについて | YokaUnit - 便利ツール集の運営方針とサービス詳細",
    description:
      "個人開発者が運営するYokaUnitの詳細情報。無料で使える便利ツールの開発方針、プライバシー保護への取り組み、今後の開発予定など、サイトの全てをご紹介します。",
    url: "https://yokaunit.com/about",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnit 当サイトについて - 便利ツール集の詳細情報",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "当サイトについて | YokaUnit 🛠️",
    description:
      "個人開発者が作る無料便利ツール集の裏話とこだわり✨ユーザビリティ重視・プライバシー保護・継続開発の取り組みをご紹介🚀",
    images: ["/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com/about",
  },
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "当サイトについて", href: "/about" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            {/* ヒーローセクション */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-4">
                <Info className="h-4 w-4" />
                About
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                あなたの"知りたい"と"使いたい"を叶えるツールサイト
              </h1>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                YokaUnit（ヨカユニット）は、日常に役立つWebツールを集めた無料サービスです。
              </p>
              <p className="text-gray-600 max-w-2xl mx-auto">
                検索・診断・マップ・計算…多様な便利機能を1つの場所で。
                <br />
                すべてのツールはシンプル・高速・スマホ対応。
              </p>
            </div>

            <div className="grid gap-6">
              {/* YokaUnitとは？ */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    YokaUnitとは？
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    YokaUnit（ヨカユニット）は、「暮らし・遊び・趣味・旅行」など、さまざまなジャンルの"役立つツール"を集めたWebサービスです。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    検索でも、シェアでも、たまたまでも。
                    <br />
                    一度使えばもう一度使いたくなる。
                    <br />
                    そんな「日常にちょっと便利な体験」を、軽やかなデザインとともにお届けします。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    YokaUnit（ヨカユニット）は、「役立つ × 楽しい」をテーマに、誰でも使える便利なツールを提供するWebサービスです。
                    検索に強く、SNSで拡散しやすい構造を備えたツールが中心で、スマホでも快適に使えるUIを追求しています。
                  </p>
                </CardContent>
              </Card>

              {/* 特徴・強み */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    特徴・強み
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50/80 rounded-lg border border-blue-100">
                      <h3 className="font-semibold text-blue-900 mb-2">UIにこだわった設計</h3>
                      <p className="text-sm text-blue-800">
                        モバイル最適化・軽量・広告控えめで使いやすさ重視
                      </p>
                    </div>
                    <div className="p-4 bg-green-50/80 rounded-lg border border-green-100">
                      <h3 className="font-semibold text-green-900 mb-2">SEO & SNSに強い</h3>
                      <p className="text-sm text-green-800">
                        診断・ランキング・マップ形式など、自然とシェアされる導線
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50/80 rounded-lg border border-purple-100">
                      <h3 className="font-semibold text-purple-900 mb-2">幅広いジャンル対応</h3>
                      <p className="text-sm text-purple-800">
                        美容、旅行、心理、ゲームなどジャンルを超えてツール展開が可能
                      </p>
                    </div>
                    <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-100">
                      <h3 className="font-semibold text-amber-900 mb-2">継続的な開発</h3>
                      <p className="text-sm text-amber-800">
                        新しいツールを毎月追加予定。ユーザーの声をもとに改善も実施しています。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* サイトの歴史・開発背景 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    YokaUnitの歴史と開発背景
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    YokaUnitは2024年に「日常のちょっとした不便を解決したい」という想いから生まれました。開発者自身が実際に困った場面で使いたいと思うツールを中心に、一つひとつ丁寧に作り上げています。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    最初に開発したのは<a href="/tools/password" className="text-blue-600 hover:underline">パスワード生成ツール</a>でした。既存のサービスは広告が多すぎたり、使いにくかったりと、本当に必要な時にストレスを感じることが多かったからです。「シンプルで使いやすく、広告に邪魔されない」というコンセプトはここから始まりました。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    その後、飲み会での精算に困った経験から<a href="/tools/warikan" className="text-blue-600 hover:underline">割り勘計算ツール</a>を、旅行先で温泉を探す際の不便さから<a href="/tools/onsenmap" className="text-blue-600 hover:underline">温泉マップ</a>を開発。それぞれのツールは実際の体験に基づいており、「本当に使える」ものになるよう心がけています。
                  </p>
                  <div className="bg-indigo-50/80 p-4 rounded-lg border border-indigo-100">
                    <h4 className="font-semibold text-indigo-900 mb-2">開発哲学</h4>
                    <ul className="text-sm text-indigo-800 space-y-1">
                      <li>• 実際の困りごとから生まれるツール</li>
                      <li>• ユーザーファーストの設計思想</li>
                      <li>• 継続的な改善とアップデート</li>
                      <li>• プライバシーとセキュリティの重視</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 主要ツール紹介 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    主要ツールのご紹介
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">💻 実用ツール</h4>
                      <div className="space-y-2">
                        <div className="border-l-4 border-blue-400 pl-3">
                          <a href="/tools/password" className="text-blue-600 hover:underline font-medium">パスワード生成ツール</a>
                          <p className="text-sm text-gray-600">セキュアなパスワードを瞬時に生成。文字種や長さを細かく設定可能</p>
                        </div>
                        <div className="border-l-4 border-green-400 pl-3">
                          <a href="/tools/warikan" className="text-blue-600 hover:underline font-medium">秒割り（割り勘計算）</a>
                          <p className="text-sm text-gray-600">飲み会や旅行の精算を3秒で完了。誰が誰にいくら払うかも自動計算</p>
                        </div>
                        <div className="border-l-4 border-purple-400 pl-3">
                          <a href="/tools/excel" className="text-blue-600 hover:underline font-medium">Excel2048</a>
                          <p className="text-sm text-gray-600">Excelの見た目をした2048ゲーム。表計算作業をしているように見えて実はゲーム</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">🎮 エンタメ・ゲーム</h4>
                      <div className="space-y-2">
                        <div className="border-l-4 border-red-400 pl-3">
                          <a href="/tools/chinchiro" className="text-blue-600 hover:underline font-medium">チンチロリン</a>
                          <p className="text-sm text-gray-600">本格的なサイコロゲーム。アニメーション付きで臨場感抜群</p>
                        </div>
                        <div className="border-l-4 border-pink-400 pl-3">
                          <a href="/tools/sakura2048" className="text-blue-600 hover:underline font-medium">サクラ2048</a>
                          <p className="text-sm text-gray-600">サクラエディタの見た目をした2048ゲーム。仕事中でも上司にばれずに楽しめる</p>
                        </div>
                        <div className="border-l-4 border-orange-400 pl-3">
                          <a href="/tools/bombcard" className="text-blue-600 hover:underline font-medium">ボムカードゲーム</a>
                          <p className="text-sm text-gray-600">スリル満点のカードゲーム。友人や家族と楽しめる</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50/80 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-2">🗾 特別なツール</h4>
                    <div className="border-l-4 border-blue-500 pl-3">
                      <a href="/tools/onsenmap" className="text-blue-600 hover:underline font-medium">全国温泉マップ</a>
                      <p className="text-sm text-blue-800">全国47都道府県の温泉情報を網羅。地図上で直感的に温泉を探せる本格的なマップツール。旅行計画にも最適で、温泉の詳細情報や口コミも確認できます。</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 技術・開発方針 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-600" />
                    技術への取り組みと開発方針
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50/80 rounded-lg border">
                      <Smartphone className="h-6 w-6 text-blue-600 mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-2">レスポンシブデザイン</h4>
                      <p className="text-sm text-gray-700">
                        スマートフォン・タブレット・PCのすべてのデバイスで快適に利用できるよう、モバイルファーストで設計しています。
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50/80 rounded-lg border">
                      <Shield className="h-6 w-6 text-green-600 mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-2">プライバシー保護</h4>
                      <p className="text-sm text-gray-700">
                        多くのツールでデータはブラウザ内で処理し、サーバーに送信しません。<a href="/privacy-policy" className="text-blue-600 hover:underline">プライバシーポリシー</a>で詳細を確認できます。
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50/80 rounded-lg border">
                      <Globe className="h-6 w-6 text-purple-600 mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-2">SEO最適化</h4>
                      <p className="text-sm text-gray-700">
                        検索エンジンで見つけやすく、SNSでシェアしやすい構造を採用。必要な時にすぐアクセスできます。
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    使用技術はNext.js、TypeScript、Tailwind CSSを中心とした現代的なWeb技術スタックを採用。高速な読み込み速度と滑らかなユーザー体験を実現しています。また、継続的インテグレーション（CI/CD）により、バグ修正や新機能の追加を迅速に行っています。
                  </p>
                </CardContent>
              </Card>

              {/* ユーザーの使用例・活用方法 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-600" />
                    ユーザーの活用例とご感想
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50/80 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-900 mb-2">💼 ビジネスシーン</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• 会社の歓送迎会での割り勘計算</li>
                        <li>• セキュアなパスワード作成でセキュリティ向上</li>
                        <li>• 出張先での温泉探し・リフレッシュ</li>
                        <li>• チームビルディングでのゲーム活用</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50/80 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-green-900 mb-2">🏠 プライベート</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• 家族旅行での温泉選びと計画立て</li>
                        <li>• 友人との食事会の精算</li>
                        <li>• 各種アカウントのパスワード管理</li>
                        <li>• 休憩時間のゲームでリフレッシュ</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-amber-900 mb-2">👥 よくいただくご感想</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
                      <div>
                        <p className="italic">"広告が少なくて使いやすい！"</p>
                        <p className="italic">"スマホでサクサク動く"</p>
                        <p className="italic">"登録不要なのが便利"</p>
                      </div>
                      <div>
                        <p className="italic">"温泉マップがとても詳しい"</p>
                        <p className="italic">"割り勘が一瞬で終わる"</p>
                        <p className="italic">"デザインがきれい"</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* よくある質問 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    よくある質問
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-gray-900">Q. 本当に無料で使えるのですか？</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        A. はい、基本的なツールはすべて無料でご利用いただけます。<a href="/premium" className="text-blue-600 hover:underline">プレミアムプラン</a>では広告の削減や追加機能をご提供していますが、多くの方に無料で価値を提供し続けたいと考えています。
                      </p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-gray-900">Q. データの安全性は大丈夫ですか？</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        A. 多くのツールではデータをサーバーに送信せず、ブラウザ内で処理を完結させています。詳しくは<a href="/privacy-policy" className="text-blue-600 hover:underline">プライバシーポリシー</a>をご確認ください。
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-gray-900">Q. 新しいツールの開発予定はありますか？</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        A. はい、継続的に新しいツールを開発しています。ユーザーの皆様からのご要望も<a href="/contact" className="text-blue-600 hover:underline">お問い合わせフォーム</a>で受け付けております。
                      </p>
                    </div>
                  </div>
                  <div className="text-center pt-2">
                    <a
                      href="/faq"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <HelpCircle className="h-4 w-4" />
                      さらに詳しいFAQはこちら
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* 今後の予定・ロードマップ */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    今後の開発予定とロードマップ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    YokaUnitは常に進化し続けるサービスを目指しています。ユーザーの皆様のフィードバックを基に、以下のような改善と新機能開発を予定しています。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50/80 rounded-lg border border-orange-100">
                      <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        短期目標（1-3ヶ月）
                      </h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• 既存ツールのUI/UX改善</li>
                        <li>• 新しい実用ツールの追加</li>
                        <li>• モバイル体験のさらなる向上</li>
                        <li>• ページ表示速度の最適化</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50/80 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        中長期目標（3-12ヶ月）
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• APIの公開とサードパーティ連携</li>
                        <li>• 多言語対応（英語・中国語など）</li>
                        <li>• PWA対応によるオフライン利用</li>
                        <li>• コミュニティ機能の追加</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50/80 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-green-900 mb-2">✨ 開発中の新機能</h4>
                    <p className="text-sm text-green-800">
                      現在、QRコード生成ツール、テキスト変換ツール、画像リサイズツールなど、日常的によく使われるツールの開発を進めています。また、既存の温泉マップに口コミ機能や写真投稿機能の追加も検討中です。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* コミュニティ・サポート */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-teal-600" />
                    コミュニティとサポート
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    YokaUnitは個人開発プロジェクトですが、ユーザーの皆様との繋がりを大切にしています。ご質問、ご要望、バグ報告など、どんなことでもお気軽にお声がけください。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-teal-50/80 rounded-lg border border-teal-100">
                      <h4 className="font-semibold text-teal-900 mb-2">📧 お問い合わせ方法</h4>
                      <div className="space-y-2 text-sm text-teal-800">
                        <p>
                          <a href="/contact" className="text-teal-600 hover:underline">お問い合わせフォーム</a> - 最も確実な連絡方法
                        </p>
                        <p>
                          <a href="mailto:yokaunit.info@gmail.com" className="text-teal-600 hover:underline">メール直接送信</a> - yokaunit.info@gmail.com
                        </p>
                        <p>SNSでのご連絡も大歓迎です（Twitter: @yokaunit）</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50/80 rounded-lg border">
                      <h4 className="font-semibold text-gray-900 mb-2">⚡ サポート対応時間</h4>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p>平日: 24時間以内の返信を心がけています</p>
                        <p>土日祝: 48時間以内の返信を目標としています</p>
                        <p>緊急のバグ修正: 可能な限り迅速に対応</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50/80 rounded-lg border border-yellow-100">
                    <h4 className="font-semibold text-yellow-900 mb-2">🤝 企業・団体のお客様</h4>
                    <p className="text-sm text-yellow-800">
                      法人でのご利用、カスタマイズのご依頼、API利用のご相談などは<a href="/corporate" className="text-yellow-600 hover:underline">企業向けページ</a>をご覧ください。請求書払いやSLA契約など、法人様向けのサービスもご用意しています。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 運営者について */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    運営者について
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    YokaUnitは個人開発者により運営されています。フロントエンド／バックエンドの設計からデザイン・SEOまで、全てを自ら行っています。
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-gray-50/80 rounded-lg border">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      ご依頼やお問い合わせは 
                      <a href="mailto:yokaunit.info@gmail.com" className="text-blue-600 hover:underline ml-1">
                        yokaunit.info@gmail.com
                      </a> 
                      までお気軽にどうぞ。
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* プライバシーとセキュリティ */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    プライバシーとセキュリティへの取り組み
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    YokaUnitでは、ユーザーの皆様のプライバシー保護とデータセキュリティを最優先事項として取り組んでいます。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">🔒 データ保護の取り組み</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 多くのツールでクライアントサイド処理を採用</li>
                        <li>• HTTPS通信による暗号化</li>
                        <li>• 最小限のデータ収集ポリシー</li>
                        <li>• 定期的なセキュリティ監査</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">📋 透明性の確保</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <a href="/privacy-policy" className="text-blue-600 hover:underline">詳細なプライバシーポリシー</a></li>
                        <li>• <a href="/legal" className="text-blue-600 hover:underline">利用規約</a>での明確な規定</li>
                        <li>• Cookie使用状況の開示</li>
                        <li>• データ削除リクエストへの対応</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50/80 rounded-lg border border-emerald-100">
                    <h4 className="font-semibold text-emerald-900 mb-2">🛡️ セキュリティ上の注意事項</h4>
                    <p className="text-sm text-emerald-800">
                      特にパスワード生成ツールなどのセキュリティ関連ツールについては、生成されたパスワードがサーバーに送信されることはありません。すべての処理はお使いのブラウザ内で完結し、当サイトが皆様のパスワードを知ることはありません。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 利用・シェアのお願い */}
              <Card className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm shadow-lg border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-600" />
                    利用・シェアのお願い
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    ツールの利用は完全無料です。SNSでのシェアやご紹介が大きな励みになります。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    気に入ったツールがあれば、ぜひ拡散していただけると嬉しいです。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Mail className="h-4 w-4" />
                      お問い合わせ
                    </a>
                    <a
                      href="/tools"
                      className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      ツール一覧を見る
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* 関連ページへのリンク集 */}
              <Card className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm shadow-lg border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    サイト内のご案内
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">🛠️ ツール・機能</h4>
                      <div className="space-y-2 text-sm">
                        <a href="/tools" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          ツール一覧 - 全ツールを確認
                        </a>
                        <a href="/tools/password" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          パスワード生成ツール
                        </a>
                        <a href="/tools/warikan" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          秒割り（割り勘計算）
                        </a>
                        <a href="/tools/onsenmap" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          全国温泉マップ
                        </a>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">ℹ️ サポート・情報</h4>
                      <div className="space-y-2 text-sm">
                        <a href="/faq" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          よくある質問（FAQ）
                        </a>
                        <a href="/help" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          ヘルプ・使い方ガイド
                        </a>
                        <a href="/contact" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          お問い合わせフォーム
                        </a>
                        <a href="/corporate" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          企業・法人のお客様
                        </a>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">📄 規約・ポリシー</h4>
                      <div className="space-y-2 text-sm">
                        <a href="/legal" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          利用規約
                        </a>
                        <a href="/privacy-policy" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          プライバシーポリシー
                        </a>
                        <a href="/terms" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          サービス利用条件
                        </a>
                        <a href="/premium" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                          プレミアムプラン
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 最終的なCTA */}
              <Card className="bg-gradient-to-r from-green-50/80 to-blue-50/80 backdrop-blur-sm shadow-lg border-green-200">
                <CardContent className="p-8 text-center">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">YokaUnitで毎日をもっと便利に</h3>
                  <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                    私たちは「日常のちょっとした不便を解決する」をモットーに、
                    今日も新しいツールの開発に取り組んでいます。
                    あなたの貴重な時間を節約し、より良い体験を提供できるよう努めています。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/tools"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <Zap className="h-5 w-5" />
                      ツールを使ってみる
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Mail className="h-5 w-5" />
                      ご意見・ご要望をお聞かせください
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
} 