import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: `${siteConfig.name} | Gönen, Balıkesir Müteahhit`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      'Gönen İnşaat',
      'Gönen satılık daire',
      'Gönen konut projeleri',
      'Balıkesir müteahhit',
      'Balıkesir inşaat',
      'Gönen inşaat firması',
      'Gönen satılık ev',
      'Gönen yeni yapı',
      'Korkmaz İnşaat',
      'Gönen daire fiyatları',
    ],
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: './' },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': siteConfig.geo.region,
      'geo.placename': siteConfig.geo.placename,
      'geo.position': `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      'ICBM': `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
    },
    ...overrides,
  }
}
