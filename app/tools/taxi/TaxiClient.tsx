"use client"

import { useEffect, useMemo, useState } from "react"
import {
  calculateTaxiFare,
  type TaxiFareCalculationInput,
  type TaxiFareDiscounts,
  type TaxiFareExtras,
} from "./lib/calculation"
import { DEFAULT_CUSTOM_PRESET, TAXI_FARE_PRESETS, type TaxiFarePreset } from "./lib/presets"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import {
  ArrowLeftRight,
  BarChart3,
  Car,
  Clock,
  Coins,
  Gauge,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation,
  Receipt,
  Sparkles,
  Ticket,
  Users,
  Calculator,
  Equal,
} from "lucide-react"

const currencyFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  minimumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 1 })

const scenarioDistances = [2, 5, 10, 15, 20, 30]

type OriginMode = "manual" | "current"

function formatCurrency(amount: number) {
  return currencyFormatter.format(Math.round(amount))
}

function formatNumber(value: number | null, suffix: string) {
  if (value === null || Number.isNaN(value) || !Number.isFinite(value)) {
    return "—"
  }
  return `${numberFormatter.format(value)}${suffix}`
}

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.min(Math.max(value, min), max)
}

export default function TaxiClient() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(TAXI_FARE_PRESETS[0]?.id ?? "tokyo")
  const [customPreset, setCustomPreset] = useState<TaxiFarePreset>({ ...DEFAULT_CUSTOM_PRESET })

  const [originMode, setOriginMode] = useState<OriginMode>("manual")
  const [originQuery, setOriginQuery] = useState("")
  const [destinationQuery, setDestinationQuery] = useState("")
  const [routeLoading, setRouteLoading] = useState(false)
  const [routeError, setRouteError] = useState<string | null>(null)
  const [routeInfo, setRouteInfo] = useState<{
    distanceKm: number
    durationMinutes: number
    originName: string
    destinationName: string
  } | null>(null)

  const [useTollRoads, setUseTollRoads] = useState(false)
  const [usePickup, setUsePickup] = useState(false)
  const [useReservation, setUseReservation] = useState(false)
  const [isLateNight, setIsLateNight] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false)

  const [distanceKm, setDistanceKm] = useState(5)
  const [rideMinutes, setRideMinutes] = useState(20)
  const [lowSpeedMinutes, setLowSpeedMinutes] = useState(4)
  const [customPercentSurcharge, setCustomPercentSurcharge] = useState(0)
  const [extras, setExtras] = useState<TaxiFareExtras>({
    reservationFee: 0,
    pickupFee: 0,
    tolls: 0,
    parking: 0,
    otherCharges: 0,
    tip: 0,
  })
  const [discounts, setDiscounts] = useState<TaxiFareDiscounts>({
    rateDiscount: 0,
    manualDiscount: 0,
  })
  const [roundingUnit, setRoundingUnit] = useState(10)
  const [passengers, setPassengers] = useState(1)

  const activePreset =
    selectedPresetId === "custom"
      ? customPreset
      : TAXI_FARE_PRESETS.find((preset) => preset.id === selectedPresetId) ?? TAXI_FARE_PRESETS[0]

  useEffect(() => {
    if (!activePreset || selectedPresetId === "custom") return
    if (activePreset.pickupFeeRange) {
      const [min, max] = activePreset.pickupFeeRange
      setExtras((prev) => ({ ...prev, pickupFee: Math.round((min + max) / 2) }))
    }
    if (activePreset.reservationFeeRange) {
      const [min, max] = activePreset.reservationFeeRange
      setExtras((prev) => ({ ...prev, reservationFee: Math.round((min + max) / 2) }))
    }
  }, [activePreset, selectedPresetId])

  useEffect(() => {
    setLowSpeedMinutes((prev) => Math.min(prev, rideMinutes))
  }, [rideMinutes])

  useEffect(() => {
    if (selectedPresetId === "custom") {
      setShowAdvanced(true)
    }
  }, [selectedPresetId])

  useEffect(() => {
    if (!routeInfo) return

    const roundedDuration = Math.max(1, Math.round(routeInfo.durationMinutes))
    const suggestedLowSpeed = Math.min(
      Math.max(0, Math.round(routeInfo.durationMinutes * 0.3)),
      roundedDuration
    )

    setDistanceKm(routeInfo.distanceKm)
    setRideMinutes(roundedDuration)
    setLowSpeedMinutes(Math.min(suggestedLowSpeed, roundedDuration))
  }, [routeInfo])

  const calculationInput: TaxiFareCalculationInput = useMemo(
    () => ({
      preset: activePreset,
      distanceKm,
      lowSpeedMinutes,
      isLateNight,
      customPercentSurcharge,
      extras,
      discounts,
      roundingUnit,
      passengers,
      rideMinutes,
    }),
    [
      activePreset,
      distanceKm,
      lowSpeedMinutes,
      isLateNight,
      customPercentSurcharge,
      extras,
      discounts,
      roundingUnit,
      passengers,
      rideMinutes,
    ]
  )

  const { breakdown, components } = useMemo(() => calculateTaxiFare(calculationInput), [calculationInput])

  const scenarioResults = useMemo(() => {
    return scenarioDistances.map((distance) => {
      const ratio = distanceKm > 0 ? distance / distanceKm : 1
      const scenarioInput: TaxiFareCalculationInput = {
        ...calculationInput,
        distanceKm: distance,
        lowSpeedMinutes: Math.min(lowSpeedMinutes * ratio, rideMinutes * ratio),
        rideMinutes: Math.max(1, rideMinutes * ratio),
      }
      const result = calculateTaxiFare(scenarioInput)
      return {
        distance,
        total: result.breakdown.totalAfterRounding,
        perPassenger: result.breakdown.perPassenger,
      }
    })
  }, [calculationInput, distanceKm, lowSpeedMinutes, rideMinutes])

  const fetchCurrentLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setRouteError("この端末では現在地を取得できません。")
      setOriginMode("manual")
      return
    }

    setCurrentLocationLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const coordString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        setOriginQuery(coordString)
        setRouteError(null)
        setCurrentLocationLoading(false)
      },
      () => {
        setRouteError("現在地の取得に失敗しました。位置情報の許可をご確認ください。")
        setOriginMode("manual")
        setCurrentLocationLoading(false)
      },
      { enableHighAccuracy: true, maximumAge: 60000, timeout: 10000 }
    )
  }

  const handleOriginModeChange = (mode: OriginMode) => {
    setOriginMode(mode)
    if (mode === "current") {
      fetchCurrentLocation()
    } else {
      setCurrentLocationLoading(false)
    }
  }

  const fetchRouteData = async (): Promise<boolean> => {
    if (!originQuery.trim() || !destinationQuery.trim()) {
      setRouteError("乗車地と目的地を入力してください")
      return false
    }

    setRouteLoading(true)
    setRouteError(null)

    try {
      const response = await fetch("/api/taxi-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: originQuery.trim(),
          destination: destinationQuery.trim(),
          preferences: { useTollRoads },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error ?? "ルート検索に失敗しました")
      }

      setRouteInfo({
        distanceKm: data.distanceKm,
        durationMinutes: data.durationMinutes,
        originName: data.origin?.displayName ?? originQuery.trim(),
        destinationName: data.destination?.displayName ?? destinationQuery.trim(),
      })
      return true
    } catch (error) {
      setRouteError(error instanceof Error ? error.message : "ルート検索でエラーが発生しました")
      return false
    } finally {
      setRouteLoading(false)
    }
  }

  const handleUseCurrentLocation = () => {
    setOriginMode("current")
    fetchCurrentLocation()
  }

  const handleSwapLocations = () => {
    setOriginQuery(destinationQuery)
    setDestinationQuery(originQuery)
    setOriginMode("manual")
    setCurrentLocationLoading(false)
    setRouteInfo(null)
    setHasCalculated(false)
  }

  const handleExtrasChange = (key: keyof TaxiFareExtras, value: number) => {
    setExtras((prev) => ({
      ...prev,
      [key]: clampNumber(value, 0, 100000),
    }))
  }

  const handleDiscountsChange = (key: keyof TaxiFareDiscounts, value: number) => {
    setDiscounts((prev) => ({
      ...prev,
      [key]: Math.max(0, value),
    }))
  }

  type NumericPresetKey =
    | "baseFare"
    | "baseDistanceMeters"
    | "distanceUnitMeters"
    | "distanceUnitFare"
    | "timeUnitSeconds"
    | "timeUnitFare"

  const handleCustomPresetChange = (key: NumericPresetKey, value: number) => {
    setCustomPreset((prev) => ({
      ...prev,
      [key]: Math.max(0, value),
    }))
  }

  const handleCalculate = async () => {
    setHasCalculated(false)
    setRouteError(null)

    if (originQuery.trim() && destinationQuery.trim()) {
      const success = await fetchRouteData()
      if (!success) {
        return
      }
    }

    setHasCalculated(true)
  }

  const handleToggleToll = (checked: boolean) => {
    setUseTollRoads(checked)
    setRouteInfo(null)
    setHasCalculated(false)
  }

  const handleTogglePickup = (checked: boolean) => {
    setUsePickup(checked)
    setExtras((prev) => ({
      ...prev,
      pickupFee:
        checked && activePreset?.pickupFeeRange
          ? Math.round((activePreset.pickupFeeRange[0] + activePreset.pickupFeeRange[1]) / 2)
          : checked
            ? prev.pickupFee || 400
            : 0,
    }))
    setHasCalculated(false)
  }

const handleToggleReservation = (checked: boolean) => {
  setUseReservation(checked)
  setExtras((prev) => ({
    ...prev,
    reservationFee:
      checked && activePreset?.reservationFeeRange
        ? Math.round((activePreset.reservationFeeRange[0] + activePreset.reservationFeeRange[1]) / 2)
        : checked
          ? prev.reservationFee || 300
          : 0,
  }))
  setHasCalculated(false)
}

useEffect(() => {
  if (usePickup) {
    setExtras((prev) => ({
      ...prev,
      pickupFee:
        activePreset?.pickupFeeRange
          ? Math.round((activePreset.pickupFeeRange[0] + activePreset.pickupFeeRange[1]) / 2)
          : prev.pickupFee || 400,
    }))
  }
  if (useReservation) {
    setExtras((prev) => ({
      ...prev,
      reservationFee:
        activePreset?.reservationFeeRange
          ? Math.round((activePreset.reservationFeeRange[0] + activePreset.reservationFeeRange[1]) / 2)
          : prev.reservationFee || 300,
    }))
  }
}, [activePreset, usePickup, useReservation])

  const resetAll = () => {
    setOriginMode("manual")
    setCurrentLocationLoading(false)
    setOriginQuery("")
    setDestinationQuery("")
    setRouteInfo(null)
    setRouteError(null)
    setUseTollRoads(false)
    setUsePickup(false)
    setUseReservation(false)
    setIsLateNight(false)
    setShowAdvanced(false)
    setDistanceKm(5)
    setRideMinutes(20)
    setLowSpeedMinutes(4)
    setCustomPercentSurcharge(0)
    setExtras({
      reservationFee: 0,
      pickupFee: 0,
      tolls: 0,
      parking: 0,
      otherCharges: 0,
      tip: 0,
    })
    setDiscounts({
      rateDiscount: 0,
      manualDiscount: 0,
    })
    setRoundingUnit(10)
    setPassengers(1)
    setCustomPreset({ ...DEFAULT_CUSTOM_PRESET })
    setHasCalculated(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-1 sm:px-0">
      <Card className="border border-blue-100 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Car className="h-6 w-6 text-blue-500" />
            タクシー運賃計算ツール
          </CardTitle>
          <CardDescription>
            乗車地と目的地を入力して「検索」→「タクシー料金を計算する」のシンプルステップ。必要な方だけ詳細設定を開いて調整できます。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Label className="text-sm font-semibold text-slate-700">乗車地</Label>
                <Select value={originMode} onValueChange={(value) => handleOriginModeChange(value as OriginMode)}>
                  <SelectTrigger className="h-9 w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">手動入力</SelectItem>
                    <SelectItem value="current">現在地を使用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                value={originQuery}
                onChange={(event) => {
                  const value = event.target.value
                  setOriginQuery(value)
                  setRouteInfo(null)
                  setHasCalculated(false)
                }}
                placeholder="乗車地を入力してください（例: 東京駅・35.6812, 139.7671）"
                className="h-12 text-base"
                disabled={originMode === "current"}
                readOnly={originMode === "current"}
              />
              {originMode === "current" ? (
                <p className="text-[11px] text-slate-500 flex items-center gap-2">
                  {currentLocationLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500" />
                      現在地を取得しています...
                    </>
                  ) : originQuery ? (
                    <>現在地（{originQuery}）を使用します。</>
                  ) : (
                    <>現在地情報を取得できませんでした。もう一度お試しください。</>
                  )}
                </p>
              ) : (
                <p className="text-[11px] text-slate-500">住所または「35.6812, 139.7671」のような座標形式に対応しています。</p>
              )}
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700">目的地</Label>
              <Input
                value={destinationQuery}
                onChange={(event) => {
                  setDestinationQuery(event.target.value)
                  setRouteInfo(null)
                  setHasCalculated(false)
                }}
                placeholder="目的地を入力してください（例: 羽田空港）"
                className="h-12 text-base"
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
              <Button
                onClick={handleUseCurrentLocation}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 sm:w-auto"
              >
                <LocateFixed className="h-4 w-4" />
                現在地を使用して距離を自動入力
              </Button>
              <Button variant="outline" onClick={handleSwapLocations} className="w-full sm:w-auto">
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                乗車地と目的地を入れ替える
              </Button>
            </div>
            {routeError && <p className="text-sm text-red-500">{routeError}</p>}
            {routeInfo && (
              <div className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-blue-900">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">乗車地</p>
                    <p>{routeInfo.originName}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setRouteInfo(null)}>
                    ルートをクリア
                  </Button>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">目的地</p>
                  <p>{routeInfo.destinationName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 text-blue-800">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-blue-600">推定距離</p>
                    <p className="text-lg font-bold">{routeInfo.distanceKm.toFixed(2)} km</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-blue-600">推定所要時間</p>
                    <p className="text-lg font-bold">{routeInfo.durationMinutes.toFixed(1)} 分</p>
                  </div>
                </div>
                <p className="text-[11px] text-blue-700">
                  ルート情報はOSRM/Nominatimの推計値です。交通状況や実際の走行経路により変動します。
                </p>
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">検索条件</p>
                <p className="text-[11px] text-slate-500">
                  距離と料金に含めたいオプションを選択してください。
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-800">迎車サービス（送迎）</p>
                    <Switch checked={usePickup} onCheckedChange={handleTogglePickup} />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    迎車料金の目安（プリセット値または400円）を自動で加算します。
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-800">予約料（アプリ指名など）</p>
                    <Switch checked={useReservation} onCheckedChange={handleToggleReservation} />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    予約・指名料の目安（プリセット値または300円）を自動で加算します。
                  </p>
                </div>
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-800">有料道路を使用する ※1</p>
                    <Switch checked={useTollRoads} onCheckedChange={handleToggleToll} />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    距離計算では高速道路を含む推奨ルートを優先します。
                  </p>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3 shadow-sm sm:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-800">深夜割増 (22:00〜翌5:00) ※2</p>
                    <Switch checked={isLateNight} onCheckedChange={setIsLateNight} />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    割増は計算結果に自動反映されます。地域により適用時間が異なる場合があります。
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wide text-slate-600">乗車人数</Label>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  value={passengers}
                  onChange={(event) => setPassengers(clampNumber(Number(event.target.value), 1, 6))}
                  className="h-12 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wide text-slate-600">端数処理</Label>
                <Select value={roundingUnit.toString()} onValueChange={(value) => setRoundingUnit(Number(value))}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">端数処理なし</SelectItem>
                    <SelectItem value="10">10円単位</SelectItem>
                    <SelectItem value="100">100円単位</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleCalculate}
                disabled={routeLoading || (originMode === "current" && (currentLocationLoading || !originQuery))}
                size="lg"
              >
                {routeLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    計算中...
                  </>
                ) : (
                  "タクシー料金を計算する"
                )}
              </Button>
              <Button variant="ghost" onClick={resetAll} className="w-full sm:w-auto">
                リセット
              </Button>
            </div>
          </section>

          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setShowAdvanced((prev) => !prev)}>
              {showAdvanced ? "詳細設定を閉じる" : "詳細設定を開く"}
            </Button>
          </div>

          {showAdvanced && (
            <div className="space-y-6">
              <section className="space-y-4">
                <p className="text-sm font-semibold text-slate-700">走行条件の微調整</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <DistanceInput
                    label="走行距離"
                    icon={<Navigation className="h-4 w-4" />}
                    value={distanceKm}
                    onChange={setDistanceKm}
                    max={120}
                  />
                  <DistanceInput
                    label="所要時間"
                    icon={<Clock className="h-4 w-4" />}
                    value={rideMinutes}
                    onChange={(value) => setRideMinutes(Math.max(1, Math.round(value)))}
                    max={360}
                    unit="分"
                    step={1}
                    sliderStep={1}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <DistanceInput
                    label="低速・待機時間"
                    description="渋滞や信号待ちを想定"
                    icon={<Gauge className="h-4 w-4" />}
                    value={lowSpeedMinutes}
                    onChange={(value) => setLowSpeedMinutes(Math.min(rideMinutes, Math.max(0, value)))}
                    max={rideMinutes || 1}
                    unit="分"
                    sliderStep={0.5}
                    step={0.5}
                  />
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      追加割増率（アプリ指名・迎車など）
                    </Label>
                    <div className="mt-3 flex items-center gap-3">
                      <Slider
                        min={0}
                        max={0.5}
                        step={0.01}
                        value={[customPercentSurcharge]}
                        onValueChange={([value]) => setCustomPercentSurcharge(Math.max(0, value ?? 0))}
                      />
                      <span className="text-sm font-semibold text-slate-700">
                        {Math.round(customPercentSurcharge * 100)}%
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">0〜50%で設定できます。</p>
                  </div>
                </div>
              </section>

              <Card className="border-dashed border-2 border-blue-100 bg-blue-50/60">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Receipt className="h-5 w-5 text-blue-500" />
                    追加料金
                  </CardTitle>
                  <CardDescription>メーター料金に加算される費用を入力してください。</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <ExtraInput
                    label="迎車料金"
                    value={extras.pickupFee}
                    onChange={(value) => handleExtrasChange("pickupFee", value)}
                  />
                  <ExtraInput
                    label="予約料・アプリ指名料"
                    value={extras.reservationFee}
                    onChange={(value) => handleExtrasChange("reservationFee", value)}
                  />
                  <ExtraInput
                    label="高速道路・有料道路"
                    value={extras.tolls}
                    onChange={(value) => handleExtrasChange("tolls", value)}
                  />
                  <ExtraInput
                    label="駐車場・待機場"
                    value={extras.parking}
                    onChange={(value) => handleExtrasChange("parking", value)}
                  />
                  <ExtraInput
                    label="その他費用"
                    value={extras.otherCharges}
                    onChange={(value) => handleExtrasChange("otherCharges", value)}
                  />
                  <ExtraInput
                    label="チップ"
                    value={extras.tip}
                    onChange={(value) => handleExtrasChange("tip", value)}
                  />
                </CardContent>
              </Card>

              <Card className="border border-emerald-100 bg-emerald-50/60">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base text-emerald-800">
                    <Ticket className="h-5 w-5" />
                    割引・クーポン
                  </CardTitle>
                  <CardDescription>福祉割引やクーポン割引を適用する場合はこちらで調整できます。</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">割引率</Label>
                    <Select
                      value={discounts.rateDiscount.toString()}
                      onValueChange={(value) => handleDiscountsChange("rateDiscount", Number.parseFloat(value))}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="割引を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">適用なし</SelectItem>
                        <SelectItem value="0.1">身体・知的障がい者割引（1割引）</SelectItem>
                        <SelectItem value="0.2">長距離割引（例：9,000円超部分2割引）</SelectItem>
                        <SelectItem value="0.3">法人・優待（3割引）</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">クーポン金額</Label>
                    <Input
                      type="number"
                      min={0}
                      value={discounts.manualDiscount}
                      onChange={(event) => handleDiscountsChange("manualDiscount", Number(event.target.value) || 0)}
                      className="h-12 text-lg"
                    />
                    <p className="text-[11px] text-emerald-600">タクシーチケット・アプリクーポンなど。</p>
                  </div>
                  <div className="hidden md:flex flex-col items-center justify-center text-center bg-white/70 rounded-xl border border-emerald-100 px-4">
                    <Sparkles className="h-6 w-6 text-emerald-500 mb-2" />
                    <p className="text-xs text-emerald-700">
                      割引はメーター運賃に対して適用し、その後にクーポン金額を差し引きます。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {selectedPresetId === "custom" && (
                <Card className="border border-purple-100 bg-purple-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-purple-800">
                      <Calculator className="h-5 w-5" />
                      カスタム料金設定
                    </CardTitle>
                    <CardDescription>自社契約や地域独自の料金体系を再現する場合にご利用ください。</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <CustomPresetInput
                      label="初乗り（円）"
                      value={customPreset.baseFare}
                      onChange={(value) => handleCustomPresetChange("baseFare", value)}
                    />
                    <CustomPresetInput
                      label="初乗り距離（m）"
                      value={customPreset.baseDistanceMeters}
                      onChange={(value) => handleCustomPresetChange("baseDistanceMeters", value)}
                    />
                    <CustomPresetInput
                      label="加算距離（m）"
                      value={customPreset.distanceUnitMeters}
                      onChange={(value) => handleCustomPresetChange("distanceUnitMeters", value)}
                    />
                    <CustomPresetInput
                      label="加算料金（円）"
                      value={customPreset.distanceUnitFare}
                      onChange={(value) => handleCustomPresetChange("distanceUnitFare", value)}
                    />
                    <CustomPresetInput
                      label="時間加算（秒）"
                      value={customPreset.timeUnitSeconds}
                      onChange={(value) => handleCustomPresetChange("timeUnitSeconds", value)}
                    />
                    <CustomPresetInput
                      label="時間加算料金（円）"
                      value={customPreset.timeUnitFare}
                      onChange={(value) => handleCustomPresetChange("timeUnitFare", value)}
                    />
                    <CustomPresetInput
                      label="深夜割増率（%）"
                      value={Math.round((customPreset.lateNightMultiplier - 1) * 100)}
                      onChange={(value) =>
                        setCustomPreset((prev) => ({
                          ...prev,
                          lateNightMultiplier: 1 + value / 100,
                        }))
                      }
                    />
                  </CardContent>
                </Card>
              )}

              <Card className="bg-white/70 shadow-inner">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    距離別料金シミュレーション
                  </CardTitle>
                  <CardDescription>
                    現在の設定をもとに距離だけを変化させた場合の概算料金です。低速時間・所要時間は距離に合わせて比例配分しています。
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    <span>距離</span>
                    <span>概算運賃</span>
                    <span>1人あたり</span>
                  </div>
                  <div className="space-y-2">
                    {scenarioResults.map((item) => (
                      <div
                        key={item.distance}
                        className="grid grid-cols-3 items-center rounded-lg border border-slate-100 bg-slate-50/70 px-4 py-2 text-sm"
                      >
                        <span>{item.distance}km</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(item.total)}</span>
                        <span className="text-slate-600">{formatCurrency(item.perPassenger)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {hasCalculated && (
        <div className="space-y-6">
          <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-2xl text-blue-900">
                <span>タクシー料金の目安</span>
                <Badge variant="outline" className="bg-white/70 border-blue-200 text-blue-700">
                  計算済み
                </Badge>
              </CardTitle>
              <CardDescription>
                入力条件に基づく概算料金です。実際の請求額とは異なる場合があります。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em]">TOTAL</p>
                <p className="text-5xl font-bold text-blue-900">{formatCurrency(breakdown.totalAfterRounding)}</p>
                <p className="text-xs text-blue-700">
                  （端数処理：{roundingUnit === 1 ? "なし" : `${roundingUnit.toLocaleString()}円単位`}）
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SummaryStat
                  title="1人あたり"
                  value={formatCurrency(breakdown.perPassenger)}
                  icon={<Users className="h-4 w-4 text-blue-500" />}
                />
                <SummaryStat
                  title="距離あたり"
                  value={formatNumber(breakdown.costPerKm, "円/km")}
                  icon={<Navigation className="h-4 w-4 text-blue-500" />}
                />
                <SummaryStat
                  title="時間あたり"
                  value={formatNumber(breakdown.costPerMinute, "円/分")}
                  icon={<Clock className="h-4 w-4 text-blue-500" />}
                />
                <SummaryStat
                  title="平均速度"
                  value={formatNumber(breakdown.effectiveSpeed, "km/h")}
                  icon={<Gauge className="h-4 w-4 text-blue-500" />}
                />
              </div>
              <div className="bg-white/80 rounded-2xl border border-blue-100 p-4 space-y-3 text-sm text-blue-900">
                <div className="flex items-center justify-between">
                  <span>メーター運賃（割増後）</span>
                  <span className="font-semibold">{formatCurrency(breakdown.meteredFareWithSurcharge)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>追加料金</span>
                  <span>{formatCurrency(breakdown.extrasTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>割引合計</span>
                  <span>-{formatCurrency(breakdown.discountsTotal)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-semibold text-lg">
                  <span>お支払い目安</span>
                  <span>{formatCurrency(breakdown.totalAfterRounding)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Card className="border border-slate-200 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="h-5 w-5 text-amber-500" />
                  詳細内訳
                </CardTitle>
                <CardDescription>メーター運賃と追加料金・割引の構成を確認できます。</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <SectionHeading title="メーター運賃" />
                  <BreakdownRow label="初乗り" amount={breakdown.baseFare} />
                  <BreakdownRow label="距離加算" amount={breakdown.distanceFare} />
                  <BreakdownRow label="時間加算" amount={breakdown.timeFare} />
                  <Separator />
                  <BreakdownRow label="小計（メーター）" amount={breakdown.meteredFare} emphasize />
                  {breakdown.lateNightSurcharge > 0 && (
                    <BreakdownRow label="深夜割増" amount={breakdown.lateNightSurcharge} />
                  )}
                  {breakdown.customPercentSurchargeAmount > 0 && (
                    <BreakdownRow label="割増（カスタム）" amount={breakdown.customPercentSurchargeAmount} />
                  )}
                  <BreakdownRow label="割増後メーター" amount={breakdown.meteredFareWithSurcharge} emphasize />
                </div>
                <div className="space-y-3">
                  <SectionHeading title="追加料金と割引" />
                  <BreakdownRow label="迎車料金" amount={components.extras.pickupFee} />
                  <BreakdownRow label="予約料" amount={components.extras.reservationFee} />
                  <BreakdownRow label="高速料金" amount={components.extras.tolls} />
                  <BreakdownRow label="駐車・待機" amount={components.extras.parking} />
                  <BreakdownRow label="その他" amount={components.extras.otherCharges} />
                  <BreakdownRow label="チップ" amount={components.extras.tip} />
                  <Separator />
                  <BreakdownRow label="追加料金計" amount={breakdown.extrasTotal} emphasize />
                  {components.discounts.rateDiscountAmount > 0 && (
                    <BreakdownRow label="割引（率）" amount={-components.discounts.rateDiscountAmount} />
                  )}
                  {components.discounts.manualDiscount > 0 && (
                    <BreakdownRow label="クーポン等" amount={-components.discounts.manualDiscount} />
                  )}
                  <BreakdownRow label="割引合計" amount={-breakdown.discountsTotal} highlight />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ListBulletIcon />
                  プリセット情報
                </CardTitle>
                <CardDescription>各地域の料金体系をもとにした参考情報です。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-600">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-800">{activePreset?.label}</p>
                  <p>{activePreset?.description}</p>
                </div>
                <ul className="list-disc space-y-1 pl-5">
                  {activePreset?.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-500 leading-relaxed">
                  <p>
                    表示している料金体系は公共資料や代表的な事業者の公開情報をもとに構成しています。実際の料金は事業者ごとに異なる場合があるため、乗車前には各社の公式情報をご確認ください。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-slate-200 bg-slate-50/60">
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Equal className="h-5 w-5 text-slate-600" />
                試算条件サマリー
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <SummaryRow label="走行距離" value={`${distanceKm.toFixed(1)} km`} />
              <SummaryRow label="所要時間" value={`${rideMinutes} 分`} />
              <SummaryRow label="低速・待機" value={`${lowSpeedMinutes.toFixed(1)} 分`} />
              <SummaryRow label="深夜割増" value={isLateNight ? "適用（約20%増）" : "なし"} />
              <SummaryRow
                label="追加割増率"
                value={customPercentSurcharge > 0 ? `${Math.round(customPercentSurcharge * 100)}%` : "なし"}
              />
              <SummaryRow label="追加料金合計" value={formatCurrency(breakdown.extrasTotal)} />
              <SummaryRow
                label="割引"
                value={
                  discounts.rateDiscount > 0 || discounts.manualDiscount > 0
                    ? `率: ${Math.round(discounts.rateDiscount * 100)}% / 金額: ${formatCurrency(discounts.manualDiscount)}`
                    : "なし"
                }
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function DistanceInput({
  label,
  icon,
  value,
  onChange,
  max,
  unit = "km",
  step = 0.1,
  sliderStep = 0.1,
  description,
}: {
  label: string
  icon: React.ReactNode
  value: number
  onChange: (value: number) => void
  max: number
  unit?: string
  step?: number
  sliderStep?: number
  description?: string
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
            {icon}
            {label}
          </p>
          {description && <p className="mt-1 text-[11px] text-slate-500">{description}</p>}
        </div>
        <span className="text-sm text-slate-400">
          MAX {max}
          {unit}
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <Input
          type="number"
          value={value}
          step={step}
          min={0}
          max={max}
          onChange={(event) => {
            const next = Number(event.target.value)
            if (Number.isFinite(next)) {
              onChange(Math.min(max, Math.max(0, next)))
            }
          }}
          className="text-2xl font-semibold"
        />
        <span className="text-lg text-slate-600">{unit}</span>
      </div>
      <div className="mt-4">
        <Slider
          min={0}
          max={max}
          step={sliderStep}
          value={[Math.min(value, max)]}
          onValueChange={([next]) => onChange(Math.min(max, Math.max(0, next)))}
        />
      </div>
    </div>
  )
}

function ExtraInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</Label>
      <Input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        className="h-12 text-lg"
      />
    </div>
  )
}

function CustomPresetInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wide text-purple-700">{label}</Label>
      <Input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        className="h-11 text-base"
      />
    </div>
  )
}

function BreakdownRow({
  label,
  amount,
  emphasize,
  highlight,
}: {
  label: string
  amount: number
  emphasize?: boolean
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={`text-slate-600 ${emphasize ? "font-semibold text-slate-800" : ""}`}>{label}</span>
      <span
        className={`font-medium ${
          highlight ? "text-emerald-600" : emphasize ? "text-slate-800 text-lg" : "text-slate-700"
        }`}
      >
        {amount >= 0 ? formatCurrency(amount) : `-${formatCurrency(Math.abs(amount))}`}
      </span>
    </div>
  )
}

function SectionHeading({ title }: { title: string }) {
  return <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
}

function SummaryStat({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white/70 p-3">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-blue-600">
        <span>{title}</span>
        {icon}
      </div>
      <p className="mt-2 text-lg font-bold text-blue-900">{value}</p>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white/70 px-3 py-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <span className="text-sm text-slate-800">{value}</span>
    </div>
  )
}

function ListBulletIcon() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600">
      <MapPin className="h-3.5 w-3.5" />
    </span>
  )
}

