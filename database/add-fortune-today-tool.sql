-- 今日の運勢占いツールをツールテーブルに追加

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
  'fortune-today',
  '今日の運勢占い',
  '星座と今日の行動から運勢を診断！総合運・恋愛運・仕事運・金運を0-100で数値化。ラッキー行動とアドバイスも。',
  '占い・診断',
  '運勢占い',
  ARRAY['占い', '運勢', '星座', '今日', '恋愛運', '仕事運', '金運', '総合運', 'ラッキー', 'アドバイス', '12星座', '無料占い'],
  '🔮',
  '/tools/fortune-today',
  NULL, -- 画像URLは後で追加可能
  false, -- プレミアム機能ではない
  false, -- 非公開ではない
  true,  -- 新機能
  false, -- まだ人気ツールではない
  true,  -- アクティブ
  0,     -- 初期いいね数
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
SELECT * FROM tools WHERE slug = 'fortune-today';
