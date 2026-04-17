import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, SectionWrapper } from '@/components/layout'
import { SectionTitle, ProjectCard } from '@/components/shared'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion'
import { getFeaturedProjects } from '@/services/projects'

const ProjectsShowcase = async () => {
  const featuredProjects = await getFeaturedProjects(6)

  if (featuredProjects.length === 0) return null

  return (
    <SectionWrapper id="projeler" bgColor="white">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <ScrollReveal direction="up">
            <SectionTitle
              overline="PROJELERİMİZ"
              title="Öne Çıkan Projeler"
              description="Tamamladığımız öne çıkan projelerimizle kalitemizi ve deneyimimizi keşfedin."
              alignment="left"
              serif
              className="mb-0 md:mb-0"
            />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <Link
              href="/projeler"
              className="group mb-2 inline-flex shrink-0 items-center gap-2 rounded-lg border border-accent/20 px-5 py-2.5 font-sans text-sm font-semibold text-accent transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
            >
              Tüm Projeleri Gör
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Gold divider */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-10 mt-6 gold-rule md:mb-12" />
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <StaggerItem key={project.id} direction="up">
              <ProjectCard project={project} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </SectionWrapper>
  )
}

export default ProjectsShowcase
