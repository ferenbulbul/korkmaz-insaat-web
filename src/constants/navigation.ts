import type { NavItem, FooterSection } from '@/types/ui'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Ana Sayfa', href: '/' },
  {
    label: 'Projeler',
    href: '/projeler',
    children: [
      { label: 'Devam Eden', href: '/projeler?durum=ongoing' },
      { label: 'Tamamlanan', href: '/projeler?durum=completed' },
      { label: 'Planlanan', href: '/projeler?durum=planned' },
    ],
  },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
]

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Hızlı Erişim',
    links: [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Projeler', href: '/projeler' },
      { label: 'Hakkımızda', href: '/hakkimizda' },
      { label: 'İletişim', href: '/iletisim' },
    ],
  },
  {
    title: 'Hizmetlerimiz',
    links: [
      { label: 'Konut İnşaatı', href: '/projeler?kategori=konut' },
      { label: 'Ticari Yapı', href: '/projeler?kategori=ticari' },
      { label: 'Karma Projeler', href: '/projeler?kategori=karma' },
    ],
  },
]
