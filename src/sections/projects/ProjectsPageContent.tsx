'use client'

import { useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ScrollReveal } from '@/components/motion'
import { PROJECT_STATUS_LABELS } from '@/types/project'
import ProjectsGrid from './ProjectsGrid'
import ProjectFilters from './ProjectFilters'
import type { Project, ProjectStatus } from '@/types/project'

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

  const activeLabel =
    activeStatus === 'all'
      ? 'Tüm Projeler'
      : PROJECT_STATUS_LABELS[activeStatus as ProjectStatus] ?? 'Tüm Projeler'

  const countLabel = String(filtered.length).padStart(2, '0')

  return (
    <div>
      {/* Filter bar */}
      <ScrollReveal direction="up" delay={0.1}>
        <ProjectFilters
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
        />
      </ScrollReveal>

      {/* Hairline divider under filters */}
      <div className="hairline-gold mb-8 md:mb-10" />

      {/* Counter + active filter label */}
      <ScrollReveal direction="up" delay={0.15}>
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div className="flex items-baseline gap-4">
            <span
              className="index-number text-5xl leading-none md:text-6xl"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              {countLabel}
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Proje
              <br />
              Listelendi
            </span>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
            <span className="size-1.5 rounded-full bg-accent" />
            {activeLabel}
          </span>
        </div>
      </ScrollReveal>

      <ProjectsGrid projects={filtered} />
    </div>
  )
}

export default ProjectsPageContent
