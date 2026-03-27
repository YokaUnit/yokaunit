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
        name: "YokaUnit Movies | 映画をどのVODで見れるか一発で検索",
        description:
          "契約中のVODに合わせて映画・ドラマを絞り込み。Filmarks・映画.com の評価も一覧で確認できます（掲載の数値はデモ）。",
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
