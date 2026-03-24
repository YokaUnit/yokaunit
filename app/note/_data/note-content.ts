import type { LucideIcon } from "lucide-react"
import { Clock3, Sparkles, TrendingUp } from "lucide-react"

export type NotePillar = {
  title: string
  description: string
  icon: LucideIcon
}

export type FeaturedNote = {
  title: string
  summary: string
  href: string
  tag: string
}

export type NoteCategory = {
  title: string
  description: string
}

export const notePillars: NotePillar[] = [
  {
    title: "毎日やることが多く、時間が足りない人",
    description: "仕事でも作業でも、迷いを減らして短くする具体策をまとめます。",
    icon: Clock3,
  },
  {
    title: "手順や判断基準がないと不安な人",
    description: "初心者でも迷子にならない形にして、チェック観点まで出します。",
    icon: Sparkles,
  },
  {
    title: "収益化や導線づくりの現実を知りたい人",
    description: "うまくいったことだけでなく、外した施策も含めて追えます。",
    icon: TrendingUp,
  },
]

export const featuredNotes: FeaturedNote[] = [
  {
    title: "はじめて公開するまでにやったことを時系列で整理",
    summary: "最初の公開までの流れを、詰まりどころ込みで解説。",
    href: "https://note.com/web_hisashi",
    tag: "開発ログ",
  },
  {
    title: "収益導線を作るときにやめたこと・残したこと",
    summary: "やめた施策と残した施策を、判断理由つきで整理。",
    href: "https://note.com/web_hisashi",
    tag: "運営メモ",
  },
  {
    title: "作業記録の取り方を変えて、継続しやすくした話",
    summary: "続かなかった管理方法をやめた実例。",
    href: "https://note.com/web_hisashi",
    tag: "改善記録",
  },
]

export const noteCategories: NoteCategory[] = [
  {
    title: "何から始めればいいか迷う人へ",
    description: "最初の一歩を決めるための実例と手順をまとめています。",
  },
  {
    title: "集客や導線で悩んでいる人へ",
    description: "読まれる導線づくりと改善の考え方を具体的に見られます。",
  },
  {
    title: "時間がなくても続けたい人へ",
    description: "手間を減らして続けるための時短アイデアを厳選しています。",
  },
]
