"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, MessageCircle, Youtube, Building2, Crown, Wrench, HelpCircle, Mail, FileText } from "lucide-react"
import { motion } from "framer-motion"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
          {/* ブランド・SNSセクション */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="YokaUnit" width={28} height={28} className="rounded-full" />
              <span className="text-xl font-bold text-blue-600">YokaUnit</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              毎日の面倒な作業を一瞬で解決。
              <br />
              あなたの「困った」を「簡単」に変える無料ツール集です。
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.instagram.com/hisashi_web?igsh=MWxlaDdlcGg1YXk5cA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.threads.com/@hisashi_web?igshid=NTc4MTIwNjQ2YQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Threads"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/@hisashi-web?si=xluoFYfrjor_4un4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          {/* サービス・ツールセクション */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-base font-semibold text-gray-900">サービス</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <Wrench className="h-4 w-4 mr-2 text-blue-500 group-hover:text-blue-600" />
                  すべてのツール
                </Link>
              </li>
              <li>
                <Link
                  href="/premium"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <Crown className="h-4 w-4 mr-2 text-yellow-500 group-hover:text-yellow-600" />
                  プレミアムプラン
                </Link>
              </li>
              <li>
                <Link
                  href="/corporate"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <Building2 className="h-4 w-4 mr-2 text-blue-500 group-hover:text-blue-600" />
                  企業・法人の方へ
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <HelpCircle className="h-4 w-4 mr-2 text-green-500 group-hover:text-green-600" />
                  よくある質問
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* サポート・法的情報セクション */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-base font-semibold text-gray-900">サポート・規約</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <Mail className="h-4 w-4 mr-2 text-blue-500 group-hover:text-blue-600" />
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <HelpCircle className="h-4 w-4 mr-2 text-purple-500 group-hover:text-purple-600" />
                  ヘルプ・使い方
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <FileText className="h-4 w-4 mr-2 text-gray-500 group-hover:text-gray-600" />
                  特定商取引法表記
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>

            {/* アカウント関連 */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">アカウント</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    ログイン
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    新規登録
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* コピーライト */}
        <div className="pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} YokaUnit（ヨカユニット）. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
