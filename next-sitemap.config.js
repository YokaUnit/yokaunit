/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yokaunit.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  
  exclude: [
    '/admin/**',           // 管理者ページ
    '/api/**',             // APIルート
    '/auth/callback',      // 認証コールバック
    '/test',               // テストページ
    '/tools/private-tool', // プライベートツール
  ],
}