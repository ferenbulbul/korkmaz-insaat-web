import { getHeroProjects } from '@/services/projects'
import { PROJECT_STATUS_LABELS } from '@/types/project'
import HeroCarousel from './HeroCarousel'

const FALLBACK_IMAGES: HeroSlide[] = [
  { url: '/images/hero/hero-1.jpg', alt: 'İnşaat sahası genel görünüm', slug: null, title: null, description: null, statusLabel: null },
  { url: '/images/hero/hero-2.jpg', alt: 'Modern konut projesi', slug: null, title: null, description: null, statusLabel: null },
  { url: '/images/hero/hero-3.jpg', alt: 'Ticari yapı projesi', slug: null, title: null, description: null, statusLabel: null },
  { url: '/images/hero/hero-4.jpg', alt: 'Lüks konut dış cephe', slug: null, title: null, description: null, statusLabel: null },
  { url: '/images/hero/hero-5.jpg', alt: 'Modern iç mekan tasarımı', slug: null, title: null, description: null, statusLabel: null },
]

export interface HeroSlide {
  url: string
  alt: string
  slug: string | null
  title: string | null
  description: string | null
  statusLabel: string | null
}

const HeroSection = async () => {
  const projects = await getHeroProjects(6)

  // Build slides from hero-marked projects that have images
  const projectSlides: HeroSlide[] = []
  for (const p of projects) {
    const imageUrl = p.thumbnailUrl || p.images[0]?.url
    if (imageUrl) {
      projectSlides.push({
        url: imageUrl,
        alt: p.title,
        slug: p.slug,
        title: p.title,
        description: p.description,
        statusLabel: PROJECT_STATUS_LABELS[p.status],
      })
    }
  }

  const slides = projectSlides.length > 0 ? projectSlides : FALLBACK_IMAGES

  return <HeroCarousel slides={slides} />
}

export default HeroSection
