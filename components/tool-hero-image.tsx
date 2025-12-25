"use client"

import Image from "next/image"

interface ToolHeroImageProps {
  imageUrl: string | null
  title?: string
  className?: string
}

/**
 * ツール一覧で使用している画像をページ上部に表示するコンポーネント
 * 速度最適化のためNext.js Imageコンポーネントを使用
 * クライアントコンポーネントとして実装し、画像URLはサーバーサイドで取得してpropsとして渡す
 */
export function ToolHeroImage({ imageUrl, title, className = "" }: ToolHeroImageProps) {
  const altText = title ? `${title} - YokaUnit` : "YokaUnit ツール"

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-xl sm:rounded-2xl shadow-lg mb-6 md:mb-8 ${className}`}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={85}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-4xl sm:text-6xl opacity-50">🛠️</div>
        </div>
      )}
    </div>
  )
}

