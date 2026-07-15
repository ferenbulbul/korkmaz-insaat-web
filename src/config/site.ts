export const siteConfig = {
  name: 'Korkmaz İnşaat',
  description:
    'Korkmaz İnşaat - Gönen, Balıkesir\'de güvenilir müteahhit. Konut projeleri, satılık daireler ve modern yaşam alanları. Kaliteli işçilik ve zamanında teslim garantisi.',
  url: 'https://korkmazinsaat.com.tr',
  locale: 'tr_TR',
  ogImage: '/og-image.jpg',
  links: {
    phone: '+90 537 743 55 69',
    email: 'korkmazinsaatgonen1@gmail.com',
    address: 'Korkmaz Plaza, Akçaali Mahallesi, 1002 Sokak No:6B, 10900 Gönen/Balıkesir',
    mapsUrl: 'https://maps.app.goo.gl/cSxtvaBYL1pRd7Kx6',
  },
  geo: {
    latitude: 40.1055704,
    longitude: 27.6528501,
    region: 'TR-10',
    placename: 'Gönen, Balıkesir',
  },
  social: {
    instagram: 'https://www.instagram.com/korkmazinsaat.gonen',
  },
} as const

export type SiteConfig = typeof siteConfig
