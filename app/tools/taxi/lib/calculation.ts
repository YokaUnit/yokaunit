import type { TaxiFarePreset } from "./presets"

export interface TaxiFareExtras {
  reservationFee: number
  pickupFee: number
  tolls: number
  parking: number
  otherCharges: number
  tip: number
}

export interface TaxiFareDiscounts {
  rateDiscount: number
  manualDiscount: number
}

export interface TaxiFareCalculationInput {
  preset: TaxiFarePreset
  distanceKm: number
  lowSpeedMinutes: number
  isLateNight: boolean
  customPercentSurcharge: number
  extras: TaxiFareExtras
  discounts: TaxiFareDiscounts
  roundingUnit: number
  passengers: number
  rideMinutes: number
}

export interface TaxiFareBreakdown {
  baseFare: number
  distanceFare: number
  timeFare: number
  meteredFare: number
  lateNightSurcharge: number
  customPercentSurchargeAmount: number
  meteredFareWithSurcharge: number
  extrasTotal: number
  discountsTotal: number
  totalBeforeRounding: number
  totalAfterRounding: number
  perPassenger: number
  costPerKm: number | null
  costPerMinute: number | null
  effectiveSpeed: number | null
}

function clampToNonNegative(value: number): number {
  if (!Number.isFinite(value)) {
    return 0
  }
  return Math.max(0, value)
}

function roundByUnit(value: number, unit: number): number {
  if (unit <= 1) {
    return Math.round(value)
  }
  return Math.round(value / unit) * unit
}

export function calculateTaxiFare(input: TaxiFareCalculationInput) {
  const {
    preset,
    distanceKm,
    lowSpeedMinutes,
    isLateNight,
    customPercentSurcharge,
    extras,
    discounts,
    roundingUnit,
    passengers,
    rideMinutes,
  } = input

  const distanceMeters = clampToNonNegative(distanceKm) * 1000
  const lowSpeedSeconds = clampToNonNegative(lowSpeedMinutes) * 60
  const baseDistance = clampToNonNegative(preset.baseDistanceMeters)
  const unitDistance = clampToNonNegative(preset.distanceUnitMeters) || 1
  const unitDistanceFare = clampToNonNegative(preset.distanceUnitFare)
  const unitTimeSeconds = clampToNonNegative(preset.timeUnitSeconds) || 1
  const unitTimeFare = clampToNonNegative(preset.timeUnitFare)

  // Base fare (initial charge)
  let meteredFare = clampToNonNegative(preset.baseFare)

  // Distance-based increment
  let distanceFare = 0
  if (distanceMeters > baseDistance) {
    const additionalMeters = distanceMeters - baseDistance
    const extraSteps = Math.ceil(additionalMeters / unitDistance)
    distanceFare = extraSteps * unitDistanceFare
    meteredFare += distanceFare
  }

  // Time-based increment (low speed / waiting time)
  let timeFare = 0
  if (lowSpeedSeconds > 0) {
    const timeSteps = Math.ceil(lowSpeedSeconds / unitTimeSeconds)
    timeFare = timeSteps * unitTimeFare
    meteredFare += timeFare
  }

  const baseMeteredFare = meteredFare

  // Late-night surcharge applies to metered fare
  let lateNightSurcharge = 0
  if (isLateNight) {
    const multiplier = clampToNonNegative(preset.lateNightMultiplier)
    if (multiplier > 1) {
      const surcharged = Math.round(baseMeteredFare * multiplier)
      lateNightSurcharge = surcharged - baseMeteredFare
      meteredFare = surcharged
    }
  }

  // Custom percentage surcharge (e.g., reservation multiplier)
  let customPercentSurchargeAmount = 0
  if (customPercentSurcharge > 0) {
    const multiplier = 1 + customPercentSurcharge
    const surcharged = Math.round(meteredFare * multiplier)
    customPercentSurchargeAmount = surcharged - meteredFare
    meteredFare = surcharged
  }

  const meteredFareWithSurcharge = meteredFare

  // Extras (added after surcharges)
  const extrasValues = [
    extras.reservationFee,
    extras.pickupFee,
    extras.tolls,
    extras.parking,
    extras.otherCharges,
    extras.tip,
  ].map(clampToNonNegative)
  const extrasTotal = extrasValues.reduce((sum, value) => sum + value, 0)

  // Discounts
  const rateDiscount = clampToNonNegative(Math.min(discounts.rateDiscount, 0.9)) // avoid excessive
  const manualDiscount = clampToNonNegative(discounts.manualDiscount)

  const rateDiscountAmount = Math.floor(meteredFareWithSurcharge * rateDiscount)
  const discountsTotal = Math.min(meteredFareWithSurcharge + extrasTotal, rateDiscountAmount + manualDiscount)

  const totalBeforeRounding = Math.max(
    0,
    meteredFareWithSurcharge + extrasTotal - rateDiscountAmount - manualDiscount
  )

  const totalAfterRounding = Math.max(0, roundByUnit(totalBeforeRounding, Math.max(1, roundingUnit)))

  const passengerCount = Math.max(1, Math.floor(passengers) || 1)
  const perPassenger = Math.ceil(totalAfterRounding / passengerCount)

  const costPerKm = distanceKm > 0 ? Math.round((totalAfterRounding / distanceKm) * 10) / 10 : null
  const costPerMinute = rideMinutes > 0 ? Math.round((totalAfterRounding / rideMinutes) * 10) / 10 : null
  const effectiveSpeed =
    distanceKm > 0 && rideMinutes > 0 ? Math.round((distanceKm / (rideMinutes / 60)) * 10) / 10 : null

  return {
    breakdown: {
      baseFare: clampToNonNegative(preset.baseFare),
      distanceFare,
      timeFare,
      meteredFare: baseMeteredFare,
      lateNightSurcharge,
      customPercentSurchargeAmount,
      meteredFareWithSurcharge,
      extrasTotal,
      discountsTotal,
      totalBeforeRounding,
      totalAfterRounding,
      perPassenger,
      costPerKm,
      costPerMinute,
      effectiveSpeed,
    } satisfies TaxiFareBreakdown,
    components: {
      extras: {
        reservationFee: extrasValues[0],
        pickupFee: extrasValues[1],
        tolls: extrasValues[2],
        parking: extrasValues[3],
        otherCharges: extrasValues[4],
        tip: extrasValues[5],
      },
      discounts: {
        rateDiscountAmount,
        manualDiscount,
      },
    },
  }
}

