/**
 * ツール state と共有用クエリの相互変換（ブラウザ履歴用・短めのキー）
 */

export type TaxiSerializableState = {
  presetId: string
  origin: string
  destination: string
  useTollRoads: boolean
  isLateNight: boolean
  usePickup: boolean
  useReservation: boolean
}

/** クエリにタクシー用パラメータが一つでもあればパース。なければ null */
export function parseTaxiUrl(sp: URLSearchParams): Partial<TaxiSerializableState> | null {
  const keys = ["p", "o", "d", "toll", "night", "pu", "rs"]
  if (!keys.some((k) => sp.has(k))) {
    return null
  }

  const out: Partial<TaxiSerializableState> = {}
  const p = sp.get("p")
  if (p) out.presetId = p
  if (sp.has("o")) out.origin = sp.get("o") ?? ""
  if (sp.has("d")) out.destination = sp.get("d") ?? ""
  if (sp.has("toll")) out.useTollRoads = sp.get("toll") === "1" || sp.get("toll") === "true"
  if (sp.has("night")) out.isLateNight = sp.get("night") === "1" || sp.get("night") === "true"
  if (sp.has("pu")) out.usePickup = sp.get("pu") === "1" || sp.get("pu") === "true"
  if (sp.has("rs")) out.useReservation = sp.get("rs") === "1" || sp.get("rs") === "true"

  return out
}

export function buildTaxiUrl(state: TaxiSerializableState): string {
  const sp = new URLSearchParams()
  sp.set("p", state.presetId)
  if (state.origin.trim()) sp.set("o", state.origin.trim())
  if (state.destination.trim()) sp.set("d", state.destination.trim())
  sp.set("toll", state.useTollRoads ? "1" : "0")
  sp.set("night", state.isLateNight ? "1" : "0")
  sp.set("pu", state.usePickup ? "1" : "0")
  sp.set("rs", state.useReservation ? "1" : "0")
  return sp.toString()
}
