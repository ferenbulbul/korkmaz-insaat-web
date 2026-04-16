'use client'

import { useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ScrollReveal } from '@/components/motion'
import ProjectsGrid from './ProjectsGrid'
import ProjectFilters from './ProjectFilters'
import type { Project } from '@/types/project'

interface ProjectsPageContentProps {
  projects: Project[]
}

const ProjectsPageContent = ({ projects }: ProjectsPageContentProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeStatus = searchParams.get('durum') || 'all'

  const handleStatusChange = useCallback(
    (status: string) => {
      const params = new URLSearchParams()
      if (status !== 'all') params.set('durum', status)
      const qs = params.toString()
      router.push(`/projeler${qs ? `?${qs}` : ''}`, { scroll: false })
    },
    [router]
  )

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      return activeStatus === 'all' || p.status === activeStatus
    })
  }, [projects, activeStatus])

  return (
    <div>
      <ScrollReveal direction="up" delay={0.1}>
        <ProjectFilters
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
        />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <p className="mb-6 text-sm text-muted-foreground md:mb-8">
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{' '}
          proje listeleniyor.
        </p>
      </ScrollReveal>
      <ProjectsGrid projects={filtered} />
    </div>
  )
}

export default ProjectsPageContent
