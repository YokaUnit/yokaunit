"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CorporateForm } from "@/components/corporate-form"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BackgroundAnimation } from "@/components/background-animation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  CircleDollarSign,
  Clock3,
  MessageSquare,
  Sparkles,
  Rocket,
  ShieldCheck,
  Store,
  Briefcase,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"

export default function CorporatePage() {
  const scrollToContact = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "企業の方へ", href: "/corporate" },
            ]}
          />

          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-8 mb-8"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              小さく始める法人向けプラン
            </Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              高額な制作会社ではなく、
              <br className="md:hidden" />
              <span className="text-blue-600">最短・低コストで成果を出す</span>選択肢
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              YokaUnitは「まず1ページ」「まず1機能」から始められる制作チームです。
              <br className="hidden md:block" />
              月額2万円台から、LP改善・SEO施策・ミニ開発を実行します。
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={scrollToContact} size="lg" className="bg-blue-600 hover:bg-blue-700">
                料金を相談する
              </Button>
              <Button onClick={scrollToContact} size="lg" variant="outline">
                7日お試しを申込む
              </Button>
            </div>
          </motion.section>

          {/* Key Points */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "初期費用0円", label: "月額プラン中心で開始しやすい", icon: CircleDollarSign },
                { title: "最短72時間", label: "初回改善案をスピード提案", icon: Clock3 },
                { title: "チャット伴走", label: "気軽に相談できる運用体制", icon: MessageSquare },
                { title: "1ヶ月単位", label: "縛りが少なく試しやすい", icon: ShieldCheck },
              ].map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                    <point.icon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-base font-bold text-gray-900">{point.title}</div>
                    <div className="text-xs text-gray-600">{point.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Differentiation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">大手制作会社との違い</h2>
              <p className="text-sm text-gray-600">必要な範囲だけ、必要な期間だけ。固定費を抑えて改善できます。</p>
              <p className="text-xs text-blue-600 mt-1">
                ※全プラン、要件が増えない限り月内の追加請求なし
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Sparkles,
                  title: "少額スタート",
                  desc: "高額な一括見積もりではなく、月額2.98万円から運用可能",
                  features: ["初期費用0円", "最小単位で着手", "予算に合わせて拡張"],
                },
                {
                  icon: Rocket,
                  title: "実装スピード",
                  desc: "相談だけで終わらせず、72時間以内に初回アクション",
                  features: ["改善案を即提示", "着手までが早い", "短サイクルで検証"],
                },
                {
                  icon: Briefcase,
                  title: "事業理解で提案",
                  desc: "美容・店舗・Webサービス向けの導線設計を前提にした提案",
                  features: ["CV導線の最適化", "運用しやすい設計", "成果に寄せた優先順位"],
                },
              ].map((point, index) => {
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="relative"
                  >
                    <Card className="p-4 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-3">
                        <point.icon className="h-6 w-6 text-blue-500 mr-3" />
                        <h3 className="font-semibold text-gray-900">{point.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{point.desc}</p>
                      <ul className="text-xs space-y-1 mb-4">
                        {point.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-blue-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.section>

          {/* Pricing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">わかりやすい低価格プラン</h2>
                <p className="text-sm text-gray-600">最初から大きく発注しない前提で設計しています。</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: Store,
                    title: "スターター",
                    price: "月額 29,800円",
                    desc: "小さな改善を継続したい方向け",
                    features: ["LPやフォームの改善 2件/月", "軽微なSEO修正", "チャット相談"],
                    badge: "人気",
                  },
                  {
                    icon: Rocket,
                    title: "グロース",
                    price: "月額 49,800円",
                    desc: "問い合わせ増加を狙う主力プラン",
                    features: ["改善 4件/月", "A/Bテスト提案", "レポート提出"],
                    badge: "おすすめ",
                  },
                  {
                    icon: Briefcase,
                    title: "制作パートナー",
                    price: "月額 79,800円",
                    desc: "小規模開発まで任せたい方向け",
                    features: ["改善 + ミニ開発", "社内ツール実装", "優先対応"],
                    badge: "拡張",
                  },
                ].map((plan, index) => (
                  <motion.div
                    key={plan.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    <Card className="p-4 bg-white h-full border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <plan.icon className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-gray-900">{plan.title}</h3>
                        </div>
                        <Badge variant="secondary">{plan.badge}</Badge>
                      </div>
                      <p className="text-2xl font-bold text-blue-700 mb-1">{plan.price}</p>
                      <p className="text-xs text-gray-600 mb-3">{plan.desc}</p>
                      <ul className="text-xs space-y-2 mb-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-blue-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" size="sm" className="w-full" onClick={scrollToContact}>
                        このプランで相談
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-8"
          >
            <Card className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
              <h2 className="text-xl font-bold mb-2">最短72時間で、最初の改善提案をお返しします</h2>
              <p className="text-sm mb-4 opacity-90">
                まずは無料ヒアリングで課題を整理し、実施順まで具体化します。
                <br className="hidden md:block" />
                「何から手をつけるか分からない」状態を解消するところから始めます。
              </p>
              <Button variant="secondary" size="lg" onClick={scrollToContact} className="gap-2">
                無料で相談する
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          </motion.section>

          {/* Contact Form */}
          <motion.section
            id="contact-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">お問い合わせ</h2>
              <p className="text-sm text-gray-600">
                ご相談内容に応じて、低コストで始められるプランを提案します。2営業日以内に返信します。
              </p>
            </div>
            <CorporateForm />
          </motion.section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
