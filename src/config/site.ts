export const siteConfig = {
  name: 'Korkmaz İnşaat',
  description: 'Korkmaz İnşaat - Güvenilir ve kaliteli inşaat hizmetleri. Konut, ticari yapı ve altyapı projelerinde 25 yıllık deneyim.',
  url: 'https://korkmazinsaat.com.tr',
  locale: 'tr_TR',
  ogImage: '/og-image.jpg',
  links: {
    phone: '+90 212 000 0000',
    email: 'info@korkmazinsaat.com.tr',
    address: 'Levent, Büyükdere Cad. No:123, 34330 Beşiktaş/İstanbul',
  },
  social: {
    instagram: 'https://instagram.com/korkmazinsaat',
    linkedin: 'https://linkedin.com/company/korkmazinsaat',
    facebook: 'https://facebook.com/korkmazinsaat',
  },
} as const

export type SiteConfig = typeof siteConfig
