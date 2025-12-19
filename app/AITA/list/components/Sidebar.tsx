"use client"

import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* コミュニティ情報 */}
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🌍🔥</span>
          <h2 className="text-lg sm:text-xl font-bold text-white">世界炎上裁判所</h2>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          海外（主にReddit AITA）で炎上した倫理・人間関係トラブルを日本人の価値観で「裁く」体験型まとめサイト。
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">総事件数</span>
            <span className="text-white font-bold">2,314件</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">今週の投票</span>
            <span className="text-white font-bold">12,456票</span>
          </div>
        </div>
      </div>

      {/* 人気の事件 */}
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/10">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4">🔥 人気の事件</h3>
        <div className="space-y-3">
          {[
            { number: 2314, title: "家族を結婚式から追い出した" },
            { number: 2315, title: "友人の誕生日パーティーを断った" },
            { number: 2313, title: "同僚のミスを上司に報告した" },
          ].map((item) => (
            <Link
              key={item.number}
              href={`/AITA/case/${item.number}`}
              className="block text-sm text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-blue-400">第{item.number}号事件</span>
              <br />
              <span className="line-clamp-2">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ルール */}
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/10">
        <h3 className="text-base sm:text-lg font-bold text-white mb-3">📋 ルール</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>各事件に投票して結果を確認しよう</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>日本人と海外の価値観の違いを楽しもう</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>気になる事件は共有して友達と議論しよう</span>
          </li>
        </ul>
      </div>
    </aside>
  )
}

