/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@supabase/supabase-js', '@xenova/transformers'],
  webpack: (config, { isServer }) => {
    // Transformers.jsのWebAssembly対応
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        path: false,
        os: false,
      }
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zphkclbhhouulgfsfawi.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Supabase Storageからの画像取得がタイムアウトするため、unoptimizedを維持
    // 代わりに画像サイズを事前に最適化してSupabase Storageにアップロードすることを推奨
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
