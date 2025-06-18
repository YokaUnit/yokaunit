import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "利用規約 | YokaUnit",
  description:
    "YokaUnitの利用規約についてご説明します。当サイトのサービスをご利用いただく際の条件や注意事項をご確認いただけます。",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "利用規約", href: "/terms" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-extrabold text-indigo-600 mb-8">利用規約</h1>

            <div className="prose prose-indigo max-w-none text-gray-700">
              <p>
                この利用規約（以下、「本規約」）は、YokaUnit（以下、「当サイト」）が提供するウェブサイト、サービス、ツール（以下、総称して「本サービス」）の利用条件を定めるものです。本サービスをご利用いただく際には、本規約に同意したものとみなされます。
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-6">1. 利用登録</h2>
              <p>
                1.1 本サービスの一部機能は、利用登録が必要となる場合があります。
                <br />
                1.2 登録時には、真実かつ正確な情報を提供していただく必要があります。
                <br />
                1.3 当サイトは、以下の場合に利用登録を拒否することがあります：
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>登録情報に虚偽や不正確な内容が含まれる場合</li>
                <li>過去に本規約違反などの理由で利用停止または登録抹消された場合</li>
                <li>その他、当サイトが不適切と判断した場合</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-6">2. アカウント管理</h2>
              <p>
                2.1 ユーザーは、自身のアカウント情報の管理責任を負います。
                <br />
                2.2 アカウント情報の漏洩や不正利用が発生した場合は、速やかに当サイトに連絡してください。
                <br />
                2.3 アカウント情報の漏洩や不正利用による損害について、当サイトは責任を負いません。
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-6">3. 禁止事項</h2>
              <p>本サービスの利用にあたり、以下の行為を禁止します：</p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当サイトのサーバーやネットワークの機能を破壊または妨害する行為</li>
                <li>当サイトのサービスの運営を妨害する行為</li>
                <li>他のユーザーに迷惑をかける行為</li>
                <li>他のユーザーのアカウントを不正に使用する行為</li>
                <li>当サイトのコンテンツを無断で複製、改変、配布する行為</li>
                <li>当サイトに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li>その他、当サイトが不適切と判断する行為</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-6">4. サービスの提供</h2>
              <p>
                4.1 当サイトは、本サービスの内容を予告なく変更、追加、削除することがあります。
                <br />
                4.2 当サイトは、以下の場合に本サービスの提供を一時的に中断することがあります：
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>システムの保守点検または更新を行う場合</li>
                <li>地震、落雷、火災、停電、天災などの不可抗力により本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、当サイトが本サービスの提供が困難と判断した場合</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-6">5. 著作権・知的財産権</h2>
              <p>
                5.1 当サイトのコンテンツ（テキスト、画像、ロゴ、デザイン等）の著作権・知的財産権は、当サイトまたは正当な権利者に帰属します。
                <br />
                5.2 ユーザーは、当サイトの明示的な許可なく、当サイトのコンテンツを複製、改変、配布することはできません。
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-6">6. 免責事項</h2>
              <p>
                6.1 当サイトは、本サービスの内容の正確性、完全性、有用性等について保証するものではありません。
                <br />
                6.2 当サイトは、ユーザーが本サービスを利用することによって生じた損害について、一切の責任を負いません。
                <br />
                6.3 当サイトは、ユーザー間のトラブルについて、一切関与しません。
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-6">7. 利用規約の変更</h2>
              <p>
                7.1 当サイトは、必要に応じて本規約を変更することがあります。
                <br />
                7.2 変更後の利用規約は、当サイト上に表示した時点で効力を生じるものとします。
                <br />
                7.3 重要な変更がある場合は、サイト上での通知やメールでお知らせします。
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-6">8. 準拠法・管轄裁判所</h2>
              <p>
                8.1 本規約の解釈にあたっては、日本法を準拠法とします。
                <br />
                8.2 本サービスに関して紛争が生じた場合には、当サイトの所在地を管轄する裁判所を専属的合意管轄とします。
              </p>

              <p className="text-sm text-gray-500 mt-8">最終更新日：2023年12月25日</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
