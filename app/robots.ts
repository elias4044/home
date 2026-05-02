import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://elias4044.com/sitemap.xml',
    host: 'https://elias4044.com',
  }
}
