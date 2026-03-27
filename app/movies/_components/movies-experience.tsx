"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { ChevronDown, Tv } from "lucide-react"
import { cn } from "@/lib/utils"
import { contentItems, services, spotlightPicks } from "../_data/mock-data"
import { recommendLabel } from "../_lib/recommend-label"
import { MoviesBackground } from "./movies-background"
import { MoviesSiteFooter } from "./movies-site-footer"
import { MoviesSiteHeader } from "./movies-site-header"
import { IosStyleSwitch } from "./ios-style-switch"

const glassPanel =
  "rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl"
const shell =
  "relative z-10 mx-auto flex min-h-screen w-full max-w-[1700px] flex-col px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 xl:px-8"
const scrollTabs =
  "-mx-0.5 flex overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"

type ActiveTab = "all" | "tv" | "movie"

export function MoviesExperience() {
  const initialServices = services
    .filter((service) => service.selectedByDefault)
    .map((service) => service.id)
  const [selectedServices, setSelectedServices] = useState<string[]>(initialServices)
  const [activeTab, setActiveTab] = useState<ActiveTab>("all")
  const [query, setQuery] = useState("")
  const [minFilmarks, setMinFilmarks] = useState(3.5)
  const [minEigaCom, setMinEigaCom] = useState(3.5)
  const [selectedItemId, setSelectedItemId] = useState(contentItems[0]?.id ?? "")
  /** モバイルのみ：配信サービスパネルの開閉（デフォルトは畳んで最小表示） */
  const [servicesOpenMobile, setServicesOpenMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(min-width: 1024px)").matches) return
    if (window.location.hash === "#services") {
      setServicesOpenMobile(true)
    }
  }, [])

  const filtered = useMemo(() => {
    return contentItems.filter((item) => {
      const tabOK = activeTab === "all" ? true : item.kind === activeTab
      const queryOK =
        query.trim().length === 0 ||
        item.title.toLowerCase().includes(query.trim().toLowerCase())
      const filmarksOK = item.filmarksAvg >= minFilmarks
      const eigaOK = item.eigaComAvg >= minEigaCom
      const serviceOK =
        selectedServices.length === 0
          ? true
          : item.serviceIds.some((id) => selectedServices.includes(id))

      return tabOK && queryOK && filmarksOK && eigaOK && serviceOK
    })
  }, [activeTab, minEigaCom, minFilmarks, query, selectedServices])

  const selectedItem =
    filtered.find((item) => item.id === selectedItemId) ?? filtered[0] ?? null

  function toggleService(serviceId: string) {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06080f] text-white">
      <MoviesBackground />

      <MoviesSiteHeader />

      <main className={shell}>
        <section className={`${glassPanel} mb-4 p-3 sm:mb-5 sm:p-4 md:p-6`}>
          <p className="mb-2 text-xs font-medium tracking-[0.22em] text-slate-400">
            タイトルで探す
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="作品名で検索"
              className="min-h-12 min-w-0 flex-1 rounded-xl border border-white/15 bg-slate-900/70 px-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-amber-300/60 focus:ring-1 focus:ring-amber-300/30 sm:px-4 sm:text-sm"
            />
            <button
              type="button"
              className="inline-flex h-12 shrink-0 touch-manipulation items-center justify-center whitespace-nowrap rounded-xl bg-amber-300 px-5 text-sm font-semibold text-black shadow-sm shadow-amber-900/20 transition hover:bg-amber-200 active:bg-amber-400 sm:min-w-[7.5rem] sm:px-6"
            >
              検索する
            </button>
          </div>
        </section>

        <section className="grid flex-1 grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[280px_1fr_340px] 2xl:grid-cols-[320px_1fr_390px]">
          <aside
            id="services"
            className={cn(
              glassPanel,
              "order-1 space-y-0 p-2 lg:order-none lg:space-y-4 lg:p-4",
              servicesOpenMobile && "space-y-3 p-3"
            )}
          >
            <button
              type="button"
              aria-expanded={servicesOpenMobile}
              aria-controls="services-panel-inner"
              onClick={() => setServicesOpenMobile((v) => !v)}
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left transition active:bg-white/[0.07] lg:hidden"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">配信サービス</p>
                <p className="text-[11px] text-slate-400">
                  {selectedServices.length}件を選択中 · タップで変更
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-amber-300/90 transition-transform duration-200",
                  servicesOpenMobile && "rotate-180"
                )}
                aria-hidden
              />
            </button>

            <div
              id="services-panel-inner"
              className={cn(
                "space-y-3 sm:space-y-4",
                servicesOpenMobile ? "block" : "hidden",
                "lg:block"
              )}
            >
            <div className={cn(servicesOpenMobile ? "block" : "hidden", "lg:block")}>
              <h2 className="text-lg font-semibold text-white">配信サービス</h2>
              <p className="mt-1 text-xs text-slate-400">
                契約しているサービスに合わせて一覧を絞ります。
              </p>
            </div>

            <div className="space-y-2">
              {services.map((service) => {
                const isActive = selectedServices.includes(service.id)
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="switch"
                    aria-checked={isActive}
                    aria-label={`${service.name}を${isActive ? "オフ" : "オン"}にする`}
                    onClick={() => toggleService(service.id)}
                    className={cn(
                      "flex w-full min-h-[52px] touch-manipulation items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition active:opacity-90",
                      isActive
                        ? "border-emerald-500/35 bg-emerald-500/[0.08] shadow-[0_0_0_1px_rgba(52,199,89,0.15)]"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    )}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div
                        className={cn(
                          "relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white/10 ring-1 ring-inset",
                          isActive ? "ring-emerald-500/30" : "ring-white/10"
                        )}
                      >
                        {service.iconSrc ? (
                          <Image
                            src={service.iconSrc}
                            alt=""
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Tv className="h-5 w-5 text-slate-400" aria-hidden />
                          </div>
                        )}
                      </div>
                      <span
                        className={cn(
                          "truncate text-sm font-medium",
                          isActive ? "text-white" : "text-slate-300"
                        )}
                      >
                        {service.name}
                      </span>
                    </div>
                    <IosStyleSwitch checked={isActive} />
                  </button>
                )
              })}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs tracking-[0.2em] text-slate-500">絞り込み</p>
              <p className="mt-1 text-[10px] leading-relaxed text-slate-500 sm:text-[11px]">
                表示する平均の下限（各5.0満点想定）。
              </p>
              <div className="mt-3 space-y-3">
                <label className="block">
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 text-xs text-slate-400">
                    <span className="min-w-0">Filmarks（5.0満点）</span>
                    <span className="tabular-nums">{minFilmarks.toFixed(1)}+</span>
                  </div>
                  <input
                    type="range"
                    min={2.5}
                    max={5}
                    step={0.1}
                    value={minFilmarks}
                    onChange={(event) => setMinFilmarks(Number(event.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </label>

                <label className="block">
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 text-xs text-slate-400">
                    <span className="min-w-0">映画.com（5.0満点）</span>
                    <span className="tabular-nums">{minEigaCom.toFixed(1)}+</span>
                  </div>
                  <input
                    type="range"
                    min={2.5}
                    max={5}
                    step={0.1}
                    value={minEigaCom}
                    onChange={(event) => setMinEigaCom(Number(event.target.value))}
                    className="w-full accent-amber-400"
                  />
                </label>
              </div>
            </div>
            </div>
          </aside>

          <div
            id="catalog"
            className={`${glassPanel} order-2 space-y-3 p-3 sm:space-y-4 sm:p-4 lg:order-none`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-white sm:text-xl">作品一覧</h2>
              <div className={scrollTabs} role="tablist" aria-label="作品種別">
                <div className="inline-flex min-w-min shrink-0 rounded-lg border border-white/10 bg-white/[0.03] p-1 text-xs">
                  {[
                    { key: "all", label: "すべて" },
                    { key: "tv", label: "ドラマ" },
                    { key: "movie", label: "映画" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.key}
                      onClick={() => setActiveTab(tab.key as ActiveTab)}
                      className={cn(
                        "rounded-md px-3 py-2 transition sm:py-1.5",
                        activeTab === tab.key
                          ? "bg-white text-black"
                          : "text-slate-300 hover:bg-white/10"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-3">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItemId(item.id)}
                  className={`group touch-manipulation overflow-hidden rounded-xl border text-left transition active:opacity-90 ${
                    selectedItem?.id === item.id
                      ? "border-amber-300/80 shadow-[0_0_0_1px_rgba(252,211,77,0.35)]"
                      : "border-white/10 hover:border-amber-300/25"
                  }`}
                >
                  <div
                    className={`relative aspect-[2/3] w-full bg-gradient-to-br ${item.vibe}`}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82),transparent_65%)]" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="line-clamp-1 text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-[11px] text-slate-200">
                        {item.kind === "movie" ? "映画" : "ドラマ"} ・ {item.year}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 border-t border-white/5 bg-slate-950/40 p-2 text-[10px] text-slate-300 sm:gap-2 sm:p-2.5 sm:text-[11px]">
                    <div>
                      <p className="text-slate-500">Filmarks</p>
                      <p className="font-semibold text-white">{item.filmarksAvg.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">映画.com</p>
                      <p className="font-semibold text-white">{item.eigaComAvg.toFixed(1)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <aside className={`${glassPanel} order-3 space-y-4 p-3 sm:p-4 lg:order-none`}>
            <div>
              <h2 className="text-lg font-semibold text-white">今回の3本</h2>
              <p className="mt-1 text-xs text-slate-500">
                タップすると右の概要が切り替わります
              </p>
              <ul className="mt-2 space-y-2">
                {spotlightPicks.map((entry) => (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedItemId(entry.contentId)}
                      className={cn(
                        "w-full rounded-lg border p-2.5 text-left transition active:opacity-90",
                        selectedItem?.id === entry.contentId
                          ? "border-amber-300/50 bg-amber-400/[0.08]"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                      )}
                    >
                      <p className="text-sm font-medium text-slate-100">{entry.title}</p>
                      <p className="mt-0.5 text-xs leading-snug text-slate-400">{entry.blurb}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {selectedItem ? (
              <article className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <div
                  className={cn(
                    "relative mx-auto aspect-[2/3] w-full max-w-[220px] bg-gradient-to-br sm:max-w-none",
                    selectedItem.vibe
                  )}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.9),transparent_55%)]" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xl font-bold leading-tight text-white sm:text-2xl">
                      {selectedItem.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-200">
                      {selectedItem.year} ・{" "}
                      {selectedItem.kind === "movie" ? "映画" : "ドラマ"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 p-3 sm:p-3.5">
                  <div className="grid grid-cols-3 gap-1.5 text-center sm:gap-2">
                    <div className="rounded-md bg-white/[0.04] p-1.5 sm:p-2">
                      <p className="text-[10px] tracking-[0.16em] text-slate-500">
                        Filmarks
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {selectedItem.filmarksAvg.toFixed(1)}
                      </p>
                    </div>
                    <div className="rounded-md bg-white/[0.04] p-1.5 sm:p-2">
                      <p className="text-[10px] tracking-[0.16em] text-slate-500">
                        映画.com
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {selectedItem.eigaComAvg.toFixed(1)}
                      </p>
                    </div>
                    <div className="rounded-md bg-white/[0.04] p-1.5 sm:p-2">
                      <p className="text-[10px] tracking-[0.16em] text-slate-500">
                        Filmarks目安
                      </p>
                      <p className="text-sm font-semibold text-amber-200">
                        {recommendLabel(selectedItem.filmarksAvg)}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-300">{selectedItem.summary}</p>

                  <div className="space-y-2">
                    <button
                      type="button"
                      className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-black shadow-sm shadow-emerald-950/40 transition hover:bg-emerald-400"
                    >
                      配信を開く（準備中）
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("catalog")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                      className="w-full rounded-lg border border-white/15 bg-white/[0.03] py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                    >
                      作品一覧へ
                    </button>
                  </div>
                </div>
              </article>
            ) : (
              <p className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">
                該当がありません。条件を変えてください。
              </p>
            )}
          </aside>
        </section>
      </main>

      <div className="relative z-10">
        <MoviesSiteFooter />
      </div>
    </div>
  )
}
