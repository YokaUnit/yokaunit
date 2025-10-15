export const questions = [
  {
    id: 'workload' as const,
    title: '仕事量・負荷について',
    description: '普段の仕事量や負荷に対するあなたの対応を教えてください',
    icon: '💼',
    color: 'from-blue-500 to-cyan-500',
    options: [
      {
        id: 'workload_high',
        text: '多忙でも集中して効率的に処理できる',
        score: 5
      },
      {
        id: 'workload_medium_high',
        text: '忙しいが計画的に対応できる',
        score: 4
      },
      {
        id: 'workload_medium',
        text: '適度な忙しさなら問題ない',
        score: 3
      },
      {
        id: 'workload_medium_low',
        text: '忙しくなると少し焦ってしまう',
        score: 2
      },
      {
        id: 'workload_low',
        text: '忙しいとパニックになりやすい',
        score: 1
      }
    ]
  },
  {
    id: 'pressure' as const,
    title: 'プレッシャー対応',
    description: '重要な場面やプレッシャーのかかる状況での対応について',
    icon: '🎯',
    color: 'from-purple-500 to-pink-500',
    options: [
      {
        id: 'pressure_high',
        text: 'プレッシャーがあると逆に力を発揮する',
        score: 5
      },
      {
        id: 'pressure_medium_high',
        text: '緊張するが普段通りの力を出せる',
        score: 4
      },
      {
        id: 'pressure_medium',
        text: 'プレッシャーは感じるが対応できる',
        score: 3
      },
      {
        id: 'pressure_medium_low',
        text: 'プレッシャーで少し実力が出せない',
        score: 2
      },
      {
        id: 'pressure_low',
        text: 'プレッシャーで大きく実力が下がる',
        score: 1
      }
    ]
  },
  {
    id: 'change' as const,
    title: '変化への適応',
    description: '環境の変化や新しい状況に対するあなたの適応力について',
    icon: '🔄',
    color: 'from-green-500 to-emerald-500',
    options: [
      {
        id: 'change_high',
        text: '変化を楽しみ、積極的に適応する',
        score: 5
      },
      {
        id: 'change_medium_high',
        text: '変化に対して柔軟に対応できる',
        score: 4
      },
      {
        id: 'change_medium',
        text: '時間をかければ変化に慣れる',
        score: 3
      },
      {
        id: 'change_medium_low',
        text: '変化に慣れるのに時間がかかる',
        score: 2
      },
      {
        id: 'change_low',
        text: '変化が苦手で強いストレスを感じる',
        score: 1
      }
    ]
  },
  {
    id: 'relationship' as const,
    title: '人間関係',
    description: '職場や日常の人間関係でのストレス対応について',
    icon: '👥',
    color: 'from-orange-500 to-red-500',
    options: [
      {
        id: 'relationship_high',
        text: '人間関係の問題も冷静に対処できる',
        score: 5
      },
      {
        id: 'relationship_medium_high',
        text: '多少の人間関係の悩みは気にしない',
        score: 4
      },
      {
        id: 'relationship_medium',
        text: '人間関係で悩むことはあるが解決できる',
        score: 3
      },
      {
        id: 'relationship_medium_low',
        text: '人間関係の悩みを引きずりやすい',
        score: 2
      },
      {
        id: 'relationship_low',
        text: '人間関係のストレスが非常に大きい',
        score: 1
      }
    ]
  },
  {
    id: 'recovery' as const,
    title: '回復力',
    description: 'ストレスや疲労からの回復についてお聞かせください',
    icon: '🌱',
    color: 'from-teal-500 to-blue-500',
    options: [
      {
        id: 'recovery_high',
        text: '短時間で疲労やストレスから回復する',
        score: 5
      },
      {
        id: 'recovery_medium_high',
        text: '一晩休めば大抵回復する',
        score: 4
      },
      {
        id: 'recovery_medium',
        text: '週末にしっかり休めば回復する',
        score: 3
      },
      {
        id: 'recovery_medium_low',
        text: '回復に時間がかかることが多い',
        score: 2
      },
      {
        id: 'recovery_low',
        text: 'なかなか疲労やストレスが抜けない',
        score: 1
      }
    ]
  },
  {
    id: 'lifestyle' as const,
    title: '生活習慣',
    description: 'ストレス管理や健康維持のための生活習慣について',
    icon: '🏃‍♂️',
    color: 'from-indigo-500 to-purple-500',
    options: [
      {
        id: 'lifestyle_high',
        text: '運動・睡眠・食事を意識的に管理している',
        score: 5
      },
      {
        id: 'lifestyle_medium_high',
        text: 'ある程度健康的な生活を心がけている',
        score: 4
      },
      {
        id: 'lifestyle_medium',
        text: '普通の生活習慣を送っている',
        score: 3
      },
      {
        id: 'lifestyle_medium_low',
        text: '生活習慣が少し乱れがち',
        score: 2
      },
      {
        id: 'lifestyle_low',
        text: '不規則な生活で健康管理ができていない',
        score: 1
      }
    ]
  }
]
