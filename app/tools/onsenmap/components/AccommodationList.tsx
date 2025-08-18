"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Hotel } from "lucide-react"
import type { AccommodationData } from "../lib/onsen-data"

interface AccommodationListProps {
  accommodations: AccommodationData[]
  onAccommodationSelect: (accommodation: AccommodationData) => void
}

export default function AccommodationList({ 
  accommodations, 
  onAccommodationSelect 
}: AccommodationListProps) {
  return (
    <div className="space-y-2 pb-4">
      {accommodations.map((accommodation) => (
        <Card
          key={accommodation.id}
          className="cursor-pointer transition-all duration-200 hover:shadow-md hover:ring-2 hover:ring-blue-200"
          onClick={() => onAccommodationSelect(accommodation)}
        >
          <CardContent className="p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    accommodation.rating >= 4.5
                      ? "bg-green-600"
                      : accommodation.rating >= 4.0
                        ? "bg-blue-600"
                        : accommodation.rating >= 3.5
                          ? "bg-orange-500"
                          : "bg-gray-500"
                  }`}
                >
                  <Hotel className="h-3 w-3" />
                </div>
                {accommodation.rating >= 4.0 && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{accommodation.rating}</span>
                <span className="text-xs text-gray-400">({accommodation.reviews_count})</span>
              </div>
            </div>

            <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1">{accommodation.name}</h3>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{accommodation.address}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-green-600">
                ¥{accommodation.price_range.min.toLocaleString()}〜
              </span>
              {accommodation.distance_to_onsen && (
                <span className="text-xs text-blue-600">
                  温泉まで{accommodation.distance_to_onsen}km
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                評価 {accommodation.rating}
              </Badge>
              {accommodation.onsen_bath && (
                <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                  温泉
                </Badge>
              )}
              {accommodation.wifi && (
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                  WiFi
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
