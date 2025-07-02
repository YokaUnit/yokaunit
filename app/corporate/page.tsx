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
  Users,
  HeadphonesIcon,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Award,
  Target,
  Code,
  Smartphone,
  Globe,
  Lock,
  BarChart3,
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
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">🚀 企業向け専用サービス</Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">売上アップ</span>に直結する
              <br className="md:hidden" />
              <span className="text-blue-600">UI/SEO特化</span>サイト制作
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              YokaUnitは、モバイルファーストのUI設計とSEO最適化で、
              <br />
              御社の売上向上を実現する専門チームです。制作から運用まで完全サポート。
            </p>
            <div className="flex justify-center">
              <Button onClick={scrollToContact} size="lg" className="bg-blue-600 hover:bg-blue-700">
                無料相談を申し込む
              </Button>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { number: "30+", label: "導入企業数", icon: Users },
                { number: "98%", label: "顧客満足度", icon: Star },
                { number: "2営業日", label: "平均対応時間", icon: Clock },
                { number: "3年", label: "平均継続期間", icon: Award },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                    <stat.icon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Services Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">提供サービス</h2>
              <p className="text-sm text-gray-600">企業様のニーズに合わせた柔軟なソリューション</p>
              <p className="text-xs text-blue-600 mt-1">
                ※価格は目安です。お客様のご要望に応じてカスタマイズいたします
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Code,
                  title: "カスタム開発",
                  desc: "御社専用のツール・システム開発",
                  features: ["要件定義〜運用まで", "既存システム連携", "API開発", "保守運用"],
                  price: "月額50万円〜",
                  price_once: "一式150万円〜",
                  popular: true,
                  popularType: "人気No.1",
                  popularColor: "bg-red-500",
                },
                {
                  icon: Smartphone,
                  title: "UI/UXデザイン",
                  desc: "モバイルファーストの美しいデザイン",
                  features: ["レスポンシブデザイン", "ユーザビリティ重視", "コンバージョン最適化", "保守運用"],
                  price: "月額25万円〜",
                  price_once: "一式80万円〜",
                  popular: true,
                  popularType: "人気No.2",
                  popularColor: "bg-orange-500",
                },
                {
                  icon: TrendingUp,
                  title: "SEO特化Webサイト",
                  desc: "売上アップに直結するWebサイト制作",
                  features: ["SEO最適化", "コンバージョン重視", "アクセス解析導入", "保守運用"],
                  price: "月額35万円〜",
                  price_once: "一式150万円〜",
                },
                {
                  icon: Globe,
                  title: "Webシステム開発",
                  desc: "業務効率化Webアプリ",
                  features: ["管理画面構築", "ワークフロー", "多言語対応", "保守運用"],
                  price: "月額40万円〜",
                  price_once: "一式120万円〜",
                },
                {
                  icon: Lock,
                  title: "セキュリティ強化",
                  desc: "情報セキュリティ対策",
                  features: ["脆弱性診断", "セキュリティ監査", "ISMS構築支援", "保守運用"],
                  price: "月額20万円〜",
                  price_once: "一式60万円〜",
                },
                {
                  icon: BarChart3,
                  title: "DXコンサルティング",
                  desc: "デジタル変革戦略立案",
                  features: ["現状分析", "戦略策定", "実行支援", "保守運用"],
                  price: "月額60万円〜",
                  price_once: "一式200万円〜",
                },
              ].map((service, index) => {
                const price = service.price_once ? `${service.price} / ${service.price_once}` : service.price
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="relative"
                  >
                    {service.popular && (
                      <Badge className={`absolute -top-2 -right-2 ${service.popularColor} text-white z-10`}>
                        {service.popularType}
                      </Badge>
                    )}
                    <Card className="p-4 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-3">
                        <service.icon className="h-6 w-6 text-blue-500 mr-3" />
                        <h3 className="font-semibold text-gray-900">{service.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{service.desc}</p>
                      <ul className="text-xs space-y-1 mb-4">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto">
                        <div className="text-lg font-bold text-blue-600 mb-1">{price}</div>
                        <p className="text-xs text-gray-500 mb-2">※ご要望に応じて調整可能</p>
                        <Button variant="outline" size="sm" className="w-full" onClick={scrollToContact}>
                          詳細を問い合わせ
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.section>

          {/* Why Choose Us */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">YokaUnitが選ばれる理由</h2>
                <p className="text-sm text-gray-600">多くの企業様から信頼をいただいている理由</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Smartphone, title: "モバイルファースト", desc: "全デバイス対応の\n美しいレスポンシブ" },
                  { icon: TrendingUp, title: "SEO最適化", desc: "検索上位表示で\n売上直結" },
                  { icon: Target, title: "柔軟な対応", desc: "月額・一式両対応\n完全カスタマイズ" },
                  { icon: HeadphonesIcon, title: "長期サポート", desc: "制作後の保守運用\nまで完全対応" },
                ].map((reason, index) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <reason.icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 mb-1">{reason.title}</h3>
                      <p className="text-xs text-gray-600 whitespace-pre-line">{reason.desc}</p>
                    </div>
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
              <h2 className="text-xl font-bold mb-2">まずは無料相談から始めませんか？</h2>
              <p className="text-sm mb-4 opacity-90">
                御社の課題をお聞かせください。最適なソリューションをご提案いたします。
                <br />
                お見積もりは無料で、ご予算に応じて柔軟に対応いたします。
              </p>
              <Button variant="secondary" size="lg" onClick={scrollToContact}>
                今すぐ無料相談
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
              <p className="text-sm text-gray-600">お気軽にご相談ください。担当者より2営業日以内にご連絡いたします。</p>
            </div>
            <CorporateForm />
          </motion.section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
