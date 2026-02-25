import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, SectionWrapper } from '@/components/layout'
import { SectionTitle, ProjectCard } from '@/components/shared'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion'
import { PROJECTS } from '@/constants/projects'

const ProjectsShowcase = () => {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 6)

  return (
    <SectionWrapper id="projeler" bgColor="white">
      <Container>
        <ScrollReveal direction="up">
          <SectionTitle
            overline="PROJELERİMİZ"
            title="Öne Çıkan Projeler"
            description="Tamamladığımız öne çıkan projelerimizle kalitemizi ve deneyimimizi keşfedin."
            alignment="center"
          />
        </ScrollReveal>
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id} direction="up">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 text-base font-semibold text-accent transition-colors hover:underline"
            >
              Tüm Projeleri Gör
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </SectionWrapper>
  )
}

export default ProjectsShowcase
