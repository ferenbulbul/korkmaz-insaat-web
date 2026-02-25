import ProjectCard from '@/components/shared/ProjectCard'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion'
import type { Project } from '@/types/project'

interface ProjectsGridProps {
  projects: Project[]
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  if (projects.length === 0) {
    return (
      <ScrollReveal direction="up">
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 bg-muted/50 px-6 py-16">
          <p className="text-center text-muted-foreground">
            Bu kategoride henüz proje bulunmamaktadır.
          </p>
        </div>
      </ScrollReveal>
    )
  }

  return (
    <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {projects.map((project) => (
        <StaggerItem key={project.id} direction="up">
          <ProjectCard project={project} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}

export default ProjectsGrid
