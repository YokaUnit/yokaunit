const MOVIES_URL = "https://yokaunit.com/movies"
const SITE_URL = "https://yokaunit.com"

/** /movies 用 WebPage + パンくず（Google 検索向け） */
export function generateMoviesPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${MOVIES_URL}#webpage`,
        url: MOVIES_URL,
        name: "YokaUnit Movies | 何を観るか迷ったとき｜配信と評価で候補を絞る",
        description:
          "今夜・週末に何を観るか決まらない人向け。契約中のVODで観れる映画・ドラマを絞り込み、Filmarks・映画.com の平均も一覧できます。見るか迷うときの候補を減らすためのデモ（数値はデモ）。",
        keywords:
          "何を観るか迷う,映画 何見るか迷う,映画 決められない,次に観る作品,VOD,Filmarks,映画.com",
        inLanguage: "ja-JP",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${MOVIES_URL}/opengraph-image`,
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}#website`,
          name: "YokaUnit",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "YokaUnit",
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "YokaUnit",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "YokaUnit Movies",
            item: MOVIES_URL,
          },
        ],
      },
    ],
  }
}
