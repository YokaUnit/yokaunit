export interface TaxiFarePreset {
  id: string
  label: string
  area: string
  description: string
  baseFare: number
  baseDistanceMeters: number
  distanceUnitMeters: number
  distanceUnitFare: number
  timeUnitSeconds: number
  timeUnitFare: number
  lateNightMultiplier: number
  lateNightDescription: string
  notes: string[]
  pickupFeeRange?: [number, number]
  reservationFeeRange?: [number, number]
}

export const TAXI_FARE_PRESETS: TaxiFarePreset[] = [
  {
    id: "tokyo",
    label: "東京23区・武蔵野・三鷹",
    area: "東京都特別区・武蔵野・三鷹地域",
    description: "初乗り500円（1.052km）／加算100円（237mまたは90秒）",
    baseFare: 500,
    baseDistanceMeters: 1052,
    distanceUnitMeters: 237,
    distanceUnitFare: 100,
    timeUnitSeconds: 90,
    timeUnitFare: 100,
    lateNightMultiplier: 1.2,
    lateNightDescription: "22:00〜翌5:00は2割増（深夜早朝割増）",
    notes: [
      "国土交通省関東運輸局認可（2023年改定）",
      "タクシーアプリ配車は迎車料金420円程度が一般的",
      "渋滞時は時速10km以下で90秒ごとに100円加算",
    ],
    pickupFeeRange: [0, 420],
    reservationFeeRange: [0, 420],
  },
  {
    id: "osaka",
    label: "大阪市域交通圏",
    area: "大阪市域・堺市域など",
    description: "初乗り680円（1.5km）／加算80円（296mまたは90秒）",
    baseFare: 680,
    baseDistanceMeters: 1500,
    distanceUnitMeters: 296,
    distanceUnitFare: 80,
    timeUnitSeconds: 90,
    timeUnitFare: 80,
    lateNightMultiplier: 1.2,
    lateNightDescription: "22:00〜翌5:00は2割増",
    notes: [
      "大阪府域第一交通圏の標準的な料金体系",
      "アプリ配車の迎車料金は300〜500円が相場",
      "深夜早朝の割増はメーター運賃部分に適用",
    ],
    pickupFeeRange: [0, 500],
    reservationFeeRange: [0, 500],
  },
  {
    id: "fukuoka",
    label: "福岡都市圏",
    area: "福岡市域を中心とした第一交通圏",
    description: "初乗り590円（1.24km）／加算90円（187mまたは80秒）",
    baseFare: 590,
    baseDistanceMeters: 1240,
    distanceUnitMeters: 187,
    distanceUnitFare: 90,
    timeUnitSeconds: 80,
    timeUnitFare: 90,
    lateNightMultiplier: 1.2,
    lateNightDescription: "22:00〜翌5:00は2割増",
    notes: [
      "福岡県タクシー協会の標準モデル",
      "空港アクセス定額タクシーなど独自メニューも充実",
      "障がい者割引・福祉割引の適用で1割引",
    ],
    pickupFeeRange: [0, 500],
    reservationFeeRange: [0, 500],
  },
  {
    id: "sapporo",
    label: "札幌圏",
    area: "札幌市・小樽市・江別市など",
    description: "初乗り680円（1.4km）／加算80円（280mまたは90秒）",
    baseFare: 680,
    baseDistanceMeters: 1400,
    distanceUnitMeters: 280,
    distanceUnitFare: 80,
    timeUnitSeconds: 90,
    timeUnitFare: 80,
    lateNightMultiplier: 1.2,
    lateNightDescription: "22:00〜翌5:00は2割増",
    notes: [
      "冬季の悪天候時は所要時間に余裕を持った試算がおすすめ",
      "地域によっては冬季割増が設定される場合もあり",
      "配車アプリの迎車料は200〜400円が目安",
    ],
    pickupFeeRange: [0, 400],
    reservationFeeRange: [0, 400],
  },
  {
    id: "nagoya",
    label: "名古屋市域",
    area: "名古屋・春日井・一宮など尾張地区",
    description: "初乗り680円（1.27km）／加算90円（233mまたは85秒）",
    baseFare: 680,
    baseDistanceMeters: 1270,
    distanceUnitMeters: 233,
    distanceUnitFare: 90,
    timeUnitSeconds: 85,
    timeUnitFare: 90,
    lateNightMultiplier: 1.2,
    lateNightDescription: "22:00〜翌5:00は2割増",
    notes: [
      "中部運輸局認可の標準料金",
      "小型車・中型車で料金が異なる場合あり",
      "事前確定運賃や定額運賃は別メニュー",
    ],
    pickupFeeRange: [0, 400],
    reservationFeeRange: [0, 600],
  },
]

export const DEFAULT_CUSTOM_PRESET: TaxiFarePreset = {
  id: "custom",
  label: "カスタム設定",
  area: "任意の料金体系",
  description: "必要な条件に合わせて初乗り・加算距離・割増率を自由に設定できます。",
  baseFare: 600,
  baseDistanceMeters: 1500,
  distanceUnitMeters: 250,
  distanceUnitFare: 90,
  timeUnitSeconds: 90,
  timeUnitFare: 90,
  lateNightMultiplier: 1.2,
  lateNightDescription: "深夜早朝割増率を自由に設定できます。",
  notes: [
    "各値を編集するとリアルタイムにシミュレーション結果が更新されます。",
    "地域独自の料金体系や法人契約の定額料金を再現する際に便利です。",
  ],
  pickupFeeRange: [0, 500],
  reservationFeeRange: [0, 500],
}

