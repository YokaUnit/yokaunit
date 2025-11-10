import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UuidGeneratorClient } from "./UuidGeneratorClient"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BackgroundAnimation } from "@/components/background-animation"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"
import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("uuid", {
  title: "UUID生成ツール｜PostgreSQL対応・履歴管理・バリデーション機能付き無料ツール",
  description:
    "YokaUnitのUUID生成ツール！PostgreSQL対応・履歴管理・お気に入り・CSVエクスポート・バリデーション機能完備。v1～v5、Nil UUID対応。開発者必携の高機能UUIDジェネレーター。ブラウザ内完結でプライバシー完全保護。プロ仕様の開発ツール。",
  keywords: [
    "UUID生成",
    "PostgreSQL対応",
    "UUID履歴管理",
    "お気に入り機能",
    "CSVエクスポート",
    "バリデーション機能",
    "UUID v1",
    "UUID v4",
    "UUID v5",
    "Nil UUID",
    "GUID生成",
    "ユニークID",
    "一意識別子",
    "開発者ツール",
    "データベース",
    "プログラミング",
    "Web開発",
    "システム開発",
    "無料ツール",
    "UUID validator",
    "UUID検証",
    "16進数",
    "ハイフン付き",
    "RFC4122",
    "タイムスタンプ",
    "ランダムUUID",
    "一括生成",
    "バリデーション",
    "コピー機能",
    "開発効率",
    "YokaUnit",
    "ヨカユニット",
    "UUID作成",
    "識別子生成",
    "データ管理",
    "API開発",
    "マイクロサービス",
    "分散システム",
    "主キー生成",
    "セッションID",
    "トークン生成",
    "8-4-4-4-12形式",
    "ブラケット形式",
    "名前空間UUID",
    "ハッシュベース",
    "MACアドレス",
    "クロックシーケンス",
    "バリアント",
    "バージョン識別",
    "モバイル対応",
    "レスポンシブ",
    "ブラウザツール",
    "オンラインツール",
    "無料ツール",
    "セキュア",
    "プライバシー保護",
    "一括生成",
    "複数UUID",
    "カスタマイズ",
    "プロ仕様",
    "企業向け",
  ],
  authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
  creator: "YokaUnit",
  publisher: "YokaUnit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/uuid",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yokaunit.com/tools/uuid",
    siteName: "YokaUnit",
    title: "UUID生成ツール｜PostgreSQL対応・履歴管理・バリデーション機能付き - YokaUnit",
    description:
      "PostgreSQL対応・履歴管理・お気に入り・CSVエクスポート・バリデーション機能完備のUUID生成ツール！v1～v5、Nil UUID対応。開発者必携の高機能UUIDジェネレーター。ブラウザ内完結でプライバシー完全保護。プロ仕様の開発ツール。",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yokaunit",
    creator: "@yokaunit",
    title: "UUID生成ツール🔧｜PostgreSQL対応・履歴管理・バリデーション機能付き",
    description:
      "PostgreSQL対応・履歴管理・お気に入り・CSVエクスポート・バリデーション機能完備✨ v1～v5、Nil UUID対応🛠️ 開発者必携の高機能UUIDジェネレーター🚀 プロ仕様の開発ツール📱",
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
  })
}

export default function UuidGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <BackgroundAnimation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "ツール", href: "/tools" },
              { label: "UUID生成ツール", href: "/tools/uuid" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">🔑 UUID生成ツール</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                PostgreSQL対応・履歴管理・お気に入り・CSVエクスポート・バリデーション機能完備のプロ仕様ツール。v1～v5、Nil UUID対応で開発者必携の高機能UUIDジェネレーターです。
              </p>
            </div>
            <UuidGeneratorClient />
          </div>

          <div className="max-w-6xl mx-auto mt-16">
            <CategoryTools category="開発" title="関連ツール（開発）" currentToolSlug="uuid" limit={8} />
            <RelatedTools currentToolSlug="uuid" />
          </div>

          {/* SEO記事セクション */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔑 UUID完全ガイド：開発者が知るべき全てのこと</h2>
              
              <div className="prose max-w-none text-gray-700 space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📚</span>
                    UUIDとは？開発者必見の基礎知識
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    UUID（Universally Unique Identifier）は、128ビットの識別子で、世界中で一意性が保証される文字列です。
                    RFC 4122で標準化されており、データベースの主キー、セッションID、ファイル名、APIトークンなど、
                    様々な場面で使用されています。PostgreSQL、MySQL、SQLite、MongoDBなどの主要データベースで
                    ネイティブサポートされており、分散システムやマイクロサービスアーキテクチャにおいて
                    不可欠な技術となっています。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    UUIDの最大の特徴は、生成時にネットワーク通信や中央集権的な管理が不要であることです。
                    各システムが独立してUUIDを生成でき、衝突の確率が極めて低いため、
                    スケーラブルなアプリケーション開発において重宝されています。
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🔢</span>
                      UUIDバージョン別の特徴と用途
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">UUID v1（タイムスタンプベース）</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          タイムスタンプとMACアドレスを使用。時系列でソート可能で、デバッグ時に便利。
                          プライバシー上の懸念があるため、本番環境では注意が必要。
                        </p>
                        <div className="text-xs text-gray-500 font-mono bg-white p-2 rounded">
                          例: 550e8400-e29b-41d4-a716-446655440000
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">UUID v4（ランダム）</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          完全にランダムな値。最も一般的で推奨される形式。
                          セキュリティが重要で、予測不可能性が求められる場面で使用。
                        </p>
                        <div className="text-xs text-gray-500 font-mono bg-white p-2 rounded">
                          例: f47ac10b-58cc-4372-a567-0e02b2c3d479
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">UUID v5（名前空間ベース）</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          名前空間と名前からSHA-1ハッシュで生成。同じ入力から常に同じUUIDが生成される。
                          名前空間の概念で、異なるコンテキストでの衝突を防ぐ。
                        </p>
                        <div className="text-xs text-gray-500 font-mono bg-white p-2 rounded">
                          例: 886313e1-3b8a-5372-9b90-0c9aee199e5d
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🛠️</span>
                      実践的な使用場面とベストプラクティス
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-semibold text-gray-900 mb-2">データベース設計</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          PostgreSQLのUUID型、MySQLのCHAR(36)、SQLiteのTEXT型として使用。
                          主キーとして使用する場合、インデックス性能を考慮した設計が重要。
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                        <h4 className="font-semibold text-gray-900 mb-2">API開発</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          RESTful APIのリソースID、JWTトークンのjtiクレーム、
                          WebSocketセッションIDとして活用。URLに含めても安全。
                        </p>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                        <h4 className="font-semibold text-gray-900 mb-2">ファイル管理</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          ファイル名の衝突回避、一時ファイルの命名、
                          アップロードファイルの一意識別に使用。
                          ファイルシステムの制限に注意。
                        </p>
                      </div>
                      
                      <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                        <h4 className="font-semibold text-gray-900 mb-2">セキュリティ</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          セッションID、CSRFトークン、パスワードリセットトークンとして使用。
                          UUID v4のランダム性により、予測困難な値を提供。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    パフォーマンス最適化のポイント
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">データベース最適化</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• UUIDを主キーに使用する場合は、B-treeインデックスの性能を考慮</li>
                        <li>• PostgreSQLではuuid-ossp拡張やpgcrypto拡張を活用</li>
                        <li>• MySQLではCHAR(36)よりBINARY(16)の方が効率的</li>
                        <li>• 大量データではUUIDの代わりにULID（Universally Unique Lexicographically Sortable Identifier）も検討</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">アプリケーション最適化</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• UUID生成ライブラリの選択（crypto.randomUUID()など）</li>
                        <li>• バッチ処理でのUUID生成の効率化</li>
                        <li>• キャッシュ戦略とUUIDの組み合わせ</li>
                        <li>• 分散システムでのクロック同期の重要性</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    UUID検証とデバッグのテクニック
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">UUID検証の重要性</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        UUIDの形式検証は、データの整合性を保つために重要です。
                        RFC 4122に準拠した正規表現による検証、バージョンとバリアントの確認、
                        チェックサムの検証など、多層的なアプローチが推奨されます。
                      </p>
                      <div className="bg-white p-3 rounded border text-xs font-mono text-gray-700">
                        正規表現: ^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">デバッグ時の注意点</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• UUID v1のタイムスタンプ部分から生成時刻を逆算可能</li>
                        <li>• UUID v4のランダム性をテストするための統計的検証</li>
                        <li>• 分散環境でのUUID衝突の可能性（理論上は極めて低い）</li>
                        <li>• ログ出力時のUUIDマスキングによるプライバシー保護</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🌐</span>
                    プログラミング言語別UUID実装ガイド
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">JavaScript/Node.js</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        crypto.randomUUID()<br/>
                        uuid パッケージ<br/>
                        nanoid パッケージ
                      </div>
                      <p className="text-sm text-gray-600">
                        ブラウザとサーバー両方で利用可能。
                        crypto.randomUUID()が標準APIとして推奨。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Python</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        import uuid<br/>
                        uuid.uuid4()<br/>
                        uuid.uuid1()
                      </div>
                      <p className="text-sm text-gray-600">
                        標準ライブラリのuuidモジュールが充実。
                        Django、Flask、FastAPIで広く使用。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Java</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        UUID.randomUUID()<br/>
                        java.util.UUID<br/>
                        Spring Boot対応
                      </div>
                      <p className="text-sm text-gray-600">
                        java.util.UUIDクラスが標準提供。
                        エンタープライズ開発で広く採用。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🚀</span>
                    今後のUUID技術動向と代替技術
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">新興技術との比較</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">ULID (Universally Unique Lexicographically Sortable Identifier)</h5>
                          <p className="text-xs text-gray-600">
                            時系列ソート可能、より短い文字列、URL-safe
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Snowflake ID</h5>
                          <p className="text-xs text-gray-600">
                            Twitterが開発、64ビット、分散環境向け
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">CUID (Collision-resistant Unique Identifier)</h5>
                          <p className="text-xs text-gray-600">
                            より短い、URL-safe、予測困難
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">KSUID (K-Sortable Unique Identifier)</h5>
                          <p className="text-xs text-gray-600">
                            Segmentが開発、時系列ソート可能
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">選択指針</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>UUID v4</strong>: 一般的な用途、セキュリティ重視</li>
                        <li>• <strong>UUID v1</strong>: 時系列ソートが必要、デバッグ重視</li>
                        <li>• <strong>ULID</strong>: 時系列ソート + 短縮化が必要</li>
                        <li>• <strong>Snowflake ID</strong>: 高スループット、分散システム</li>
                        <li>• <strong>CUID</strong>: URL-safe、フロントエンド重視</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    YokaUnitのUUID生成ツールは、開発者の皆様の効率的な作業をサポートします。
                    この記事が、UUIDの理解と実装の参考になれば幸いです。
                  </p>
                  <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                    <span>#UUID</span>
                    <span>#開発ツール</span>
                    <span>#PostgreSQL</span>
                    <span>#データベース設計</span>
                    <span>#API開発</span>
                    <span>#セキュリティ</span>
                    <span>#YokaUnit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ScrollToTop />
      <SiteFooter />
      <ViewCounter toolSlug="uuid" />
    </div>
  )
}
