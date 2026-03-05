# Supabase 利用料削減と代替案

利用料が多くなってSupabaseが停止した場合の対処と、今後の削減・代替案です。

## すぐできること

### 1. アプリを止めずに運用する（Supabase無効モード）

Supabaseを切ってもアプリは起動するようにしてあります。

- **環境変数で無効にする**  
  `.env.local` に以下を追加すると、Supabaseへの接続を使わないモードで起動します。  
  （ログイン・お気に入り・ツール一覧などは動きませんが、ビルド・起動はできます。）

  ```env
  NEXT_PUBLIC_SUPABASE_ENABLED=false
  ```

- **URL/Key を外す**  
  `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を削除または空にすると、同じく「無効」扱いになり、起動時エラーにはなりません。

- 無効時に画面上部に「データ機能は停止しています」のバナーが出ます。

### 2. 利用料を抑える（Supabaseを続ける場合）

- **Dashboardで確認**  
  [Supabase Dashboard](https://supabase.com/dashboard) → 対象プロジェクト → Settings → Usage で、どの機能（DB・Auth・Storage・Realtime）が効いているか確認する。

- **Storage**  
  ツール画像をSupabase Storageに置いている場合、読み取りが多くなりがちです。  
  - 画像を [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) や Cloudflare R2 などに移すと、DB・Authだけに戻せます。  
  - あるいは画像は `/public` やCDNに置き、Supabaseは認証・ツールデータだけにする。

- **Realtime**  
  使っていなければ無効化する。使っている場合は、必要なチャネルだけ購読する。

- **APIコール数**  
  - ツール一覧などはキャッシュ（Next.jsの `revalidate` や ISR）を増やす。  
  - クライアント側の不要な再取得（useEffectの依存や頻繁なrefetch）を減らす。

- **無料枠の範囲**  
  - 無料プランの枠（DBサイズ・転送量・リクエスト数）を超えないように、Dashboardのアラートやメールを有効にしておく。

## 代替案（Supabaseから離れる場合）

| 用途       | 代替例 |
|------------|--------|
| 認証       | [Auth.js](https://authjs.dev/)（NextAuth） + メール/Google等 |
| データベース | [Turso](https://turso.tech/)（SQLite）、[Neon](https://neon.tech/)（Postgres）、[PlanetScale](https://planetscale.com/)（MySQL） |
| ファイル保存 | Vercel Blob、Cloudflare R2、S3 |
| 課金       | 現在のStripeはそのまま利用可能（Supabaseの `profiles` 等のストア先だけ別DBに移す） |

移行時は、`lib/supabase.ts` および `createServerSupabaseClient` を使っている箇所を、新しいDB・Auth・Storageのクライアントに置き換える形になります。

## このリポジトリでSupabaseを使っている主な場所

- **認証** … `hooks/use-auth.tsx`, `components/auth/*`, `app/auth/*`
- **DB（ツール・お気に入り・プロフィール等）** … `lib/actions/tools.ts`, `lib/actions/favorites.ts`, `lib/actions/admin.ts`
- **Storage（ツール画像）** … `lib/actions/storage.ts`, `app/api/upload-tool-image/route.ts`
- **Stripe連携** … `app/api/stripe/*`, `app/api/subscription/*`

まずは「Supabase無効モード」でアプリを動かしつつ、上記の削減案か代替案のどちらで進めるか決めると進めやすいです。
