import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: './' },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
    ...overrides,
  }
}
