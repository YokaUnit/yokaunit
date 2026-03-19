"use client"

import Link from "next/link"
import Image from "next/image"
import { BadgeCheck, MapPin, MessageSquareText, ShieldCheck } from "lucide-react"

const STORE_BRAND_COLOR = "#1F8A2B"

export function StoreSiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-7 pb-9 mt-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          {/* ブランド */}
          <div className="space-y-3">
            <Link href="/store" className="flex items-center gap-2">
              <Image src="/Store/logo_store.png" alt="YokaUnit Store" width={26} height={26} />
              <span className="text-lg font-black tracking-wide" style={{ color: STORE_BRAND_COLOR }}>
                YokaUnit Store
              </span>
            </Link>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed max-w-sm">
              湘南の魅力あるお店を、地元の人も観光客も<strong className="font-black">簡単に見つけられる</strong>プラットフォーム。
              お店は<strong className="font-black">無料</strong>でHP化でき、口コミ・クーポン・診断・特集で来店につなげます。
            </p>
          </div>

          {/* 導線 */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900">ご案内</h3>
            <ul className="space-y-1.5 text-xs md:text-sm text-slate-700">
              <li>
                <Link href="/store" className="hover:text-slate-950 transition-colors">
                  トップ
                </Link>
              </li>
              <li>
                <Link href="/store#concept" className="hover:text-slate-950 transition-colors">
                  コンセプト
                </Link>
              </li>
              <li>
                <Link href="/store#features" className="hover:text-slate-950 transition-colors">
                  機能
                </Link>
              </li>
              <li>
                <Link href="/store#contact" className="hover:text-slate-950 transition-colors">
                  無料掲載
                </Link>
              </li>
            </ul>
          </div>

          {/* サービス */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900">できること（準備中）</h3>
            <ul className="space-y-2 text-xs md:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 mt-0.5 text-[#1F8A2B]" />
                <span>無料で店舗HP化（モバイル最適化）</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-slate-700" />
                <span>SEO / MEO 自動最適化（構造化データ対応）</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquareText className="h-4 w-4 mt-0.5 text-slate-700" />
                <span>口コミ・クーポン・予約導線</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 mt-0.5 text-slate-700" />
                <span>放置/リンク切れ検知で品質維持</span>
              </li>
            </ul>

            <div className="pt-3">
              <Link href="/" className="text-xs md:text-sm text-slate-700 hover:text-slate-950 transition-colors">
                無料便利ツール集「YokaUnit」本体を見る
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500">© {new Date().getFullYear()} YokaUnit Store. Powered by YokaUnit.</p>
        </div>
      </div>
    </footer>
  )
}

