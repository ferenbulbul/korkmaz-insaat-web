'use client'

import Container from '@/components/layout/Container'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionTitle from '@/components/shared/SectionTitle'
import { ScrollReveal } from '@/components/motion'
import ImageGallery from '@/components/shared/ImageGallery'
import type { ProjectImage } from '@/types/project'

interface ProjectGalleryProps {
  images: ProjectImage[]
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  if (images.length === 0) return null

  return (
    <SectionWrapper bgColor="muted">
      <Container>
        <ScrollReveal direction="up">
          <SectionTitle
            overline="GALERI"
            title="Proje Galerisi"
            alignment="left"
          />
        </ScrollReveal>
        <ImageGallery images={images} />
      </Container>
    </SectionWrapper>
  )
}

export default ProjectGallery
