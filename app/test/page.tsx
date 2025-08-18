"use client";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 取得済みの楽天APIキー（環境変数推奨）
  const applicationId = "1011285080477164382";
  const affiliateId = "4b2ecc18.18aa4717.4b2ecc19.83d49175";

  // 東京23区エリアコード（緯度経度の代わりにこちらを利用）
  const areaCode = "130010";

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?applicationId=${applicationId}&affiliateId=${affiliateId}&areaCode=${areaCode}&format=json`;

    console.log("楽天API呼び出しURL:", url);

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`APIエラー ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("APIレスポンス:", data);

        if (!data.hotels || !Array.isArray(data.hotels)) {
          setError("宿データがありません");
          return;
        }
        setHotels(data.hotels.map((item: any) => item.hotel[0]));
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>エラー: {error}</p>;
  if (!hotels.length) return <p>宿泊施設が見つかりませんでした。</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
      <h1>楽天トラベル 宿泊施設一覧（東京23区）</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {hotels.map((hotel) => (
          <li
            key={hotel.hotelBasicInfo.hotelInformationUrl}
            style={{
              marginBottom: 24,
              borderBottom: "1px solid #ccc",
              paddingBottom: 16,
            }}
          >
            <h2>{hotel.hotelBasicInfo.hotelName}</h2>
            <img
              src={hotel.hotelBasicInfo.hotelImageUrl}
              alt={hotel.hotelBasicInfo.hotelName}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <p>評価: {hotel.hotelBasicInfo.reviewAverage} / 5</p>
            <p>最安料金: ¥{hotel.hotelBasicInfo.hotelMinCharge}</p>
            <p>
              住所: {hotel.hotelBasicInfo.address1} {hotel.hotelBasicInfo.address2}
            </p>
            <a
              href={hotel.hotelBasicInfo.hotelInformationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue" }}
            >
              楽天トラベル公式ページ
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
