import type { TeamMember } from '@/types/team'

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Ahmet Korkmaz',
    title: 'Yönetim Kurulu Başkanı',
    photoUrl: '/images/team/ahmet-korkmaz.jpg',
    bio: '30 yıllık inşaat sektörü deneyimi. Firma kurucu ortağı.',
    social: { linkedin: '#', email: 'ahmet@korkmazinsaat.com.tr' },
  },
  {
    id: '2',
    name: 'Elif Demir',
    title: 'Genel Müdür',
    photoUrl: '/images/team/elif-demir.jpg',
    bio: 'İTÜ İnşaat Mühendisliği mezunu. 15 yıllık proje yönetimi deneyimi.',
    social: { linkedin: '#', email: 'elif@korkmazinsaat.com.tr' },
  },
  {
    id: '3',
    name: 'Mehmet Yılmaz',
    title: 'Teknik Direktör',
    photoUrl: '/images/team/mehmet-yilmaz.jpg',
    bio: 'Yapı mühendisi. Depreme dayanıklı yapı tasarımı uzmanı.',
    social: { linkedin: '#' },
  },
  {
    id: '4',
    name: 'Ayşe Kaya',
    title: 'Mimar',
    photoUrl: '/images/team/ayse-kaya.jpg',
    bio: 'MSGSÜ Mimarlık mezunu. Sürdürülebilir tasarım odaklı projeler.',
    social: { linkedin: '#' },
  },
]
