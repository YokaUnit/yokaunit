-- お気に入り機能用テーブル
CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    tool_slug TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ユニーク制約（同じユーザーが同じツールを複数回お気に入りできないように）
CREATE UNIQUE INDEX IF NOT EXISTS user_favorites_user_tool_unique 
ON user_favorites (user_id, tool_slug);

-- RLS (Row Level Security) を有効化
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のお気に入りのみ閲覧・操作可能
CREATE POLICY "Users can view own favorites" ON user_favorites
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON user_favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON user_favorites
    FOR DELETE USING (auth.uid() = user_id);

-- いいね数を増やす関数
CREATE OR REPLACE FUNCTION increment_likes(slug_to_update text)
RETURNS void AS $$
BEGIN
    UPDATE tools 
    SET likes_count = likes_count + 1 
    WHERE slug = slug_to_update;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- いいね数を減らす関数
CREATE OR REPLACE FUNCTION decrement_likes(slug_to_update text)
RETURNS void AS $$
BEGIN
    UPDATE tools 
    SET likes_count = GREATEST(likes_count - 1, 0) 
    WHERE slug = slug_to_update;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
