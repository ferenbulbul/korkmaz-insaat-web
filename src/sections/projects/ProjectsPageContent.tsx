'use client'

import { useState, useMemo } from 'react'
import ProjectFilters from './ProjectFilters'
import ProjectsGrid from './ProjectsGrid'
import { ScrollReveal } from '@/components/motion'
import type { Project } from '@/types/project'

interface ProjectsPageContentProps {
  projects: Project[]
}

const ProjectsPageContent = ({ projects }: ProjectsPageContentProps) => {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [projects, activeCategory])

  return (
    <div>
      <ScrollReveal direction="down" delay={0.1} distance={20}>
        <ProjectFilters
          activeCategory={activeCategory}
          onFilterChange={setActiveCategory}
        />
      </ScrollReveal>
      <ProjectsGrid projects={filteredProjects} />
    </div>
  )
}

export default ProjectsPageContent
