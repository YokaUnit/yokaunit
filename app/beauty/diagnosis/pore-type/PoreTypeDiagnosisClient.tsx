"use client"

import { useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

type AnswerOption = {
  id: string
  label: string
}

type Question = {
  id: string
  text: string
  options: AnswerOption[]
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "一番気になる毛穴の悩みに近いものは？",
    options: [
      { id: "a", label: "鼻の黒いポツポツが目立つ" },
      { id: "b", label: "頬や小鼻の毛穴がぽっかり開いて見える" },
      { id: "c", label: "ほほの毛穴がタテに伸びて、たるんで見える" },
      { id: "d", label: "白い角栓やザラつきが気になる" },
    ],
  },
  {
    id: "q2",
    text: "顔を横から見たとき、毛穴はどう見えますか？",
    options: [
      { id: "a", label: "黒い点々が多い" },
      { id: "b", label: "丸い穴がポツポツと目立つ" },
      { id: "c", label: "下方向にしずんだような、しずく型に見える" },
      { id: "d", label: "白っぽいポツポツやザラザラが多い" },
    ],
  },
  {
    id: "q3",
    text: "メイクをしたときの毛穴の目立ち方は？",
    options: [
      { id: "a", label: "黒い点々が透けて見える" },
      { id: "b", label: "ファンデが毛穴に入って「点々」になる" },
      { id: "c", label: "ほおの毛穴にそってファンデがヨレる" },
      { id: "d", label: "時間が経つとザラつきが浮いてくる" },
    ],
  },
  {
    id: "q4",
    text: "指でそっと触れたときの感触は？",
    options: [
      { id: "a", label: "ざらざら・ぶつぶつしている" },
      { id: "b", label: "つるっとしているが、穴の周りが少し硬い" },
      { id: "c", label: "やわらかく、全体的にハリが足りない感じ" },
      { id: "d", label: "小さなつぶつぶがまとまっている" },
    ],
  },
  {
    id: "q5",
    text: "Tゾーン（おでこ・鼻）の皮脂状態は？",
    options: [
      { id: "a", label: "テカりやすく、あぶらとり紙をよく使う" },
      { id: "b", label: "日によってテカるときとそうでないときがある" },
      { id: "c", label: "それほどテカりは気にならない" },
      { id: "d", label: "テカるというより、ゴワつきが気になる" },
    ],
  },
  {
    id: "q6",
    text: "最近の肌状態として近いものは？",
    options: [
      { id: "a", label: "洗顔直後はマシだが、すぐに黒ずみが気になる" },
      { id: "b", label: "毛穴が前より大きくなってきた気がする" },
      { id: "c", label: "ほおのたるみや輪郭のゆるみも気になる" },
      { id: "d", label: "ゴワつき・乾燥と毛穴の両方が気になる" },
    ],
  },
  {
    id: "q7",
    text: "スキンケア・クレンジングの傾向は？",
    options: [
      { id: "a", label: "オイルクレンジングや毛穴パックをよく使う" },
      { id: "b", label: "さっぱり系の洗顔・収れん化粧水が好き" },
      { id: "c", label: "保湿やエイジングケア重視で選んでいる" },
      { id: "d", label: "あまりこだわりはなく、なんとなくで選んでいる" },
    ],
  },
]

type PoreType = "blackhead" | "open" | "sagging" | "clogged"

type DiagnosisResult = {
  type: PoreType
}

const SCORING_TABLE: Record<string, Partial<Record<string, Partial<Record<PoreType, number>>>>> = {
  q1: {
    a: { blackhead: 2 },
    b: { open: 2 },
    c: { sagging: 2 },
    d: { clogged: 2 },
  },
  q2: {
    a: { blackhead: 2 },
    b: { open: 2 },
    c: { sagging: 2 },
    d: { clogged: 2 },
  },
  q3: {
    a: { blackhead: 2 },
    b: { open: 2 },
    c: { sagging: 2 },
    d: { clogged: 2 },
  },
  q4: {
    a: { blackhead: 1, clogged: 1 },
    b: { open: 1 },
    c: { sagging: 1 },
    d: { clogged: 2 },
  },
  q5: {
    a: { blackhead: 1, open: 1 },
    b: { open: 1 },
    c: { sagging: 1 },
    d: { clogged: 1 },
  },
  q6: {
    a: { blackhead: 1 },
    b: { open: 1 },
    c: { sagging: 2 },
    d: { clogged: 1 },
  },
  q7: {
    a: { blackhead: 1 },
    b: { open: 1 },
    c: { sagging: 1 },
    d: { clogged: 1 },
  },
}

function calculateDiagnosis(answers: Record<string, string | undefined>): DiagnosisResult | null {
  const answeredCount = Object.values(answers).filter(Boolean).length
  if (answeredCount !== QUESTIONS.length) return null

  const scores: Record<PoreType, number> = {
    blackhead: 0,
    open: 0,
    sagging: 0,
    clogged: 0,
  }

  for (const q of QUESTIONS) {
    const selected = answers[q.id]
    if (!selected) continue
    const row = SCORING_TABLE[q.id]?.[selected]
    if (!row) continue

    for (const key of Object.keys(row) as PoreType[]) {
      scores[key] += row[key] ?? 0
    }
  }

  const types = Object.keys(scores) as PoreType[]
  const maxScore = Math.max(...types.map((t) => scores[t]))
  const top = types.filter((t) => scores[t] === maxScore)

  // 同点のときは「一番気になる悩み」（q1）の回答に最も合うタイプを優先（再現性のあるルール）
  let type: PoreType
  if (top.length === 1) {
    type = top[0]
  } else {
    const q1 = answers.q1
    const q1Row = q1 ? SCORING_TABLE.q1?.[q1] : undefined
    const q1Preferred = q1Row ? ((Object.keys(q1Row) as PoreType[])[0] ?? null) : null
    if (q1Preferred && top.includes(q1Preferred)) {
      type = q1Preferred
    } else {
      const order: PoreType[] = ["blackhead", "open", "sagging", "clogged"]
      type = order.find((t) => top.includes(t)) ?? top[0]
    }
  }

  return { type }
}

function getTypeLabel(type: PoreType): string {
  switch (type) {
    case "blackhead":
      return "黒ずみ毛穴タイプ"
    case "open":
      return "開き毛穴タイプ"
    case "sagging":
      return "たるみ毛穴タイプ"
    case "clogged":
      return "詰まり毛穴タイプ"
  }
}

function getTypeDescription(type: PoreType): string {
  switch (type) {
    case "blackhead":
      return "皮脂と古い角質が混ざって酸化し、黒いポツポツとして目立ちやすいタイプです。洗いすぎや強い毛穴パックで悪化しやすい傾向があります。"
    case "open":
      return "皮脂分泌や乾燥、摩擦などが原因で毛穴がまるく開きっぱなしになっているタイプです。インナードライや生活習慣の影響も受けやすい毛穴です。"
    case "sagging":
      return "加齢や乾燥、紫外線などにより、肌のハリが低下して毛穴が下向きのしずく型に見えるタイプです。ほおのたるみや輪郭のゆるみとセットで気になりやすい毛穴です。"
    case "clogged":
      return "ターンオーバーの乱れや乾燥によって角質が厚くなり、白い角栓やザラつきとして目立つタイプです。ゴシゴシ洗いでさらにゴワつきやすい傾向があります。"
  }
}

function getOneLinerAdvice(type: PoreType): string {
  switch (type) {
    case "blackhead":
      return "「取る」より「ため込まない」。クレンジングのやさしさと頻度を見直してみましょう。"
    case "open":
      return "テカりは保湿不足のサインかも。まずはうるおいの土台づくりから。"
    case "sagging":
      return "ハリ・うるおい・紫外線対策の3本柱で、少しずつ毛穴の向きを整えていきましょう。"
    case "clogged":
      return "洗いすぎをやめて、保湿とマイルドな角質ケアでふっくら肌を目指しましょう。"
  }
}

function getQuickPlans(type: PoreType): {
  threeDay: string[]
  oneWeek: string[]
} {
  switch (type) {
    case "blackhead":
      return {
        threeDay: [
          "毎日同じタイミングでクレンジングする習慣をつける（夜は必ずメイク・皮脂をオフ）",
          "ゴシゴシこすらず、30〜40秒かけて指の腹でくるくるなじませてから洗い流す",
          "洗顔後はすぐに化粧水＋乳液またはクリームで「乾燥ぐすみ」を防ぐ",
        ],
        oneWeek: [
          "週1〜2回だけ、酵素洗顔やマイルドピーリングで角栓をため込まないサイクルを作る",
          "ビタミンC誘導体入りの美容液をTゾーン中心に取り入れ、皮脂とキメを同時にケア",
          "毛穴パックや強いスクラブはお休みして、毛穴まわりの赤み・炎症をリセットする期間にする",
        ],
      }
    case "open":
      return {
        threeDay: [
          "朝晩のスキンケアで「化粧水→乳液またはクリーム」の基本保湿をかならず行う",
          "Tゾーンは皮脂コントロール系の下地や美容液をポイント使いにとどめる",
          "クレンジング・洗顔は1日2回までにし、さっぱりしすぎるアイテムは一旦お休み",
        ],
        oneWeek: [
          "セラミドやアミノ酸系成分入りの保湿アイテムを取り入れて、インナードライを立て直す",
          "湯船やホットタオルで血行を促しつつ、こすらないクレンジングに切り替える",
          "睡眠時間と就寝時間を整え、皮脂バランスが乱れにくい生活リズムを意識する",
        ],
      }
    case "sagging":
      return {
        threeDay: [
          "クレンジング・洗顔・保湿を「下から上へ・こすらない」塗り方に統一する",
          "日中は必ずUVケアを行い、ほお〜フェイスラインにもていねいに塗り広げる",
          "夜はハリケア成分（レチノール・ペプチド・ビタミンCなど）入りアイテムを一点投入",
        ],
        oneWeek: [
          "保湿＆ハリケアラインでスキンケアを揃え、同じラインを1週間続けて肌の土台を整える",
          "スマホを見る角度や姿勢を見直し、「下を向きっぱなしの時間」を減らす",
          "フェイスラインを引き上げるマッサージは、1日1回・1分以内の“やさしいタッチ”に限定する",
        ],
      }
    case "clogged":
    default:
      return {
        threeDay: [
          "摩擦の少ないミルク〜ジェルクレンジングに変え、ゴシゴシ洗いをやめる",
          "洗顔後は化粧水を2〜3回に分けて重ねづけし、「しっとり吸いつく」感覚までうるおす",
          "ベタつきが気になる部分だけ軽めの乳液、それ以外はクリームで保護する",
        ],
        oneWeek: [
          "週1〜2回、酵素洗顔やマイルドピーリングでごわつきをリセットする習慣をつくる",
          "ノンコメドジェニック処方のベースメイクに切り替え、日中の毛穴詰まりを増やさない",
          "乾燥しやすい頬・口周りには、オイルイン美容液やバームで“守りの保湿”を追加する",
        ],
      }
  }
}

/** [[…]] を強調（ローズ）に変換 */
function renderRichText(text: string) {
  const regex = /\[\[([^\]]+)\]\]/g
  const nodes: ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(text.slice(last, m.index))
    }
    nodes.push(
      <span key={key++} className="font-semibold text-rose-700">
        {m[1]}
      </span>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) {
    nodes.push(text.slice(last))
  }
  return <>{nodes}</>
}

function PoreResultSectionHeading({
  step,
  title,
  description,
}: {
  step: string
  title: string
  description?: string
}) {
  return (
    <div className="flex gap-3">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-base font-bold text-rose-600 ring-1 ring-rose-100"
        aria-hidden
      >
        {step}
      </span>
      <div className="min-w-0 flex-1 border-b border-gray-100 pb-3">
        <h3 className="text-base font-bold text-gray-900 md:text-lg">{title}</h3>
        {description ? <p className="mt-1 text-sm text-gray-500">{description}</p> : null}
      </div>
    </div>
  )
}

function PoreConclusionBanner({
  kicker = "いま大事なこと",
  title,
  subtitle,
  bullets,
}: {
  kicker?: string
  title: string
  subtitle: string
  bullets: string[]
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-rose-200/90 bg-white shadow-sm ring-1 ring-white/80 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent">
      <div
        className="relative border-b border-rose-400/45 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] md:px-6 md:py-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgb(255 228 230) 0px, rgb(255 228 230) 8px, rgb(255 255 255) 8px, rgb(255 255 255) 16px)",
        }}
      >
        <p className="text-center text-xs font-semibold tracking-wide text-rose-600 md:text-sm">{kicker}</p>
        <p className="mt-2 text-center text-lg font-bold text-gray-900 md:text-xl">{title}</p>
        <p className="mt-2 text-center text-sm leading-relaxed text-gray-700 md:text-base">{subtitle}</p>
      </div>
      <ul className="relative space-y-3 bg-gradient-to-b from-rose-50/50 via-white to-white px-4 py-4 md:space-y-3.5 md:px-6 md:py-5">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex gap-3 rounded-xl border border-rose-100/80 bg-white/95 px-3 py-3 text-sm leading-relaxed text-gray-800 md:gap-3.5 md:text-base md:leading-relaxed md:px-4 md:py-3.5"
          >
            <span
              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-rose-400 to-rose-600"
              aria-hidden
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PoreNgCard({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <div className="group relative mt-2 overflow-visible rounded-2xl border border-rose-200/90 bg-white shadow-sm transition-[transform,box-shadow] duration-200 md:hover:shadow">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      <div
        className="relative border-b border-rose-400/45 pl-16 pr-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] md:pl-20 md:pr-4 md:py-3.5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgb(255 241 242) 0px, rgb(255 241 242) 6px, rgb(255 255 255) 6px, rgb(255 255 255) 12px)",
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-rose-300/25 to-transparent" />
        <span className="pointer-events-none absolute -left-4 top-1 z-20 rotate-[-17deg] md:-left-5 md:top-1.5" aria-hidden>
          <span className="relative inline-flex items-center justify-center rounded-sm bg-gradient-to-br from-red-500 via-red-600 to-rose-700 px-3 py-1 text-[11px] font-extrabold leading-none tracking-wide text-white shadow-sm ring-1 ring-white/25 md:px-3.5 md:py-1.5 md:text-xs">
            <span className="absolute inset-x-1.5 top-0.5 h-1 rounded-full bg-white/25" />
            NG!
          </span>
          <span className="absolute -bottom-[5px] left-2 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-red-900/55 md:left-2.5" />
        </span>
        <div className="flex items-start">
          <p className="pt-0.5 text-sm font-bold leading-snug text-gray-900 md:text-[15px]">
            <span className="mr-1.5 font-semibold text-rose-600">{step}</span>
            {title}
          </p>
        </div>
      </div>
      <div className="relative border-t border-rose-100/90 bg-gradient-to-b from-white via-white to-gray-50/50 px-3 py-3.5 text-sm leading-relaxed text-gray-800 md:px-4 md:py-4">
        {children}
      </div>
    </div>
  )
}

function getResultImage(type: PoreType): { src: string; alt: string } {
  switch (type) {
    case "blackhead":
      return {
        src: "/beauty/diagnosis/pore-type/result-blackhead-closeup-4x3.webp",
        alt: "黒ずみ毛穴タイプのイメージ（鼻のクローズアップ）",
      }
    case "open":
      return {
        src: "/beauty/diagnosis/pore-type/result-open-4x3.webp",
        alt: "開き毛穴タイプのイメージ",
      }
    case "sagging":
      return {
        src: "/beauty/diagnosis/pore-type/result-sagging-4x3.webp",
        alt: "たるみ毛穴タイプのイメージ",
      }
    case "clogged":
    default:
      return {
        src: "/beauty/diagnosis/pore-type/result-clogged-closeup-4x3.webp",
        alt: "詰まり毛穴タイプのイメージ（鼻のクローズアップ）",
      }
  }
}

function getNgImage(step: string): { src: string; alt: string } | null {
  if (step === "01") {
    return {
      src: "/beauty/diagnosis/pore-type/ng-pack-closeup-4x3.webp",
      alt: "NGケア例：黒いピールオフパックを剥がす途中",
    }
  }
  if (step === "02") {
    return {
      src: "/beauty/diagnosis/pore-type/ng-scrub-4x3.webp",
      alt: "NGケア例：スクラブの使いすぎ",
    }
  }
  if (step === "03") {
    return {
      src: "/beauty/diagnosis/pore-type/ng-steamer-4x3.webp",
      alt: "NGケア例：スチーマー後のケア不足",
    }
  }
  return null
}

function getResultConclusion(type: PoreType): { title: string; subtitle: string; bullets: string[] } {
  switch (type) {
    case "blackhead":
      return {
        title: "黒ずみが気になるなら",
        subtitle: "無理に抜くより、溜まりにくい流れにしてあげるほうがラクです。",
        bullets: [
          "クレンジングはゴシゴシより、なじませる時間をとる。洗いすぎはかえって黒ずみが濃く見えることもあります。",
          "角質ケアは週に1〜2回くらいで十分なことが多いです。ビタミンC系の美容液でざらつきを整えるのもあり。",
          "毛穴パックや強いスクラブは、一瞬スッキリしても荒れやすいので、頻度は控えめにしたほうが無難です。",
        ],
      }
    case "open":
      return {
        title: "開きが気になるなら",
        subtitle: "さっぱり系だけに寄せると、乾いてテカって…となりやすいです。",
        bullets: [
          "まずは洗顔のあと、化粧水と乳液かクリームでちゃんとうるおす。ここが抜けると開きが目立ちやすいです。",
          "皮脂ケアは顔全体より、Tゾーンだけに絞ると失敗しにくいです。",
          "洗顔は1日2回まで。拭き取りローションだけで済ませるのは、肌によっては負担になります。",
        ],
      }
    case "sagging":
      return {
        title: "たるみ毛穴っぽいなら",
        subtitle: "紫外線・乾燥・摩擦が重なると、毛穴が下向きに見えやすくなります。",
        bullets: [
          "保湿に加えて、ハリケアやUV、どれか一つでも足してみると変わりやすいです（レチノール・ペプチド・ビタミンCなど）。",
          "クレンジングや洗顔は、こすらない・下から上へ、を意識するだけでも違います。",
          "長時間の引き上げマッサージより、夜のケアを少しずつ続けるほうが現実的です。",
        ],
      }
    case "clogged":
    default:
      return {
        title: "詰まり・ザラつきが気になるなら",
        subtitle: "洗えば洗うほどよくなる、とは限りません。",
        bullets: [
          "刺激の少ないクレンジングにして、洗顔後は化粧水を重ねてしっとりするまで。",
          "角質ケアは週1〜2回の酵素洗顔などで十分なことも多いです。",
          "ファンデは、詰まりにくい表記のものを選ぶと、昼間のケアも楽になります。",
        ],
      }
  }
}

function getPositiveCareTips(type: PoreType): { title: string; items: string[] } {
  if (type === "blackhead") {
    return {
      title: "今日からできるOKケア（優先度高）",
      items: [
        "クレンジングは「毛穴・皮脂ケア」表記のミルク〜バームタイプを選び、やさしく時間をかけてなじませる",
        "ゴシゴシ洗顔や1日に何度も洗うことは避け、泡で包むように洗う",
        "ビタミンC誘導体やナイアシンアミド配合の化粧水・美容液を取り入れ、皮脂と角質を整える",
        "週1〜2回のマイルドな角質ケア（酵素洗顔やAHA入り洗顔料など）でため込みにくい状態にする",
      ],
    }
  }
  if (type === "open") {
    return {
      title: "今日からできるOKケア（優先度高）",
      items: [
        "洗顔後すぐに保湿をして、肌の水分バランスを整える",
        "アルコール強めの収れん化粧水だけに頼らず、セラミドなどの保湿成分も重視する",
        "皮脂コントロール系の下地・美容液をTゾーン中心にポイント使いする",
        "睡眠・食事・ストレスなど、生活リズムも整えて皮脂バランスを安定させる",
      ],
    }
  }
  if (type === "sagging") {
    return {
      title: "今日からできるOKケア（優先度高）",
      items: [
        "保湿とハリ感ケア（レチノール・ペプチド・ビタミンCなど）を組み合わせて使う",
        "摩擦を避けるため、クレンジングやスキンケアは「下から上へ・こすらない」塗り方を意識する",
        "日中の紫外線対策を一年中行い、光老化によるたるみを防ぐ",
        "表情筋や姿勢のクセなど、生活習慣にも目を向ける",
      ],
    }
  }
  return {
    title: "今日からできるOKケア（優先度高）",
    items: [
      "摩擦の少ないクレンジングと十分な保湿で、肌のごわつきをやわらげる",
      "週1〜2回を目安に、酵素洗顔やマイルドピーリングを取り入れる",
      "オイルフリー・ノンコメドジェニック表記のベースメイクやスキンケアを選ぶ",
      "乾燥を感じる部分には、クリームやバームで部分的に保護する",
    ],
  }
}

function getDetailedNgBlocks(type: PoreType): { step: string; title: string; paragraphs: string[] }[] {
  if (type === "blackhead") {
    return [
      {
        step: "01",
        title: "貼って剥がすシートパックで角栓を取り続ける",
        paragraphs: [
          "一瞬スッキリするので手放せなくなりがちですが、[[毛穴の周りの角質まで剥がしてしまい]]、バリアが傷つきやすいケアです。",
          "くり返すと黒ずみが「濃く見える」だけでなく、炎症や赤みのリスクも上がります。どうしても使うなら頻度を極端に減らし、直後は必ず保湿で守ってください。",
        ],
      },
      {
        step: "02",
        title: "粒子の細かいスクラブでゴシゴシ洗う",
        paragraphs: [
          "細かい粒子が毛穴に残ったり、摩擦で肌が赤くなったりしやすいです。[[洗い流しきれていないとトラブルの原因]]にもなり得ます。",
          "どうしても使うなら週1回までの“特別ケア”にとどめ、圧は極力弱く。普時は酵素洗顔など、やさしい角質ケアに寄せるのが無難です。",
        ],
      },
      {
        step: "03",
        title: "オイルクレンジングを「さっぱりするまで」何度も使う",
        paragraphs: [
          "皮脂が気になるほど洗い切りたくなりますが、[[必要以上のオイル洗浄は乾燥を招き、逆に皮脂分泌を刺激]]しやすいです。",
          "適量・適度なマッサージ時間に決め、ダブル洗顔は肌状態に合わせて調整しましょう。",
        ],
      },
    ]
  }
  if (type === "open") {
    return [
      {
        step: "01",
        title: "アルコール強めの収れん化粧水だけで引き締める",
        paragraphs: [
          "一時的にサラサラしても、[[保湿が足りないと乾燥から皮脂が増え、開きが目立つ]]流れを作りやすいです。",
          "収れんは“ポイント”にとどめ、セラミドなどの保湿で土台を先に整えるのが近道です。",
        ],
      },
      {
        step: "02",
        title: "テカり対策に洗顔の回数を増やす",
        paragraphs: [
          "洗うたびに必要なうるおいまで落ち、皮脂バランスが不安定になりやすいです。[[1日2回＋すぐ保湿]]が基本形です。",
        ],
      },
      {
        step: "03",
        title: "拭き取り化粧水で何度もこする",
        paragraphs: [
          "摩擦が開き・赤みの原因になりやすいです。拭くなら圧を弱く、[[パッティング中心の保湿]]へ寄せるのが安全です。",
        ],
      },
    ]
  }
  if (type === "sagging") {
    return [
      {
        step: "01",
        title: "強い引き上げマッサージを長時間続ける",
        paragraphs: [
          "摩擦や刺激で肌が荒れ、ハリより赤み・たるみが目立つことがあります。[[短時間・やさしいタッチ]]に限定しましょう。",
        ],
      },
      {
        step: "02",
        title: "下地やコンシーラーだけで隠して夜ケアを省く",
        paragraphs: [
          "見た目のカバーは大事ですが、[[夜の保湿・ハリケア・UV]]がないと改善のスピードが落ちます。",
        ],
      },
      {
        step: "03",
        title: "紫外線対策を「焼ける日だけ」にする",
        paragraphs: [
          "光老化はたるみ毛穴の見え方を左右します。SPFだけでなく、帽子や日傘などの物理防御も組み合わせるのがおすすめです。",
        ],
      },
    ]
  }
  return [
    {
      step: "01",
      title: "角栓を指や爪で押し出す",
      paragraphs: [
        "炎症や色素沈着のリスクが高く、毛穴の開き悪化につながりやすいです。[[マイルド角質ケア＋保湿]]で少しずつ柔らかくする方向へ。",
      ],
    },
    {
      step: "02",
      title: "「皮脂＝悪」でさっぱり系だけを続ける",
      paragraphs: [
        "乾燥が進むと角質が厚くなり、[[詰まりとゴワつきが強くなる]]ことがあります。保湿を同時に見直しましょう。",
      ],
    },
    {
      step: "03",
      title: "毎日スクラブでザラつきを削る",
      paragraphs: [
        "摩擦でバリアが傷つき、逆に詰まりやすい肌になりがちです。頻度は週1回までに抑え、酵素洗顔などへ切り替えるのが無難です。",
      ],
    },
  ]
}

/** SEO本文用：誰にでも当てはまる「毛穴NG」3選（検索意図・読みやすさ重視） */
const UNIVERSAL_PORE_NG_SEO: { step: string; title: string; paragraphs: string[] }[] = [
  {
    step: "01",
    title: "貼って剥がすシートパックで角栓を取る",
    paragraphs: [
      "スッキリ感がある一方で、[[毛穴周りの角質を物理的に引き剥がしやすく]]、バリア機能を下げてしまう可能性があります。",
      "くり返すと黒ずみ・開き・赤みが悪化しやすいので、頻度は極力控え、マイルドな角質ケアへ置き換えるのがおすすめです。",
    ],
  },
  {
    step: "02",
    title: "粒子入りスクラブでゴシゴシ洗う",
    paragraphs: [
      "細かい粒子が毛穴に残ったり、強い摩擦で肌が赤くなったりしやすいです。[[しっかり洗い流すこと]]と、週1回程度の特別ケアにとどめるのが安全です。",
    ],
  },
  {
    step: "03",
    title: "サウナやスチーマー後に保湿せず放置する",
    paragraphs: [
      "温めで一時的に開いた毛穴は、その後のケアで整えないと[[乾燥や刺激を受けやすい]]状態になります。",
      "収れん＋保湿で“閉じる・守る”工程をセットにし、むやみに開いたままにしないのがポイントです。",
    ],
  },
]

export function PoreTypeDiagnosisClient() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | undefined>>({})
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = QUESTIONS[currentIndex]
  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== undefined).length,
    [answers],
  )
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100)

  const diagnosis = useMemo(() => calculateDiagnosis(answers), [answers])

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const goNext = () => {
    if (!answers[currentQuestion.id]) return
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else if (diagnosis) {
      setShowResult(true)
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const reset = () => {
    setAnswers({})
    setCurrentIndex(0)
    setShowResult(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BeautySiteHeader />
      <BeautyBackgroundAnimation />
      <ScrollToTop />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 space-y-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100/80 shadow-sm ring-1 ring-black/5">
                <Image
                  src="/beauty/diagnosis/pore-type/hero-main-4x3.webp"
                  alt="毛穴ケアをイメージしたビジュアル"
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 border border-gray-200 mb-2">
                  <Sparkles className="h-4 w-4 text-rose-500" />
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-600 uppercase">
                    Pore Diagnosis
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  毛穴タイプ診断（無料）で、毛穴悩みの原因をチェック
                </h1>
                <p className="text-sm md:text-base text-gray-700">
                  黒ずみ・開き・たるみ・詰まり…。あなたの毛穴悩みがどのタイプかをチェックし、
                  タイプ別のケアの方向性をお伝えします。所要時間は約1〜2分です。
                </p>
              </div>
            </div>

            <Card className="rounded-2xl border border-gray-200/90 bg-white/95 shadow-sm ring-1 ring-white/80 backdrop-blur-sm">
              {!showResult ? (
                <>
                  <CardHeader className="px-4 pb-3 pt-5 sm:px-6 md:px-8">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <CardTitle className="text-sm md:text-base text-gray-900">
                        Q{currentIndex + 1} / {QUESTIONS.length}
                      </CardTitle>
                      <span className="rounded-full bg-gray-100/90 px-2 py-0.5 text-[11px] font-medium text-gray-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                        回答済み {answeredCount} / {QUESTIONS.length}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2.5 bg-gray-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]" />
                    <p className="mt-2 text-[11px] text-gray-500">
                      すべて選んでも{" "}
                      <span className="font-semibold text-gray-700">1〜2分</span>
                      で終わります。
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-5 px-4 pb-6 pt-0 sm:px-6 md:px-8">
                    <div>
                      <p className="mb-4 text-center text-lg font-semibold leading-snug text-gray-900 md:text-xl">
                        {currentQuestion.text}
                      </p>
                      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3">
                        {currentQuestion.options.map((option) => {
                          const selected = answers[currentQuestion.id] === option.id
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => handleSelect(currentQuestion.id, option.id)}
                              className={`min-h-[3.25rem] w-full rounded-xl border px-3 py-3.5 text-left text-sm transition-all duration-200 active:scale-[0.99] md:min-h-0 md:py-3 md:text-[15px] ${
                                selected
                                  ? "border-rose-400 bg-gradient-to-br from-rose-50 to-white text-gray-900 shadow-[0_8px_28px_-10px_rgba(244,63,94,0.35),0_2px_8px_-4px_rgba(0,0,0,0.06)] ring-2 ring-rose-200/80"
                                  : "border-gray-200/90 bg-white text-gray-800 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)] hover:border-rose-200/80 hover:bg-rose-50/50 hover:shadow-[0_6px_20px_-10px_rgba(244,63,94,0.15)]"
                              }`}
                              aria-pressed={selected}
                            >
                              {option.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={goPrev}
                        disabled={currentIndex === 0}
                        className="order-2 h-11 min-h-[44px] w-full justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 sm:order-1 sm:h-9 sm:min-h-0 sm:w-auto sm:justify-start"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        まえの質問へ
                      </Button>

                      <div className="order-1 flex w-full flex-col gap-2 sm:order-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={reset}
                          className="h-11 min-h-[44px] w-full border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50 sm:h-9 sm:min-h-0 sm:w-auto"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          最初からやり直す
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={goNext}
                          disabled={!answers[currentQuestion.id]}
                          className="h-12 min-h-[48px] w-full bg-rose-500 text-base font-semibold shadow-[0_8px_24px_-6px_rgba(244,63,94,0.55)] hover:bg-rose-600 active:scale-[0.99] sm:h-9 sm:min-h-0 sm:w-auto sm:text-sm sm:font-medium sm:shadow-md"
                        >
                          {currentIndex === QUESTIONS.length - 1 ? "診断結果を見る" : "つぎの質問へ"}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : diagnosis ? (
                <>
                  <CardHeader className="border-b border-gray-100 px-4 pb-4 pt-6 sm:px-6 md:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 ring-1 ring-rose-100">
                          <Sparkles className="h-5 w-5 text-rose-500" />
                        </div>
                        <CardTitle className="text-base font-bold text-gray-900 md:text-lg">診断結果</CardTitle>
                      </div>
                      <Badge className="shrink-0 bg-rose-500 text-[11px] text-white">無料</Badge>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-gray-500 md:text-sm">
                      回答にもとづく目安です。医療の診断ではありません。赤み・痛み・にきびが強いときは皮膚科へ。
                      <span className="mt-1 block text-[11px] text-gray-400">
                        各質問でタイプ別に点数を足し、いちばん高いタイプを表示しています。同点のときは「一番気になる悩み」の回答を優先します。
                      </span>
                    </p>
                    <div className="mt-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={reset}
                        className="h-11 w-full gap-2 border-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-50 sm:h-10"
                      >
                        <RotateCcw className="h-4 w-4 shrink-0" aria-hidden />
                        もう一度診断する
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8 px-4 pb-8 pt-6 sm:px-6 md:space-y-10 md:px-8 md:pb-10 md:pt-8">
                    {/* 1. ヒーロー：タイプ名 → 説明 → まずここだけ */}
                    <section aria-labelledby="pore-result-type-title" className="space-y-4">
                      <PoreResultSectionHeading
                        step="1"
                        title="あなたのタイプ"
                        description="いちばん大きい文字が、今回の診断の答えです。"
                      />
                      <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/90 via-white to-white p-4 shadow-sm md:p-6">
                        {(() => {
                          const resultImage = getResultImage(diagnosis.type)
                          return (
                            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1fr)_220px] md:gap-6">
                              <div className="mx-auto w-full max-w-[280px] md:order-2 md:max-w-none">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                                  <Image
                                    src={resultImage.src}
                                    alt={resultImage.alt}
                                    fill
                                    sizes="(max-width: 768px) 80vw, 220px"
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                              <div className="md:order-1">
                                <h2
                                  id="pore-result-type-title"
                                  className="text-center text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-left md:text-4xl"
                                >
                                  {getTypeLabel(diagnosis.type)}
                                </h2>
                                <p className="mt-3 text-center text-[15px] leading-relaxed text-gray-700 md:mt-4 md:text-left md:text-lg">
                                  {getTypeDescription(diagnosis.type)}
                                </p>
                                <div className="mt-4 rounded-2xl border border-rose-100 bg-white/90 p-4 md:mt-6 md:p-5">
                                  <p className="text-xs font-semibold text-rose-600 md:text-sm">まずここだけ</p>
                                  <p className="mt-2 text-sm font-medium leading-relaxed text-gray-900 md:text-base">
                                    {getOneLinerAdvice(diagnosis.type)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                      <div className="mt-5 flex justify-center md:justify-start">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={reset}
                          className="h-10 gap-2 text-sm text-gray-600 hover:bg-rose-50 hover:text-gray-900"
                        >
                          <RotateCcw className="h-4 w-4 shrink-0" aria-hidden />
                          もう一度診断する
                        </Button>
                      </div>
                    </section>

                    {/* 2. いま大事なこと */}
                    <section className="space-y-4" aria-labelledby="pore-result-focus">
                      <div id="pore-result-focus">
                        <PoreResultSectionHeading
                          step="2"
                          title="いま大事なこと"
                          description="ケアの順番を間違えると、毛穴が余計に目立つこともあります。"
                        />
                      </div>
                      {(() => {
                        const c = getResultConclusion(diagnosis.type)
                        return <PoreConclusionBanner title={c.title} subtitle={c.subtitle} bullets={c.bullets} />
                      })()}
                    </section>

                    {/* 3. 今日からのステップ */}
                    <section className="space-y-4" aria-labelledby="pore-result-steps">
                      <div id="pore-result-steps">
                        <PoreResultSectionHeading
                          step="3"
                          title="今日からのステップ"
                          description="すぐ試せる3日分と、1週間の整え方です。"
                        />
                      </div>
                      {(() => {
                        const plans = getQuickPlans(diagnosis.type)
                        return (
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
                            <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-br from-rose-50/80 to-white p-4 shadow-sm md:p-5">
                              <p className="text-sm font-bold text-rose-700 md:text-base">最初の3日間</p>
                              <ul className="mt-3 space-y-2.5">
                                {plans.threeDay.map((item) => (
                                  <li
                                    key={item}
                                    className="flex gap-2.5 text-[15px] leading-relaxed text-gray-800"
                                  >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
                              <p className="text-sm font-bold text-gray-900 md:text-base">この1週間で</p>
                              <ul className="mt-3 space-y-2.5">
                                {plans.oneWeek.map((item) => (
                                  <li
                                    key={item}
                                    className="flex gap-2.5 text-[15px] leading-relaxed text-gray-800"
                                  >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )
                      })()}
                    </section>

                    {/* 4. OK */}
                    <section className="space-y-4" aria-labelledby="pore-result-ok">
                      <div id="pore-result-ok">
                        <PoreResultSectionHeading step="4" title="やってよいこと" description="迷ったらこの順で。" />
                      </div>
                      {(() => {
                        const ok = getPositiveCareTips(diagnosis.type)
                        return (
                          <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-white p-4 shadow-sm md:p-5">
                            <div className="mb-4 flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-[11px] font-extrabold text-white shadow-sm ring-2 ring-white/80">
                                OK
                              </span>
                              <p className="text-base font-bold text-gray-900 md:text-lg">{ok.title}</p>
                            </div>
                            <ul className="space-y-3">
                              {ok.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex gap-3 text-[15px] leading-relaxed text-gray-800"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })()}
                    </section>

                    {/* 5. 次のアクション */}
                    <section
                      className="border-t border-gray-100 pt-6"
                      aria-label="次にできること"
                    >
                      <p className="mb-4 text-center text-sm text-gray-600 md:text-left">
                        理由がわかると、ケアの迷いが減ります。
                      </p>
                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                        <Button
                          asChild
                          size="sm"
                          className="h-12 min-h-[48px] w-full bg-rose-500 text-base font-semibold text-white shadow-sm hover:bg-rose-600 sm:order-1 sm:h-11 sm:min-h-0 sm:w-auto sm:text-sm"
                        >
                          <Link href="/beauty/articles/pore-type">解説記事を読む</Link>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={reset}
                          className="h-11 min-h-[44px] w-full border-gray-200 text-sm sm:order-2 sm:h-10 sm:min-h-0 sm:w-auto"
                        >
                          もう一度診断する
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="h-11 min-h-[44px] w-full border-gray-200 text-sm sm:order-3 sm:h-10 sm:min-h-0 sm:w-auto"
                        >
                          <Link href="/beauty">YokaUnit Beauty トップへ</Link>
                        </Button>
                      </div>
                    </section>
                  </CardContent>
                </>
              ) : (
                <CardContent className="py-8 text-center text-sm text-gray-700">
                  回答内容の集計中にエラーが発生しました。お手数ですが、最初からやり直してください。
                  <div className="mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={reset}
                      className="text-gray-700 border-gray-200 hover:bg-gray-50"
                    >
                      最初からやり直す
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* 診断ページ内の解説（SEO本文） */}
            <section className="mt-10 md:mt-12">
              <div className="rounded-3xl border border-gray-200/85 bg-white/90 p-5 shadow-sm ring-1 ring-white/90 backdrop-blur-[2px] md:p-7">
                <p className="text-xs font-semibold tracking-wider text-rose-500 mb-2">GUIDE</p>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  毛穴タイプ診断の見方と、タイプ別ケアの考え方
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  黒ずみ・開き・たるみ・詰まり…タイプによって、まず手を入れたいところが違います。
                  この診断は医療の診断ではありませんが、日々のケアの方向性を整理するためのヒントとして使えます。
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-8">
                  毛穴でつまずきやすいのは、成分より先に
                  <span className="font-semibold text-rose-700">こすりすぎ・洗いすぎ・保湿不足</span>
                  が残っているケース。まずはNGを減らしてから、角質ケアと保湿を足すとやりやすいです。
                </p>

                <PoreConclusionBanner
                  kicker="タイプ別の目安"
                  title="まずどこから手をつけるか"
                  subtitle="黒ずみ・開き・たるみ・詰まりで、そろえる順番がちょっとずつ違います。"
                  bullets={[
                    "黒ずみ：クレンジングをやさしく＋週に数回の角質ケア（酵素洗顔やAHA入りなど）",
                    "開き：うるおいを先に。皮脂ケアはTゾーンだけに絞るとやりやすいです",
                    "たるみ：保湿・ハリケア・UVのどれかを足す。摩擦はできるだけ減らす",
                    "詰まり：洗いすぎをやめて保湿してから、ピーリング系は週1〜2回くらいに",
                  ]}
                />

                <h2 className="mt-10 text-lg md:text-xl font-bold text-gray-900">
                  毛穴ケアのNG行動（検索でもよく質問される落とし穴）
                </h2>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed mb-5">
                  「毛穴パック 毎日」「スクラブ 毛穴」「スチーマー 毛穴」など、一時的にスッキリする方法ほど、バリアを削って悪化しやすいものがあります。
                  下記は代表的なNGです（結果画面のデザインと同じく、重要度が伝わるよう強調しています）。
                </p>
                <div className="space-y-4">
                  {UNIVERSAL_PORE_NG_SEO.map((block) => (
                    <PoreNgCard key={block.step + block.title} step={block.step} title={block.title}>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_210px] md:items-start">
                        <div>
                          {block.paragraphs.map((para, idx) => (
                            <p key={`seo-${block.step}-${idx}`} className="mb-3 text-[15px] leading-relaxed last:mb-0 md:text-base">
                              {renderRichText(para)}
                            </p>
                          ))}
                        </div>
                        {(() => {
                          const ngImage = getNgImage(block.step)
                          if (!ngImage) return null
                          return (
                            <div className="w-full md:pt-1">
                              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-100 bg-white">
                                <Image
                                  src={ngImage.src}
                                  alt={ngImage.alt}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 210px"
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    </PoreNgCard>
                  ))}
                </div>

                <h3 className="mt-10 text-base md:text-lg font-bold text-gray-900">
                  検索ニーズ別：この診断が役立つキーワード例
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-800 leading-relaxed">
                  <li>
                    <span className="font-semibold">黒ずみ毛穴 原因／毛穴 の 黒い 点</span>
                    ：皮脂の酸化や角栓、洗い残し・摩擦が絡みやすいです。無理に抜くより、クレンジング時間と保湿を見直すのが先です。
                  </li>
                  <li>
                    <span className="font-semibold">開き毛穴 化粧水／毛穴 引き締め</span>
                    ：収れんだけに寄せると乾燥しやすく、開きが目立つことも。保湿成分とバランスが鍵です。
                  </li>
                  <li>
                    <span className="font-semibold">たるみ毛穴／年齢 毛穴</span>
                    ：ハリ低下と光老化が重なると、毛穴が下向きに見えやすくなります。UVと摩擦対策をセットで。
                  </li>
                  <li>
                    <span className="font-semibold">角栓 詰まり／鼻 いちご鼻</span>
                    ：ゴワつきは保湿不足で厚くなることも。洗う強さより、柔らかくしてから角質ケアが安全です。
                  </li>
                </ul>

                <div className="mt-8 rounded-2xl border border-gray-200/85 bg-gradient-to-b from-white to-gray-50/40 p-4 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] md:p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-3">よくある質問</h3>
                  <div className="space-y-2">
                    <details className="rounded-xl border border-gray-200/90 bg-white px-4 py-3 shadow-sm transition-shadow open:shadow-md">
                      <summary className="flex min-h-[44px] cursor-pointer list-none items-center text-sm font-semibold text-gray-900 [-webkit-tap-highlight-color:transparent]">
                        毛穴パックは毎週やっていい？
                      </summary>
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                        基本はおすすめしません。角栓を物理的に抜く刺激で毛穴周りが傷つき、黒ずみ・開きが悪化しやすいです。
                        週1〜2回の“マイルド角質ケア”に置き換える方が安定しやすいです。
                      </p>
                    </details>
                    <details className="rounded-xl border border-gray-200/90 bg-white px-4 py-3 shadow-sm transition-shadow open:shadow-md">
                      <summary className="flex min-h-[44px] cursor-pointer list-none items-center text-sm font-semibold text-gray-900 [-webkit-tap-highlight-color:transparent]">
                        黒ずみ毛穴は洗えば洗うほど良くなる？
                      </summary>
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                        逆です。洗いすぎは乾燥→皮脂増加→角栓が溜まりやすくなる流れを作りがち。
                        大切なのは“落とす強さ”より“ため込まない習慣化”です。
                      </p>
                    </details>
                    <details className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                      <summary className="flex min-h-[44px] cursor-pointer list-none items-center text-sm font-semibold text-gray-900 [-webkit-tap-highlight-color:transparent]">
                        毛穴タイプ診断の結果は絶対？
                      </summary>
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                        簡易的な傾向チェックです。肌の状態は季節・ホルモン・生活で変わります。赤み・痛み・にきびが強い場合は皮膚科の受診を優先してください。
                      </p>
                    </details>
                    <details className="rounded-xl border border-gray-200/90 bg-white px-4 py-3 shadow-sm transition-shadow open:shadow-md">
                      <summary className="flex min-h-[44px] cursor-pointer list-none items-center text-sm font-semibold text-gray-900 [-webkit-tap-highlight-color:transparent]">
                        ビタミンC美容液は黒ずみ毛穴に効く？
                      </summary>
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                        くすみ・皮脂バランスのケア目的で選ばれることが多いです。ただし刺激が強い製品は段階的に。まずは保湿が整っているか確認してから導入するのが無難です。
                      </p>
                    </details>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Button
                    asChild
                    className="h-12 min-h-[48px] w-full bg-rose-500 text-sm font-semibold shadow-[0_8px_22px_-6px_rgba(244,63,94,0.45)] hover:bg-rose-600 active:scale-[0.99] sm:h-11 sm:min-h-0 sm:w-auto sm:text-sm sm:font-medium sm:shadow-md"
                  >
                    <Link href="/beauty/articles/pore-type">毛穴タイプ解説記事を読む</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 min-h-[44px] w-full border-gray-200 text-sm text-gray-700 shadow-sm hover:bg-gray-50 sm:h-10 sm:min-h-0 sm:w-auto"
                  >
                    <Link href="/beauty/articles">解説記事一覧へ</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      <BeautySiteFooter />
    </div>
  )
}

