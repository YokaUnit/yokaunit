-- RLSポリシーの確認
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('user_favorites', 'tools', 'profiles')
ORDER BY tablename, policyname;

-- テーブルのRLS有効状態を確認
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('user_favorites', 'tools', 'profiles');

-- 現在のユーザー情報を確認（認証されている場合）
SELECT 
  auth.uid() as current_user_id,
  auth.jwt() ->> 'email' as current_user_email;
