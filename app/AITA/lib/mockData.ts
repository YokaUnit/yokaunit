import { AITAPost } from "./types"

export const mockPosts: AITAPost[] = [
  {
    id: "1",
    caseNumber: 2314,
    title: "家族を結婚式から追い出した。これ、日本でもアウト?",
    body: "私は35歳。兄が酔っ払って暴れるので、結婚式から追い出しました。しかし、すぐに怒鳴り声が…",
    bodyFull: "私は35歳。兄が酔っ払って暴れるので、結婚式から追い出しました。しかし、すぐに怒鳴り声が聞こえてきました。家族からは「家族なんだから我慢すべきだった」と言われています。でも、結婚式は特別な日ですし、他のゲストにも迷惑をかけたくありませんでした。",
    overseasReactions: [
      "完全にアウトだね。",
      "よくやったと思うよ。",
      "家族でも線引きは必須だ。",
    ],
    redditVerdict: {
      out: 32,
      safe: 68,
    },
    comments: [
      {
        id: "1",
        content: "兄が悪い、仕方ない。",
        likes: 45,
      },
      {
        id: "2",
        content: "よく話し合うべきだった。",
        likes: 32,
      },
      {
        id: "3",
        content: "結婚式は特別な場なのにね。",
        likes: 28,
      },
    ],
  },
  {
    id: "2",
    caseNumber: 2315,
    title: "友人の誕生日パーティーを断った。これ、日本でもアウト?",
    body: "私は28歳。友人の誕生日パーティーに誘われましたが、仕事が忙しくて断りました。",
    bodyFull: "私は28歳。友人の誕生日パーティーに誘われましたが、仕事が忙しくて断りました。友人からは「本当に忙しいの？」と疑われ、グループから外されました。でも、本当に重要なプロジェクトの締切が近かったんです。",
    overseasReactions: [
      "仕事を優先するのは当然。",
      "友情も大切にすべき。",
      "説明が足りなかったのでは？",
    ],
    redditVerdict: {
      out: 45,
      safe: 55,
    },
    comments: [
      {
        id: "1",
        content: "仕事優先は理解できる。",
        likes: 38,
      },
      {
        id: "2",
        content: "もっと早く断るべきだった。",
        likes: 25,
      },
    ],
  },
  {
    id: "3",
    caseNumber: 2316,
    title: "同僚のミスを上司に報告した。これ、日本でもアウト?",
    body: "私は30歳。同僚が重要なデータを誤って削除してしまい、プロジェクトに大きな影響が出ました。",
    bodyFull: "私は30歳。同僚が重要なデータを誤って削除してしまい、プロジェクトに大きな影響が出ました。同僚は「内緒にしてほしい」と言いましたが、私は上司に報告しました。同僚は今、私を恨んでいます。",
    overseasReactions: [
      "正しい判断だった。",
      "同僚を守るべきだった。",
      "状況次第だと思う。",
    ],
    redditVerdict: {
      out: 25,
      safe: 75,
    },
    comments: [
      {
        id: "1",
        content: "報告は正しい判断。",
        likes: 52,
      },
      {
        id: "2",
        content: "同僚との関係も大切。",
        likes: 28,
      },
    ],
  },
  {
    id: "4",
    caseNumber: 2317,
    title: "義理の母の誕生日を忘れた。これ、日本でもアウト?",
    body: "私は32歳。義理の母の誕生日を完全に忘れてしまい、何もプレゼントを渡しませんでした。",
    bodyFull: "私は32歳。義理の母の誕生日を完全に忘れてしまい、何もプレゼントを渡しませんでした。義理の母はとても怒っていて、夫も私に不満を持っています。仕事が忙しくて本当に忘れてしまったんです。",
    overseasReactions: [
      "完全にアウト。",
      "謝罪すれば大丈夫。",
      "カレンダーに登録すべき。",
    ],
    redditVerdict: {
      out: 60,
      safe: 40,
    },
    comments: [
      {
        id: "1",
        content: "謝罪して次回は忘れないように。",
        likes: 48,
      },
      {
        id: "2",
        content: "家族の誕生日は重要。",
        likes: 35,
      },
    ],
  },
  {
    id: "5",
    caseNumber: 2318,
    title: "電車で席を譲らなかった。これ、日本でもアウト?",
    body: "私は26歳。満員電車で高齢の方が立っていましたが、私は疲れていて席を譲りませんでした。",
    bodyFull: "私は26歳。満員電車で高齢の方が立っていましたが、私は疲れていて席を譲りませんでした。周りの人から白い目で見られましたが、私も長時間働いていて本当に疲れていたんです。",
    overseasReactions: [
      "席を譲るべきだった。",
      "疲れているなら仕方ない。",
      "状況による。",
    ],
    redditVerdict: {
      out: 55,
      safe: 45,
    },
    comments: [
      {
        id: "1",
        content: "高齢者には席を譲るべき。",
        likes: 42,
      },
      {
        id: "2",
        content: "自分も疲れているなら仕方ない。",
        likes: 30,
      },
    ],
  },
]

// 無限スクロール用：次のページを取得（モック）
export const fetchMorePosts = async (page: number): Promise<AITAPost[]> => {
  // 実際の実装ではAPIから取得
  // ここではモックデータを返す
  await new Promise((resolve) => setTimeout(resolve, 500)) // ローディングをシミュレート
  
  const basePosts = [...mockPosts]
  return basePosts.map((post, index) => ({
    ...post,
    id: `${page}-${index + 1}`,
    caseNumber: post.caseNumber + (page - 1) * 5 + index,
  }))
}

