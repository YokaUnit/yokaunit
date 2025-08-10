"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { OnsenData, AccommodationData } from "../lib/onsen-data"
import { getAccommodationTypeLabel } from "../lib/onsen-data"
import {
  Star,
  MapPin,
  Clock,
  Phone,
  JapaneseYenIcon as Yen,
  Calendar,
  Car,
  Train,
  Crown,
  Info,
  Wifi,
  Bath,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Leafletのデフォルトアイコンを修正
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// ズームレベルから距離を計算する関数
const getDistanceFromZoom = (zoomLevel: number): string => {
  const distances: { [key: number]: string } = {
    1: "10000km",
    2: "5000km",
    3: "2500km",
    4: "1250km",
    5: "640km",
    6: "320km",
    7: "160km",
    8: "80km",
    9: "40km",
    10: "20km",
    11: "10km",
    12: "5km",
    13: "2.5km",
    14: "1.2km",
    15: "600m",
    16: "300m",
    17: "150m",
    18: "75m",
    19: "40m",
    20: "20m",
  }

  return distances[Math.round(zoomLevel)] || `${Math.round(40075 / Math.pow(2, zoomLevel + 1))}km`
}

// 宿泊施設用のピンアイコン作成（温泉ピンの3分の2のサイズ）
const createAccommodationIcon = (accommodation: AccommodationData, zoomLevel: number, showName: boolean) => {
  // 温泉ピンのサイズ計算と同じロジック
  const onsenBaseSize = Math.max(20, Math.min(40, 20 + (zoomLevel - 6) * 3))
  // 温泉ピンの3分の2のサイズ
  const size = Math.round(onsenBaseSize * (2 / 3))
  const shouldShowName = showName && zoomLevel >= 15

  return new L.DivIcon({
    html: `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        display: flex;
        flex-direction: column;
        align-items: center;
      ">
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border: 1px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.2s ease;
          position: relative;
          z-index: 1;
        " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          <svg width="${size - 6}" height="${size - 6}" viewBox="0 0 24 24" fill="white">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
        ${
          shouldShowName
            ? `
        <div style="
          position: absolute;
          top: ${size + 3}px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(59, 130, 246, 0.95);
          color: white;
          padding: 2px 5px;
          border-radius: 3px;
          font-size: ${Math.max(8, Math.round(size * 0.4))}px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          z-index: 3;
        ">
          ${accommodation.name}
        </div>
        `
            : ""
        }
      </div>
    `,
    className: "custom-accommodation-icon",
    iconSize: [size, size + (shouldShowName ? 20 : 0)],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

// ズームレベルに応じてピンサイズを調整（温泉名を小さく表示）
const createOnsenIcon = (ranking: number, zoomLevel: number, showName: boolean, name: string) => {
  const isTop3 = ranking <= 3
  const isTop10 = ranking <= 10

  const bgColor = isTop3 ? "#f87171" : isTop10 ? "#fb923c" : "#60a5fa"
  const borderColor = isTop3 ? "#ef4444" : isTop10 ? "#f97316" : "#3b82f6"
  const textColor = "#ffffff"

  // ズームレベルに応じてサイズを調整
  const baseSize = Math.max(20, Math.min(40, 20 + (zoomLevel - 6) * 3))
  const fontSize = Math.max(10, Math.min(16, 10 + (zoomLevel - 6) * 1))
  const crownSize = Math.max(8, Math.min(16, 8 + (zoomLevel - 6) * 1))

  // ズームレベル12以上（約5km未満）で温泉名を表示（小さくする）
  const shouldShowName = showName && zoomLevel >= 12

  return new L.DivIcon({
    html: `
      <div style="
        position: relative;
        width: ${baseSize}px;
        height: ${baseSize}px;
        display: flex;
        flex-direction: column;
        align-items: center;
      ">
        <div style="
          width: ${baseSize}px;
          height: ${baseSize}px;
          background: linear-gradient(135deg, ${bgColor} 0%, ${borderColor} 100%);
          border: 2px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: ${fontSize}px;
          color: ${textColor};
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          position: relative;
          z-index: 1;
          cursor: pointer;
          transition: transform 0.2s ease;
        " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          ${ranking}
        </div>
        ${
          isTop3
            ? `
        <div style="
          position: absolute;
          top: -2px;
          right: -2px;
          width: ${crownSize}px;
          height: ${crownSize}px;
          background: #fbbf24;
          border: 1px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        ">
          <span style="color: #92400e; font-size: ${Math.max(6, crownSize - 4)}px; font-weight: bold;">★</span>
        </div>
        `
            : ""
        }
        ${
          shouldShowName
            ? `
        <div style="
          position: absolute;
          top: ${baseSize + 5}px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          color: #374151;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: ${Math.max(9, fontSize - 3)}px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.1);
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          z-index: 3;
        ">
          ${name}
        </div>
        `
            : ""
        }
      </div>
    `,
    className: "custom-onsen-icon",
    iconSize: [baseSize, baseSize + (shouldShowName ? 25 : 0)],
    iconAnchor: [baseSize / 2, baseSize],
    popupAnchor: [0, -baseSize],
  })
}

interface OnsenMapProps {
  onsens: OnsenData[]
  accommodations: AccommodationData[]
  selectedOnsen: OnsenData | null
  onOnsenSelect: (onsen: OnsenData) => void
  searchSelectedOnsen?: OnsenData | null
  onZoomChange: (zoomLevel: number) => void
}

// マップの中心を更新し、選択された温泉のポップアップを開く + ズーム監視
function MapUpdater({
  selectedOnsen,
  searchSelectedOnsen,
  mapRef,
  onZoomChange,
}: {
  selectedOnsen: OnsenData | null
  searchSelectedOnsen?: OnsenData | null
  mapRef: React.RefObject<L.Map>
  onZoomChange: (zoomLevel: number) => void
}) {
  const map = useMap()

  // ズームレベル変更を監視
  useEffect(() => {
    const handleZoom = () => {
      const currentZoom = map.getZoom()
      onZoomChange(currentZoom)
    }

    // 初期ズームレベルを設定
    handleZoom()

    // ズームイベントリスナーを追加
    map.on("zoom", handleZoom)
    map.on("zoomend", handleZoom)

    return () => {
      map.off("zoom", handleZoom)
      map.off("zoomend", handleZoom)
    }
  }, [map, onZoomChange])

  useEffect(() => {
    if (searchSelectedOnsen && mapRef.current) {
      // 検索結果選択時は500mズーム（ズーム15）でポップアップを開く
      map.setView([searchSelectedOnsen.latitude, searchSelectedOnsen.longitude], 15, {
        animate: true,
        duration: 1,
      })

      setTimeout(() => {
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const marker = layer as L.Marker
            const markerLatLng = marker.getLatLng()
            if (
              Math.abs(markerLatLng.lat - searchSelectedOnsen.latitude) < 0.0001 &&
              Math.abs(markerLatLng.lng - searchSelectedOnsen.longitude) < 0.0001
            ) {
              marker.openPopup()
            }
          }
        })
      }, 500)
    } else if (selectedOnsen && mapRef.current) {
      // 通常選択時は現在のズームレベルを維持
      const currentZoom = map.getZoom()
      map.setView([selectedOnsen.latitude, selectedOnsen.longitude], currentZoom, {
        animate: true,
        duration: 1,
      })

      setTimeout(() => {
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const marker = layer as L.Marker
            const markerLatLng = marker.getLatLng()
            if (
              Math.abs(markerLatLng.lat - selectedOnsen.latitude) < 0.0001 &&
              Math.abs(markerLatLng.lng - selectedOnsen.longitude) < 0.0001
            ) {
              marker.openPopup()
            }
          }
        })
      }, 500)
    }
  }, [selectedOnsen, searchSelectedOnsen, map, mapRef])

  return null
}

export default function OnsenMap({
  onsens,
  accommodations,
  selectedOnsen,
  onOnsenSelect,
  searchSelectedOnsen,
}: OnsenMapProps) {
  const mapRef = useRef<L.Map>(null)
  const [activeTab, setActiveTab] = useState<"basic" | "detail">("basic")
  const [zoomLevel, setZoomLevel] = useState(6)
  const [clickedOnsen, setClickedOnsen] = useState<OnsenData | null>(null)
  const [showNames, setShowNames] = useState(false)
  const [showAccommodationNames, setShowAccommodationNames] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // 日本の中心座標
  const japanCenter: [number, number] = [36.2048, 138.2529]

  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // ズームレベル変更ハンドラー
  const handleZoomChange = (newZoomLevel: number) => {
    setZoomLevel(newZoomLevel)
    setShowNames(newZoomLevel >= 12)
    setShowAccommodationNames(newZoomLevel >= 15)
  }

  // ズームレベルに応じたポップアップサイズを計算（さらに大きく）
  const getPopupSize = (zoom: number) => {
    if (isMobile) {
      // モバイル: さらに大きく
      const baseWidth = 200
      const scaleFactor = Math.max(1.0, Math.min(1.5, 1.0 + (zoom - 6) * 0.08))
      return {
        maxWidth: Math.round(baseWidth * scaleFactor),
        minWidth: Math.round(baseWidth * 0.95 * scaleFactor),
      }
    } else {
      // デスクトップ: かなり大きく
      const baseWidth = 280
      const scaleFactor = Math.max(1.1, Math.min(1.8, 1.1 + (zoom - 6) * 0.1))
      return {
        maxWidth: Math.round(baseWidth * scaleFactor),
        minWidth: Math.round(baseWidth * 0.95 * scaleFactor),
      }
    }
  }

  // カスタムズームコントロールのスタイル
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .leaflet-control-zoom {
        background: rgba(255, 255, 255, 0.8) !important;
        backdrop-filter: blur(8px) !important;
        border-radius: 6px !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
        border: none !important;
      }
      .leaflet-control-zoom a {
        background: rgba(255, 255, 255, 0.8) !important;
        color: #374151 !important;
        border: none !important;
        backdrop-filter: blur(8px) !important;
        width: 26px !important;
        height: 26px !important;
        line-height: 26px !important;
        border-radius: 4px !important;
        margin: 2px !important;
      }
      .leaflet-control-zoom a:hover {
        background: rgba(255, 255, 255, 0.9) !important;
        color: #1f2937 !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 6px !important;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12) !important;
        padding: 0 !important;
      }
      .leaflet-popup-content {
        margin: 0 !important;
        padding: 0 !important;
        line-height: 1.2 !important;
        font-size: ${isMobile ? "12px" : "13px"} !important;
      }
      .leaflet-popup-tip {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [isMobile])

  // ピンクリック時の処理（バグ修正）
  const handleMarkerClick = (onsen: OnsenData) => {
    if (clickedOnsen && clickedOnsen.id === onsen.id && mapRef.current) {
      // 同じピンを再クリックした場合のみ500mズーム
      const currentZoom = mapRef.current.getZoom()
      if (currentZoom < 15) {
        mapRef.current.setView([onsen.latitude, onsen.longitude], 15, {
          animate: true,
          duration: 1,
        })
      }
      setClickedOnsen(null)
    } else {
      // 他のポップアップを閉じる
      if (mapRef.current) {
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker && layer !== mapRef.current) {
            layer.closePopup()
          }
        })
      }
      onOnsenSelect(onsen)
      setClickedOnsen(onsen)
      setActiveTab("basic")
    }
  }

  const popupSize = getPopupSize(zoomLevel)
  const fontSize = isMobile ? "12px" : "13px"
  const smallFontSize = isMobile ? "11px" : "12px"
  const tinyFontSize = isMobile ? "10px" : "11px"

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <MapContainer
        center={japanCenter}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
        zoomControl={true}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater
          selectedOnsen={selectedOnsen}
          searchSelectedOnsen={searchSelectedOnsen}
          mapRef={mapRef}
          onZoomChange={handleZoomChange}
        />

        {/* 温泉ピン */}
        {onsens.map((onsen) => (
          <Marker
            key={`onsen-${onsen.id}`}
            position={[onsen.latitude, onsen.longitude]}
            icon={createOnsenIcon(onsen.ranking, zoomLevel, showNames, onsen.name)}
            eventHandlers={{
              click: () => handleMarkerClick(onsen),
            }}
          >
            <Popup
              className="custom-popup"
              maxWidth={popupSize.maxWidth}
              minWidth={popupSize.minWidth}
              closeButton={true}
              autoClose={false}
              offset={[0, -6]}
            >
              <div style={{ fontSize, lineHeight: "1.2", fontFamily: "system-ui, sans-serif" }}>
                {/* ヘッダー */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white",
                    padding: isMobile ? "5px 6px" : "6px 8px",
                    borderRadius: "6px 6px 0 0",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "3px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Crown style={{ width: isMobile ? "12px" : "14px", height: isMobile ? "12px" : "14px" }} />
                      <span style={{ fontSize: smallFontSize, fontWeight: "bold" }}>#{onsen.ranking}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Star
                        style={{
                          width: isMobile ? "12px" : "14px",
                          height: isMobile ? "12px" : "14px",
                          fill: "#fbbf24",
                          color: "#fbbf24",
                        }}
                      />
                      <span style={{ fontSize: smallFontSize, fontWeight: "bold" }}>{onsen.rating}</span>
                      <span style={{ fontSize: tinyFontSize, opacity: "0.8" }}>({onsen.reviews_count})</span>
                    </div>
                  </div>
                  <div style={{ fontSize: fontSize, fontWeight: "bold", lineHeight: "1.2", marginBottom: "3px" }}>
                    {onsen.name}
                  </div>
                  <span style={{ fontSize: tinyFontSize, opacity: "0.9" }}>{onsen.region}</span>
                </div>

                {/* タブ */}
                <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
                  <button
                    onClick={() => setActiveTab("basic")}
                    style={{
                      flex: 1,
                      padding: isMobile ? "4px 6px" : "5px 8px",
                      fontSize: tinyFontSize,
                      fontWeight: "500",
                      border: "none",
                      background: activeTab === "basic" ? "white" : "transparent",
                      color: activeTab === "basic" ? "#2563eb" : "#6b7280",
                      borderBottom: activeTab === "basic" ? "2px solid #2563eb" : "none",
                      cursor: "pointer",
                    }}
                  >
                    基本情報
                  </button>
                  <button
                    onClick={() => setActiveTab("detail")}
                    style={{
                      flex: 1,
                      padding: isMobile ? "4px 6px" : "5px 8px",
                      fontSize: tinyFontSize,
                      fontWeight: "500",
                      border: "none",
                      background: activeTab === "detail" ? "white" : "transparent",
                      color: activeTab === "detail" ? "#2563eb" : "#6b7280",
                      borderBottom: activeTab === "detail" ? "2px solid #2563eb" : "none",
                      cursor: "pointer",
                    }}
                  >
                    詳細
                  </button>
                </div>

                {/* コンテンツ */}
                <div style={{ padding: isMobile ? "5px" : "6px" }}>
                  {activeTab === "basic" ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "4px" : "5px" }}>
                      {/* 住所 */}
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: tinyFontSize }}>
                        <MapPin style={{ width: "12px", height: "12px", color: "#3b82f6", flexShrink: 0 }} />
                        <span
                          style={{
                            color: "#4b5563",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {onsen.address}
                        </span>
                      </div>

                      {/* 営業時間・定休日 */}
                      <div
                        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", fontSize: tinyFontSize }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                          <Clock style={{ width: "12px", height: "12px", color: "#2563eb", flexShrink: 0 }} />
                          <span
                            style={{
                              color: "#374151",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {onsen.opening_hours || "9:00~23:00"}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                          <Calendar style={{ width: "12px", height: "12px", color: "#7c3aed", flexShrink: 0 }} />
                          <span
                            style={{
                              color: "#374151",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {onsen.holiday || "無休"}
                          </span>
                        </div>
                      </div>

                      {/* 料金 */}
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: tinyFontSize }}>
                        <Yen style={{ width: "12px", height: "12px", color: "#059669", flexShrink: 0 }} />
                        <span style={{ color: "#047857", fontWeight: "500" }}>
                          大人{onsen.admission_fee_adult || 1450}円 小人{onsen.admission_fee_child || 700}円
                        </span>
                      </div>

                      {/* その他情報 */}
                      {onsen.phone && (
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: tinyFontSize }}>
                          <Phone style={{ width: "12px", height: "12px", color: "#ea580c", flexShrink: 0 }} />
                          <a
                            href={`tel:${onsen.phone}`}
                            style={{
                              color: "#2563eb",
                              textDecoration: "none",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {onsen.phone}
                          </a>
                        </div>
                      )}

                      {onsen.nearest_station && (
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: tinyFontSize }}>
                          <Train style={{ width: "12px", height: "12px", color: "#4f46e5", flexShrink: 0 }} />
                          <span
                            style={{
                              color: "#374151",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {onsen.nearest_station.split("（")[0]}
                          </span>
                        </div>
                      )}

                      {onsen.parking_spaces && (
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: tinyFontSize }}>
                          <Car style={{ width: "12px", height: "12px", color: "#6b7280", flexShrink: 0 }} />
                          <span style={{ color: "#374151" }}>駐車場{onsen.parking_spaces}台</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "4px" : "5px" }}>
                      {/* 画像 - ここが画像表示の条件！ */}
                      {onsen.image_url && (
                        <div
                          style={{
                            width: "100%",
                            height: isMobile ? "60px" : "80px",
                            background: "#e5e7eb",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={
                              onsen.image_url ||
                              `/placeholder.svg?height=${isMobile ? 60 : 80}&width=${popupSize.maxWidth}`
                            }
                            alt={onsen.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      )}

                      {/* 説明 */}
                      <div style={{ fontSize: tinyFontSize, color: "#374151", lineHeight: "1.3" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "3px" }}>
                          <Info style={{ width: "12px", height: "12px", color: "#2563eb" }} />
                          <span style={{ fontWeight: "500", color: "#1e40af" }}>特徴</span>
                        </div>
                        <p
                          style={{
                            margin: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: isMobile ? 4 : 5,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {onsen.description}
                        </p>
                      </div>

                      {/* 設備 */}
                      {onsen.equipment && onsen.equipment.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                          {onsen.equipment.slice(0, isMobile ? 4 : 6).map((item, index) => (
                            <span
                              key={index}
                              style={{
                                fontSize: tinyFontSize,
                                padding: "2px 5px",
                                background: "#fef3c7",
                                color: "#92400e",
                                borderRadius: "3px",
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ボタン - target="_blank"を削除して同じタブで開く */}
                  <div style={{ marginTop: isMobile ? "5px" : "6px", display: "flex", gap: "3px" }}>
                    <Button
                      size="sm"
                      className="h-6 text-xs px-3 bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      asChild
                      style={{
                        height: isMobile ? "22px" : "24px",
                        fontSize: tinyFontSize,
                        padding: "0 8px",
                        backgroundColor: "#2563eb",
                        color: "#ffffff",
                      }}
                    >
                      <a href={`/tools/onsenmap/${onsen.slug}`}>詳細</a>
                    </Button>
                    {onsen.website_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs px-3 border-gray-300 flex-1 bg-white text-gray-700 hover:bg-gray-50"
                        asChild
                        style={{ height: isMobile ? "22px" : "24px", fontSize: tinyFontSize, padding: "0 8px" }}
                      >
                        <a href={onsen.website_url} target="_blank" rel="noopener noreferrer">
                          公式
                        </a>
                      </Button>
                    )}
                    {onsen.affiliate_link && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs px-3 border-gray-300 flex-1 bg-white text-gray-700 hover:bg-gray-50"
                        asChild
                        style={{ height: isMobile ? "22px" : "24px", fontSize: tinyFontSize, padding: "0 8px" }}
                      >
                        <a href={onsen.affiliate_link} target="_blank" rel="noopener noreferrer">
                          予約
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

              {/* 宿泊施設ピン（ズームレベル8以上で表示、デバッグ情報付き） */}
      {zoomLevel >= 8 && accommodations.length > 0 && (
        <div>
          {console.log(`🏨 宿泊施設ピン表示: ${accommodations.length}件, ズームレベル: ${zoomLevel}`)}
          {console.log('宿泊施設データサンプル:', accommodations.slice(0, 2))}
        </div>
      )}
      {zoomLevel >= 8 &&
          accommodations.map((accommodation) => (
            <Marker
              key={`accommodation-${accommodation.id}`}
              position={[accommodation.latitude, accommodation.longitude]}
              icon={createAccommodationIcon(accommodation, zoomLevel, showAccommodationNames)}
            >
              <Popup
                className="custom-popup"
                maxWidth={popupSize.maxWidth}
                minWidth={popupSize.minWidth}
                closeButton={true}
                autoClose={false}
                offset={[0, -6]}
              >
                <div style={{ fontSize, lineHeight: "1.2", fontFamily: "system-ui, sans-serif" }}>
                  {/* ヘッダー */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #059669, #0d9488)",
                      color: "white",
                      padding: isMobile ? "5px 6px" : "6px 8px",
                      borderRadius: "6px 6px 0 0",
                      marginBottom: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "3px",
                      }}
                    >
                      <Badge variant="secondary" className="text-xs">
                        {getAccommodationTypeLabel(accommodation.type)}
                      </Badge>
                      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                        <Star
                          style={{
                            width: isMobile ? "12px" : "14px",
                            height: isMobile ? "12px" : "14px",
                            fill: "#fbbf24",
                            color: "#fbbf24",
                          }}
                        />
                        <span style={{ fontSize: smallFontSize, fontWeight: "bold" }}>{accommodation.rating}</span>
                        <span style={{ fontSize: tinyFontSize, opacity: "0.8" }}>({accommodation.reviews_count})</span>
                      </div>
                    </div>
                    <div style={{ fontSize: fontSize, fontWeight: "bold", lineHeight: "1.2", marginBottom: "3px" }}>
                      {accommodation.name}
                    </div>
                    <span style={{ fontSize: tinyFontSize, opacity: "0.9" }}>
                      温泉まで{accommodation.distance_to_onsen}km
                    </span>
                  </div>

                  {/* コンテンツ */}
                  <div style={{ padding: isMobile ? "5px" : "6px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "4px" : "5px" }}>
                      {/* 住所 */}
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: tinyFontSize }}>
                        <MapPin style={{ width: "12px", height: "12px", color: "#059669", flexShrink: 0 }} />
                        <span
                          style={{
                            color: "#4b5563",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {accommodation.address}
                        </span>
                      </div>

                      {/* 料金範囲 */}
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: tinyFontSize }}>
                        <Yen style={{ width: "12px", height: "12px", color: "#059669", flexShrink: 0 }} />
                        <span style={{ color: "#047857", fontWeight: "500" }}>
                          ¥{accommodation.price_range.min.toLocaleString()}〜¥
                          {accommodation.price_range.max.toLocaleString()}
                        </span>
                      </div>

                      {/* チェックイン・アウト */}
                      <div
                        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", fontSize: tinyFontSize }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                          <Clock style={{ width: "12px", height: "12px", color: "#2563eb", flexShrink: 0 }} />
                          <span style={{ color: "#374151" }}>IN {accommodation.check_in}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                          <Clock style={{ width: "12px", height: "12px", color: "#7c3aed", flexShrink: 0 }} />
                          <span style={{ color: "#374151" }}>OUT {accommodation.check_out}</span>
                        </div>
                      </div>

                      {/* 設備アイコン */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: tinyFontSize }}>
                        {accommodation.onsen_bath && (
                          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                            <Bath style={{ width: "12px", height: "12px", color: "#f59e0b" }} />
                            <span style={{ color: "#92400e" }}>温泉</span>
                          </div>
                        )}
                        {accommodation.wifi && (
                          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                            <Wifi style={{ width: "12px", height: "12px", color: "#3b82f6" }} />
                            <span style={{ color: "#1e40af" }}>WiFi</span>
                          </div>
                        )}
                        {accommodation.parking && (
                          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                            <Car style={{ width: "12px", height: "12px", color: "#6b7280" }} />
                            <span style={{ color: "#374151" }}>駐車場</span>
                          </div>
                        )}
                      </div>

                      {/* 説明 */}
                      <p
                        style={{
                          fontSize: tinyFontSize,
                          color: "#374151",
                          lineHeight: "1.3",
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {accommodation.description}
                      </p>
                    </div>

                    {/* 予約ボタン（アフィリエイトリンク） */}
                    <div style={{ marginTop: isMobile ? "5px" : "6px", display: "flex", gap: "3px" }}>
                      {accommodation.jalan_link && (
                        <Button
                          size="sm"
                          className="h-6 text-xs px-3 bg-orange-600 hover:bg-orange-700 text-white flex-1"
                          asChild
                          style={{
                            height: isMobile ? "22px" : "24px",
                            fontSize: tinyFontSize,
                            padding: "0 8px",
                            backgroundColor: "#ea580c",
                            color: "#ffffff",
                          }}
                        >
                          <a href={accommodation.jalan_link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-2 h-2 mr-1" />
                            じゃらん
                          </a>
                        </Button>
                      )}
                      {accommodation.rakuten_link && (
                        <Button
                          size="sm"
                          className="h-6 text-xs px-3 bg-red-600 hover:bg-red-700 text-white flex-1"
                          asChild
                          style={{
                            height: isMobile ? "22px" : "24px",
                            fontSize: tinyFontSize,
                            padding: "0 8px",
                            backgroundColor: "#dc2626",
                            color: "#ffffff",
                          }}
                        >
                          <a href={accommodation.rakuten_link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-2 h-2 mr-1" />
                            楽天
                          </a>
                        </Button>
                      )}
                      {accommodation.official_website && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-xs px-3 border-gray-300 flex-1 bg-white text-gray-700 hover:bg-gray-50"
                          asChild
                          style={{ height: isMobile ? "22px" : "24px", fontSize: tinyFontSize, padding: "0 8px" }}
                        >
                          <a href={accommodation.official_website} target="_blank" rel="noopener noreferrer">
                            公式
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* 距離表示 - 左下に小さく透明背景で表示 */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          zIndex: 2000,
          fontSize: isMobile ? "10px" : "11px",
          color: "#374151",
          background: "rgba(255, 255, 255, 0.8)",
          padding: "3px 8px",
          borderRadius: "4px",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          fontWeight: "500",
          fontFamily: "system-ui, sans-serif",
          pointerEvents: "none",
          userSelect: "none",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        範囲: {getDistanceFromZoom(zoomLevel)}
      </div>
    </div>
  )
}
