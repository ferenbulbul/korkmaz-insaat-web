'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FilterBarProps {
  categories: { value: string; label: string }[]
  active: string
  onChange: (value: string) => void
  className?: string
  label?: string
}

const FilterBar = ({ categories, active, onChange, className, label }: FilterBarProps) => {
  const allCategories = [{ value: 'all', label: 'Tumu' }, ...categories]

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2',
        className,
      )}
    >
      {label && (
        <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      )}
      {allCategories.map((category) => {
        const isActive = active === category.value

        return (
          <Button
            key={category.value}
            variant="ghost"
            size="sm"
            onClick={() => onChange(category.value)}
            className={cn(
              'shrink-0 rounded-full border px-5 transition-all duration-200',
              isActive
                ? 'border-accent bg-accent text-white shadow-md shadow-accent/25 hover:bg-accent/90 hover:text-white'
                : 'border-border bg-white text-foreground/70 hover:border-foreground/20 hover:bg-secondary hover:text-foreground',
            )}
          >
            {category.label}
          </Button>
        )
      })}
    </div>
  )
}

export default FilterBar
