export interface OGPMetaData {
  title?: string
  description?: string
  image?: string
  url?: string
  siteName?: string
  type?: string
  locale?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterSite?: string
  twitterCreator?: string
  canonical?: string
  robots?: string
  keywords?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tag?: string
  width?: string
  height?: string
  alt?: string
}

export interface CheckResult {
  url: string
  metaData: OGPMetaData
  seoScore: number
  timestamp: number
  error?: string
}

export interface OGPCheckerSettings {
  autoSave: boolean
  showAdvanced: boolean
  defaultBatchSize: number
  cacheResults: boolean
}
