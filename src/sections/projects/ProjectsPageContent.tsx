'use client'

import { ScrollReveal } from '@/components/motion'
import ProjectsGrid from './ProjectsGrid'
import type { Project } from '@/types/project'

interface ProjectsPageContentProps {
  projects: Project[]
}

const ProjectsPageContent = ({ projects }: ProjectsPageContentProps) => {
  return (
    <div>
      <ScrollReveal direction="up" delay={0.15}>
        <p className="mb-6 text-sm text-muted-foreground md:mb-8">
          <span className="font-semibold text-foreground">
            {projects.length}
          </span>{' '}
          proje listeleniyor.
        </p>
      </ScrollReveal>
      <ProjectsGrid projects={projects} />
    </div>
  )
}

export default ProjectsPageContent
