"use client"

export default function AITAExplanation() {
  return (
    <section className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 border border-white/10 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
        🌍 世界炎上裁判所とは？
      </h2>
      
      <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
        <p>
          <strong className="text-white">Redditの人気掲示板「AITA（Am I The Asshole?／これって私が悪い？）」</strong>
          の投稿を、日本人の価値観で「アウト／セーフ」に判定する参加型コンテンツです。
        </p>
        
        <div className="bg-black/30 rounded-lg p-4 space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-white mb-2">📊 楽しみ方</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">1.</span>
              <span>海外で話題になった倫理・人間関係のトラブルを読む</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">2.</span>
              <span>自分の価値観で「アウト」か「セーフ」を判定</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">3.</span>
              <span>日本人の判定と海外（Reddit）の判定を比較</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">4.</span>
              <span>価値観の違いを発見して楽しむ</span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-black/30 rounded-lg p-3 sm:p-4">
            <h4 className="text-sm sm:text-base font-bold text-white mb-2">💑 恋愛トラブル</h4>
            <p className="text-xs sm:text-sm text-gray-400">
              カップル間の価値観の違いや、デートでのマナーなど
            </p>
          </div>
          <div className="bg-black/30 rounded-lg p-3 sm:p-4">
            <h4 className="text-sm sm:text-base font-bold text-white mb-2">👨‍👩‍👧 家族トラブル</h4>
            <p className="text-xs sm:text-sm text-gray-400">
              親子関係、兄弟姉妹、義理の家族との問題など
            </p>
          </div>
          <div className="bg-black/30 rounded-lg p-3 sm:p-4">
            <h4 className="text-sm sm:text-base font-bold text-white mb-2">👥 友人関係</h4>
            <p className="text-xs sm:text-sm text-gray-400">
              友達同士の約束、金銭トラブル、グループ内の対立など
            </p>
          </div>
          <div className="bg-black/30 rounded-lg p-3 sm:p-4">
            <h4 className="text-sm sm:text-base font-bold text-white mb-2">💼 職場・社会</h4>
            <p className="text-xs sm:text-sm text-gray-400">
              同僚との関係、マナー、社会常識に関する問題など
            </p>
          </div>
        </div>

        <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 mt-4">
          <p className="text-sm sm:text-base text-white">
            <strong>🎯 あなたの判断と日本人の判定、海外の判定割合を比べて、</strong>
            <br className="hidden sm:block" />
            文化や価値観の違いを楽しみながら学べる参加型コンテンツです。
          </p>
        </div>
      </div>
    </section>
  )
}

