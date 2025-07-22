"use client"

import { useEffect, useRef } from "react"

interface OnsenDetailMapProps {
  latitude: number
  longitude: number
  name: string
}

export function OnsenDetailMap({ latitude, longitude, name }: OnsenDetailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true

    script.onload = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        })

        // カスタムマーカーを作成
        const marker = new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          title: name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "white",
            fillOpacity: 1,
            strokeColor: "#ef4444",
            strokeWeight: 3,
          },
        })

        // 温泉アイコンを追加するためのオーバーレイ
        const overlay = new window.google.maps.OverlayView()
        overlay.onAdd = function () {
          const div = document.createElement("div")
          div.style.position = "absolute"
          div.style.fontSize = "16px"
          div.style.color = "#ef4444"
          div.style.fontWeight = "bold"
          div.style.pointerEvents = "none"
          div.innerHTML = "♨️"

          const panes = this.getPanes()
          panes.overlayMouseTarget.appendChild(div)

          this.div = div
        }

        overlay.draw = function () {
          const projection = this.getProjection()
          const position = projection.fromLatLngToDivPixel(new window.google.maps.LatLng(latitude, longitude))

          if (this.div) {
            this.div.style.left = position.x - 8 + "px"
            this.div.style.top = position.y - 8 + "px"
          }
        }

        overlay.setMap(map)

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 8px; font-weight: bold;">${name}</div>`,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      }
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [latitude, longitude, name])

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}
