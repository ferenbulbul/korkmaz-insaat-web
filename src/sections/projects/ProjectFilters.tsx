'use client'

import FilterBar from '@/components/shared/FilterBar'
import { PROJECT_STATUS_LABELS } from '@/types/project'
import type { ProjectStatus } from '@/types/project'

interface ProjectFiltersProps {
  activeStatus: string
  onStatusChange: (status: string) => void
}

const statuses = (
  Object.entries(PROJECT_STATUS_LABELS) as [ProjectStatus, string][]
).map(([value, label]) => ({ value, label }))

const ProjectFilters = ({ activeStatus, onStatusChange }: ProjectFiltersProps) => {
  return (
    <FilterBar
      categories={statuses}
      active={activeStatus}
      onChange={onStatusChange}
      className="mb-8 md:mb-10"
    />
  )
}

export default ProjectFilters
