"use client";
// app/test/page.tsx
import React, { useEffect, useState } from "react";

type Hotel = {
  hotelBasicInfo: {
    hotelName: string;
    hotelImageUrl: string;
    reviewAverage: string;
    hotelMinCharge: string;
    hotelInformationUrl: string;
    address1: string;
    address2: string;
  };
};

export default function TestPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 楽天APIキーなどは環境変数から取得
  const applicationId = process.env.NEXT_PUBLIC_RAKUTEN_APP_ID!;
  const affiliateId = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID!;

  // 東京駅周辺の緯度経度（例）
  const latitude = 35.681236;
  const longitude = 139.767125;

  useEffect(() => {
    async function fetchHotels() {
      setLoading(true);
      setError(null);

      try {
        const url = `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?applicationId=${applicationId}&affiliateId=${affiliateId}&latitude=${latitude}&longitude=${longitude}&searchRadius=3&format=json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setHotels(data.hotels.map((item: any) => item.hotel[0]));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, [applicationId, affiliateId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!hotels.length) return <p>No hotels found.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>楽天トラベル宿泊施設一覧（東京駅周辺3km）</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {hotels.map((hotel) => (
          <li key={hotel.hotelBasicInfo.hotelInformationUrl} style={{ marginBottom: 24, borderBottom: "1px solid #ccc", paddingBottom: 16 }}>
            <h2>{hotel.hotelBasicInfo.hotelName}</h2>
            <img
              src={hotel.hotelBasicInfo.hotelImageUrl}
              alt={hotel.hotelBasicInfo.hotelName}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <p>評価: {hotel.hotelBasicInfo.reviewAverage} / 5</p>
            <p>最安料金: ¥{hotel.hotelBasicInfo.hotelMinCharge}</p>
            <p>住所: {hotel.hotelBasicInfo.address1} {hotel.hotelBasicInfo.address2}</p>
            <a
              href={hotel.hotelBasicInfo.hotelInformationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue" }}
            >
              公式ページ（楽天トラベル）
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
