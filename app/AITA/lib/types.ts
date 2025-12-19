export interface AITAPost {
  id: string
  caseNumber: number
  title: string
  body: string
  bodyFull: string
  overseasReactions: string[]
  redditVerdict: {
    out: number
    safe: number
  }
  comments: Array<{
    id: string
    content: string
    likes: number
  }>
}

export interface PostState {
  hasVoted: boolean
  userVote: "out" | "safe" | null
  japaneseVerdict: { out: number; safe: number }
  isExpanded: boolean
}

