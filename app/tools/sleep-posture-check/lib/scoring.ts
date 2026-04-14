import { questions } from "./questions"
import type { SleepPostureAnswers, SleepPostureBand, SleepPostureResult } from "./types"

function optionPoints(questionId: keyof SleepPostureAnswers, optionId: string): number {
  const q = questions.find((x) => x.id === questionId)
  if (!q) return 0
  const opt = q.options.find((o) => o.id === optionId)
  return opt?.points ?? 0
}

export function computeSleepPostureResult(answers: SleepPostureAnswers): SleepPostureResult {
  const ids = questions.map((q) => q.id)
  let score = 0
  for (const id of ids) {
    const a = answers[id]
    if (a) score += optionPoints(id, a)
  }
  const maxScore = questions.reduce((sum, q) => {
    const m = Math.max(...q.options.map((o) => o.points), 0)
    return sum + m
  }, 0)

  let band: SleepPostureBand
  // 元の0〜30点相当の区分を踏襲（設問ごとの満点差は maxScore で正規化せず、しきい値で調整）
  if (score <= 7) band = "a"
  else if (score <= 15) band = "b"
  else if (score <= 22) band = "c"
  else band = "d"

  const byBand: Record<
    SleepPostureBand,
    { typeName: string; summary: string; tips: string[] }
  > = {
    a: {
      typeName: "首まわりラクな睡眠タイプ",
      summary:
        "寝姿勢・枕の感覚・朝の違和感が少なめの傾向です。今の習慣を維持しつつ、季節の変化や加齢で感覚が変わったら枕の見直しも検討すると安心です。",
      tips: [
        "寝る前のスマホ時間は現状のまま短めをキープ",
        "横向きが多い日は、枕の高さが変わったかだけ月1で確認",
        "マットレスのへたりは年に一度チェック",
      ],
    },
    b: {
      typeName: "ときどき負担が出るタイプ",
      summary:
        "首や睡眠環境に、波がありやすいタイプです。忙しい週・運転やデスクが長い日に症状が乗りやすいことがあります。枕・寝返り・就寝前の姿勢を少し整えると改善しやすいです。",
      tips: [
        "就寝30分前からは顔を下げる時間を減らす",
        "枕が「低い／高い」と感じた週は横向きの比率も確認",
        "首まわりの軽いストレッチを週3から試す",
      ],
    },
    c: {
      typeName: "睡眠環境が響きやすいタイプ",
      summary:
        "枕・布団・就寝前の姿勢など、睡眠の土台が首まわりに影響しやすい傾向です。いびきや朝の重さが気になる場合は、まずは寝具のフィットと寝姿勢の安定を優先して整えるのがおすすめです。",
      tips: [
        "仰向けと横向きで「首のすきま」が変わらないかを確認",
        "マットレスの凹凸が強いなら寝姿勢のクセも見直し",
        "改善が続く場合は専門家への相談も検討",
      ],
    },
    d: {
      typeName: "まずは寝具・姿勢を見直したいタイプ",
      summary:
        "複数のサインが重なりやすく、首まわりや睡眠環境の見直し余地が大きい傾向です。医療的な診断ではありませんが、枕・寝姿勢・就寝前ルーティンをセットで見直す価値が高い状態と言えます。",
      tips: [
        "枕は高さだけでなく「首の安定」を優先して試す",
        "就寝前スマホを短くし、首を前に出す時間を減らす",
        "強い痛み・しびれ・息苦しさが続く場合は医療機関へ",
      ],
    },
  }

  const picked = byBand[band]

  return {
    band,
    score,
    maxScore,
    typeName: picked.typeName,
    summary: picked.summary,
    tips: picked.tips,
    disclaimer:
      "このチェックはエンタメ・自己理解のための目安であり、医療行為や疾病の診断ではありません。気になる症状が続く場合は医療機関へご相談ください。",
  }
}
