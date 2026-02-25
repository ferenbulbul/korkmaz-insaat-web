import type { Stat } from '@/types/ui'

export const COMPANY_STATS: Stat[] = [
  { value: 150, suffix: '+', label: 'Tamamlanan Proje' },
  { value: 25, suffix: '+', label: 'Yıllık Deneyim' },
  { value: 80, suffix: '+', label: 'Uzman Kadro' },
  { value: 500000, suffix: '+', label: 'm² İnşaat Alanı' },
]

export const COMPANY_INFO = {
  name: 'Korkmaz İnşaat',
  founded: 1999,
  slogan: 'Güvenle İnşa Ediyoruz',
  description: 'Korkmaz İnşaat, 25 yılı aşkın deneyimiyle Türkiye\'nin önde gelen inşaat firmalarından biridir. Konut, ticari yapı, altyapı ve renovasyon alanlarında kaliteli, güvenilir ve sürdürülebilir projeler üretiyoruz.',
  longDescription: 'Korkmaz İnşaat olarak, 1999 yılından bu yana inşaat sektöründe faaliyet göstermekteyiz. Kurulduğumuz günden itibaren kalite, güvenilirlik ve müşteri memnuniyetini ön planda tutarak, Türkiye genelinde 150\'den fazla projeyi başarıyla tamamladık. Modern mühendislik teknikleri ve yenilikçi yaklaşımlarımızla, yaşam alanlarını ve şehirleri dönüştürüyoruz.',
  vision: 'Sürdürülebilir ve yenilikçi inşaat çözümleriyle Türkiye\'nin en güvenilir yapı firması olmak.',
  mission: 'En yüksek kalite standartlarında, çevreye duyarlı ve depreme dayanıklı yapılar inşa ederek topluma değer katmak.',
  milestones: [
    { year: 1999, title: 'Kuruluş', description: 'Korkmaz İnşaat, İstanbul\'da kuruldu.' },
    { year: 2005, title: 'İlk Büyük Proje', description: 'Park Konutları projesiyle sektörde adını duyurdu.' },
    { year: 2010, title: 'Ticari Yapı Alanına Giriş', description: 'İlk iş merkezi projesini tamamladı.' },
    { year: 2015, title: 'Altyapı Projeleri', description: 'Kamu altyapı ihalelerinde yer almaya başladı.' },
    { year: 2020, title: '100. Proje', description: '100. projesini başarıyla teslim etti.' },
    { year: 2024, title: 'Sürdürülebilir Yapı', description: 'Yeşil bina sertifikasyonu ile sürdürülebilir inşaata geçiş yaptı.' },
  ],
} as const
