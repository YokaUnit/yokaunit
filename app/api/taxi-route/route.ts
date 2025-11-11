import { NextResponse } from "next/server"

interface TaxiRouteRequestBody {
  origin?: string
  destination?: string
  coordinates?: {
    origin?: { lat: number; lon: number }
    destination?: { lat: number; lon: number }
  }
  preferences?: {
    useTollRoads?: boolean
  }
}

interface GeocodeResult {
  lat: number
  lon: number
  displayName: string
}

const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search"
const OSRM_ENDPOINT = "https://router.project-osrm.org/route/v1/driving"

function parseCoordinateString(value?: string): { lat: number; lon: number } | null {
  if (!value) return null

  const coordinatePattern = /^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/
  const match = value.match(coordinatePattern)

  if (!match) {
    return null
  }

  const lat = Number.parseFloat(match[1])
  const lon = Number.parseFloat(match[3])

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null
  }

  return { lat, lon }
}

async function geocodePlace(query: string): Promise<GeocodeResult> {
  const directCoordinates = parseCoordinateString(query)
  if (directCoordinates) {
    return {
      lat: directCoordinates.lat,
      lon: directCoordinates.lon,
      displayName: `${directCoordinates.lat.toFixed(6)}, ${directCoordinates.lon.toFixed(6)}`,
    }
  }

  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    addressdetails: "1",
    limit: "1",
    "accept-language": "ja",
    countrycodes: "jp",
  })

  const response = await fetch(`${NOMINATIM_ENDPOINT}?${params.toString()}`, {
    headers: {
      "User-Agent": "YokaUnitTaxiFareTool/1.0 (+https://yokaunit.com)",
    },
    cache: "no-cache",
  })

  if (!response.ok) {
    throw new Error("ジオコーディングに失敗しました")
  }

  const data = (await response.json()) as Array<{
    lat: string
    lon: string
    display_name: string
  }>

  if (!data?.length) {
    throw new Error("地点を特定できませんでした")
  }

  const item = data[0]
  return {
    lat: Number.parseFloat(item.lat),
    lon: Number.parseFloat(item.lon),
    displayName: item.display_name,
  }
}

async function requestRoute(origin: GeocodeResult, destination: GeocodeResult) {
  const coordinates = `${origin.lon},${origin.lat};${destination.lon},${destination.lat}`

  const params = new URLSearchParams({
    overview: "false",
    geometries: "geojson",
    annotations: "duration,distance",
    steps: "true",
    alternatives: "false",
  })

  const response = await fetch(`${OSRM_ENDPOINT}/${coordinates}?${params.toString()}`, {
    cache: "no-cache",
  })

  if (!response.ok) {
    throw new Error("ルートの取得に失敗しました")
  }

  const result = (await response.json()) as {
    code: string
    routes?: Array<{ distance: number; duration: number }>
  }

  if (result.code !== "Ok" || !result.routes?.length) {
    throw new Error("ルート候補が見つかりませんでした")
  }

  const primary = result.routes[0]

  return {
    distanceMeters: primary.distance,
    durationSeconds: primary.duration,
  }
}

export async function POST(request: Request) {
  try {
    const body: TaxiRouteRequestBody = await request.json()

    if (!body.origin && !body.coordinates?.origin) {
      return NextResponse.json({ error: "乗車地を指定してください" }, { status: 400 })
    }

    if (!body.destination && !body.coordinates?.destination) {
      return NextResponse.json({ error: "目的地を指定してください" }, { status: 400 })
    }

    const origin =
      body.coordinates?.origin ??
      (body.origin ? parseCoordinateString(body.origin) : null) ??
      undefined
    const destination =
      body.coordinates?.destination ??
      (body.destination ? parseCoordinateString(body.destination) : null) ??
      undefined

    const [geocodedOrigin, geocodedDestination] = await Promise.all([
      origin
        ? Promise.resolve({
            lat: origin.lat,
            lon: origin.lon,
            displayName: `${origin.lat.toFixed(6)}, ${origin.lon.toFixed(6)}`,
          })
        : geocodePlace(body.origin ?? ""),
      destination
        ? Promise.resolve({
            lat: destination.lat,
            lon: destination.lon,
            displayName: `${destination.lat.toFixed(6)}, ${destination.lon.toFixed(6)}`,
          })
        : geocodePlace(body.destination ?? ""),
    ])

    const route = await requestRoute(geocodedOrigin, geocodedDestination)

    return NextResponse.json({
      distanceKm: Math.round((route.distanceMeters / 1000) * 100) / 100,
      durationMinutes: Math.round((route.durationSeconds / 60) * 10) / 10,
      origin: geocodedOrigin,
      destination: geocodedDestination,
      provider: "OSRM/Nominatim",
    })
  } catch (error) {
    console.error("[TaxiRouteAPI]", error)
    const message =
      error instanceof Error ? error.message : "ルート検索中に予期せぬエラーが発生しました"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

