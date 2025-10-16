"use client"

import React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UuidGenerator } from "@/components/tools/uuid-generator"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BackgroundAnimation } from "@/components/background-animation"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import Link from "next/link"

export default function UuidGeneratorClientPage() {
  return (
    <>
      <div className="flex min-h-screen flex-col relative">
        <BackgroundAnimation />
        <SiteHeader />
        <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "ツール一覧", href: "/tools" },
              { label: "UUID生成ツール", href: "/tools/uuid" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            <div className="text-center mb-8">
              <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">🔧 UUID生成ツール</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                PostgreSQL対応のUUID（8-4-4-4-12形式）を瞬時に生成。開発者必携の高機能UUIDジェネレーターです。
              </p>
            </div>

            <UuidGenerator />

            <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🗃️ UUIDの基礎知識と活用法</h2>
              <div className="prose max-w-none text-gray-700 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">📋</span>
                      UUIDとは？
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold">•</span>
                        <div>
                          <strong>Universally Unique Identifier</strong>: 
                          世界中で一意となる識別子です。
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold">•</span>
                        <div>
                          <strong>標準形式</strong>: 
                          8-4-4-4-12の16進数文字列（ハイフン区切り）で表現されます。
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold">•</span>
                        <div>
                          <strong>PostgreSQL対応</strong>: 
                          PostgreSQLのUUID型として直接使用できます。
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold">•</span>
                        <div>
                          <strong>RFC4122準拠</strong>: 
                          国際標準に準拠した信頼性の高い仕様です。
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">⚙️</span>
                      UUIDバージョンの特徴
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold">v1</span>
                        <div>
                          <strong>タイムスタンプベース</strong>: 
                          MACアドレスと時刻から生成。順序性があります。
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold">v4</span>
                        <div>
                          <strong>ランダムベース</strong>: 
                          完全にランダムな値。最も一般的で推奨される方式です。
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold">Nil</span>
                        <div>
                          <strong>空のUUID</strong>: 
                          すべて0の特別なUUID。初期化や比較に使用されます。
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">💻</span>
                      開発での活用場面
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-purple-500 font-bold">🗄️</span>
                        <div>
                          <strong>データベース主キー</strong>: 
                          自動増分IDの代替として使用
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-500 font-bold">🔐</span>
                        <div>
                          <strong>セッションID</strong>: 
                          ユーザーセッションの一意識別
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-500 font-bold">🌐</span>
                        <div>
                          <strong>API トークン</strong>: 
                          RESTful APIの認証トークン
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-500 font-bold">📁</span>
                        <div>
                          <strong>ファイル名</strong>: 
                          一意なファイル名の生成
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      UUIDの利点
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-orange-500 font-bold">✓</span>
                        <div>
                          <strong>グローバル一意性</strong>: 
                          分散システムでも重複しません
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-orange-500 font-bold">✓</span>
                        <div>
                          <strong>予測困難性</strong>: 
                          連続する値が推測できません
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-orange-500 font-bold">✓</span>
                        <div>
                          <strong>標準化</strong>: 
                          多くのプログラミング言語でサポート
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-orange-500 font-bold">✓</span>
                        <div>
                          <strong>スケーラビリティ</strong>: 
                          大規模システムでも安全に使用可能
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    このツールの使い方
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                        UUIDのバージョン（v1, v4, Nil）を選択
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        大文字・小文字、ハイフン有無を設定
                      </li>
                    </ol>
                    <ol className="space-y-2 text-sm" start={3}>
                      <li className="flex items-start gap-2">
                        <span className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        「UUID生成」ボタンをクリック
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          4
                        </span>
                        生成されたUUIDをコピーして使用
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔐</span>
                    <div>
                      <p className="font-semibold text-green-800 mb-2">プライバシー完全保護</p>
                      <p className="text-green-700 text-sm">
                        このツールで生成されたUUIDはお使いのブラウザ内で作成され、サーバーには送信されません。完全にプライバシーが保護された状態でご利用いただけます。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 関連ツール */}
            <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔗 関連する開発者ツール</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  href="/tools/password"
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-indigo-100 p-2 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <span className="text-xl">🔐</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      パスワード生成
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700">
                    強力なパスワードを生成。セキュリティ対策に最適です。
                  </p>
                </Link>

                <Link
                  href="/tools/warikan"
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                      <span className="text-xl">💰</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      割り勘計算
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700">
                    複雑な割り勘も瞬時に計算。飲み会や旅行に便利です。
                  </p>
                </Link>

                <Link
                  href="/tools/ai-mote"
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-pink-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-pink-100 p-2 rounded-lg group-hover:bg-pink-200 transition-colors">
                      <span className="text-xl">💕</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                      AIモテ度診断
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700">
                    AIがあなたのモテ度を分析。恋愛力向上のヒントも。
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <CategoryTools category="セキュリティ" title="関連ツール（セキュリティ）" currentToolSlug="uuid" limit={8} />
      <RelatedTools currentToolSlug="uuid" />
      
      <SiteFooter />
    </div>
    </>
  )
}
