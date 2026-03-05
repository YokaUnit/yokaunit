"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, MessageCircle, Youtube, Heart } from "lucide-react"

export function BeautySiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white pt-6 pb-8 mt-4">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          {/* ブランド */}
          <div className="space-y-3">
            <Link href="/beauty" className="flex items-center gap-2">
              <Image src="/logo_heart.png" alt="YokaUnit Beauty" width={26} height={26} className="rounded-full" />
              <span className="text-lg font-bold text-gray-900">YokaUnit Beauty</span>
            </Link>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed max-w-xs">
              「自分に合う美容が分からない」を、診断から解決する美容サイト。
              肌・コスメ・ヘアの悩みを、ツールと記事でやさしくサポートします。
            </p>
          </div>

          {/* 導線 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">コンテンツ</h3>
            <ul className="space-y-1.5 text-xs md:text-sm text-gray-700">
              <li>
                <Link href="/beauty/diagnosis/skin-type" className="hover:text-rose-500 transition-colors">
                  肌質診断
                </Link>
              </li>
              <li>
                <span className="text-gray-400">毛穴タイプ診断（準備中）</span>
              </li>
              <li>
                <span className="text-gray-400">パーソナルカラー診断（準備中）</span>
              </li>
              <li>
                <span className="text-gray-400">美容記事（準備中）</span>
              </li>
            </ul>
          </div>

          {/* SNS & 親サイト */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">つながる</h3>
            <div className="flex space-x-4 pt-1">
              <a
                href="https://www.instagram.com/hisashi_web?igsh=MWxlaDdlcGg1YXk5cA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.threads.com/@hisashi_web?igshid=NTc4MTIwNjQ2YQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rose-500 transition-colors"
                aria-label="Threads"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@hisashi-web?si=xluoFYfrjor_4un4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center text-xs md:text-sm text-gray-700 hover:text-rose-500 transition-colors"
              >
                <Heart className="h-3 w-3 mr-1 text-rose-500" />
                無料便利ツール集「YokaUnit」本体を見る
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-500">
            © {new Date().getFullYear()} YokaUnit Beauty. Powered by YokaUnit.
          </p>
        </div>
      </div>
    </footer>
  )
}

