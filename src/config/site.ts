export const siteConfig = {
  name: 'Korkmaz İnşaat',
  description:
    'Korkmaz İnşaat - Gönen, Balıkesir\'de güvenilir müteahhit. Konut projeleri, satılık daireler ve modern yaşam alanları. Kaliteli işçilik ve zamanında teslim garantisi.',
  url: 'https://korkmazinsaat.com.tr',
  locale: 'tr_TR',
  ogImage: '/og-image.jpg',
  links: {
    phone: '+90 537 743 55 69',
    email: 'info@korkmazinsaat.com.tr',
    address: 'Korkmaz Plaza, Akçaali, 1002 Sokak No:6, 10900 Gönen/Balıkesir',
  },
  geo: {
    latitude: 40.1097,
    longitude: 27.6478,
    region: 'TR-10',
    placename: 'Gönen, Balıkesir',
  },
  social: {
    instagram: 'https://www.instagram.com/korkmazinsaat.gonen',
  },
} as const

export type SiteConfig = typeof siteConfig
