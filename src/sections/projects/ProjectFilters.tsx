'use client'

import FilterBar from '@/components/shared/FilterBar'
import { PROJECT_CATEGORIES } from '@/types/project'
import type { ProjectCategory } from '@/types/project'

interface ProjectFiltersProps {
  onFilterChange: (category: string) => void
  activeCategory: string
}

const categories = (Object.entries(PROJECT_CATEGORIES) as [ProjectCategory, string][]).map(
  ([value, label]) => ({ value, label })
)

const ProjectFilters = ({ onFilterChange, activeCategory }: ProjectFiltersProps) => {
  return (
    <FilterBar
      categories={categories}
      active={activeCategory}
      onChange={onFilterChange}
      className="mb-8 md:mb-10"
    />
  )
}

export default ProjectFilters
