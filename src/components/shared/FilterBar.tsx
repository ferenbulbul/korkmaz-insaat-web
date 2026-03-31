'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FilterBarProps {
  categories: { value: string; label: string }[]
  active: string
  onChange: (value: string) => void
  className?: string
}

const FilterBar = ({ categories, active, onChange, className }: FilterBarProps) => {
  const allCategories = [{ value: 'all', label: 'Tumu' }, ...categories]

  return (
    <div
      className={cn(
        'flex gap-2 overflow-x-auto rounded-2xl border border-border/70 bg-secondary/70 p-2 scrollbar-none',
        className,
      )}
    >
      {allCategories.map((category) => {
        const isActive = active === category.value

        return (
          <Button
            key={category.value}
            variant="ghost"
            size="sm"
            onClick={() => onChange(category.value)}
            className={cn(
              'shrink-0 rounded-xl px-4 transition-all duration-200',
              isActive
                ? 'bg-accent text-accent-foreground shadow-md shadow-accent/25 hover:bg-accent/90 hover:text-accent-foreground'
                : 'bg-background text-secondary-foreground hover:bg-background/70',
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
