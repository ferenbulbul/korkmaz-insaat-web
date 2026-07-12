import type { Stat } from '@/types/ui'

export const COMPANY_STATS: Stat[] = [
  { value: 40, suffix: '+', label: 'Tamamlanan Proje' },
  { value: 13, suffix: '+', label: 'Yıllık Deneyim' },
  { value: 500000, suffix: '+', label: 'm² İnşaat Alanı' },
]

export const COMPANY_INFO = {
  name: 'Korkmaz İnşaat',
  founded: 2012,
  slogan: 'Güvenle İnşa Ediyoruz',
  description: 'Korkmaz İnşaat, 2012 yılından bu yana Balıkesir Gönen\'de inşaat sektöründe güvenin, kalitenin ve sürdürülebilir yapı anlayışının temsilcisi olarak faaliyet göstermektedir. Bugüne kadar hayata geçirdiği 40\'tan fazla projeyle, modern yaşam alanlarını estetik ve sağlamlıkla buluşturmuştur.',
  longDescription: 'Korkmaz İnşaat, 2012 yılından bu yana Balıkesir Gönen\'de inşaat sektöründe güvenin, kalitenin ve sürdürülebilir yapı anlayışının temsilcisi olarak faaliyet göstermektedir. Bugüne kadar hayata geçirdiği 40\'tan fazla projeyle, modern yaşam alanlarını estetik ve sağlamlıkla buluşturmuştur. Her projeyi yalnızca bir yapı değil, insanların huzurla yaşayacağı ve değer katacağı yaşam alanları olarak görüyoruz. Müşteri memnuniyetini temel ilke edinerek, kaliteli malzeme kullanımı ve profesyonel uygulama süreçleriyle çalışmalarımızı sürdürmekteyiz.',
  vision: 'Sürdürülebilir ve yenilikçi inşaat çözümleriyle bölgenin en güvenilir yapı firması olmak.',
  mission: 'En yüksek kalite standartlarında, çevreye duyarlı ve depreme dayanıklı yapılar inşa ederek topluma değer katmak.',
} as const
