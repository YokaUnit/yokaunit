"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { OnsenData } from "../lib/onsen-data"
import { Bath, MapPin, ExternalLink, Navigation, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Leafletのデフォルトアイコンを修正
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// 温泉専用のピンアイコン（赤枠・白背景・赤温泉マーク）
const createOnsenIcon = () => {
  return new L.DivIcon({
    html: `
      <div style="
        position: relative;
        width: 32px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 32px;
          height: 32px;
          background: white;
          border: 3px solid #ef4444;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          position: relative;
          z-index: 1000;
        ">
          <div style="
            transform: rotate(45deg);
            color: #ef4444;
            font-size: 16px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            ♨
          </div>
        </div>
      </div>
    `,
    className: "onsen-icon",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  })
}

interface OnsenDetailMapProps {
  onsen: OnsenData
}

export default function OnsenDetailMap({ onsen }: OnsenDetailMapProps) {
  const mapRef = useRef<L.Map>(null)

  // Googleマップで開く関数（施設名で検索）
  const openInGoogleMaps = () => {
    const query = encodeURIComponent(`${onsen.name} ${onsen.address}`)
    window.open(`https://www.google.com/maps/search/${query}`, "_blank")
  }

  // Googleマップでルート検索
  const openDirections = () => {
    const query = encodeURIComponent(`${onsen.name} ${onsen.address}`)
    window.open(`https://www.google.com/maps/dir//${query}`, "_blank")
  }

  // 全画面表示
  const openFullscreen = () => {
    const query = encodeURIComponent(`${onsen.name} ${onsen.address}`)
    window.open(`https://www.google.com/maps/search/${query}/@${onsen.latitude},${onsen.longitude},17z`, "_blank")
  }

  // カスタムスタイル
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .leaflet-control-zoom {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(12px) !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        overflow: hidden;
      }
      .leaflet-control-zoom a {
        background: rgba(255, 255, 255, 0.9) !important;
        color: #374151 !important;
        border: none !important;
        backdrop-filter: blur(8px) !important;
        width: 36px !important;
        height: 36px !important;
        line-height: 36px !important;
        border-radius: 0 !important;
        margin: 0 !important;
        font-size: 20px !important;
        font-weight: bold !important;
        transition: all 0.2s ease !important;
      }
      .leaflet-control-zoom a:hover {
        background: rgba(59, 130, 246, 0.1) !important;
        color: #3b82f6 !important;
        transform: scale(1.05);
      }
      .leaflet-control-zoom a:first-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
      }
      .onsen-icon {
        cursor: default !important;
      }
      .leaflet-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .leaflet-control-attribution {
        display: none !important;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-white">
      <MapContainer
        center={[onsen.latitude, onsen.longitude]}
        zoom={17} // より近距離表示（道路が見えるレベル）
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
        zoomControl={true}
        className="z-10"
        scrollWheelZoom={true}
        touchZoom={true}
        doubleClickZoom={true}
        dragging={true}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 温泉ピン（赤枠・白背景・赤温泉マーク） */}
        <Marker position={[onsen.latitude, onsen.longitude]} icon={createOnsenIcon()} />
      </MapContainer>

      {/* 温泉情報オーバーレイ（モバイル対応） */}
      <div className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg md:rounded-xl shadow-xl p-2 md:p-4 border border-white/20">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                <div className="flex items-center gap-1">
                  <Bath className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                  <span className="text-xs md:text-sm font-bold text-red-700">温泉</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="text-xs md:text-sm text-gray-600">#{onsen.ranking}</span>
              </div>
              <h3 className="font-bold text-sm md:text-base text-gray-900 mb-1 md:mb-2 line-clamp-2 md:line-clamp-1">
                {onsen.name}
              </h3>
              <div className="flex items-start gap-1 text-xs md:text-sm text-gray-600">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mt-0.5 md:mt-0" />
                <span className="line-clamp-2 md:line-clamp-1 leading-tight">{onsen.address}</span>
              </div>
            </div>
            <Button
              size="sm"
              className="h-8 px-2 md:h-9 md:px-4 text-xs md:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex-shrink-0 rounded-md md:rounded-lg"
              onClick={openInGoogleMaps}
            >
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
              <span className="hidden md:inline">Google Maps</span>
            </Button>
          </div>
        </div>
      </div>

      {/* アクションボタン群（右下・モバイル対応） */}
      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-20 flex flex-col gap-1 md:gap-2">
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 md:h-10 md:w-10 p-0 bg-white/95 backdrop-blur-sm hover:bg-white border-gray-200 shadow-lg rounded-md md:rounded-lg"
          onClick={openFullscreen}
          title="Googleマップで全画面表示"
        >
          <Maximize2 className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 md:h-10 md:w-10 p-0 bg-white/95 backdrop-blur-sm hover:bg-white border-gray-200 shadow-lg rounded-md md:rounded-lg"
          onClick={openDirections}
          title="Googleマップでルート検索"
        >
          <Navigation className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
        </Button>
      </div>

      {/* 地図の説明（左下・モバイル対応・重複回避） */}
      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-md md:rounded-lg shadow-lg px-2 py-1 md:px-3 md:py-2 border border-white/20">
          <div className="flex items-center gap-1 md:gap-2 text-xs md:text-xs text-gray-600">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full border border-white shadow-sm"></div>
            <span className="font-medium truncate max-w-[100px] md:max-w-[150px]">{onsen.name}</span>
          </div>
        </div>
      </div>

      {/* OpenStreetMapクレジット（右下隅・独立配置） */}
      <div className="absolute bottom-0 right-0 z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-tl px-2 py-1">
          <span className="text-xs text-gray-500">© OpenStreetMap</span>
        </div>
      </div>
    </div>
  )
}
