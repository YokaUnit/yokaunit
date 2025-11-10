-- コネクトフォーゲーム用のテーブル作成

-- connectfour_roomsテーブル
CREATE TABLE IF NOT EXISTS connectfour_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT UNIQUE NOT NULL,
  board JSONB NOT NULL DEFAULT '[[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]]'::jsonb,
  current_player TEXT NOT NULL DEFAULT 'red' CHECK (current_player IN ('red', 'yellow')),
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished')),
  result TEXT CHECK (result IN ('red', 'yellow', 'draw')),
  host_name TEXT,
  guest_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_connectfour_rooms_room_code ON connectfour_rooms(room_code);
CREATE INDEX IF NOT EXISTS idx_connectfour_rooms_created_at ON connectfour_rooms(created_at);

-- updated_atの自動更新トリガー
CREATE OR REPLACE FUNCTION update_connectfour_rooms_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_connectfour_rooms_updated_at
  BEFORE UPDATE ON connectfour_rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_connectfour_rooms_updated_at();

-- Realtimeを有効化
ALTER PUBLICATION supabase_realtime ADD TABLE connectfour_rooms;

-- RLS（Row Level Security）ポリシー
ALTER TABLE connectfour_rooms ENABLE ROW LEVEL SECURITY;

-- 全ユーザーが読み取り可能
CREATE POLICY "connectfour_rooms_select_policy"
  ON connectfour_rooms
  FOR SELECT
  USING (true);

-- 全ユーザーが挿入可能
CREATE POLICY "connectfour_rooms_insert_policy"
  ON connectfour_rooms
  FOR INSERT
  WITH CHECK (true);

-- 全ユーザーが更新可能
CREATE POLICY "connectfour_rooms_update_policy"
  ON connectfour_rooms
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ツールテーブルにコネクトフォーを追加
INSERT INTO tools (
  slug,
  title,
  description,
  category,
  subcategory,
  tags,
  icon,
  href,
  image_url,
  is_premium,
  is_private,
  is_new,
  is_popular,
  is_active,
  likes_count,
  created_at,
  updated_at
) VALUES (
  'connectfour',
  'コネクトフォー',
  'オンライン対戦できる四目並べゲーム。合言葉ルームで友達とリアルタイム対戦。縦・横・斜めに4つ並べて勝利しよう！',
  'ゲーム',
  'ボードゲーム',
  ARRAY['コネクトフォー', '四目並べ', 'Connect Four', 'オンライン対戦', 'リアルタイム対戦', '無料ゲーム', 'ボードゲーム', 'パズルゲーム', 'マルチプレイ', '対戦ゲーム'],
  '🎯',
  '/tools/connectfour',
  NULL,
  false,
  false,
  true,
  false,
  true,
  0,
  NOW(),
  NOW()
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  tags = EXCLUDED.tags,
  icon = EXCLUDED.icon,
  href = EXCLUDED.href,
  updated_at = NOW();

-- 確認用クエリ
SELECT * FROM tools WHERE slug = 'connectfour';








